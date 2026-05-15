import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { LcarsPanel } from "../components/LcarsPanel";
import {
  Code2,
  Cloud,
  BrainCircuit,
  Network,
  Smartphone,
  Database,
  ArrowRight,
} from "lucide-react";
import styles from "./services.module.css";

const services = [
  {
    id: "custom-dev",
    title: "CUSTOM SOFTWARE DEVELOPMENT",
    icon: <Code2 size={32} />,
    description:
      "Tailored software solutions designed to meet specific operational requirements. We build robust, scalable, and secure applications using cutting-edge technologies.",
    features: [
      {
        label: "Full-cycle development",
        path: "/services/full-cycle-development",
      },
      {
        label: "Legacy system modernization",
        path: "/services/legacy-system-modernization",
      },
      {
        label: "High-performance architecture",
        path: "/services/high-performance-architecture",
      },
      {
        label: "Microservices implementation",
        path: "/services/microservices-implementation",
      },
    ],
    color: "primary",
  },
  {
    id: "cloud-ops",
    title: "CLOUD ARCHITECTURE & DEVOPS",
    icon: <Cloud size={32} />,
    description:
      "Strategic cloud infrastructure design and automated deployment pipelines. We ensure your systems are resilient, scalable, and cost-effective.",
    features: [
      { label: "Multi-cloud strategy", path: "/services/multi-cloud-strategy" },
      { label: "CI/CD automation", path: "/services/ci-cd-automation" },
      {
        label: "Infrastructure as Code",
        path: "/services/infrastructure-as-code",
      },
      { label: "Security compliance", path: "/services/security-compliance" },
    ],
    color: "secondary",
  },
  {
    id: "ai-ml",
    title: "AI & MACHINE LEARNING",
    icon: <BrainCircuit size={32} />,
    description:
      "Intelligent systems that learn and adapt. We integrate advanced AI models to automate complex decision-making processes and extract value from data.",
    features: [
      { label: "Predictive analytics", path: "/services/predictive-analytics" },
      {
        label: "Natural Language Processing",
        path: "/services/natural-language-processing",
      },
      { label: "Computer Vision", path: "/services/computer-vision" },
      {
        label: "Neural Network design",
        path: "/services/neural-network-design",
      },
    ],
    color: "accent",
  },
  {
    id: "integration",
    title: "ENTERPRISE INTEGRATION",
    icon: <Network size={32} />,
    description:
      "Seamless connectivity between disparate enterprise systems. We create unified data flows and synchronized operations across your entire stack.",
    features: [
      { label: "API Management", path: "/services/api-management" },
      { label: "ESB implementation", path: "/services/esb-implementation" },
      { label: "Data synchronization", path: "/services/data-synchronization" },
      { label: "Legacy bridging", path: "/services/legacy-bridging" },
    ],
    color: "info",
  },
  {
    id: "mobile",
    title: "MOBILE APPLICATION DEVELOPMENT",
    icon: <Smartphone size={32} />,
    description:
      "Native and cross-platform mobile experiences that extend your reach. High-performance applications for iOS and Android ecosystems.",
    features: [
      { label: "React Native / Flutter", path: "/services/react-native-flutter" },
      { label: "Native iOS/Android", path: "/services/native-ios-android" },
      {
        label: "Offline-first architecture",
        path: "/services/offline-first-architecture",
      },
      { label: "IoT integration", path: "/services/iot-integration" },
    ],
    color: "muted",
  },
  {
    id: "data",
    title: "DATA ENGINEERING",
    icon: <Database size={32} />,
    description:
      "Robust data pipelines and warehousing solutions. We structure your data for maximum accessibility, integrity, and analytical value.",
    features: [
      { label: "Big Data processing", path: "/services/big-data-processing" },
      { label: "Data Warehousing", path: "/services/data-warehousing" },
      { label: "ETL pipelines", path: "/services/etl-pipelines" },
      { label: "Real-time analytics", path: "/services/real-time-analytics" },
    ],
    color: "primary",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services | COMPND.SYSTEMS</title>
        <meta
          name="description"
          content="Comprehensive software engineering services."
        />
      </Helmet>

      <div className={styles.header}>
        <h1 className={styles.pageTitle}>OPERATIONS</h1>
        <p className={styles.pageSubtitle}>
          SELECT A MODULE FOR DETAILED SPECIFICATIONS
        </p>
      </div>

      <div className={styles.servicesList}>
        {services.map((service) => (
          <LcarsPanel
            key={service.id}
            title={service.title}
            color={service.color as any}
            className={styles.servicePanel}
            action={
              <div className={styles.panelId}>
                MOD-{service.id.toUpperCase()}
              </div>
            }
          >
            <div className={styles.serviceContent}>
              <div className={styles.iconColumn}>
                <div className={`${styles.iconBox} ${styles[service.color]}`}>
                  {service.icon}
                </div>
              </div>
              <div className={styles.infoColumn}>
                <p className={styles.description}>{service.description}</p>
                <div className={styles.featuresGrid}>
                  {service.features.map((feature, idx) => (
                    <Link
                      key={idx}
                      to={feature.path}
                      className={styles.featureItem}
                    >
                      <div className={styles.featureDot} />
                      {feature.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className={styles.actionColumn}>
                <Button asChild variant="outline" className={styles.inquireBtn}>
                  <Link to={`/contact?service=${service.id}`}>
                    INQUIRE <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </LcarsPanel>
        ))}
      </div>
    </>
  );
}