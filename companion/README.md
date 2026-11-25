# Plotline Research Companion

Use the official ChatGPT-plan OAuth flow to run cited property web research from your private Plotline dashboard. No OpenAI API key is needed. Account eligibility, available models and web-search permission are decided by OpenAI at sign-in and request time. This package is implemented and fixture-tested; your own account connection and first live inference still need to be completed on your laptop.

## Start

1. Install Node.js LTS 22.13 or newer from https://nodejs.org/ if needed.
2. Unzip the whole folder. On Mac open `Start-Plotline.command`; on Windows open `Start-Plotline.bat`. Linux: run `sh start.sh`. Alternatively run `npm ci --omit=dev --ignore-scripts` and `npm start` in this folder.
3. The local helper opens at http://127.0.0.1:48765. Choose **Continue with ChatGPT**, sign in with the account holding your existing plan, and approve eligible plan usage.
4. Review https://chatgpt.com/settings/usage and keep paid extra-credit use and automatic purchases off if you want no additional charges. Confirm this check in the helper. The helper cannot inspect or change those settings.
5. Click **Open Plotline**. Sign in to Plotline as usual, search a project and open its Web research tab. Automatic browser pairing is attempted. If needed, copy the local connection code into that tab. Allow the browser's local-device connection if prompted.

Keep the helper and its terminal running while researching. Pairing expires after 10 minutes; **Renew pairing** extends it. Browser pairing is for that browser tab/session and the current helper process. Reconnect after restarting the helper. OAuth registration and renewable session persist on your laptop, so repeated full sign-in should not normally be needed.

Mac may ask permission to open a downloaded launcher. Do not bypass a security warning automatically; inspect the MIT-licensed source or run the documented npm commands yourself. No OS startup item or background service is installed. Quit with Ctrl+C in the helper terminal.

## What is sent and saved

- ChatGPT OAuth access/refresh/ID tokens stay in owner-only local files under `~/.config/plotline-research/`; they are never sent to Plotline, placed in browser storage or printed to logs.
- The cloud dashboard receives only a separate process-limited pairing capability. It is bound to the exact Plotline Origin and held in sessionStorage.
- Public project name, exact RERA phase and a small selection of public filing facts go to OpenAI. Personal quotes, budget, phone numbers, notes and uploads are omitted from the research prompt.
- Completed cited reports can be saved to your private Plotline account. Local reports are cached separately for each ChatGPT registration and model.
- Signing out attempts remote refresh-session revocation and clears local tokens. If remote revocation cannot be confirmed, use ChatGPT Settings → Security and login to disconnect the session.

## Limits and costs

No paid-API path or API-key fallback exists. Included ChatGPT usage is limited; account settings may allow additional credits, so review them first. The helper stops on returned eligibility/usage errors and does not purchase credits or retry inference automatically.

One report at a time; 12 new reports per UTC day; 24-hour completed-report reuse; one-minute per-project recheck cooldown; 3-minute request timeout; compact input and bounded report size. These are local safeguards, not a guaranteed token cap or controls over your ChatGPT account's billing. Provider prompt caching may or may not apply; measured cached-token counts are displayed when supplied.

Public web evidence does not prove clear title, absence of complaints, flood safety or investment suitability. Dates, source links, conflicting claims and missing checks must be reviewed before committing money.

## Technical references

- https://developers.openai.com/siwc/token-sharing-open-source
- https://developers.openai.com/siwc/token-sharing-open-source/sign-in
- https://developers.openai.com/siwc/token-sharing-open-source/models-and-inference
- https://developers.openai.com/siwc/token-sharing-open-source/preview-limitations
- https://developers.openai.com/siwc/token-sharing-open-source/profiles-and-sessions

This is a local open-source integration. It does not claim partner approval for hosted inference. The hosted Site's authentication client is preserved and is not reused for model access. Only the documented public Responses endpoint is used; no ChatGPT backend-api or browser-cookie scraping.

## Development

`npm ci --ignore-scripts` then `npm test`. Tests use generated fixture keys, fake tokens and mocked inference; no real subscription is consumed. Node's built-in test runner and the maintained `jose` package validate OAuth, scope, nonce, rotation, protected storage, completion/citation requirements, caching, policy failures, origin restrictions and pairing.

MIT licence. `jose` is distributed under its upstream MIT licence and installed from npm using the included integrity lockfile.
