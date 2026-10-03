import { ArrowUpRight } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { contactEmail, emailHref, telegramHref } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
import styles from "@/components/enquiry-form.module.css";

export const metadata = pageMetadata({
  title: "Contact us about your project",
  description:
    "Discuss a website, product interface or security audit with Cavies Studio. Prepare a project enquiry on your device, or contact us by email or Telegram.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main id="main" className={`section-shell ${styles.page}`}>
        <header className={styles.heading}>
          <span className="eyebrow">START A CONVERSATION</span>
          <h1>
            Tell us what you’re <em>building.</em>
          </h1>
          <p>
            A new website, a better product interface, or a security review.
            Share a little context so we can discuss a useful next step.
          </p>
        </header>
        <div className={styles.layout}>
          <aside
            className={styles.contactOptions}
            aria-labelledby="direct-contact-title"
          >
            <h2 id="direct-contact-title">Talk to us directly</h2>
            <p>
              No form needed. Email or message us with your project and
              priorities.
            </p>
            <a href={emailHref}>
              {contactEmail} <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href={telegramHref} target="_blank" rel="noopener noreferrer">
              Telegram <ArrowUpRight size={18} aria-hidden="true" />
              <span className={styles.srOnly}> (opens a new tab)</span>
            </a>
            <p className={styles.nextStep}>
              We’ll discuss fit, scope and next steps before agreeing on any
              work.
            </p>
          </aside>
          <EnquiryForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
