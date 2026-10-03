"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { businessWebsitesHref, contactHref } from "@/lib/contact";

export function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <Link
          href="/"
          className="wordmark"
          aria-label="Cavies Studio home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/cavies-mark.png"
            width={39}
            height={34}
            alt=""
            priority
          />
          <span>
            cavies<span className="wordmark-studio">studio</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href={businessWebsitesHref}>Websites</Link>
          <Link href="/#work">Work</Link>
          <Link href="/#pricing">Plans</Link>
        </nav>
        <Link href={contactHref} className="button button-small header-contact">
          Let’s talk <ArrowUpRight size={17} />
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        {open && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setOpen(false);
                document
                  .querySelector<HTMLButtonElement>(".menu-toggle")
                  ?.focus();
              }
            }}
          >
            <Link onClick={() => setOpen(false)} href={businessWebsitesHref}>
              Websites <ArrowUpRight />
            </Link>
            <Link onClick={() => setOpen(false)} href="/#work">
              Work <ArrowUpRight />
            </Link>
            <Link onClick={() => setOpen(false)} href="/#pricing">
              Plans <ArrowUpRight />
            </Link>
            <Link onClick={() => setOpen(false)} href={contactHref}>
              Let’s talk <ArrowUpRight />
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
