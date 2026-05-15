import { useCallback, useEffect, useRef } from "react";
import { useLcarsSounds } from "./useLcarsSounds";

interface AnnouncerOptions {
  interrupt?: boolean; // If true, cancels current speech
  delay?: number; // Delay before speaking in ms
}

export const useLcarsAnnouncer = () => {
  const { speak, stopSpeaking, isSoundEnabled } = useLcarsSounds();
  const queueRef = useRef<string[]>([]);
  const processingRef = useRef(false);

  // Process the queue one by one
  const processQueue = useCallback(async () => {
    if (processingRef.current || queueRef.current.length === 0) return;
    
    processingRef.current = true;
    const text = queueRef.current.shift();
    
    if (text) {
      speak(text);
      
      // Estimate duration based on word count (rough approximation)
      // Average speaking rate is ~150 words per minute -> ~2.5 words per second
      const wordCount = text.split(" ").length;
      const estimatedDuration = Math.max(1500, (wordCount / 2.5) * 1000);
      
      // Wait before processing next item
      // Note: Ideally we'd use the onend event from speech synthesis, 
      // but since we're wrapping the context's speak function which might not expose that promise,
      // we use a timeout estimation for the queue logic.
      setTimeout(() => {
        processingRef.current = false;
        processQueue();
      }, estimatedDuration);
    } else {
      processingRef.current = false;
    }
  }, [speak]);

  const addToQueue = useCallback((text: string, options?: AnnouncerOptions) => {
    if (!isSoundEnabled) return;

    if (options?.interrupt) {
      stopSpeaking();
      queueRef.current = [text];
      processingRef.current = false;
      processQueue();
    } else {
      queueRef.current.push(text);
      processQueue();
    }
  }, [isSoundEnabled, stopSpeaking, processQueue]);

  // --- Public Methods ---

  const announceNavigation = useCallback((pageName: string) => {
    // Clean up page name for better speech (e.g., "services/etl-pipelines" -> "ETL Pipelines")
    const cleanName = pageName
      .replace(/-/g, " ")
      .replace(/\//g, " ")
      .replace(/_/g, " ")
      .trim();
      
    addToQueue(`Accessing ${cleanName}`);
  }, [addToQueue]);

  const announceAction = useCallback((action: string) => {
    addToQueue(`Initiating ${action}`);
  }, [addToQueue]);

  const announceStatus = useCallback((status: string) => {
    addToQueue(`Status update: ${status}`);
  }, [addToQueue]);

  const announceAlert = useCallback((message: string) => {
    addToQueue(`Alert: ${message}`, { interrupt: true });
  }, [addToQueue]);

  // Clear queue on unmount
  useEffect(() => {
    return () => {
      queueRef.current = [];
    };
  }, []);

  return {
    announceNavigation,
    announceAction,
    announceStatus,
    announceAlert,
  };
};