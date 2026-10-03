"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { contactEmail, emailHref } from "@/lib/contact";
import {
  copyEnquiryText,
  enquiryLimits,
  enquiryServices,
  prepareEnquiry,
  type EnquiryDraft,
  type EnquiryErrors,
  type EnquiryFields,
} from "@/lib/enquiry";
import styles from "./enquiry-form.module.css";

const emptyFields: EnquiryFields = {
  name: "",
  email: "",
  service: "",
  website: "",
  brief: "",
};
const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
const fieldOrder: (keyof EnquiryFields)[] = [
  "name",
  "email",
  "service",
  "website",
  "brief",
];

export function EnquiryForm() {
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const [fields, setFields] = useState<EnquiryFields>(emptyFields);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [draft, setDraft] = useState<EnquiryDraft | null>(null);
  const [status, setStatus] = useState("");
  const [copying, setCopying] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const previewRef = useRef<HTMLTextAreaElement>(null);
  const revision = useRef(0);

  function updateField(field: keyof EnquiryFields, value: string) {
    revision.current += 1;
    setFields((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setDraft(null);
    setStatus("");
    setCopying(false);
  }

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    revision.current += 1;
    setStatus("");
    setCopying(false);
    const result = prepareEnquiry(fields, contactEmail);
    if (!result.ok) {
      setErrors(result.errors);
      setDraft(null);
      const firstInvalid = fieldOrder.find((field) => result.errors[field]);
      if (firstInvalid) {
        formRef.current
          ?.querySelector<HTMLElement>(`#enquiry-${firstInvalid}`)
          ?.focus();
      }
      return;
    }
    setErrors({});
    setDraft(result.draft);
    setStatus("Your draft is ready below. Nothing has been sent.");
  }

  function selectDraft() {
    previewRef.current?.focus();
    previewRef.current?.select();
  }

  async function copyDraft() {
    if (!draft || copying) return;
    const currentRevision = revision.current;
    setCopying(true);
    const outcome = await copyEnquiryText(
      draft.copyText,
      navigator.clipboard?.writeText
        ? (text) => navigator.clipboard.writeText(text)
        : undefined,
    );
    // An older clipboard request must not restore a cleared or edited draft's status.
    if (revision.current !== currentRevision) return;
    setCopying(false);
    if (outcome === "copied") {
      setStatus(
        "Draft copied. Nothing has been sent. Paste it into your email app or webmail and send it there.",
      );
    } else {
      selectDraft();
      setStatus(
        "Automatic copy isn’t available. The draft is selected below; use your device’s Copy command, then paste it into your email app or webmail. Nothing has been sent.",
      );
    }
  }

  function clearDraft() {
    revision.current += 1;
    setFields(emptyFields);
    setErrors({});
    setDraft(null);
    setCopying(false);
    setStatus("Form cleared on this page.");
    formRef.current?.querySelector<HTMLElement>("#enquiry-name")?.focus();
  }

  return (
    <section className={styles.composer} aria-labelledby="enquiry-title">
      <h2 id="enquiry-title">Prepare a project enquiry</h2>
      <div className={styles.notice} id="enquiry-privacy">
        <p>
          This form prepares a draft on your device. It does not send a message
          or submit your details to Cavies. You choose whether to open the draft
          in your email app or copy it to webmail, then send it there.
        </p>
        <p>
          We don’t save these fields on this site. Don’t include passwords,
          access keys, payment details or confidential information.
        </p>
      </div>
      <noscript>
        <p className={styles.notice}>
          The draft composer needs JavaScript. You can still email{" "}
          {contactEmail} or use the Telegram link on this page.
        </p>
      </noscript>
      <form
        ref={formRef}
        onSubmit={prepare}
        noValidate
        aria-describedby="enquiry-privacy"
      >
        {/* No names are assigned to controls, so a native fallback submission cannot put details in a URL. */}
        <fieldset disabled={!ready} className={styles.fields}>
          <legend className={styles.srOnly}>Project details</legend>
          <p className={styles.requiredNote}>
            All fields are required except the website URL.
          </p>
          {Object.values(errors).some(Boolean) ? (
            <p className={styles.errorSummary} role="alert">
              Check the highlighted fields to prepare your draft.
            </p>
          ) : null}
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="enquiry-name">Your name</label>
              <input
                id="enquiry-name"
                type="text"
                autoComplete="name"
                required
                maxLength={enquiryLimits.name}
                value={fields.name}
                onChange={(event) => updateField("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? "enquiry-name-error" : undefined
                }
              />
              {errors.name ? (
                <p id="enquiry-name-error" className={styles.error}>
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div className={styles.field}>
              <label htmlFor="enquiry-email">Your email</label>
              <input
                id="enquiry-email"
                type="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                required
                maxLength={enquiryLimits.email}
                value={fields.email}
                onChange={(event) => updateField("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "enquiry-email-error" : undefined
                }
              />
              {errors.email ? (
                <p id="enquiry-email-error" className={styles.error}>
                  {errors.email}
                </p>
              ) : null}
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="enquiry-service">What can we help with?</label>
            <select
              id="enquiry-service"
              required
              value={fields.service}
              onChange={(event) => updateField("service", event.target.value)}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={
                errors.service ? "enquiry-service-error" : undefined
              }
            >
              <option value="">Choose a service</option>
              {enquiryServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            {errors.service ? (
              <p id="enquiry-service-error" className={styles.error}>
                {errors.service}
              </p>
            ) : null}
          </div>
          <div className={styles.field}>
            <label htmlFor="enquiry-website">
              Public website URL <span>(optional)</span>
            </label>
            <input
              id="enquiry-website"
              type="url"
              inputMode="url"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              maxLength={enquiryLimits.website}
              placeholder="https://example.com"
              value={fields.website}
              onChange={(event) => updateField("website", event.target.value)}
              aria-invalid={Boolean(errors.website)}
              aria-describedby={`enquiry-website-hint${errors.website ? " enquiry-website-error" : ""}`}
            />
            <p id="enquiry-website-hint" className={styles.hint}>
              Use a public link without private access tokens.
            </p>
            {errors.website ? (
              <p id="enquiry-website-error" className={styles.error}>
                {errors.website}
              </p>
            ) : null}
          </div>
          <div className={styles.field}>
            <label htmlFor="enquiry-brief">A short project brief</label>
            <textarea
              id="enquiry-brief"
              rows={5}
              required
              minLength={20}
              maxLength={enquiryLimits.brief}
              value={fields.brief}
              onChange={(event) => updateField("brief", event.target.value)}
              aria-invalid={Boolean(errors.brief)}
              aria-describedby={`enquiry-brief-hint enquiry-brief-count${errors.brief ? " enquiry-brief-error" : ""}`}
            />
            <div className={styles.fieldHelp}>
              <p id="enquiry-brief-hint" className={styles.hint}>
                What do you want to build or improve? Add any useful timing.
              </p>
              <p id="enquiry-brief-count" className={styles.hint}>
                {fields.brief.length}/{enquiryLimits.brief}
              </p>
            </div>
            {errors.brief ? (
              <p id="enquiry-brief-error" className={styles.error}>
                {errors.brief}
              </p>
            ) : null}
          </div>
          <div className={styles.actions}>
            <button type="submit" className={`button ${styles.primaryButton}`}>
              Prepare draft
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={clearDraft}
            >
              Clear form
            </button>
          </div>
        </fieldset>
      </form>
      <p
        className={styles.status}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {status}
      </p>
      {draft ? (
        <section className={styles.preview} aria-labelledby="draft-title">
          <h3 id="draft-title">Review your draft</h3>
          <p>
            Review the text before sharing it. You’ll still need to send it from
            your email account.
          </p>
          <label htmlFor="enquiry-preview" className={styles.previewLabel}>
            Email draft (selectable text)
          </label>
          <textarea
            id="enquiry-preview"
            ref={previewRef}
            rows={13}
            readOnly
            value={draft.copyText}
          />
          <div className={styles.actions}>
            {draft.mailtoHref ? (
              <a
                className={`button ${styles.primaryButton}`}
                href={draft.mailtoHref}
                onClick={() =>
                  setStatus(
                    "Your device will try to open its email app. Nothing has been sent by this site. If no draft opens, copy the text below to webmail.",
                  )
                }
              >
                Open email draft
              </a>
            ) : null}
            <button
              type="button"
              className={styles.secondaryButton}
              disabled={copying}
              onClick={copyDraft}
            >
              {copying ? "Copying…" : "Copy draft"}
            </button>
            <button
              type="button"
              className={styles.selectButton}
              onClick={selectDraft}
            >
              Select text
            </button>
          </div>
          {!draft.mailtoHref ? (
            <p className={styles.hint}>
              This draft can’t be safely opened through an email-app link. Copy
              or select the complete text above and paste it into webmail or
              your email app.
            </p>
          ) : (
            <p className={styles.hint}>
              No email app opening? Copy or select the draft and paste it into
              webmail.
            </p>
          )}
          <p className={styles.hint}>
            Send to <a href={emailHref}>{contactEmail}</a>. Copying or opening a
            draft does not send it.
          </p>
        </section>
      ) : null}
    </section>
  );
}
