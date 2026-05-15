import React from "react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import { GitBranch, RefreshCw, CheckCircle2, Gauge, Terminal } from "lucide-react";
import styles from "./services.ci-cd-automation.module.css";

export default function CiCdAutomationPage() {
  const relatedServices = [
    { label: "MULTI-CLOUD STRATEGY", path: "/services/multi-cloud-strategy" },
    { label: "INFRASTRUCTURE AS CODE", path: "/services/infrastructure-as-code" },
    { label: "SECURITY COMPLIANCE", path: "/services/security-compliance" },
  ];

  return (
    <ServiceDetailTemplate
      title="CI/CD AUTOMATION"
      subtitle="CONTINUOUS INTEGRATION & DEPLOYMENT PIPELINES"
      serviceId="CLOUD-02"
      description="Accelerate delivery cycles with robust, automated pipelines. We implement sophisticated CI/CD workflows that ensure code quality, automate testing, and streamline deployment across all environments with zero downtime."
      relatedServices={relatedServices}
      color="secondary"
    >
      <div className={styles.pipelineSection}>
        <div className={styles.pipelineStep}>
          <div className={styles.stepIcon}><GitBranch /></div>
          <div className={styles.stepLabel}>COMMIT</div>
        </div>
        <div className={styles.pipelineArrow}>→</div>
        <div className={styles.pipelineStep}>
          <div className={styles.stepIcon}><Terminal /></div>
          <div className={styles.stepLabel}>BUILD</div>
        </div>
        <div className={styles.pipelineArrow}>→</div>
        <div className={styles.pipelineStep}>
          <div className={styles.stepIcon}><CheckCircle2 /></div>
          <div className={styles.stepLabel}>TEST</div>
        </div>
        <div className={styles.pipelineArrow}>→</div>
        <div className={styles.pipelineStep}>
          <div className={styles.stepIcon}><RefreshCw /></div>
          <div className={styles.stepLabel}>DEPLOY</div>
        </div>
      </div>

      <div className={styles.grid}>
        <LcarsPanel title="TOOLCHAIN INTEGRATION" color="secondary" className={styles.panel}>
          <ul className={styles.toolList}>
            <li><span className={styles.bullet}>•</span> Jenkins / CloudBees</li>
            <li><span className={styles.bullet}>•</span> GitLab CI / GitHub Actions</li>
            <li><span className={styles.bullet}>•</span> CircleCI / Travis</li>
            <li><span className={styles.bullet}>•</span> ArgoCD / Flux</li>
          </ul>
        </LcarsPanel>

        <LcarsPanel title="DEPLOYMENT STRATEGIES" color="secondary" className={styles.panel}>
          <div className={styles.strategyList}>
            <div className={styles.strategyItem}>
              <span className={styles.strategyTitle}>BLUE-GREEN</span>
              <span className={styles.strategyDesc}>Zero-downtime switchover</span>
            </div>
            <div className={styles.strategyItem}>
              <span className={styles.strategyTitle}>CANARY</span>
              <span className={styles.strategyDesc}>Gradual traffic shifting</span>
            </div>
            <div className={styles.strategyItem}>
              <span className={styles.strategyTitle}>FEATURE FLAGS</span>
              <span className={styles.strategyDesc}>Decoupled release control</span>
            </div>
          </div>
        </LcarsPanel>
      </div>

      <div className={styles.metricsSection}>
        <h2 className={styles.sectionTitle}>PERFORMANCE METRICS</h2>
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <Gauge className={styles.metricIcon} />
            <div className={styles.metricValue}>&lt; 15m</div>
            <div className={styles.metricLabel}>LEAD TIME FOR CHANGES</div>
          </div>
          <div className={styles.metricCard}>
            <RefreshCw className={styles.metricIcon} />
            <div className={styles.metricValue}>ON-DEMAND</div>
            <div className={styles.metricLabel}>DEPLOYMENT FREQUENCY</div>
          </div>
          <div className={styles.metricCard}>
            <CheckCircle2 className={styles.metricIcon} />
            <div className={styles.metricValue}>&lt; 0.1%</div>
            <div className={styles.metricLabel}>CHANGE FAILURE RATE</div>
          </div>
        </div>
      </div>
    </ServiceDetailTemplate>
  );
}