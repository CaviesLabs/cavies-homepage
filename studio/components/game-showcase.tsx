"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import type { Project } from "@/lib/projects";
import { MorphText } from "./morph-text";
import styles from "./game-showcase.module.css";

type GameImage = {
  src: string;
  caption: string;
  width: number;
  height: number;
};

function imagesFor(project: Project): GameImage[] {
  const images = [
    {
      src: project.image,
      caption: project.imageNote,
      width: project.imageWidth ?? 1600,
      height: project.imageHeight ?? 1000,
    },
    ...(project.gallery ?? []).map((image) => ({
      ...image,
      width: image.width ?? 1600,
      height: image.height ?? 1000,
    })),
  ];

  return images
    .filter(
      (image, index) =>
        images.findIndex((other) => other.src === image.src) === index,
    )
    .slice(0, 4);
}

export function GameShowcase({ projects }: { projects: Project[] }) {
  const id = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImages, setSelectedImages] = useState<Record<string, number>>(
    {},
  );
  const [hasInteracted, setHasInteracted] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(
    () => new Set(),
  );
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  if (projects.length === 0) return null;

  function selectGame(index: number) {
    setActiveIndex(index);
    setHasInteracted(true);
  }

  function handleTabKey(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    const rowStep = window.matchMedia("(max-width: 640px)").matches ? 2 : 1;
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
    selectGame(nextIndex);
    tabs.current[nextIndex]?.focus({ preventScroll: true });
  }

  const selectorStyle = {
    "--game-count": projects.length,
    "--active-index": activeIndex,
    "--active-column": activeIndex % 2,
    "--active-row": Math.floor(activeIndex / 2),
    "--mobile-rows": Math.ceil(projects.length / 2),
  } as CSSProperties;

  return (
    <section
      id="games"
      className={`${styles.section} section-shell`}
      aria-labelledby={`${id}-heading`}
      data-interacted={hasInteracted}
    >
      <div className={styles.heading}>
        <h2 id={`${id}-heading`}>Games in development.</h2>
        <p>Original games, from cozy puzzles to quick-play challenges.</p>
      </div>

      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Choose a game"
        style={selectorStyle}
      >
        <span className={styles.indicator} aria-hidden="true" />
        {projects.map((project, index) => (
          <button
            className={styles.tab}
            key={project.slug}
            id={`${id}-tab-${project.slug}`}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`${id}-panel-${project.slug}`}
            tabIndex={activeIndex === index ? 0 : -1}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            onClick={() => selectGame(index)}
            onKeyDown={(event) => handleTabKey(event, index)}
          >
            {project.name}
          </button>
        ))}
      </div>

      {projects.map((project, index) => {
        const images = imagesFor(project);
        const imageIndex = selectedImages[project.slug] ?? 0;
        const selectedImage = images[imageIndex] ?? images[0];

        return (
          <div
            className={styles.panel}
            key={project.slug}
            id={`${id}-panel-${project.slug}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${project.slug}`}
            hidden={activeIndex !== index}
          >
            <div className={styles.summary}>
              <div className={styles.description}>
                <div className={styles.meta}>
                  <span>{project.category}</span>
                  <span className={styles.status}>In development</span>
                </div>
                <p>{project.description}</p>
              </div>
              <Link className={styles.caseLink} href={`/work/${project.slug}`}>
                View case study <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>

            <figure className={styles.figure}>
              <a
                className={styles.stage}
                href={selectedImage.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.name} image ${imageIndex + 1} at full size`}
                style={{ backgroundColor: project.color }}
              >
                <div
                  className={styles.imageFrame}
                  key={`${project.slug}-${selectedImage.src}`}
                  data-ready={loadedImages.has(selectedImage.src)}
                >
                  <Image
                    src={selectedImage.src}
                    alt={`${project.name}: ${selectedImage.caption}`}
                    width={selectedImage.width}
                    height={selectedImage.height}
                    sizes="(max-width: 640px) 92vw, (max-width: 1680px) 91vw, 1535px"
                    className={styles.image}
                    loading="lazy"
                    onLoad={() => {
                      setLoadedImages((current) => {
                        if (current.has(selectedImage.src)) return current;
                        return new Set(current).add(selectedImage.src);
                      });
                    }}
                  />
                </div>
              </a>
              <figcaption
                className={styles.caption}
                aria-live="polite"
                aria-atomic="true"
              >
                <span>
                  <MorphText text={selectedImage.caption} />
                </span>
                <span className={styles.imageCount}>
                  <MorphText text={String(imageIndex + 1)} /> / {images.length}
                </span>
              </figcaption>
            </figure>

            <div
              className={styles.thumbnails}
              role="group"
              aria-label={`${project.name} images`}
            >
              {images.map((image, thumbnailIndex) => (
                <button
                  key={image.src}
                  className={styles.thumbnail}
                  type="button"
                  aria-label={`Show image ${thumbnailIndex + 1}: ${image.caption}`}
                  aria-pressed={imageIndex === thumbnailIndex}
                  onClick={() => {
                    setSelectedImages((current) => ({
                      ...current,
                      [project.slug]: thumbnailIndex,
                    }));
                    setHasInteracted(true);
                  }}
                  style={{ backgroundColor: project.color }}
                >
                  <Image
                    src={image.src}
                    alt=""
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 640px) 21vw, 140px"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <nav className={styles.caseIndex} aria-label="Game case studies">
        {projects.map((project) => (
          <Link key={project.slug} href={`/work/${project.slug}`}>
            {project.name} <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        ))}
      </nav>
    </section>
  );
}
