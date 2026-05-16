# Next Best Changes

These items are carried forward automatically into the next COMPND autonomy run. Priorities are ordered from newest completed handoff first.

## Priority 1: COMPND-20260516161459

- Source status: codex_completed
- Source report: docs/autonomy/reports/COMPND-20260516161459.md
- Source actions: docs/agent/runs/COMPND-20260516161459/next-actions.md

# COMPND-20260516161459 Next Actions

1. Re-run in a host that allows child process spawning:
- `pnpm build`
- `pnpm start`

2. Restart backend from current workspace code and re-run smoke test:
- Expected result after restart: `backend-health` should report `mode=health-endpoint` instead of `mode=legacy-no-health-route`.

3. Add smoke test to automation:
- Run `pnpm smoke:test` in CI or local pre-release checks with explicit URL overrides when needed:
  - `COMPND_SMOKE_FRONTEND_URL`
  - `COMPND_SMOKE_BACKEND_URL`
  - `COMPND_SMOKE_TIMEOUT_MS`

4. Optional enhancement:
- Add a stricter mode flag (for example `--require-health`) that fails when `/_api/health` is missing, useful for production hardening gates.

## Priority 2: COMPND-20260516161847

- Source status: codex_completed
- Source report: docs/autonomy/reports/COMPND-20260516161847.md
- Source actions: docs/agent/runs/COMPND-20260516161847/next-actions.md

# COMPND-20260516161847 Next Actions

1. Re-run validation on a host environment that allows process spawn:
- `pnpm build`
- `pnpm start`

2. Manually verify admin security behavior:
- Loopback request to `/_api/admin/autonomy/status` succeeds in tokenless mode.
- Non-loopback request receives `403` unless `COMPND_ADMIN_ALLOW_REMOTE=true`.
- In token mode (`COMPND_ADMIN_AUTH_MODE=token`), missing/invalid token returns `401`, valid token succeeds.

3. Add automated tests when test infrastructure is available:
- Unit tests for loopback gating and token auth branches in `assertCompndAutonomyAdmin`.
- Unit tests for status fetch timeout behavior.

4. Optional hardening follow-up:
- Add request audit logging (without secrets) for denied admin requests to improve ops visibility.
