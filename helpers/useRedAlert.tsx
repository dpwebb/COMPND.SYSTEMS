import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { useLcarsSounds } from "./useLcarsSounds";
import styles from "./useRedAlert.module.css";

interface RedAlertContextType {
  isRedAlert: boolean;
  activateRedAlert: () => void;
  deactivateRedAlert: () => void;
  toggleRedAlert: () => void;
}

const RedAlertContext = createContext<RedAlertContextType | null>(null);

export const RedAlertProvider = ({ children }: { children: ReactNode }) => {
  const [isRedAlert, setIsRedAlert] = useState(false);
  const { playAlert } = useLcarsSounds();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Manage the alert sound loop
  useEffect(() => {
    if (isRedAlert) {
      // Play immediately
      playAlert();
      
      // Loop every 2 seconds (adjust based on sound duration)
      intervalRef.current = setInterval(() => {
        playAlert();
      }, 2000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRedAlert, playAlert]);

  const activateRedAlert = useCallback(() => setIsRedAlert(true), []);
  const deactivateRedAlert = useCallback(() => setIsRedAlert(false), []);
  const toggleRedAlert = useCallback(() => setIsRedAlert((prev) => !prev), []);

  const value = {
    isRedAlert,
    activateRedAlert,
    deactivateRedAlert,
    toggleRedAlert,
  };

  return (
    <RedAlertContext.Provider value={value}>
      {children}
      {/* Visual Overlay */}
      <div
        className={`${styles.overlay} ${isRedAlert ? styles.active : ""}`}
        aria-hidden="true"
      >
        <div className={styles.borderTop} />
        <div className={styles.borderBottom} />
        <div className={styles.borderLeft} />
        <div className={styles.borderRight} />
        <div className={styles.vignette} />
        <div className={styles.label}>RED ALERT</div>
      </div>
    </RedAlertContext.Provider>
  );
};

export const useRedAlert = () => {
  const context = useContext(RedAlertContext);
  if (!context) {
    throw new Error("useRedAlert must be used within a RedAlertProvider");
  }
  return context;
};