import { contactHref } from "./contact";
import { enquiryServices } from "./enquiry";

/**
 * A project scope is three visitor decisions: what they need help with, where
 * the project stands, and when they want to start. The homepage composes them
 * into one sentence; the contact page receives the same choices in the URL and
 * carries them into the enquiry.
 */
export type HelpId = "website" | "product" | "audit" | "unsure";
export type StageId = "new" | "existing";
export type TimingId = "soon" | "months" | "open";

export type ScopeOption<Id extends string> = { id: Id; label: string };

export const scopeHelpOptions: ScopeOption<HelpId>[] = [
  { id: "website", label: "Business website" },
  { id: "product", label: "Product interface" },
  { id: "audit", label: "Security audit" },
  { id: "unsure", label: "Not sure yet" },
];

export const scopeStageOptions: ScopeOption<StageId>[] = [
  { id: "new", label: "Starting fresh" },
  { id: "existing", label: "Improving what exists" },
];

export const scopeTimingOptions: ScopeOption<TimingId>[] = [
  { id: "soon", label: "As soon as possible" },
  { id: "months", label: "In the next few months" },
  { id: "open", label: "No fixed date yet" },
];

export type ProjectScope = { help: HelpId; stage: StageId; timing: TimingId };
export type ScopeSelection = Partial<ProjectScope>;

export const defaultScope: ProjectScope = {
  help: "website",
  stage: "new",
  timing: "soon",
};

const phrases: Record<HelpId, Record<StageId, string>> = {
  website: {
    new: "a new business website",
    existing: "improvements to our website",
  },
  product: {
    new: "a new product interface",
    existing: "work on our existing interface",
  },
  audit: {
    new: "a security audit before launch",
    existing: "a security audit of what’s live",
  },
  unsure: {
    new: "advice on a new build",
    existing: "advice on what we have",
  },
};

const clauses: Record<TimingId, string> = {
  soon: "starting as soon as possible",
  months: "starting in the next few months",
  open: "with no fixed date yet",
};

type EnquiryService = (typeof enquiryServices)[number];

const services: Record<HelpId, EnquiryService> = {
  website: "Business website & support",
  product: "Product UI & frontend",
  audit: "Security audit",
  unsure: "Not sure yet",
};

export const scopePhrase = (scope: ProjectScope) =>
  phrases[scope.help][scope.stage];
export const scopeClause = (scope: ProjectScope) => clauses[scope.timing];
export const scopeSentence = (scope: ProjectScope) =>
  `We need ${scopePhrase(scope)}, ${scopeClause(scope)}.`;
export const scopeService = (help: HelpId): EnquiryService => services[help];

export function isCompleteScope(
  selection: ScopeSelection | null,
): selection is ProjectScope {
  return Boolean(selection?.help && selection.stage && selection.timing);
}

/** Contact page link carrying any of the three decisions in the query string. */
export function scopeContactHref(selection: ScopeSelection): string {
  const params = new URLSearchParams();
  if (selection.help) params.set("help", selection.help);
  if (selection.stage) params.set("stage", selection.stage);
  if (selection.timing) params.set("timing", selection.timing);
  const query = params.toString();
  return query ? `${contactHref}?${query}` : contactHref;
}

const pick = <Id extends string>(
  options: ScopeOption<Id>[],
  value: string | null,
): Id | undefined => options.find((option) => option.id === value)?.id;

/** Reads a scope from a query string. Unknown values are ignored. */
export function parseScope(search: string): ScopeSelection | null {
  const params = new URLSearchParams(search);
  const selection: ScopeSelection = {};
  const help = pick(scopeHelpOptions, params.get("help"));
  const stage = pick(scopeStageOptions, params.get("stage"));
  const timing = pick(scopeTimingOptions, params.get("timing"));
  if (help) selection.help = help;
  if (stage) selection.stage = stage;
  if (timing) selection.timing = timing;
  return Object.keys(selection).length > 0 ? selection : null;
}
