import React, { useEffect, useState, useMemo } from "react";
import styles from "./LcarsDataStream.module.css";

type DataMode = "hex" | "binary" | "numeric" | "text";
type Speed = "slow" | "normal" | "fast";
type Color = "primary" | "secondary" | "accent" | "muted" | "info" | "success" | "warning" | "error";

interface LcarsDataStreamProps {
  mode?: DataMode;
  rows?: number;
  speed?: Speed;
  color?: Color;
  className?: string;
  label?: string;
}

const TEXT_SNIPPETS = [
  "SCANNING SECTOR 001",
  "ANALYZING ATMOSPHERE",
  "LIFE SIGNS DETECTED",
  "ENCRYPTION: VERIFIED",
  "WARP CORE STABLE",
  "SHIELDS: 100%",
  "COMMUNICATIONS: OPEN",
  "DATA TRANSFER: ACTIVE",
  "SUBSPACE SIGNAL: STRONG",
  "DIAGNOSTIC COMPLETE",
  "REROUTING POWER",
  "ACCESSING DATABASE",
];

const generateValue = (mode: DataMode): string => {
  switch (mode) {
    case "hex":
      return Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * 16)
          .toString(16)
          .toUpperCase()
      ).join("");
    case "binary":
      return Array.from({ length: 8 }, () =>
        Math.random() > 0.5 ? "1" : "0"
      ).join("");
    case "numeric":
      return (Math.random() * 1000).toFixed(2).padStart(7, "0");
    case "text":
      return TEXT_SNIPPETS[Math.floor(Math.random() * TEXT_SNIPPETS.length)];
    default:
      return "---";
  }
};

const Row = ({
  mode,
  speedMs,
  color,
}: {
  mode: DataMode;
  speedMs: number;
  color: string;
}) => {
  const [value, setValue] = useState(generateValue(mode));
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    // Randomize the interval slightly so rows don't update in perfect unison
    const intervalTime = speedMs + Math.random() * (speedMs / 2);
    
    const interval = setInterval(() => {
      setValue(generateValue(mode));
      // Occasionally highlight a row for visual interest
      if (Math.random() > 0.8) {
        setHighlight(true);
        setTimeout(() => setHighlight(false), 200);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [mode, speedMs]);

  return (
    <div className={`${styles.row} ${highlight ? styles.highlight : ""}`}>
      <span className={styles.prefix}>
        {Math.floor(Math.random() * 99)
          .toString()
          .padStart(2, "0")}
      </span>
      <span className={styles.value}>{value}</span>
    </div>
  );
};

export const LcarsDataStream = ({
  mode = "hex",
  rows = 4,
  speed = "normal",
  color = "primary",
  className,
  label,
}: LcarsDataStreamProps) => {
  const speedMs = useMemo(() => {
    switch (speed) {
      case "slow":
        return 1500;
      case "fast":
        return 200;
      case "normal":
      default:
        return 800;
    }
  }, [speed]);

  // Create an array of indices for the rows
  const rowIndices = useMemo(
    () => Array.from({ length: rows }, (_, i) => i),
    [rows]
  );

  return (
    <div className={`${styles.container} ${styles[color]} ${className || ""}`}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.stream}>
        {rowIndices.map((i) => (
          <Row key={i} mode={mode} speedMs={speedMs} color={color} />
        ))}
      </div>
      {/* Decorative bottom bar */}
      <div className={styles.footer} />
    </div>
  );
};