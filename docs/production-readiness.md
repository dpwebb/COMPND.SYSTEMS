# Production Readiness

COMPND.SYSTEMS is currently suitable for local and staging validation. Public production launch requires the gates below to pass.

## Current Gate Status

| Gate | Status | Notes |
| --- | --- | --- |
| Automated tests | Passing | `pnpm test` covers admin loopback/remote gating, token mode, and autonomy status fetch timeouts. |
| Static build | Passing | `pnpm run build` completes locally. |
| Smoke test | Passing | `pnpm smoke:test` checks frontend HTML, backend health, backend readiness, and admin status guard; `pnpm smoke:prod` requires the health endpoint. |
| Dependency audit | Passing for high severity | `pnpm audit --audit-level high` passes; one low issue remains. |
| CI | Added | `.github/workflows/ci.yml` tests, builds, audits, starts the server, and runs smoke tests. |
| Frontend bundle | Improved | Route pages are lazy-loaded; the main JS chunk is below the previous 500 kB warning threshold. |
| Public AI guardrails | Partial | Rate limiting, size limits, and safer error responses are in place. Cost quotas and abuse monitoring remain. |
| Admin/autonomy public exposure | Partial | Production runtime disables admin autonomy unless explicitly enabled. If enabled, token auth and a configured token are required. |
| Observability | Partial | Structured request logs, request IDs, and secret-safe denied-admin audit logs are in place. Metrics, tracing, uptime checks, and alerting remain. |
| Deployment | Partial | Docker scaffold, health check, and launch-domain readiness check are in place. Host-specific deployment config, rollback, and domain routing remain. |
| Load testing | Missing | Run synthetic load before scale claims. |

## Production Runtime Defaults

- Set `NODE_ENV=production` or `COMPND_ENV=production`.
- Leave `COMPND_ENABLE_ADMIN_AUTONOMY=false` for public production.
- Set `OPENAI_API_KEY` only in the host secret manager.
- Keep `env.json` local-only; production should use environment variables.
- Use a reverse proxy or managed platform that terminates TLS for `https://compnd.systems`.
- Use `/_api/health` for liveness and `/_api/ready` for runtime readiness checks.
- Keep admin autonomy disabled in public production unless the admin path is isolated from the public internet.

## Required Before Public Scale

1. Separate the public hub from admin/autonomy control paths at the network layer.
2. Add real admin authentication and role authorization before enabling autonomy controls outside loopback.
3. Add production observability: request logs, error logs, latency metrics, uptime checks, and alerting.
4. Add cost controls for `/_api/ai/command`: per-session quotas, bot protection, and provider-side spend alerts.
5. Add deployment automation with rollback and environment-specific configuration.
6. Add load tests for static pages, AI command streaming, and admin-disabled behavior.
7. Add an explicit frontend performance budget in CI so route bundle growth fails before release.

## Release Checklist

Before promoting a build:

1. `pnpm install --frozen-lockfile`
2. `pnpm test`
3. `pnpm run build`
4. `pnpm audit --audit-level high`
5. Start server with production env:
   - `NODE_ENV=production`
   - `COMPND_ENABLE_ADMIN_AUTONOMY=false`
   - `COMPND_API_PORT=3336`
6. `pnpm smoke:prod` to require production health, readiness, and guard checks.
7. `pnpm run domain:check` before setting or keeping any catalog app as `launchLive`.
8. Confirm `/_api/admin/autonomy/status` returns a guarded response in production.
9. Confirm `/_api/ai/command` rejects oversized bodies and rate-limits repeated requests.
10. Confirm logs do not print secrets or raw token values.
11. Confirm structured logs include `requestId`, method, path, status, and duration.
12. Confirm denied admin audit logs include request metadata but no token values.

## Container Runtime

Build a production image:

```bash
docker build -t compnd-systems:local .
```

Run with public admin autonomy disabled:

```bash
docker run --rm -p 3336:3336 \
  -e NODE_ENV=production \
  -e COMPND_ENABLE_ADMIN_AUTONOMY=false \
  -e OPENAI_API_KEY="$OPENAI_API_KEY" \
  compnd-systems:local
```
