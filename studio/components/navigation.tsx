"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { emailHref } from "@/lib/projects";

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
          <Link href="/#work">
            Work <span>08</span>
          </Link>
          <Link href="/#expertise">Expertise</Link>
          <Link href="/#studio">The studio</Link>
        </nav>
        <a href={emailHref} className="button button-small header-contact">
          Let’s talk <ArrowUpRight size={17} />
        </a>
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
          >
            <Link onClick={() => setOpen(false)} href="/#work">
              Work <ArrowUpRight />
            </Link>
            <Link onClick={() => setOpen(false)} href="/#expertise">
              Expertise <ArrowUpRight />
            </Link>
            <Link onClick={() => setOpen(false)} href="/#studio">
              The studio <ArrowUpRight />
            </Link>
            <a href={emailHref}>
              Let’s talk <ArrowUpRight />
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
