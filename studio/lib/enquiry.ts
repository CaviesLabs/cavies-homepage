export const enquiryServices = [
  "Business website & support",
  "Product UI & frontend",
  "Security audit",
  "Not sure yet",
] as const;

export const enquiryLimits = {
  name: 80,
  email: 254,
  website: 250,
  brief: 800,
} as const;

// Mail-app limits vary. Longer drafts remain available to copy in full.
export const maxMailtoLength = 1800;

export type EnquiryFields = {
  name: string;
  email: string;
  service: string;
  website: string;
  brief: string;
};
export type EnquiryErrors = Partial<Record<keyof EnquiryFields, string>>;
export type EnquiryDraft = {
  subject: string;
  body: string;
  copyText: string;
  mailtoHref: string | null;
};
export type EnquiryResult =
  { ok: false; errors: EnquiryErrors } | { ok: true; draft: EnquiryDraft };

const singleLineControls = /[\u0000-\u001f\u007f]/;
const briefControls = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export function prepareEnquiry(
  input: EnquiryFields,
  recipient: string,
): EnquiryResult {
  const fields = {
    name: input.name.trim(),
    email: input.email.trim(),
    service: input.service,
    website: input.website.trim(),
    brief: input.brief.trim(),
  };
  const errors: EnquiryErrors = {};

  if (!fields.name) {
    errors.name = "Enter your name.";
  } else if (
    input.name.length > enquiryLimits.name ||
    singleLineControls.test(input.name)
  ) {
    errors.name = `Use one line with ${enquiryLimits.name} characters or fewer.`;
  }
  if (
    !emailPattern.test(fields.email) ||
    input.email.length > enquiryLimits.email ||
    singleLineControls.test(input.email)
  ) {
    errors.email = "Enter a valid email address, such as you@example.com.";
  }
  if (!enquiryServices.some((service) => service === fields.service)) {
    errors.service = "Choose a service, or select Not sure yet.";
  }
  if (input.website.length > enquiryLimits.website) {
    errors.website = `Use a URL with ${enquiryLimits.website} characters or fewer.`;
  } else if (fields.website) {
    try {
      const url = new URL(fields.website);
      if (
        !["https:", "http:"].includes(url.protocol) ||
        !url.hostname ||
        url.username ||
        url.password ||
        /\s/.test(fields.website) ||
        singleLineControls.test(input.website)
      ) {
        errors.website =
          "Use a public http:// or https:// URL without login details.";
      }
    } catch {
      errors.website = "Enter a complete URL, such as https://example.com.";
    }
  }
  if (fields.brief.length < 20) {
    errors.brief =
      "Add at least 20 characters about what you would like to build or improve.";
  } else if (
    input.brief.length > enquiryLimits.brief ||
    briefControls.test(input.brief)
  ) {
    errors.brief = `Use ${enquiryLimits.brief} characters or fewer, without special control characters.`;
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const subject = `Project enquiry: ${fields.service}`;
  const body = [
    "Hi Cavies,",
    "",
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Service: ${fields.service}`,
    ...(fields.website ? [`Website: ${fields.website}`] : []),
    "",
    "Project brief:",
    fields.brief,
  ].join("\n");

  let mailtoHref: string | null = null;
  try {
    const href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (href.length <= maxMailtoLength) mailtoHref = href;
  } catch {
    // Unpaired Unicode from a paste must not prevent the manual-copy path.
  }

  return {
    ok: true,
    draft: {
      subject,
      body,
      copyText: `To: ${recipient}\nSubject: ${subject}\n\n${body}`,
      mailtoHref,
    },
  };
}

// The caller provides the browser API only after a user chooses Copy draft.
export async function copyEnquiryText(
  text: string,
  writeText?: (text: string) => Promise<void>,
): Promise<"copied" | "manual"> {
  if (!writeText) return "manual";
  try {
    await writeText(text);
    return "copied";
  } catch {
    return "manual";
  }
}
