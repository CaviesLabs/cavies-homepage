"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Maximize2 } from "lucide-react";

type ShowcaseProject = {
  slug: string;
  name: string;
  category: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  imageNote: string;
};

export function ProjectShowcase({ projects }: { projects: ShowcaseProject[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = projects[activeIndex];

  return (
    <section
      id="showcase"
      className="project-showcase section-shell"
      aria-label="Featured product interfaces"
    >
      <div className="showcase-heading">
        <span className="eyebrow">A FEW THINGS WE’VE DESIGNED & BUILT</span>
        <span className="showcase-count">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>
      <div
        className="showcase-selector"
        role="group"
        aria-label="Choose a featured project"
      >
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            aria-pressed={index === activeIndex}
            aria-controls="showcase-preview"
            onClick={() => setActiveIndex(index)}
          >
            <span>{project.name}</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div
        id="showcase-preview"
        className="showcase-preview"
        role="region"
        aria-label={`${active.name} interface preview`}
      >
        <a
          className="showcase-image-link"
          href={active.image}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open full-size ${active.name} screenshot`}
        >
          <Image
            key={active.slug}
            src={active.image}
            alt={`${active.name} — ${active.imageNote.toLowerCase()}`}
            width={active.imageWidth ?? 1440}
            height={active.imageHeight ?? 960}
            sizes="(max-width: 700px) 90vw, (max-width: 1680px) 88vw, 1500px"
            className="showcase-image"
            loading="eager"
          />
        </a>
        <div className="showcase-caption">
          <div>
            <strong>{active.name}</strong>
            <span>{active.category}</span>
          </div>
          <div className="showcase-links">
            <a href={active.image} target="_blank" rel="noopener noreferrer">
              <Maximize2 size={14} />
              Full-size screenshot
            </a>
            <Link href={`/work/${active.slug}`}>
              View case study
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
