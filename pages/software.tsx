import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Bot,
  BookOpen,
  ExternalLink,
  Fingerprint,
  Gauge,
  GraduationCap,
  Lock,
  Music,
  Plane,
  Radio,
  Server,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Button } from "../components/Button";
import { LcarsPanel } from "../components/LcarsPanel";
import {
  appAccessLabels,
  directoryApps,
  getAppDomainLabel,
  hubCatalogStats,
  sortHubApps,
  type AppAccess,
  type HubApp,
} from "../helpers/appCatalog";
import styles from "./software.module.css";

type FilterId = "all" | AppAccess;

const filters: Array<{ id: FilterId; label: string }> = [
  { id: "all", label: "All" },
  { id: "public", label: "Public" },
  { id: "beta", label: "Beta" },
  { id: "invite-only", label: "Invite" },
  { id: "private", label: "Private" },
  { id: "coming-soon", label: "Soon" },
];

const colorByAccess: Record<AppAccess, "primary" | "secondary" | "accent" | "muted" | "info"> = {
  public: "primary",
  beta: "info",
  "invite-only": "secondary",
  private: "muted",
  "coming-soon": "accent",
};

function iconForApp(app: HubApp) {
  switch (app.projectKey) {
    case "compnd":
      return <Server size={36} />;
    case "akashic":
      return <BookOpen size={36} />;
    case "anniversary":
      return <Music size={36} />;
    case "credit-prod":
      return <ShieldCheck size={36} />;
    case "academy":
      return <GraduationCap size={36} />;
    case "autonomy":
      return <Bot size={36} />;
    case "fx":
      return <TrendingUp size={36} />;
    case "fleet":
      return <Plane size={36} />;
    case "ip-governance":
      return <Fingerprint size={36} />;
    case "social-scraper":
      return <Radio size={36} />;
    default:
      return <Gauge size={36} />;
  }
}

function launchAction(app: HubApp) {
  if (app.launchLive && app.primaryUrl?.startsWith("http")) {
    return (
      <Button asChild size="sm">
        <a href={app.primaryUrl} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={15} />
          Launch
        </a>
      </Button>
    );
  }

  if (app.launchLive && app.publicRoute) {
    return (
      <Button asChild size="sm">
        <Link to={app.publicRoute}>
          <ArrowRight size={15} />
          Open
        </Link>
      </Button>
    );
  }

  if (app.access === "coming-soon") {
    return (
      <Button asChild size="sm" variant="outline">
        <Link to={app.supportPath}>
          <ArrowRight size={15} />
          Updates
        </Link>
      </Button>
    );
  }

  return (
    <Button asChild size="sm" variant="outline">
      <Link to={app.supportPath}>
        <Lock size={15} />
        Request Access
      </Link>
    </Button>
  );
}

export default function SoftwarePage() {
  const [filter, setFilter] = useState<FilterId>("all");

  const visibleApps = useMemo(() => {
    const filtered = filter === "all"
      ? directoryApps
      : directoryApps.filter((app) => app.access === filter);
    return sortHubApps(filtered);
  }, [filter]);

  return (
    <>
      <Helmet>
        <title>Applications | COMPND.SYSTEMS</title>
        <meta
          name="description"
          content="Public and planned COMPND.SYSTEMS application directory."
        />
      </Helmet>

      <div className={styles.pageHeader}>
        <div className={styles.headerText}>
          <p className={styles.eyebrow}>COMPND APPLICATION HUB</p>
          <h1 className={styles.title}>APPLICATIONS</h1>
        </div>
        <div className={styles.decorLine} />
        <div className={styles.headerStats} aria-label="Application catalog status">
          <div className={styles.stat}>
            <Server size={14} /> <span>{hubCatalogStats.directoryApps} LISTED</span>
          </div>
          <div className={styles.stat}>
            <Activity size={14} /> <span>{hubCatalogStats.featuredApps} FEATURED</span>
          </div>
        </div>
      </div>

      <LcarsPanel title="CATALOG FILTER" color="info" className={styles.filterPanel}>
        <div className={styles.filterRow} role="group" aria-label="Application access filter">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.filterButton} ${filter === item.id ? styles.activeFilter : ""}`}
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className={styles.catalogNote}>
          Protected staging environments are tracked in the registry but excluded from public launch listings.
        </p>
      </LcarsPanel>

      <div className={styles.grid}>
        {visibleApps.map((app) => {
          const color = colorByAccess[app.access];
          return (
            <LcarsPanel
              key={app.slug}
              title={app.name}
              color={color}
              className={styles.panel}
              action={
                <div className={styles.panelAction}>
                  <span className={styles.accessBadge}>{appAccessLabels[app.access]}</span>
                </div>
              }
            >
              <div className={styles.cardContent} id={app.slug}>
                <div className={styles.cardHeader}>
                  <div className={`${styles.iconBox} ${styles[color]}`}>
                    {iconForApp(app)}
                  </div>
                  <div className={styles.cardTitleBlock}>
                    <h3 className={styles.cardTitle}>{app.name}</h3>
                    <span className={styles.cardSubtitle}>{app.registryName}</span>
                  </div>
                </div>

                <div className={styles.divider} />

                <p className={styles.description}>{app.shortDescription}</p>

                <div className={styles.metaGrid}>
                  <div>
                    <span>Audience</span>
                    <strong>{app.audience}</strong>
                  </div>
                  <div>
                    <span>Domain Plan</span>
                    <strong>{getAppDomainLabel(app)}</strong>
                  </div>
                  <div>
                    <span>Repository</span>
                    <strong>{app.githubRepo || "Not assigned"}</strong>
                  </div>
                  <div>
                    <span>Status</span>
                    <strong>{app.statusLabel}</strong>
                  </div>
                </div>

                {app.complianceNote && (
                  <p className={styles.complianceNote}>{app.complianceNote}</p>
                )}

                <div className={styles.statusRow}>
                  <div className={styles.statusIndicator}>
                    <Activity size={16} className={styles.pulseIcon} />
                    <span>{app.registryRole.toUpperCase()}</span>
                  </div>
                  <div className={styles.actionRow}>
                    {launchAction(app)}
                    {app.publicRoute && app.publicRoute !== "/" && (
                      <Button asChild size="sm" variant="ghost">
                        <Link to={app.publicRoute}>Details</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </LcarsPanel>
          );
        })}
      </div>
    </>
  );
}
