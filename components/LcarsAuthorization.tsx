import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLcarsSounds } from "../helpers/useLcarsSounds";
import styles from "./LcarsAuthorization.module.css";

export type AuthorizationStatus = "idle" | "verifying" | "granted" | "denied";

interface LcarsAuthorizationProps {
  status: AuthorizationStatus;
  message?: string;
  onComplete?: () => void;
  autoClose?: boolean;
  duration?: number;
  className?: string;
}

export const LcarsAuthorization = ({
  status,
  message,
  onComplete,
  autoClose = true,
  duration = 2000,
  className,
}: LcarsAuthorizationProps) => {
  const { playTransition, playSuccess, playError, playAlert } = useLcarsSounds();
  const prevStatusRef = useRef<AuthorizationStatus>("idle");

  const isVisible = status !== "idle";

  // Handle sounds and auto-close logic
  useEffect(() => {
    if (status === "idle") {
      prevStatusRef.current = "idle";
      return;
    }

    // Only trigger effects if the status has actually changed
    if (prevStatusRef.current !== status) {
      if (status === "verifying") {
        playTransition();
      } else if (status === "granted") {
        playSuccess();
      } else if (status === "denied") {
        playError();
        playAlert(); // Extra alert for denial
      }
      prevStatusRef.current = status;
    }

    // Auto-close logic for terminal states
    let closeTimer: NodeJS.Timeout | undefined;
    if (autoClose && (status === "granted" || status === "denied")) {
      closeTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, duration);
    }

    return () => {
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, [status, autoClose, duration, onComplete, playTransition, playSuccess, playError, playAlert]);

  if (!isVisible) return null;

  // Determine color and text based on status
  let statusColor = styles.verifying;
  let statusText = "VERIFYING IDENTITY...";
  let subText = "BIOMETRIC SCAN IN PROGRESS";

  if (status === "granted") {
    statusColor = styles.granted;
    statusText = "ACCESS GRANTED";
    subText = "AUTHORIZATION CODE: ALPHA-7-GAMMA";
  } else if (status === "denied") {
    statusColor = styles.denied;
    statusText = "ACCESS DENIED";
    subText = "SECURITY VIOLATION LOGGED";
  }

  if (message) {
    subText = message;
  }

  const content = (
    <div 
      className={`${styles.overlay} ${className || ""}`} 
      role="alertdialog" 
      aria-modal="true" 
      aria-label={statusText}
    >
      <div className={`${styles.container} ${statusColor}`}>
        {/* Top Bar Structure */}
        <div className={styles.topStructure}>
          <div className={styles.elbowTop} />
          <div className={styles.barTop} />
        </div>

        {/* Main Content Area */}
        <div className={styles.content}>
          <div className={styles.scannerContainer}>
            {status === "verifying" && (
              <div className={styles.scannerGrid}>
                <div className={styles.scanLine} />
                <div className={styles.gridOverlay} />
              </div>
            )}
            {(status === "granted" || status === "denied") && (
              <div className={styles.resultIcon}>
                {status === "granted" ? (
                  <div className={styles.lockOpen} />
                ) : (
                  <div className={styles.lockClosed} />
                )}
              </div>
            )}
          </div>

          <div className={styles.textContainer}>
            <h2 className={styles.statusTitle}>{statusText}</h2>
            <p className={styles.statusSub}>{subText}</p>
            
            {status === "verifying" && (
              <div className={styles.progressBar}>
                <div className={styles.progressFill} />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar Structure */}
        <div className={styles.bottomStructure}>
          <div className={styles.barBottom} />
          <div className={styles.elbowBottom} />
        </div>
      </div>
      
      {/* Backdrop blur */}
      <div className={styles.backdrop} />
    </div>
  );

  return createPortal(content, document.body);
};