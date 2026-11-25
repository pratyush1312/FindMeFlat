# Plotline background catalogue refresh

This private Site exposes the MCP tools refresh_rera_catalogue and get_rera_sync_status. Refresh the catalogue daily at 06:00 Asia/Kolkata, including when the user has closed the app. Never republish to update data.

Call refresh_rera_catalogue, then get_rera_sync_status to verify persisted results. Obtain tools via this Site's connected plugin. Alternatively, with supported private Site service access, POST /api/registry/refresh and read back GET /api/registry?meta. The /mcp path may require the Site plugin OAuth connection even with service access; use the HTTP maintenance endpoint for service calls. Use the Site access credential only at runtime; never include it in source, task text or logs. A service caller does not need a user identity for these shared public catalogue operations; do not access personal research in this task.

The updater tries the Karnataka RERA public project-list page, then the public search form if needed. It validates registration numbers and nontrivial record counts before merging. This connector is best-effort public-page parsing, not a documented official API. If the portal fails, the updater checks the openly licensed Vonter/karnataka-rera-projects dataset's upstream commit and downloads the ZIP only when changed. Neither path may replace data with an invalid/empty response. Preserve exact registration numbers, keep phases separate, and keep quotes / notes independent.

An attempt is rate limited to once per hour. Do not immediately retry an outage or defeat the cooldown. Preserve the last good catalogue and report errors in metadata. Distinguish lastAttempt, lastSuccess (a successful source check), officialSuccess (an official list parsed), and sourceUpdatedAt (the upstream open snapshot's publication date). A successful no-change check does not make old records current. On failure, report briefly, without claiming that registration is absent or current status is verified.

The browser polls personal research every 30 seconds while open; this is independent of catalogue refresh. Any property-level regulatory details may be older than a successful identity-list sync.

## 24 November — automatic project research
- Project-name search opens a research dossier before any personal enquiry form. No manual coordinates required; RERA pins first, conservative Photon project-name matching second.
- Added 65 safe filing fields across 8,923 source records, with dated snapshot provenance; direct RERA detail checks and newer open snapshot checks run independently.
- Added MapLibre/OpenFreeMap vector maps with Leaflet fallback, detailed/quiet/night views, clustered enquiry/access colours, source-labelled metro overlays and nearby infrastructure.
- Added 2,731 named facilities from OSM and a published indicative access scoring method. 2,026 initial project pins have assessments; unlocated or out-of-coverage projects remain unassessed. School, supermarket and park polygon coverage is incomplete and explicitly disclosed.
- Separated seller quotes from exact-phase-matched developer asking prices. News and developer pages are best effort, with individual source status, cache limits and original data timestamps.
- Added call questions, phase links, exact legal-promoter portfolio, source documents, and dossier download. No title/flood-clear finding or exhaustive internet-check claim.
- Validated TypeScript, production build, research identity/scoring tests, API source fallback and assets binding, and existing private inbox/storage/concurrency tests. Browser QA covers search, dossier and Leaflet map fallback; WebGL vector mode cannot run in this cloud browser.

## 24 November — existing ChatGPT-plan research and private memory
- Added a downloadable MIT-licensed local helper using the documented ChatGPT-plan OAuth flow. Hosted Site login remains separate. Protected local credentials, issued-client ID handling, PKCE/state/nonce and JWKS checks, granted-scope enforcement, model discovery, serialised refresh and logout revocation.
- Same-dashboard Web research tab supports cited multi-source reports, automatic research on opening a project after pairing, manual refresh/cancel, source dates, saved reports and token usage. Public facts only enter prompts; personal quotes, budget, notes and phone numbers are omitted.
- No API key or paid-API fallback. User must review and confirm extra-credit settings locally; the helper cannot read those settings. Actual plan eligibility and first live inference are pending user sign-in on the laptop.
- Added 24-hour per-account/model/input report caching, browser public-source TTL cache, read deduplication, one-job concurrency, 12-run daily cap, compact prompts and bounded streaming. No unsupported token-cap/cache parameters or invented savings estimates.
- Added private, durable Research memory: opened projects, completed searches, existing saved enquiries/quotes/notes/rejection reasons and report versions. Older report versions are retained; owner isolation and optimistic concurrency apply. Latest 200 opened projects / 50 archive entries are shown; older data is retained.
- Added a focused maintenance module map and bounded context script to reduce future context rereads. The helper source ZIP includes lockfile, platform launchers and fixture tests, with no OAuth credentials or dependencies bundled.


## 25 November — simple web research, no installation
- Replaced the helper connection/model/pairing flow with automatic in-app web results from Mwmbl's documented anonymous v2 API. No ChatGPT-plan connection, API key, download or local process is required. No model calls or token usage in this path.
- Opening a registered project starts one search; Prices, Complaints & delays and Locality run focused queries on demand. Public-source results are cached 24 hours, failures 10 minutes. Manual checks respect a 15-minute successful-source / one-minute failed-source cooldown. Source failures retain previous results and their original fetch dates.
- Results show URLs, snippets, website category, exact-phase uncertainty, and separate publication/fetch timestamps. Broker-like project domains are not labeled as developers. Limited-index or empty results are not clearance. External broad-search links remain optional fallbacks.
- Matching result snapshots save automatically to private memory and preserve prior report versions; existing notes, quotes, files and catalogue remain unchanged. Legacy reports are still readable.
- Added atomic D1 request reservations (1.2-second spacing; 900/month safety ceiling) within the anonymous provider allowance, with no account rotation, challenge bypass or paid fallback. Shared hosting IP limits may be reached earlier. API-only integration, no Mwmbl source copied; search data attribution/CC BY-NC-SA 4.0 included.


## 25 November — broad search and automatic source fallback
- Reproduced the v1 quality failure in production: no Assetz Mizu & Ki matches; unrelated profile pages for Godrej Woodscapes; identical marketing results in the complaints view.
- Replaced the small Mwmbl index with Firecrawl's documented keyless REST search and Parallel's documented anonymous MCP search as backup. Tested both against Assetz Mizu & Ki before implementation; both found the developer page and property sources. No installation, account, key, payment or model call is required.
- Added goal-specific query variants, real topic filters, short-name preservation (Mizu & Ki), promoter-based disambiguation for single-word registrations (HIGHGROVE), profile spam exclusion, source prioritisation, per-domain result limits and useful source excerpts. Generic marketing pages appear separately when they do not answer the selected topic.
- Starts on Web research for immediate visibility. Browser cache uses a new engine parameter so v1 errors/results cannot mask the update. Successful public searches reuse results up to six hours; manual retry cooldown is 30 seconds. Empty/failed checks back off for one minute and preserve last good results/fetch dates.
- Separate conservative provider request reservations cap this private app at 40 jobs/day/source; upstream limits also apply. Rate-limited providers get a five-minute cooldown. Backup means another independently offered free service, never rotating identities or enabling billing.
- Existing catalogue, owner privacy, personal notes, quotes, memory and archived reports are retained. Provider-estimated publication dates are labeled separately from fetch/check times.
