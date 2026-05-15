import React from "react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import { CheckCircle2, GitBranch, Rocket, Search } from "lucide-react";
import styles from "./services.full-cycle-development.module.css";

const relatedServices = [
  { label: "LEGACY MODERNIZATION", path: "/services/legacy-system-modernization" },
  { label: "HIGH-PERFORMANCE ARCH", path: "/services/high-performance-architecture" },
  { label: "MICROSERVICES", path: "/services/microservices-implementation" },
];

export default function FullCycleDevelopmentPage() {
  return (
    <ServiceDetailTemplate
      title="FULL-CYCLE DEVELOPMENT"
      subtitle="END-TO-END SOFTWARE ENGINEERING LIFECYCLE MANAGEMENT"
      serviceId="FCD-01"
      description="Our full-cycle development service covers every aspect of the software creation process. From initial conceptualization and requirements gathering to deployment and post-launch maintenance, we provide a unified, accountable, and transparent workflow that ensures your vision is translated into a robust, production-ready reality."
      relatedServices={relatedServices}
      color="primary"
    >
      <LcarsPanel title="OPERATIONAL PHASES" color="primary">
        <div className={styles.phasesGrid}>
          <div className={styles.phaseCard}>
            <div className={styles.phaseHeader}>
              <Search className={styles.phaseIcon} />
              <h4>01. DISCOVERY</h4>
            </div>
            <p>Requirements analysis, feasibility studies, and technical specification documentation.</p>
          </div>
          <div className={styles.phaseCard}>
            <div className={styles.phaseHeader}>
              <GitBranch className={styles.phaseIcon} />
              <h4>02. ARCHITECTURE</h4>
            </div>
            <p>System design, database modeling, and technology stack selection for scalability.</p>
          </div>
          <div className={styles.phaseCard}>
            <div className={styles.phaseHeader}>
              <CheckCircle2 className={styles.phaseIcon} />
              <h4>03. DEVELOPMENT</h4>
            </div>
            <p>Iterative coding, rigorous testing (QA/UAT), and continuous integration.</p>
          </div>
          <div className={styles.phaseCard}>
            <div className={styles.phaseHeader}>
              <Rocket className={styles.phaseIcon} />
              <h4>04. DEPLOYMENT</h4>
            </div>
            <p>Production release, cloud infrastructure setup, and ongoing maintenance support.</p>
          </div>
        </div>
      </LcarsPanel>

      <LcarsPanel title="STRATEGIC ADVANTAGES" color="info">
        <ul className={styles.benefitsList}>
          <li>
            <strong>SINGLE POINT OF ACCOUNTABILITY:</strong> We own the entire process, eliminating vendor friction and communication gaps.
          </li>
          <li>
            <strong>CONSISTENT QUALITY ASSURANCE:</strong> Integrated testing protocols at every stage ensure a bug-free final product.
          </li>
          <li>
            <strong>ACCELERATED TIME-TO-MARKET:</strong> Streamlined workflows and agile methodologies reduce development cycles.
          </li>
          <li>
            <strong>REDUCED INTEGRATION RISKS:</strong> Holistic system design prevents compatibility issues between disparate components.
          </li>
        </ul>
      </LcarsPanel>

      <LcarsPanel title="TECHNICAL PROTOCOLS" color="muted">
        <div className={styles.techGrid}>
          <div className={styles.techItem}>
            <span className={styles.techLabel}>METHODOLOGY</span>
            <span className={styles.techValue}>AGILE / SCRUM</span>
          </div>
          <div className={styles.techItem}>
            <span className={styles.techLabel}>OPERATIONS</span>
            <span className={styles.techValue}>DEVOPS / CI/CD</span>
          </div>
          <div className={styles.techItem}>
            <span className={styles.techLabel}>QUALITY</span>
            <span className={styles.techValue}>TEST-DRIVEN DEV (TDD)</span>
          </div>
          <div className={styles.techItem}>
            <span className={styles.techLabel}>DOCUMENTATION</span>
            <span className={styles.techValue}>LIVING SPECS</span>
          </div>
        </div>
      </LcarsPanel>
    </ServiceDetailTemplate>
  );
}