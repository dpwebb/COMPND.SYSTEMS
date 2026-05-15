import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, ArrowRight, Activity, Cpu, Share2 } from "lucide-react";
import { Button } from "./Button";
import { LcarsPanel } from "./LcarsPanel";
import styles from "./ServiceDetailTemplate.module.css";

export interface RelatedService {
  label: string;
  path: string;
}

interface ServiceDetailTemplateProps {
  title: string;
  subtitle: string;
  serviceId: string;
  description: string;
  children: React.ReactNode;
  relatedServices: RelatedService[];
  color?: "primary" | "secondary" | "accent" | "info" | "muted";
}

export const ServiceDetailTemplate = ({
  title,
  subtitle,
  serviceId,
  description,
  children,
  relatedServices,
  color = "primary",
}: ServiceDetailTemplateProps) => {
  return (
    <>
      <Helmet>
        <title>{title} | COMPND.SYSTEMS</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <Button asChild variant="ghost" size="sm" className={styles.backBtn}>
              <Link to="/services">
                <ArrowLeft size={16} /> RETURN TO INDEX
              </Link>
            </Button>
          </div>
          <div className={styles.titleBlock}>
            <h1 className={styles.pageTitle}>{title}</h1>
            <div className={`${styles.decorLine} ${styles[color]}`} />
            <div className={styles.serviceId}>MOD-{serviceId}</div>
          </div>
          <p className={styles.pageSubtitle}>{subtitle}</p>
        </div>

        <div className={styles.grid}>
          {/* Main Content Column */}
          <div className={styles.mainContent}>
            <div className={styles.introText}>{description}</div>
            {children}
          </div>

          {/* Sidebar Column */}
          <div className={styles.sidebar}>
            {/* CTA Panel */}
            <LcarsPanel
              title="INITIATE PROTOCOL"
              color="secondary"
              className={styles.sidebarPanel}
            >
              <div className={styles.ctaContent}>
                <p className={styles.ctaText}>
                  Ready to implement this module in your infrastructure?
                </p>
                <Button asChild variant="primary" className={styles.ctaBtn}>
                  <Link to={`/contact?service=${serviceId.toLowerCase()}`}>
                    ENGAGE SYSTEMS <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </LcarsPanel>

            {/* Related Services Panel */}
            <LcarsPanel
              title="RELATED MODULES"
              color="muted"
              className={styles.sidebarPanel}
            >
              <div className={styles.relatedLinks}>
                {relatedServices.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className={styles.relatedLink}
                  >
                    <Share2 size={14} />
                    {service.label}
                  </Link>
                ))}
              </div>
            </LcarsPanel>

            {/* System Status Decor */}
            <div className={styles.systemStatus}>
              <div className={styles.statusRow}>
                <Activity size={16} className={styles.pulse} />
                <span>SYSTEM OPTIMAL</span>
              </div>
              <div className={styles.statusRow}>
                <Cpu size={16} />
                <span>RESOURCES AVAILABLE</span>
              </div>
              <div className={styles.decorBlock} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};