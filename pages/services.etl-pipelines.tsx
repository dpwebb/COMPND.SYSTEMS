import React from "react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import {
  Workflow,
  GitBranch,
  ShieldAlert,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import styles from "./services.etl-pipelines.module.css";

export default function EtlPipelinesPage() {
  const relatedServices = [
    { label: "BIG DATA PROCESSING", path: "/services/big-data-processing" },
    { label: "DATA WAREHOUSING", path: "/services/data-warehousing" },
    { label: "REAL-TIME ANALYTICS", path: "/services/real-time-analytics" },
  ];

  return (
    <ServiceDetailTemplate
      title="ETL PIPELINES"
      subtitle="ROBUST DATA INTEGRATION WORKFLOWS"
      serviceId="DATA-03"
      description="We build resilient Extract, Transform, Load (ETL) pipelines that ensure your data is accurate, timely, and ready for analysis. Our engineering-first approach treats data pipelines as code, ensuring version control, testing, and observability."
      relatedServices={relatedServices}
      color="primary"
    >
      <div className={styles.pipelineVisual}>
        <div className={styles.stage}>
          <div className={styles.stageIcon}>
            <Workflow />
          </div>
          <span className={styles.stageLabel}>EXTRACT</span>
          <p className={styles.stageDesc}>Connectors for APIs, DBs, Files</p>
        </div>
        <div className={styles.flowArrow}>→</div>
        <div className={styles.stage}>
          <div className={styles.stageIcon}>
            <GitBranch />
          </div>
          <span className={styles.stageLabel}>TRANSFORM</span>
          <p className={styles.stageDesc}>Cleaning, Joining, Aggregating</p>
        </div>
        <div className={styles.flowArrow}>→</div>
        <div className={styles.stage}>
          <div className={styles.stageIcon}>
            <CheckCircle2 />
          </div>
          <span className={styles.stageLabel}>LOAD</span>
          <p className={styles.stageDesc}>Warehouse Destination</p>
        </div>
      </div>

      <LcarsPanel title="TOOLCHAIN INTEGRATION" color="primary">
        <div className={styles.toolsGrid}>
          <div className={styles.toolCategory}>
            <h4>ORCHESTRATION</h4>
            <div className={styles.toolList}>
              <span className={styles.toolTag}>APACHE AIRFLOW</span>
              <span className={styles.toolTag}>PREFECT</span>
              <span className={styles.toolTag}>DAGSTER</span>
            </div>
          </div>
          <div className={styles.toolCategory}>
            <h4>TRANSFORMATION</h4>
            <div className={styles.toolList}>
              <span className={styles.toolTag}>dbt (DATA BUILD TOOL)</span>
              <span className={styles.toolTag}>SPARK SQL</span>
            </div>
          </div>
          <div className={styles.toolCategory}>
            <h4>INGESTION</h4>
            <div className={styles.toolList}>
              <span className={styles.toolTag}>FIVETRAN</span>
              <span className={styles.toolTag}>AIRBYTE</span>
              <span className={styles.toolTag}>STITCH</span>
            </div>
          </div>
        </div>
      </LcarsPanel>

      <div className={styles.featuresGrid}>
        <div className={styles.featureRow}>
          <ShieldAlert className={styles.rowIcon} />
          <div className={styles.rowContent}>
            <h3>DATA QUALITY GATES</h3>
            <p>
              Automated testing at every stage of the pipeline. We implement
              schema validation, null checks, and business logic assertions to
              prevent bad data from polluting your warehouse.
            </p>
          </div>
        </div>
        <div className={styles.featureRow}>
          <RefreshCw className={styles.rowIcon} />
          <div className={styles.rowContent}>
            <h3>INCREMENTAL LOADING</h3>
            <p>
              Optimized processing that only handles new or changed data. This
              reduces compute costs and latency compared to full table reloads.
            </p>
          </div>
        </div>
        <div className={styles.featureRow}>
          <Workflow className={styles.rowIcon} />
          <div className={styles.rowContent}>
            <h3>OBSERVABILITY</h3>
            <p>
              Comprehensive monitoring and alerting. We track pipeline latency,
              failure rates, and data volume anomalies to ensure system health.
            </p>
          </div>
        </div>
      </div>
    </ServiceDetailTemplate>
  );
}