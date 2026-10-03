# Project enquiry delivery

The owner selected Vercel and the existing `tin@cavies.xyz` Gmail account. Notifications use its `contact@cavies.xyz` sender alias and go to the primary address to avoid Gmail's self-to-alias inbox behavior. Visitors supply `Reply-To`; they cannot choose a notification recipient or sender. No automatic visitor replies are sent.

## Required configuration

Set these in the intended Vercel environment, keeping preview separate from production:

| Variable                         | Purpose                                                       |
| -------------------------------- | ------------------------------------------------------------- |
| `ENQUIRY_DELIVERY_ENABLED`       | Exactly `true` enables delivery after setup and verification. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public widget key; restrict hostnames to the actual site.     |
| `TURNSTILE_SECRET_KEY`           | Server-only Turnstile verification secret.                    |
| `GOOGLE_CLIENT_ID`               | Dedicated Google web OAuth client.                            |
| `GOOGLE_CLIENT_SECRET`           | Server-only OAuth client secret.                              |
| `GMAIL_REFRESH_TOKEN`            | Offline Gmail send permission for `tin@cavies.xyz`.           |
| `BLOB_READ_WRITE_TOKEN`          | Token for the dedicated private Vercel Blob store.            |
| `RATE_LIMIT_SALT`                | Random secret of at least 32 characters for HMAC identifiers. |

Vercel Blob OIDC credentials (`BLOB_STORE_ID` plus `VERCEL_OIDC_TOKEN`) are also supported. Never reuse a public Blob store for the rate ledger. Configuration is evaluated during page generation, so redeploy after changing readiness settings. A server-side check independently requires the same configuration for every request.

## Google authorization

1. Use the dedicated Google Cloud project `cavies-studio-enquiries` and enable Gmail API. No billing upgrade is needed for ordinary Gmail API usage.
2. Configure the consent screen and a Web application OAuth client. Prefer an Internal audience when available for the owner's organization. An External app left in Testing has short-lived refresh grants and is unsuitable for unattended production delivery.
3. Register only this setup redirect URI: `http://127.0.0.1:8787/oauth/callback`. The helper binds to loopback and expires after 15 minutes.
4. Save the client JSON outside the repository. Run `node scripts/authorize-gmail.mjs <path-to-client-json>` and open the printed local URL. The owner grants consent.
5. The helper requests `gmail.send` plus basic account email identity, verifies the account is `tin@cavies.xyz`, and writes credentials under the user's local application-data directory at `CaviesStudio/gmail-setup/gmail.json`. It does not print tokens or send a message.
6. Transfer credentials into Vercel sensitive environment variables using stdin or the dashboard. Do not paste secrets into chat, command arguments, or source files. Keep the local credential files private; remove them once no longer needed.

The backend refuses refreshed grants containing broader Gmail access. It does not read, list, or delete mailbox messages. Google access can be revoked, expire, or be invalidated by account/security changes; a failed refresh produces a generic unavailable response and preserves the visitor's manual-email option.

## Abuse controls and delivery behavior

- JSON POST requests from the exact canonical origin only. A preview can allow its own `VERCEL_URL`; no wildcard preview origins. Local origins are supported only outside production.
- Streamed request bodies are limited to 8 KiB and a short deadline. Shared field validation, strict Reply-To mailbox syntax, a honeypot, and field-length limits precede provider calls.
- Cloudflare verification must return success, the correct hostname, and action `enquiry`. Dummy test secrets are rejected in production.
- The private Blob ledger enforces **100 reservations per rolling 24 hours globally** and **5 per client per rolling hour**. It uses uncached reads and atomic create/ETag conditional writes across instances. Missing configuration, storage failures, or corrupt state fail closed.
- Only HMAC identifiers and timestamps are stored. Expired entries are removed on the next successful reservation; inactivity can leave old hashes in the single private ledger. No brief, email, or raw IP is stored there.
- Failed and uncertain sends retain their reservation. Gmail sends are not automatically retried, because Gmail has no send-idempotency guarantee. An intentional later retry or manual follow-up can produce a duplicate.
- Successful responses require Gmail's message ID. Timeouts never produce a success message. Provider errors and credentials are not returned or logged.
- An additional Vercel project firewall rule limits `POST /api/enquiry` to 10 requests per IP per 10 minutes. This is a regional burst control; the Blob ledger supplies the global cap.

Normal Vercel Function, Blob, and WAF usage applies against the existing plan. There is no additional email-provider subscription. The application does not store enquiries for recovery; Gmail and the visitor's retained form text are the delivery/manual-fallback paths.

## Verification and release

Run `npm run lint`, `npm run typecheck`, `npm run test:enquiry`, and `npm run build`, then the HTTP smoke suite against the built server. Tests cover validation, injection, deadlines, origin and CAPTCHA failures, limited grants, provider failures, and concurrent rate-limit reservations. Use official Turnstile dummy keys only in local tests; use placeholder Gmail credentials and intercept local endpoint responses for UI tests so no real messages are sent.

Before production activation, verify private Blob atomic creation and same-ETag write conflicts, complete the owner OAuth grant, and send one clearly labeled synthetic enquiry. Confirm the message appears in the `tin@cavies.xyz` inbox, that Reply-To is the submitted test address, and that no client bundle contains secrets. Check mobile layout, server-error focus, pending/double-click protection, failure fallback, success, clear, and navigation.

To stop sending, set `ENQUIRY_DELIVERY_ENABLED=false` and redeploy. For urgent credential revocation, revoke the Google grant or remove the refresh token; the endpoint fails closed immediately, while a redeploy restores the draft-only UI. Preserve the private ledger during redeploys and avoid resetting it during an abuse incident.
