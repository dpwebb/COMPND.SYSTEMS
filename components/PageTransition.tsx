import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./PageTransition.module.css";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition = ({ children, className }: PageTransitionProps) => {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  // When location changes, trigger animation
  useEffect(() => {
    setIsAnimating(true);
    
    // Small delay to allow the wipe to start before swapping content
    // This creates a smoother feel where the wipe "reveals" the new content
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsAnimating(false);
    }, 300); // Match this roughly with the CSS animation duration

    return () => clearTimeout(timer);
  }, [location.pathname, children]);

  // Initial mount animation
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {/* The scanning beam */}
      <div 
        className={`${styles.scanLine} ${isAnimating ? styles.scanning : ""}`} 
        aria-hidden="true"
      />
      
      {/* The content wrapper */}
      <div 
        className={`${styles.content} ${isAnimating ? styles.hidden : styles.visible}`}
      >
        {displayChildren}
      </div>
    </div>
  );
};

export default PageTransition;