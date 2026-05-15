import React, { useEffect, useState } from "react";
import { LcarsSoundToggle } from "./LcarsSoundToggle";
import { LcarsRedAlertToggle } from "./LcarsRedAlertToggle";
import styles from "./LcarsStatusBar.module.css";

const useRandomBlink = (minInterval = 2000, maxInterval = 8000) => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const toggle = () => {
      setActive((prev) => !prev);
      const nextInterval =
        Math.random() * (maxInterval - minInterval) + minInterval;
      // Brief off state for "blinking", longer on state
      setTimeout(
        toggle,
        active ? 100 + Math.random() * 200 : nextInterval, // If active (about to turn off), short delay. If inactive, long delay.
      );
    };

    const timer = setTimeout(toggle, Math.random() * maxInterval);
    return () => clearTimeout(timer);
  }, [active, minInterval, maxInterval]);

  return active;
};

const StatusIndicator = ({
  label,
  status,
  colorVar = "--success",
  blinkSpeed = "normal",
}: {
  label: string;
  status: string;
  colorVar?: string;
  blinkSpeed?: "slow" | "normal" | "fast";
}) => {
  return (
    <div className={styles.statusIndicator}>
      <span className={styles.statusText}>
        {label}: {status}
      </span>
      <span
        className={`${styles.statusDot} ${styles[blinkSpeed]}`}
        style={{ backgroundColor: `var(${colorVar})` }}
        aria-hidden="true"
      />
    </div>
  );
};

export const LcarsStatusBar = ({ className }: { className?: string }) => {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate Stardate: YYYY.DayOfYear
  const getStardate = (date: Date) => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return `${date.getFullYear()}.${day.toString().padStart(3, "0")}`;
  };

  // Format time: HH:MM:SS
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (!mounted) return null;

  return (
    <div
      className={`${styles.statusBar} ${className || ""}`}
      role="contentinfo"
      aria-label="System status"
    >
      <div className={styles.barSegment} />
      <div className={styles.content}>
        <div className={styles.group}>
          <span className={styles.label}>STARDATE</span>
          <span className={styles.value}>{getStardate(time)}</span>
        </div>

        <div className={styles.separator} />

        <div className={styles.group}>
          <StatusIndicator label="SYS" status="OK" colorVar="--success" />
        </div>

        <div className={styles.separator} />

        <div className={styles.group}>
          <LcarsRedAlertToggle />
        </div>

        {/* Extended indicators for larger screens */}
        <div className={`${styles.group} ${styles.hideMobile}`}>
          <div className={styles.separator} />
          <StatusIndicator
            label="COMMS"
            status="ACT"
            colorVar="--info"
            blinkSpeed="slow"
          />
          <div className={styles.separator} />
          <StatusIndicator
            label="SENS"
            status="NOM"
            colorVar="--warning"
            blinkSpeed="fast"
          />
        </div>

        <div className={styles.separator} />

        <div className={styles.group}>
          <span className={styles.label}>TIME</span>
          <span className={styles.value} aria-live="off">
            {formatTime(time)}
          </span>
        </div>

        <div className={styles.separator} />

        <div className={styles.group}>
          <LcarsSoundToggle />
        </div>

        <div className={styles.flexSpacer} />

        <div className={styles.branding}>
          COMPND.SYSTEMS // GLOBAL OPERATIONS
        </div>
      </div>
      <div className={styles.endCap} />
    </div>
  );
};