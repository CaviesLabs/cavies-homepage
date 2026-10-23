export const contactEmail = "tin@cavies.studio";
/** Support, privacy and press address for our games, on their own pages. */
export const gameContactEmail = "contact@cavies.studio";
export const contactHref = "/contact";
export const businessWebsitesHref = "/services/business-websites";
export const inquiryHref = (subject: string) =>
  `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`;
export const gameContactHref = (subject: string) =>
  `mailto:${gameContactEmail}?subject=${encodeURIComponent(subject)}`;
export const emailHref = inquiryHref("Let's build something with Cavies");
export const telegramHref = "https://t.me/tincavies";
