export const contactEmail = "contact@cavies.xyz";
export const inquiryHref = (subject: string) =>
  `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`;
export const emailHref = inquiryHref("Let's build something with Cavies");
export const telegramHref = "https://t.me/tincavies";
