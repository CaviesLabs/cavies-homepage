import { ArrowUpRight, Braces, Layers2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { businessWebsitesHref } from "@/lib/contact";
import { scopeContactHref, type HelpId } from "@/lib/project-scope";
import { ScopeBuilder } from "./scope-builder";

const plans: {
  name: string;
  icon: typeof Layers2;
  help: HelpId;
  description: string;
  items: string[];
  action: string;
  detailsHref?: string;
  featured?: boolean;
}[] = [
  {
    name: "Websites",
    icon: Layers2,
    help: "website",
    description:
      "Business websites, landing pages, and redesigns, with a focused monthly scope.",
    items: [
      "Responsive website design",
      "Frontend build & launch",
      "Ongoing improvements",
    ],
    action: "Discuss your website",
    detailsHref: businessWebsitesHref,
  },
  {
    name: "Product interfaces",
    icon: Braces,
    help: "product",
    description:
      "Design and frontend development for apps, dashboards, and customer portals.",
    items: [
      "UI design or full implementation",
      "API & authentication integration",
      "QA, refinement & release support",
    ],
    action: "Discuss your product",
    featured: true,
  },
  {
    name: "Security audit",
    icon: ShieldCheck,
    help: "audit",
    description:
      "Security review with prioritized findings and remediation guidance.",
    items: [
      "Code and application review",
      "Targeted security testing",
      "Fix verification",
    ],
    action: "Scope an audit",
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="pricing-section section-shell"
      aria-labelledby="pricing-title"
    >
      <div className="section-heading pricing-heading">
        <div>
          <h2 id="pricing-title">
            Monthly <em>plans.</em>
          </h2>
        </div>
      </div>
      <div className="pricing-grid">
        {plans.map((plan) => (
          <article
            className={`pricing-plan${plan.featured ? " pricing-plan-featured" : ""}`}
            key={plan.name}
          >
            <div className="pricing-plan-top">
              <h3>{plan.name}</h3>
              <plan.icon size={26} strokeWidth={1.3} />
            </div>
            <div className="plan-price">
              <span>Monthly</span>
              <span>Tailored quote</span>
            </div>
            <p className="plan-description">{plan.description}</p>
            <span className="plan-divider" />
            <ul>
              {plan.items.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">↳</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={scopeContactHref({ help: plan.help })}
              className="plan-action"
            >
              {plan.action}
              <ArrowUpRight size={18} />
            </Link>
            {plan.detailsHref && (
              <Link href={plan.detailsHref} className="plan-details">
                What’s included <ArrowUpRight size={15} />
              </Link>
            )}
          </article>
        ))}
      </div>
      <ScopeBuilder />
    </section>
  );
}
