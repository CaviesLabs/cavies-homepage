import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { GameSubnav } from "@/components/game-subnav";
import { Navigation } from "@/components/navigation";
import { StructuredData } from "@/components/structured-data";
import { gameName, gamePaths, socialImage } from "@/lib/oddly-orderly";
import { privacyPolicy } from "@/lib/oddly-orderly-privacy";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { gameSubpageStructuredData } from "@/lib/structured-data";
import styles from "../game.module.css";

const path = gamePaths.privacy;
const title = "Oddly Orderly privacy policy";
const description =
  "The privacy policy that ships with Oddly Orderly: what the game keeps on your device, optional playtest notes, Steam, and how to delete local data.";

export const metadata = pageMetadata({
  title,
  description,
  path,
  image: socialImage,
});

// Web addresses (without the punctuation that ends a sentence) and email addresses.
const linkPattern =
  /(https:\/\/\S+?)(?=[.,;:]?(?:\s|$))|([a-z0-9.-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+)/gi;

/** The policy's words exactly, with its addresses made into links. */
function LinkedText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(linkPattern)) {
    const [value, url, email] = match;
    const index = match.index ?? 0;
    parts.push(text.slice(last, index));
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
    last = index + value.length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

export default function PrivacyPolicyPage() {
  const { title: policyTitle, effectiveDate, intro, sections } = privacyPolicy;
  return (
    <>
      <StructuredData
        data={gameSubpageStructuredData({
          path,
          name: "Privacy policy",
          description,
          game: { name: gameName, path: gamePaths.game },
        })}
      />
      <Navigation />
      <main id="main">
        <GameSubnav current="privacy" />
        <header className={`${styles.pageHeader} section-shell`}>
          <span className="eyebrow">ODDLY ORDERLY</span>
          <h1>Privacy policy</h1>
          <p className={styles.lead}>
            This is the privacy policy that ships with the game, published here
            word for word.
          </p>
        </header>
        <div className={`${styles.layout} section-shell`}>
          <nav
            className={`${styles.aside} ${styles.toc}`}
            aria-labelledby="policy-toc-title"
          >
            <h2 id="policy-toc-title">ON THIS PAGE</h2>
            <ol>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
          <article className={`${styles.prose} ${styles.policy}`}>
            <p className={styles.policyTitle}>{policyTitle}</p>
            <p className={styles.policyMeta}>{effectiveDate}</p>
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
              >
                <h2 id={`${section.id}-title`}>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>
                    <LinkedText text={paragraph} />
                  </p>
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
