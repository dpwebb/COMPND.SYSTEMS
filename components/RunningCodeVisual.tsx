import React, { useEffect, useState } from "react";
import styles from "./RunningCodeVisual.module.css";

const CODE_SNIPPETS = [
  "INITIALIZING GALACTIC INTERFACE...",
  "LOADING CORE MODULES [OK]",
  "ESTABLISHING SECURE CONNECTION...",
  "ENCRYPTION KEY: SHA-512-RSA [VERIFIED]",
  "Connecting to node.alpha-centauri.v4...",
  "SYNC: 99.98% COMPLETE",
  "OPTIMIZING DATA STREAMS...",
  "> run system_diagnostic --full",
  "CHECKING INTEGRITY...",
  "MEMORY ALLOCATION: 4096TB [ALLOCATED]",
  "CPU LOAD: 12% [NOMINAL]",
  "WARP DRIVE CONTROLLER: STANDBY",
  "> deploy_microservices --region=global",
  "DEPLOYING CONTAINER CLUSTER [#############]",
  "STATUS: ONLINE",
  "LISTENING ON PORT 8080...",
  "INCOMING TRANSMISSION DETECTED",
  "DECODING PACKET HEADER...",
  "SOURCE: UNKNOWN SECTOR",
  "ROUTING TO SECURITY SUBSYSTEM...",
  "> analyze_threat_level",
  "RESULT: NEGATIVE. PROCEEDING.",
  "CACHE INVALIDATED. REBUILDING INDEX...",
  "INDEX REBUILT IN 0.04ms",
  "USER SESSION AUTHENTICATED",
  "LOADING USER PREFERENCES...",
  "THEME: LCARS-DARK-MODE",
  "READY FOR INPUT_",
];

export const RunningCodeVisual = () => {
  // We double the list to ensure smooth infinite scrolling loop
  const displayLines = [...CODE_SNIPPETS, ...CODE_SNIPPETS, ...CODE_SNIPPETS];

  return (
    <div className={styles.container}>
      <div className={styles.codeStream}>
        {displayLines.map((line, index) => {
          // Simple heuristic for "syntax highlighting" based on content
          let colorClass = styles.textDefault;
          if (line.startsWith(">")) colorClass = styles.textCommand;
          if (line.includes("[OK]") || line.includes("ONLINE"))
            colorClass = styles.textSuccess;
          if (line.includes("WARNING") || line.includes("UNKNOWN"))
            colorClass = styles.textWarning;
          if (line.includes("ERROR") || line.includes("FAIL"))
            colorClass = styles.textError;
          if (line.includes("INITIALIZING") || line.includes("LOADING"))
            colorClass = styles.textInfo;

          return (
            <div key={index} className={`${styles.line} ${colorClass}`}>
              <span className={styles.lineNumber}>
                {(index % 99).toString().padStart(2, "0")}
              </span>{" "}
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
};