import { useState, useCallback, useRef } from "react";
import superjson from "superjson";
import { schema } from "../endpoints/ai/command_POST.schema";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UseAiCommandResult {
  sendCommand: (command: string) => Promise<void>;
  response: string;
  isLoading: boolean;
  error: string | null;
  clearResponse: () => void;
  conversationHistory: Message[];
  clearHistory: () => void;
}

export function useAiCommand(): UseAiCommandResult {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const clearResponse = useCallback(() => {
    setResponse("");
    setError(null);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const clearHistory = useCallback(() => {
    setConversationHistory([]);
    clearResponse();
  }, [clearResponse]);

  const sendCommand = useCallback(async (commandText: string) => {
    // Reset state
    setResponse("");
    setError(null);
    setIsLoading(true);

    // Abort previous request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      // Validate input locally first
      const validatedInput = schema.parse({ 
        command: commandText,
        history: conversationHistory 
      });

      const res = await fetch("/_api/ai/command", {
        method: "POST",
        body: superjson.stringify(validatedInput),
        headers: {
          "Content-Type": "application/json",
        },
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) {
        // Try to parse error message
        const text = await res.text();
        try {
          const errorObj = superjson.parse<{ error: string }>(text);
          throw new Error(errorObj.error);
        } catch {
          throw new Error(`System Error: ${res.statusText}`);
        }
      }

      if (!res.body) {
        throw new Error("No response stream received");
      }

      // Handle streaming response
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let fullResponse = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          fullResponse += chunk;
          setResponse((prev) => prev + chunk);
        }
      }

      // Add to conversation history after successful completion
      setConversationHistory(prev => [
        ...prev,
        { role: "user", content: commandText },
        { role: "assistant", content: fullResponse }
      ]);

    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        // Ignore abort errors
        return;
      }
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [conversationHistory]);

  return {
    sendCommand,
    response,
    isLoading,
    error,
    clearResponse,
    conversationHistory,
    clearHistory,
  };
}