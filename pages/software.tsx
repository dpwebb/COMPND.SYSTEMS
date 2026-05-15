import React from "react";
import { Helmet } from "react-helmet";
import { LcarsPanel } from "../components/LcarsPanel";
import {
  ShieldCheck,
  Fingerprint,
  TrendingUp,
  Plane,
  Activity,
  Server,
  Database,
  Globe,
} from "lucide-react";
import styles from "./software.module.css";

const softwareList = [
  {
    id: "xapp-ca",
    title: "XAPP-CA",
    subtitle: "CREDIT DISPUTE INTELLIGENCE",
    icon: <ShieldCheck size={40} />,
    description:
      "A comprehensive credit dispute intelligence platform built exclusively for Canadian consumers. XAPP-CA streamlines the entire dispute process — from credit report ingestion and tradeline analysis to compliance-validated packet generation and bureau communication tracking.",
    color: "primary",
    status: "OPERATIONAL",
    version: "V2.1.4",
  },
  {
    id: "ip-gov",
    title: "IP GOVERNANCE",
    subtitle: "ASSET PROVENANCE SYSTEM",
    icon: <Fingerprint size={40} />,
    description:
      "An AI-powered intellectual property governance system designed to protect your creative and business assets from creation to commercialization. Establish immutable sources, generate governed derivatives, and maintain complete provenance across any format—manuscripts, patents, software, video, audio, and beyond. Every asset traces back to its origin. Every derivative links to its source. Nothing bypasses governance.",
    color: "secondary",
    status: "SECURE",
    version: "V1.0.9",
  },
  {
    id: "trendlit",
    title: "TRENDLIT",
    subtitle: "PREDICTIVE ANALYTICS ENGINE",
    icon: <TrendingUp size={40} />,
    description:
      "A data-driven trend intelligence platform that monitors TikTok's BookTok community to identify emerging non-fiction book topics before they peak. The system aggregates real-time data from hashtag analytics, influencer activity, and search trends to calculate a proprietary BookTok Virality Score for each topic.",
    color: "accent",
    status: "ANALYZING",
    version: "V3.5.0",
  },
  {
    id: "fleet-guru",
    title: "FLEET GURU",
    subtitle: "AVIATION TRACKING MATRIX",
    icon: <Plane size={40} />,
    description:
      "A professional fleet tracking platform that gives aviation businesses a global view of all their aircraft. Features include multi-aircraft real-time tracking on aeronautical charts, smart email/SMS notifications for flight status changes, detailed flight history and analytics, and multi-user team access. Perfect for charter operators, flight schools, and aircraft management companies.",
    color: "info",
    status: "TRACKING",
    version: "V4.2.1",
  },
];

export default function SoftwarePage() {
  return (
    <>
      <Helmet>
        <title>Active Systems | COMPND.SYSTEMS</title>
        <meta
          name="description"
          content="Active software systems deployed by COMPND.SYSTEMS."
        />
      </Helmet>

      <div className={styles.pageHeader}>
        <h1 className={styles.title}>ACTIVE SYSTEMS</h1>
        <div className={styles.decorLine} />
        <div className={styles.headerStats}>
          <div className={styles.stat}>
            <Server size={14} /> <span>4 SYSTEMS ONLINE</span>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {softwareList.map((software) => (
          <LcarsPanel
            key={software.id}
            title={software.title}
            color={software.color as any}
            className={styles.panel}
            action={
              <div className={styles.panelAction}>
                <span className={styles.version}>{software.version}</span>
              </div>
            }
          >
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <div className={`${styles.iconBox} ${styles[software.color]}`}>
                  {software.icon}
                </div>
                <div className={styles.headerText}>
                  <h3 className={styles.cardTitle}>{software.title}</h3>
                  <span className={styles.cardSubtitle}>
                    {software.subtitle}
                  </span>
                </div>
              </div>

              <div className={styles.divider} />

              <p className={styles.description}>{software.description}</p>

              <div className={styles.statusRow}>
                <div className={styles.statusIndicator}>
                  <Activity size={16} className={styles.pulseIcon} />
                  <span>STATUS: {software.status}</span>
                </div>
                <div className={styles.systemId}>
                  SYS-ID: {software.id.toUpperCase()}
                </div>
              </div>
            </div>
          </LcarsPanel>
        ))}
      </div>
    </>
  );
}