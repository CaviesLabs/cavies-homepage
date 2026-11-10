import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { pageMetadata, siteUrl } from "@/lib/seo";
import {
  studioPrivacySections,
  studioPrivacyVersion,
  type PolicyBlock,
} from "@/lib/studio-privacy";
// The game pages' policy layout, so both privacy pages look the same.
import styles from "../games/oddly-orderly/game.module.css";

const path = "/privacy";
const title = "Privacy policy";
const description =
  "How Cavies Studio handles your information: enquiries, our host and spam check, our YouTube upload tool, and how to ask us to see or delete your data.";

export const metadata = pageMetadata({ title, description, path });

// Bold words, web addresses (without the punctuation that ends a sentence)
// and email addresses.
const inlinePattern =
  /\*\*(.+?)\*\*|(https:\/\/\S+?)(?=[.,;:)]?(?:\s|$))|([a-z0-9.-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+)/gi;

/** The policy's words exactly, with bold text and addresses marked up. */
function PolicyText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(inlinePattern)) {
    const [value, bold, url, email] = match;
    const index = match.index ?? 0;
    parts.push(text.slice(last, index));
    if (bold) {
      parts.push(<strong key={index}>{bold}</strong>);
    } else {
      const href = url
        ? url.startsWith(`${siteUrl}/`)
          ? url.slice(siteUrl.length)
          : url
        : `mailto:${email}`;
      parts.push(
        <a key={index} href={href}>
          {value}
        </a>,
      );
    }
    last = index + value.length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

function Block({ block }: { block: PolicyBlock }) {
  if (block.kind === "list") {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>
            <PolicyText text={item} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p>
      <PolicyText text={block.text} />
    </p>
  );
}

export default function StudioPrivacyPage() {
  return (
    <>
      <Navigation />
      <main id="main">
        <header className={`${styles.pageHeader} section-shell`}>
          <span className="eyebrow">CAVIES STUDIO</span>
          <h1>Privacy policy</h1>
          <p className={styles.lead}>
            What this site, our enquiries and our own tools collect, who handles
            it, and how to ask us to see or delete it.
          </p>
        </header>
        <div className={`${styles.layout} section-shell`}>
          <nav
            className={`${styles.aside} ${styles.toc}`}
            aria-labelledby="policy-toc-title"
          >
            <h2 id="policy-toc-title">ON THIS PAGE</h2>
            <ol>
              {studioPrivacySections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
          <article className={styles.prose}>
            <p className={styles.policyMeta} style={{ marginBottom: 40 }}>
              {studioPrivacyVersion}
            </p>
            {studioPrivacySections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
              >
                <h2 id={`${section.id}-title`}>{section.heading}</h2>
                {section.blocks.map((block, index) => (
                  <Block key={index} block={block} />
                ))}
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
