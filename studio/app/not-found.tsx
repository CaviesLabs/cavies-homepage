import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { allProjects } from "@/lib/projects";
export default function NotFound() {
  return (
    <>
      <Navigation workCount={allProjects.length} />
      <main id="main" className="not-found section-shell">
        <span className="eyebrow">404 / A WRONG TURN</span>
        <h1>
          Nothing here.
          <br />
          <em>Plenty to explore.</em>
        </h1>
        <p>Let’s get you back to the work.</p>
        <Link href="/#work" className="button">
          Explore our work ↗
        </Link>
      </main>
      <Footer />
    </>
  );
}
