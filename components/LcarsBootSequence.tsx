import React, { useEffect, useState, useRef } from "react";
import { useLcarsSounds } from "../helpers/useLcarsSounds";
import { Button } from "./Button";
import styles from "./LcarsBootSequence.module.css";

const STORAGE_KEY = "lcars-booted";

export const LcarsBootSequence = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const { playClick, playTransition, playSuccess } = useLcarsSounds();
  const hasBooted = useRef(false);

  // Check session storage on mount
  useEffect(() => {
    const booted = sessionStorage.getItem(STORAGE_KEY);
    if (!booted) {
      setIsVisible(true);
      runSequence();
    } else {
      hasBooted.current = true;
    }
  }, []);

  const runSequence = async () => {
    // Helper for delays
    const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

    // Step 0: Initial black screen (already rendered)
    await wait(500);

    // Step 1: Text appears
    setStep(1);
    playClick();
    await wait(800);

    // Step 2: Bars animate
    setStep(2);
    playTransition();
    await wait(600);

    // Step 3: Status messages
    setStep(3);
    await wait(400);
    
    // Step 4: Progress bar fills
    setStep(4);
    // Animate progress manually for smoother control
    for (let i = 0; i <= 100; i += 5) {
      setProgress(i);
      await wait(30);
    }
    await wait(200);

    // Step 5: Welcome
    setStep(5);
    playSuccess();
    await wait(1500);

    // Step 6: Finish
    finishBoot();
  };

  const finishBoot = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.container} role="alert" aria-live="assertive">
      <div className={styles.content}>
        {/* Skip Button */}
        <div className={styles.skipContainer}>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={finishBoot}
            className={styles.skipButton}
          >
            SKIP BOOT SEQUENCE
          </Button>
        </div>

        {/* Main Display */}
        <div className={styles.display}>
          {step >= 1 && (
            <h1 className={`${styles.title} ${styles.fadeIn}`}>
              LCARS INTERFACE
            </h1>
          )}

          {step >= 2 && (
            <div className={styles.barsContainer}>
              <div className={`${styles.bar} ${styles.barTop}`} />
              <div className={`${styles.bar} ${styles.barBottom}`} />
            </div>
          )}

          <div className={styles.statusArea}>
            {step >= 3 && step < 5 && (
              <div className={styles.statusMessages}>
                <div className={styles.message}>INITIALIZING CORE SYSTEMS...</div>
                <div className={styles.message} style={{ animationDelay: "0.2s" }}>LOADING DATABASE...</div>
                <div className={styles.message} style={{ animationDelay: "0.4s" }}>ESTABLISHING CONNECTIONS...</div>
                {progress === 100 && <div className={styles.message}>SYSTEM READY</div>}
              </div>
            )}

            {step >= 4 && step < 5 && (
              <div className={styles.progressContainer}>
                <div 
                  className={styles.progressBar} 
                  style={{ width: `${progress}%` }} 
                />
                <div className={styles.progressText}>{progress}%</div>
              </div>
            )}

            {step >= 5 && (
              <div className={`${styles.welcome} ${styles.scaleIn}`}>
                WELCOME TO COMPND.SYSTEMS
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};