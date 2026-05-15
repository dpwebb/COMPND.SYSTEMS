import React from "react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import {
  Globe,
  ShieldCheck,
  Activity,
  BookOpen,
  Server,
  ArrowRightLeft,
} from "lucide-react";
import styles from "./services.api-management.module.css";

const relatedServices = [
  { label: "ESB IMPLEMENTATION", path: "/services/esb-implementation" },
  { label: "DATA SYNCHRONIZATION", path: "/services/data-synchronization" },
  { label: "LEGACY BRIDGING", path: "/services/legacy-bridging" },
];

export default function ApiManagementPage() {
  return (
    <ServiceDetailTemplate
      title="API MANAGEMENT"
      subtitle="INTERFACE GOVERNANCE AND GATEWAY ARCHITECTURE"
      serviceId="API-MGT"
      description="Comprehensive API lifecycle management strategies that ensure security, scalability, and developer adoption. We design and implement robust API gateways and portals that serve as the front door to your digital ecosystem."
      relatedServices={relatedServices}
      color="info"
    >
      {/* Protocols Section */}
      <LcarsPanel title="PROTOCOL STANDARDS" color="info">
        <div className={styles.protocolsGrid}>
          <div className={styles.protocolCard}>
            <div className={styles.protocolHeader}>
              <Globe size={20} />
              <span>RESTful</span>
            </div>
            <p>
              Resource-oriented architecture using standard HTTP methods. Ideal
              for public APIs and simple microservices.
            </p>
          </div>
          <div className={styles.protocolCard}>
            <div className={styles.protocolHeader}>
              <ArrowRightLeft size={20} />
              <span>GraphQL</span>
            </div>
            <p>
              Flexible query language allowing clients to request exactly the
              data they need. Reduces over-fetching.
            </p>
          </div>
          <div className={styles.protocolCard}>
            <div className={styles.protocolHeader}>
              <Server size={20} />
              <span>gRPC</span>
            </div>
            <p>
              High-performance RPC framework using Protocol Buffers. Optimized
              for low-latency internal service communication.
            </p>
          </div>
        </div>
      </LcarsPanel>

      {/* Gateway Features */}
      <div className={styles.splitSection}>
        <LcarsPanel
          title="GATEWAY CORE FUNCTIONS"
          color="info"
          className={styles.halfPanel}
        >
          <ul className={styles.featureList}>
            <li>
              <ShieldCheck size={16} />
              <span>
                <strong>Authentication & AuthZ:</strong> OAuth2, OIDC, API Keys
              </span>
            </li>
            <li>
              <Activity size={16} />
              <span>
                <strong>Traffic Control:</strong> Rate limiting, throttling, and
                quotas
              </span>
            </li>
            <li>
              <Server size={16} />
              <span>
                <strong>Load Balancing:</strong> Upstream routing and health
                checks
              </span>
            </li>
            <li>
              <BookOpen size={16} />
              <span>
                <strong>Transformation:</strong> Request/Response modification
              </span>
            </li>
          </ul>
        </LcarsPanel>

        <LcarsPanel
          title="PLATFORM INTEGRATION"
          color="info"
          className={styles.halfPanel}
        >
          <div className={styles.techStack}>
            <div className={styles.techItem}>KONG</div>
            <div className={styles.techItem}>APIGEE</div>
            <div className={styles.techItem}>AWS API GATEWAY</div>
            <div className={styles.techItem}>AZURE APIM</div>
            <div className={styles.techItem}>TYK</div>
          </div>
        </LcarsPanel>
      </div>

      {/* Lifecycle Management */}
      <LcarsPanel title="LIFECYCLE OPERATIONS" color="info">
        <div className={styles.lifecycleGrid}>
          <div className={styles.lifecycleItem}>
            <h4>VERSIONING STRATEGY</h4>
            <p>
              Seamless evolution of APIs using URI, Header, or Media Type
              versioning to maintain backward compatibility while introducing
              new features.
            </p>
          </div>
          <div className={styles.lifecycleItem}>
            <h4>DEVELOPER PORTAL</h4>
            <p>
              Self-service onboarding with interactive documentation
              (OpenAPI/Swagger), SDK generation, and sandbox environments for
              rapid integration.
            </p>
          </div>
          <div className={styles.lifecycleItem}>
            <h4>ANALYTICS & MONITORING</h4>
            <p>
              Real-time visibility into usage patterns, latency metrics, error
              rates, and consumer behavior to drive optimization.
            </p>
          </div>
        </div>
      </LcarsPanel>
    </ServiceDetailTemplate>
  );
}