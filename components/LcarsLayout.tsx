import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLcarsSounds } from "../helpers/useLcarsSounds";
import { useLcarsAnnouncer } from "../helpers/useLcarsAnnouncer";
import { LcarsStatusBar } from "./LcarsStatusBar";
import { PageTransition } from "./PageTransition";
import { LcarsBootSequence } from "./LcarsBootSequence";
import { LcarsTouchRipple } from "./LcarsTouchRipple";
import { LcarsDataStream } from "./LcarsDataStream";
import styles from "./LcarsLayout.module.css";

export const LcarsLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { playClick, playTransition } = useLcarsSounds();
  const { announceNavigation } = useLcarsAnnouncer();
  const isInitialMount = useRef(true);

  // Play transition sound and announce navigation when route changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    playTransition();
    // Announce the page we are navigating to based on pathname
    const pathToName: Record<string, string> = {
      "/": "System Main",
      "/contact": "Communications",
      "/estimate": "Mission Planning",
      "/blog": "Incoming Transmissions",
      "/case-studies": "Mission Logs",
      "/about": "Personnel",
      "/software": "Active Systems",
      "/services": "Operations",
      "/admin/autonomy": "Admin Autonomy",
    };
    const pageName = pathToName[location.pathname] || location.pathname.substring(1);
    announceNavigation(pageName);
  }, [location.pathname, playTransition, announceNavigation]);

  const navItems = [
    { label: "SYSTEM MAIN", path: "/" },
    { label: "OPERATIONS", path: "/services" },
    { label: "SOFTWARE", path: "/software" },
    { label: "ABOUT", path: "/about" },
    { label: "CASE STUDIES", path: "/case-studies" },
    { label: "BLOG", path: "/blog" },
    { label: "ESTIMATE", path: "/estimate" },
    { label: "COMMUNICATIONS", path: "/contact" },
    { label: "ADMIN", path: "/admin/autonomy" },
  ];

  return (
    <div className={styles.container}>
      <LcarsBootSequence />
      
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      {/* Top Header Bar */}
      <header className={styles.header} role="banner">
        <div className={styles.headerBar}>
          <div className={styles.headerTitle}>COMPND.SYSTEMS</div>
          <div className={styles.headerDecor}>LCARS 45-2025</div>
          <nav className={styles.nav} aria-label="Main navigation">
            {navItems.map((item) => (
              <LcarsTouchRipple key={item.path} className={styles.navLinkWrapper}>
                <Link
                  to={item.path}
                  onClick={() => playClick()}
                  className={`${styles.navLink} ${
                    location.pathname === item.path || (item.path === "/admin/autonomy" && location.pathname.startsWith("/admin"))
                      ? styles.active
                      : ""
                  }`}
                  aria-current={
                    location.pathname === item.path || (item.path === "/admin/autonomy" && location.pathname.startsWith("/admin"))
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              </LcarsTouchRipple>
            ))}
          </nav>
        </div>
      </header>

      <div className={styles.bodyFrame}>
        {/* Left Sidebar Structure */}
        <aside
          className={styles.sidebar}
          role="complementary"
          aria-label="Date display"
        >
          <div className={styles.sidebarMiddleBlock}>
            <div className={styles.sidebarNumber}>
              {(new Date().getMonth() + 1).toString().padStart(2, "0")}
            </div>
            <div className={styles.sidebarNumber}>
              {new Date().getDate().toString().padStart(2, "0")}
            </div>
            <div className={styles.sidebarNumber}>
              {new Date().getFullYear().toString().slice(-2)}
            </div>
            <div className={styles.dataStreamContainer}>
              <LcarsDataStream
                mode="binary"
                rows={5}
                speed="slow"
                color="secondary"
                label="SYS.MON"
              />
            </div>
          </div>
          <div className={styles.sidebarBottomBlock}>
            <div className={styles.dateDisplay}>
              <span className={styles.dateDay}>{new Date().getDate().toString().padStart(2, '0')}</span>
              <span className={styles.dateMonth}>{new Date().toLocaleString('en-US', { month: 'short' }).toUpperCase()}</span>
              <span className={styles.dateYear}>{new Date().getFullYear()}</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main id="main-content" className={styles.main} tabIndex={-1}>
          <div className={styles.contentInner}>
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </main>
      </div>
      <LcarsStatusBar />
    </div>
  );
};

export default LcarsLayout;
