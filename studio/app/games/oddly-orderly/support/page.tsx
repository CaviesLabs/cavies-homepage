import { Fragment } from "react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { GameSubnav } from "@/components/game-subnav";
import { Navigation } from "@/components/navigation";
import { StructuredData } from "@/components/structured-data";
import { gameContactEmail, gameContactHref } from "@/lib/contact";
import { gameName, gamePaths, socialImage } from "@/lib/oddly-orderly";
import { pageMetadata } from "@/lib/seo";
import { gameSubpageStructuredData } from "@/lib/structured-data";
import styles from "../game.module.css";

const path = gamePaths.support;
const title = "Oddly Orderly support";
const description =
  "Help with Oddly Orderly: how to reach us, where your progress is saved, starting over, playtest notes, the accessibility settings and refunds.";

export const metadata = pageMetadata({
  title,
  description,
  path,
  image: socialImage,
});

const sections = [
  ["get-in-touch", "Get in touch"],
  ["saves", "Where your progress is saved"],
  ["starting-over", "Starting over"],
  ["playtest-notes", "Playtest notes"],
  ["accessibility", "Accessibility settings"],
  ["refunds", "Refunds"],
] as const;

/** The desktop builds' save folders: the game's own folder in each system's app data. */
const saveFolders: {
  system: string;
  folder: string;
  also?: [string, string];
}[] = [
  {
    system: "Windows",
    folder: "%APPDATA%\\Oddly Orderly\\",
    also: ["usually", "C:\\Users\\<you>\\AppData\\Roaming\\Oddly Orderly\\"],
  },
  {
    system: "macOS",
    folder: "~/Library/Application Support/Oddly Orderly/",
  },
  {
    system: "Linux and Steam Deck",
    folder: "~/.local/share/Oddly Orderly/",
    also: ["or, if XDG_DATA_HOME is set,", "$XDG_DATA_HOME/Oddly Orderly/"],
  },
];

const settings = [
  [
    "Reduced motion",
    "Calmer animations and page turns. The magpie fades in instead of flying, keeps still and takes nothing.",
  ],
  [
    "Colour assist patterns",
    "Marks on the things whose colour matters, so a page sorted by colour can be tidied without telling the colours apart.",
  ],
  ["The magpie visits", "Turn it off and the magpie stays away."],
  ["Vibration", "Controller rumble, off unless you turn it on."],
  [
    "Extra TV margin",
    "Moves the buttons in from the screen’s edges, for a TV that crops the picture.",
  ],
  ["Sound effects and Music", "Separate volumes."],
  ["Cursor speed", "How fast the controller’s cursor moves."],
] as const;

const supportHref = gameContactHref("Oddly Orderly support");

export default function SupportPage() {
  return (
    <>
      <StructuredData
        data={gameSubpageStructuredData({
          path,
          name: "Support",
          description,
          game: { name: gameName, path: gamePaths.game },
        })}
      />
      <Navigation />
      <main id="main">
        <GameSubnav current="support" />
        <header className={`${styles.pageHeader} section-shell`}>
          <span className="eyebrow">ODDLY ORDERLY</span>
          <h1>Support</h1>
          <p className={styles.lead}>
            Stuck on something, or found something wrong? Write to us, and we’ll
            help.
          </p>
        </header>
        <div className={`${styles.layout} section-shell`}>
          <nav
            className={`${styles.aside} ${styles.toc}`}
            aria-labelledby="support-toc-title"
          >
            <h2 id="support-toc-title">ON THIS PAGE</h2>
            <ol>
              {sections.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`}>{label}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div className={styles.prose}>
            <section id="get-in-touch" aria-labelledby="get-in-touch-title">
              <h2 id="get-in-touch-title">Get in touch</h2>
              <p>
                Email <a href={supportHref}>{gameContactEmail}</a>. It helps to
                tell us:
              </p>
              <ul>
                <li>
                  the platform you play on: Windows, macOS, Linux or Steam Deck;
                </li>
                <li>what happened, and what you expected to happen;</li>
                <li>
                  which page you were on. Its name shows as the page opens, and
                  in the journal.
                </li>
              </ul>
              <p>A screenshot helps too, if you can take one.</p>
            </section>

            <section id="saves" aria-labelledby="saves-title">
              <h2 id="saves-title">Where your progress is saved</h2>
              <p>
                The game keeps your rosettes, the last page you played, the
                magpie’s treasures and your settings in a folder of its own:
              </p>
              <table className={styles.places}>
                <thead>
                  <tr>
                    <th scope="col">SYSTEM</th>
                    <th scope="col">FOLDER</th>
                  </tr>
                </thead>
                <tbody>
                  {saveFolders.map(({ system, folder, also }) => (
                    <tr key={system}>
                      <th scope="row">{system}</th>
                      <td>
                        <code>{folder}</code>
                        {also && (
                          <>
                            <br />
                            {also[0]} <code>{also[1]}</code>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>
                Your progress is <code>oddly_orderly.json</code>, and{" "}
                <code>oddly_orderly.backup.json</code> is the save before it.
                With Steam Cloud on, Steam keeps a copy of both, so your
                progress follows you to another computer; you can turn Steam
                Cloud off for the game in Steam. Playtest notes are never
                synced.
              </p>
            </section>

            <section id="starting-over" aria-labelledby="starting-over-title">
              <h2 id="starting-over-title">Starting over</h2>
              <p>
                Open Settings › Clear all rosettes, then press it again to
                confirm. It clears every rosette, the last page and the magpie’s
                treasures, and keeps your settings. Steam achievements stay
                earned.
              </p>
            </section>

            <section id="playtest-notes" aria-labelledby="playtest-notes-title">
              <h2 id="playtest-notes-title">Playtest notes</h2>
              <p>
                Playtest notes are off unless you turn them on in Settings.
                While they’re on, the game keeps a note of how each page went,
                on your computer only, and never sends it anywhere.{" "}
                <Link href={`${gamePaths.privacy}#optional-playtest-notes`}>
                  The privacy policy
                </Link>{" "}
                lists everything a note holds.
              </p>
              <p>
                Settings › Playtest notes › Save a copy puts a copy on your
                Desktop (or in Documents) for you to send to whoever runs the
                playtest. To delete the notes, choose Settings › Playtest notes
                › Delete notes.
              </p>
            </section>

            <section id="accessibility" aria-labelledby="accessibility-title">
              <h2 id="accessibility-title">Accessibility settings</h2>
              <p>
                Every action works with a mouse, a controller or the keyboard,
                and each is a press, never a hold or a chord. There are no
                timers or fail states, a hint is there whenever you want one,
                and any page can be skipped. In Settings:
              </p>
              <dl className={styles.settings}>
                {settings.map(([name, effect]) => (
                  <Fragment key={name}>
                    <dt>{name}</dt>
                    <dd>{effect}</dd>
                  </Fragment>
                ))}
              </dl>
            </section>

            <section id="refunds" aria-labelledby="refunds-title">
              <h2 id="refunds-title">Refunds</h2>
              <p>
                Refunds go through the store you bought the game from. On Steam,
                ask through{" "}
                <a
                  href="https://help.steampowered.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Steam Support
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
