# FindMeFlat

**Plotline — a private Bengaluru property research desk.** Search a project, inspect its RERA registration and map, collect web evidence, and remember enquiries, seller quotes and decisions across devices.

[Open the private app](https://bengaluru-property-desk.pratyushpandey.chatgpt.site)

## What is included

- Karnataka RERA catalogue search with separate registrations for project phases, official-source attempts, an open-data fallback and last-good catalogue retention.
- Automatic property research: RERA disclosures, developer information, location evidence and public web sources.
- Broad web discovery through Firecrawl's documented keyless search, with Parallel's anonymous MCP search as an automatic backup. No installation, API key or ChatGPT-plan helper is required for the app's web research.
- Topic searches for prices, complaints/delays and locality. Results prioritise identifiable sources, exclude profile spam and distinguish project marketing from complaint evidence.
- MapLibre / OpenFreeMap maps with a Leaflet fallback, clustered project pins, metro overlays and an explainable score for access to mapped facilities.
- Private research memory, saved source snapshots and report versions; enquiry tracking, notes, quote history, budget comparisons and rejection reasons.
- Phone-friendly quick inbox for pasted WhatsApp messages and original attachments, with PDF text extraction and local English screenshot OCR. A direct WhatsApp bot is not provisioned.
- D1-backed account isolation and edit-conflict protection; R2-backed files and shared public-source caches.

## Stack and layout

React / TypeScript / Vinext on Cloudflare Workers, with D1 and R2. The live deployment uses the Sites identity/access gateway.

| Path | Purpose |
| --- | --- |
| `app/desk.tsx` | Property search, tracking, budget and navigation |
| `app/project-research.tsx` | Project dossier, source checks, location and filings |
| `app/web-research.tsx` | Web evidence and automatic private snapshots |
| `lib/public-search-providers.ts` | Bounded Firecrawl REST / Parallel MCP transports |
| `lib/web-search.ts` | Provider fallback, request limits and cache retention |
| `lib/web-search-model.ts` | Queries, identity matching and source/topic filters |
| `app/research-memory.tsx` | Project history and archived research |
| `app/simple-inbox.tsx` | Phone/laptop message and attachment capture |
| `db/schema.ts`, `drizzle/` | Persistent schema and migrations |
| `public/data/` | Licensed public catalogue, filing and facility snapshots |
| `tests/` | Parsing, source, privacy, storage and fallback checks |

## Development

Use Node.js 22.13 or later. Install the locked dependencies with `npm ci`, then use `npm run dev`. `npm run build` builds the Worker application. D1/R2 bindings and database migrations must be configured for the chosen development/deployment environment; the SQL migrations are in `drizzle/`.

The maintenance instructions in `AGENTS.md` describe the Sites workflow and focused checks. The repository contains the application source and public assets, not the live database, private notes, seller quotes, uploaded files, OAuth credentials or runtime caches. Running the app outside Sites requires a trusted authentication/access gateway; do not accept client-supplied identity headers as authentication on a public deployment.

## Checks

```sh
npx tsc --noEmit
node --experimental-strip-types tests/core.mts
node --experimental-strip-types tests/research.mts
node --experimental-strip-types tests/web-search.mts
npm run build
node tests/api.mjs
```

The API tests use an isolated database/bucket and controlled upstream responses. Live provider checks are separate; tests do not prove that external services are continuously available.

## Provenance and limits

The packaged RERA open-data snapshot has its own publication date; later refresh attempts do not change that date. See `public/data/NOTICE.txt` and `public/data/LICENSE.txt` for catalogue attribution and ODbL terms. OpenStreetMap, OpenFreeMap and bundled third-party assets retain their respective notices.

Official portal access, developer claims, search excerpts, seller quotes and estimated publication dates are distinct evidence. A RERA registration is not independent title clearance; missing complaint results are not a clean-record finding. Location scores describe mapped facility access, not flood safety, legal status or investment returns. Published asking prices need confirmation for the exact phase, unit and charges.

Anonymous search providers have free request limits and can fail. Plotline applies conservative limits of 40 search jobs per day per provider, successful-result caching for up to six hours, short retry cooldowns and last-good-result retention. It never silently enables paid billing. The existing scheduled RERA refresh can run while the app is closed; the source code alone does not recreate the owner's hosted schedule.

`companion/` and its downloadable source bundle are a legacy optional implementation retained in this snapshot. They are not used by the current app's research flow. See `UPDATES.md` for implementation notes.

Application source snapshot: Plotline version 11, source commit `a77c443b13db8123c5629d2e54ea125800d03e7b`.
