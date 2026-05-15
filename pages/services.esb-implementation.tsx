import React from "react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import {
  GitMerge,
  ArrowRightLeft,
  Workflow,
  MessageSquare,
  Layers,
} from "lucide-react";
import styles from "./services.esb-implementation.module.css";

const relatedServices = [
  { label: "API MANAGEMENT", path: "/services/api-management" },
  { label: "DATA SYNCHRONIZATION", path: "/services/data-synchronization" },
  { label: "LEGACY BRIDGING", path: "/services/legacy-bridging" },
];

export default function EsbImplementationPage() {
  return (
    <ServiceDetailTemplate
      title="ESB IMPLEMENTATION"
      subtitle="ENTERPRISE SERVICE BUS & MESSAGE ORCHESTRATION"
      serviceId="ESB-OPS"
      description="Centralized integration architecture that simplifies connectivity between disparate applications. We implement robust Enterprise Service Buses to handle message routing, transformation, and orchestration across your entire IT landscape."
      relatedServices={relatedServices}
      color="info"
    >
      {/* Core Functions */}
      <LcarsPanel title="CORE CAPABILITIES" color="info">
        <div className={styles.capabilitiesGrid}>
          <div className={styles.capability}>
            <GitMerge className={styles.capIcon} />
            <h3>ROUTING</h3>
            <p>
              Content-based routing logic to direct messages to appropriate
              endpoints based on payload data or headers.
            </p>
          </div>
          <div className={styles.capability}>
            <ArrowRightLeft className={styles.capIcon} />
            <h3>TRANSFORMATION</h3>
            <p>
              Protocol and data format conversion (e.g., XML to JSON, SOAP to
              REST) ensuring system interoperability.
            </p>
          </div>
          <div className={styles.capability}>
            <Workflow className={styles.capIcon} />
            <h3>ORCHESTRATION</h3>
            <p>
              Complex workflow management combining multiple service calls into
              a single composite business process.
            </p>
          </div>
        </div>
      </LcarsPanel>

      {/* Architecture Patterns */}
      <div className={styles.archSection}>
        <LcarsPanel
          title="MESSAGING ARCHITECTURE"
          color="info"
          className={styles.archPanel}
        >
          <div className={styles.patternList}>
            <div className={styles.patternItem}>
              <div className={styles.patternHeader}>
                <MessageSquare size={18} />
                <span>EVENT-DRIVEN</span>
              </div>
              <p>
                Asynchronous communication using publish/subscribe models for
                decoupled, scalable system interactions.
              </p>
            </div>
            <div className={styles.patternItem}>
              <div className={styles.patternHeader}>
                <Layers size={18} />
                <span>MESSAGE QUEUES</span>
              </div>
              <p>
                Reliable message delivery with persistence and buffering to
                handle load spikes and system downtime.
              </p>
            </div>
          </div>
        </LcarsPanel>

        <LcarsPanel
          title="TECHNOLOGY MATRIX"
          color="info"
          className={styles.techPanel}
        >
          <div className={styles.techGrid}>
            <div className={styles.techCategory}>
              <span>ESB PLATFORMS</span>
              <div className={styles.techTags}>
                <span className={styles.tag}>MULESOFT</span>
                <span className={styles.tag}>TIBCO</span>
                <span className={styles.tag}>IBM IB</span>
                <span className={styles.tag}>APACHE CAMEL</span>
              </div>
            </div>
            <div className={styles.techCategory}>
              <span>MESSAGE BROKERS</span>
              <div className={styles.techTags}>
                <span className={styles.tag}>KAFKA</span>
                <span className={styles.tag}>RABBITMQ</span>
                <span className={styles.tag}>ACTIVEMQ</span>
                <span className={styles.tag}>AWS SQS</span>
              </div>
            </div>
          </div>
        </LcarsPanel>
      </div>

      {/* Visual Flow Representation */}
      <div className={styles.flowVisual}>
        <div className={styles.flowNode}>SOURCE SYSTEM</div>
        <div className={styles.flowArrow}>→</div>
        <div className={styles.flowEsb}>
          <div className={styles.esbLabel}>ENTERPRISE SERVICE BUS</div>
          <div className={styles.esbInner}>
            <span>TRANSFORM</span>
            <span>ROUTE</span>
            <span>ENRICH</span>
          </div>
        </div>
        <div className={styles.flowArrow}>→</div>
        <div className={styles.flowNode}>TARGET SYSTEM</div>
      </div>
    </ServiceDetailTemplate>
  );
}