import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Layers2,
  Workflow,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { ProjectIndex } from "@/components/project-index";
import { Pricing } from "@/components/pricing";
import { ReflectiveMark } from "@/components/reflective-mark";
import {
  emailHref,
  projects,
  collaborations,
  allProjects,
} from "@/lib/projects";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const services = [
  {
    number: "01",
    icon: Layers2,
    title: "Product design",
    description:
      "Turn a complex product into an experience that makes sense from the first click.",
    items: [
      "UX & interface design",
      "Interactive prototypes",
      "Design systems & visual identity",
    ],
  },
  {
    number: "02",
    icon: Braces,
    title: "Frontend engineering",
    description:
      "Bring every detail to life with fast, responsive interfaces built for real use.",
    items: [
      "Production-ready web interfaces",
      "Motion & micro-interactions",
      "Responsive, accessible components",
    ],
  },
  {
    number: "03",
    icon: Workflow,
    title: "Product integration",
    description:
      "Connect the experience to your existing product, with your engineers in the loop.",
    items: [
      "API & authentication integration",
      "Implementation in your codebase",
      "QA, refinement & handover",
    ],
  },
];
const faqs = [
  [
    "What kind of teams do you work with?",
    "Startups with a product to launch, an interface to improve, or a frontend roadmap that needs more attention. We work best with founders and engineering teams who care about how their product feels.",
  ],
  [
    "Can you work with our existing product?",
    "Yes. We can start with your existing designs and frontend, or help rethink a specific experience. We agree on the scope and technical constraints with your team before implementation.",
  ],
  [
    "Do you build the backend too?",
    "Our studio focuses on product design, frontend engineering, and integration with your existing APIs and infrastructure. Your backend team stays involved where the interface depends on their work.",
  ],
  [
    "How do engagements and pricing work?",
    "Design is $7,500 per month. Design engineering with integration is $15,000 per month, and Security audit is $15,000 per month. All prices are in USD. We agree on the scope, monthly capacity, and priorities before starting.",
  ],
  [
    "What is included in Design, compared with Design engineering?",
    "Design gives your team the interface and frontend UI code, including responsive components, interactive states, and motion. Your engineers handle application logic, production engineering, and integration. Design engineering adds that frontend engineering and integration work inside your existing application.",
  ],
  [
    "Do you audit web applications and smart contracts?",
    "Yes. Web-application and smart-contract audits are scoped separately. We agree on the code, assets, testing depth, and deliverables for each scope before kickoff. The engagement includes prioritized findings, remediation guidance, and fix verification within the agreed scope.",
  ],
  [
    "What should we bring to the first conversation?",
    "A link to your product, the problem you want to solve, and any timing you have in mind. An early idea is fine too. Email Tin or start a conversation on Telegram.",
  ],
];

export default function Home() {
  return (
    <>
      <Navigation workCount={allProjects.length} />
      <main id="main">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-topline">
            <span className="eyebrow">
              <span className="tiny-star">✳</span> DESIGN MEETS ENGINEERING
            </span>
            <span className="hero-location">
              Independent studio.
              <br />
              Built to work with your team.
            </span>
          </div>
          <div className="hero-main">
            <div className="hero-copy">
              <h1 id="hero-title">
                Ambitious products.
                <br />
                <em>Exceptional interfaces.</em>
              </h1>
              <p className="hero-intro">
                We design and build the part of your product people fall in love
                with. From first idea to frontend, beautifully connected.
              </p>
              <div className="hero-actions">
                <a className="text-link" href="#work">
                  <span className="round-icon">
                    <ArrowDown size={19} />
                  </span>
                  Explore our work
                </a>
                <a className="hero-pricing-link" href="#pricing">
                  Plans from $7,500 / month <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
            <div className="hero-art">
              <ReflectiveMark />
              <span className="hero-art-caption" aria-hidden="true">
                A DIFFERENT PERSPECTIVE.
              </span>
            </div>
          </div>
        </section>
        <section className="showreel" aria-label="Featured product interfaces">
          <div className="showreel-grid" aria-hidden="true" />
          <span className="reel-note">A FEW THINGS WE’VE DESIGNED & BUILT</span>
          <Link
            href="/work/schlong"
            className="reel-panel reel-left"
            aria-label="Explore the Schlong project"
          >
            <div className="browser-bar">
              <i />
              <i />
              <i />
              <span>Schlong — A world of its own</span>
              <ArrowUpRight size={12} />
            </div>
            <Image
              src="/work/schlong.webp"
              width={1600}
              height={1000}
              alt="Schlong pixel-art game, shown on its public testnet"
              priority
              sizes="(max-width: 700px) 60vw, 42vw"
            />
          </Link>
          <Link
            href="/work/heavendash"
            className="reel-panel reel-center"
            aria-label="Explore the HeavenDash project"
          >
            <div className="browser-bar">
              <i />
              <i />
              <i />
              <span>HeavenDash — A clearer view of the data</span>
              <ArrowUpRight size={12} />
            </div>
            <Image
              src="/work/heavendash.webp"
              width={1600}
              height={1000}
              alt="HeavenDash rankings and fee dashboard with labeled sample data"
              priority
              sizes="(max-width: 700px) 82vw, 51vw"
            />
          </Link>
          <Link
            href="/work/claimhq"
            className="reel-panel reel-right"
            aria-label="Explore the ClaimHQ project"
          >
            <div className="browser-bar">
              <i />
              <i />
              <i />
              <span>ClaimHQ — From eligible to claimed</span>
              <ArrowUpRight size={12} />
            </div>
            <Image
              src="/work/claimhq.webp"
              width={1440}
              height={870}
              alt="ClaimHQ airdrop and reward-distribution frontend"
              priority
              sizes="(max-width: 700px) 60vw, 42vw"
            />
          </Link>
          <span className="reel-sticker">
            Made to work.
            <br />
            <em>Built to feel.</em>
            <ArrowDownRight size={24} />
          </span>
          <span className="reel-bottom">
            PRODUCT THINKING. PIXEL-LEVEL CARE.
          </span>
        </section>
        <section
          className="collaborators section-shell"
          aria-label="Past advisory and collaboration work"
        >
          <p>Good company along the way.</p>
          <div className="collaborator-names">
            <Link href="/work/ancient8" className="ancient-name">
              Ancient8
            </Link>
            <Link href="/work/solscan" className="solscan-name">
              <span aria-hidden="true">▰</span> SOLSCAN
            </Link>
          </div>
          <span className="collaborator-note">
            Past product advisory
            <br />& collaboration
          </span>
        </section>
        <Pricing />
        <section id="work" className="work-section section-shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">01 / SELECTED WORK</span>
              <h2>
                Different products.
                <br />
                Same <em>attention to detail.</em>
              </h2>
            </div>
            <p>
              A selection from the Cavies team’s
              <br />
              product-building journey.
            </p>
          </div>
          <div className="project-grid">
            {projects.slice(0, 8).map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
          {projects.length > 8 && (
            <div className="more-work">
              <span className="eyebrow">MORE FROM OUR PRODUCT PORTFOLIO</span>
              <ProjectIndex projects={projects.slice(8)} offset={8} />
            </div>
          )}
          <div id="collaborations" className="collaboration-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">PAST ADVISORY & COLLABORATION</span>
                <h2>
                  Good teams.
                  <br />
                  <em>Shared experience.</em>
                </h2>
              </div>
              <p>
                Our team has also worked alongside Ancient8 and Solscan as
                product advisors and collaborators. Current websites shown for
                context.
              </p>
            </div>
            <div className="project-grid">
              {collaborations.map((project) => (
                <ProjectCard project={project} key={project.slug} />
              ))}
            </div>
          </div>
          <div className="work-footnote">
            <span>
              Explorers, financial tools, games, and consumer experiences.
            </span>
            <a href={emailHref}>
              Your product could be next <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
        <section id="expertise" className="expertise-section section-shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">02 / WHAT WE DO</span>
              <h2>
                The whole interface.
                <br />
                <em>One team.</em>
              </h2>
            </div>
            <p>
              From the way it looks to the way it works.
              <br />
              We stay with the details all the way through.
            </p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article key={service.number} className="service">
                <div className="service-top">
                  <span>{service.number}</span>
                  <service.icon size={33} strokeWidth={1.2} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>
                      <span>↳</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
        <section id="studio" className="studio-section">
          <div className="studio-main">
            <span className="eyebrow">03 / THE STUDIO</span>
            <h2>
              Product people.
              <br />
              With a thing
              <br />
              for <em>the details.</em>
            </h2>
            <div className="studio-caption">
              <span className="studio-spark" aria-hidden="true">
                ✳
              </span>
              <p>
                The team behind Cavies Labs.
                <br />A new focus. The same curiosity.
              </p>
            </div>
          </div>
          <div className="studio-copy">
            <span className="small-label">
              SMALL ENOUGH TO CARE. EXPERIENCED ENOUGH TO SHIP.
            </span>
            <p className="studio-lead">
              We’ve built products of our own. We know what it takes to get
              yours out into the world.
            </p>
            <p>
              Cavies Studio brings our product design and frontend team together
              around a focused mission: make ambitious software feel intuitive,
              distinctive, and ready for real people.
            </p>
            <p>
              We work alongside your team, understand what you’re building, and
              take ownership of the interface—from early explorations to the
              code that brings it to life.
            </p>
            <a className="text-link" href={emailHref}>
              Meet your next collaborators <ArrowUpRight size={19} />
            </a>
            <Image
              src="/brand/sleeping-cavy.png"
              width={115}
              height={90}
              alt=""
              className="studio-cavy"
            />
          </div>
        </section>
        <section className="process-section section-shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">04 / HOW WE WORK</span>
              <h2>
                Less distance between
                <br />
                <em>idea and interface.</em>
              </h2>
            </div>
          </div>
          <div className="process-grid">
            {[
              [
                "01",
                "Get into your world",
                "We dig into your product, users, and the interface problem worth solving. Together, we set a clear scope.",
              ],
              [
                "02",
                "Make it tangible",
                "We explore the design and turn it into something you can click, discuss, and refine with us.",
              ],
              [
                "03",
                "Deliver your interface",
                "Design ends with UI code for your team. With Design engineering, we also integrate and verify the frontend in your application.",
              ],
            ].map(([n, title, body]) => (
              <article className="process-step" key={n}>
                <div>
                  <span>{n}</span>
                  <ArrowUpRight size={23} />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="faq-section section-shell">
          <div>
            <span className="eyebrow">A LITTLE MORE CONTEXT</span>
            <h2>
              Good <em>questions.</em>
            </h2>
            <p>
              Something else on your mind?
              <br />
              <a href={emailHref}>
                Just ask us <ArrowUpRight size={15} />
              </a>
            </p>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span className="faq-plus" aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
