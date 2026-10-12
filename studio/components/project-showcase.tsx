"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { MorphText } from "./morph-text";
import styles from "./project-showcase.module.css";

type ShowcaseProject = {
  slug: string;
  name: string;
  category: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  imageNote: string;
  liveLink?: { href: string; label: string };
};

export function ProjectShowcase({ projects }: { projects: ShowcaseProject[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasSelectedProject, setHasSelectedProject] = useState(false);
  const [loadedImage, setLoadedImage] = useState<string | null>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const active = projects[activeIndex];

  function selectProject(index: number) {
    if (index === activeIndex) return;
    setHasSelectedProject(true);
    setActiveIndex(index);
  }

  function handleSelectorKey(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    const rowStep = window.matchMedia("(max-width: 700px)").matches ? 2 : 1;
    let nextIndex: number;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % projects.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + projects.length) % projects.length;
        break;
      case "ArrowDown":
        nextIndex = (index + rowStep) % projects.length;
        break;
      case "ArrowUp":
        nextIndex = (index - rowStep + projects.length) % projects.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = projects.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectProject(nextIndex);
    buttons.current[nextIndex]?.focus();
  }

  return (
    <section
      id="showcase"
      className="project-showcase section-shell"
      aria-label="Featured product interfaces"
    >
      <div className="showcase-heading">
        <span className="eyebrow">A FEW THINGS WE’VE DESIGNED & BUILT</span>
        <span className="showcase-count">
          <MorphText text={String(activeIndex + 1).padStart(2, "0")} /> /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>
      <div
        className={`showcase-selector ${styles.selector}`}
        role="group"
        aria-label="Choose a featured project"
        style={
          {
            "--selected-index": activeIndex,
            "--selected-column": activeIndex % 2,
            "--selected-row": Math.floor(activeIndex / 2),
          } as CSSProperties
        }
      >
        {projects.map((project, index) => (
          <button
            key={project.slug}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            className={styles.selectorButton}
            type="button"
            aria-pressed={index === activeIndex}
            aria-controls="showcase-preview"
            onClick={() => selectProject(index)}
            onKeyDown={(event) => handleSelectorKey(event, index)}
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
          className={`showcase-image-link ${styles.imageFrame}`}
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
            className={`showcase-image ${styles.image}${
              hasSelectedProject && loadedImage === active.slug
                ? ` ${styles.imageEnter}`
                : ""
            }`}
            loading="eager"
            onLoad={() => setLoadedImage(active.slug)}
          />
        </a>
        <div className="showcase-caption">
          <div>
            <strong>
              <MorphText text={active.name} />
            </strong>
            <span>
              <MorphText text={active.category} />
            </span>
          </div>
          <div className="showcase-links">
            <a href={active.image} target="_blank" rel="noopener noreferrer">
              <Maximize2 size={14} />
              Full-size screenshot
            </a>
            {active.liveLink && (
              <a
                href={active.liveLink.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {active.liveLink.label}
                <ArrowUpRight size={16} />
              </a>
            )}
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
