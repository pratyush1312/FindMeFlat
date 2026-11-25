# Plotline research foundations

The site uses public data with explicit provenance. Software being open source does not establish that an arbitrary data API is free, complete, reliable or licensed for reuse.

| Component | Used for | Upstream / licence | Limits |
|---|---|---|---|
| MapLibre GL JS | Vector maps, clusters, styling, map tilt | https://maplibre.org/ — BSD-3-Clause | Requires WebGL; Leaflet fallback provided |
| OpenFreeMap | MapLibre basemaps | https://openfreemap.org/ — open-source infrastructure, OSM-derived data | No API key; no uptime SLA |
| Leaflet | Accessible raster-map fallback with locally styled quiet/night views | https://leafletjs.com/ — BSD-2-Clause | OSM public tile usage policy applies; no offline bulk downloads |
| OpenStreetMap | Nearby facilities, metro geometry and source pins | https://www.openstreetmap.org/copyright — ODbL 1.0 | Incomplete community coverage; dated extracts, not live operational verification |
| Photon | On-demand fallback project geocoding | https://github.com/komoot/photon — Apache-2.0 | Demo permits reasonable use; cached, no autocomplete, no availability guarantee |
| Karnataka RERA open collection | Rich filing fallback | https://github.com/Vonter/karnataka-rera-projects — ODbL 1.0 | Snapshot dates shown. Official source content may carry separate copyright. No documented official free developer API verified |
| Namma Metro export | Station coordinates and route geometry | https://github.com/Vonter/bmrcl-gtfs — ODbL 1.0 | Unofficial feed, approximate schedules; only coordinates used, not train timings |
| PDF.js | Read PDF brochure text on the device | https://github.com/mozilla/pdf.js — Apache-2.0 | Scanned PDFs may need OCR; extraction is not verification |
| Tesseract.js | Read screenshots and brochure images on the device | https://github.com/naptha/tesseract.js — Apache-2.0 | OCR errors possible; original uploads preserved |
| GDELT DOC API | Recent exact-name news discovery | https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/ | Free public service, independent failures displayed; no articles does not establish a clean record |

## Implemented research flow

Search uses the existing shared RERA catalogue and official lookup. Selecting an exact phase opens its dossier without requiring an enquiry, location or price form. The dossier loads a bounded safe-field RERA snapshot, then checks official details, developer sitemap/page, geocoder and recent news independently. Successful source results are cached with a separate data fetch time. Failed checks retain prior source data; an attempt timestamp never pretends the underlying data was updated.

Location access is a published heuristic from proximity to mapped metro, hospitals, schools, supermarkets and parks. It is not a safety, demographic, title, environmental or investment rating. Geo coverage boundaries, source ages, missing data and straight-line distance are visible. Proposed/construction metro features are excluded when tagged; unknown new openings can be missing. No live traffic, routing, pollution or official parcel hazard assessment is connected.

The daily existing catalogue maintenance path also checks for changes to the rich open RERA snapshot. Live detail checks are independent of the snapshot. Developer prices are withheld if the exact RERA registration cannot be matched. Seller quotations remain private and separate.

## Deliberate boundaries

No fabricated “all internet checked” claim. General-purpose web search / paid LLM extraction is not connected. News, developer pages and official portal may be unavailable. The app provides targeted external search links as shortcuts and labels them as checks not performed. No personal promoter PAN, bank account details, signatory photos or personal contact history is extracted into public research.

No WhatsApp automation via unofficial phone-session scraping. The simplified mobile inbox still works; a real Meta WhatsApp agent remains a new, separate account/number/public-webhook setup.

## Useful later additions

A licensed general web-search API plus model extraction with exact source citations; a reliable RERA feed if the portal is unstable; self-hosted Photon for sustained usage; authoritative georeferenced flood/drain/lake buffer layers with parcel boundaries; OSRM/Valhalla or an authorised routing provider for actual road routes. These are not presented as working services in the current app.
