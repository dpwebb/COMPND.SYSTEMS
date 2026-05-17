import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  assertCompndAutonomyAdmin,
  auditCompndAutonomyAdminFailure,
  AutonomyHttpError,
  fetchCompndAutonomyJson,
  getCompndAutonomyStatusTimeoutMs,
} from "../helpers/compndAutonomyBridge.ts";

const TEST_TOKEN = "test-token-1234567890abcdef1234567890";
const ENV_KEYS = [
  "COMPND_ADMIN_ALLOW_REMOTE",
  "CODEX_ADMIN_ALLOW_REMOTE",
  "ADMIN_ALLOW_REMOTE",
  "COMPND_ADMIN_AUTH_MODE",
  "CODEX_ADMIN_AUTH_MODE",
  "ADMIN_AUTH_MODE",
  "COMPND_ADMIN_ACCESS_TOKEN",
  "CODEX_ADMIN_ACCESS_TOKEN",
  "ADMIN_ACCESS_TOKEN",
  "COMPND_AUTONOMY_STATUS_TIMEOUT_MS",
] as const;
const originalEnv = new Map(ENV_KEYS.map((key) => [key, process.env[key]]));
const originalWarn = console.warn;

function restoreEnv() {
  for (const key of ENV_KEYS) {
    const originalValue = originalEnv.get(key);
    if (originalValue === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = originalValue;
    }
  }
}

function useEnv(overrides: Partial<Record<(typeof ENV_KEYS)[number], string>> = {}) {
  for (const key of ENV_KEYS) {
    delete process.env[key];
  }
  Object.assign(process.env, overrides);
}

function expectAutonomyError(callback: () => void, status: number) {
  assert.throws(
    callback,
    (error) => error instanceof AutonomyHttpError && error.status === status,
  );
}

afterEach(() => {
  restoreEnv();
  console.warn = originalWarn;
});

test("allows loopback tokenless admin requests", () => {
  useEnv();

  assert.doesNotThrow(() => {
    assertCompndAutonomyAdmin(new Request("http://127.0.0.1:3336/_api/admin/autonomy/status"));
  });
});

test("denies non-loopback admin requests unless remote access is explicitly allowed", () => {
  useEnv();

  const request = new Request("http://compnd.systems/_api/admin/autonomy/status", {
    headers: { "x-forwarded-for": "203.0.113.10" },
  });

  expectAutonomyError(() => assertCompndAutonomyAdmin(request), 403);

  useEnv({ COMPND_ADMIN_ALLOW_REMOTE: "true" });
  assert.doesNotThrow(() => assertCompndAutonomyAdmin(request));
});

test("requires configured tokens in token auth mode", () => {
  useEnv({ COMPND_ADMIN_AUTH_MODE: "token" });

  const request = new Request("http://127.0.0.1:3336/_api/admin/autonomy/status");

  expectAutonomyError(() => assertCompndAutonomyAdmin(request), 503);
});

test("rejects missing or invalid admin tokens and accepts valid tokens", () => {
  useEnv({ COMPND_ADMIN_AUTH_MODE: "token", COMPND_ADMIN_ACCESS_TOKEN: TEST_TOKEN });

  expectAutonomyError(
    () => assertCompndAutonomyAdmin(new Request("http://127.0.0.1:3336/_api/admin/autonomy/status")),
    401,
  );
  expectAutonomyError(
    () =>
      assertCompndAutonomyAdmin(
        new Request("http://127.0.0.1:3336/_api/admin/autonomy/status", {
          headers: { "x-compnd-admin-token": "invalid-token" },
        }),
      ),
    401,
  );

  assert.doesNotThrow(() =>
    assertCompndAutonomyAdmin(
      new Request("http://127.0.0.1:3336/_api/admin/autonomy/status", {
        headers: { "x-compnd-admin-token": TEST_TOKEN },
      }),
    ),
  );
  assert.doesNotThrow(() =>
    assertCompndAutonomyAdmin(
      new Request("http://127.0.0.1:3336/_api/admin/autonomy/status", {
        headers: { authorization: `Bearer ${TEST_TOKEN}` },
      }),
    ),
  );
});

test("clamps autonomy status fetch timeout settings", () => {
  useEnv({ COMPND_AUTONOMY_STATUS_TIMEOUT_MS: "250" });
  assert.equal(getCompndAutonomyStatusTimeoutMs(), 1000);

  useEnv({ COMPND_AUTONOMY_STATUS_TIMEOUT_MS: "2500" });
  assert.equal(getCompndAutonomyStatusTimeoutMs(), 2500);

  useEnv({ COMPND_AUTONOMY_STATUS_TIMEOUT_MS: "60000" });
  assert.equal(getCompndAutonomyStatusTimeoutMs(), 30000);

  useEnv({ COMPND_AUTONOMY_STATUS_TIMEOUT_MS: "not-a-number" });
  assert.equal(getCompndAutonomyStatusTimeoutMs(), 5000);
});

test("reports autonomy status fetch timeouts", async () => {
  useEnv({ COMPND_AUTONOMY_STATUS_TIMEOUT_MS: "1" });
  const originalFetch = globalThis.fetch;
  globalThis.fetch = ((_url: RequestInfo | URL, init?: RequestInit) => {
    return new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener(
        "abort",
        () => {
          const error = new Error("aborted");
          error.name = "AbortError";
          reject(error);
        },
        { once: true },
      );
    });
  }) as typeof fetch;

  try {
    await assert.rejects(
      () => fetchCompndAutonomyJson("http://127.0.0.1:65535/status"),
      /Request timed out while calling http:\/\/127\.0\.0\.1:65535\/status/,
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("audits denied admin requests without logging token values", () => {
  useEnv({ COMPND_ADMIN_AUTH_MODE: "token", COMPND_ADMIN_ACCESS_TOKEN: TEST_TOKEN });
  const invalidToken = "invalid-secret-token-value";
  const logs: string[] = [];
  console.warn = ((message?: unknown) => {
    logs.push(String(message));
  }) as typeof console.warn;
  const request = new Request("http://compnd.systems/_api/admin/autonomy/status", {
    headers: {
      "x-compnd-admin-token": invalidToken,
      "x-forwarded-for": "203.0.113.10",
      "x-request-id": "test-request-id",
      "user-agent": "node-test",
    },
  });

  try {
    assertCompndAutonomyAdmin(request);
  } catch (error) {
    auditCompndAutonomyAdminFailure(request, error);
  }

  assert.equal(logs.length, 1);
  const rawLog = logs[0];
  assert.ok(!rawLog.includes(invalidToken));
  assert.ok(!rawLog.includes(TEST_TOKEN));

  const record = JSON.parse(rawLog);
  assert.equal(record.event, "admin_autonomy_request_denied");
  assert.equal(record.status, 403);
  assert.equal(record.method, "GET");
  assert.equal(record.path, "/_api/admin/autonomy/status");
  assert.equal(record.requestId, "test-request-id");
  assert.equal(record.authMode, "token");
  assert.equal(record.network, "remote");
  assert.equal(record.tokenProvided, true);
  assert.equal(record.forwardedForPresent, true);
  assert.equal(record.userAgentPresent, true);
});
