/**
 * Oddly Orderly's privacy policy, word for word as it ships inside the game
 * (assets/legal/privacy_policy.txt in the game's repository). When the game's
 * copy changes, paste the whole new text here: the page is built from it.
 */
export const privacyPolicyText = `ODDLY ORDERLY PRIVACY POLICY

Effective date: October 23, 2026

Oddly Orderly is designed to be a quiet, offline puzzle game.

WHAT THE APP STORES

The game stores the rosettes found on each page, the last page played, which small shiny things the magpie has taken, and settings locally on this device. This information is used only to continue the game and restore the player's preferences.

OPTIONAL PLAYTEST NOTES

Playtest notes are off unless the player turns them on in Settings (or opens a playtest link that turns them on). While they are on, the game keeps, on this device only, a note of each page visited: how long it was open; how many moves, undos, start-overs and hints there were, and how often the magpie came and was petted; which rosettes were found and when; how the page was left; and which kinds of input (mouse, touch, keyboard, gamepad) were used, together with the game's build number, the platform's name and the time each session started. The notes contain no name, account, device identifier or location. They are never transmitted. The player may save a copy to share with the person running the playtest, and may delete the notes at any time in Settings.

WHAT THE APP DOES NOT COLLECT

The current build does not create accounts, collect personal information, use advertising, analytics, or tracking, build player profiles, access contacts, photos, the camera, or the microphone, or transmit gameplay data to a server operated by the publisher.

DEVICE AND PLATFORM SERVICES

The app uses ordinary operating-system functions to save local files, play audio, and provide optional haptic feedback. When the game is played in a web browser, its files are delivered by a hosting provider (currently Cloudflare), which may process standard request information such as IP addresses under its own terms; the game itself sends no gameplay data. Stores and platforms (for example Steam, Apple, Google or console makers) may separately process downloads, purchases, crash reports, or device backups under their own terms and privacy policies. The app itself does not transmit these records to a server operated by the publisher.

STEAM

When the game runs on Steam, it tells Steam which achievements the player has earned and how many rosettes have been found, and Steam Cloud keeps a copy of the save file (the rosettes, the last page, the treasures and the settings) so that it can follow the player to another computer. Valve processes this under its own terms and privacy policy, and Steam Cloud can be turned off for the game in Steam. Playtest notes are never synced. The game works the same without Steam.

CHILDREN

Because the app does not collect personal information, it does not knowingly collect personal information from children.

DELETING LOCAL DATA

Settings offers Clear all rosettes and, for playtest notes, Delete notes. Deleting the app (or, in a browser, the site's stored data) removes all of its local data from the device. Copies retained in a device backup are controlled through the device owner's backup settings.

CHANGES TO THIS POLICY

The publisher will update this policy, and its effective date, before the game adds accounts, analytics, advertising, purchases that report data to the publisher, or any other data collection.

CONTACT

Oddly Orderly is published by Cavies Studio. For questions about this policy or your privacy, or for help with the game, email contact@cavies.studio. This policy is published at https://cavies.studio/games/oddly-orderly/privacy, and support for the game is at https://cavies.studio/games/oddly-orderly/support.`;

export type PolicySection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

const isHeading = (block: string) => /^[A-Z][A-Z' ]+$/.test(block);
/** Ids every page already has (the footer is #contact) get their own anchor. */
const taken: Record<string, string> = { contact: "privacy-contact" };
const anchor = (heading: string) => {
  const slug = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return taken[slug] ?? slug;
};

/**
 * Splits the policy into its title, its effective-date line, the opening
 * paragraphs and its sections. Headings are the policy's own capitalised
 * lines; each section's anchor comes from its heading, so it stays stable.
 */
export function parsePrivacyPolicy(text: string) {
  const [title, effectiveDate, ...blocks] = text
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.trim());
  const intro: string[] = [];
  const sections: PolicySection[] = [];
  for (const block of blocks) {
    if (isHeading(block)) {
      sections.push({ id: anchor(block), heading: block, paragraphs: [] });
    } else if (sections.length > 0) {
      sections[sections.length - 1].paragraphs.push(block);
    } else {
      intro.push(block);
    }
  }
  return { title, effectiveDate, intro, sections };
}

export const privacyPolicy = parsePrivacyPolicy(privacyPolicyText);
