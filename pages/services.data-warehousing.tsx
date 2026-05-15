import React from "react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import { Database, LayoutGrid, ShieldCheck, Zap, Table } from "lucide-react";
import styles from "./services.data-warehousing.module.css";

export default function DataWarehousingPage() {
  const relatedServices = [
    { label: "BIG DATA PROCESSING", path: "/services/big-data-processing" },
    { label: "ETL PIPELINES", path: "/services/etl-pipelines" },
    { label: "REAL-TIME ANALYTICS", path: "/services/real-time-analytics" },
  ];

  return (
    <ServiceDetailTemplate
      title="DATA WAREHOUSING"
      subtitle="CENTRALIZED ANALYTICAL STORAGE FOR ENTERPRISE INTELLIGENCE"
      serviceId="DATA-02"
      description="We design and implement modern cloud data warehouses that serve as the single source of truth for your organization. Our architectures prioritize query performance, data integrity, and democratic access to business insights."
      relatedServices={relatedServices}
      color="primary"
    >
      <div className={styles.platformsSection}>
        <h2 className={styles.sectionTitle}>SUPPORTED PLATFORMS</h2>
        <div className={styles.platformGrid}>
          {["SNOWFLAKE", "GOOGLE BIGQUERY", "AWS REDSHIFT", "AZURE SYNAPSE"].map(
            (platform) => (
              <div key={platform} className={styles.platformCard}>
                <Database size={20} />
                <span>{platform}</span>
              </div>
            ),
          )}
        </div>
      </div>

      <LcarsPanel title="SCHEMA ARCHITECTURE" color="primary">
        <div className={styles.schemaContainer}>
          <div className={styles.schemaVisual}>
            <div className={styles.factTable}>
              <Table size={16} /> FACT TABLE
            </div>
            <div className={styles.dimensionLines}>
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
            </div>
            <div className={styles.dimensions}>
              <div className={styles.dimTable}>DIMENSION A</div>
              <div className={styles.dimTable}>DIMENSION B</div>
              <div className={styles.dimTable}>DIMENSION C</div>
            </div>
          </div>
          <div className={styles.schemaInfo}>
            <h3>OPTIMIZED MODELING</h3>
            <p>
              We implement Star and Snowflake schemas tailored for analytical
              workloads. Our designs minimize join complexity while maximizing
              query speed through strategic denormalization and partitioning.
            </p>
            <ul className={styles.featureList}>
              <li>Columnar Storage Optimization</li>
              <li>Materialized Views</li>
              <li>Automatic Clustering</li>
            </ul>
          </div>
        </div>
      </LcarsPanel>

      <div className={styles.gridSection}>
        <div className={styles.featureCard}>
          <Zap className={styles.featureIcon} />
          <h3>PERFORMANCE TUNING</h3>
          <p>
            Advanced query optimization, resource monitoring, and workload
            management to ensure consistent performance under high concurrency.
          </p>
        </div>
        <div className={styles.featureCard}>
          <ShieldCheck className={styles.featureIcon} />
          <h3>GOVERNANCE & SECURITY</h3>
          <p>
            Role-based access control (RBAC), row-level security policies, and
            comprehensive data cataloging to maintain compliance and trust.
          </p>
        </div>
        <div className={styles.featureCard}>
          <LayoutGrid className={styles.featureIcon} />
          <h3>DATA MODELING</h3>
          <p>
            Logical and physical data modeling using industry best practices to
            ensure data consistency, referential integrity, and ease of use.
          </p>
        </div>
      </div>
    </ServiceDetailTemplate>
  );
}