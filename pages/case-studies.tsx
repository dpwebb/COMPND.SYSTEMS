import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { LcarsPanel } from "../components/LcarsPanel";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";

import { ArrowUpRight, Filter } from "lucide-react";
import styles from "./case-studies.module.css";

const categories = ["ALL", "FINTECH", "HEALTHCARE", "AEROSPACE", "LOGISTICS"];

const projects = [
  {
    id: "PRJ-ALPHA",
    title: "QUANTUM LEDGER",
    client: "Nebula Finance",
    category: "FINTECH",
    description: "High-frequency trading platform with sub-millisecond latency and quantum-resistant encryption protocols.",
    tech: ["Rust", "WebAssembly", "React", "gRPC"],
    color: "primary",
  },
  {
    id: "PRJ-BETA",
    title: "VITAL LINK",
    client: "MedCore Systems",
    category: "HEALTHCARE",
    description: "Federated learning network for diagnostic imaging analysis across 50+ hospital systems.",
    tech: ["Python", "TensorFlow", "Kubernetes", "HL7"],
    color: "secondary",
  },
  {
    id: "PRJ-GAMMA",
    title: "ORBITAL TRAJECTORY",
    client: "AeroSpace Dynamics",
    category: "AEROSPACE",
    description: "Real-time telemetry processing and visualization for commercial satellite constellations.",
    tech: ["Go", "WebGL", "TimescaleDB", "NATS"],
    color: "accent",
  },
  {
    id: "PRJ-DELTA",
    title: "SUPPLY CHAIN NEURAL NET",
    client: "Global Logistics Corp",
    category: "LOGISTICS",
    description: "Predictive inventory management system utilizing reinforcement learning for route optimization.",
    tech: ["Node.js", "GraphQL", "Redis", "PyTorch"],
    color: "info",
  },
  {
    id: "PRJ-EPSILON",
    title: "SECURE VAULT",
    client: "Sovereign Bank",
    category: "FINTECH",
    description: "Biometric authentication gateway for institutional banking portals.",
    tech: ["Java", "Spring Boot", "FIDO2", "React Native"],
    color: "primary",
  },
  {
    id: "PRJ-ZETA",
    title: "BIO-MONITOR",
    client: "LifeScience Inc",
    category: "HEALTHCARE",
    description: "Wearable IoT data aggregation pipeline handling petabytes of continuous sensor data.",
    tech: ["Elixir", "Apache Kafka", "Cassandra", "Swift"],
    color: "secondary",
  },
];

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredProjects = activeFilter === "ALL" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Mission Logs | COMPND.SYSTEMS</title>
        <meta name="description" content="Case studies and project portfolio." />
      </Helmet>

      <div className={styles.header}>
        <h1 className={styles.pageTitle}>MISSION LOGS</h1>
        <div className={styles.headerDecor} />
      </div>

      <div className={styles.controls}>
        <div className={styles.filterLabel}>
          <Filter size={16} /> FILTER PROTOCOLS:
        </div>
        <div className={styles.filterButtons}>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeFilter === cat ? "primary" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(cat)}
              className={styles.filterBtn}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filteredProjects.map((project) => (
          <LcarsPanel 
            key={project.id} 
            title={project.id} 
            color={project.color as any}
            className={styles.projectPanel}
          >
            <div className={styles.projectCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <Badge variant="outline" className={styles.categoryBadge}>{project.category}</Badge>
              </div>
              
              <div className={styles.clientInfo}>
                <span className={styles.label}>CLIENT:</span> {project.client}
              </div>
              
              <p className={styles.description}>{project.description}</p>
              
              <div className={styles.techStack}>
                {project.tech.map((t) => (
                  <span key={t} className={styles.techTag}>{t}</span>
                ))}
              </div>
              
              <div className={styles.actions}>
                <Button variant="ghost" className={styles.detailsBtn}>
                  ACCESS DATA <ArrowUpRight size={16} />
                </Button>
              </div>
            </div>
          </LcarsPanel>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className={styles.emptyState}>
          NO RECORDS FOUND FOR SELECTED PARAMETERS.
        </div>
      )}

          </>
  );
}