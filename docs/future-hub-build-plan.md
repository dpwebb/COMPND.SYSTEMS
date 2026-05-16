# COMPND.SYSTEMS Future Hub Build Plan

## Purpose

Use `https://compnd.systems` as the public business and application hub for COMPND.SYSTEMS. The hub should make every public project discoverable, explain what each project does, and route users to the correct live application.

Projects that already have their own formal `https://` domains should remain on those domains and be linked from the hub. Projects without formal domains should receive subdomains under `compnd.systems`.

## Hub Principles

- `compnd.systems` is the canonical public hub, not a monolithic container for every app.
- Each application keeps its own repository, deployment workflow, runtime, and production domain.
- The hub owns discovery, product positioning, routing, status summaries, contact paths, and support entry points.
- Production applications should be linked publicly. Staging, preview, and internal environments should stay hidden, protected, and `noindex`.
- GitHub remains the source of truth for code and deployment history.

## Domain Model

### Existing Formal Domains

When a project has its own domain:

- Add it to the hub catalog as an external application.
- Link directly to the formal domain with a clear `Launch` CTA.
- Keep the formal domain in the app card, detail page, sitemap, and support docs.
- Do not proxy or iframe the application through `compnd.systems` unless there is a specific product or auth reason.

Example:

```ts
{
  slug: "example-app",
  name: "Example App",
  primaryUrl: "https://exampleapp.com",
  domainMode: "formal-domain"
}
```

### COMPND Subdomains

When a project does not have a formal domain:

- Assign a stable subdomain under `compnd.systems`.
- Use short, durable names that match the public product name.
- Prefer product names over internal project keys.

Suggested pattern:

```text
https://akashic.compnd.systems
https://music.compnd.systems
https://credit.compnd.systems
https://academy.compnd.systems
https://autonomy.compnd.systems
https://fx.compnd.systems
https://fleet.compnd.systems
https://ip.compnd.systems
https://pulphub.compnd.systems
https://social.compnd.systems
```

Staging pattern:

```text
https://staging.akashic.compnd.systems
https://staging.music.compnd.systems
https://staging.credit.compnd.systems
```

Staging subdomains should require authentication or network restriction and should not appear in public hub navigation or public sitemaps.

## Codex Registry Source

The authoritative registered project list is:

```text
C:\Users\webbd\Projects\codex-projects.json
```

If local folders, Codex sidebar state, `.codex-global-state.json`, or `cap_sid` disagree with that registry, use the registry.

## Registered Project Inventory

Every registered Codex project should have a catalog entry in the hub plan. Public launch availability is separate from registry membership.

| Project Key | Registry Name | Public Name | Hub Route | Suggested Public Domain | Public Exposure |
| --- | --- | --- | --- | --- | --- |
| `akashic` | Akashic Research Engine | Akashic Research Engine | `/apps/akashic` | `https://akashic.compnd.systems` unless a formal domain exists | Public or beta application |
| `anniversary` | The Anniversary Album | DW Music Hub | `/apps/dw-music-hub` | `https://music.compnd.systems` unless a formal domain exists | Public, beta, or invite-only creative workspace |
| `credit` | CreditRegulatorPro Staging | CreditRegulatorPro Staging | No public route | `https://staging.credit.compnd.systems` only if protected | Internal staging only; do not list as public launch |
| `credit-prod` | CreditRegulatorPro Production | CreditRegulatorPro | `/apps/credit-regulator-pro` | `https://credit.compnd.systems` unless a formal domain exists | Public production application |
| `academy` | Academy | COMPND Academy | `/apps/academy` | `https://academy.compnd.systems` unless a formal domain exists | Planned public or gated learning product |
| `autonomy` | Autonomy Experiment | Autonomy Experiment | `/apps/autonomy` | `https://autonomy.compnd.systems` unless a formal domain exists | Lab, private, or coming soon |
| `compnd` | COMPND.SYSTEMS | COMPND.SYSTEMS Hub | `/` | `https://compnd.systems` | Public hub website |
| `fx` | Disciplined Autonomous FX Trading Platform | Disciplined Autonomous FX Trading Platform | `/apps/fx-trading-platform` | `https://fx.compnd.systems` unless a formal domain exists | Private or invite-only until compliance review is complete |
| `fleet` | Fleet Guru | Fleet Guru | `/apps/fleet-guru` | `https://fleet.compnd.systems` unless a formal domain exists | Public or beta aviation operations product |
| `ip-governance` | IP Governance | IP Governance | `/apps/ip-governance` | `https://ip.compnd.systems` unless a formal domain exists | Public or invite-only governance product |
| `pulphub` | PulpHub | PulpHub | `/apps/pulphub` | `https://pulphub.compnd.systems` unless a formal domain exists | Planned public or gated publishing product |
| `social-scraper` | Social Scraper | Social Scraper | `/apps/social-scraper` | `https://social.compnd.systems` unless a formal domain exists | Private, invite-only, or demo-only pending platform and compliance review |

## Repository And Deployment Inventory

| Project Key | GitHub Repo | Branch | Registry Deploy Target | Hub Treatment |
| --- | --- | --- | --- | --- |
| `akashic` | `dpwebb/Akashic-Research-Engine` | `main` | Production, push to `main` | Link to production launch URL |
| `anniversary` | `dpwebb/DWAnniversaryalbum` | `master` | Production, push to `master` | Brand as DW Music Hub and link to production launch URL |
| `credit` | `dpwebb/creditregulatorpro-staging` | `staging` | Staging, push to `staging` | Internal environment only; no public launch CTA |
| `credit-prod` | `dpwebb/creditregulatorpro-prod` | `main` | Production, push to `main` | Public CreditRegulatorPro launch target |
| `academy` | `dpwebb/Academy` | `main` | Not configured | Catalog as planned until production deployment exists |
| `autonomy` | `dpwebb/autonomy-experiment` | `main` | Not configured | Catalog as lab/private until production deployment exists |
| `compnd` | `dpwebb/COMPND.SYSTEMS` | `main` | Not configured | Source for this hub |
| `fx` | `dpwebb/disciplined-autonomous-fx-trading-platform` | `main` | Not configured | Catalog as private/invite-only pending compliance and production deployment |
| `fleet` | `dpwebb/fleet-guru` | `main` | Not configured | Catalog as planned/beta until production deployment exists |
| `ip-governance` | `dpwebb/ip-governance` | `main` | Not configured | Catalog as planned/beta until production deployment exists |
| `pulphub` | `dpwebb/PulpHub` | `main` | Not configured | Catalog as planned/beta until production deployment exists |
| `social-scraper` | `dpwebb/social-scraper` | `main` | Not configured | Catalog as private/demo-only pending platform compliance |

Additional folders under `C:\Users\webbd\Projects` should not automatically become public applications. Add them to the hub only after they have an owner, product name, deployment target, access model, and launch URL.

## Hub Information Architecture

### Primary Navigation

Recommended top-level navigation:

- System Main
- Applications
- Services
- Case Studies
- About
- Blog
- Contact

The existing `/software` page can either be renamed to `/apps` or kept as a redirect/alias for search continuity.

### Home Page

Add an application directory section near the top of the homepage:

- 3-6 featured application cards selected from the registered project catalog.
- Each card shows app name, audience, status, short value proposition, launch CTA, and detail CTA.
- Services remain available, but apps become the primary proof that COMPND builds and operates real software.

### Applications Index

Create `/apps` as the complete public directory:

- Filters: `All`, `Public`, `Beta`, `Private Access`, `Coming Soon`.
- Sorting: featured first, then public status, then alphabetically.
- Each card includes status, domain, access model, and CTA.

### Application Detail Pages

Each app gets a hub-owned detail page:

```text
/apps/akashic
/apps/dw-music-hub
/apps/credit-regulator-pro
/apps/academy
/apps/autonomy
/apps/fx-trading-platform
/apps/fleet-guru
/apps/ip-governance
/apps/pulphub
/apps/social-scraper
```

The `compnd` registry entry is the hub itself and should resolve to `/`, not to a normal application detail page. The `credit` staging entry should not have a public detail page unless it is an authenticated internal page.

Each detail page should include:

- Product name and one-sentence positioning.
- Who it is for.
- What it does.
- Current access model: public, beta, invite-only, private, or coming soon.
- Launch URL.
- Support/contact path.
- Screenshots or product imagery when available.
- Legal/privacy notes where relevant.

## App Catalog Data Model

Create a shared catalog file used by the home page, app index, app detail pages, sitemap generation, and the LCARS computer assistant.

Suggested file:

```text
helpers/appCatalog.ts
```

Suggested shape:

```ts
export type AppAccess = "public" | "beta" | "invite-only" | "private" | "coming-soon";
export type DomainMode = "formal-domain" | "compnd-subdomain" | "unassigned";
export type RegistryRole = "hub" | "production-app" | "staging-app" | "lab" | "planned";

export type HubApp = {
  slug: string;
  projectKey: string;
  registryName: string;
  name: string;
  shortDescription: string;
  audience: string;
  access: AppAccess;
  registryRole: RegistryRole;
  domainMode: DomainMode;
  primaryUrl?: string;
  fallbackSubdomain?: string;
  githubRepo?: string;
  defaultBranch?: string;
  publicRoute?: string;
  statusLabel: string;
  featured: boolean;
};
```

## Build Phases

### Phase 1: Hub Catalog Foundation

- Add `helpers/appCatalog.ts`.
- Seed the catalog from all 12 registered Codex projects.
- Replace the hardcoded software list with catalog-driven cards.
- Rename user-facing copy from `Software` to `Applications` where appropriate.
- Add launch/detail CTAs to each app card.
- Add `/apps` route or make `/software` the application directory with a future redirect plan.
- Mark staging, private, lab, and compliance-sensitive apps with non-launch CTAs such as `Request Access`, `View Details`, or `Coming Soon`.

### Phase 1 Progress

- Added `helpers/appCatalog.ts` as the shared hub catalog source for all 12 registered Codex projects.
- Converted `/software` from a hardcoded software list into a catalog-driven Applications directory.
- Added `/apps` as the preferred public route while keeping `/software` available for continuity.
- Renamed the main navigation item from Software to Applications.
- Added non-launch CTAs for staging, private, lab, planned, and compliance-sensitive projects.
- Kept CreditRegulatorPro staging in the catalog data but hidden from the public directory.

### Phase 2: Public App Pages

- Add one detail page per active app.
- Add app-specific metadata for SEO and sharing.
- Update `static/sitemap.xml` with public app detail routes.
- Keep staging or invite-only URLs out of the sitemap.

### Phase 2 Progress

- Added catalog-driven `/apps/:slug` detail pages for directory applications.
- Added app-specific titles, descriptions, access status, domain plans, repository metadata, support routes, and exposure notes.
- Marked private and invite-only detail pages `noindex,nofollow` when reachable from the directory.
- Updated public sitemap entries for indexable application detail routes only.
- Added featured application cards to the homepage using the shared catalog.
- Added catalog validation and generated sitemap scripts so route changes cannot drift from `helpers/appCatalog.ts`.

### Phase 3: DNS And Deployment Routing

- Audit each registered project for an existing production domain.
- For projects without domains, create the chosen `compnd.systems` subdomain DNS records.
- Point each subdomain to the correct production deployment target.
- Configure HTTPS certificates for every subdomain.
- Add protected staging subdomains only when needed.

### Phase 3 Preparation

- Added `docs/domain-readiness.md` as the DNS, HTTPS, launch, and support checklist for hub-linked projects.
- Kept every non-hub app `launchLive: false` until its final production domain is verified.
- Documented which app detail pages are public sitemap entries and which remain private/noindex.

### Phase 4: Status And Support

- Add a lightweight status section to each app card.
- Add support/contact routing per app.
- Consider a `/status` page that summarizes public app availability without exposing internal infrastructure.

### Phase 5: Shared Identity And Cross-App Experience

- Keep app auth independent at first.
- Later, evaluate shared identity under a dedicated auth domain if the apps need a unified account system.
- Do not centralize auth until the public routing and app catalog are stable.

## DNS Checklist

For each app without a formal domain:

- Choose final subdomain.
- Add DNS record for production.
- Configure production host or deployment platform.
- Enable HTTPS.
- Confirm canonical URL.
- Add app to hub catalog.
- Add app detail route to sitemap.
- Confirm launch CTA works from desktop and mobile.

For each app with a formal domain:

- Confirm production URL.
- Confirm HTTPS.
- Add external launch URL to hub catalog.
- Confirm whether the domain should appear in the sitemap as an external link only or whether only the hub detail page should be indexed.

## Security And Public Exposure Rules

- Do not publish secrets, `.env` files, `env.json`, private keys, deployment tokens, or Hostinger credentials.
- Do not create new deploy keys, GitHub tokens, Hostinger credentials, or secrets unless explicitly requested.
- Do not link public users to staging apps.
- Do not expose admin-only dashboards from the hub.
- Do not expose financial automation, social scraping, or compliance-sensitive workflows publicly until each has its own compliance and risk review.
- Use `rel="noopener noreferrer"` for external app launch links.
- Use `noindex` on private, staging, and invite-only pages when they are reachable at all.

## Recommended Next Implementation Step

Phase 1 foundation and the first Phase 2 pass are now implemented in code. Continue with Phase 2 hardening and Phase 3 preparation:

1. Replace placeholder capability copy with project-owned product copy and screenshots.
2. Add screenshots or product imagery for each app once available.
3. Confirm final access policy for invite-only and private app detail pages.
4. Audit DNS for the proposed `compnd.systems` subdomains before any launch CTA is marked live.
5. Add per-app readiness checks before setting any catalog `launchLive` flag to `true`.
6. Begin DNS/HTTPS verification against `docs/domain-readiness.md` when the deployment targets are available.
