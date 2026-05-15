import React from "react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import { RefreshCw, Database, Scale, ShieldAlert } from "lucide-react";
import styles from "./services.data-synchronization.module.css";

const relatedServices = [
  { label: "API MANAGEMENT", path: "/services/api-management" },
  { label: "ESB IMPLEMENTATION", path: "/services/esb-implementation" },
  { label: "LEGACY BRIDGING", path: "/services/legacy-bridging" },
];

export default function DataSynchronizationPage() {
  return (
    <ServiceDetailTemplate
      title="DATA SYNCHRONIZATION"
      subtitle="CONSISTENCY PROTOCOLS AND REPLICATION"
      serviceId="DATA-SYNC"
      description="Ensuring data integrity across distributed systems through advanced synchronization patterns. We implement real-time and batch replication strategies that handle conflict resolution and ensure your data remains consistent and available."
      relatedServices={relatedServices}
      color="info"
    >
      {/* Sync Patterns */}
      <LcarsPanel title="SYNCHRONIZATION PATTERNS" color="info">
        <div className={styles.patternGrid}>
          <div className={styles.patternCard}>
            <div className={styles.cardHeader}>
              <RefreshCw size={20} />
              <span>REAL-TIME SYNC</span>
            </div>
            <p>
              Instantaneous data propagation using event streams and webhooks.
              Critical for user-facing applications requiring immediate
              feedback.
            </p>
          </div>
          <div className={styles.patternCard}>
            <div className={styles.cardHeader}>
              <Database size={20} />
              <span>CHANGE DATA CAPTURE</span>
            </div>
            <p>
              Log-based replication (CDC) that captures database changes as they
              happen, decoupling source systems from downstream consumers.
            </p>
          </div>
          <div className={styles.patternCard}>
            <div className={styles.cardHeader}>
              <Scale size={20} />
              <span>BI-DIRECTIONAL</span>
            </div>
            <p>
              Multi-master replication allowing updates from multiple locations.
              Includes sophisticated conflict detection algorithms.
            </p>
          </div>
        </div>
      </LcarsPanel>

      {/* Consistency & Conflict */}
      <div className={styles.detailsSection}>
        <LcarsPanel
          title="CONSISTENCY MODELS"
          color="info"
          className={styles.detailPanel}
        >
          <div className={styles.modelComparison}>
            <div className={styles.modelItem}>
              <h4>STRONG CONSISTENCY</h4>
              <p>
                Guarantees that all reads receive the most recent write. Higher
                latency, lower availability (CAP theorem).
              </p>
              <div className={styles.useCase}>USE CASE: FINANCIAL TRANSACTIONS</div>
            </div>
            <div className={styles.divider} />
            <div className={styles.modelItem}>
              <h4>EVENTUAL CONSISTENCY</h4>
              <p>
                Updates propagate asynchronously. High availability and low
                latency, but temporary data staleness.
              </p>
              <div className={styles.useCase}>USE CASE: SOCIAL FEEDS / ANALYTICS</div>
            </div>
          </div>
        </LcarsPanel>

        <LcarsPanel
          title="CONFLICT RESOLUTION"
          color="info"
          className={styles.detailPanel}
        >
          <ul className={styles.conflictList}>
            <li>
              <ShieldAlert size={16} />
              <span>
                <strong>Last Write Wins (LWW):</strong> Timestamp-based
                resolution. Simple but can lose data.
              </span>
            </li>
            <li>
              <ShieldAlert size={16} />
              <span>
                <strong>Version Vectors:</strong> Tracks modification history to
                detect concurrent updates.
              </span>
            </li>
            <li>
              <ShieldAlert size={16} />
              <span>
                <strong>Custom Logic:</strong> Domain-specific rules merged via
                application code.
              </span>
            </li>
            <li>
              <ShieldAlert size={16} />
              <span>
                <strong>Master Data Management:</strong> Single source of truth
                governance.
              </span>
            </li>
          </ul>
        </LcarsPanel>
      </div>

      {/* CDC Visualization */}
      <div className={styles.cdcVisual}>
        <div className={styles.cdcLabel}>CDC PIPELINE ARCHITECTURE</div>
        <div className={styles.cdcFlow}>
          <div className={styles.cdcNode}>DB TRANSACTION LOG</div>
          <div className={styles.cdcConnector}>
            <div className={styles.movingDot} />
          </div>
          <div className={styles.cdcNode}>STREAM PROCESSOR</div>
          <div className={styles.cdcConnector}>
            <div className={styles.movingDot} />
          </div>
          <div className={styles.cdcNode}>DATA WAREHOUSE</div>
        </div>
      </div>
    </ServiceDetailTemplate>
  );
}