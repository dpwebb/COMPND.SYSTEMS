import { timingSafeEqual } from "node:crypto";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

type JsonObject = Record<string, unknown>;

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

function redactSensitiveText(value: string) {
  return value
    .replace(/sk_(?:live|test)_[A-Za-z0-9_]+/g, "[redacted-stripe-key]")
    .replace(/AIza[0-9A-Za-z_-]{35}/g, "[redacted-google-api-key]")
    .replace(/ghp_[0-9A-Za-z]{36,}/g, "[redacted-github-token]")
    .replace(/github_pat_[0-9A-Za-z_]+/g, "[redacted-github-token]");
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
  const runs = Array.isArray(runnerData.runs) ? runnerData.runs.filter((run) => isCompndRun(run as JsonObject)).slice(-10).reverse() : [];
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

  const args = [
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-File",
    START_SCRIPT_PATH,
    "-ProjectKey",
    PROJECT_KEY,
    "-IdeaPrompt",
    prompt,
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
