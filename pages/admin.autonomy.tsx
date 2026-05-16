import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Activity, Bot, Play, RefreshCw, ShieldCheck, ShieldX, Terminal } from "lucide-react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { LcarsPanel } from "../components/LcarsPanel";
import { Textarea } from "../components/Textarea";
import styles from "./admin.autonomy.module.css";

type ApiState<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

type AutonomyStatus = {
  timestamp: string;
  adminAuthMode: "tokenless" | "token";
  adminConfigured: boolean;
  adminRemoteAllowed: boolean;
  project: {
    key: string;
    name: string;
    workspace: string;
    frontendUrl: string;
    backendUrl: string;
  };
  autonomy: {
    root: string;
    runnerUrl: string;
    hostLauncherUrl: string;
  };
  controls: {
    canStart: boolean;
    killSwitch: {
      exists: boolean;
      active: boolean;
      reason?: string;
      error?: string;
    };
    authorizationLease: {
      exists: boolean;
      active: boolean;
      reason?: string;
      error?: string;
    };
  };
  runner: ApiState<any>;
  hostLauncher: ApiState<any>;
  runs: Array<{
    run_id?: string;
    status?: string;
    updated_at?: number;
    latest_event?: {
      type?: string;
      content?: string;
    };
  }>;
};

type StartRunResult = {
  result?: {
    run_id?: string;
    project_key?: string;
    project_name?: string;
    workspace?: string;
    frontend_url?: string;
    backend_url?: string;
    launch?: any;
  };
  stderr?: string;
};

const DEFAULT_PROMPT =
  "Inspect COMPND.SYSTEMS and implement the next highest-leverage improvement. Preserve existing behavior, avoid secrets and deployment config, run relevant checks, and document the work under docs/agent/runs.";
const ADMIN_TOKEN_STORAGE_KEY = "compnd.admin.autonomy.token";

async function apiJson<T>(url: string, init?: RequestInit, adminToken = ""): Promise<T> {
  const headers = new Headers(init?.headers || {});
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (adminToken.trim()) {
    headers.set("x-compnd-admin-token", adminToken.trim());
  }

  const response = await fetch(url, {
    ...init,
    headers,
  });
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new Error(body?.error || response.statusText || `HTTP ${response.status}`);
  }
  return body as T;
}

function formatTimestamp(value?: number) {
  if (!value) return "unknown";
  return new Date(value * 1000).toLocaleString();
}

function statusLabel(state: ApiState<any>, fallback = "offline") {
  if (!state.ok) return fallback;
  return String(state.data?.status || state.data?.runner?.status || "online");
}

export default function AdminAutonomyPage() {
  const [status, setStatus] = useState<AutonomyStatus | null>(null);
  const [statusError, setStatusError] = useState("");
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [runId, setRunId] = useState("");
  const [model, setModel] = useState("gpt-5.3-codex");
  const [isStarting, setIsStarting] = useState(false);
  const [startError, setStartError] = useState("");
  const [startResult, setStartResult] = useState<StartRunResult | null>(null);
  const [adminToken, setAdminToken] = useState("");

  useEffect(() => {
    void refreshStatus();
  }, []);

  useEffect(() => {
    try {
      setAdminToken(localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) || "");
    } catch {
      setAdminToken("");
    }
  }, []);

  useEffect(() => {
    try {
      if (adminToken.trim()) {
        localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, adminToken.trim());
      } else {
        localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors in restricted browser modes.
    }
  }, [adminToken]);

  const controlsOpen = Boolean(status?.controls.canStart);
  const runnerOnline = Boolean(status?.runner.ok);
  const launcherOnline = Boolean(status?.hostLauncher.ok);
  const canStart = Boolean(prompt.trim()) && !isStarting;

  async function refreshStatus() {
    setIsLoadingStatus(true);
    setStatusError("");
    try {
      const nextStatus = await apiJson<AutonomyStatus>("/_api/admin/autonomy/status", undefined, adminToken);
      setStatus(nextStatus);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(null);
      setStatusError(message);
    } finally {
      setIsLoadingStatus(false);
    }
  }

  async function startRun() {
    setIsStarting(true);
    setStartError("");
    setStartResult(null);
    try {
      const result = await apiJson<StartRunResult>("/_api/admin/autonomy/start_run", {
        method: "POST",
        body: JSON.stringify({
          prompt,
          runId,
          model,
        }),
      }, adminToken);
      setStartResult(result);
      setRunId("");
      await refreshStatus();
    } catch (error) {
      setStartError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsStarting(false);
    }
  }

  const recentRuns = useMemo(() => status?.runs || [], [status]);

  return (
    <>
      <Helmet>
        <title>Admin Autonomy | COMPND.SYSTEMS</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>ADMIN CONTROL PLANE</p>
          <h1 className={styles.title}>AUTONOMY ACCESS</h1>
        </div>
        <div className={styles.headerPill}>
          <ShieldCheck size={16} />
          TEST ACCESS AUTO
        </div>
      </div>

      <section className={styles.statusSection}>
        <LcarsPanel title="SYSTEM STATUS" color="info" className={styles.panel}>
          <div className={styles.statusGrid}>
            <StatusItem
              icon={<Activity size={18} />}
              label="Runner"
              value={status ? statusLabel(status.runner) : "unknown"}
              ok={runnerOnline}
            />
            <StatusItem
              icon={<Terminal size={18} />}
              label="Host Launcher"
              value={status ? statusLabel(status.hostLauncher) : "unknown"}
              ok={launcherOnline}
            />
            <StatusItem
              icon={<ShieldCheck size={18} />}
              label="Authorization Lease"
              value={status?.controls.authorizationLease.active ? "active" : "blocked"}
              ok={Boolean(status?.controls.authorizationLease.active)}
            />
            <StatusItem
              icon={<ShieldX size={18} />}
              label="Kill Switch"
              value={status?.controls.killSwitch.active ? "active" : "inactive"}
              ok={!status?.controls.killSwitch.active}
            />
          </div>
          {status && (
            <div className={styles.metaBlock}>
              <p>Workspace: {status.project.workspace}</p>
              <p>Frontend: {status.project.frontendUrl}</p>
              <p>Backend: {status.project.backendUrl}</p>
              <p>Auth Mode: {status.adminAuthMode}</p>
              <p>Remote Access: {status.adminRemoteAllowed ? "enabled" : "loopback only"}</p>
            </div>
          )}
          {statusError && <div className={styles.errorBox}>{statusError}</div>}
          <div className={styles.actionRow}>
            <label className={styles.inlineField}>
              <span>Admin Token</span>
              <Input
                value={adminToken}
                onChange={(event) => setAdminToken(event.target.value)}
                type="password"
                className={styles.tokenInput}
                placeholder="Required only in token mode"
              />
            </label>
            <Button variant="ghost" onClick={() => refreshStatus()} disabled={isLoadingStatus}>
              <RefreshCw size={16} className={isLoadingStatus ? styles.spin : ""} />
              Refresh
            </Button>
          </div>
        </LcarsPanel>
      </section>

      <LcarsPanel title="START COMPND AUTONOMY RUN" color="primary" className={styles.startPanel}>
        <div className={styles.startGrid}>
          <label className={styles.field}>
            <span>Run ID</span>
            <Input
              value={runId}
              onChange={(event) => setRunId(event.target.value)}
              placeholder="Auto-generated if blank"
            />
          </label>

          <label className={styles.field}>
            <span>Model</span>
            <select value={model} onChange={(event) => setModel(event.target.value)} className={styles.select}>
              <option value="gpt-5.5">GPT-5.5 / high-risk planning</option>
              <option value="gpt-5.3-codex">GPT-5.3 Codex / implementation</option>
              <option value="gpt-5.3-codex-spark">GPT-5.3 Codex Spark / small edits</option>
              <option value="">Codex default</option>
            </select>
          </label>
        </div>

        <label className={styles.field}>
          <span>Objective</span>
          <Textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            rows={7}
          />
        </label>

        <div className={styles.actionRow}>
          <Button onClick={startRun} disabled={!canStart}>
            <Play size={16} />
            {isStarting ? "Starting..." : "Start Autonomy Run"}
          </Button>
          {(!controlsOpen || !runnerOnline || !launcherOnline) && status && (
            <span className={styles.blockedText}>System readiness warning. The backend will report any runner, lease, or kill-switch block.</span>
          )}
        </div>

        {startError && <div className={styles.errorBox}>{startError}</div>}
        {startResult?.result && (
          <div className={styles.successBox}>
            <Bot size={18} />
            Run started: {startResult.result.run_id || "unknown"}
          </div>
        )}
      </LcarsPanel>

      <LcarsPanel title="RECENT COMPND RUNS" color="secondary" className={styles.panel}>
        {recentRuns.length === 0 ? (
          <p className={styles.emptyState}>No COMPND autonomy runs reported by the runner.</p>
        ) : (
          <div className={styles.runList}>
            {recentRuns.map((run) => (
              <div className={styles.runRow} key={run.run_id}>
                <div>
                  <strong>{run.run_id}</strong>
                  <p>{run.latest_event?.type || "no recent event"}</p>
                </div>
                <div className={styles.runMeta}>
                  <span>{run.status || "unknown"}</span>
                  <span>{formatTimestamp(run.updated_at)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </LcarsPanel>
    </>
  );
}

function StatusItem({
  icon,
  label,
  value,
  ok,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  ok: boolean;
}) {
  return (
    <div className={`${styles.statusItem} ${ok ? styles.ok : styles.bad}`}>
      {icon}
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
