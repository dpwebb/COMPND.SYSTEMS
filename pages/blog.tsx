import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { LcarsPanel } from "../components/LcarsPanel";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { Clock, User, ChevronRight, Filter } from "lucide-react";
import styles from "./blog.module.css";

// Mock Data
const CATEGORIES = [
  "ALL",
  "DEVELOPMENT",
  "CLOUD",
  "AI",
  "INTEGRATION",
  "MOBILE",
  "DATA",
];

const POSTS = [
  {
    id: "1",
    title: "The Future of Monorepos in Enterprise Architecture",
    excerpt:
      "Analyzing the shift from poly-repo to monorepo structures in large-scale organizations. Efficiency gains vs tooling complexity.",
    date: "STARDATE 47634.2",
    category: "DEVELOPMENT",
    author: "Cmdr. Chen",
    readTime: "8 MIN",
    color: "primary",
  },
  {
    id: "2",
    title: "Zero Trust Security Models for Cloud Infrastructure",
    excerpt:
      "Why perimeter-based security is obsolete. Implementing identity-aware proxies and mutual TLS in Kubernetes clusters.",
    date: "STARDATE 47631.8",
    category: "CLOUD",
    author: "Lt. T'Vrell",
    readTime: "12 MIN",
    color: "secondary",
  },
  {
    id: "3",
    title: "Optimizing LLM Inference at the Edge",
    excerpt:
      "Techniques for quantization and pruning to run large language models on constrained hardware devices without significant accuracy loss.",
    date: "STARDATE 47628.4",
    category: "AI",
    author: "Dr. Soong",
    readTime: "15 MIN",
    color: "accent",
  },
  {
    id: "4",
    title: "Event-Driven Architectures: Kafka vs Pulsar",
    excerpt:
      "A comparative analysis of message streaming platforms for high-throughput financial data systems.",
    date: "STARDATE 47622.1",
    category: "DATA",
    author: "Ens. Kim",
    readTime: "10 MIN",
    color: "info",
  },
  {
    id: "5",
    title: "Flutter 4.0: Implications for Cross-Platform Strategy",
    excerpt:
      "Reviewing the latest rendering engine updates and what they mean for native-feel applications on iOS and Android.",
    date: "STARDATE 47615.9",
    category: "MOBILE",
    author: "Lt. Paris",
    readTime: "6 MIN",
    color: "muted",
  },
  {
    id: "6",
    title: "Legacy Mainframe Migration Patterns",
    excerpt:
      "Strategies for strangler fig implementation when dealing with COBOL-based core banking systems.",
    date: "STARDATE 47610.5",
    category: "INTEGRATION",
    author: "Cmdr. Scott",
    readTime: "20 MIN",
    color: "primary",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredPosts =
    activeCategory === "ALL"
      ? POSTS
      : POSTS.filter((post) => post.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Transmissions Log | COMPND.SYSTEMS</title>
        <meta
          name="description"
          content="Technical insights and engineering updates."
        />
      </Helmet>

      <div className={styles.header}>
        <h1 className={styles.pageTitle}>INCOMING TRANSMISSIONS</h1>
        <div className={styles.headerDecor}>LOGS // ARCHIVE</div>
      </div>

      <div className={styles.controls}>
        <div className={styles.filterLabel}>
          <Filter size={16} /> FILTER PROTOCOL:
        </div>
        <div className={styles.filterBar}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.filterBtn} ${
                activeCategory === cat ? styles.active : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filteredPosts.map((post) => (
          <div key={post.id} className={styles.cardWrapper}>
            <div className={`${styles.cardBar} ${styles[post.color]}`} />
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <span className={`${styles.stardate} ${styles[post.color]}`}>
                  {post.date}
                </span>
                <Badge variant="outline" className={styles.badge}>
                  {post.category}
                </Badge>
              </div>
              <h2 className={styles.cardTitle}>
                <Link to="#" className={styles.titleLink}>
                  {post.title}
                </Link>
              </h2>
              <p className={styles.excerpt}>{post.excerpt}</p>
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <User size={14} /> {post.author}
                </div>
                <div className={styles.metaItem}>
                  <Clock size={14} /> {post.readTime}
                </div>
              </div>
              <div className={styles.actionArea}>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className={styles.readBtn}
                >
                  <Link to="#">
                    ACCESS DATA <ChevronRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}