import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { emailHref } from "@/lib/contact";
import { ProjectCard } from "@/components/project-card";
import { ProjectIndex } from "@/components/project-index";
import { ProjectShowcase } from "@/components/project-showcase";
import { Pricing } from "@/components/pricing";
import { ReflectiveMark } from "@/components/reflective-mark";
import {
  projects,
  collaborations,
  allProjects,
  showcaseProjects,
} from "@/lib/projects";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const faqs = [
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
    "Send your product link, what you want to improve, and your timeline.",
  ],
];

export default function Home() {
  return (
    <>
      <Navigation workCount={allProjects.length} />
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
                Ambitious products.
                <br />
                <em>Exceptional interfaces.</em>
              </h1>
              <p className="hero-intro">
                Product design, frontend code, and integration for startups.
              </p>
              <div className="hero-actions">
                <a className="text-link" href="#work">
                  <span className="round-icon">
                    <ArrowDown size={19} />
                  </span>
                  Explore our work
                </a>
                <a className="hero-pricing-link" href="#pricing">
                  Plans from $7,500 / month <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
            <div className="hero-art">
              <ReflectiveMark />
            </div>
          </div>
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
            }) => ({
              slug,
              name,
              category,
              image,
              imageWidth,
              imageHeight,
              imageNote,
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
            <a className="text-link" href={emailHref}>
              Email us <ArrowUpRight size={15} />
            </a>
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
