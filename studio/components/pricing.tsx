import { ArrowUpRight, Braces, Layers2, ShieldCheck } from "lucide-react";
import { inquiryHref } from "@/lib/contact";

const plans = [
  {
    name: "Design",
    price: "$7,500",
    icon: Layers2,
    description:
      "Interface design and frontend UI code. Your team handles integration.",
    items: [
      "Responsive UI components",
      "Interactive states & motion",
      "Frontend code handoff",
    ],
    action: "Discuss design",
    subject: "Design — $7,500/month",
  },
  {
    name: "Design engineering",
    price: "$15,000",
    icon: Braces,
    description:
      "Design and production frontend code, integrated into your app.",
    items: [
      "Everything in Design",
      "API & authentication integration",
      "QA, refinement & release support",
    ],
    action: "Discuss your product",
    subject: "Design engineering — $15,000/month",
    featured: true,
  },
  {
    name: "Security audit",
    price: "$15,000",
    icon: ShieldCheck,
    description:
      "Security review with prioritized findings and remediation guidance.",
    items: [
      "Code and application review",
      "Targeted security testing",
      "Fix verification",
    ],
    action: "Scope an audit",
    subject: "Security audit — $15,000/month",
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
              <span>{plan.price}</span>
              <span>USD / month</span>
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
        <p>Scope and monthly capacity agreed before kickoff.</p>
      </div>
    </section>
  );
}
