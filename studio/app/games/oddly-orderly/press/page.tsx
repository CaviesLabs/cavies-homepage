import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { Footer } from "@/components/footer";
import { GameSubnav } from "@/components/game-subnav";
import { Navigation } from "@/components/navigation";
import { StructuredData } from "@/components/structured-data";
import { gameContactEmail, gameContactHref } from "@/lib/contact";
import {
  aboutTheArt,
  factsheet,
  features,
  formatBytes,
  gameName,
  gamePaths,
  pressAssets,
  pressParagraph,
  screenshots,
  shortDescription,
  steamUrl,
  trailer,
} from "@/lib/oddly-orderly";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { gameSubpageStructuredData } from "@/lib/structured-data";
import styles from "../game.module.css";

const path = gamePaths.press;
const title = "Oddly Orderly press kit";
const description =
  "The Oddly Orderly press kit: factsheet, description, features, the trailer, screenshots, the logo and the app icon of the cozy tidying puzzle game.";

export const metadata = pageMetadata({
  title,
  description,
  path,
  image: {
    url: pressAssets.capsule.download,
    width: pressAssets.capsule.width,
    height: pressAssets.capsule.height,
    alt: pressAssets.capsule.alt,
  },
});

const sections = [
  ["factsheet", "Factsheet"],
  ["about", "About the game"],
  ["trailer", "Trailer"],
  ["screenshots", "Screenshots"],
  ["logo-and-icon", "Logo and icon"],
  ["about-the-art", "About the art"],
  ["press-contact", "Contact"],
] as const;

const websiteUrl = absoluteUrl(gamePaths.game);
const pressHref = gameContactHref("Oddly Orderly press");

export default function PressKitPage() {
  const { logo, icon, capsule } = pressAssets;
  return (
    <>
      <StructuredData
        data={gameSubpageStructuredData({
          path,
          name: "Press kit",
          description,
          game: { name: gameName, path: gamePaths.game },
        })}
      />
      <Navigation />
      <main id="main">
        <GameSubnav current="press" />
        <header className={`${styles.pageHeader} section-shell`}>
          <span className="eyebrow">ODDLY ORDERLY</span>
          <h1>Press kit</h1>
          <p className={styles.lead}>
            The facts, the words and the pictures for writing about Oddly
            Orderly, a cozy tidying puzzle game by Cavies Studio.
          </p>
        </header>
        <div className={`${styles.layout} section-shell`}>
          <aside
            id="factsheet"
            className={`${styles.aside} ${styles.factsheet}`}
            aria-labelledby="factsheet-title"
          >
            <h2 id="factsheet-title">Factsheet</h2>
            <dl>
              <dt>Developer</dt>
              <dd>{factsheet.developer}</dd>
              <dt>Publisher</dt>
              <dd>{factsheet.publisher}</dd>
              <dt>Release date</dt>
              <dd>{factsheet.release}</dd>
              <dt>Price</dt>
              <dd>{factsheet.price}</dd>
              <dt>Platforms</dt>
              <dd>{factsheet.platforms}</dd>
              <dt>Languages</dt>
              <dd>{factsheet.languages}</dd>
              <dt>Players</dt>
              <dd>{factsheet.players}</dd>
              <dt>Website</dt>
              <dd>
                <Link href={gamePaths.game}>
                  {websiteUrl.replace("https://", "")}
                </Link>
              </dd>
              {steamUrl && (
                <>
                  <dt>Steam</dt>
                  <dd>
                    <a
                      href={steamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Store page
                    </a>
                  </dd>
                </>
              )}
              <dt>Press contact</dt>
              <dd>
                <a href={pressHref}>{gameContactEmail}</a>
              </dd>
            </dl>
          </aside>

          <div className={styles.prose}>
            <nav
              className={`${styles.toc} ${styles.tocRow}`}
              aria-labelledby="press-toc-title"
            >
              <h2 id="press-toc-title">IN THIS PRESS KIT</h2>
              <ol>
                {sections.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`}>{label}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <section id="about" aria-labelledby="about-title">
              <h2 id="about-title">About the game</h2>
              <p>{shortDescription}</p>
              <p>{pressParagraph}</p>
              <h3>Features</h3>
              <ul>
                {features.map((feature) => (
                  <li key={feature.title}>
                    <strong>{feature.title}.</strong> {feature.body}
                  </li>
                ))}
              </ul>
            </section>

            <section id="trailer" aria-labelledby="trailer-title">
              <h2 id="trailer-title">Trailer</h2>
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
                    aria-describedby="press-trailer-caption"
                  >
                    <source src={trailer.src} type="video/mp4" />
                    <a href={trailer.src}>
                      Download the trailer (MP4, {formatBytes(trailer.bytes)})
                    </a>
                  </video>
                </div>
                <figcaption
                  id="press-trailer-caption"
                  className={styles.caption}
                >
                  {trailer.durationLabel} · 1920 × 1080 · Development build.{" "}
                  {trailer.description}
                </figcaption>
              </figure>
              <p>
                <a className={styles.download} href={trailer.src} download>
                  <Download size={16} aria-hidden="true" /> Download the trailer
                  · MP4, H.264, {formatBytes(trailer.bytes)}
                </a>
              </p>
            </section>

            <section id="screenshots" aria-labelledby="screenshots-title">
              <h2 id="screenshots-title">Screenshots</h2>
              <p>
                From the development build, October 2026. Each downloads as a
                full-size 1920 × 1080 JPEG.
              </p>
              <div className={styles.pressShots}>
                {screenshots.map((shot) => (
                  <figure key={shot.slug} className={styles.pressShot}>
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
                        sizes="(max-width: 700px) 88vw, (max-width: 900px) 44vw, 30vw"
                        alt={shot.alt}
                      />
                    </a>
                    <figcaption>
                      <span>
                        <strong>{shot.title}.</strong> {shot.caption}
                      </span>
                      <a
                        className={styles.download}
                        href={shot.download}
                        download
                        aria-label={`Download ${shot.title}, JPEG, ${formatBytes(shot.downloadBytes)}`}
                      >
                        <Download size={14} aria-hidden="true" /> JPEG ·{" "}
                        {formatBytes(shot.downloadBytes)}
                      </a>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section id="logo-and-icon" aria-labelledby="logo-title">
              <h2 id="logo-title">Logo and icon</h2>
              <div className={styles.assets}>
                {[
                  {
                    asset: logo,
                    figure: styles.assetLogo,
                    sizes: "(max-width: 900px) 88vw, 460px",
                  },
                  {
                    asset: icon,
                    figure: styles.assetIcon,
                    image: styles.iconImage,
                    sizes: "128px",
                  },
                  {
                    asset: capsule,
                    figure: styles.assetWide,
                    sizes: "(max-width: 900px) 88vw, 736px",
                  },
                ].map(({ asset, figure, image, sizes }) => (
                  <figure
                    key={asset.download}
                    className={`${styles.asset} ${figure}`}
                  >
                    <a
                      href={asset.download}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open the full-size ${asset.title.toLowerCase()}`}
                    >
                      <Image
                        src={asset.src}
                        width={asset.width}
                        height={asset.height}
                        sizes={sizes}
                        alt={asset.alt}
                        className={image}
                      />
                    </a>
                    <figcaption>
                      <span>
                        <strong>{asset.title}</strong> · {asset.note},{" "}
                        {asset.width} × {asset.height}
                      </span>
                      <a
                        className={styles.download}
                        href={asset.download}
                        download
                        aria-label={`Download the ${asset.title.toLowerCase()}, ${formatBytes(asset.downloadBytes)}`}
                      >
                        <Download size={14} aria-hidden="true" />{" "}
                        {asset.download.endsWith(".png") ? "PNG" : "JPEG"} ·{" "}
                        {formatBytes(asset.downloadBytes)}
                      </a>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section id="about-the-art" aria-labelledby="art-title">
              <h2 id="art-title">About the art</h2>
              <blockquote className={styles.quote}>
                <p>{aboutTheArt.join(" ")}</p>
              </blockquote>
            </section>

            <section id="press-contact" aria-labelledby="contact-title">
              <h2 id="contact-title">Contact</h2>
              <p>
                For press and interview requests, email{" "}
                <a href={pressHref}>{gameContactEmail}</a>.
              </p>
              <p>
                The game’s page is{" "}
                <Link href={gamePaths.game}>
                  {websiteUrl.replace("https://", "")}
                </Link>
                , with <Link href={gamePaths.support}>support</Link> and the{" "}
                <Link href={gamePaths.privacy}>privacy policy</Link> beside it.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
