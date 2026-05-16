import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Activity, Bot, Lock, Play, RefreshCw, ShieldCheck, ShieldX, Terminal } from "lucide-react";
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
  adminConfigured: boolean;
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

const TOKEN_STORAGE_KEY = "compnd.admin.autonomy.token";
const DEFAULT_PROMPT =
  "Inspect COMPND.SYSTEMS and implement the next highest-leverage improvement. Preserve existing behavior, avoid secrets and deployment config, run relevant checks, and document the work under docs/agent/runs.";

async function apiJson<T>(url: string, token: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      "Content-Type": "application/json",
      "x-compnd-admin-token": token,
    },
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
  const [token, setToken] = useState("");
  const [savedToken, setSavedToken] = useState("");
  const [status, setStatus] = useState<AutonomyStatus | null>(null);
  const [statusError, setStatusError] = useState("");
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [runId, setRunId] = useState("");
  const [model, setModel] = useState("gpt-5.3-codex");
  const [launchCodex, setLaunchCodex] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const [startError, setStartError] = useState("");
  const [startResult, setStartResult] = useState<StartRunResult | null>(null);

  useEffect(() => {
    const existing = window.localStorage.getItem(TOKEN_STORAGE_KEY) || "";
    setToken(existing);
    setSavedToken(existing);
  }, []);

  const isAuthenticated = Boolean(savedToken);
  const controlsOpen = Boolean(status?.controls.canStart);
  const runnerOnline = Boolean(status?.runner.ok);
  const launcherOnline = Boolean(status?.hostLauncher.ok);
  const canStart = isAuthenticated && controlsOpen && runnerOnline && launcherOnline && !isStarting;

  async function refreshStatus(nextToken = savedToken) {
    if (!nextToken) {
      setStatusError("Admin token required.");
      return;
    }
    setIsLoadingStatus(true);
    setStatusError("");
    try {
      setStatus(await apiJson<AutonomyStatus>("/_api/admin/autonomy/status", nextToken));
    } catch (error) {
      setStatus(null);
      setStatusError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoadingStatus(false);
    }
  }

  function saveToken() {
    const next = token.trim();
    if (next) {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, next);
    } else {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    setSavedToken(next);
    void refreshStatus(next);
  }

  function clearToken() {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken("");
    setSavedToken("");
    setStatus(null);
    setStatusError("Admin token cleared.");
  }

  async function startRun() {
    setIsStarting(true);
    setStartError("");
    setStartResult(null);
    try {
      const result = await apiJson<StartRunResult>("/_api/admin/autonomy/start_run", savedToken, {
        method: "POST",
        body: JSON.stringify({
          prompt,
          runId,
          model,
          launchCodex,
        }),
      });
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
          <Lock size={16} />
          TOKEN GATED
        </div>
      </div>

      <section className={styles.grid}>
        <LcarsPanel
          title="ADMIN AUTHORIZATION"
          color={isAuthenticated ? "secondary" : "accent"}
          className={styles.panel}
        >
          <div className={styles.authBox}>
            <label className={styles.field}>
              <span>Admin Token</span>
              <Input
                type="password"
                value={token}
                onChange={(event) => setToken(event.target.value)}
                placeholder="COMPND_ADMIN_ACCESS_TOKEN"
                autoComplete="current-password"
              />
            </label>
            <div className={styles.actionRow}>
              <Button onClick={saveToken}>
                <ShieldCheck size={16} />
                Authorize
              </Button>
              <Button variant="outline" onClick={clearToken}>
                <ShieldX size={16} />
                Clear
              </Button>
              <Button variant="ghost" onClick={() => refreshStatus()} disabled={!savedToken || isLoadingStatus}>
                <RefreshCw size={16} className={isLoadingStatus ? styles.spin : ""} />
                Refresh
              </Button>
            </div>
          </div>
          {statusError && <div className={styles.errorBox}>{statusError}</div>}
        </LcarsPanel>

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
            </div>
          )}
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

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={launchCodex}
            onChange={(event) => setLaunchCodex(event.target.checked)}
          />
          Launch Codex immediately after creating the run.
        </label>

        <div className={styles.actionRow}>
          <Button onClick={startRun} disabled={!canStart}>
            <Play size={16} />
            {isStarting ? "Starting..." : "Start Autonomy Run"}
          </Button>
          {!controlsOpen && status && (
            <span className={styles.blockedText}>Controls blocked. Check lease and kill-switch state.</span>
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
