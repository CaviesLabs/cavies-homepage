import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { GameSubnav } from "@/components/game-subnav";
import { Navigation } from "@/components/navigation";
import { StructuredData } from "@/components/structured-data";
import {
  features,
  formatBytes,
  gameName,
  gamePaths,
  pressAssets,
  screenshots,
  shortDescription,
  socialImage,
  steamPlatforms,
  steamUrl,
  storyParagraph,
  tagline,
  trailer,
} from "@/lib/oddly-orderly";
import { pageMetadata } from "@/lib/seo";
import { videoGameStructuredData } from "@/lib/structured-data";
import styles from "./game.module.css";

const path = gamePaths.game;
const title = "Oddly Orderly: a cozy tidying puzzle game";
const description =
  "Oddly Orderly is a cozy, wordless tidying puzzle about two people moving in together: over a hundred pages, more than one tidy way, and a magpie. Coming soon to Steam.";

export const metadata = pageMetadata({
  title,
  description,
  path,
  image: socialImage,
});

export default function OddlyOrderlyPage() {
  return (
    <>
      <StructuredData
        data={videoGameStructuredData({
          path,
          name: gameName,
          pageTitle: title,
          description: shortDescription,
          images: screenshots.map(({ src, title, caption, width, height }) => ({
            src,
            caption: `${title}: ${caption}`,
            width,
            height,
          })),
          trailer: {
            name: trailer.title,
            description: trailer.description,
            contentUrl: trailer.src,
            thumbnailUrl: trailer.poster,
            duration: trailer.duration,
            uploadDate: trailer.uploadDate,
          },
          genre: ["Puzzle", "Casual"],
          platforms: ["Windows", "macOS", "SteamOS", "Linux"],
          storeUrl: steamUrl,
        })}
      />
      <Navigation />
      <main id="main">
        <GameSubnav current="game" />
        <section
          className={`${styles.hero} section-shell`}
          aria-labelledby="game-title"
        >
          <span className="eyebrow">COZY PUZZLE GAME · COMING SOON</span>
          <h1 id="game-title" className={styles.logoTitle}>
            <Image
              src={pressAssets.logo.src}
              width={pressAssets.logo.width}
              height={pressAssets.logo.height}
              sizes="(max-width: 700px) 88vw, 720px"
              alt={gameName}
              preload
            />
          </h1>
          <p className={styles.tagline}>
            <em>{tagline}</em>
          </p>
          <div className={styles.heroBottom}>
            <p className={styles.lead}>{shortDescription}</p>
            <div className={styles.heroActions}>
              {steamUrl && (
                <a
                  className="button"
                  href={steamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wishlist on Steam{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              )}
              <p className={styles.platformLine}>
                <strong>Coming soon to Steam</strong>
                <span>{steamPlatforms.join(" · ")}</span>
              </p>
            </div>
          </div>
        </section>

        <section
          className={`${styles.trailerSection} section-shell`}
          aria-labelledby="trailer-title"
        >
          <h2 id="trailer-title" className="visually-hidden">
            Trailer
          </h2>
          <figure className={styles.trailer}>
            <div className={styles.stage}>
              <video
                className={styles.video}
                controls
                preload="none"
                playsInline
                poster={trailer.poster}
                width={trailer.width}
                height={trailer.height}
                aria-label={trailer.title}
                aria-describedby="trailer-caption"
              >
                <source src={trailer.src} type="video/mp4" />
                <a href={trailer.src}>
                  Download the trailer (MP4, {formatBytes(trailer.bytes)})
                </a>
              </video>
            </div>
            <figcaption id="trailer-caption" className={styles.caption}>
              <span>
                Trailer · {trailer.durationLabel} · Development build.{" "}
                {trailer.description}
              </span>
            </figcaption>
          </figure>
        </section>

        <section
          className={`${styles.about} section-shell`}
          aria-labelledby="about-title"
        >
          <div className={styles.aboutIntro}>
            <h2 id="about-title">
              Small things. Their place. <em>More than one way.</em>
            </h2>
            <p>{storyParagraph}</p>
          </div>
          <ul className={styles.features}>
            {features.map((feature) => (
              <li key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={`${styles.gallery} section-shell`}
          aria-labelledby="screenshots-title"
        >
          <div className={styles.sectionHeading}>
            <h2 id="screenshots-title">
              Around the <em>house.</em>
            </h2>
            <p>
              Screenshots from the development build, October 2026. Open any of
              them at full size.
            </p>
          </div>
          <div className={styles.shots}>
            {screenshots.map((shot) => (
              <figure key={shot.slug} className={styles.shot}>
                <a
                  href={shot.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open full-size screenshot: ${shot.title}`}
                >
                  <Image
                    src={shot.src}
                    width={shot.width}
                    height={shot.height}
                    sizes="(max-width: 700px) 88vw, 44vw"
                    alt={shot.alt}
                  />
                </a>
                <figcaption>
                  <strong>{shot.title}</strong> {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section
          className={`${styles.closing} section-shell`}
          aria-labelledby="steam-title"
        >
          <div className={styles.steam}>
            <h2 id="steam-title">
              Coming soon <em>to Steam.</em>
            </h2>
            <ul className={styles.platforms} aria-label="Platforms">
              {steamPlatforms.map((platform) => (
                <li key={platform}>{platform}</li>
              ))}
            </ul>
            {steamUrl && (
              <a
                className="button"
                href={steamUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Wishlist on Steam <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            )}
          </div>
        </section>

        <nav
          className={`${styles.moreLinks} section-shell`}
          aria-label="More about Oddly Orderly"
        >
          <Link href={gamePaths.press}>
            Press kit <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <Link href={gamePaths.support}>
            Support <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <Link href={gamePaths.privacy}>
            Privacy policy <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
