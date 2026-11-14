/**
 * The studio's privacy policy for cavies.studio, as published at /privacy.
 * A dated copy of each published version is kept in the repository's
 * docs/legal/ folder (docs/legal/privacy-policy-2026-11-14.md for this one; the 10 November copy stays as published).
 * When the text changes, change both, bump the version and the date, and add
 * a new dated copy rather than editing the old one.
 *
 * Format: blocks separated by a blank line. "## " starts a section, a block of
 * lines that each start with "- " is a list, anything else is a paragraph.
 * "**words**" is bold. Web and email addresses become links on the page.
 */
export const studioPrivacyVersion = "Version 2. Effective 14 November 2026.";

export const studioPrivacyText = `## The short version

- This site collects only what you choose to send us, such as an enquiry, and the request data that any website host sees. It has no analytics, ads or tracking.
- Your enquiry goes to our email at Google Workspace. Cloudflare hosts the site, runs the form's server code and the spam check, and keeps the form-limit codes. We do not sell your information.
- To see, correct or delete what we hold about you, email contact@cavies.studio.

## Who we are

Cavies Studio is the trading name of Tin Tran, in Australia. In this policy "we" and "us" mean Tin Tran, trading as Cavies Studio.

You can reach us at contact@cavies.studio.

This policy covers this website (cavies.studio), enquiries and emails you send us, and the studio's own tools described below. Our games have their own privacy policies.

## What we collect

- **Enquiries.** When you send the form on our contact page, we receive your name, your email address, the service you picked, your website if you give one, and your message.
- **Emails and messages.** If you email us or message us on Telegram, we receive your address or username and what you write.
- **Request data.** When you visit, our host receives the standard information any website gets, such as your IP address, your browser and the page you asked for. It uses this to deliver pages and block attacks.
- **Spam check.** The contact form uses Cloudflare Turnstile to tell people from bots. Cloudflare collects signals from your browser and device for this check, as its Turnstile privacy notice explains: https://www.cloudflare.com/turnstile-privacy-policy/
- **Form limit.** To stop the form being flooded, we keep a one-way code made from your IP address (for IPv6, from its network part), with the time of each enquiry, in Cloudflare's storage. We do not keep the IP address itself.

We do not use analytics, advertising, tracking pixels or social media plugins. Our own code sets no cookies and stores nothing in your browser. Our fonts, images and videos are served from our own site. There are no accounts on this site and nothing to buy on it.

## How we use it

- To answer your enquiry and talk with you about your project.
- To keep the site and the form working and safe from abuse.
- To meet our legal duties.

We do not use your information for advertising, and we do not sell it.

## Who handles it

These providers handle information for us:

- **Cloudflare** hosts this site, runs the contact form's server code (Cloudflare Workers), keeps the form-limit codes and runs the spam check (Turnstile). Its privacy policy: https://www.cloudflare.com/privacypolicy/
- **Google** runs our email (Google Workspace). The form's server code hands each enquiry to Google's Gmail service, which delivers it to our mailbox. Its privacy policy: https://policies.google.com/privacy

We may also share information if the law requires it.

## Moving data between countries

We are based in Australia. Cloudflare and Google are based in the United States and may store or process data there and in other countries. Before sending personal information overseas, we take reasonable steps to make sure the recipient looks after it properly.

## How long we keep it

- **Enquiries and emails** stay in our mailbox while we need them for the conversation, any work that follows and our records. We delete them when you ask, unless the law says we must keep them.
- **Form-limit codes** stop counting after a day, and are deleted the next time an enquiry passes the spam check.
- **Request data** is kept by Cloudflare for a limited time under its own terms.
- **Spam check data** is handled by Cloudflare under its Turnstile privacy notice.

## If we email you first

We sometimes email businesses about our services. We use work email addresses that businesses publish, for example on their own website. We keep a record of who we wrote to, when, and any reply, in our email and in a private file on our own computer. Every email says how to opt out. If you ask us to stop, we stop, and we keep your address only so that we do not write again.

## Our tools that use YouTube API Services

Cavies Studio uses an internal tool called "Cavies posting". It uses YouTube API Services to upload the studio's own videos to the studio's own YouTube channels. It has no public users: only the studio's own staff use it.

- **Terms.** By using Cavies posting, its users agree to be bound by the YouTube Terms of Service: https://www.youtube.com/t/terms. Google's Privacy Policy explains how Google handles data: https://policies.google.com/privacy
- **What it accesses.** It asks Google for one permission: to upload videos to the YouTube channel that approved it (the youtube.upload permission). It reads no YouTube data about anyone. It does not see viewers, comments, subscribers or analytics.
- **What it stores.** It stores that channel's authorisation token, encrypted, on the studio's own computer.
- **What it shares.** Nothing. The token is shared with nobody.
- **Cookies.** It uses no cookies or similar technology.
- **How to revoke access.** A channel owner can remove Cavies posting's access at any time in Google's security settings: https://myaccount.google.com/permissions. You can also email contact@cavies.studio and we will delete the stored token.

## Our games

Each of our games has its own privacy policy, which explains what that game does:

- Oddly Orderly: https://cavies.studio/games/oddly-orderly/privacy
- All Brain No Luck: https://allbrainnoluck.com/privacy/

## Links to other sites

This site links to LinkedIn, X and Telegram, and to projects we have worked on. Those sites have their own privacy policies.

## Security

The site uses HTTPS. The secret keys the form uses stay on our server and never reach your browser. Enquiry text is not stored in a site database or in our logs. No system is perfect. If a data breach is likely to cause serious harm, we will tell the people affected and the regulator as the law requires.

## Your rights

You can ask what we hold about you, and ask us to correct it, delete it or send you a copy. Email contact@cavies.studio. We check that the request is from you before we act. We aim to reply within 30 days. There is no charge.

If you are unhappy with our answer, you can complain to the Office of the Australian Information Commissioner (https://www.oaic.gov.au), or to the privacy regulator where you live.

## Changes to this policy

We will update this policy when what we do changes. The version and date at the top show which one you are reading. If a change affects what we collect or how we use it, we will publish the new version here before the change takes effect.

## Contact

For any question about this policy or your privacy, email contact@cavies.studio.`;

export type PolicyBlock =
  { kind: "paragraph"; text: string } | { kind: "list"; items: string[] };

export type StudioPolicySection = {
  id: string;
  heading: string;
  blocks: PolicyBlock[];
};

/** Ids every page already has (the footer is #contact) get their own anchor. */
const taken: Record<string, string> = { contact: "privacy-contact" };
const anchor = (heading: string) => {
  const slug = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return taken[slug] ?? slug;
};

/** Splits the policy into sections of paragraphs and lists. */
export function parseStudioPrivacy(text: string): StudioPolicySection[] {
  const sections: StudioPolicySection[] = [];
  for (const block of text.trim().split(/\n\s*\n/)) {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      const heading = trimmed.slice(3).trim();
      sections.push({ id: anchor(heading), heading, blocks: [] });
      continue;
    }
    const current = sections.at(-1);
    if (!current) throw new Error("The policy must start with a heading.");
    const lines = trimmed.split("\n").map((line) => line.trim());
    if (lines.every((line) => line.startsWith("- "))) {
      current.blocks.push({
        kind: "list",
        items: lines.map((line) => line.slice(2)),
      });
    } else {
      current.blocks.push({ kind: "paragraph", text: lines.join(" ") });
    }
  }
  return sections;
}

export const studioPrivacySections = parseStudioPrivacy(studioPrivacyText);
