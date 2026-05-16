import "./loadEnv.js";
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { serve } from '@hono/node-server';

const app = new Hono();
const AI_RATE_LIMIT_WINDOW_MS = getBoundedNumber(process.env.COMPND_AI_RATE_LIMIT_WINDOW_MS, 60000, 1000, 3600000);
const AI_RATE_LIMIT_MAX = getBoundedNumber(process.env.COMPND_AI_RATE_LIMIT_MAX, 20, 1, 1000);
const aiRateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function getBoundedNumber(value: string | undefined, fallback: number, min: number, max: number) {
  const parsed = Number(value || "");
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.max(min, Math.min(max, Math.floor(parsed)));
}

function isTruthy(value: string | undefined) {
  return ["1", "true", "yes", "on", "enabled"].includes(String(value || "").trim().toLowerCase());
}

function isProductionRuntime() {
  const runtime = String(process.env.COMPND_RUNTIME_ENV || process.env.COMPND_ENV || process.env.NODE_ENV || "").toLowerCase();
  return runtime === "production";
}

function isAdminAutonomyEnabled() {
  if (isProductionRuntime()) {
    return isTruthy(process.env.COMPND_ENABLE_ADMIN_AUTONOMY);
  }
  return !["0", "false", "off", "disabled"].includes(String(process.env.COMPND_ENABLE_ADMIN_AUTONOMY || "").trim().toLowerCase());
}

function firstCsvValue(value: string) {
  return value.split(",")[0]?.trim() || "";
}

function getClientRateLimitKey(request: Request) {
  return (
    firstCsvValue(request.headers.get("x-forwarded-for") || "") ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function consumeRateLimit(key: string) {
  const now = Date.now();
  const existing = aiRateLimitBuckets.get(key);
  if (!existing || existing.resetAt <= now) {
    aiRateLimitBuckets.set(key, { count: 1, resetAt: now + AI_RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: AI_RATE_LIMIT_MAX - 1, resetAt: now + AI_RATE_LIMIT_WINDOW_MS };
  }
  if (existing.count >= AI_RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }
  existing.count += 1;
  return { allowed: true, remaining: AI_RATE_LIMIT_MAX - existing.count, resetAt: existing.resetAt };
}

app.use("*", async (c, next) => {
  c.header("X-Content-Type-Options", "nosniff");
  c.header("X-Frame-Options", "DENY");
  c.header("Referrer-Policy", "strict-origin-when-cross-origin");
  c.header("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  c.header("Cross-Origin-Opener-Policy", "same-origin");
  if (isProductionRuntime()) {
    c.header(
      "Content-Security-Policy",
      "default-src 'self'; connect-src 'self'; img-src 'self' data:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'"
    );
  }
  await next();
});

app.use("/_api/ai/*", async (c, next) => {
  const result = consumeRateLimit(getClientRateLimitKey(c.req.raw));
  c.header("X-RateLimit-Limit", String(AI_RATE_LIMIT_MAX));
  c.header("X-RateLimit-Remaining", String(result.remaining));
  c.header("X-RateLimit-Reset", String(Math.ceil(result.resetAt / 1000)));
  if (!result.allowed) {
    c.header("Retry-After", String(Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000))));
    return c.json({ error: "AI command rate limit exceeded." }, 429);
  }
  await next();
});

app.get("/_api/health", (c) => {
  return c.json({
    status: "ok",
    service: "COMPND.SYSTEMS",
    timestamp: new Date().toISOString(),
  });
});

app.post('_api/ai/command',async c => {
  try {
    const { handle } = await import("./endpoints/ai/command_POST.js");
    let request = c.req.raw;
    const response = await handle(request);
    if (!(response instanceof Response) && response.constructor.name !== "Response") {
      return c.text("Invalid response format. handle should always return a Response object." + response.constructor.name, 500);
    }
    return response;
  } catch (e) {
    console.error(e);
    return c.text("Error loading endpoint code " + e.message,  500)
  }
})
app.get('_api/admin/autonomy/status',async c => {
  try {
    if (!isAdminAutonomyEnabled()) {
      return c.json({ error: "Admin autonomy endpoints are disabled in this runtime." }, 403);
    }
    const { handle } = await import("./endpoints/admin/autonomy/status_GET.js");
    let request = c.req.raw;
    const response = await handle(request);
    if (!(response instanceof Response) && response.constructor.name !== "Response") {
      return c.text("Invalid response format. handle should always return a Response object." + response.constructor.name, 500);
    }
    return response;
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : String(e);
    return c.text("Error loading endpoint code " + message, 500)
  }
})
app.post('_api/admin/autonomy/start_run',async c => {
  try {
    if (!isAdminAutonomyEnabled()) {
      return c.json({ error: "Admin autonomy endpoints are disabled in this runtime." }, 403);
    }
    const { handle } = await import("./endpoints/admin/autonomy/start_run_POST.js");
    let request = c.req.raw;
    const response = await handle(request);
    if (!(response instanceof Response) && response.constructor.name !== "Response") {
      return c.text("Invalid response format. handle should always return a Response object." + response.constructor.name, 500);
    }
    return response;
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : String(e);
    return c.text("Error loading endpoint code " + message, 500)
  }
})
app.use("/*", serveStatic({ root: "./static" }));
app.use('/*', serveStatic({ root: './dist' }))
app.get("*", async (c, next) => {
  const p = c.req.path;
  if (p.startsWith("/_api")) {
    return next();
  }
  return serveStatic({ path: "./dist/index.html" })(c, next);
});
const port = Number(process.env.COMPND_API_PORT || 3336);
serve({ fetch: app.fetch, port });
console.log(`Running at http://localhost:${port}`)
