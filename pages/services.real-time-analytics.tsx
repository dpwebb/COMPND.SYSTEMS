import React from "react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import {
  Activity,
  Radio,
  BarChart3,
  Zap,
  Clock,
  ShieldCheck,
} from "lucide-react";
import styles from "./services.real-time-analytics.module.css";

export default function RealTimeAnalyticsPage() {
  const relatedServices = [
    { label: "BIG DATA PROCESSING", path: "/services/big-data-processing" },
    { label: "DATA WAREHOUSING", path: "/services/data-warehousing" },
    { label: "ETL PIPELINES", path: "/services/etl-pipelines" },
  ];

  return (
    <ServiceDetailTemplate
      title="REAL-TIME ANALYTICS"
      subtitle="STREAMING INTELLIGENCE FOR INSTANT DECISION MAKING"
      serviceId="DATA-04"
      description="We engineer event-driven architectures that process data the moment it's created. From fraud detection to live operational dashboards, our real-time solutions enable your business to react to changing conditions instantly."
      relatedServices={relatedServices}
      color="primary"
    >
      <div className={styles.heroGrid}>
        <div className={styles.heroCard}>
          <Radio className={styles.heroIcon} />
          <h3>EVENT STREAMING</h3>
          <p>
            High-throughput message brokers using Apache Kafka, Redpanda, or AWS
            Kinesis to decouple producers from consumers.
          </p>
        </div>
        <div className={styles.heroCard}>
          <Activity className={styles.heroIcon} />
          <h3>COMPLEX EVENT PROCESSING</h3>
          <p>
            Pattern matching and aggregation on live data streams to detect
            anomalies and trends in milliseconds.
          </p>
        </div>
        <div className={styles.heroCard}>
          <BarChart3 className={styles.heroIcon} />
          <h3>LIVE VISUALIZATION</h3>
          <p>
            Low-latency dashboards powered by WebSockets and optimized backend
            queries for sub-second updates.
          </p>
        </div>
      </div>

      <LcarsPanel title="USE CASE SCENARIOS" color="primary">
        <div className={styles.useCases}>
          <div className={styles.useCaseItem}>
            <div className={styles.useCaseHeader}>
              <ShieldCheck size={20} />
              <span>FRAUD DETECTION</span>
            </div>
            <div className={styles.useCaseBar}>
              <div className={styles.barFill} style={{ width: "95%" }} />
            </div>
            <p>
              Analyzing transaction patterns in real-time to block suspicious
              activity before settlement.
            </p>
          </div>
          <div className={styles.useCaseItem}>
            <div className={styles.useCaseHeader}>
              <Zap size={20} />
              <span>IOT MONITORING</span>
            </div>
            <div className={styles.useCaseBar}>
              <div className={styles.barFill} style={{ width: "85%" }} />
            </div>
            <p>
              Ingesting telemetry from thousands of sensors to predict equipment
              failure and optimize performance.
            </p>
          </div>
          <div className={styles.useCaseItem}>
            <div className={styles.useCaseHeader}>
              <Clock size={20} />
              <span>DYNAMIC PRICING</span>
            </div>
            <div className={styles.useCaseBar}>
              <div className={styles.barFill} style={{ width: "70%" }} />
            </div>
            <p>
              Adjusting product pricing based on live demand signals, inventory
              levels, and competitor data.
            </p>
          </div>
        </div>
      </LcarsPanel>

      <div className={styles.techSection}>
        <h2 className={styles.sectionTitle}>TIME-SERIES INFRASTRUCTURE</h2>
        <div className={styles.techGrid}>
          <div className={styles.techItem}>
            <span className={styles.techName}>INFLUXDB</span>
            <span className={styles.techDesc}>
              High-performance storage for metrics and events.
            </span>
          </div>
          <div className={styles.techItem}>
            <span className={styles.techName}>TIMESCALE</span>
            <span className={styles.techDesc}>
              SQL-native time-series data on PostgreSQL.
            </span>
          </div>
          <div className={styles.techItem}>
            <span className={styles.techName}>CLICKHOUSE</span>
            <span className={styles.techDesc}>
              Columnar OLAP for real-time analytical queries.
            </span>
          </div>
        </div>
      </div>
    </ServiceDetailTemplate>
  );
}