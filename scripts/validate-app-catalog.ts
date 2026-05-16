import {
  detailApps,
  directoryApps,
  hubApps,
  sitemapAppDetailRoutes,
  shouldNoIndexApp,
} from "../helpers/appCatalog";

const errors: string[] = [];

function requireHttps(label: string, value: string | undefined) {
  if (value && !value.startsWith("https://")) {
    errors.push(`${label} must use https://: ${value}`);
  }
}

function requireUnique(label: string, values: string[]) {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) {
      errors.push(`Duplicate ${label}: ${value}`);
    }
    seen.add(value);
  }
}

requireUnique("app slug", hubApps.map((app) => app.slug));
requireUnique("project key", hubApps.map((app) => app.projectKey));
requireUnique(
  "public route",
  hubApps.map((app) => app.publicRoute).filter((route): route is string => Boolean(route)),
);

for (const app of hubApps) {
  requireHttps(`${app.slug} primaryUrl`, app.primaryUrl);
  requireHttps(`${app.slug} fallbackSubdomain`, app.fallbackSubdomain);

  if (!app.supportPath.startsWith("/contact?app=")) {
    errors.push(`${app.slug} supportPath should route through /contact?app=`);
  }

  if (app.launchLive && !app.primaryUrl?.startsWith("https://")) {
    errors.push(`${app.slug} is launchLive but has no https primaryUrl`);
  }

  if (app.registryRole === "staging-app" && app.showInDirectory) {
    errors.push(`${app.slug} is staging but appears in the public directory`);
  }

  if (app.showInDirectory && app.projectKey !== "compnd" && !app.publicRoute?.startsWith("/apps/")) {
    errors.push(`${app.slug} is listed but has no /apps detail route`);
  }

  if (app.access === "private" && app.launchLive) {
    errors.push(`${app.slug} is private but launchLive is true`);
  }
}

for (const app of detailApps) {
  if (shouldNoIndexApp(app) && sitemapAppDetailRoutes.includes(app.publicRoute || "")) {
    errors.push(`${app.slug} is noindex but appears in sitemap detail routes`);
  }
}

if (directoryApps.some((app) => app.slug === "credit-regulator-pro-staging")) {
  errors.push("CreditRegulatorPro staging must remain hidden from the public directory");
}

if (errors.length > 0) {
  console.error("App catalog validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `App catalog validation passed: ${hubApps.length} registered, ${directoryApps.length} listed, ${detailApps.length} detail pages, ${sitemapAppDetailRoutes.length} sitemap app routes.`,
);
