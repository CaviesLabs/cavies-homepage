import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
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
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];
  return (
    <>
      <Navigation />
      <main id="main">
        <section className="case-header section-shell">
          <Link href="/#work" className="case-back">
            <ArrowLeft size={16} /> All selected work
          </Link>
          <div className="case-topline">
            <span className="eyebrow">
              {project.name} / {project.category}
            </span>
            <span>
              0{index + 1} — 0{projects.length}
            </span>
          </div>
          <h1>{project.headline}</h1>
          <div className="case-summary">
            <p>{project.description}</p>
            <div className="case-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>
        <div className="case-showcase" style={{ background: project.color }}>
          <Image
            src={project.image}
            width={1440}
            height={960}
            sizes="90vw"
            alt={`${project.name} — ${project.imageNote.toLowerCase()}`}
            priority
          />
        </div>
        <p className="case-image-note section-shell">
          {project.name} · {project.imageNote}
        </p>
        <section className="case-body section-shell">
          <aside className="case-sidebar">
            <div>
              <span>PROJECT</span>
              <p>{project.name}</p>
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
            <h2>The product context.</h2>
            <p>{project.context}</p>
            <h2>A closer look at the interface.</h2>
            <p>{project.approach}</p>
          </div>
        </section>
        {project.gallery && (
          <section
            className="case-gallery section-shell"
            aria-label="More interface details"
          >
            {project.gallery.map((item) => (
              <figure key={item.src}>
                <Image
                  src={item.src}
                  width={1440}
                  height={900}
                  sizes="90vw"
                  alt={item.caption}
                />
                <figcaption>{item.caption}</figcaption>
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
