import React from "react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import { ShieldCheck, Lock, FileCheck, Eye, Fingerprint, Network } from "lucide-react";
import styles from "./services.security-compliance.module.css";

export default function SecurityCompliancePage() {
  const relatedServices = [
    { label: "MULTI-CLOUD STRATEGY", path: "/services/multi-cloud-strategy" },
    { label: "CI/CD AUTOMATION", path: "/services/ci-cd-automation" },
    { label: "INFRASTRUCTURE AS CODE", path: "/services/infrastructure-as-code" },
  ];

  return (
    <ServiceDetailTemplate
      title="SECURITY COMPLIANCE"
      subtitle="CLOUD SECURITY POSTURE MANAGEMENT"
      serviceId="CLOUD-04"
      description="Comprehensive security frameworks designed for the modern cloud. We implement Zero Trust architectures, automated compliance auditing, and rigorous identity management to protect your most critical assets."
      relatedServices={relatedServices}
      color="secondary"
    >
      <div className={styles.heroGrid}>
        <div className={styles.heroCard}>
          <ShieldCheck className={styles.heroIcon} />
          <h3>ZERO TRUST</h3>
          <p>Never trust, always verify. Strict identity verification for every person and device accessing resources.</p>
        </div>
        <div className={styles.heroCard}>
          <Eye className={styles.heroIcon} />
          <h3>OBSERVABILITY</h3>
          <p>Real-time monitoring and automated threat detection across your entire infrastructure.</p>
        </div>
      </div>

      <LcarsPanel title="COMPLIANCE FRAMEWORKS" color="secondary">
        <div className={styles.complianceGrid}>
          <div className={styles.complianceItem}>
            <div className={styles.complianceBadge}>SOC2</div>
            <span>Service Organization Control</span>
          </div>
          <div className={styles.complianceItem}>
            <div className={styles.complianceBadge}>HIPAA</div>
            <span>Health Insurance Portability</span>
          </div>
          <div className={styles.complianceItem}>
            <div className={styles.complianceBadge}>GDPR</div>
            <span>General Data Protection</span>
          </div>
          <div className={styles.complianceItem}>
            <div className={styles.complianceBadge}>PCI</div>
            <span>Payment Card Industry</span>
          </div>
        </div>
      </LcarsPanel>

      <div className={styles.featuresList}>
        <h2 className={styles.sectionTitle}>SECURITY PROTOCOLS</h2>
        <div className={styles.protocolRow}>
          <Fingerprint className={styles.protocolIcon} />
          <div className={styles.protocolContent}>
            <h4>IDENTITY & ACCESS MANAGEMENT (IAM)</h4>
            <p>Granular permission policies, MFA enforcement, and role-based access control (RBAC).</p>
          </div>
        </div>
        <div className={styles.protocolRow}>
          <Lock className={styles.protocolIcon} />
          <div className={styles.protocolContent}>
            <h4>ENCRYPTION STANDARDS</h4>
            <p>AES-256 encryption for data at rest and TLS 1.3 for data in transit.</p>
          </div>
        </div>
        <div className={styles.protocolRow}>
          <Network className={styles.protocolIcon} />
          <div className={styles.protocolContent}>
            <h4>NETWORK SEGMENTATION</h4>
            <p>VPC isolation, private subnets, and micro-segmentation to limit blast radius.</p>
          </div>
        </div>
      </div>
    </ServiceDetailTemplate>
  );
}