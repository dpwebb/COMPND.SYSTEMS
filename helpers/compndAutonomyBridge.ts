import { timingSafeEqual } from "node:crypto";
import { execFile } from "node:child_process";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

type JsonObject = Record<string, unknown>;
type RunnerEvent = JsonObject & {
  type?: string;
  content?: string;
  created_at?: number;
};
type RunnerRun = JsonObject & {
  run_id?: string;
  status?: string;
  updated_at?: number;
  event_count?: number;
  latest_event?: RunnerEvent | null;
  target_project?: JsonObject;
};

const execFileAsync = promisify(execFile);

const PROJECT_KEY = "compnd";
const PROJECT_NAME = "COMPND.SYSTEMS";
const PROJECT_ROOT =
  process.env.COMPND_AUTONOMY_TARGET_WORKSPACE ||
  "C:\\Users\\webbd\\Projects\\COMPND.SYSTEMS";
const AUTONOMY_ROOT =
  process.env.COMPND_AUTONOMY_ROOT ||
  "C:\\Users\\webbd\\Projects\\autonomy_experiment";
const RUNNER_URL =
  process.env.COMPND_AUTONOMY_RUNNER_URL ||
  "http://127.0.0.1:8000/";
const HOST_LAUNCHER_URL =
  process.env.COMPND_AUTONOMY_HOST_LAUNCHER_URL ||
  "http://127.0.0.1:8765/";
const CONTROL_DIR = path.join(PROJECT_ROOT, "docs", "agent", "control");
const KILL_SWITCH_PATH = path.join(CONTROL_DIR, "kill-switch.json");
const AUTHORIZATION_LEASE_PATH = path.join(CONTROL_DIR, "authorization-lease.json");
const START_SCRIPT_PATH = path.join(AUTONOMY_ROOT, "Start-CodexProjectAutonomy.ps1");
const REGISTRY_PATH = "C:\\Users\\webbd\\Projects\\codex-projects.json";
const AGENT_DIR = path.join(PROJECT_ROOT, "docs", "agent");
const RUNS_DIR = path.join(AGENT_DIR, "runs");
const AUTONOMY_DOCS_DIR = path.join(PROJECT_ROOT, "docs", "autonomy");
const REPORTS_DIR = path.join(AUTONOMY_DOCS_DIR, "reports");
const REPORT_INDEX_JSON_PATH = path.join(REPORTS_DIR, "index.json");
const REPORT_INDEX_MD_PATH = path.join(REPORTS_DIR, "index.md");
const NEXT_BEST_CHANGES_PATH = path.join(AUTONOMY_DOCS_DIR, "NEXT_CHANGES.md");
const FUTURE_BUILD_PLAN_PATH = path.join(PROJECT_ROOT, "FUTURE_BUILD_PLAN.md");
const FUTURE_PLAN_HANDOFF_START = "<!-- AUTONOMY_HANDOFF_START -->";
const FUTURE_PLAN_HANDOFF_END = "<!-- AUTONOMY_HANDOFF_END -->";
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);
const DEFAULT_STATUS_TIMEOUT_MS = 5000;
const MAX_STATUS_TIMEOUT_MS = 30000;
const MIN_STATUS_TIMEOUT_MS = 1000;

const MODEL_ALLOWLIST = new Set(["", "gpt-5.5", "gpt-5.3-codex", "gpt-5.3-codex-spark"]);
type AdminAuthMode = "tokenless" | "token";

export class AutonomyHttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "AutonomyHttpError";
    this.status = status;
  }
}

function urlFor(base: string, pathname: string) {
  return new URL(pathname.replace(/^\/+/, ""), base.endsWith("/") ? base : `${base}/`).toString();
}

function getConfiguredAdminToken() {
  return (
    process.env.COMPND_ADMIN_ACCESS_TOKEN ||
    process.env.CODEX_ADMIN_ACCESS_TOKEN ||
    process.env.ADMIN_ACCESS_TOKEN ||
    ""
  ).trim();
}

function isTruthy(value: string) {
  return ["1", "true", "yes", "on", "allow"].includes(value.trim().toLowerCase());
}

function isRemoteAdminAllowed() {
  return isTruthy(
    process.env.COMPND_ADMIN_ALLOW_REMOTE ||
      process.env.CODEX_ADMIN_ALLOW_REMOTE ||
      process.env.ADMIN_ALLOW_REMOTE ||
      ""
  );
}

function getStatusFetchTimeoutMs() {
  const rawValue = process.env.COMPND_AUTONOMY_STATUS_TIMEOUT_MS || "";
  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed)) {
    return DEFAULT_STATUS_TIMEOUT_MS;
  }
  return Math.max(MIN_STATUS_TIMEOUT_MS, Math.min(MAX_STATUS_TIMEOUT_MS, Math.floor(parsed)));
}

function getAdminAuthMode(): AdminAuthMode {
  const rawMode = (
    process.env.COMPND_ADMIN_AUTH_MODE ||
    process.env.CODEX_ADMIN_AUTH_MODE ||
    process.env.ADMIN_AUTH_MODE ||
    ""
  ).trim().toLowerCase();

  if (["token", "required", "strict"].includes(rawMode)) {
    return "token";
  }

  return "tokenless";
}

function getRequestAdminToken(request: Request) {
  const headerToken = request.headers.get("x-compnd-admin-token") || "";
  const authorization = request.headers.get("authorization") || "";
  const bearer = authorization.match(/^Bearer\s+(.+)$/i)?.[1] || "";
  return (headerToken || bearer).trim();
}

function safeTokenEquals(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function normalizeAddress(value: string) {
  const trimmed = value.trim();
  const bracketedIpv6 = trimmed.match(/^\[([^\]]+)\](?::\d+)?$/)?.[1];
  if (bracketedIpv6) {
    return bracketedIpv6.toLowerCase();
  }
  if (/^\d{1,3}(?:\.\d{1,3}){3}:\d+$/.test(trimmed)) {
    return trimmed.split(":")[0].toLowerCase();
  }
  return trimmed.toLowerCase();
}

function isLoopbackAddress(value: string) {
  const normalized = normalizeAddress(value);
  if (!normalized) return false;
  if (LOOPBACK_HOSTS.has(normalized)) return true;
  if (normalized.startsWith("127.")) return true;
  if (normalized.startsWith("::ffff:127.")) return true;
  return false;
}

function firstCsvValue(value: string) {
  return value.split(",")[0]?.trim() || "";
}

function getRequestHostname(request: Request) {
  try {
    return new URL(request.url).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function assertCompndAutonomyLoopbackAccess(request: Request) {
  if (isRemoteAdminAllowed()) {
    return;
  }

  const hostname = getRequestHostname(request);
  const forwardedFor = firstCsvValue(request.headers.get("x-forwarded-for") || "");
  const realIp = request.headers.get("x-real-ip") || "";

  const hostAllowed = Boolean(hostname) && isLoopbackAddress(hostname);
  const forwardedAllowed = !forwardedFor || isLoopbackAddress(forwardedFor);
  const realIpAllowed = !realIp || isLoopbackAddress(realIp);

  if (!hostAllowed || !forwardedAllowed || !realIpAllowed) {
    throw new AutonomyHttpError(
      403,
      "Admin autonomy endpoints only accept loopback requests by default. Set COMPND_ADMIN_ALLOW_REMOTE=true to allow remote access."
    );
  }
}

export function assertCompndAutonomyAdmin(request: Request) {
  assertCompndAutonomyLoopbackAccess(request);

  const authMode = getAdminAuthMode();
  if (authMode === "tokenless") {
    return;
  }

  const configuredToken = getConfiguredAdminToken();
  if (!configuredToken) {
    throw new AutonomyHttpError(
      503,
      "Admin autonomy access is not configured. Set COMPND_ADMIN_ACCESS_TOKEN or CODEX_ADMIN_ACCESS_TOKEN in the server environment."
    );
  }

  const requestToken = getRequestAdminToken(request);
  if (!requestToken || !safeTokenEquals(requestToken, configuredToken)) {
    throw new AutonomyHttpError(401, "Admin autonomy token is required.");
  }
}

function cleanRunId(value: string) {
  const safe = value.trim().replace(/[^A-Za-z0-9_.-]+/g, "-").slice(0, 80).replace(/^[-_.]+|[-_.]+$/g, "");
  if (!safe) {
    throw new AutonomyHttpError(400, "Run ID must contain at least one letter, number, underscore, dash, or period.");
  }
  return safe;
}

function safePathSegment(value: string) {
  const safe = value.trim().replace(/[^A-Za-z0-9_.-]+/g, "-").slice(0, 120).replace(/^[-_.]+|[-_.]+$/g, "");
  return safe || "";
}

function redactSensitiveText(value: string) {
  return value
    .replace(/sk_(?:live|test)_[A-Za-z0-9_]+/g, "[redacted-stripe-key]")
    .replace(/AIza[0-9A-Za-z_-]{35}/g, "[redacted-google-api-key]")
    .replace(/ghp_[0-9A-Za-z]{36,}/g, "[redacted-github-token]")
    .replace(/github_pat_[0-9A-Za-z_]+/g, "[redacted-github-token]");
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function truncateText(value: string, maxLength: number) {
  const normalized = value.trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }
  return `${normalized.slice(0, maxLength).trimEnd()}\n\n[truncated]`;
}

function markdownTableCell(value: string) {
  return normalizeWhitespace(value).replace(/\|/g, "\\|") || "unknown";
}

function markdownCodePath(value: string) {
  return value.replace(/\\/g, "\\\\");
}

function epochToIso(value: unknown) {
  const numberValue = typeof value === "number" ? value : Number(value || 0);
  if (!Number.isFinite(numberValue) || numberValue <= 0) {
    return "";
  }
  return new Date(numberValue * 1000).toISOString();
}

function isCompletedRun(run: RunnerRun) {
  const status = String(run.status || "").toLowerCase();
  const eventType = String(run.latest_event?.type || "").toLowerCase();
  return status.includes("completed") || eventType.includes("completed");
}

async function fetchJson(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), getStatusFetchTimeoutMs());
  try {
    const response = await fetch(url, { signal: controller.signal });
    const text = await response.text();
    if (!response.ok) {
      throw new Error(text || `Request failed with HTTP ${response.status}`);
    }
    return text ? JSON.parse(text) : null;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`Request timed out while calling ${url}`);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function safeFetchJson(url: string) {
  try {
    return { ok: true, data: await fetchJson(url) };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

async function readControlFile(filePath: string) {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return {
      exists: true,
      active: Boolean(parsed?.active),
      reason: typeof parsed?.reason === "string" ? parsed.reason : "",
      updatedAt: typeof parsed?.updated_at === "number" ? parsed.updated_at : null,
    };
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String((error as { code?: unknown }).code) : "";
    if (code === "ENOENT") {
      return { exists: false, active: false, reason: "", updatedAt: null };
    }
    return {
      exists: true,
      active: false,
      reason: "",
      updatedAt: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function readOptionalText(filePath: string) {
  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String((error as { code?: unknown }).code) : "";
    if (code === "ENOENT") {
      return "";
    }
    throw error;
  }
}

async function writeFileIfChanged(filePath: string, content: string) {
  const current = await readOptionalText(filePath).catch(() => "");
  if (current !== content) {
    await writeFile(filePath, content, "utf8");
  }
}

async function listLocalRunIds() {
  try {
    const entries = await readdir(RUNS_DIR, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String((error as { code?: unknown }).code) : "";
    if (code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function getRunDirectoryUpdatedAt(runDir: string) {
  try {
    const details = await stat(runDir);
    return Math.floor(details.mtimeMs / 1000);
  } catch {
    return 0;
  }
}

function getRunnerRunId(run: RunnerRun) {
  return safePathSegment(String(run.run_id || ""));
}

function getRunRelativePath(runId: string, fileName = "") {
  return fileName ? `docs/agent/runs/${runId}/${fileName}` : `docs/agent/runs/${runId}`;
}

function getReportRelativePath(runId: string) {
  return `docs/autonomy/reports/${runId}.md`;
}

function createRunReportMarkdown(input: {
  runId: string;
  run: RunnerRun;
  runDir: string;
  reportPath: string;
  architecture: string;
  implementationLog: string;
  testReport: string;
  nextActions: string;
}) {
  const latestEvent = input.run.latest_event && typeof input.run.latest_event === "object" ? input.run.latest_event : {};
  const latestContent = redactSensitiveText(String(latestEvent.content || ""));
  const status = String(input.run.status || "local_docs");
  const updatedAtIso = epochToIso(input.run.updated_at) || "unknown";
  const latestEventType = String(latestEvent.type || "none");
  const eventSummary = latestContent
    ? truncateText(latestContent, 2400)
    : "No runner completion message is available for this run yet.";
  const nextBestChanges = input.nextActions.trim()
    ? input.nextActions.trim()
    : "No next-actions.md file has been recorded for this run yet.";

  const artifacts = [
    ["Architecture", "architecture.md", input.architecture],
    ["Implementation Log", "implementation-log.md", input.implementationLog],
    ["Test Report", "test-report.md", input.testReport],
    ["Next Actions", "next-actions.md", input.nextActions],
  ]
    .map(([label, fileName, content]) => {
      const state = String(content || "").trim() ? "present" : "missing";
      return `- ${label}: [${fileName}](../../agent/runs/${input.runId}/${fileName}) (${state})`;
    })
    .join("\n");

  return `# Autonomy Run Report: ${input.runId}

## Tracking
- Status: ${status}
- Updated: ${updatedAtIso}
- Latest event: ${latestEventType}
- Run directory: \`${markdownCodePath(getRunRelativePath(input.runId))}\`
- Report file: \`${markdownCodePath(getReportRelativePath(input.runId))}\`

## Source Artifacts
${artifacts}

## Work Completed
${eventSummary}

## Next Changes
${nextBestChanges}
`;
}

async function buildReportSummary(runId: string, run: RunnerRun) {
  const runDir = path.join(RUNS_DIR, runId);
  const reportPath = path.join(REPORTS_DIR, `${runId}.md`);
  const [architecture, implementationLog, testReport, nextActions] = await Promise.all([
    readOptionalText(path.join(runDir, "architecture.md")),
    readOptionalText(path.join(runDir, "implementation-log.md")),
    readOptionalText(path.join(runDir, "test-report.md")),
    readOptionalText(path.join(runDir, "next-actions.md")),
  ]);

  const localUpdatedAt = await getRunDirectoryUpdatedAt(runDir);
  const updatedAt =
    typeof run.updated_at === "number" && Number.isFinite(run.updated_at) && run.updated_at > 0
      ? run.updated_at
      : localUpdatedAt;
  const normalizedRun: RunnerRun = {
    ...run,
    run_id: runId,
    status: String(run.status || "local_docs"),
    updated_at: updatedAt,
  };
  const latestEvent = normalizedRun.latest_event && typeof normalizedRun.latest_event === "object" ? normalizedRun.latest_event : {};
  const latestContent = redactSensitiveText(String(latestEvent.content || ""));
  const latestEventSummary = latestContent ? truncateText(normalizeWhitespace(latestContent), 360) : "";

  const markdown = createRunReportMarkdown({
    runId,
    run: normalizedRun,
    runDir,
    reportPath,
    architecture,
    implementationLog,
    testReport,
    nextActions,
  });
  await writeFileIfChanged(reportPath, markdown);

  return {
    runId,
    status: String(normalizedRun.status || "local_docs"),
    updatedAt,
    updatedAtIso: epochToIso(updatedAt),
    latestEventType: String(latestEvent.type || ""),
    latestEventSummary,
    eventCount: typeof normalizedRun.event_count === "number" ? normalizedRun.event_count : null,
    completed: isCompletedRun(normalizedRun),
    hasNextActions: Boolean(nextActions.trim()),
    reportPath,
    runPath: runDir,
    nextActionsPath: path.join(runDir, "next-actions.md"),
    nextActions,
  };
}

function createReportIndexMarkdown(summaries: Awaited<ReturnType<typeof buildReportSummary>>[]) {
  const rows = summaries
    .map((summary) => {
      const reportLink = `[report](./${summary.runId}.md)`;
      const nextActions = summary.hasNextActions ? `[next-actions](../../agent/runs/${summary.runId}/next-actions.md)` : "missing";
      return `| ${markdownTableCell(summary.runId)} | ${markdownTableCell(summary.status)} | ${markdownTableCell(summary.updatedAtIso)} | ${markdownTableCell(summary.latestEventType)} | ${reportLink} | ${nextActions} |`;
    })
    .join("\n");

  return `# Autonomy Reports

Persistent reports for COMPND.SYSTEMS autonomy runs.

| Run | Status | Updated | Latest Event | Report | Next Best Changes |
| --- | --- | --- | --- | --- | --- |
${rows || "| none | none | unknown | none | none | missing |"}
`;
}

function createReportIndexJson(summaries: Awaited<ReturnType<typeof buildReportSummary>>[]) {
  return JSON.stringify(
    {
      project: {
        key: PROJECT_KEY,
        name: PROJECT_NAME,
        workspace: ".",
      },
      reports: summaries.map(({ nextActions, reportPath, runPath, nextActionsPath, ...summary }) => ({
        ...summary,
        reportPath: getReportRelativePath(summary.runId),
        runPath: getRunRelativePath(summary.runId),
        nextActionsPath: getRunRelativePath(summary.runId, "next-actions.md"),
      })),
      nextBestChangesPath: "docs/autonomy/NEXT_CHANGES.md",
      reportIndexMarkdownPath: "docs/autonomy/reports/index.md",
      futureBuildPlanPath: "FUTURE_BUILD_PLAN.md",
    },
    null,
    2
  );
}

function createNextBestChangesMarkdown(summaries: Awaited<ReturnType<typeof buildReportSummary>>[]) {
  if (summaries.length === 0) {
    return `# Next Best Changes

No completed COMPND autonomy run with a next-actions.md handoff is available yet.
`;
  }

  const sections = summaries
    .map((summary, index) => {
      return `## Priority ${index + 1}: ${summary.runId}

- Source status: ${summary.status}
- Source report: ${getReportRelativePath(summary.runId)}
- Source actions: ${getRunRelativePath(summary.runId, "next-actions.md")}

${summary.nextActions.trim()}`;
    })
    .join("\n\n");

  return `# Next Best Changes

These items are carried forward automatically into the next COMPND autonomy run. Priorities are ordered from newest completed handoff first.

${sections}
`;
}

function createFutureBuildPlanHandoff(summary: Awaited<ReturnType<typeof buildReportSummary>>) {
  const updatedAt = summary.updatedAtIso || new Date().toISOString();
  return `${FUTURE_PLAN_HANDOFF_START}
## Autonomy Handoff

This section is updated when COMPND autonomy reports are synchronized so future runs can use durable project instructions.

- Latest run: ${summary.runId}
- Status: ${summary.status}
- Updated: ${updatedAt}
- Persistent report: ${getReportRelativePath(summary.runId)}
- Next Changes file: docs/autonomy/NEXT_CHANGES.md
- Source next-actions: ${getRunRelativePath(summary.runId, "next-actions.md")}

Future COMPND autonomy runs must read docs/autonomy/NEXT_CHANGES.md before selecting work.
${FUTURE_PLAN_HANDOFF_END}`;
}

async function syncFutureBuildPlan(summary: Awaited<ReturnType<typeof buildReportSummary>> | null) {
  if (!summary) {
    return "";
  }

  const current = await readOptionalText(FUTURE_BUILD_PLAN_PATH);
  const base = current.trim() ? current : "# Future Build Plan\n";
  const markerPattern = new RegExp(
    `\\r?\\n?${FUTURE_PLAN_HANDOFF_START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${FUTURE_PLAN_HANDOFF_END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\r?\\n?`,
    "g"
  );
  const withoutOldHandoff = base.replace(markerPattern, "").trimEnd();
  await writeFileIfChanged(
    FUTURE_BUILD_PLAN_PATH,
    `${withoutOldHandoff}\n\n${createFutureBuildPlanHandoff(summary)}\n`
  );
  return FUTURE_BUILD_PLAN_PATH;
}

async function syncAutonomyReports(runnerRuns: RunnerRun[]) {
  await mkdir(REPORTS_DIR, { recursive: true });

  const runMap = new Map<string, RunnerRun>();
  for (const run of runnerRuns) {
    const runId = getRunnerRunId(run);
    if (runId) {
      runMap.set(runId, run);
    }
  }

  for (const runId of await listLocalRunIds()) {
    const safeRunId = safePathSegment(runId);
    if (safeRunId && !runMap.has(safeRunId)) {
      runMap.set(safeRunId, { run_id: safeRunId, status: "local_docs" });
    }
  }

  const summaries = (
    await Promise.all(
      [...runMap.entries()].map(([runId, run]) => buildReportSummary(runId, run))
    )
  ).sort((left, right) => {
    const timeDifference = right.updatedAt - left.updatedAt;
    return timeDifference || right.runId.localeCompare(left.runId);
  });

  await writeFileIfChanged(REPORT_INDEX_JSON_PATH, `${createReportIndexJson(summaries)}\n`);
  await writeFileIfChanged(REPORT_INDEX_MD_PATH, createReportIndexMarkdown(summaries));

  const completedWithNextActions = summaries.filter((summary) => summary.completed && summary.hasNextActions);
  const fallbackWithNextActions = summaries.filter((summary) => summary.hasNextActions);
  const handoffSummaries = (completedWithNextActions.length > 0 ? completedWithNextActions : fallbackWithNextActions).slice(0, 5);
  await writeFileIfChanged(NEXT_BEST_CHANGES_PATH, createNextBestChangesMarkdown(handoffSummaries));
  const futureBuildPlanPath = await syncFutureBuildPlan(handoffSummaries[0] || summaries[0] || null);

  return {
    count: summaries.length,
    indexPath: REPORT_INDEX_JSON_PATH,
    indexMarkdownPath: REPORT_INDEX_MD_PATH,
    nextBestChangesPath: NEXT_BEST_CHANGES_PATH,
    futureBuildPlanPath,
    latestRunId: summaries[0]?.runId || "",
    latestReportPath: summaries[0]?.reportPath || "",
    handoffRunId: handoffSummaries[0]?.runId || "",
  };
}

async function safeSyncAutonomyReports(runnerRuns: RunnerRun[]) {
  try {
    return await syncAutonomyReports(runnerRuns);
  } catch (error) {
    return {
      count: 0,
      indexPath: REPORT_INDEX_JSON_PATH,
      indexMarkdownPath: REPORT_INDEX_MD_PATH,
      nextBestChangesPath: NEXT_BEST_CHANGES_PATH,
      futureBuildPlanPath: FUTURE_BUILD_PLAN_PATH,
      latestRunId: "",
      latestReportPath: "",
      handoffRunId: "",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function buildAutonomyRunPrompt(prompt: string) {
  const nextBestChanges = await readOptionalText(NEXT_BEST_CHANGES_PATH).catch(() => "");
  const handoff = nextBestChanges.trim() && !nextBestChanges.includes("No completed COMPND autonomy run")
    ? `Existing autonomy handoff:\nUse the current persistent Next Best Changes file as priority context for this run.\n\n${truncateText(nextBestChanges, 6000)}`
    : "";

  const reportingRequirements = `Persistent reporting requirements:
- Keep run artifacts under the current docs/agent/runs/<run-id> directory.
- Write or update architecture.md, implementation-log.md, test-report.md, and next-actions.md.
- Write or update docs/autonomy/reports/<run-id>.md and docs/autonomy/reports/index.md.
- Write or update docs/autonomy/NEXT_CHANGES.md as a prioritized Next Best Changes handoff for the next COMPND autonomy run.
- Update the project Future Build Plan with the latest autonomy handoff.
- Keep the handoff actionable, testable, and scoped to changes a future autonomy run can execute.`;

  return [prompt, handoff, reportingRequirements].filter(Boolean).join("\n\n");
}

function isCompndRun(run: JsonObject) {
  const runId = String(run.run_id || "");
  const target = run.target_project && typeof run.target_project === "object" ? run.target_project as JsonObject : {};
  const workspace = String(target.workspace_host || target.workspace || "").replace(/\//g, "\\").toLowerCase();
  return runId.startsWith("COMPND-") || workspace === PROJECT_ROOT.toLowerCase();
}

export async function getCompndAutonomyStatus() {
  const [runner, hostLauncher, killSwitch, authorizationLease] = await Promise.all([
    safeFetchJson(urlFor(RUNNER_URL, "/api/status")),
    safeFetchJson(urlFor(HOST_LAUNCHER_URL, "/health")),
    readControlFile(KILL_SWITCH_PATH),
    readControlFile(AUTHORIZATION_LEASE_PATH),
  ]);

  const runnerData = runner.ok && runner.data && typeof runner.data === "object" ? runner.data as JsonObject : {};
  const projectTargets = Array.isArray(runnerData.project_targets) ? runnerData.project_targets : [];
  const allCompndRuns = Array.isArray(runnerData.runs)
    ? runnerData.runs.filter((run) => isCompndRun(run as JsonObject)) as RunnerRun[]
    : [];
  const runs = allCompndRuns.slice(-10).reverse();
  const reports = await safeSyncAutonomyReports(allCompndRuns);
  const projectTarget = projectTargets.find((target) => {
    return target && typeof target === "object" && String((target as JsonObject).key || "").toLowerCase() === PROJECT_KEY;
  }) || null;

  return {
    timestamp: new Date().toISOString(),
    adminAuthMode: getAdminAuthMode(),
    adminConfigured: getAdminAuthMode() === "tokenless" || Boolean(getConfiguredAdminToken()),
    adminRemoteAllowed: isRemoteAdminAllowed(),
    project: {
      key: PROJECT_KEY,
      name: PROJECT_NAME,
      workspace: PROJECT_ROOT,
      frontendUrl: "http://127.0.0.1:5178",
      backendUrl: "http://127.0.0.1:3336",
      target: projectTarget,
    },
    autonomy: {
      root: AUTONOMY_ROOT,
      runnerUrl: RUNNER_URL,
      hostLauncherUrl: HOST_LAUNCHER_URL,
    },
    controls: {
      killSwitch,
      authorizationLease,
      canStart: !killSwitch.active && authorizationLease.exists && authorizationLease.active,
    },
    runner,
    hostLauncher,
    runs,
    reports,
  };
}

export async function startCompndAutonomyRun(input: {
  prompt: string;
  runId?: string;
  model?: string;
}) {
  const prompt = String(input.prompt || "").trim();
  const model = String(input.model || "").trim();
  const runId = input.runId ? cleanRunId(input.runId) : "";

  if (!prompt) {
    throw new AutonomyHttpError(400, "A run objective is required.");
  }
  if (!MODEL_ALLOWLIST.has(model)) {
    throw new AutonomyHttpError(400, "Unsupported model selection.");
  }

  const status = await getCompndAutonomyStatus();
  if (!status.controls.canStart) {
    throw new AutonomyHttpError(409, "COMPND autonomy controls are not open. Check kill switch and authorization lease state.");
  }

  const enrichedPrompt = await buildAutonomyRunPrompt(prompt);
  const args = [
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-File",
    START_SCRIPT_PATH,
    "-ProjectKey",
    PROJECT_KEY,
    "-IdeaPrompt",
    enrichedPrompt,
    "-RegistryPath",
    REGISTRY_PATH,
  ];
  if (runId) args.push("-RunId", runId);
  if (model) args.push("-Model", model);
  args.push("-LaunchCodex");

  const { stdout, stderr } = await execFileAsync("powershell.exe", args, {
    cwd: AUTONOMY_ROOT,
    windowsHide: true,
    timeout: 120000,
    maxBuffer: 1024 * 1024 * 8,
  });

  let parsed: unknown;
  try {
    parsed = JSON.parse(String(stdout || "").trim());
  } catch {
    throw new Error(`Autonomy launcher returned non-JSON output: ${redactSensitiveText(String(stdout || "").trim())}`);
  }

  return {
    result: parsed,
    stderr: stderr ? redactSensitiveText(String(stderr)) : "",
  };
}
