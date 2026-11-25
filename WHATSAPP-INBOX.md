# Plotline WhatsApp inbox: activation design

The user wants to forward seller messages, brochures and screenshots to one WhatsApp contact, with enquiries appearing automatically on their laptop. This is a new account setup; no Meta or Twilio account or sender has been connected, and no WhatsApp number has been provisioned.

## Product behaviour

Keep the assistant specific to property capture. Preserve original messages and files. Match exact RERA registrations and phases when possible, retain quote source and date, append messages to an existing enquiry, and keep unknown fields blank. For ambiguous messages, save them to the private inbox and ask one question about the project. A reply should be brief, for example: “Saved to Prestige Park Grove. I captured the quoted price and attached the brochure. The all-in cost is still unconfirmed.” Never claim every detail was extracted or that a selling price came from RERA.

## Recommended production route

Meta WhatsApp Business Platform with a dedicated bot sender / business connection. The user's personal WhatsApp remains the sending account. Meta's setup includes a Meta developer account, app with the WhatsApp use case, business portfolio / messaging account, phone-number configuration and access token. The user must complete account sign-in, phone verification and applicable terms. No external account, paid service or sender was created in this change.

A separate publicly reachable receiver is needed for Meta's signed webhooks. The existing Plotline site is owner-private, and Meta cannot authenticate through its interactive sign-in page. Preserve that access policy. The receiver must validate verification challenges and X-Hub-Signature-256, accept only linked user phone numbers, deduplicate message IDs, durably enqueue before acknowledgement, download media through the provider's authenticated media API, and use a supported authenticated connection to the owner's private inbox. Do not expose the private site or invent a public unauthenticated ingestion endpoint.

The new /api/captures route is browser/user authenticated, not a public WhatsApp receiver. It preserves original text and files without requiring a project. Linking moves the attachments into the chosen saved project; repeated capture requests use a stable ID. This supplies the capture behaviour for a later properly authenticated gateway.

Cloud extraction requires a server-side OCR / model provider connection. The browser's current PDF and image extraction cannot process unattended WhatsApp webhooks. ChatGPT sign-in on the site does not configure hosted model access. Choose and authorize that connection during activation; keep all provider credentials in runtime secrets, never source or frontend forms.

## Why not leave a test sandbox running?

Twilio's sandbox is for testing, uses a shared number and requires rejoining after its session expires. That repeats setup work for a user who wants a simple permanent contact. It can validate a prototype, but should not be presented as the finished WhatsApp inbox.

## Official references

- https://developers.facebook.com/documentation/business-messaging/whatsapp/get-started/
- https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/create-webhook-endpoint/
- https://www.twilio.com/docs/whatsapp/sandbox
