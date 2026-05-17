import { lookup } from "node:dns/promises";
import { hubApps } from "../helpers/appCatalog";

type CheckResult = {
  slug: string;
  name: string;
  url: string;
  launchLive: boolean;
  checked: boolean;
  ok: boolean;
  details: string[];
};

const args = new Set(process.argv.slice(2));
const includePlanned = args.has("--include-planned");
const timeoutMs = getTimeoutMs();

function getTimeoutMs() {
  const timeoutArg = process.argv
    .slice(2)
    .find((arg) => arg.startsWith("--timeout-ms="))
    ?.split("=")[1];
  const parsed = Number(process.env.COMPND_DOMAIN_CHECK_TIMEOUT_MS || timeoutArg || 8000);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error("Domain readiness timeout must be a positive number.");
  }
  return Math.floor(parsed);
}

function getTargetUrl(app: (typeof hubApps)[number]) {
  if (app.primaryUrl) return app.primaryUrl;
  if (includePlanned) return app.fallbackSubdomain || "";
  return "";
}

async function fetchWithTimeout(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function checkApp(app: (typeof hubApps)[number]): Promise<CheckResult> {
  const url = getTargetUrl(app);
  const details: string[] = [];

  if (!url) {
    return {
      slug: app.slug,
      name: app.name,
      url: "",
      launchLive: app.launchLive,
      checked: false,
      ok: !app.launchLive,
      details: app.launchLive ? ["launchLive app has no URL to check"] : ["no URL assigned"],
    };
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return {
      slug: app.slug,
      name: app.name,
      url,
      launchLive: app.launchLive,
      checked: true,
      ok: false,
      details: ["URL is not parseable"],
    };
  }

  if (parsed.protocol !== "https:") {
    details.push("URL must use https");
  }

  try {
    const records = await lookup(parsed.hostname, { all: true });
    if (records.length === 0) {
      details.push("DNS lookup returned no address records");
    } else {
      details.push(`DNS ok (${records.length} address record${records.length === 1 ? "" : "s"})`);
    }
  } catch (error) {
    details.push(`DNS lookup failed: ${error instanceof Error ? error.message : String(error)}`);
  }

  try {
    const response = await fetchWithTimeout(url);
    const finalUrl = response.url && response.url !== url ? ` finalUrl=${response.url}` : "";
    if (response.status >= 200 && response.status < 400) {
      details.push(`HTTPS ok status=${response.status}${finalUrl}`);
    } else {
      details.push(`HTTPS returned status=${response.status}${finalUrl}`);
    }
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? `request timed out after ${timeoutMs}ms`
        : error instanceof Error
          ? error.message
          : String(error);
    details.push(`HTTPS check failed: ${message}`);
  }

  const ok =
    parsed.protocol === "https:" &&
    details.some((detail) => detail.startsWith("DNS ok")) &&
    details.some((detail) => detail.startsWith("HTTPS ok"));

  return {
    slug: app.slug,
    name: app.name,
    url,
    launchLive: app.launchLive,
    checked: true,
    ok,
    details,
  };
}

function renderResult(result: CheckResult) {
  const state = result.checked ? (result.ok ? "PASS" : "FAIL") : "SKIP";
  const scope = result.launchLive ? "live" : "planned";
  const target = result.url || "unassigned";
  console.log(`${state} ${result.slug} (${scope}): ${target}`);
  for (const detail of result.details) {
    console.log(`  - ${detail}`);
  }
}

const appsToCheck = hubApps.filter((app) => app.launchLive || (includePlanned && app.fallbackSubdomain));
const results = await Promise.all(appsToCheck.map(checkApp));
for (const result of results) {
  renderResult(result);
}

const failedLive = results.filter((result) => result.launchLive && !result.ok);
if (failedLive.length > 0) {
  console.error(`Domain readiness failed for ${failedLive.length} launchLive app(s).`);
  process.exit(1);
}

const failedPlanned = results.filter((result) => !result.launchLive && result.checked && !result.ok);
if (failedPlanned.length > 0) {
  console.warn(`Planned-domain check found ${failedPlanned.length} non-live app(s) not ready yet.`);
}

console.log(
  `Domain readiness checked ${results.length} app(s): ${results.filter((result) => result.ok).length} ready, ${failedLive.length} live failure(s).`,
);
