import React from "react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import { Cloud, Globe, ShieldCheck, Server, Layers, ArrowRightLeft } from "lucide-react";
import styles from "./services.multi-cloud-strategy.module.css";

export default function MultiCloudStrategyPage() {
  const relatedServices = [
    { label: "CI/CD AUTOMATION", path: "/services/ci-cd-automation" },
    { label: "INFRASTRUCTURE AS CODE", path: "/services/infrastructure-as-code" },
    { label: "SECURITY COMPLIANCE", path: "/services/security-compliance" },
  ];

  return (
    <ServiceDetailTemplate
      title="MULTI-CLOUD STRATEGY"
      subtitle="DISTRIBUTED INFRASTRUCTURE ARCHITECTURE"
      serviceId="CLOUD-01"
      description="Strategic distribution of computational workloads across multiple cloud providers (AWS, Azure, GCP) to maximize resilience, optimize costs, and eliminate vendor lock-in. Our approach ensures seamless interoperability and unified management."
      relatedServices={relatedServices}
      color="secondary"
    >
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>STRATEGIC ADVANTAGES</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <ArrowRightLeft className={styles.icon} />
              <h3>VENDOR INDEPENDENCE</h3>
            </div>
            <p>
              Eliminate dependency on a single provider's ecosystem. Our agnostic architecture allows you to leverage best-in-class services from different providers without friction.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Globe className={styles.icon} />
              <h3>GEOGRAPHIC REDUNDANCY</h3>
            </div>
            <p>
              Distribute data and applications across global regions and distinct provider networks to ensure 99.999% availability and disaster resilience.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Layers className={styles.icon} />
              <h3>COST OPTIMIZATION</h3>
            </div>
            <p>
              Dynamically route workloads to the most cost-effective environment based on real-time pricing models and resource requirements.
            </p>
          </div>
        </div>
      </div>

      <LcarsPanel title="PROVIDER INTEGRATION MATRIX" color="secondary">
        <div className={styles.providerMatrix}>
          <div className={styles.providerRow}>
            <div className={styles.providerName}>AWS</div>
            <div className={styles.providerBar} style={{ width: "85%" }}>
              <span className={styles.barLabel}>PRIMARY COMPUTE / LAMBDA</span>
            </div>
          </div>
          <div className={styles.providerRow}>
            <div className={styles.providerName}>AZURE</div>
            <div className={styles.providerBar} style={{ width: "60%" }}>
              <span className={styles.barLabel}>ENTERPRISE IDENTITY / AD</span>
            </div>
          </div>
          <div className={styles.providerRow}>
            <div className={styles.providerName}>GCP</div>
            <div className={styles.providerBar} style={{ width: "70%" }}>
              <span className={styles.barLabel}>DATA ANALYTICS / AI</span>
            </div>
          </div>
          <div className={styles.providerRow}>
            <div className={styles.providerName}>ON-PREM</div>
            <div className={styles.providerBar} style={{ width: "40%" }}>
              <span className={styles.barLabel}>LEGACY CORE / SECURITY</span>
            </div>
          </div>
        </div>
      </LcarsPanel>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>HYBRID CLOUD PROTOCOLS</h2>
        <div className={styles.hybridContainer}>
          <div className={styles.hybridStep}>
            <Server size={32} />
            <span>ON-PREMISES</span>
          </div>
          <div className={styles.connector}>
            <div className={styles.line} />
            <div className={styles.badge}>DIRECT CONNECT</div>
            <div className={styles.line} />
          </div>
          <div className={styles.hybridStep}>
            <Cloud size={32} />
            <span>PUBLIC CLOUD</span>
          </div>
        </div>
        <p className={styles.hybridText}>
          Seamlessly bridge legacy on-premises infrastructure with modern cloud scalability using secure VPN tunnels, Direct Connect, and ExpressRoute implementations.
        </p>
      </div>
    </ServiceDetailTemplate>
  );
}