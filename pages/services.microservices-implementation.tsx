import React from "react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import { Boxes, Network, Container, ShieldCheck } from "lucide-react";
import styles from "./services.microservices-implementation.module.css";

const relatedServices = [
  { label: "FULL-CYCLE DEV", path: "/services/full-cycle-development" },
  { label: "LEGACY MODERNIZATION", path: "/services/legacy-system-modernization" },
  { label: "HIGH-PERFORMANCE ARCH", path: "/services/high-performance-architecture" },
];

export default function MicroservicesPage() {
  return (
    <ServiceDetailTemplate
      title="MICROSERVICES IMPLEMENTATION"
      subtitle="DISTRIBUTED SYSTEMS AND CONTAINER ORCHESTRATION"
      serviceId="MSI-04"
      description="We decouple monolithic applications into independently deployable, loosely coupled services. This architecture enables teams to develop, deploy, and scale components independently, fostering agility and resilience in complex enterprise environments."
      relatedServices={relatedServices}
      color="info"
    >
      <LcarsPanel title="ARCHITECTURE TOPOLOGY" color="info">
        <div className={styles.topologyGrid}>
          <div className={styles.topologyItem}>
            <Boxes className={styles.icon} />
            <div className={styles.content}>
              <h3>DECOUPLED SERVICES</h3>
              <p>Breaking down business domains into bounded contexts that operate autonomously.</p>
            </div>
          </div>
          <div className={styles.topologyItem}>
            <Network className={styles.icon} />
            <div className={styles.content}>
              <h3>SERVICE MESH</h3>
              <p>Managing service-to-service communication with dedicated infrastructure layers (Istio/Linkerd).</p>
            </div>
          </div>
          <div className={styles.topologyItem}>
            <Container className={styles.icon} />
            <div className={styles.content}>
              <h3>CONTAINERIZATION</h3>
              <p>Packaging applications with their dependencies using Docker for consistent environments.</p>
            </div>
          </div>
        </div>
      </LcarsPanel>

      <LcarsPanel title="ORCHESTRATION & DEPLOYMENT" color="primary">
        <div className={styles.techStack}>
          <div className={styles.techCard}>
            <span className={styles.techTitle}>KUBERNETES</span>
            <span className={styles.techDesc}>Automated deployment, scaling, and management of containerized applications.</span>
          </div>
          <div className={styles.techCard}>
            <span className={styles.techTitle}>API GATEWAY</span>
            <span className={styles.techDesc}>Unified entry point for routing, composition, and protocol translation.</span>
          </div>
        </div>
      </LcarsPanel>

      <LcarsPanel title="OPERATIONAL BENEFITS" color="muted">
        <ul className={styles.benefitsList}>
          <li>
            <ShieldCheck size={16} />
            <span><strong>FAULT ISOLATION:</strong> Failure in one service does not cascade to the entire system.</span>
          </li>
          <li>
            <ShieldCheck size={16} />
            <span><strong>INDEPENDENT DEPLOYMENT:</strong> Release updates to specific modules without system-wide downtime.</span>
          </li>
          <li>
            <ShieldCheck size={16} />
            <span><strong>TECHNOLOGY DIVERSITY:</strong> Use the best language and database for each specific problem domain.</span>
          </li>
          <li>
            <ShieldCheck size={16} />
            <span><strong>TEAM AUTONOMY:</strong> Small, cross-functional teams own their services end-to-end.</span>
          </li>
        </ul>
      </LcarsPanel>
    </ServiceDetailTemplate>
  );
}