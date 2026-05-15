import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useLcarsSounds } from "../helpers/useLcarsSounds";
import styles from "./LcarsSoundToggle.module.css";

export const LcarsSoundToggle = ({ className }: { className?: string }) => {
  const { isSoundEnabled, toggleSound, playClick } = useLcarsSounds();

  const handleToggle = () => {
    // We play click first then toggle, or vice versa. 
    // In LCARS, the sound usually accompanies the physical interaction.
    playClick();
    toggleSound();
  };

  return (
    <button
      className={`${styles.toggleButton} ${isSoundEnabled ? styles.enabled : styles.disabled} ${className || ""}`}
      onClick={handleToggle}
      aria-label={isSoundEnabled ? "Disable Sound" : "Enable Sound"}
    >
      <span className={styles.iconWrapper}>
        {isSoundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </span>
      <span className={styles.label}>
        AUDIO: {isSoundEnabled ? "ON" : "OFF"}
      </span>
    </button>
  );
};