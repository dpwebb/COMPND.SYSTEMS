# Production Readiness

COMPND.SYSTEMS is currently suitable for local and staging validation. Public production launch requires the gates below to pass.

## Current Gate Status

| Gate | Status | Notes |
| --- | --- | --- |
| Static build | Passing | `pnpm run build` completes locally. |
| Smoke test | Passing | `pnpm smoke:test` checks frontend HTML, backend health, and admin status guard. |
| Dependency audit | Passing for high severity | `pnpm audit --audit-level high` passes; one low issue remains. |
| CI | Added | `.github/workflows/ci.yml` builds, audits, starts the server, and runs smoke tests. |
| Public AI guardrails | Partial | Rate limiting, size limits, and safer error responses are in place. Cost quotas and abuse monitoring remain. |
| Admin/autonomy public exposure | Partial | Production runtime disables admin autonomy unless explicitly enabled. Full production admin auth is still required before public exposure. |
| Observability | Missing | Add structured logs, metrics, uptime checks, and alerting. |
| Deployment | Missing | Add host-specific deployment config, rollback, health checks, and domain routing. |
| Load testing | Missing | Run synthetic load before scale claims. |

## Production Runtime Defaults

- Set `NODE_ENV=production` or `COMPND_ENV=production`.
- Leave `COMPND_ENABLE_ADMIN_AUTONOMY=false` for public production.
- Set `OPENAI_API_KEY` only in the host secret manager.
- Keep `env.json` local-only; production should use environment variables.
- Use a reverse proxy or managed platform that terminates TLS for `https://compnd.systems`.

## Required Before Public Scale

1. Separate the public hub from admin/autonomy control paths at the network layer.
2. Add real admin authentication and role authorization before enabling autonomy controls outside loopback.
3. Add production observability: request logs, error logs, latency metrics, uptime checks, and alerting.
4. Add cost controls for `/_api/ai/command`: per-session quotas, bot protection, and provider-side spend alerts.
5. Add deployment automation with rollback and environment-specific configuration.
6. Add load tests for static pages, AI command streaming, and admin-disabled behavior.
7. Code-split the frontend route bundle before heavy public traffic.

## Release Checklist

Before promoting a build:

1. `pnpm install --frozen-lockfile`
2. `pnpm run build`
3. `pnpm audit --audit-level high`
4. Start server with production env:
   - `NODE_ENV=production`
   - `COMPND_ENABLE_ADMIN_AUTONOMY=false`
   - `COMPND_API_PORT=3336`
5. `pnpm smoke:prod`
6. Confirm `/_api/admin/autonomy/status` returns a guarded response in production.
7. Confirm `/_api/ai/command` rejects oversized bodies and rate-limits repeated requests.
8. Confirm logs do not print secrets or raw token values.
