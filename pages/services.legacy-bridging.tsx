import React from "react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import {
  Cable,
  FileCode,
  Server,
  ArrowRight,
  RefreshCcw,
  Layers,
} from "lucide-react";
import styles from "./services.legacy-bridging.module.css";

const relatedServices = [
  { label: "API MANAGEMENT", path: "/services/api-management" },
  { label: "ESB IMPLEMENTATION", path: "/services/esb-implementation" },
  { label: "DATA SYNCHRONIZATION", path: "/services/data-synchronization" },
];

export default function LegacyBridgingPage() {
  return (
    <ServiceDetailTemplate
      title="LEGACY BRIDGING"
      subtitle="MAINFRAME INTEGRATION AND MODERNIZATION"
      serviceId="LEGACY-OPS"
      description="Connecting modern digital experiences with established core systems. We build secure, high-performance bridges to mainframes and legacy databases, extending the life of critical assets while enabling innovation."
      relatedServices={relatedServices}
      color="info"
    >
      {/* Integration Patterns */}
      <LcarsPanel title="INTEGRATION PATTERNS" color="info">
        <div className={styles.patternsGrid}>
          <div className={styles.patternBox}>
            <div className={styles.patternIcon}>
              <Cable />
            </div>
            <h3>ADAPTER PATTERN</h3>
            <p>
              Standardized wrappers that translate modern API calls into
              legacy-specific protocols, hiding complexity from the consumer.
            </p>
          </div>
          <div className={styles.patternBox}>
            <div className={styles.patternIcon}>
              <Layers />
            </div>
            <h3>ANTI-CORRUPTION LAYER</h3>
            <p>
              A protective boundary that translates between the legacy domain
              model and the modern domain model to prevent design bleed.
            </p>
          </div>
          <div className={styles.patternBox}>
            <div className={styles.patternIcon}>
              <RefreshCcw />
            </div>
            <h3>STRANGLER FIG</h3>
            <p>
              Gradual replacement of legacy functionality by routing specific
              requests to new microservices until the old system is obsolete.
            </p>
          </div>
        </div>
      </LcarsPanel>

      {/* Legacy Protocols */}
      <div className={styles.protocolsSection}>
        <LcarsPanel
          title="LEGACY PROTOCOLS"
          color="info"
          className={styles.protocolPanel}
        >
          <div className={styles.protocolList}>
            <div className={styles.protocolItem}>
              <Server size={24} className={styles.pIcon} />
              <div className={styles.pContent}>
                <h4>MAINFRAME</h4>
                <p>CICS, IMS, COBOL Copybooks, TN3270 Screen Scraping</p>
              </div>
            </div>
            <div className={styles.protocolItem}>
              <FileCode size={24} className={styles.pIcon} />
              <div className={styles.pContent}>
                <h4>FILE-BASED</h4>
                <p>EDI (X12, EDIFACT), Flat Files, Batch Processing</p>
              </div>
            </div>
            <div className={styles.protocolItem}>
              <Cable size={24} className={styles.pIcon} />
              <div className={styles.pContent}>
                <h4>PROPRIETARY</h4>
                <p>SOAP/XML, RPC, Direct Database Links (ODBC/JDBC)</p>
              </div>
            </div>
          </div>
        </LcarsPanel>

        <LcarsPanel
          title="MIGRATION STRATEGY"
          color="info"
          className={styles.strategyPanel}
        >
          <div className={styles.strategySteps}>
            <div className={styles.step}>
              <span className={styles.stepNum}>01</span>
              <span>IDENTIFY SEAMS</span>
            </div>
            <ArrowRight size={16} className={styles.stepArrow} />
            <div className={styles.step}>
              <span className={styles.stepNum}>02</span>
              <span>BUILD PROXY</span>
            </div>
            <ArrowRight size={16} className={styles.stepArrow} />
            <div className={styles.step}>
              <span className={styles.stepNum}>03</span>
              <span>REROUTE TRAFFIC</span>
            </div>
            <ArrowRight size={16} className={styles.stepArrow} />
            <div className={styles.step}>
              <span className={styles.stepNum}>04</span>
              <span>DECOMMISSION</span>
            </div>
          </div>
          <div className={styles.strategyNote}>
            <p>
              Our approach minimizes risk by ensuring the legacy system remains
              operational throughout the transition period.
            </p>
          </div>
        </LcarsPanel>
      </div>
    </ServiceDetailTemplate>
  );
}