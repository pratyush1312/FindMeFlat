# ChatGPT-plan property research

## Status

Implemented a local open-source helper and integration with the existing private Site. No OpenAI API key, paid-API fallback, copied ChatGPT browser cookies, backend-api endpoint or re-use of the hosted Site's identity client. OAuth credentials remain on the laptop; the cloud receives public-input research and completed cited reports only.

This is ready for the user to download, start and authorise. Account eligibility and the first real web-search inference are not established by local tests. They cannot be honestly marked active until the user's actual laptop completes the separate plan-usage OAuth flow and receives `response.completed` with web citations.

The documented open-source route is for locally hosted apps. A fully remotely hosted partner integration requires separate OpenAI approval. We have not applied for or claimed that approval. The local helper is mandatory for this delivery; if it is stopped, saved reports still work but new AI research cannot run.

## Official basis (checked 24 November 2026)

- https://developers.openai.com/siwc/token-sharing-open-source
- https://developers.openai.com/siwc/token-sharing-open-source/sign-in
- https://developers.openai.com/siwc/token-sharing-open-source/models-and-inference
- https://developers.openai.com/siwc/token-sharing-open-source/preview-limitations
- https://developers.openai.com/siwc/token-sharing-open-source/profiles-and-sessions
- https://help.openai.com/en/articles/20001542-using-your-chatgpt-plan-in-other-apps-and-sites

Use `dynamic_agent_client` for initial registration, the returned issued client ID for exchange/returning sign-ins, a persistent host identifier, loopback callback, PKCE/state/nonce and JWKS validation. Request and verify `chatgpt.tokens.use.direct`. Model choices come from the signed-in account's catalogue. Responses requests use `store:false` and `stream:true`; unsupported fields such as max_output_tokens and previous_response_id are not sent. The hosted web-search tool remains subject to model/account policy.

## No-extra-charge constraint

There is no paid-API path. However, ChatGPT plan requests may consume extra credits if the user's ChatGPT settings permit it. The helper cannot inspect or change those settings. Research therefore requires a local user confirmation that they reviewed Usage and disabled paid extra-credit use. This is disclosed as user-confirmed, not programmatically verified. No purchase, recharge setting change or subscription upgrade is performed.

## Token and maintenance optimization

- Browsers cache only public source responses with small TTLs and bounded cache size; concurrent reads are deduplicated. Private quotes, documents and AI reports never enter that shared cache.
- Completed AI reports persist privately in D1 and are reused for 24 hours. The local helper caches per account, model, prompt version and compact public-input hash.
- Only selected public filing facts go to the model. Seller quotes, personal budgets, contact information, notes and original uploads are omitted.
- One job at a time, 12 new reports per UTC day, one-minute project recheck cooldown, 180-second execution timeout, bounded stream/report size, and concise requested output. These reduce usage; they cannot guarantee a provider token count because the plan route does not accept max_output_tokens.
- Token counts and provider cached-input counts are shown only if returned by the provider. No invented savings percentage or cost estimate.
- Stable instructions precede variable facts; no unsupported prompt-cache controls are sent. Reusing a saved report is a true avoided inference; browser caching alone only reduces network/source work.
- `AGENTS.md` and `node scripts/maintenance-context.mjs` provide a bounded module map and change list. Do not dump large source datasets or lockfiles into model context for routine maintenance.

## Verification limits

Fixture tests cover cryptographic identity validation, OAuth transaction binding, issued-client ID handling, disabled plan permission, refresh rotation/serialization, protected atomic local storage, public-fact minimization, terminal stream completion, citations, cache reuse, policy failures, origin/host restrictions, pairing and cross-origin account-management denial. D1 API tests cover authentication, owner isolation, optimistic concurrency, idempotence and invalid-report rejection.

Cloud browser QA can inspect the Site's setup flow, report layout and download. It cannot prove cross-device local-network permission, the user's Node installation, OAuth admission, available models or actual plan billing settings. User completion is required for those checks.
