"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
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
import {
  EnquiryTurnstile,
  type EnquiryTurnstileHandle,
} from "./enquiry-turnstile";

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

export function EnquiryForm({
  deliveryEnabled = false,
  turnstileSiteKey,
}: {
  deliveryEnabled?: boolean;
  turnstileSiteKey?: string;
}) {
  const directDelivery = deliveryEnabled && Boolean(turnstileSiteKey);
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const [fields, setFields] = useState<EnquiryFields>(emptyFields);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [draft, setDraft] = useState<EnquiryDraft | null>(null);
  const [status, setStatus] = useState("");
  const [copying, setCopying] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [statusIsError, setStatusIsError] = useState(false);
  const [company, setCompany] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const previewRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const turnstileRef = useRef<EnquiryTurnstileHandle>(null);
  const pending = useRef(false);
  const requestRef = useRef<AbortController | null>(null);
  const revision = useRef(0);
  const serverErrorFocus = useRef<{
    field: keyof EnquiryFields;
    revision: number;
  } | null>(null);
  const onTokenChange = useCallback(
    (token: string) => setTurnstileToken(token),
    [],
  );

  useEffect(
    () => () => {
      revision.current += 1;
      requestRef.current?.abort();
    },
    [],
  );

  useEffect(() => {
    const target = serverErrorFocus.current;
    if (sending || !target) return;
    serverErrorFocus.current = null;
    // Server validation finishes while the fieldset is disabled. Focus only
    // after React enables it, and never steal focus from a subsequent edit.
    if (revision.current === target.revision && errors[target.field]) {
      formRef.current
        ?.querySelector<HTMLElement>(`#enquiry-${target.field}`)
        ?.focus();
    }
  }, [sending, errors]);

  function announce(message: string, isError = false) {
    setStatus(message);
    setStatusIsError(isError);
    statusRef.current?.focus();
  }

  function focusFirstError(nextErrors: EnquiryErrors) {
    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`#enquiry-${firstInvalid}`)
        ?.focus();
    }
  }

  function updateField(field: keyof EnquiryFields, value: string) {
    if (pending.current) return;
    revision.current += 1;
    setFields((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setDraft(null);
    setStatus("");
    setCopying(false);
    setSent(false);
    setStatusIsError(false);
  }

  function prepareDraft() {
    if (pending.current) return null;
    revision.current += 1;
    setStatus("");
    setCopying(false);
    setStatusIsError(false);
    const result = prepareEnquiry(fields, contactEmail);
    if (!result.ok) {
      setErrors(result.errors);
      setDraft(null);
      focusFirstError(result.errors);
      return null;
    }
    setErrors({});
    setDraft(result.draft);
    return result.draft;
  }

  function prepareManualDraft() {
    if (!prepareDraft()) return;
    announce(
      directDelivery
        ? "Your email draft is ready below. You can open or copy it to your email app."
        : "Your draft is ready below. Nothing has been sent.",
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || sent) return;
    if (!directDelivery) {
      prepareManualDraft();
      return;
    }
    const preparedDraft = prepareDraft();
    if (!preparedDraft) return;
    if (!turnstileToken) {
      announce("Complete the spam check, or use the email draft below.", true);
      return;
    }

    const currentRevision = revision.current;
    const controller = new AbortController();
    requestRef.current = controller;
    pending.current = true;
    setSending(true);
    setDraft(null);
    setStatus("Sending your enquiry…");
    const timeout = window.setTimeout(() => controller.abort(), 30_000);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ ...fields, company, turnstileToken }),
        signal: controller.signal,
      });
      const result: unknown = await response.json();
      if (revision.current !== currentRevision) return;
      if (
        response.ok &&
        typeof result === "object" &&
        result !== null &&
        "ok" in result &&
        result.ok === true
      ) {
        setSent(true);
        announce(
          "Your enquiry has been sent. We’ll reply to the email address you provided.",
        );
        return;
      }

      setDraft(preparedDraft);
      let message =
        "We couldn’t send your enquiry. Your draft is saved on this page so you can email us instead.";
      if (typeof result === "object" && result !== null) {
        if ("message" in result && typeof result.message === "string") {
          message = result.message.slice(0, 400);
        }
        if (
          "errors" in result &&
          typeof result.errors === "object" &&
          result.errors !== null
        ) {
          const nextErrors: EnquiryErrors = {};
          for (const field of fieldOrder) {
            const value = (result.errors as Record<string, unknown>)[field];
            if (typeof value === "string")
              nextErrors[field] = value.slice(0, 200);
          }
          setErrors(nextErrors);
          announce(message, true);
          const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
          if (firstInvalid) {
            serverErrorFocus.current = {
              field: firstInvalid,
              revision: currentRevision,
            };
          }
          return;
        }
      }
      announce(message, true);
    } catch {
      if (revision.current !== currentRevision) return;
      setDraft(preparedDraft);
      announce(
        "We couldn’t confirm delivery. Your draft is kept below. If you need to follow up, please email us directly.",
        true,
      );
    } finally {
      window.clearTimeout(timeout);
      if (revision.current === currentRevision) {
        pending.current = false;
        requestRef.current = null;
        setSending(false);
        turnstileRef.current?.reset();
      }
    }
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
        directDelivery
          ? "Draft copied. Paste it into your email app or webmail if you need to follow up."
          : "Draft copied. Nothing has been sent. Paste it into your email app or webmail and send it there.",
      );
    } else {
      selectDraft();
      setStatus(
        "Automatic copy isn’t available. The draft is selected below; use your device’s Copy command, then paste it into your email app or webmail.",
      );
    }
  }

  function clearDraft() {
    if (pending.current) return;
    revision.current += 1;
    setFields(emptyFields);
    setErrors({});
    setDraft(null);
    setCopying(false);
    setCompany("");
    setSent(false);
    setStatusIsError(false);
    turnstileRef.current?.reset();
    setStatus("Form cleared on this page.");
    formRef.current?.querySelector<HTMLElement>("#enquiry-name")?.focus();
  }

  return (
    <section className={styles.composer} aria-labelledby="enquiry-title">
      <h2 id="enquiry-title">
        {directDelivery
          ? "Send a project enquiry"
          : "Prepare a project enquiry"}
      </h2>
      {!directDelivery && (
        <div className={styles.notice} id="enquiry-privacy">
          <p>
            This form prepares a draft on your device. It does not send a
            message or submit your details to Cavies. You choose whether to open
            the draft in your email app or copy it to webmail, then send it
            there.
          </p>
        </div>
      )}
      <noscript>
        <p className={styles.notice}>
          This form needs JavaScript. You can still email{" "}
          <a href={emailHref}>{contactEmail}</a> or use the Telegram link on
          this page.
        </p>
      </noscript>
      <form
        ref={formRef}
        onSubmit={submit}
        noValidate
        aria-busy={sending}
        aria-describedby={directDelivery ? undefined : "enquiry-privacy"}
      >
        {/* No names are assigned to controls, so a native fallback submission cannot put details in a URL. */}
        <fieldset disabled={!ready || sending} className={styles.fields}>
          <legend className={styles.srOnly}>Project details</legend>
          <p className={styles.requiredNote}>
            All fields are required except the website URL.
          </p>
          {Object.values(errors).some(Boolean) ? (
            <p className={styles.errorSummary} role="alert">
              Check the highlighted fields.
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
          {directDelivery ? (
            <>
              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="enquiry-company">Leave this field empty</label>
                <input
                  id="enquiry-company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                />
              </div>
              <EnquiryTurnstile
                ref={turnstileRef}
                siteKey={turnstileSiteKey!}
                onTokenChange={onTokenChange}
              />
            </>
          ) : null}
          <div className={styles.actions}>
            <button
              type="submit"
              disabled={sent || sending}
              className={`button ${styles.primaryButton}`}
            >
              {sending
                ? "Sending…"
                : sent
                  ? "Enquiry sent"
                  : directDelivery
                    ? "Send enquiry"
                    : "Prepare draft"}
            </button>
            {directDelivery && !sent ? (
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={prepareManualDraft}
              >
                Use email instead
              </button>
            ) : null}
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
        ref={statusRef}
        tabIndex={-1}
        className={`${styles.status} ${statusIsError ? styles.statusError : ""}`}
        role="status"
        aria-live={statusIsError ? "assertive" : "polite"}
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
                    "Your device will try to open its email app. Opening a draft does not send it. If no draft opens, copy the text below to webmail.",
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
