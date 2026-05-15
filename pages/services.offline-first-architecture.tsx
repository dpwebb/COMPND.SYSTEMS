import React from "react";
import {
  Database,
  WifiOff,
  RefreshCcw,
  GitMerge,
  HardDrive,
  Cloud,
} from "lucide-react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import styles from "./services.offline-first-architecture.module.css";

export default function OfflineFirstPage() {
  return (
    <ServiceDetailTemplate
      title="OFFLINE-FIRST ARCHITECTURE"
      subtitle="RESILIENT DATA SYNCHRONIZATION"
      serviceId="MOB-OFFLINE"
      description="Empower your workforce with applications that perform flawlessly regardless of network conditions. We architect robust local persistence layers and sophisticated synchronization engines that ensure data integrity and availability in the most remote environments."
      color="muted"
      relatedServices={[
        { label: "REACT NATIVE / FLUTTER", path: "/services/react-native-flutter" },
        { label: "NATIVE IOS / ANDROID", path: "/services/native-ios-android" },
        { label: "IOT INTEGRATION", path: "/services/iot-integration" },
      ]}
    >
      {/* Architecture Diagram */}
      <div className={styles.archDiagram}>
        <div className={styles.archNode}>
          <HardDrive size={32} className={styles.nodeIcon} />
          <span className={styles.nodeLabel}>LOCAL DB</span>
          <span className={styles.nodeSub}>SQLite / Realm</span>
        </div>
        
        <div className={styles.archFlow}>
          <div className={styles.flowLine} />
          <div className={styles.flowLabel}>
            <RefreshCcw size={16} /> SYNC ENGINE
          </div>
          <div className={styles.flowLine} />
        </div>

        <div className={styles.archNode}>
          <Cloud size={32} className={styles.nodeIcon} />
          <span className={styles.nodeLabel}>CLOUD</span>
          <span className={styles.nodeSub}>REST / GraphQL</span>
        </div>
      </div>

      {/* Core Technologies */}
      <LcarsPanel title="PERSISTENCE LAYERS" color="muted">
        <div className={styles.techGrid}>
          <div className={styles.techCard}>
            <div className={styles.techHeader}>
              <Database size={20} />
              <h4>SQLITE / WATERMELON DB</h4>
            </div>
            <p>High-performance relational data storage. Ideal for complex queries and large datasets on the device.</p>
          </div>
          <div className={styles.techCard}>
            <div className={styles.techHeader}>
              <Database size={20} />
              <h4>REALM</h4>
            </div>
            <p>Object-oriented database with zero-copy architecture. Extremely fast reads and easy object mapping.</p>
          </div>
          <div className={styles.techCard}>
            <div className={styles.techHeader}>
              <Database size={20} />
              <h4>CORE DATA / ROOM</h4>
            </div>
            <p>Native platform persistence solutions offering deep integration with OS-level features and optimizations.</p>
          </div>
        </div>
      </LcarsPanel>

      {/* Conflict Resolution */}
      <div className={styles.conflictSection}>
        <h3 className={styles.sectionTitle}>
          <GitMerge size={24} /> CONFLICT RESOLUTION STRATEGIES
        </h3>
        <div className={styles.strategyList}>
          <div className={styles.strategyItem}>
            <div className={styles.strategyMarker}>01</div>
            <div className={styles.strategyContent}>
              <h4>LAST WRITE WINS (LWW)</h4>
              <p>Timestamp-based resolution. Simple and effective for non-collaborative data fields.</p>
            </div>
          </div>
          <div className={styles.strategyItem}>
            <div className={styles.strategyMarker}>02</div>
            <div className={styles.strategyContent}>
              <h4>OPERATIONAL TRANSFORMATION</h4>
              <p>Complex merging for collaborative text editing and shared document states.</p>
            </div>
          </div>
          <div className={styles.strategyItem}>
            <div className={styles.strategyMarker}>03</div>
            <div className={styles.strategyContent}>
              <h4>MANUAL MERGE</h4>
              <p>User-prompted resolution when business logic cannot automatically determine the correct state.</p>
            </div>
          </div>
        </div>
      </div>

      {/* PWA Note */}
      <div className={styles.pwaNote}>
        <div className={styles.pwaIcon}>
          <WifiOff size={24} />
        </div>
        <div className={styles.pwaContent}>
          <h4>PROGRESSIVE WEB APPS (PWA)</h4>
          <p>
            We also implement Service Workers and Cache API strategies to bring offline capabilities to web-based mobile solutions, ensuring app-like reliability in the browser.
          </p>
        </div>
      </div>
    </ServiceDetailTemplate>
  );
}