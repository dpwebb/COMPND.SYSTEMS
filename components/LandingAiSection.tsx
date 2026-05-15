import React from "react";
import { LcarsPanel } from "./LcarsPanel";
import { LcarsComputer } from "./LcarsComputer";
import styles from "./LandingAiSection.module.css";

export const LandingAiSection = () => {
  return (
    <div className={styles.container}>
      <LcarsPanel title="COMPUTER INTERFACE" color="primary">
        <div className={styles.content}>
          <div className={styles.description}>
            <h3 className={styles.title}>VOICE/TEXT COMMAND ACCESS</h3>
            <p className={styles.text}>
              Direct interface with COMPND.SYSTEMS core intelligence. Access the global database, inquire about system protocols, or request mission-specific data.
            </p>
          </div>
          <LcarsComputer className={styles.computer} />
        </div>
      </LcarsPanel>
    </div>
  );
};