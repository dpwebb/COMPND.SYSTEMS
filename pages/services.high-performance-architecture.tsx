import React from "react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import { Zap, Server, Database, Globe, BarChart3 } from "lucide-react";
import styles from "./services.high-performance-architecture.module.css";

const relatedServices = [
  { label: "FULL-CYCLE DEV", path: "/services/full-cycle-development" },
  { label: "LEGACY MODERNIZATION", path: "/services/legacy-system-modernization" },
  { label: "MICROSERVICES", path: "/services/microservices-implementation" },
];

export default function HighPerformancePage() {
  return (
    <ServiceDetailTemplate
      title="HIGH-PERFORMANCE ARCHITECTURE"
      subtitle="SCALABLE SYSTEMS FOR MASSIVE CONCURRENCY"
      serviceId="HPA-03"
      description="We engineer systems designed to handle extreme loads with sub-millisecond latency. By implementing advanced caching strategies, intelligent load balancing, and database optimization, we ensure your platform remains responsive and stable even during peak traffic spikes."
      relatedServices={relatedServices}
      color="accent"
    >
      <LcarsPanel title="OPTIMIZATION VECTORS" color="accent">
        <div className={styles.vectorsGrid}>
          <div className={styles.vectorCard}>
            <Zap className={styles.vectorIcon} />
            <h4>CACHING STRATEGIES</h4>
            <p>Multi-layer caching (CDN, Edge, In-Memory) to reduce origin load.</p>
          </div>
          <div className={styles.vectorCard}>
            <Server className={styles.vectorIcon} />
            <h4>LOAD BALANCING</h4>
            <p>Intelligent traffic distribution across global availability zones.</p>
          </div>
          <div className={styles.vectorCard}>
            <Database className={styles.vectorIcon} />
            <h4>DB OPTIMIZATION</h4>
            <p>Query tuning, indexing strategies, and read/write splitting.</p>
          </div>
          <div className={styles.vectorCard}>
            <Globe className={styles.vectorIcon} />
            <h4>CDN INTEGRATION</h4>
            <p>Content delivery at the edge to minimize latency for global users.</p>
          </div>
        </div>
      </LcarsPanel>

      <LcarsPanel title="PERFORMANCE METRICS" color="info">
        <div className={styles.metricsContainer}>
          <div className={styles.metricRow}>
            <div className={styles.metricLabel}>API LATENCY</div>
            <div className={styles.metricBarContainer}>
              <div className={styles.metricBar} style={{ width: "95%" }} />
              <span className={styles.metricValue}>&lt; 50ms</span>
            </div>
          </div>
          <div className={styles.metricRow}>
            <div className={styles.metricLabel}>UPTIME SLA</div>
            <div className={styles.metricBarContainer}>
              <div className={styles.metricBar} style={{ width: "99.9%" }} />
              <span className={styles.metricValue}>99.99%</span>
            </div>
          </div>
          <div className={styles.metricRow}>
            <div className={styles.metricLabel}>THROUGHPUT</div>
            <div className={styles.metricBarContainer}>
              <div className={styles.metricBar} style={{ width: "85%" }} />
              <span className={styles.metricValue}>10k+ RPS</span>
            </div>
          </div>
        </div>
      </LcarsPanel>

      <LcarsPanel title="SCALING PROTOCOLS" color="muted">
        <div className={styles.scalingSection}>
          <div className={styles.scalingBlock}>
            <h3>HORIZONTAL SCALING</h3>
            <p>Adding more nodes to the cluster to handle increased concurrency. Ideal for stateless services and distributed computing.</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.scalingBlock}>
            <h3>VERTICAL SCALING</h3>
            <p>Increasing resources (CPU/RAM) of existing nodes. Utilized for heavy computation tasks or monolithic database instances.</p>
          </div>
        </div>
        <div className={styles.monitoringNote}>
          <BarChart3 size={16} />
          <span>REAL-TIME TELEMETRY & AUTO-SCALING ENABLED</span>
        </div>
      </LcarsPanel>
    </ServiceDetailTemplate>
  );
}