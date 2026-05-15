import React from "react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import { FileCode, Copy, RefreshCcw, ShieldAlert, ServerCog } from "lucide-react";
import styles from "./services.infrastructure-as-code.module.css";

export default function InfrastructureAsCodePage() {
  const relatedServices = [
    { label: "MULTI-CLOUD STRATEGY", path: "/services/multi-cloud-strategy" },
    { label: "CI/CD AUTOMATION", path: "/services/ci-cd-automation" },
    { label: "SECURITY COMPLIANCE", path: "/services/security-compliance" },
  ];

  return (
    <ServiceDetailTemplate
      title="INFRASTRUCTURE AS CODE"
      subtitle="DECLARATIVE INFRASTRUCTURE MANAGEMENT"
      serviceId="CLOUD-03"
      description="Transform your infrastructure into version-controlled, reproducible code. We implement declarative configurations that ensure consistency across environments, eliminate configuration drift, and enable rapid disaster recovery."
      relatedServices={relatedServices}
      color="secondary"
    >
      <div className={styles.codeSection}>
        <div className={styles.codeHeader}>
          <div className={styles.codeTitle}>main.tf</div>
          <div className={styles.codeLang}>HCL</div>
        </div>
        <pre className={styles.codeBlock}>
{`resource "aws_instance" "app_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  
  tags = {
    Name = "Production-Node-01"
    Environment = "Production"
  }
}`}
        </pre>
        <div className={styles.codeFooter}>
          <div className={styles.statusItem}>
            <div className={styles.statusDot} /> STATE: SYNCHRONIZED
          </div>
        </div>
      </div>

      <div className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <Copy className={styles.featureIcon} />
          <h3>REPRODUCIBILITY</h3>
          <p>Spin up identical environments for development, staging, and production with a single command.</p>
        </div>
        <div className={styles.featureCard}>
          <ShieldAlert className={styles.featureIcon} />
          <h3>DRIFT DETECTION</h3>
          <p>Automated monitoring to detect and correct unauthorized manual changes to infrastructure.</p>
        </div>
        <div className={styles.featureCard}>
          <RefreshCcw className={styles.featureIcon} />
          <h3>VERSION CONTROL</h3>
          <p>Track every infrastructure change with git history, enabling instant rollbacks and audit trails.</p>
        </div>
      </div>

      <LcarsPanel title="SUPPORTED TECHNOLOGIES" color="secondary">
        <div className={styles.techStack}>
          <div className={styles.techItem}>
            <ServerCog size={24} />
            <span>TERRAFORM</span>
          </div>
          <div className={styles.techItem}>
            <ServerCog size={24} />
            <span>PULUMI</span>
          </div>
          <div className={styles.techItem}>
            <ServerCog size={24} />
            <span>CLOUDFORMATION</span>
          </div>
          <div className={styles.techItem}>
            <ServerCog size={24} />
            <span>ANSIBLE</span>
          </div>
        </div>
      </LcarsPanel>
    </ServiceDetailTemplate>
  );
}