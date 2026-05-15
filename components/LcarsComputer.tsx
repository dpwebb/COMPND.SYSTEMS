import React, { useState, useEffect, useRef } from "react";
import { useAiCommand } from "../helpers/useAiCommand";
import { useLcarsSounds } from "../helpers/useLcarsSounds";
import { useSpeechRecognition } from "../helpers/useSpeechRecognition";
import { Input } from "./Input";
import { Button } from "./Button";
import {
  Terminal,
  RefreshCw,
  AlertTriangle,
  Mic,
  MicOff,
  Radio,
  MessageSquare,
} from "lucide-react";
import styles from "./LcarsComputer.module.css";

interface LcarsComputerProps {
  className?: string;
  initialPrompt?: string;
}

export const LcarsComputer = ({
  className,
  initialPrompt,
}: LcarsComputerProps) => {
  const [input, setInput] = useState(initialPrompt || "");
  const [isHandsFreeMode, setIsHandsFreeMode] = useState(false);
  const [commandCaptureActive, setCommandCaptureActive] = useState(false);

  const {
    sendCommand,
    response,
    isLoading,
    error,
    clearResponse,
    conversationHistory,
    clearHistory,
  } = useAiCommand();
  const {
    playBeep,
    playSuccess,
    playError,
    playClick,
    playTransition,
    speak,
    stopSpeaking,
    isSpeaking,
  } = useLcarsSounds();

  const previousResponseRef = useRef<string>("");
  const previousIsSpeakingRef = useRef(false);

  const {
    isListening,
    transcript,
    isSupported: isSpeechSupported,
    isWakeWordMode,
    startListening,
    stopListening,
    startWakeWordListening,
    stopWakeWordListening,
    resetTranscript,
  } = useSpeechRecognition({
    wakeWord: "computer",
    onWakeWordDetected: () => {
      console.log("✅ Wake word detected in LcarsComputer!");
      console.log("🎤 Starting command capture...");
      playTransition();
      setCommandCaptureActive(true);
      
      // Clear any previous transcript before starting command listening
      resetTranscript();

      // Start capturing the actual command
      setTimeout(() => {
        console.log("🎤 Command listening started");
        startListening();
      }, 100);
    },
  });

  const responseEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of response (only within the display container, not the page)
  useEffect(() => {
    if (response && responseEndRef.current) {
      responseEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [response]);

  // Sync speech transcript with input when capturing command
  useEffect(() => {
    if (commandCaptureActive && isListening && transcript) {
      console.log("📝 Transcript updated:", transcript);
      setInput(transcript);
    }
  }, [commandCaptureActive, isListening, transcript]);

  // When command capture stops and we have a transcript, auto-submit and return to wake word mode
  useEffect(() => {
    if (commandCaptureActive && !isListening && transcript.trim()) {
      const commandText = transcript.trim();
      
      // Ignore if the command is just the wake word (case-insensitive)
      if (commandText.toLowerCase() === "computer") {
        console.log("⚠️ Ignored wake word as command");
        setCommandCaptureActive(false);
        resetTranscript();
        
        // If in hands-free mode, restart wake word listening
        if (isHandsFreeMode) {
           startWakeWordListening();
        }
        return;
      }

      console.log("✅ Command captured:", transcript);
      console.log("📤 Submitting command...");
      playClick();
      setCommandCaptureActive(false);

      // Submit the command
      setInput(commandText);
      sendCommand(commandText).then(() => {
        console.log("✅ Command submitted successfully");
        // Clear input after submission
        setInput("");

        // Don't immediately return to wake word - wait for speaking to finish
        // This is handled by the speaking state change effect
        console.log(
          "⏳ Waiting for TTS to complete before returning to wake word mode...",
        );
      });

      resetTranscript();
    }
  }, [
    commandCaptureActive,
    isListening,
    transcript,
    playClick,
    sendCommand,
    resetTranscript,
  ]);

  // Auto-continue conversation when computer finishes speaking in hands-free mode
  useEffect(() => {
    // Detect when speaking transitions from true to false
    if (previousIsSpeakingRef.current && !isSpeaking) {
      console.log("🔇 Finished speaking");
      console.log("🤖 Hands-free mode enabled:", isHandsFreeMode);
      console.log(
        "📊 Conversation history length:",
        conversationHistory.length,
      );

      // If hands-free mode is enabled, return to wake word listening
      if (isHandsFreeMode) {
        console.log("👂 Returning to wake word listening after speaking...");
        setTimeout(() => {
          console.log("🎙️ Starting wake word detection...");
          startWakeWordListening();
        }, 500);
      }
    }

    previousIsSpeakingRef.current = isSpeaking;
  }, [
    isSpeaking,
    isHandsFreeMode,
    startWakeWordListening,
    conversationHistory.length,
  ]);

  // Play sounds based on state
  useEffect(() => {
    if (error) {
      console.error("❌ Error occurred:", error);
      playError();
      stopSpeaking(); // Stop speaking if there's an error
    }
  }, [error, playError, stopSpeaking]);

  useEffect(() => {
    if (!isLoading && response && !error) {
      playSuccess();

      // Only speak if this is a new response (not a re-render)
      if (response !== previousResponseRef.current && response.trim()) {
        console.log("🔊 New response complete, starting TTS...");
        console.log(
          "📄 Response preview:",
          response.substring(0, 50) + "...",
        );
        speak(response);
        previousResponseRef.current = response;
      }
    }
  }, [isLoading, response, error, playSuccess, speak]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    console.log("📤 Manual submit:", input);
    playBeep();
    await sendCommand(input);
    setInput(""); // Clear input after submission
  };

  const handleClear = () => {
    console.log("🗑️ Clearing response");
    playClick();
    stopSpeaking();
    clearResponse();
    setInput("");
    resetTranscript();
    previousResponseRef.current = "";
    inputRef.current?.focus();
  };

  const handleClearConversation = () => {
    console.log("🗑️ Clearing conversation history");
    playClick();
    stopSpeaking();
    clearHistory();
    setInput("");
    resetTranscript();
    previousResponseRef.current = "";
    inputRef.current?.focus();
  };

  const toggleListening = () => {
    if (isListening) {
      console.log("🛑 Stopping manual listening");
      playClick();
      stopListening();
      setCommandCaptureActive(false);
    } else {
      console.log("🎤 Starting manual listening");
      playTransition();
      setCommandCaptureActive(true);
      startListening();
    }
  };

  const toggleHandsFreeMode = () => {
    if (isHandsFreeMode) {
      // Turning off hands-free mode
      console.log("🔇 Disabling hands-free mode");
      playClick();
      setIsHandsFreeMode(false);
      stopWakeWordListening();
      setCommandCaptureActive(false);
    } else {
      // Turning on hands-free mode
      console.log("🔊 Enabling hands-free mode");
      playTransition();
      setIsHandsFreeMode(true);
      startWakeWordListening();
    }
  };

  // Determine current status for display
  const getCurrentStatus = () => {
    if (isSpeaking) return "speaking";
    if (commandCaptureActive && isListening) return "command";
    if (isWakeWordMode) return "wake-word";
    if (isLoading) return "processing";
    if (error) return "error";
    return "ready";
  };

  const currentStatus = getCurrentStatus();
  const hasConversation = conversationHistory.length > 0;

  // Log state changes for debugging
  useEffect(() => {
    console.log("📊 State update:", {
      isWakeWordMode,
      commandCaptureActive,
      isListening,
      isHandsFreeMode,
      isSpeaking,
      hasResponse: !!response,
      hasConversation,
      currentStatus,
    });
  }, [
    isWakeWordMode,
    commandCaptureActive,
    isListening,
    isHandsFreeMode,
    isSpeaking,
    response,
    hasConversation,
    currentStatus,
  ]);

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {/* Header Bar */}
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          COMPUTER INTERFACE
          {hasConversation && (
            <span className={styles.conversationBadge}>
              <MessageSquare size={16} />
              CONVERSATION MODE
            </span>
          )}
        </div>
        <div className={styles.headerDecor}>LCARS 719</div>
      </div>

      <div className={styles.body}>
        {/* Left Sidebar Decor */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarTop} />
          <div className={styles.sidebarMiddle}>
            <div
              className={styles.statusLight}
              data-status={currentStatus}
              role="status"
              aria-label={`System Status: ${currentStatus}`}
            />
          </div>
          <div className={styles.sidebarBottom} />
        </div>

        {/* Main Content */}
        <div className={styles.main}>
          {/* Output Display */}
          <div
            className={styles.display}
            role="log"
            aria-live="polite"
            aria-busy={isLoading}
            aria-atomic="false"
          >
            {/* Show placeholder only when nothing has happened yet */}
            {!response &&
              !isLoading &&
              !error &&
              !isWakeWordMode &&
              !commandCaptureActive &&
              !hasConversation && (
                <div className={styles.placeholder}>
                  <Terminal size={48} className={styles.placeholderIcon} />
                  <p>AWAITING INPUT...</p>
                  <p className={styles.hint}>
                    TRY: "WHAT SERVICES DOES COMPND OFFER?"
                  </p>
                  {isSpeechSupported && (
                    <p className={styles.hint}>
                      OR ENABLE HANDS-FREE MODE AND SAY "COMPUTER"
                    </p>
                  )}
                </div>
              )}

            {/* Show loading state when no response yet */}
            {isLoading && !response && (
              <div className={styles.processing}>
                <span className={styles.blink}>PROCESSING QUERY...</span>
              </div>
            )}

            {/* Show response if we have one */}
            {response && (
              <div className={styles.responseContent}>
                <div className={styles.responseHeader}>
                  RESPONSE:
                  {isSpeaking && (
                    <span className={styles.speakingIndicator}>
                      {" "}
                      [AUDIO OUTPUT ACTIVE]
                    </span>
                  )}
                </div>
                <div className={styles.responseText}>{response}</div>
                {isLoading && <span className={styles.cursor}>█</span>}
              </div>
            )}

            {/* Show error */}
            {error && (
              <div className={styles.errorState}>
                <AlertTriangle size={24} />
                <span>ERROR: {error.toUpperCase()}</span>
              </div>
            )}

            {/* Overlay indicators - these show over the response */}
            {isWakeWordMode && (
              <div className={styles.wakeWordOverlay}>
                <Radio size={24} className={styles.wakeWordIcon} />
                <span className={styles.pulse}>LISTENING FOR WAKE WORD...</span>
                <p className={styles.wakeWordHint}>
                  SAY "COMPUTER" TO CONTINUE
                </p>
              </div>
            )}

            {commandCaptureActive && isListening && (
              <div className={styles.listeningOverlay}>
                <Mic size={24} />
                <span className={styles.pulse}>READY FOR COMMAND...</span>
              </div>
            )}

            <div ref={responseEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className={styles.inputArea}>
            <div className={styles.inputWrapper}>
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  commandCaptureActive
                    ? "LISTENING FOR COMMAND..."
                    : isWakeWordMode
                      ? "HANDS-FREE MODE ACTIVE..."
                      : "ENTER COMMAND..."
                }
                className={`${styles.input} ${isListening || isWakeWordMode ? styles.inputListening : ""}`}
                disabled={isLoading || isListening || isWakeWordMode}
                autoComplete="off"
                aria-label={
                  commandCaptureActive
                    ? "Voice command active"
                    : isWakeWordMode
                      ? "Hands-free mode active"
                      : "Terminal input"
                }
              />
              <div className={styles.inputDecor} />
            </div>

            <div className={styles.actions}>
              {isSpeechSupported && (
                <>
                  <Button
                    type="button"
                    onClick={toggleHandsFreeMode}
                    variant={isHandsFreeMode ? "primary" : "secondary"}
                    className={`${styles.handsFreeBtn} ${isHandsFreeMode ? styles.handsFreeActive : ""}`}
                    disabled={isLoading || (isListening && !isWakeWordMode)}
                    title={
                      isHandsFreeMode
                        ? "Disable Hands-Free Mode"
                        : "Enable Hands-Free Mode"
                    }
                    aria-label={
                      isHandsFreeMode
                        ? "Disable Hands-Free Mode"
                        : "Enable Hands-Free Mode"
                    }
                  >
                    <Radio size={18} />
                  </Button>

                  <Button
                    type="button"
                    onClick={toggleListening}
                    variant={commandCaptureActive ? "destructive" : "secondary"}
                    className={`${styles.micBtn} ${commandCaptureActive ? styles.micBtnActive : ""}`}
                    disabled={isLoading || isWakeWordMode}
                    title={
                      commandCaptureActive ? "Stop Listening" : "Voice Command"
                    }
                    aria-label={
                      commandCaptureActive ? "Stop Listening" : "Voice Command"
                    }
                  >
                    {commandCaptureActive ? (
                      <MicOff size={18} />
                    ) : (
                      <Mic size={18} />
                    )}
                  </Button>
                </>
              )}

              <Button
                type="submit"
                disabled={isLoading || !input.trim() || isWakeWordMode}
                className={styles.submitBtn}
                variant="primary"
                aria-label="Engage command"
              >
                {isLoading ? "PROCESSING" : "ENGAGE"}
              </Button>

              {(response || error) && !hasConversation && (
                <Button
                  type="button"
                  onClick={handleClear}
                  variant="secondary"
                  className={styles.clearBtn}
                  title="Reset Terminal"
                  aria-label="Reset Terminal"
                >
                  <RefreshCw size={18} />
                </Button>
              )}

              {hasConversation && (
                <Button
                  type="button"
                  onClick={handleClearConversation}
                  variant="secondary"
                  className={styles.clearBtn}
                  title="Clear Conversation"
                  aria-label="Clear Conversation"
                >
                  <RefreshCw size={18} />
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};