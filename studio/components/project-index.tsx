import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projectNumber, type Project } from "@/lib/projects";

export function ProjectIndex({
  projects,
  offset,
}: {
  projects: Project[];
  offset: number;
}) {
  return (
    <div className="project-index">
      {projects.map((project, index) => (
        <Link
          className="project-index-row"
          href={`/work/${project.slug}`}
          key={project.slug}
        >
          <span className="project-number">
            {projectNumber(offset + index)}
          </span>
          <div
            className="project-index-image"
            style={{ background: project.color }}
          >
            <Image
              src={project.image}
              width={project.imageWidth ?? 1440}
              height={project.imageHeight ?? 960}
              sizes="160px"
              alt=""
            />
          </div>
          <div className="project-index-title">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
          <span className="project-index-category">{project.category}</span>
          <ArrowUpRight size={23} />
        </Link>
      ))}
    </div>
  );
}
