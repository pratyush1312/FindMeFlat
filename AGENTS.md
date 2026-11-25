# Plotline maintenance guide

## Read narrowly to conserve context and tokens
- Start with this file and `git status --short`; use `rg` for the affected symbol.
- Read the relevant module, not the whole repository. Never print catalogue JSON, OCR models, lockfiles, bundled output or entire minified CSS into agent context.
- Public data files are large licensed source snapshots, not hand-authored fixtures. Preserve their source dates and notices.
- Keep progress updates short. Do not repeat successful checks unless affected code changes.
- Summarise changes and pending verification in `UPDATES.md`; preserve the existing Site identity and private access.

## Module map
- `app/desk.tsx`: navigation, enquiry tracking, seller quotes, personal budget.
- `app/project-research.tsx`: RERA dossier and source tabs.
- `app/web-research.tsx`, `lib/web-search.ts`, `web-search-model.ts`: no-install broad web search via documented Firecrawl keyless API and anonymous Parallel MCP backup, source labels, bounded caching and automatic private snapshots.
- `companion/`: legacy optional helper source, no longer part of the app UI or research flow. Do not reintroduce installation or pairing requirements.
- `lib/public-search-providers.ts`: bounded JSON/SSE transport, exact documented anonymous endpoints, session negotiation; only search tool calls. No model inference.
- `lib/research.ts`, `research-model.ts`, `research-snapshot.ts`: source fetches, provenance, indicative facility scoring and safe filing fields.
- `lib/registry.ts`, `registry-parser.ts`: background/on-demand RERA catalogue.
- `app/api/research/reports/`: authenticated owner-scoped reports; cloud storage must never receive OpenAI tokens.
- `app/research-memory.tsx`, `app/api/memory/`: owner-scoped project/search history and saved report archive. Never place private history in the public source cache.
- `app/simple-inbox.tsx`, `app/api/captures/`: phone captures without required fields.
- `app/property-map.tsx`, `leaflet-fallback.tsx`: vector map and fallback.
- `db/schema.ts`, `drizzle/`: D1 tables/migrations. `tests/api.mjs` applies every migration in an isolated database.
- `app/globals.css`: existing brand and component styles; inspect targeted selectors.

## Checks
- `npx tsc --noEmit`
- `node --experimental-strip-types tests/core.mts`
- `node --experimental-strip-types tests/research.mts`
- `node --experimental-strip-types tests/web-search.mts`
- Legacy helper only if changed: `npm test --prefix companion`
- Build with the installed Sites `build-site.mjs` helper, then `node tests/api.mjs`.
- Package and publish through Sites source workflow. Reuse `.openai/hosting.json` project_id.

## Invariants
- Exact RERA phase matching; source/attempt timestamps differ; absence is not clearance.
- Access ratings describe mapped facilities, never title, flood safety, crime or investment outcomes.
- Normal search results are snippets, not verified facts or AI reports. Firecrawl and Parallel anonymous access only. D1 reserves at 1.2-second spacing and caps each source at 40 search jobs/day; upstream free limits may be lower. The existing web_search_limits.month key holds provider:date for v2, preserving legacy rows. Primary failure/no topical matches invokes backup; profile pages are excluded. Do not treat promotional pages as complaint evidence. No keys or paid fallback. Public results use R2/browser cache; private snapshots use owner-scoped report tables and retain history.
- Legacy AI research is successful only with a completed response and actual web citations. Keep partial/failed output distinct and preserve previous reports.
- User-authorised ChatGPT plan OAuth is separate from the Site's existing login. Never repurpose the Site client, scrape ChatGPT cookies, use backend-api endpoints, log tokens or silently switch to paid API billing.
- Local helper: bind loopback only, exact Origin allowlist, pairing, PKCE/state/nonce, verified ID tokens, serialised token refresh, protected atomic credential files. No arbitrary model/API URL proxy.
