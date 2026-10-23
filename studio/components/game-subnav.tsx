import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { gameName, gamePaths, gamesIndexHref } from "@/lib/oddly-orderly";
import styles from "./game-subnav.module.css";

type GamePage = keyof typeof gamePaths;

const pages: { page: GamePage; label: string }[] = [
  { page: "game", label: "The game" },
  { page: "press", label: "Press kit" },
  { page: "support", label: "Support" },
  { page: "privacy", label: "Privacy" },
];

/** Moves between Oddly Orderly's own pages; the current one is marked. */
export function GameSubnav({ current }: { current: GamePage }) {
  return (
    <div className={`${styles.bar} section-shell`}>
      <Link href={gamesIndexHref} className={styles.back}>
        <ArrowLeft size={15} aria-hidden="true" /> All games
      </Link>
      <nav className={styles.nav} aria-label={gameName}>
        <span className={styles.name} aria-hidden="true">
          {gameName}
        </span>
        <ul>
          {pages.map(({ page, label }) => (
            <li key={page}>
              <Link
                href={gamePaths[page]}
                aria-current={page === current ? "page" : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
