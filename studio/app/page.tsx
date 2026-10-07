import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { businessWebsitesHref, contactHref } from "@/lib/contact";
import { ProjectCard } from "@/components/project-card";
import { ProjectIndex } from "@/components/project-index";
import { ProjectShowcase } from "@/components/project-showcase";
import { Pricing } from "@/components/pricing";
import { ReflectiveMark } from "@/components/reflective-mark";
import { StructuredData } from "@/components/structured-data";
import { homeStructuredData } from "@/lib/structured-data";
import { homeDescription, homeTitle, pageMetadata } from "@/lib/seo";
import {
  projects,
  collaborations,
  allProjects,
  showcaseProjects,
} from "@/lib/projects";

export const metadata = {
  ...pageMetadata({
    title: homeTitle,
    description: homeDescription,
    path: "/",
    isHome: true,
  }),
  verification: {
    google: "z5ygDnWRxRBTzWfwCkcrMsUliX8UO6nf_04bVVOgJlQ",
  },
};

const faqs = [
  [
    "Can you work with a smaller budget?",
    "We can scope a focused website, landing page, or set of improvements. Share your priorities and budget so we can suggest a manageable monthly scope.",
  ],
  [
    "Can you work with our existing product?",
    "Yes. We can refine your current interface or build a new one in your existing codebase.",
  ],
  [
    "Do you build the backend?",
    "We focus on the frontend and connect it to your APIs. Your team owns the backend and infrastructure.",
  ],
  [
    "How do we start?",
    "Tell us about your website or product, what you want to improve, and your timeline. We’ll agree the scope and monthly fee before kickoff.",
  ],
];

export default function Home() {
  return (
    <>
      <StructuredData data={homeStructuredData(allProjects)} />
      <Navigation />
      <main id="main">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-topline">
            <span className="eyebrow">
              <span className="tiny-star">✳</span> DESIGN MEETS ENGINEERING
            </span>
          </div>
          <div className="hero-main">
            <div className="hero-copy">
              <h1 id="hero-title">
                Website design.
                <br />
                <em>Frontend engineering.</em>
              </h1>
              <p className="hero-intro">
                Websites and product interfaces for startups and businesses in
                Australia and worldwide.
              </p>
              <div className="hero-actions">
                <Link className="button" href={contactHref}>
                  Discuss your website <ArrowUpRight size={18} />
                </Link>
                <a className="text-link" href="#work">
                  <span className="round-icon">
                    <ArrowDown size={19} />
                  </span>
                  Explore our work
                </a>
              </div>
            </div>
            <div className="hero-art">
              <ReflectiveMark />
            </div>
          </div>
        </section>
        <section
          className="service-pathways section-shell"
          aria-label="Find the right service"
        >
          <article className="service-pathway">
            <span className="eyebrow">FOR BUSINESSES & SERVICE PROVIDERS</span>
            <h2>
              Business <em>websites.</em>
            </h2>
            <p>
              A new website, a clearer service page, or ongoing help with the
              site you have. Website design and support for businesses in
              Australia and worldwide.
            </p>
            <div className="service-pathway-links">
              <Link className="text-link" href={businessWebsitesHref}>
                Explore business websites <ArrowUpRight size={16} />
              </Link>
              <Link
                className="hero-pricing-link"
                href="/work/beigman-engineering"
              >
                See Beigman Engineering <ArrowUpRight size={15} />
              </Link>
            </div>
          </article>
          <article className="service-pathway">
            <span className="eyebrow">FOR STARTUPS & PRODUCT TEAMS</span>
            <h2>
              Product <em>interfaces.</em>
            </h2>
            <p>
              Frontend design and engineering for apps, dashboards, and customer
              portals. We work in your codebase and connect to your team’s APIs.
            </p>
            <div className="service-pathway-links">
              <Link className="text-link" href={contactHref}>
                Discuss your product <ArrowUpRight size={16} />
              </Link>
              <Link className="hero-pricing-link" href="/work/seitrace">
                Explore the Seitrace interface <ArrowUpRight size={15} />
              </Link>
            </div>
          </article>
        </section>
        <ProjectShowcase
          projects={showcaseProjects.map(
            ({
              slug,
              name,
              category,
              image,
              imageWidth,
              imageHeight,
              imageNote,
              liveLink,
            }) => ({
              slug,
              name,
              category,
              image,
              imageWidth,
              imageHeight,
              imageNote,
              liveLink,
            }),
          )}
        />
        <section
          className="collaborators section-shell"
          aria-label="Past advisory and collaboration work"
        >
          <p>Product advisory & collaboration</p>
          <div className="collaborator-names">
            <Link href="/work/ancient8" className="ancient-name">
              Ancient8
            </Link>
            <Link href="/work/solscan" className="solscan-name">
              SOLSCAN
            </Link>
          </div>
        </section>
        <Pricing />
        <section id="work" className="work-section section-shell">
          <div className="section-heading">
            <h2>
              Selected <em>work.</em>
            </h2>
          </div>
          <div className="project-grid">
            {projects.slice(0, 8).map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
          {projects.length > 8 && (
            <div className="more-work">
              <span className="eyebrow">MORE FROM OUR PRODUCT PORTFOLIO</span>
              <ProjectIndex projects={projects.slice(8)} offset={8} />
            </div>
          )}
          <div id="collaborations" className="collaboration-section">
            <div className="section-heading">
              <h2>
                Past <em>collaborations.</em>
              </h2>
              <p>Product advisory & collaboration.</p>
            </div>
            <div className="project-grid">
              {collaborations.map((project) => (
                <ProjectCard project={project} key={project.slug} />
              ))}
            </div>
          </div>
        </section>
        <section className="faq-section section-shell">
          <div>
            <h2>Questions?</h2>
            <Link className="text-link" href={contactHref}>
              Tell us about your project <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
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
      </main>
      <Footer />
    </>
  );
}
