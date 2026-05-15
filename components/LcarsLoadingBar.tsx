import React from "react";
import styles from "./LcarsLoadingBar.module.css";

type Variant = "determinate" | "indeterminate";
type Size = "sm" | "md" | "lg";
type Color = "primary" | "secondary" | "accent" | "muted" | "info" | "success" | "warning" | "error";

interface LcarsLoadingBarProps {
  progress?: number; // 0 to 100
  variant?: Variant;
  label?: string;
  color?: Color;
  size?: Size;
  className?: string;
  segments?: number; // Number of visual blocks
}

export const LcarsLoadingBar = ({
  progress = 0,
  variant = "determinate",
  label,
  color = "primary",
  size = "md",
  className,
  segments = 20,
}: LcarsLoadingBarProps) => {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  // Calculate how many segments should be filled
  const filledSegments = Math.round((clampedProgress / 100) * segments);

  return (
    <div 
      className={`${styles.container} ${styles[size]} ${styles[color]} ${className || ""}`}
      role="progressbar"
      aria-valuenow={variant === "determinate" ? clampedProgress : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={styles.header}>
        {label && <span className={styles.label}>{label}</span>}
        {variant === "determinate" && (
          <span className={styles.percentage}>
            {Math.round(clampedProgress)}%
          </span>
        )}
      </div>

      <div className={styles.track}>
        {variant === "determinate" ? (
          // Determinate: Render individual segments
          Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className={`${styles.segment} ${
                i < filledSegments ? styles.filled : styles.empty
              }`}
              style={{
                // Add a tiny delay for a "filling up" animation effect if progress changes rapidly
                transitionDelay: `${i * 10}ms` 
              }}
            />
          ))
        ) : (
          // Indeterminate: Animated scanner bar
          <div className={styles.indeterminateBar}>
            <div className={styles.scanner} />
          </div>
        )}
      </div>
    </div>
  );
};