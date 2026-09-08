import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { emailHref, telegramHref } from "@/lib/projects";

export function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-top">
        <span className="eyebrow">
          <span className="status-dot" /> A GOOD PLACE TO START
        </span>
        <span className="footer-note">Tell us what you’re building.</span>
      </div>
      <div className="footer-title">
        <h2>
          Let’s make
          <br />
          something <em>click.</em>
        </h2>
        <a
          href={emailHref}
          className="contact-orb"
          aria-label="Email Tin to start a project"
        >
          <ArrowUpRight strokeWidth={1.2} />
        </a>
      </div>
      <div className="contact-links">
        <a href={emailHref}>
          tin@cavies.xyz <ArrowUpRight size={18} />
        </a>
        <a href={telegramHref} target="_blank" rel="noopener noreferrer">
          Say hello on Telegram <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="footer-bottom">
        <Link href="/" className="wordmark">
          <Image src="/brand/cavies-mark.png" width={31} height={27} alt="" />
          <span>
            cavies<span className="wordmark-studio">studio</span>
          </span>
        </Link>
        <span>Independent minds. Thoughtful interfaces.</span>
        <div>
          <a
            href="https://github.com/CaviesLabs"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowUpRight size={13} />
          </a>
          <span>© {new Date().getFullYear()} Cavies</span>
        </div>
      </div>
    </footer>
  );
}
