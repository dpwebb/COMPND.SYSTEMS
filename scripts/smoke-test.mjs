#!/usr/bin/env node

const DEFAULT_FRONTEND_URL = "http://127.0.0.1:5178";
const DEFAULT_BACKEND_URL = "http://127.0.0.1:3336";
const DEFAULT_TIMEOUT_MS = 8000;

function parseArgs(argv) {
  const args = {};
  for (const raw of argv) {
    if (!raw.startsWith("--")) continue;
    const [key, ...rest] = raw.slice(2).split("=");
    args[key] = rest.join("=") || "true";
  }
  return args;
}

function trimTrailingSlash(value) {
  return value.replace(/\/+$/, "");
}

function getUrl(baseUrl, pathname) {
  return `${trimTrailingSlash(baseUrl)}${pathname}`;
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function requireHtml(url, timeoutMs) {
  const response = await fetchWithTimeout(url, timeoutMs);
  const text = await response.text();
  const contentType = response.headers.get("content-type") || "";
  if (!response.ok) {
    throw new Error(`Expected 2xx HTML response from ${url}; received ${response.status}`);
  }
  const looksLikeHtml =
    contentType.includes("text/html") ||
    /^<!doctype html>/i.test(text.trimStart()) ||
    /<html[\s>]/i.test(text);
  if (!looksLikeHtml) {
    throw new Error(`Expected HTML content from ${url}; received content-type "${contentType || "unknown"}"`);
  }
  return { status: response.status, contentType };
}

async function requireBackendReachable(baseUrl, timeoutMs) {
  const healthUrl = getUrl(baseUrl, "/_api/health");
  const response = await fetchWithTimeout(healthUrl, timeoutMs);
  if (response.status === 404) {
    const rootResult = await requireHtml(baseUrl, timeoutMs);
    return {
      status: rootResult.status,
      mode: "legacy-no-health-route",
      service: "unknown",
    };
  }

  const text = await response.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = null;
  }

  if (!response.ok) {
    throw new Error(`Health endpoint failed at ${healthUrl} with status ${response.status}`);
  }
  if (!body || body.status !== "ok") {
    throw new Error(`Health endpoint returned unexpected payload at ${healthUrl}`);
  }

  return {
    status: response.status,
    mode: "health-endpoint",
    service: body.service || "unknown",
  };
}

async function requireBackendReady(baseUrl, timeoutMs) {
  const readyUrl = getUrl(baseUrl, "/_api/ready");
  const response = await fetchWithTimeout(readyUrl, timeoutMs);
  const text = await response.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = null;
  }

  if (!response.ok) {
    throw new Error(`Readiness endpoint failed at ${readyUrl} with status ${response.status}`);
  }
  if (!body || body.status !== "ready") {
    throw new Error(`Readiness endpoint returned unexpected payload at ${readyUrl}`);
  }

  return {
    status: response.status,
    runtime: body.runtime || "unknown",
    adminAutonomyEnabled: Boolean(body.adminAutonomyEnabled),
  };
}

async function requireAdminStatusReachable(url, timeoutMs) {
  const response = await fetchWithTimeout(url, timeoutMs);
  const text = await response.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = null;
  }

  if (response.status === 200) {
    const hasProject = body && typeof body === "object" && body.project && typeof body.project === "object";
    const hasControls = body && typeof body === "object" && body.controls && typeof body.controls === "object";
    if (!hasProject || !hasControls) {
      throw new Error(`Admin status succeeded at ${url} but payload shape was unexpected`);
    }
    return { status: response.status, mode: "ok" };
  }

  if ([401, 403, 503].includes(response.status)) {
    return { status: response.status, mode: "auth-guarded" };
  }

  throw new Error(`Admin status endpoint returned unexpected status ${response.status} at ${url}`);
}

function printResult(label, details) {
  console.log(`PASS ${label}: ${details}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const frontendUrl = process.env.COMPND_SMOKE_FRONTEND_URL || args.frontend || DEFAULT_FRONTEND_URL;
  const backendUrl = process.env.COMPND_SMOKE_BACKEND_URL || args.backend || DEFAULT_BACKEND_URL;
  const timeoutMs = Number(process.env.COMPND_SMOKE_TIMEOUT_MS || args.timeout || DEFAULT_TIMEOUT_MS);

  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    throw new Error("Timeout must be a positive number.");
  }

  const checks = [
    {
      label: "frontend-root",
      run: async () => {
        const result = await requireHtml(frontendUrl, timeoutMs);
        return `status=${result.status} contentType=${result.contentType || "unknown"}`;
      },
    },
    {
      label: "backend-health",
      run: async () => {
        const result = await requireBackendReachable(backendUrl, timeoutMs);
        return `status=${result.status} mode=${result.mode} service=${result.service}`;
      },
    },
    {
      label: "backend-ready",
      run: async () => {
        const result = await requireBackendReady(backendUrl, timeoutMs);
        return `status=${result.status} runtime=${result.runtime} adminAutonomyEnabled=${result.adminAutonomyEnabled}`;
      },
    },
    {
      label: "admin-status",
      run: async () => {
        const statusUrl = getUrl(backendUrl, "/_api/admin/autonomy/status");
        const result = await requireAdminStatusReachable(statusUrl, timeoutMs);
        return `status=${result.status} mode=${result.mode}`;
      },
    },
  ];

  const failures = [];
  for (const check of checks) {
    try {
      const details = await check.run();
      printResult(check.label, details);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push({ label: check.label, message });
      console.error(`FAIL ${check.label}: ${message}`);
    }
  }

  if (failures.length > 0) {
    console.error(`Smoke test failed: ${failures.length} check(s) failed.`);
    process.exitCode = 1;
    return;
  }

  console.log("Smoke test passed: all checks succeeded.");
}

main().catch((error) => {
  console.error(`Smoke test crashed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
