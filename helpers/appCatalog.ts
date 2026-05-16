export type AppAccess = "public" | "beta" | "invite-only" | "private" | "coming-soon";
export type DomainMode = "formal-domain" | "compnd-subdomain" | "hub-domain" | "unassigned";
export type RegistryRole = "hub" | "production-app" | "staging-app" | "lab" | "planned" | "private-app";

export type HubApp = {
  slug: string;
  projectKey: string;
  registryName: string;
  name: string;
  shortDescription: string;
  audience: string;
  access: AppAccess;
  registryRole: RegistryRole;
  domainMode: DomainMode;
  primaryUrl?: string;
  fallbackSubdomain?: string;
  githubRepo?: string;
  defaultBranch?: string;
  publicRoute?: string;
  statusLabel: string;
  featured: boolean;
  showInDirectory: boolean;
  launchLive: boolean;
  supportPath: string;
  complianceNote?: string;
};

export const appAccessLabels: Record<AppAccess, string> = {
  public: "Public",
  beta: "Beta",
  "invite-only": "Invite Only",
  private: "Private",
  "coming-soon": "Coming Soon",
};

export const hubApps: HubApp[] = [
  {
    slug: "compnd-systems",
    projectKey: "compnd",
    registryName: "COMPND.SYSTEMS",
    name: "COMPND.SYSTEMS Hub",
    shortDescription: "The public business and application hub for COMPND.SYSTEMS.",
    audience: "Clients, partners, operators, and public visitors",
    access: "public",
    registryRole: "hub",
    domainMode: "hub-domain",
    primaryUrl: "https://compnd.systems",
    githubRepo: "dpwebb/COMPND.SYSTEMS",
    defaultBranch: "main",
    publicRoute: "/",
    statusLabel: "Hub online",
    featured: true,
    showInDirectory: true,
    launchLive: true,
    supportPath: "/contact?app=compnd-systems",
  },
  {
    slug: "akashic",
    projectKey: "akashic",
    registryName: "Akashic Research Engine",
    name: "Akashic Research Engine",
    shortDescription: "Research intelligence workspace for structured knowledge capture, synthesis, and retrieval.",
    audience: "Research teams, analysts, and knowledge operators",
    access: "beta",
    registryRole: "production-app",
    domainMode: "compnd-subdomain",
    fallbackSubdomain: "https://akashic.compnd.systems",
    githubRepo: "dpwebb/Akashic-Research-Engine",
    defaultBranch: "main",
    publicRoute: "/apps/akashic",
    statusLabel: "Beta domain planned",
    featured: true,
    showInDirectory: true,
    launchLive: false,
    supportPath: "/contact?app=akashic",
  },
  {
    slug: "dw-music-hub",
    projectKey: "anniversary",
    registryName: "The Anniversary Album",
    name: "DW Music Hub",
    shortDescription: "Creative music hub for album work, media presentation, and fan-facing release experiences.",
    audience: "Artists, collaborators, and listeners",
    access: "beta",
    registryRole: "production-app",
    domainMode: "compnd-subdomain",
    fallbackSubdomain: "https://music.compnd.systems",
    githubRepo: "dpwebb/DWAnniversaryalbum",
    defaultBranch: "master",
    publicRoute: "/apps/dw-music-hub",
    statusLabel: "Beta domain planned",
    featured: true,
    showInDirectory: true,
    launchLive: false,
    supportPath: "/contact?app=dw-music-hub",
  },
  {
    slug: "credit-regulator-pro-staging",
    projectKey: "credit",
    registryName: "CreditRegulatorPro Staging",
    name: "CreditRegulatorPro Staging",
    shortDescription: "Protected staging environment for CreditRegulatorPro validation.",
    audience: "Internal release operators",
    access: "private",
    registryRole: "staging-app",
    domainMode: "compnd-subdomain",
    fallbackSubdomain: "https://staging.credit.compnd.systems",
    githubRepo: "dpwebb/creditregulatorpro-staging",
    defaultBranch: "staging",
    statusLabel: "Internal staging only",
    featured: false,
    showInDirectory: false,
    launchLive: false,
    supportPath: "/contact?app=credit-regulator-pro",
  },
  {
    slug: "credit-regulator-pro",
    projectKey: "credit-prod",
    registryName: "CreditRegulatorPro Production",
    name: "CreditRegulatorPro",
    shortDescription: "Credit dispute and regulatory workflow platform for consumer credit operations.",
    audience: "Consumers, advocates, and regulated credit workflow teams",
    access: "public",
    registryRole: "production-app",
    domainMode: "compnd-subdomain",
    fallbackSubdomain: "https://credit.compnd.systems",
    githubRepo: "dpwebb/creditregulatorpro-prod",
    defaultBranch: "main",
    publicRoute: "/apps/credit-regulator-pro",
    statusLabel: "Production domain planned",
    featured: true,
    showInDirectory: true,
    launchLive: false,
    supportPath: "/contact?app=credit-regulator-pro",
  },
  {
    slug: "academy",
    projectKey: "academy",
    registryName: "Academy",
    name: "COMPND Academy",
    shortDescription: "Learning and enablement product for software, AI, operations, and applied systems training.",
    audience: "Students, builders, and client teams",
    access: "coming-soon",
    registryRole: "planned",
    domainMode: "compnd-subdomain",
    fallbackSubdomain: "https://academy.compnd.systems",
    githubRepo: "dpwebb/Academy",
    defaultBranch: "main",
    publicRoute: "/apps/academy",
    statusLabel: "Planned public product",
    featured: false,
    showInDirectory: true,
    launchLive: false,
    supportPath: "/contact?app=academy",
  },
  {
    slug: "autonomy",
    projectKey: "autonomy",
    registryName: "Autonomy Experiment",
    name: "Autonomy Experiment",
    shortDescription: "Local-first autonomous build and operations lab for controlled Codex-driven implementation runs.",
    audience: "Internal operators and automation researchers",
    access: "private",
    registryRole: "lab",
    domainMode: "compnd-subdomain",
    fallbackSubdomain: "https://autonomy.compnd.systems",
    githubRepo: "dpwebb/autonomy-experiment",
    defaultBranch: "main",
    publicRoute: "/apps/autonomy",
    statusLabel: "Private lab",
    featured: false,
    showInDirectory: true,
    launchLive: false,
    supportPath: "/contact?app=autonomy",
  },
  {
    slug: "fx-trading-platform",
    projectKey: "fx",
    registryName: "Disciplined Autonomous FX Trading Platform",
    name: "Disciplined Autonomous FX Trading Platform",
    shortDescription: "Risk-governed foreign exchange workflow platform for disciplined autonomous trading research.",
    audience: "Private trading operators and compliance reviewers",
    access: "private",
    registryRole: "private-app",
    domainMode: "compnd-subdomain",
    fallbackSubdomain: "https://fx.compnd.systems",
    githubRepo: "dpwebb/disciplined-autonomous-fx-trading-platform",
    defaultBranch: "main",
    publicRoute: "/apps/fx-trading-platform",
    statusLabel: "Compliance gated",
    featured: false,
    showInDirectory: true,
    launchLive: false,
    supportPath: "/contact?app=fx-trading-platform",
    complianceNote: "Public launch requires financial compliance and risk review.",
  },
  {
    slug: "fleet-guru",
    projectKey: "fleet",
    registryName: "Fleet Guru",
    name: "Fleet Guru",
    shortDescription: "Aviation fleet operations interface for aircraft visibility, notifications, and operational history.",
    audience: "Aviation businesses, charter teams, and aircraft managers",
    access: "beta",
    registryRole: "planned",
    domainMode: "compnd-subdomain",
    fallbackSubdomain: "https://fleet.compnd.systems",
    githubRepo: "dpwebb/fleet-guru",
    defaultBranch: "main",
    publicRoute: "/apps/fleet-guru",
    statusLabel: "Beta domain planned",
    featured: true,
    showInDirectory: true,
    launchLive: false,
    supportPath: "/contact?app=fleet-guru",
  },
  {
    slug: "ip-governance",
    projectKey: "ip-governance",
    registryName: "IP Governance",
    name: "IP Governance",
    shortDescription: "Asset provenance and derivative governance system for intellectual property workflows.",
    audience: "Creators, publishers, legal teams, and product owners",
    access: "invite-only",
    registryRole: "planned",
    domainMode: "compnd-subdomain",
    fallbackSubdomain: "https://ip.compnd.systems",
    githubRepo: "dpwebb/ip-governance",
    defaultBranch: "main",
    publicRoute: "/apps/ip-governance",
    statusLabel: "Invite access planned",
    featured: true,
    showInDirectory: true,
    launchLive: false,
    supportPath: "/contact?app=ip-governance",
  },
  {
    slug: "pulphub",
    projectKey: "pulphub",
    registryName: "PulpHub",
    name: "PulpHub",
    shortDescription: "Publishing workflow application for developing, packaging, and managing long-form book projects.",
    audience: "Authors, editors, and publishing operators",
    access: "coming-soon",
    registryRole: "planned",
    domainMode: "compnd-subdomain",
    fallbackSubdomain: "https://pulphub.compnd.systems",
    githubRepo: "dpwebb/PulpHub",
    defaultBranch: "main",
    publicRoute: "/apps/pulphub",
    statusLabel: "Public product planned",
    featured: true,
    showInDirectory: true,
    launchLive: false,
    supportPath: "/contact?app=pulphub",
  },
  {
    slug: "social-scraper",
    projectKey: "social-scraper",
    registryName: "Social Scraper",
    name: "Social Scraper",
    shortDescription: "Research and data collection tooling for structured social platform analysis.",
    audience: "Internal research teams and approved demo users",
    access: "private",
    registryRole: "private-app",
    domainMode: "compnd-subdomain",
    fallbackSubdomain: "https://social.compnd.systems",
    githubRepo: "dpwebb/social-scraper",
    defaultBranch: "main",
    publicRoute: "/apps/social-scraper",
    statusLabel: "Platform compliance gated",
    featured: false,
    showInDirectory: true,
    launchLive: false,
    supportPath: "/contact?app=social-scraper",
    complianceNote: "Public demos require platform policy and data-use review.",
  },
];

export const directoryApps = hubApps.filter((app) => app.showInDirectory);
export const detailApps = directoryApps.filter(
  (app) => app.publicRoute?.startsWith("/apps/"),
);
export const featuredDirectoryApps = sortHubApps(
  detailApps.filter((app) => app.featured),
);
export const sitemapAppDetailRoutes = detailApps
  .filter((app) => ["public", "beta", "coming-soon"].includes(app.access))
  .map((app) => app.publicRoute)
  .filter((route): route is string => Boolean(route));

export const hubCatalogStats = {
  registeredProjects: hubApps.length,
  directoryApps: directoryApps.length,
  internalOnly: hubApps.filter((app) => !app.showInDirectory).length,
  featuredApps: directoryApps.filter((app) => app.featured).length,
};

export function sortHubApps(apps: HubApp[]) {
  return [...apps].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }
    return left.name.localeCompare(right.name);
  });
}

export function findDetailAppBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return detailApps.find((app) => app.slug === slug);
}

export function getAppDomainLabel(app: HubApp) {
  if (app.primaryUrl) return app.primaryUrl;
  if (app.fallbackSubdomain) return app.fallbackSubdomain;
  return "Domain not assigned";
}

export function shouldNoIndexApp(app: HubApp) {
  return (
    app.access === "private" ||
    app.access === "invite-only" ||
    app.registryRole === "staging-app"
  );
}
