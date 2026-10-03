import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { StructuredData } from "@/components/structured-data";
import { absoluteUrl, pageMetadata, siteName, siteUrl } from "@/lib/seo";
import styles from "./page.module.css";

const path = "/services/business-websites";
const title = "Website Design for Australian Businesses";
const description =
  "Website design, redesigns and ongoing support for Australian businesses and professional services. Monthly plans with a tailored scope and quote.";

export const metadata = pageMetadata({ title, description, path });

const services = [
  {
    number: "01",
    title: "A new website.",
    description:
      "Give your business a clear home online, with pages that explain your services, show your work and help people get in touch.",
    items: [
      "Page structure and visual design",
      "Responsive frontend development",
      "Service, project and contact pages",
    ],
  },
  {
    number: "02",
    title: "A thoughtful redesign.",
    description:
      "Bring an existing site closer to the business you run today. Start with the pages, content and interactions that need attention.",
    items: [
      "Review of your current website",
      "Clearer navigation and page layouts",
      "A focused refresh or a new build",
    ],
  },
  {
    number: "03",
    title: "Support after launch.",
    description:
      "Keep improving the website as your business changes, with ongoing work agreed around your priorities and monthly capacity.",
    items: [
      "Content and layout updates",
      "Maintenance and refinements",
      "Scoped on-page and technical SEO",
    ],
  },
];

const steps = [
  {
    title: "Agree the priorities",
    description:
      "Tell us about your business, current site, audience and timeline. We agree the pages, deliverables, monthly fee and delivery capacity before kickoff.",
  },
  {
    title: "Design, build, review",
    description:
      "Work through the structure and design, then build the responsive website. Review the content and key journeys together before launch.",
  },
  {
    title: "Launch and keep improving",
    description:
      "Plan the launch around the agreed setup, then prioritise any ongoing updates, maintenance and SEO support in your monthly scope.",
  },
];

const faqs = [
  {
    question: "Who is this service for?",
    answer:
      "Businesses, consultancies and service providers that need a clear, professional website. We work with businesses in Australia and worldwide, whether you are starting with your first site or improving an existing one.",
  },
  {
    question: "What does a website project include?",
    answer:
      "A typical scope covers page structure, visual design and responsive frontend development. The number of pages, content responsibilities, integrations, migration and launch support are agreed for your project. Hosting and any third-party costs are discussed as part of that scope.",
  },
  {
    question: "Can you improve our existing website?",
    answer:
      "Yes. We can review your current site and agree a focused set of improvements, or scope a full redesign if that better fits your needs. Share your website link and what is difficult to update or no longer working for your business.",
  },
  {
    question: "Do you offer maintenance and SEO support?",
    answer:
      "Yes, within an agreed ongoing scope. This can include content updates, frontend fixes and SEO work such as page structure, titles, descriptions and technical checks. We agree which tasks are included and how they fit the available monthly capacity.",
  },
  {
    question: "How much does a business website cost?",
    answer:
      "We work on monthly plans with a tailored quote. The fee depends on the agreed scope and delivery capacity. Share your priorities and budget so we can suggest a manageable starting point; the scope, monthly fee and capacity are agreed before kickoff.",
  },
  {
    question: "What should we send to get started?",
    answer:
      "Send your current website if you have one, a short description of your business, what you want to improve and your target timeline. Any existing brand assets, content and budget guidance help us shape a useful first conversation.",
  },
];

const url = absoluteUrl(path);
const serviceStructuredData = {
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
        {
          "@type": "ListItem",
          position: 2,
          name: "Business websites",
          item: url,
        },
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
      name: "Business website design and ongoing support",
      description,
      url,
      serviceType: "Website design, development and maintenance",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: { "@type": "Country", name: "Australia" },
    },
  ],
};

export default function BusinessWebsitesPage() {
  return (
    <>
      <StructuredData data={serviceStructuredData} />
      <Navigation />
      <main id="main">
        <section
          className={`${styles.hero} section-shell`}
          aria-labelledby="business-websites-title"
        >
          <span className="eyebrow">BUSINESS WEBSITES</span>
          <h1 id="business-websites-title">
            Websites for Australian <em>businesses.</em>
          </h1>
          <div className={styles.heroBottom}>
            <p>
              Clear, well-built websites for businesses and professional
              services. We design, build and support sites that explain what you
              do and make it easy to get in touch.
            </p>
            <div className={styles.actions}>
              <Link href="/contact" className="button">
                Discuss your website
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <span>Monthly plans. Tailored scope and quote.</span>
            </div>
          </div>
        </section>

        <section
          className={`${styles.scope} section-shell`}
          aria-labelledby="website-scope-title"
        >
          <div className={styles.sectionHeading}>
            <h2 id="website-scope-title">
              Build, refine, <em>keep improving.</em>
            </h2>
            <p>
              Start with what your website needs most. We shape the work around
              your business, content and budget.
            </p>
          </div>
          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <article className={styles.service} key={service.number}>
                <span className={styles.number}>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">↳</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          className={`${styles.proof} section-shell`}
          aria-labelledby="beigman-proof-title"
        >
          <div className={styles.proofCopy}>
            <span className="eyebrow">IN PRACTICE · BEIGMAN ENGINEERING</span>
            <h2 id="beigman-proof-title">
              Technical expertise, <em>clearly presented.</em>
            </h2>
            <p>
              A website for a Melbourne fire engineering consultancy, with
              service and project discovery, interactive diagrams and a visual
              engineering roadmap.
            </p>
            <p>
              Cavies designed and built the site, with ongoing maintenance and
              SEO support beyond the initial build.
            </p>
            <Link href="/work/beigman-engineering" className="text-link">
              Explore the Beigman project
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <figure className={styles.proofImage}>
            <a
              href="/work/beigman-engineering-home.webp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the full-size Beigman Engineering website screenshot"
            >
              <Image
                src="/work/beigman-engineering-home.webp"
                width={1585}
                height={1050}
                sizes="(max-width: 900px) 90vw, 52vw"
                alt="Beigman Engineering business website with architectural imagery and fire engineering services"
              />
            </a>
            <figcaption>
              Beigman Engineering · Business website
              <a
                href="/work/beigman-engineering-home.webp"
                target="_blank"
                rel="noopener noreferrer"
              >
                View full size <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
        </section>

        <section
          className={`${styles.process} section-shell`}
          aria-labelledby="website-process-title"
        >
          <div className={styles.sectionHeading}>
            <h2 id="website-process-title">
              A clear scope. <em>A practical process.</em>
            </h2>
            <p>
              The first step is understanding what your business needs and what
              is realistic for your timeline.
            </p>
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
          className="faq-section section-shell"
          aria-labelledby="website-faq-title"
        >
          <div>
            <h2 id="website-faq-title">Good questions.</h2>
            <Link href="/contact" className="text-link">
              Talk to us <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="faq-list">
            {faqs.map(({ question, answer }) => (
              <details key={question}>
                <summary>
                  {question}
                  <span className="faq-plus" aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          className={`${styles.contact} section-shell`}
          aria-labelledby="website-contact-title"
        >
          <div>
            <h2 id="website-contact-title">
              Let’s talk about <em>your website.</em>
            </h2>
            <p>
              Share your current site, what you want to improve and your
              timeline. We can work out a useful starting point together.
            </p>
          </div>
          <Link href="/contact" className="button">
            Discuss your website
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
