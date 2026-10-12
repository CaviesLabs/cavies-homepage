"use client";

import type { CSSProperties } from "react";
import type { ScopeOption } from "@/lib/project-scope";
import styles from "./option-row.module.css";

/**
 * A segmented radio group. The wine indicator slides to the chosen option
 * instead of each option changing colour, so a choice reads as one object
 * moving. Native radios provide arrow-key selection and form semantics.
 */
export function OptionRow<Id extends string>({
  id,
  label,
  labelClassName,
  name,
  options,
  value,
  onChange,
  variant = "inline",
  describedBy,
  invalid = false,
}: {
  id?: string;
  label: string;
  labelClassName?: string;
  name: string;
  options: ScopeOption<Id>[];
  value: Id | "";
  onChange: (id: Id) => void;
  variant?: "inline" | "stacked";
  describedBy?: string;
  invalid?: boolean;
}) {
  const index = options.findIndex((option) => option.id === value);
  const wraps = options.length > 3;
  const columns = wraps ? 2 : options.length;
  const style = {
    "--count": options.length,
    "--index": Math.max(index, 0),
    "--columns": columns,
    "--rows": Math.ceil(options.length / columns),
    "--column": Math.max(index, 0) % columns,
    "--row": Math.floor(Math.max(index, 0) / columns),
  } as CSSProperties;
  const labelId = `${name}-label`;

  return (
    <div
      className={`${styles.row}${variant === "stacked" ? ` ${styles.stacked}` : ""}`}
    >
      <span id={labelId} className={labelClassName ?? styles.label}>
        {label}
      </span>
      <div
        id={id}
        tabIndex={id ? -1 : undefined}
        role="radiogroup"
        aria-labelledby={labelId}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        className={styles.track}
        data-selected={index >= 0}
        data-wrap={wraps}
        style={style}
      >
        <span className={styles.indicator} aria-hidden="true" />
        {options.map((option) => (
          <label key={option.id} className={styles.option}>
            <input
              className={styles.input}
              type="radio"
              name={name}
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
            />
            <span className={styles.text}>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
