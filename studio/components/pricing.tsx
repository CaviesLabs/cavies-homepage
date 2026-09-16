import { ArrowUpRight, Braces, Layers2, ShieldCheck } from "lucide-react";
import { inquiryHref } from "@/lib/contact";

const plans = [
  {
    name: "Websites",
    icon: Layers2,
    description:
      "Business websites, landing pages, and redesigns, with a focused monthly scope.",
    items: [
      "Responsive website design",
      "Frontend build & launch",
      "Ongoing improvements",
    ],
    action: "Discuss your website",
    subject: "Website monthly plan",
  },
  {
    name: "Product interfaces",
    icon: Braces,
    description:
      "Design and frontend development for apps, dashboards, and customer portals.",
    items: [
      "UI design or full implementation",
      "API & authentication integration",
      "QA, refinement & release support",
    ],
    action: "Discuss your product",
    subject: "Product interface monthly plan",
    featured: true,
  },
  {
    name: "Security audit",
    icon: ShieldCheck,
    description:
      "Security review with prioritized findings and remediation guidance.",
    items: [
      "Code and application review",
      "Targeted security testing",
      "Fix verification",
    ],
    action: "Scope an audit",
    subject: "Security audit monthly plan",
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
            <a href={inquiryHref(plan.subject)} className="plan-action">
              {plan.action}
              <ArrowUpRight size={18} />
            </a>
          </article>
        ))}
      </div>
      <div className="pricing-footnote">
        <p>Scope, monthly fee, and delivery capacity agreed before kickoff.</p>
      </div>
    </section>
  );
}
