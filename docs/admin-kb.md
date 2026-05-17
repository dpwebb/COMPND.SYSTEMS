# COMPND.SYSTEMS Admin Knowledge Base

This is the canonical admin knowledge base for the current COMPND.SYSTEMS workspace. It inventories the implemented public site features, admin functions, API behavior, catalog data, scripts, runtime switches, and known operational gaps.

## Source Files

| Area | Primary files |
| --- | --- |
| App router | `App.tsx` |
| Global shell | `components/LcarsLayout.tsx`, `components/LcarsStatusBar.tsx`, `components/_globalContextProviders.tsx` |
| Public pages | `pages/*.tsx` |
| Application catalog | `helpers/appCatalog.ts` |
| AI computer | `components/LcarsComputer.tsx`, `helpers/useAiCommand.tsx`, `endpoints/ai/command_POST.ts` |
| Admin autonomy | `pages/admin.autonomy.tsx`, `helpers/compndAutonomyBridge.ts`, `endpoints/admin/autonomy/*` |
| Server | `server.ts` |
| Build and checks | `package.json`, `scripts/*`, `.github/workflows/ci.yml`, `Dockerfile` |
| Readiness docs | `docs/production-readiness.md`, `docs/domain-readiness.md`, `docs/future-hub-build-plan.md` |

## User-Facing Routes

| Route | Function |
| --- | --- |
| `/` | LCARS-style landing page with hero CTA, featured applications, capability cards, newsletter signup, AI computer, organization profile, and footer stats. |
| `/apps` | Preferred application directory route. Re-exports the `/software` implementation. |
| `/software` | Application directory alias retained for continuity. Includes access filters, status cards, launch or request-access CTAs, and app metadata. |
| `/apps/:slug` | Catalog-driven app detail page with profile, capabilities, launch/domain status, repository metadata, support CTA, and noindex handling for private or invite-only entries. |
| `/services` | Operations index for all service categories and service detail links. |
| `/services/*` | Twenty-four service detail modules, each with service-specific content, related modules, and a contact CTA. |
| `/estimate` | Interactive mission planning estimator with service selection, team size, duration, complexity, auxiliary requirements, classification, estimated hours, and contact CTA. |
| `/contact` | Validated contact form with name, email, company, subject, and message fields plus static contact coordinates and response status. |
| `/about` | Personnel database page with mission profile, stats, team member cards, and testimonials. |
| `/case-studies` | Filterable project portfolio by category. |
| `/blog` | Filterable technical transmission log. The current post links are placeholders. |
| `/admin/autonomy` | Admin control-plane UI for COMPND autonomy status and run launch. Marked noindex. |
| `/*` | LCARS 404 diagnostic page with return-to-home and services scan CTAs. |

## Global Shell Functions

- LCARS layout with top navigation for System Main, Operations, Applications, About, Case Studies, Blog, Estimate, Communications, and Admin.
- Route transition sounds and screen-reader navigation announcements.
- Skip link to main content.
- Date display, sidebar data stream, bottom system status bar, stardate display, and live time.
- Audio toggle with synthesized LCARS tones for click, beep, alert, transition, success, and error.
- Red Alert toggle managed through the global red-alert provider.
- Boot sequence, page transition wrapper, touch ripple wrappers, tooltip provider, toast provider, and hash scrolling support.
- React Query provider with a one-minute default fresh window.
- Web app manifest metadata and theme color injection.

## Landing Page Functions

- Primary message: "Custom Software. Full Stop."
- CTAs to `/contact` and `/apps`.
- Featured applications sourced from `featuredDirectoryApps`.
- Capability cards for custom development, cloud architecture, AI and ML systems, and enterprise integration.
- Newsletter signup with client-side email validation and a simulated success toast.
- AI computer interface for voice or text command access.
- Organization profile stats: uptime, 24/7 operations, and global reach.

## Application Catalog

The hub catalog lives in `helpers/appCatalog.ts`. It drives the home featured apps, `/apps`, `/software`, `/apps/:slug`, validation, domain readiness, and sitemap app detail routes.

| Slug | Project key | Public name | Access | Directory | Launch live | Route or domain plan |
| --- | --- | --- | --- | --- | --- | --- |
| `compnd-systems` | `compnd` | COMPND.SYSTEMS Hub | Public | Yes | Yes | `/`, `https://compnd.systems` |
| `akashic` | `akashic` | Akashic Research Engine | Beta | Yes | No | `/apps/akashic`, planned `https://akashic.compnd.systems` |
| `dw-music-hub` | `anniversary` | DW Music Hub | Beta | Yes | No | `/apps/dw-music-hub`, planned `https://music.compnd.systems` |
| `credit-regulator-pro-staging` | `credit` | CreditRegulatorPro Staging | Private | No | No | Planned protected `https://staging.credit.compnd.systems` |
| `credit-regulator-pro` | `credit-prod` | CreditRegulatorPro | Public | Yes | No | `/apps/credit-regulator-pro`, planned `https://credit.compnd.systems` |
| `academy` | `academy` | COMPND Academy | Coming Soon | Yes | No | `/apps/academy`, planned `https://academy.compnd.systems` |
| `autonomy` | `autonomy` | Autonomy Experiment | Private | Yes | No | `/apps/autonomy`, planned `https://autonomy.compnd.systems` |
| `fx-trading-platform` | `fx` | Disciplined Autonomous FX Trading Platform | Private | Yes | No | `/apps/fx-trading-platform`, planned `https://fx.compnd.systems` |
| `fleet-guru` | `fleet` | Fleet Guru | Beta | Yes | No | `/apps/fleet-guru`, planned `https://fleet.compnd.systems` |
| `ip-governance` | `ip-governance` | IP Governance | Invite Only | Yes | No | `/apps/ip-governance`, planned `https://ip.compnd.systems` |
| `pulphub` | `pulphub` | PulpHub | Coming Soon | Yes | No | `/apps/pulphub`, planned `https://pulphub.compnd.systems` |
| `social-scraper` | `social-scraper` | Social Scraper | Private | Yes | No | `/apps/social-scraper`, planned `https://social.compnd.systems` |

Catalog helper functions:

- `sortHubApps(apps)` sorts featured apps first and then by app name.
- `findDetailAppBySlug(slug)` resolves `/apps/:slug` detail data.
- `getAppDomainLabel(app)` returns primary URL, fallback subdomain, or unassigned label.
- `shouldNoIndexApp(app)` returns true for private, invite-only, and staging apps.
- `sitemapAppDetailRoutes` includes only public, beta, and coming-soon app detail pages.

## Application Directory Functions

- Filter controls: All, Public, Beta, Invite, Private, Soon.
- Cards show app access, registry name, short description, audience, domain plan, repository, status, and registry role.
- Launch behavior:
  - Live HTTPS primary URL: external Launch button.
  - Live internal route: Open button.
  - Coming soon: Updates button to the support path.
  - All other non-live apps: Request Access button to the support path.
- Detail pages show capabilities by project key, contact button, domain mode, launch enabled status, sitemap/noindex status, deployment branch, and exposure notes.

## Services Inventory

The `/services` index groups the service modules into six categories. Every detail page uses `ServiceDetailTemplate`, which adds SEO metadata, return-to-index navigation, contact CTA, related modules, and system status sidebar.

### Custom Software Development

| Route | Module ID | Feature and function coverage |
| --- | --- | --- |
| `/services/full-cycle-development` | `FCD-01` | Discovery, architecture, development, deployment, single accountability, integrated QA, accelerated time-to-market, reduced integration risk, Agile/Scrum, DevOps/CI/CD, TDD, living specs. |
| `/services/legacy-system-modernization` | `LSM-02` | Replatforming, refactoring, rebuilding, code audit, risk mapping, parallel run, cutover, security, scalability, and cost reduction. |
| `/services/high-performance-architecture` | `HPA-03` | Multi-layer caching, load balancing, database optimization, CDN integration, API latency and throughput goals, horizontal scaling, vertical scaling, telemetry, and auto-scaling. |
| `/services/microservices-implementation` | `MSI-04` | Decoupled services, service mesh, containerization, Kubernetes, API gateway, fault isolation, independent deployment, technology diversity, and team autonomy. |

### Cloud Architecture And DevOps

| Route | Module ID | Feature and function coverage |
| --- | --- | --- |
| `/services/multi-cloud-strategy` | `CLOUD-01` | AWS, Azure, GCP, and on-prem workload distribution; vendor independence; geographic redundancy; cost optimization; secure hybrid cloud connectivity. |
| `/services/ci-cd-automation` | `CLOUD-02` | Commit, build, test, deploy pipeline; Jenkins, GitLab CI, GitHub Actions, CircleCI, Travis, ArgoCD, Flux; blue-green deploys, canary releases, feature flags, DORA-style metrics. |
| `/services/infrastructure-as-code` | `CLOUD-03` | Declarative infrastructure, reproducible environments, drift detection, version-controlled rollback, Terraform, Pulumi, CloudFormation, and Ansible. |
| `/services/security-compliance` | `CLOUD-04` | Zero Trust, observability, SOC2, HIPAA, GDPR, PCI, IAM, MFA, RBAC, AES-256 at rest, TLS 1.3 in transit, VPC isolation, private subnets, and micro-segmentation. |

### AI And Machine Learning

| Route | Module ID | Feature and function coverage |
| --- | --- | --- |
| `/services/predictive-analytics` | `PRED-ANLY` | Demand forecasting, churn prediction, risk assessment, pricing optimization, statistical models, machine learning models, real-time ingestion, feature engineering, inference, and automated action. |
| `/services/natural-language-processing` | `NLP-CORE` | Sentiment analysis, entity extraction, translation, summarization, LLM integration, RAG/fine-tuning positioning, vector DBs, context-aware chat, omnichannel deployment, hand-off, and tone calibration. |
| `/services/computer-vision` | `COMP-VIS` | Object detection, facial recognition, OCR/text extraction, defect detection, manufacturing, medical imaging, security, edge deployment, low latency, and model optimization. |
| `/services/neural-network-design` | `NEURO-NET` | CNN, RNN/LSTM, transformer, and GAN architectures; TensorFlow, PyTorch, Keras, JAX, MXNet; GPU clusters, TPU optimization, distributed training, ONNX Runtime, TensorFlow Serving, and TorchServe. |

### Enterprise Integration

| Route | Module ID | Feature and function coverage |
| --- | --- | --- |
| `/services/api-management` | `API-MGT` | REST, GraphQL, gRPC, OAuth2, OIDC, API keys, rate limiting, throttling, quotas, upstream routing, health checks, transformations, Kong, Apigee, AWS API Gateway, Azure APIM, Tyk, versioning, developer portal, and monitoring. |
| `/services/esb-implementation` | `ESB-OPS` | Routing, transformation, orchestration, event-driven messaging, queues, MuleSoft, TIBCO, IBM IB, Apache Camel, Kafka, RabbitMQ, ActiveMQ, AWS SQS, transform-route-enrich flow. |
| `/services/data-synchronization` | `DATA-SYNC` | Real-time sync, change data capture, bidirectional replication, strong consistency, eventual consistency, LWW, version vectors, custom merge logic, master data management, CDC pipeline. |
| `/services/legacy-bridging` | `LEGACY-OPS` | Adapter pattern, anti-corruption layer, strangler fig migration, CICS, IMS, COBOL copybooks, TN3270 screen scraping, EDI, flat files, batch processing, SOAP/XML, RPC, ODBC/JDBC, identify/build/reroute/decommission sequence. |

### Mobile Application Development

| Route | Module ID | Feature and function coverage |
| --- | --- | --- |
| `/services/react-native-flutter` | `MOB-XPLAT` | React Native and Flutter comparison, TypeScript/JavaScript, Dart, native components, Skia, OTA updates, library ecosystems, hot reload, single codebase, native modules, performance, and framework decision matrix. |
| `/services/native-ios-android` | `MOB-NATIVE` | Swift, SwiftUI, Xcode, Cocoa Touch, Kotlin, Jetpack Compose, Android Studio, Material 3, ARKit, CoreML, Metal, hardware access, OS API access, Secure Enclave, Keystore, UX fidelity, and app store optimization. |
| `/services/offline-first-architecture` | `MOB-OFFLINE` | Local database, sync engine, cloud sync, SQLite, WatermelonDB, Realm, Core Data, Room, LWW, operational transformation, manual merge, service workers, Cache API, and PWA offline support. |
| `/services/iot-integration` | `MOB-IOT` | BLE/Bluetooth 5, MQTT, CoAP, NFC, RFID, sensor telemetry, signal strength, packet loss, latency, smart home, wearables, industrial IoT, monitoring, control, and visualization. |

### Data Engineering

| Route | Module ID | Feature and function coverage |
| --- | --- | --- |
| `/services/big-data-processing` | `DATA-01` | Batch processing, stream processing, Apache Spark, Hadoop MapReduce, Apache Flink, Spark Streaming, data lakes, Delta Lake, Apache Iceberg, Kubernetes/YARN clusters, decoupled compute/storage, governance, ingest-process-store-analyze workflow. |
| `/services/data-warehousing` | `DATA-02` | Snowflake, BigQuery, Redshift, Azure Synapse, star/snowflake schemas, fact and dimension modeling, columnar storage, materialized views, clustering, query tuning, RBAC, row-level security, and data cataloging. |
| `/services/etl-pipelines` | `DATA-03` | Extract-transform-load pipeline, API/DB/file connectors, warehouse targets, Airflow, Prefect, Dagster, dbt, Spark SQL, Fivetran, Airbyte, Stitch, data quality gates, incremental loading, monitoring, alerting, and anomaly detection. |
| `/services/real-time-analytics` | `DATA-04` | Event streaming, Kafka, Redpanda, Kinesis, complex event processing, live visualization, WebSockets, fraud detection, IoT monitoring, dynamic pricing, InfluxDB, Timescale, and ClickHouse. |

## Estimate Function

- Form schema requires at least one selected service, one team size value, one duration value, one complexity value, and optional auxiliary requirements.
- Service choices: custom development, cloud architecture, AI and machine learning, enterprise integration, mobile applications, and data engineering.
- Auxiliary requirements: 24/7 support coverage, security audit, personnel training, and extended documentation.
- Team slider range: 1 to 15 personnel.
- Duration slider range: 1 to 24 months.
- Complexity levels: LOW, MEDIUM, HIGH.
- Estimated hours formula: `teamSize * durationMonths * 160 * complexityMultiplier * (1 + requirementCount * 0.05)`.
- Complexity multipliers: LOW `1.0`, MEDIUM `1.2`, HIGH `1.5`.
- Classification:
  - ENTERPRISE when duration is at least 12 months or team is at least 8.
  - LARGE-SCALE when duration is at least 6 months or team is at least 5.
  - STANDARD when duration is at least 3 months or team is at least 3.
  - MINOR otherwise.

## Contact Function

- Client-side validation with Zod:
  - Name minimum 2 characters.
  - Email must be valid.
  - Company optional.
  - Subject minimum 5 characters.
  - Message minimum 10 characters.
- `?service=<id>` pre-fills the subject as `Inquiry regarding: <SERVICE>`.
- Submit currently simulates an API call, logs form data to the browser console, shows a toast, and resets the form.
- Static contact details on the page:
  - Email: `hello@compnd.systems`
  - Phone: `1 (647) 612-7729`
  - Location: Halifax, NS, Canada

## Content Pages

- About: mission profile, organization stats, senior officer cards, and testimonials.
- Case Studies: filterable mock project portfolio for FINTECH, HEALTHCARE, AEROSPACE, and LOGISTICS.
- Blog: filterable mock post list for DEVELOPMENT, CLOUD, AI, INTEGRATION, MOBILE, and DATA.
- 404: diagnostic report with home and services CTAs.

## AI Computer Function

Frontend:

- `LcarsComputer` supports typed commands, streaming responses, conversation history, response reset, and conversation reset.
- Web Speech API support enables manual voice command capture.
- Hands-free mode listens for the wake word `computer`, then captures and submits the spoken command.
- Text-to-speech reads responses through the browser Speech Synthesis API when sound is enabled.
- Sounds play for submit, success, error, transition, and button actions.
- Input is disabled while processing or while wake-word mode is active.

Backend:

- Endpoint: `POST /_api/ai/command`.
- Request payload is validated by `endpoints/ai/command_POST.schema.ts`.
- Maximum command length: 2,000 characters.
- Maximum retained history: 10 messages.
- Maximum history message length: 2,000 characters.
- Request body limit defaults to 32,768 bytes and clamps between 4,096 and 262,144 bytes via `COMPND_AI_REQUEST_BODY_LIMIT_BYTES`.
- Endpoint requires a configured `OPENAI_API_KEY`.
- Current server-side model is `gpt-4o-mini`.
- Uses streamed text responses.
- Errors redact OpenAI and GitHub token patterns before logging or returning generic messages.

Rate limiting:

- Applies to `/_api/ai/*`.
- Default window: 60,000 ms via `COMPND_AI_RATE_LIMIT_WINDOW_MS`.
- Default max: 20 requests per window via `COMPND_AI_RATE_LIMIT_MAX`.
- Client key uses first `x-forwarded-for`, then `x-real-ip`, then `local`.
- Responses include `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, and `Retry-After` on 429.

## Backend API Functions

| Endpoint | Method | Function |
| --- | --- | --- |
| `/_api/health` | GET | Liveness response with `status: ok`, service name, and timestamp. |
| `/_api/ready` | GET | Readiness response with runtime mode, admin autonomy enabled flag, and AI rate-limit settings. |
| `/_api/ai/command` | POST | OpenAI-backed LCARS computer command stream. |
| `/_api/admin/autonomy/status` | GET | Admin autonomy status, controls, runner state, host launcher state, recent runs, and synced report metadata. |
| `/_api/admin/autonomy/start_run` | POST | Starts a COMPND autonomy run after admin auth and control checks. |

Server-wide behavior:

- Hono server with static serving from `static` and built assets from `dist`.
- SPA fallback serves `dist/index.html` for non-API routes.
- Structured request logs include request ID, method, path, status, duration, and service name.
- `X-Request-ID` is generated when absent.
- Security headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`.
- Production adds a restrictive Content Security Policy.

## Admin Autonomy Functions

Frontend route: `/admin/autonomy`.

Page functions:

- Auto-loads admin status on mount.
- Refreshes status every 30 seconds.
- Manual refresh button.
- Displays runner status, host launcher status, authorization lease, kill switch, and report tracking.
- Shows workspace, frontend URL, backend URL, auth mode, remote access mode, report index, next changes file, future build plan file, latest report, and handoff source.
- Start-run form accepts optional run ID, model selection, and objective prompt.
- Model options: `gpt-5.5`, `gpt-5.3-codex`, `gpt-5.3-codex-spark`, or blank Codex default.
- Shows recent COMPND autonomy runs from the runner.

Backend status function:

- `getCompndAutonomyStatus()` fetches:
  - Runner status from `COMPND_AUTONOMY_RUNNER_URL` or `http://127.0.0.1:8000/`.
  - Host launcher health from `COMPND_AUTONOMY_HOST_LAUNCHER_URL` or `http://127.0.0.1:8765/`.
  - Kill switch from `docs/agent/control/kill-switch.json`.
  - Authorization lease from `docs/agent/control/authorization-lease.json`.
- Status fetch timeout defaults to 5,000 ms and clamps between 1,000 and 30,000 ms via `COMPND_AUTONOMY_STATUS_TIMEOUT_MS`.
- COMPND runs are detected by `COMPND-` run IDs or target workspace match.
- Last 10 COMPND runs are returned to the UI.

Autonomy reporting:

- Reports directory: `docs/autonomy/reports`.
- JSON index: `docs/autonomy/reports/index.json`.
- Markdown index: `docs/autonomy/reports/index.md`.
- Next-change handoff: `docs/autonomy/NEXT_CHANGES.md`.
- Future build plan handoff: `FUTURE_BUILD_PLAN.md`.
- Local run artifacts are read from `docs/agent/runs/<run-id>/architecture.md`, `implementation-log.md`, `test-report.md`, and `next-actions.md`.
- Sensitive token patterns are redacted before report summaries are written.

Start-run behavior:

- Requires non-empty prompt.
- Optional run ID is sanitized to letters, numbers, underscores, dashes, and periods.
- Model must be in the allowlist.
- Requires controls to be open: kill switch inactive and authorization lease present/active.
- Enriches the prompt with current `docs/autonomy/NEXT_CHANGES.md` and reporting requirements.
- Launches `Start-CodexProjectAutonomy.ps1` from the autonomy root using `powershell.exe`.
- Passes project key `compnd`, registry path `C:\Users\webbd\Projects\codex-projects.json`, optional run ID, optional model, and `-LaunchCodex`.
- Expects JSON stdout from the launcher.

## Admin Security Model

Production gate in `server.ts`:

- In production, admin autonomy endpoints are disabled unless `COMPND_ENABLE_ADMIN_AUTONOMY` is truthy.
- In production, enabled admin autonomy requires token auth mode.
- In production, token auth requires a configured token of at least 32 characters.

Request guard in `helpers/compndAutonomyBridge.ts`:

- Default access is loopback only.
- Loopback allows `localhost`, `127.*`, `::1`, `[::1]`, and IPv4-mapped loopback.
- `x-forwarded-for` and `x-real-ip` must also be loopback unless remote admin access is explicitly enabled.
- Remote admin access can be enabled with `COMPND_ADMIN_ALLOW_REMOTE`, `CODEX_ADMIN_ALLOW_REMOTE`, or `ADMIN_ALLOW_REMOTE`.
- Auth mode is tokenless unless `COMPND_ADMIN_AUTH_MODE`, `CODEX_ADMIN_AUTH_MODE`, or `ADMIN_AUTH_MODE` is set to `token`, `required`, or `strict`.
- Tokens may be provided through `x-compnd-admin-token` or `Authorization: Bearer <token>`.
- Tokens are compared with timing-safe equality.
- Denied admin requests are audit-logged without token values.

Admin token environment variables:

- `COMPND_ADMIN_ACCESS_TOKEN`
- `CODEX_ADMIN_ACCESS_TOKEN`
- `ADMIN_ACCESS_TOKEN`

## Environment Variables

| Variable | Function |
| --- | --- |
| `OPENAI_API_KEY` | Required for AI computer endpoint. |
| `COMPND_API_PORT` | Backend server port, default `3336`. |
| `NODE_ENV`, `COMPND_ENV`, `COMPND_RUNTIME_ENV` | Runtime mode detection for production behavior. |
| `COMPND_ENABLE_ADMIN_AUTONOMY` | Enables or disables admin autonomy endpoints. Production default should remain false. |
| `COMPND_ADMIN_AUTH_MODE`, `CODEX_ADMIN_AUTH_MODE`, `ADMIN_AUTH_MODE` | Admin auth mode switch. Use token/required/strict for token mode. |
| `COMPND_ADMIN_ACCESS_TOKEN`, `CODEX_ADMIN_ACCESS_TOKEN`, `ADMIN_ACCESS_TOKEN` | Admin token sources. |
| `COMPND_ADMIN_ALLOW_REMOTE`, `CODEX_ADMIN_ALLOW_REMOTE`, `ADMIN_ALLOW_REMOTE` | Explicitly allows non-loopback admin requests. |
| `COMPND_AI_RATE_LIMIT_WINDOW_MS` | AI rate-limit window. |
| `COMPND_AI_RATE_LIMIT_MAX` | AI rate-limit request count. |
| `COMPND_AI_REQUEST_BODY_LIMIT_BYTES` | AI endpoint body size limit. |
| `COMPND_AUTONOMY_TARGET_WORKSPACE` | Overrides COMPND autonomy target workspace. |
| `COMPND_AUTONOMY_ROOT` | Overrides autonomy experiment root. |
| `COMPND_AUTONOMY_RUNNER_URL` | Overrides runner URL. |
| `COMPND_AUTONOMY_HOST_LAUNCHER_URL` | Overrides host launcher URL. |
| `COMPND_AUTONOMY_STATUS_TIMEOUT_MS` | Timeout for autonomy status fetches. |
| `COMPND_SMOKE_FRONTEND_URL` | Smoke-test frontend URL override. |
| `COMPND_SMOKE_BACKEND_URL` | Smoke-test backend URL override. |
| `COMPND_SMOKE_TIMEOUT_MS` | Smoke-test timeout override. |
| `COMPND_SMOKE_REQUIRE_HEALTH` | Requires `/_api/health` in smoke tests. |
| `COMPND_DOMAIN_CHECK_TIMEOUT_MS` | Domain readiness timeout. |

Local `env.json` is loaded by `loadEnv.js` only when present. Do not commit or print secret values from local environment files.

## Build, Test, And Operations

Package scripts:

| Command | Function |
| --- | --- |
| `pnpm dev` | Starts Vite on `127.0.0.1:5178` with API proxying to `localhost:3336`. |
| `pnpm run build` | Runs catalog validation, sitemap generation, and Vite build. |
| `pnpm start` | Starts the Hono server through `tsx server.ts`. |
| `pnpm preview` | Starts Vite preview. |
| `pnpm test` | Runs `tests/compndAutonomyBridge.test.ts`. |
| `pnpm run catalog:validate` | Validates uniqueness, HTTPS URLs, support paths, live launch requirements, staging visibility, detail routes, and sitemap/noindex alignment. |
| `pnpm run domain:check` | Checks DNS and HTTPS for launch-live catalog apps. |
| `pnpm run domain:check:planned` | Checks planned fallback subdomains for informational readiness. |
| `pnpm run sitemap:generate` | Regenerates `static/sitemap.xml`. |
| `pnpm smoke:test` | Checks frontend root, backend health, readiness, and admin status guard. |
| `pnpm smoke:prod` | Runs smoke test against `http://127.0.0.1:3336` with health required. |
| `pnpm run launch:check` | Runs verify and domain check. |
| `pnpm run verify` | Runs tests, build, and high-severity dependency audit. |

CI:

- Runs on pushes to `main` and pull requests.
- Uses Node 24 and pnpm 10.33.2.
- Steps: install, test, build, high-severity audit, start production-mode server with admin autonomy disabled, wait for health, run production smoke, Docker build.

Docker:

- Multi-stage Node 24 Alpine image.
- Builds with `pnpm run build`.
- Runtime exposes port `3336`.
- Runtime defaults: `NODE_ENV=production`, `COMPND_API_PORT=3336`, `COMPND_ENABLE_ADMIN_AUTONOMY=false`.
- Healthcheck calls `http://127.0.0.1:3336/_api/health`.

## Sitemap And SEO

- Sitemap generation source: `scripts/generate-sitemap.ts`.
- Base URL: `https://compnd.systems`.
- Includes top-level routes, eligible app detail routes, and all service detail routes.
- Private, invite-only, staging, lab, and compliance-sensitive app detail pages are noindex or excluded according to catalog access rules.
- Admin autonomy route is noindex.
- 404 route is noindex.

## Current Known Gaps

- Contact form submission and newsletter signup are simulated client-side only. There is no persistence, email delivery, CRM integration, or backend contact endpoint.
- `/contact?app=...`, `/contact?subject=...`, and `/contact?message=...` are used by some CTAs, but the current contact page only hydrates `?service=...` into the subject.
- Blog post links use `#`; there are no blog detail pages.
- Case study "ACCESS DATA" buttons are visual only and do not open detail pages.
- `/blog` exists as a route but is not currently included in `scripts/generate-sitemap.ts`.
- The AI computer depends on `OPENAI_API_KEY`; without it, the endpoint returns service-not-configured.
- Admin autonomy is designed for controlled local or isolated operation. Keep it disabled in public production unless the admin path is network-isolated and token auth is configured.
- Product images/screenshots are not yet wired into app detail pages.
- Planned subdomains are cataloged but not launch-live until DNS, HTTPS, deployment, and support routing are verified.

## Admin Operating Rules

- Treat GitHub as deployment source of truth.
- Do not create or expose new deploy keys, GitHub tokens, Hostinger credentials, or secrets unless credential setup is explicitly requested.
- Keep `env.json` and `.env*` contents private.
- Do not set a catalog app to `launchLive: true` until `docs/domain-readiness.md` has been satisfied.
- Keep CreditRegulatorPro staging hidden from the public directory and sitemap.
- Before public promotion, run:

```powershell
pnpm install --frozen-lockfile
pnpm test
pnpm run build
pnpm audit --audit-level high
pnpm smoke:prod
pnpm run domain:check
```
