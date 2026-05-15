import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { LcarsPanel } from "../components/LcarsPanel";
import { AlertTriangle, Home, Search } from "lucide-react";
import styles from "./$.module.css";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 Signal Lost | COMPND.SYSTEMS</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.errorDisplay}>
          <div className={styles.errorCode}>404</div>
          <div className={styles.scanLine} />
          <div className={styles.scanOverlay} />
        </div>

        <LcarsPanel title="DIAGNOSTIC REPORT" color="secondary" className={styles.panel}>
          <div className={styles.content}>
            <div className={styles.iconWrapper}>
              <AlertTriangle size={48} />
            </div>
            
            <div className={styles.message}>
              <h2 className={styles.title}>SIGNAL LOST</h2>
              <p className={styles.description}>
                UNABLE TO LOCATE THE REQUESTED SECTOR. THE COORDINATES YOU ENTERED MAY BE INCORRECT OR THE SYSTEM IS OFFLINE.
              </p>
              <div className={styles.technicalDetails}>
                <p>ERROR_CODE: HTTP_404_NOT_FOUND</p>
                <p>SUBSPACE_INTERFERENCE: DETECTED</p>
                <p>REROUTING_PROTOCOLS: STANDBY</p>
              </div>
            </div>

            <div className={styles.actions}>
              <Button asChild size="lg" className={styles.homeBtn}>
                <Link to="/">
                  <Home size={18} /> RETURN TO BASE
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">
                  <Search size={18} /> SCAN SERVICES
                </Link>
              </Button>
            </div>
          </div>
        </LcarsPanel>
      </div>
    </>
  );
}