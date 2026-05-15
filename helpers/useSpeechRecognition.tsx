import { useState, useEffect, useRef, useCallback } from "react";
import { useCallbackRef } from "./useCallbackRef";

// Define types for Web Speech API as they are not standard in all TS environments yet
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  onstart: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

interface UseSpeechRecognitionOptions {
  wakeWord?: string;
  onWakeWordDetected?: () => void;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  isSupported: boolean;
  isWakeWordMode: boolean;
  startListening: () => void;
  stopListening: () => void;
  startWakeWordListening: () => void;
  stopWakeWordListening: () => void;
  resetTranscript: () => void;
  error: string | null;
}

export const useSpeechRecognition = (
  options: UseSpeechRecognitionOptions = {}
): UseSpeechRecognitionReturn => {
  const { wakeWord = "computer", onWakeWordDetected } = options;
  
  const [isListening, setIsListening] = useState(false);
  const [isWakeWordMode, setIsWakeWordMode] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isWakeWordModeRef = useRef(false);
  const shouldRestartRef = useRef(false);

  // Stable callback reference
  const stableOnWakeWordDetected = useCallbackRef(onWakeWordDetected || (() => {}));

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        setIsSupported(true);
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "en-US";
      }
    }
  }, []);

  // Setup recognition event handlers
  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      console.log("Speech recognition started", { wakeWordMode: isWakeWordModeRef.current });
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      let interimTranscript = "";
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPiece;
        } else {
          interimTranscript += transcriptPiece;
        }
      }
      
      // In wake word mode, check for the wake word
      if (isWakeWordModeRef.current) {
        const fullTranscript = (finalTranscript || interimTranscript).toLowerCase().trim();
        console.log("Wake word mode - heard:", fullTranscript);
        
        if (fullTranscript.includes(wakeWord.toLowerCase())) {
          console.log("Wake word detected!");
          setIsWakeWordMode(false);
          isWakeWordModeRef.current = false;
          shouldRestartRef.current = false;
          
          // Stop current recognition
          recognition.stop();
          
          // Clear transcript and trigger callback
          setTranscript("");
          stableOnWakeWordDetected();
        }
      } else {
        // Normal command mode - update transcript
        const text = finalTranscript || interimTranscript;
        setTranscript(text);
        console.log("Command mode - transcript:", text);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.log("Speech recognition error:", event.error);
      
      // Ignore 'no-speech' errors in wake word mode as they're expected
      if (event.error === "no-speech" && isWakeWordModeRef.current) {
        // This is normal in wake word mode - just continue
        return;
      }
      
      // Ignore 'no-speech' in regular mode too, but stop listening
      if (event.error !== "no-speech") {
        console.error("Speech recognition error", event.error);
        setError(event.error);
      }
      
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended", { 
        shouldRestart: shouldRestartRef.current,
        wakeWordMode: isWakeWordModeRef.current 
      });
      
      setIsListening(false);
      
      // Auto-restart if in wake word mode
      if (shouldRestartRef.current && isWakeWordModeRef.current) {
        console.log("Restarting wake word listening...");
        // Small delay to avoid rapid restarts
        setTimeout(() => {
          if (shouldRestartRef.current && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (e) {
              console.error("Failed to restart wake word listening:", e);
            }
          }
        }, 100);
      }
    };

    return () => {
      recognition.onstart = () => {};
      recognition.onresult = () => {};
      recognition.onerror = () => {};
      recognition.onend = () => {};
    };
  }, [wakeWord, stableOnWakeWordDetected]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        console.log("Starting regular listening...");
        setIsWakeWordMode(false);
        isWakeWordModeRef.current = false;
        shouldRestartRef.current = false;
        // Explicitly clear transcript before starting
        setTranscript("");
        recognitionRef.current.continuous = false;
        recognitionRef.current.start();
      } catch (e) {
        console.error("Failed to start speech recognition:", e);
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      console.log("Stopping regular listening...");
      shouldRestartRef.current = false;
      recognitionRef.current.stop();
    }
  }, [isListening]);

  const startWakeWordListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        console.log("Starting wake word listening mode...");
        setIsWakeWordMode(true);
        isWakeWordModeRef.current = true;
        shouldRestartRef.current = true;
        setTranscript("");
        recognitionRef.current.continuous = false; // Will restart via onend handler
        recognitionRef.current.start();
      } catch (e) {
        console.error("Failed to start wake word listening:", e);
        setError("Failed to start wake word detection");
      }
    }
  }, [isListening]);

  const stopWakeWordListening = useCallback(() => {
    console.log("Stopping wake word listening mode...");
    shouldRestartRef.current = false;
    setIsWakeWordMode(false);
    isWakeWordModeRef.current = false;
    
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript("");
  }, []);

  return {
    isListening,
    transcript,
    isSupported,
    isWakeWordMode,
    startListening,
    stopListening,
    startWakeWordListening,
    stopWakeWordListening,
    resetTranscript,
    error
  };
};