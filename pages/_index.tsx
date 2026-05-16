import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { LcarsPanel } from "../components/LcarsPanel";
import { NewsletterSignup } from "../components/NewsletterSignup";
import { LandingAiSection } from "../components/LandingAiSection";
import { Activity, ArrowRight, Cpu, Globe, Layers, Zap } from "lucide-react";
import { RunningCodeVisual } from "../components/RunningCodeVisual";
import {
  appAccessLabels,
  featuredDirectoryApps,
  getAppDomainLabel,
} from "../helpers/appCatalog";
import styles from "./_index.module.css";

export default function LandingPage() {
  const featuredApps = featuredDirectoryApps.slice(0, 6);

  return (
    <>
      <Helmet>
        <title>COMPND.SYSTEMS | Global Software Interface</title>
        <meta
          name="description"
          content="High functioning, global software development company."
        />
      </Helmet>

      <div className={styles.hero} role="region" aria-label="Hero">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Custom
            <br />
            Software.
            <br />
            Full Stop.
          </h1>
          <p className={styles.heroSubtitle}>
            SOLVING COMPLEX CHALLENGES. BUILDING WHAT MATTERS. ARCHITECTING TOMORROW.
          </p>
          <div className={styles.heroActions}>
            <Button asChild size="lg" className={styles.ctaButton}>
              <Link to="/contact">INITIATE CONTACT</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className={styles.secondaryButton}
            >
              <Link to="/apps">VIEW APPLICATIONS</Link>
            </Button>
          </div>
        </div>
        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.gridOverlay} />
          <RunningCodeVisual />
          <div className={styles.scannerLine} />
        </div>
      </div>

      <div className={styles.sectionSpacer} />

      <section className={styles.applicationsSection} aria-labelledby="applications-heading">
        <h2 id="applications-heading" className={styles.srOnly}>FEATURED APPLICATIONS</h2>
        <LcarsPanel
          title="FEATURED APPLICATIONS"
          color="secondary"
          action={
            <Button asChild size="sm" variant="ghost">
              <Link to="/apps">
                All Apps
                <ArrowRight size={14} />
              </Link>
            </Button>
          }
        >
          <div className={styles.applicationsGrid} role="list">
            {featuredApps.map((app) => (
              <article
                key={app.slug}
                className={styles.applicationCard}
                role="listitem"
                aria-labelledby={`featured-${app.slug}`}
              >
                <div className={styles.applicationCardHeader}>
                  <span>{appAccessLabels[app.access]}</span>
                  <Activity size={16} aria-hidden="true" />
                </div>
                <h3 id={`featured-${app.slug}`}>{app.name}</h3>
                <p>{app.shortDescription}</p>
                <div className={styles.applicationMeta}>
                  <span>{app.statusLabel}</span>
                  <strong>{getAppDomainLabel(app)}</strong>
                </div>
                {app.publicRoute && (
                  <Button asChild size="sm" variant="outline">
                    <Link to={app.publicRoute}>
                      Details
                      <ArrowRight size={14} />
                    </Link>
                  </Button>
                )}
              </article>
            ))}
          </div>
        </LcarsPanel>
      </section>

      <div className={styles.sectionSpacer} />

      <section aria-labelledby="capabilities-heading">
        <h2 id="capabilities-heading" className={styles.srOnly}>SYSTEM CAPABILITIES</h2>
        <LcarsPanel title="SYSTEM CAPABILITIES" color="primary">
          <div className={styles.servicesGrid} role="list">
            <article className={styles.serviceCard} role="listitem" aria-labelledby="service-1">
              <Cpu className={styles.serviceIcon} aria-hidden="true" />
              <h3 id="service-1">CUSTOM DEVELOPMENT</h3>
              <p>
                Bespoke software solutions engineered for high-performance
                environments.
              </p>
            </article>
            <article className={styles.serviceCard} role="listitem" aria-labelledby="service-2">
              <Globe className={styles.serviceIcon} aria-hidden="true" />
              <h3 id="service-2">CLOUD ARCHITECTURE</h3>
              <p>
                Scalable, resilient infrastructure design for planetary-scale
                operations.
              </p>
            </article>
            <article className={styles.serviceCard} role="listitem" aria-labelledby="service-3">
              <Zap className={styles.serviceIcon} aria-hidden="true" />
              <h3 id="service-3">AI & ML SYSTEMS</h3>
              <p>
                Advanced intelligence integration for automated decision making.
              </p>
            </article>
            <article className={styles.serviceCard} role="listitem" aria-labelledby="service-4">
              <Layers className={styles.serviceIcon} aria-hidden="true" />
              <h3 id="service-4">ENTERPRISE INTEGRATION</h3>
              <p>Seamless unification of complex disparate systems.</p>
            </article>
          </div>
        </LcarsPanel>
      </section>

      <div className={styles.sectionSpacer} />

      <div className={styles.newsletterSection} role="region" aria-label="Newsletter Signup">
        <LcarsPanel title="RECEIVE TRANSMISSIONS" color="accent">
          <div className={styles.newsletterContent}>
            <div className={styles.newsletterDescription}>
              <h3>SUBSCRIBE TO LOGS</h3>
              <p>
                Receive periodic status updates, security advisories, and
                system architecture insights directly to your terminal.
              </p>
            </div>
            <NewsletterSignup />
          </div>
        </LcarsPanel>
      </div>

      <div className={styles.sectionSpacer} />

      <LandingAiSection />

      <div className={styles.sectionSpacer} />

      <div className={styles.aboutSection}>
        <h2 id="org-data-heading" className={styles.srOnly}>ORGANIZATION DATA</h2>
        <LcarsPanel title="ORGANIZATION DATA" color="secondary">
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <p>
                COMPND.SYSTEMS represents the pinnacle of software engineering
                efficiency. We are a distributed collective of elite developers,
                architects, and system designers working in unison to solve the
                most complex computational challenges.
              </p>
              <p>
                Our methodology is rooted in precision, speed, and absolute
                reliability. We do not just build software; we construct digital
                ecosystems that endure.
              </p>
            </div>
            <div className={styles.statsGrid} role="list" aria-label="Operational Statistics">
              <div className={styles.statItem} role="listitem" aria-label="99.9 percent Uptime">
                <span className={styles.statValue} aria-hidden="true">99.9%</span>
                <span className={styles.statLabel}>UPTIME</span>
              </div>
              <div className={styles.statItem} role="listitem" aria-label="24/7 Operations">
                <span className={styles.statValue} aria-hidden="true">24/7</span>
                <span className={styles.statLabel}>OPERATIONS</span>
              </div>
              <div className={styles.statItem} role="listitem" aria-label="Global Reach">
                <span className={styles.statValue} aria-hidden="true">GLOBAL</span>
                <span className={styles.statLabel}>REACH</span>
              </div>
            </div>
          </div>
        </LcarsPanel>
      </div>

      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerBar} aria-hidden="true" />
        <div className={styles.footerContent}>
          <span>COMPND.SYSTEMS (C) 2401</span>
          <span>LCARS INTERFACE V4.2</span>
          <span>AUTHORIZED PERSONNEL ONLY</span>
        </div>
      </footer>
    </>
  );
}
