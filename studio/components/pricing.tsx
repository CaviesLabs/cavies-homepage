import { ArrowUpRight, Braces, Layers2, ShieldCheck } from "lucide-react";

const plans = [
  {
    name: "Design",
    price: "$7,500",
    label: "DESIGNED. DELIVERED AS UI CODE.",
    icon: Layers2,
    description:
      "Distinctive product interfaces, delivered as frontend code for your team to integrate.",
    items: [
      "Product & interface design",
      "Responsive UI components",
      "Interactive states & motion",
      "Frontend code handoff",
    ],
    scope:
      "UI code only. Application engineering and integration stay with your team.",
    action: "Discuss design",
    subject: "Design — $7,500/month",
  },
  {
    name: "Design engineering",
    price: "$15,000",
    label: "FROM INTERFACE TO INTEGRATION.",
    icon: Braces,
    description:
      "Design and frontend engineering together, integrated into your existing application.",
    items: [
      "Everything in Design",
      "Production frontend engineering",
      "API & authentication integration",
      "QA, refinement & release support",
    ],
    scope:
      "We work in your codebase and connect to your existing backend and infrastructure.",
    action: "Discuss your product",
    subject: "Design engineering — $15,000/month",
    featured: true,
  },
  {
    name: "Security audit",
    price: "$15,000",
    label: "CLEAR FINDINGS. PRACTICAL NEXT STEPS.",
    icon: ShieldCheck,
    description:
      "Focused security reviews for web applications and smart contracts, scoped separately.",
    items: [
      "Agreed application or contract scope",
      "Security review & targeted testing",
      "Prioritized findings report",
      "Remediation guidance & fix verification",
    ],
    scope:
      "Web-application and smart-contract reviews are scoped separately before kickoff.",
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
          <span className="eyebrow">MONTHLY ENGAGEMENTS</span>
          <h2 id="pricing-title">
            Good work.
            <br />
            <em>Clear pricing.</em>
          </h2>
        </div>
        <p>
          Choose the part of your product you want us to own. One monthly fee,
          with scope and priorities agreed together.
        </p>
      </div>
      <div className="pricing-grid">
        {plans.map((plan) => (
          <article
            className={`pricing-plan${plan.featured ? " pricing-plan-featured" : ""}`}
            key={plan.name}
          >
            <div className="pricing-plan-top">
              <plan.icon size={26} strokeWidth={1.3} />
              <span>{plan.label}</span>
            </div>
            <h3>{plan.name}</h3>
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
            <p className="plan-scope">{plan.scope}</p>
            <a
              href={`mailto:tin@cavies.xyz?subject=${encodeURIComponent(plan.subject)}`}
              className="plan-action"
            >
              {plan.action}
              <ArrowUpRight size={18} />
            </a>
          </article>
        ))}
      </div>
      <div className="pricing-footnote">
        <span>Monthly fees in USD.</span>
        <p>Scope, capacity, and priorities agreed before kickoff.</p>
      </div>
    </section>
  );
}
