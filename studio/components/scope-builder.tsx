"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  defaultScope,
  scopeClause,
  scopeContactHref,
  scopeHelpOptions,
  scopePhrase,
  scopeStageOptions,
  scopeTimingOptions,
  type ProjectScope,
} from "@/lib/project-scope";
import { MorphText } from "./morph-text";
import { OptionRow } from "./option-row";
import styles from "./scope-builder.module.css";

/**
 * Three decisions compose one sentence. Each choice moves an indicator and
 * settles the sentence's chips; the sentence then travels to the contact
 * page, where it opens the enquiry.
 */
export function ScopeBuilder() {
  const [scope, setScope] = useState<ProjectScope>(defaultScope);

  function update<Key extends keyof ProjectScope>(
    key: Key,
    value: ProjectScope[Key],
  ) {
    setScope((current) => ({ ...current, [key]: value }));
  }

  return (
    <div id="scope" className={styles.builder}>
      <div className={styles.top}>
        <span className="eyebrow">START WITH A SCOPE</span>
        <span className={styles.note}>Three quick choices</span>
      </div>
      <p className={styles.sentence} aria-live="polite" aria-atomic="true">
        We need{" "}
        <span className="scope-chip">
          <MorphText text={scopePhrase(scope)} />
        </span>
        ,{" "}
        <span className="scope-chip">
          <MorphText text={scopeClause(scope)} />
        </span>
        .
      </p>
      <div className={styles.rows}>
        <OptionRow
          label="Help with"
          name="scope-help"
          options={scopeHelpOptions}
          value={scope.help}
          onChange={(help) => update("help", help)}
        />
        <OptionRow
          label="Stage"
          name="scope-stage"
          options={scopeStageOptions}
          value={scope.stage}
          onChange={(stage) => update("stage", stage)}
        />
        <OptionRow
          label="Timing"
          name="scope-timing"
          options={scopeTimingOptions}
          value={scope.timing}
          onChange={(timing) => update("timing", timing)}
        />
      </div>
      <div className={styles.actions}>
        <Link className="button" href={scopeContactHref(scope)}>
          Discuss this scope <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
        <p>Scope, monthly fee, and delivery capacity agreed before kickoff.</p>
      </div>
    </div>
  );
}
