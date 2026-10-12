"use client";

import { contactEmail } from "@/lib/contact";
import type { EnquiryFields } from "@/lib/enquiry";
import {
  scopeClause,
  scopePhrase,
  scopeSentence,
  type ProjectScope,
} from "@/lib/project-scope";
import styles from "./enquiry-ticket.module.css";

/**
 * A printed summary of the enquiry that was just sent. It feeds out from
 * under the status slot, so the visitor's decisions end as one object they
 * can read back.
 */
export function EnquiryTicket({
  fields,
  scope,
  sentOn,
  onReset,
  resetClassName,
}: {
  fields: EnquiryFields;
  scope: ProjectScope | null;
  sentOn: string;
  onReset: () => void;
  resetClassName?: string;
}) {
  const brief = fields.brief.trim();
  const sentence = scope ? scopeSentence(scope) : "";
  const briefText =
    sentence && brief.startsWith(sentence)
      ? brief.slice(sentence.length).trim()
      : brief;
  const website = fields.website.trim();

  return (
    <div className={styles.printer}>
      <p className={styles.slot}>
        <span className={styles.dot} aria-hidden="true" />
        Enquiry sent
      </p>
      <div className={styles.feed}>
        <article className={styles.ticket} aria-label="Summary of your enquiry">
          <div className={styles.head}>
            <span>Project enquiry</span>
            <span>{sentOn}</span>
          </div>
          <h3>{fields.service}</h3>
          {scope ? (
            <p className={styles.sentence}>
              We need <span className="scope-chip">{scopePhrase(scope)}</span>,{" "}
              <span className="scope-chip">{scopeClause(scope)}</span>.
            </p>
          ) : null}
          <div className={styles.tear} aria-hidden="true" />
          <dl className={styles.details}>
            <div>
              <dt>Name</dt>
              <dd>{fields.name.trim()}</dd>
            </div>
            <div>
              <dt>Reply to</dt>
              <dd>{fields.email.trim()}</dd>
            </div>
            {website ? (
              <div>
                <dt>Website</dt>
                <dd>{website}</dd>
              </div>
            ) : null}
          </dl>
          {briefText ? (
            <div className={styles.brief}>
              <span className={styles.label}>Brief</span>
              <p>{briefText}</p>
            </div>
          ) : null}
          <p className={styles.foot}>
            Sent to {contactEmail}. We’ll reply to the address above.
          </p>
        </article>
      </div>
      <button
        type="button"
        className={`${styles.reset}${resetClassName ? ` ${resetClassName}` : ""}`}
        onClick={onReset}
      >
        New enquiry
      </button>
    </div>
  );
}
