import React, { useState, useLayoutEffect, MouseEvent } from "react";
import styles from "./LcarsTouchRipple.module.css";

interface LcarsTouchRippleProps {
  children: React.ReactNode;
  color?: string; // CSS color value, defaults to var(--primary)
  duration?: number; // ms
  className?: string;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

export const LcarsTouchRipple = ({
  children,
  color,
  duration = 600,
  className,
}: LcarsTouchRippleProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Clean up ripples after animation
  useLayoutEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [ripples, duration]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    const size = Math.max(container.width, container.height);
    const x = e.clientX - container.left - size / 2;
    const y = e.clientY - container.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);
  };

  return (
    <div
      className={`${styles.container} ${className || ""}`}
      onMouseDown={handleMouseDown}
    >
      {children}
      <span className={styles.rippleContainer}>
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className={styles.ripple}
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: color,
              animationDuration: `${duration}ms`,
            }}
          />
        ))}
      </span>
    </div>
  );
};