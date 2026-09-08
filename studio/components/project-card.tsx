import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projectNumber, type Project } from "@/lib/projects";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`project-card project-${project.slug} ${project.kind === "collaboration" ? "collaboration-card" : ""}`}
    >
      <div className="project-visual" style={{ background: project.color }}>
        <div className="project-image-wrap">
          <Image
            src={project.image}
            alt={`${project.name} — ${project.imageNote.toLowerCase()}`}
            width={project.imageWidth ?? 1440}
            height={project.imageHeight ?? 960}
            sizes="(max-width: 700px) 92vw, 46vw"
            className="project-image"
          />
        </div>
      </div>
      <div className="project-caption">
        <div>
          <span className="project-number">
            {index === undefined ? "↗" : projectNumber(index)}
          </span>
          <h3>{project.name}</h3>
          <span className="project-description">{project.description}</span>
        </div>
        <span className="project-category">{project.tags[0]}</span>
        <span className="project-open" aria-hidden="true">
          <ArrowUpRight size={20} />
        </span>
      </div>
    </Link>
  );
}
