import React from "react";
import { useRedAlert } from "../helpers/useRedAlert";
import { useLcarsSounds } from "../helpers/useLcarsSounds";
import styles from "./LcarsRedAlertToggle.module.css";

interface LcarsRedAlertToggleProps {
  className?: string;
}

export const LcarsRedAlertToggle = ({ className }: LcarsRedAlertToggleProps) => {
  const { isRedAlert, toggleRedAlert } = useRedAlert();
  const { playClick } = useLcarsSounds();

  const handleToggle = () => {
    playClick();
    toggleRedAlert();
  };

  return (
    <button
      className={`${styles.toggleButton} ${isRedAlert ? styles.active : ""} ${className || ""}`}
      onClick={handleToggle}
      aria-pressed={isRedAlert}
      title={isRedAlert ? "Deactivate Red Alert" : "Activate Red Alert"}
    >
      <span className={styles.dot} />
      <span className={styles.label}>RED ALERT</span>
    </button>
  );
};