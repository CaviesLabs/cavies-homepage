import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { ProjectCard } from "@/components/project-card";
import { ProjectIndex } from "@/components/project-index";
import { StructuredData } from "@/components/structured-data";
import { contactHref } from "@/lib/contact";
import {
  allProjects,
  collaborations,
  gameProjects,
  projects,
  showcaseProjects,
} from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { workStructuredData } from "@/lib/structured-data";

const title = "Work: websites, product interfaces, and games";
const description =
  "Every Cavies Studio case study: business websites, product interfaces, and original games in development, with past advisory relationships listed separately.";

export const metadata = pageMetadata({ title, description, path: "/work" });

const featuredCount = showcaseProjects.length;

export default function WorkPage() {
  return (
    <>
      <StructuredData data={workStructuredData(allProjects, description)} />
      <Navigation />
      <main id="main">
        <section
          className="work-index-header section-shell"
          aria-labelledby="work-title"
        >
          <span className="eyebrow">ALL WORK</span>
          <h1 id="work-title">
            Websites, interfaces, <em>and games.</em>
          </h1>
          <p>
            Every case study in one place. Product work and games are our own;
            past advisory relationships are listed separately.
          </p>
        </section>
        <section
          className="work-index section-shell"
          aria-labelledby="featured-title"
        >
          <div className="section-heading">
            <h2 id="featured-title">
              Featured <em>interfaces.</em>
            </h2>
          </div>
          <div className="project-grid">
            {projects.slice(0, featuredCount).map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>
        <section
          className="work-index section-shell"
          aria-labelledby="selected-title"
        >
          <div className="section-heading">
            <h2 id="selected-title">
              Selected <em>work.</em>
            </h2>
          </div>
          <div className="project-grid">
            {projects.slice(featuredCount, 8).map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={featuredCount + index}
              />
            ))}
          </div>
          {projects.length > 8 && (
            <div className="more-work">
              <span className="eyebrow">MORE FROM OUR PRODUCT PORTFOLIO</span>
              <ProjectIndex projects={projects.slice(8)} offset={8} />
            </div>
          )}
        </section>
        <section
          id="games"
          className="work-index section-shell"
          aria-labelledby="games-title"
        >
          <div className="section-heading">
            <h2 id="games-title">
              Games in <em>development.</em>
            </h2>
            <p>Original games, from cozy puzzles to quick-play challenges.</p>
          </div>
          <div className="project-grid">
            {gameProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={projects.length + index}
              />
            ))}
          </div>
        </section>
        <section
          id="collaborations"
          className="work-index section-shell"
          aria-labelledby="collaborations-title"
        >
          <div className="section-heading">
            <h2 id="collaborations-title">
              Past <em>collaborations.</em>
            </h2>
            <p>Product advisory & collaboration.</p>
          </div>
          <div className="project-grid">
            {collaborations.map((project) => (
              <ProjectCard project={project} key={project.slug} />
            ))}
          </div>
        </section>
        <section className="work-index-contact section-shell">
          <h2>
            Have a project <em>in mind?</em>
          </h2>
          <Link href={contactHref} className="button">
            Discuss your project <ArrowUpRight size={18} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
