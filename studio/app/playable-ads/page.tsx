import { ArrowDown } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { PlayableDemos } from "@/components/playable-demos";
import { StructuredData } from "@/components/structured-data";
import {
  adNetworks,
  playableAdsPath,
  playableDemos,
  quoteSectionId,
} from "@/lib/playable-ads";
import { absoluteUrl, pageMetadata, siteName, siteUrl } from "@/lib/seo";
import styles from "./page.module.css";

const title = "Playable Ads for Mobile Games";
const description =
  "Playable ads made from your mobile game, exported for five ad networks. Try three demos, then ask for a quote. Fixed price, quoted in a day.";

export const metadata = pageMetadata({
  title,
  description,
  path: playableAdsPath,
});

const steps = [
  {
    title: "You send the game",
    description:
      "Send the game’s art and its store link, or let us record it. We use your art only with your say.",
  },
  {
    title: "We build it",
    description:
      "A short playable of your game that ends on one button to your store page, exported for the networks you choose.",
  },
  {
    title: "One round of changes",
    description:
      "Tell us what to change and we change it once. The round is part of the quote.",
  },
];

const url = absoluteUrl(playableAdsPath);
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: siteName,
          item: `${siteUrl}/`,
        },
        { "@type": "ListItem", position: 2, name: "Playable ads", item: url },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: "en",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      mainEntity: { "@id": `${url}#service` },
    },
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: "Playable ads for mobile games",
      description,
      url,
      serviceType: "Playable ad production",
      provider: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function PlayableAdsPage() {
  // Same switch as the contact page: the static build turns direct delivery
  // on only with ENQUIRY_FORM_ENABLED=true and the public site key.
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const deliveryEnabled = Boolean(
    turnstileSiteKey && process.env.ENQUIRY_FORM_ENABLED === "true",
  );
  return (
    <>
      <StructuredData data={structuredData} />
      <Navigation />
      <main id="main">
        <section
          className={`${styles.hero} section-shell`}
          aria-labelledby="playable-ads-title"
        >
          <span className="eyebrow">PLAYABLE ADS</span>
          <h1 id="playable-ads-title">
            Playable ads, <em>made from your game.</em>
          </h1>
          <div className={styles.heroBottom}>
            <p>
              A playable ad is a short piece of your game that a person can play
              inside an ad. It ends on one button that opens your store page. We
              build them for mobile games.
            </p>
            <div className={styles.actions}>
              <a href="#demos" className="button">
                Try the demos
                <ArrowDown size={18} aria-hidden="true" />
              </a>
              <span>Fixed price, quoted in a day.</span>
            </div>
          </div>
        </section>

        <section
          id="demos"
          className={`${styles.demos} section-shell`}
          aria-labelledby="demos-title"
        >
          <div className={styles.sectionHeading}>
            <h2 id="demos-title">
              Three of ours, <em>to play.</em>
            </h2>
            <p>
              Press Tap to play and use it as a player would. The last button is
              where your store page would open; here it takes you to the quote
              form.
            </p>
          </div>
          <PlayableDemos demos={playableDemos} />
        </section>

        <section
          className={`${styles.networks} section-shell`}
          aria-labelledby="networks-title"
        >
          <div>
            <h2 id="networks-title">
              One build, <em>exported for:</em>
            </h2>
            <p>Each export is made to that network’s published format rules.</p>
          </div>
          <ul className={styles.networkList}>
            {adNetworks.map((network) => (
              <li key={network}>{network}</li>
            ))}
          </ul>
        </section>

        <section
          className={`${styles.process} section-shell`}
          aria-labelledby="how-title"
        >
          <div className={styles.sectionHeading}>
            <h2 id="how-title">
              How it <em>works.</em>
            </h2>
            <p className={styles.price}>Fixed price, quoted in a day.</p>
          </div>
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          id={quoteSectionId}
          className={`${styles.quote} section-shell`}
          aria-labelledby="quote-title"
        >
          <div className={styles.quoteIntro}>
            <h2 id="quote-title" tabIndex={-1} data-quote-heading>
              Ask for <em>a quote.</em>
            </h2>
            <p>
              Tell us about your game and the networks you use, and put your
              store page in the website field.
            </p>
          </div>
          <EnquiryForm
            deliveryEnabled={deliveryEnabled}
            turnstileSiteKey={turnstileSiteKey}
            defaultService="Playable ads"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
