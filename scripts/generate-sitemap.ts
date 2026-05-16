import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { sitemapAppDetailRoutes } from "../helpers/appCatalog";

const baseUrl = "https://compnd.systems";

type SitemapRoute = {
  path: string;
  changefreq: "weekly" | "monthly";
  priority: string;
};

const topLevelRoutes: SitemapRoute[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.8" },
  { path: "/software", changefreq: "monthly", priority: "0.6" },
  { path: "/apps", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/case-studies", changefreq: "monthly", priority: "0.7" },
];

const serviceRoutes = [
  "/services/etl-pipelines",
  "/services/api-management",
  "/services/computer-vision",
  "/services/iot-integration",
  "/services/legacy-bridging",
  "/services/ci-cd-automation",
  "/services/data-warehousing",
  "/services/esb-implementation",
  "/services/native-ios-android",
  "/services/big-data-processing",
  "/services/real-time-analytics",
  "/services/security-compliance",
  "/services/data-synchronization",
  "/services/multi-cloud-strategy",
  "/services/predictive-analytics",
  "/services/react-native-flutter",
  "/services/neural-network-design",
  "/services/full-cycle-development",
  "/services/infrastructure-as-code",
  "/services/offline-first-architecture",
  "/services/legacy-system-modernization",
  "/services/natural-language-processing",
  "/services/microservices-implementation",
  "/services/high-performance-architecture",
].map<SitemapRoute>((path) => ({
  path,
  changefreq: "monthly",
  priority: "0.6",
}));

const appDetailRoutes = sitemapAppDetailRoutes.map<SitemapRoute>((path) => ({
  path,
  changefreq: "monthly",
  priority: path.includes("academy") || path.includes("pulphub") ? "0.6" : "0.7",
}));

function toUrl(path: string) {
  return path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderRoute(route: SitemapRoute) {
  return [
    "  <url>",
    `    <loc>${escapeXml(toUrl(route.path))}</loc>`,
    `    <changefreq>${route.changefreq}</changefreq>`,
    `    <priority>${route.priority}</priority>`,
    "  </url>",
  ].join("\n");
}

const routes = [...topLevelRoutes, ...appDetailRoutes, ...serviceRoutes];
const seen = new Set<string>();
const duplicates = routes
  .map((route) => route.path)
  .filter((path) => {
    if (seen.has(path)) return true;
    seen.add(path);
    return false;
  });

if (duplicates.length > 0) {
  throw new Error(`Duplicate sitemap routes: ${duplicates.join(", ")}`);
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(renderRoute),
  "</urlset>",
  "",
].join("\n");

await writeFile(resolve("static/sitemap.xml"), xml, "utf8");
console.log(`Generated static/sitemap.xml with ${routes.length} routes.`);
