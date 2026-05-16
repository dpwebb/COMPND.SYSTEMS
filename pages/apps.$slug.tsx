import React from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  GitBranch,
  Lock,
  Mail,
  ShieldAlert,
  Target,
} from "lucide-react";
import { Button } from "../components/Button";
import { LcarsPanel } from "../components/LcarsPanel";
import {
  appAccessLabels,
  findDetailAppBySlug,
  getAppDomainLabel,
  shouldNoIndexApp,
  type HubApp,
} from "../helpers/appCatalog";
import styles from "./appDetail.module.css";

function getCapabilities(app: HubApp) {
  switch (app.projectKey) {
    case "akashic":
      return [
        "Structured research capture and retrieval",
        "Knowledge synthesis workflows",
        "Operational research workspace for analysts",
      ];
    case "anniversary":
      return [
        "Music project presentation",
        "Album and media hub workflows",
        "Collaborator and listener-facing release experience",
      ];
    case "credit-prod":
      return [
        "Credit dispute workflow support",
        "Regulatory process tracking",
        "Consumer credit operations interface",
      ];
    case "academy":
      return [
        "Learning product planning",
        "Software, AI, and operations enablement",
        "Course and builder resource hub",
      ];
    case "autonomy":
      return [
        "Controlled autonomous implementation runs",
        "Persistent run reporting",
        "Next-change handoff planning",
      ];
    case "fx":
      return [
        "Risk-governed trading research workflows",
        "Autonomous strategy operations planning",
        "Compliance-gated private tooling",
      ];
    case "fleet":
      return [
        "Aviation fleet visibility",
        "Aircraft status and notification workflows",
        "Operational history and team access planning",
      ];
    case "ip-governance":
      return [
        "Asset provenance tracking",
        "Derivative governance workflows",
        "Creative and commercial IP control",
      ];
    case "pulphub":
      return [
        "Long-form publishing workflow planning",
        "Book project development support",
        "Author and editor operations",
      ];
    case "social-scraper":
      return [
        "Structured social platform research",
        "Approved data collection workflows",
        "Platform policy review before public demos",
      ];
    default:
      return [
        "Application planning",
        "Domain and deployment routing",
        "Public hub integration",
      ];
  }
}

function getLaunchCta(app: HubApp) {
  if (app.launchLive && app.primaryUrl?.startsWith("http")) {
    return (
      <Button asChild size="md">
        <a href={app.primaryUrl} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={16} />
          Launch App
        </a>
      </Button>
    );
  }

  if (app.access === "coming-soon") {
    return (
      <Button asChild size="md" variant="outline">
        <Link to={app.supportPath}>
          <ArrowRight size={16} />
          Get Updates
        </Link>
      </Button>
    );
  }

  return (
    <Button asChild size="md" variant="outline">
      <Link to={app.supportPath}>
        <Lock size={16} />
        Request Access
      </Link>
    </Button>
  );
}

function AppNotFound() {
  return (
    <>
      <Helmet>
        <title>Application Not Found | COMPND.SYSTEMS</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className={styles.notFound}>
        <LcarsPanel title="APPLICATION NOT FOUND" color="accent">
          <p>The requested application is not available in the public hub catalog.</p>
          <Button asChild size="md">
            <Link to="/apps">
              <ArrowLeft size={16} />
              Back to Applications
            </Link>
          </Button>
        </LcarsPanel>
      </div>
    </>
  );
}

export default function AppDetailPage() {
  const { slug } = useParams();
  const app = findDetailAppBySlug(slug);

  if (!app) {
    return <AppNotFound />;
  }

  const noIndex = shouldNoIndexApp(app);
  const domain = getAppDomainLabel(app);
  const capabilities = getCapabilities(app);

  return (
    <>
      <Helmet>
        <title>{app.name} | COMPND.SYSTEMS Applications</title>
        <meta name="description" content={app.shortDescription} />
        {noIndex && <meta name="robots" content="noindex,nofollow" />}
      </Helmet>

      <div className={styles.detailHeader}>
        <Button asChild variant="ghost" size="sm" className={styles.backButton}>
          <Link to="/apps">
            <ArrowLeft size={15} />
            Applications
          </Link>
        </Button>
        <p className={styles.eyebrow}>APPLICATION DETAIL</p>
        <div className={styles.titleRow}>
          <h1>{app.name}</h1>
          <span>{appAccessLabels[app.access]}</span>
        </div>
        <p className={styles.summary}>{app.shortDescription}</p>
        <div className={styles.headerActions}>
          {getLaunchCta(app)}
          <Button asChild size="md" variant="ghost">
            <Link to={app.supportPath}>
              <Mail size={16} />
              Contact
            </Link>
          </Button>
        </div>
      </div>

      <div className={styles.panelGrid}>
        <LcarsPanel title="APPLICATION PROFILE" color="primary">
          <div className={styles.profileGrid}>
            <div>
              <span>Audience</span>
              <strong>{app.audience}</strong>
            </div>
            <div>
              <span>Access Model</span>
              <strong>{appAccessLabels[app.access]}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{app.statusLabel}</strong>
            </div>
            <div>
              <span>Hub Route</span>
              <strong>{app.publicRoute}</strong>
            </div>
            <div>
              <span>Launch Domain</span>
              <strong>{domain}</strong>
            </div>
            <div>
              <span>Repository</span>
              <strong>{app.githubRepo || "Not assigned"}</strong>
            </div>
            <div>
              <span>Default Branch</span>
              <strong>{app.defaultBranch || "Not assigned"}</strong>
            </div>
            <div>
              <span>Registry Key</span>
              <strong>{app.projectKey}</strong>
            </div>
          </div>
        </LcarsPanel>

        <LcarsPanel title="WHAT IT DOES" color="secondary">
          <ul className={styles.capabilityList}>
            {capabilities.map((item) => (
              <li key={item}>
                <Target size={16} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </LcarsPanel>
      </div>

      <div className={styles.panelGrid}>
        <LcarsPanel title="DOMAIN AND LAUNCH" color="info">
          <div className={styles.launchMatrix}>
            <div>
              <span>Domain Mode</span>
              <strong>{app.domainMode}</strong>
            </div>
            <div>
              <span>Launch Enabled</span>
              <strong>{app.launchLive ? "Yes" : "No"}</strong>
            </div>
            <div>
              <span>Public Sitemap</span>
              <strong>{noIndex ? "Noindex" : "Indexable"}</strong>
            </div>
            <div>
              <span>Deployment Branch</span>
              <strong>
                <GitBranch size={14} />
                {app.defaultBranch || "Not assigned"}
              </strong>
            </div>
          </div>
        </LcarsPanel>

        <LcarsPanel title="PUBLIC EXPOSURE" color={noIndex ? "accent" : "primary"}>
          <div className={styles.exposureBlock}>
            <ShieldAlert size={24} />
            <p>
              {app.complianceNote ||
                (noIndex
                  ? "This detail page is available for portfolio context, but it is marked noindex until access policy and launch readiness are complete."
                  : "This detail page is available for public discovery. Launch remains controlled by the catalog until the production domain is verified.")}
            </p>
          </div>
        </LcarsPanel>
      </div>
    </>
  );
}
