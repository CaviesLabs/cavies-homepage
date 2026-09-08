import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`project-card project-${project.slug}`}
    >
      <div className="project-visual" style={{ background: project.color }}>
        <div className="visual-topline">
          <span>{project.name}</span>
          <span className="project-kind">{project.category}</span>
        </div>
        <div className="project-image-wrap">
          <Image
            src={project.image}
            alt={`${project.name} — ${project.imageNote.toLowerCase()}`}
            width={1440}
            height={960}
            sizes="(max-width: 700px) 92vw, 46vw"
            className="project-image"
          />
        </div>
        <span className="project-open">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="project-caption">
        <div>
          <span className="project-number">0{index + 1}</span>
          <h3>{project.name}</h3>
          <span className="project-description">{project.description}</span>
        </div>
        <span className="project-category">{project.tags[0]}</span>
      </div>
    </Link>
  );
}
