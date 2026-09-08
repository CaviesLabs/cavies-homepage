import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { allProjects, projectNumber } from "@/lib/projects";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export function generateStaticParams() {
  return allProjects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  return project
    ? {
        title: project.name,
        description: project.description,
        alternates: { canonical: `/work/${slug}` },
        openGraph: {
          title: `${project.name} — Cavies Studio`,
          description: project.description,
          images: [{ url: project.image }],
        },
      }
    : {};
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = allProjects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = allProjects[index];
  const nextProject = allProjects[(index + 1) % allProjects.length];
  const isCollaboration = project.kind === "collaboration";
  return (
    <>
      <Navigation workCount={allProjects.length} />
      <main id="main">
        <section className="case-header section-shell">
          <Link href="/#work" className="case-back">
            <ArrowLeft size={16} /> All selected work
          </Link>
          <div className="case-topline">
            <span className="eyebrow">{project.category}</span>
            <span>
              {projectNumber(index)} —{" "}
              {String(allProjects.length).padStart(2, "0")}
            </span>
          </div>
          <h1>{project.name}</h1>
          <div className="case-summary">
            <p>{project.description}</p>
            {!isCollaboration && (
              <div className="case-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </section>
        <div className="case-showcase" style={{ background: project.color }}>
          <a
            href={project.image}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open full-size ${project.name} screenshot`}
          >
            <Image
              src={project.image}
              width={project.imageWidth ?? 1440}
              height={project.imageHeight ?? 960}
              sizes="90vw"
              alt={`${project.name} — ${project.imageNote.toLowerCase()}`}
              priority
            />
          </a>
        </div>
        <p className="case-image-note section-shell">
          <span>
            {project.name} · {project.imageNote}
          </span>
          <a href={project.image} target="_blank" rel="noopener noreferrer">
            View full-size screenshot <ArrowUpRight size={14} />
          </a>
        </p>
        {!isCollaboration && (
          <section className="case-body section-shell">
            <aside className="case-sidebar">
              <div>
                <span>ROLE</span>
                <p>{project.role}</p>
              </div>
              <div>
                <span>INTERFACE FOCUS</span>
                <ul>
                  {project.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </aside>
            <div className="case-story">
              <h2>The interface.</h2>
              <p>{project.approach}</p>
            </div>
          </section>
        )}
        {isCollaboration && project.url && (
          <p className="case-collaboration-link section-shell">
            <a
              className="text-link"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit {project.name}
              <ArrowUpRight size={18} />
            </a>
          </p>
        )}
        {project.gallery && (
          <section
            className="case-gallery section-shell"
            aria-label="More interface details"
          >
            {project.gallery.map((item) => (
              <figure
                key={item.src}
                className={
                  item.width && item.width < 900
                    ? "case-gallery-detail"
                    : undefined
                }
              >
                <a
                  href={item.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open full-size image: ${item.caption}`}
                >
                  <Image
                    src={item.src}
                    width={item.width ?? 1440}
                    height={item.height ?? 900}
                    sizes="90vw"
                    alt={item.caption}
                  />
                </a>
                <figcaption>
                  <span>{item.caption}</span>
                  <a href={item.src} target="_blank" rel="noopener noreferrer">
                    View full size <ArrowUpRight size={14} />
                  </a>
                </figcaption>
              </figure>
            ))}
          </section>
        )}
        <Link
          className="next-project section-shell"
          href={`/work/${nextProject.slug}`}
        >
          <div>
            <span>EXPLORE THE NEXT PROJECT</span>
            <h2>{nextProject.name}</h2>
          </div>
          <ArrowUpRight strokeWidth={1} />
        </Link>
      </main>
      <Footer />
    </>
  );
}
