import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  businessWebsitesHref,
  contactEmail,
  contactHref,
  emailHref,
  telegramHref,
} from "@/lib/contact";
import { linkedInUrl, xUrl } from "@/lib/seo";

export function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-title">
        <h2>
          Let’s <em>talk.</em>
        </h2>
        <Link
          href={contactHref}
          className="contact-orb"
          aria-label="Discuss your project"
        >
          <ArrowUpRight strokeWidth={1.2} />
        </Link>
      </div>
      <div className="contact-links">
        <Link href={contactHref}>
          Prepare an enquiry <ArrowUpRight size={18} />
        </Link>
        <a href={emailHref}>
          {contactEmail} <ArrowUpRight size={18} />
        </a>
        <a href={telegramHref} target="_blank" rel="noopener noreferrer">
          Telegram <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="footer-bottom">
        <Link href="/" className="wordmark">
          <Image src="/brand/cavies-mark.png" width={31} height={27} alt="" />
          <span>
            cavies<span className="wordmark-studio">studio</span>
          </span>
        </Link>
        <div>
          <nav className="footer-nav" aria-label="Footer">
            <Link href={businessWebsitesHref}>Websites</Link>
            <Link href="/work">Work</Link>
            <Link href="/#games">Games</Link>
            <Link href="/#pricing">Plans</Link>
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={xUrl} target="_blank" rel="noopener noreferrer">
              X
            </a>
          </nav>
          <span>© {new Date().getFullYear()} Cavies</span>
        </div>
      </div>
    </footer>
  );
}
