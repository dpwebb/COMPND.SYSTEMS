import React from "react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import { Database, Server, Layers, Cpu, HardDrive, Scale } from "lucide-react";
import styles from "./services.big-data-processing.module.css";

export default function BigDataProcessingPage() {
  const relatedServices = [
    { label: "DATA WAREHOUSING", path: "/services/data-warehousing" },
    { label: "ETL PIPELINES", path: "/services/etl-pipelines" },
    { label: "REAL-TIME ANALYTICS", path: "/services/real-time-analytics" },
  ];

  return (
    <ServiceDetailTemplate
      title="BIG DATA PROCESSING"
      subtitle="DISTRIBUTED COMPUTING ARCHITECTURES FOR PETABYTE-SCALE DATASETS"
      serviceId="DATA-01"
      description="We engineer robust distributed systems capable of ingesting, processing, and analyzing massive datasets. Our solutions leverage parallel computing frameworks to transform raw unstructured data into actionable intelligence at scale."
      relatedServices={relatedServices}
      color="primary"
    >
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>COMPUTING PARADIGMS</h2>
        <div className={styles.paradigmGrid}>
          <div className={styles.paradigmCard}>
            <div className={styles.paradigmHeader}>
              <Layers className={styles.icon} />
              <span>BATCH PROCESSING</span>
            </div>
            <p className={styles.paradigmDesc}>
              High-throughput processing of historical data blocks. Ideal for
              comprehensive reporting, complex aggregations, and machine
              learning model training.
            </p>
            <div className={styles.techTags}>
              <span>APACHE SPARK</span>
              <span>HADOOP MAPREDUCE</span>
            </div>
          </div>
          <div className={styles.paradigmCard}>
            <div className={styles.paradigmHeader}>
              <Cpu className={styles.icon} />
              <span>STREAM PROCESSING</span>
            </div>
            <p className={styles.paradigmDesc}>
              Low-latency processing of data in motion. Enables immediate
              reaction to events, real-time monitoring, and continuous
              intelligence.
            </p>
            <div className={styles.techTags}>
              <span>APACHE FLINK</span>
              <span>SPARK STREAMING</span>
            </div>
          </div>
        </div>
      </div>

      <LcarsPanel title="INFRASTRUCTURE SPECIFICATIONS" color="primary">
        <div className={styles.specsGrid}>
          <div className={styles.specItem}>
            <HardDrive size={24} />
            <div className={styles.specContent}>
              <h4>DATA LAKES & STORAGE</h4>
              <p>
                Implementation of scalable object storage (S3, GCS, Azure Blob)
                organized with Delta Lake or Apache Iceberg for ACID
                transactions on raw data.
              </p>
            </div>
          </div>
          <div className={styles.specItem}>
            <Server size={24} />
            <div className={styles.specContent}>
              <h4>CLUSTER MANAGEMENT</h4>
              <p>
                Automated provisioning and scaling of compute clusters using
                Kubernetes or YARN. Spot instance orchestration for cost
                efficiency.
              </p>
            </div>
          </div>
          <div className={styles.specItem}>
            <Scale size={24} />
            <div className={styles.specContent}>
              <h4>SCALABILITY & COST</h4>
              <p>
                Decoupled compute and storage architectures allowing independent
                scaling. Auto-scaling policies based on workload metrics.
              </p>
            </div>
          </div>
          <div className={styles.specItem}>
            <Database size={24} />
            <div className={styles.specContent}>
              <h4>DATA GOVERNANCE</h4>
              <p>
                Cataloging, lineage tracking, and access control policies
                enforced at the storage layer to ensure compliance and
                discoverability.
              </p>
            </div>
          </div>
        </div>
      </LcarsPanel>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>PROCESSING WORKFLOW</h2>
        <div className={styles.workflowVisual}>
          <div className={styles.step}>
            <span className={styles.stepNum}>01</span>
            <span className={styles.stepLabel}>INGEST</span>
          </div>
          <div className={styles.connector} />
          <div className={styles.step}>
            <span className={styles.stepNum}>02</span>
            <span className={styles.stepLabel}>PROCESS</span>
          </div>
          <div className={styles.connector} />
          <div className={styles.step}>
            <span className={styles.stepNum}>03</span>
            <span className={styles.stepLabel}>STORE</span>
          </div>
          <div className={styles.connector} />
          <div className={styles.step}>
            <span className={styles.stepNum}>04</span>
            <span className={styles.stepLabel}>ANALYZE</span>
          </div>
        </div>
      </div>
    </ServiceDetailTemplate>
  );
}