import React from "react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import { RefreshCw, ShieldAlert, TrendingUp, Layers } from "lucide-react";
import styles from "./services.legacy-system-modernization.module.css";

const relatedServices = [
  { label: "FULL-CYCLE DEV", path: "/services/full-cycle-development" },
  { label: "HIGH-PERFORMANCE ARCH", path: "/services/high-performance-architecture" },
  { label: "MICROSERVICES", path: "/services/microservices-implementation" },
];

export default function LegacyModernizationPage() {
  return (
    <ServiceDetailTemplate
      title="LEGACY MODERNIZATION"
      subtitle="SYSTEM RE-ENGINEERING AND INFRASTRUCTURE EVOLUTION"
      serviceId="LSM-02"
      description="We transform outdated, monolithic legacy systems into modern, scalable, and secure cloud-native applications. Our modernization strategies are designed to mitigate risk while unlocking new operational capabilities, ensuring your business isn't held back by technical debt."
      relatedServices={relatedServices}
      color="secondary"
    >
      <LcarsPanel title="MODERNIZATION VECTORS" color="secondary">
        <div className={styles.approachesGrid}>
          <div className={styles.approachItem}>
            <div className={styles.approachIcon}><RefreshCw /></div>
            <div className={styles.approachContent}>
              <h3>REPLATFORMING</h3>
              <p>Migrating applications to the cloud with minimal code changes to leverage flexible infrastructure.</p>
            </div>
          </div>
          <div className={styles.approachItem}>
            <div className={styles.approachIcon}><Layers /></div>
            <div className={styles.approachContent}>
              <h3>REFACTORING</h3>
              <p>Optimizing existing code to improve maintainability and performance without changing external behavior.</p>
            </div>
          </div>
          <div className={styles.approachItem}>
            <div className={styles.approachIcon}><TrendingUp /></div>
            <div className={styles.approachContent}>
              <h3>REBUILDING</h3>
              <p>Rewriting critical components from scratch using modern technologies while preserving business logic.</p>
            </div>
          </div>
        </div>
      </LcarsPanel>

      <LcarsPanel title="ASSESSMENT & MIGRATION" color="accent">
        <div className={styles.methodologySection}>
          <p className={styles.methodText}>
            Our proprietary assessment methodology scans your existing codebase to identify high-risk dependencies, security vulnerabilities, and performance bottlenecks. We then construct a phased migration roadmap that ensures zero downtime during the transition.
          </p>
          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <span className={styles.stepNum}>01</span>
              <span className={styles.stepLabel}>CODE AUDIT</span>
            </div>
            <div className={styles.connector} />
            <div className={styles.step}>
              <span className={styles.stepNum}>02</span>
              <span className={styles.stepLabel}>RISK MAPPING</span>
            </div>
            <div className={styles.connector} />
            <div className={styles.step}>
              <span className={styles.stepNum}>03</span>
              <span className={styles.stepLabel}>PARALLEL RUN</span>
            </div>
            <div className={styles.connector} />
            <div className={styles.step}>
              <span className={styles.stepNum}>04</span>
              <span className={styles.stepLabel}>CUTOVER</span>
            </div>
          </div>
        </div>
      </LcarsPanel>

      <LcarsPanel title="STRATEGIC IMPERATIVES" color="muted">
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <ShieldAlert className={styles.statIcon} />
            <span className={styles.statValue}>SECURITY</span>
            <span className={styles.statDesc}>Eliminate unpatched vulnerabilities in EOL frameworks.</span>
          </div>
          <div className={styles.statCard}>
            <TrendingUp className={styles.statIcon} />
            <span className={styles.statValue}>SCALABILITY</span>
            <span className={styles.statDesc}>Break free from vertical scaling limits of on-prem hardware.</span>
          </div>
          <div className={styles.statCard}>
            <RefreshCw className={styles.statIcon} />
            <span className={styles.statValue}>COST</span>
            <span className={styles.statDesc}>Reduce maintenance overhead of supporting obsolete tech.</span>
          </div>
        </div>
      </LcarsPanel>
    </ServiceDetailTemplate>
  );
}