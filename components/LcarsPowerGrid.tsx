import React, { useEffect, useState } from "react";
import styles from "./LcarsPowerGrid.module.css";

type Size = "sm" | "md" | "lg";
type Intensity = "low" | "normal" | "high";

interface LcarsPowerGridProps {
  size?: Size;
  animated?: boolean;
  intensity?: Intensity;
  className?: string;
}

export const LcarsPowerGrid = ({
  size = "md",
  animated = true,
  intensity = "normal",
  className,
}: LcarsPowerGridProps) => {
  // We use a grid of nodes to simulate power distribution points
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    if (!animated) return;

    const nodeCount = 12; // Number of random nodes to flash
    const intervalTime = intensity === "high" ? 200 : intensity === "low" ? 1000 : 500;

    const interval = setInterval(() => {
      // Randomly activate a few nodes
      const newActive = Array.from({ length: 3 }, () =>
        Math.floor(Math.random() * nodeCount)
      );
      setActiveNodes(newActive);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [animated, intensity]);

  return (
    <div
      className={`${styles.container} ${styles[size]} ${
        animated ? styles.animated : ""
      } ${styles[intensity]} ${className || ""}`}
      aria-hidden="true"
    >
      {/* Central Core */}
      <div className={styles.coreWrapper}>
        <div className={styles.coreRing} />
        <div className={styles.corePulse} />
      </div>

      {/* Distribution Lines (SVG for crisp lines) */}
      <svg className={styles.gridLines} viewBox="0 0 200 100" preserveAspectRatio="none">
        {/* Horizontal Main Bus */}
        <line x1="0" y1="50" x2="200" y2="50" className={styles.mainBus} />
        
        {/* Vertical Feeds */}
        <line x1="40" y1="10" x2="40" y2="90" className={styles.feedLine} />
        <line x1="80" y1="20" x2="80" y2="80" className={styles.feedLine} />
        <line x1="120" y1="20" x2="120" y2="80" className={styles.feedLine} />
        <line x1="160" y1="10" x2="160" y2="90" className={styles.feedLine} />

        {/* Connection Nodes */}
        <circle cx="40" cy="50" r="3" className={styles.node} />
        <circle cx="80" cy="50" r="3" className={styles.node} />
        <circle cx="120" cy="50" r="3" className={styles.node} />
        <circle cx="160" cy="50" r="3" className={styles.node} />
      </svg>

      {/* Animated Particles/Flow */}
      {animated && (
        <div className={styles.flowContainer}>
          <div className={styles.particle} style={{ animationDelay: "0s" }} />
          <div className={styles.particle} style={{ animationDelay: "1s" }} />
          <div className={styles.particle} style={{ animationDelay: "2s" }} />
        </div>
      )}
    </div>
  );
};