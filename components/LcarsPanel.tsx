import React, { useId } from "react";
import styles from "./LcarsPanel.module.css";

interface LcarsPanelProps {
  title?: string;
  color?: "primary" | "secondary" | "accent" | "muted" | "info";
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export const LcarsPanel = ({
  title,
  color = "primary",
  children,
  className,
  action,
}: LcarsPanelProps) => {
  const titleId = useId();

  return (
    <div
      className={`${styles.panel} ${styles[color]} ${className || ""}`}
      role="region"
      aria-labelledby={title ? titleId : undefined}
    >
      <div className={styles.header}>
        {title && (
          <h3 id={titleId} className={styles.title}>
            {title}
          </h3>
        )}
        <div className={styles.bar} />
        {action && <div className={styles.action}>{action}</div>}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};