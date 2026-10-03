// One-time owner authorization. Tokens are stored outside the repository.
import { createServer } from "node:http";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";

const clientFile = process.argv[2];
if (!clientFile) {
  console.error(
    "Usage: node scripts/authorize-gmail.mjs <Google OAuth client JSON>",
  );
  process.exit(1);
}
const expectedAccount = "tin@cavies.xyz";
const redirectUri = "http://127.0.0.1:8787/oauth/callback";
const localOrigin = "http://127.0.0.1:8787";
const secretDirectory = path.join(
  process.env.LOCALAPPDATA || path.join(homedir(), ".local", "share"),
  "CaviesStudio",
  "gmail-setup",
);
const client = JSON.parse(await readFile(clientFile, "utf8")).web;
if (
  !client?.client_id ||
  !client.client_secret ||
  !client.redirect_uris?.includes(redirectUri)
) {
  throw new Error(
    "Use a web OAuth client with the documented loopback redirect URI.",
  );
}
const state = randomBytes(32).toString("base64url");
const verifier = randomBytes(48).toString("base64url");
const challenge = createHash("sha256").update(verifier).digest("base64url");
const sendScope = "https://www.googleapis.com/auth/gmail.send";
const allowedScopes = new Set([
  sendScope,
  "openid",
  "email",
  "https://www.googleapis.com/auth/userinfo.email",
]);
const authorizeUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authorizeUrl.search = new URLSearchParams({
  client_id: client.client_id,
  redirect_uri: redirectUri,
  response_type: "code",
  scope: `openid email ${sendScope}`,
  access_type: "offline",
  prompt: "consent",
  login_hint: expectedAccount,
  include_granted_scopes: "false",
  state,
  code_challenge: challenge,
  code_challenge_method: "S256",
}).toString();
let used = false;
let outcome = "Authorization has not completed.";

function sameState(candidate) {
  const supplied = Buffer.from(candidate || "");
  const expected = Buffer.from(state);
  return (
    supplied.length === expected.length && timingSafeEqual(supplied, expected)
  );
}

async function jsonRequest(url, options) {
  const response = await fetch(url, {
    ...options,
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
  });
  const json = await response.json();
  if (!response.ok) throw new Error("Google authorization request failed.");
  return json;
}

async function authorize(code) {
  const token = await jsonRequest("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({
      code,
      client_id: client.client_id,
      client_secret: client.client_secret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code_verifier: verifier,
    }),
  });
  const scopes = String(token.scope || "")
    .split(/\s+/)
    .filter(Boolean);
  if (
    !token.access_token ||
    !token.refresh_token ||
    !scopes.includes(sendScope) ||
    scopes.some((scope) => !allowedScopes.has(scope))
  ) {
    throw new Error(
      "Google did not return the required limited offline grant.",
    );
  }
  const identity = await jsonRequest(
    "https://openidconnect.googleapis.com/v1/userinfo",
    {
      headers: { Authorization: `Bearer ${token.access_token}` },
    },
  );
  if (identity.email !== expectedAccount || identity.email_verified !== true) {
    await fetch("https://oauth2.googleapis.com/revoke", {
      method: "POST",
      body: new URLSearchParams({ token: token.refresh_token }),
      signal: AbortSignal.timeout(10_000),
    }).catch(() => {});
    throw new Error("The authorized account did not match tin@cavies.xyz.");
  }
  await mkdir(secretDirectory, { recursive: true, mode: 0o700 });
  await writeFile(
    path.join(secretDirectory, "gmail.json"),
    JSON.stringify({
      GOOGLE_CLIENT_ID: client.client_id,
      GOOGLE_CLIENT_SECRET: client.client_secret,
      GMAIL_REFRESH_TOKEN: token.refresh_token,
      account: expectedAccount,
      scopes,
    }),
    { mode: 0o600 },
  );
}

const server = createServer(async (request, response) => {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Referrer-Policy", "no-referrer");
  response.setHeader(
    "Content-Security-Policy",
    "default-src 'none'; style-src 'unsafe-inline'",
  );
  if (request.headers.host !== "127.0.0.1:8787" || request.method !== "GET") {
    response.writeHead(400).end();
    return;
  }
  const url = new URL(request.url, localOrigin);
  if (url.pathname === "/" && !used) {
    response.writeHead(302, { Location: authorizeUrl.href }).end();
  } else if (
    url.pathname === "/oauth/callback" &&
    !used &&
    sameState(url.searchParams.get("state"))
  ) {
    used = true;
    try {
      const code = url.searchParams.get("code");
      if (!code || code.length > 4096 || url.searchParams.has("error"))
        throw new Error("Authorization was not granted.");
      await authorize(code);
      outcome =
        "Gmail authorization is complete. You can return to the Cavies chat. No email has been sent.";
      console.log(
        "Authorized tin@cavies.xyz with Gmail send-only access. Credentials saved privately outside the repository.",
      );
    } catch {
      outcome =
        "Authorization could not be completed. Return to the Cavies chat; no credentials were displayed and no email was sent.";
      console.error(
        "Gmail authorization failed. Check the account, grant, and client configuration.",
      );
      process.exitCode = 1;
    }
    response.writeHead(303, { Location: "/done" }).end();
  } else if (url.pathname === "/done") {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(
      `<!doctype html><html lang="en"><meta name="viewport" content="width=device-width"><title>Cavies Gmail setup</title><style>body{font:18px system-ui;max-width:640px;margin:80px auto;padding:24px;line-height:1.6}</style><h1>Cavies Gmail setup</h1><p>${outcome}</p></html>`,
    );
    setTimeout(() => server.close(), 1000);
  } else {
    response.writeHead(400).end("Invalid or expired authorization request.");
  }
});
server.listen(8787, "127.0.0.1", () =>
  console.log(
    `Owner authorization ready at ${localOrigin}/ (expires in 15 minutes).`,
  ),
);
const expiry = setTimeout(() => server.close(), 15 * 60_000);
expiry.unref();
