"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { useLang } from "@/components/LanguageProvider";
import { contact } from "@/lib/dict";
import SocialIcons from "@/components/SocialIcons";

/* Hubungi Kami + the tutur legal line are ONE section: contact details at the
   top (with a purple divider under the heading), tutur logo + legal at the
   bottom. */
export default function Contact() {
  const { t } = useLang();
  return (
    <section className="contact" id="contact">
      <div className="wrap contact-inner">
        <div className="contact-top">
          <h2 className="contact-title">{t.contact.title}</h2>
          <hr className="contact-rule" />
          <div className="contact-grid">
            <div className="contact-col">
              <p className="contact-label">{t.contact.phoneLabel}</p>
              <a href={contact.phoneHref} className="contact-value">
                {contact.phone}
              </a>
            </div>

            <div className="contact-col">
              <p className="contact-label">{t.contact.emailLabel}</p>
              <a href={contact.emailHref} className="contact-value">
                {contact.email}
              </a>
            </div>

            <div className="contact-col">
              <p className="contact-label">{t.contact.addressLabel}</p>
              <address className="contact-value address">
                {contact.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>

            <div className="contact-col contact-follow">
              <p className="contact-label">{t.contact.followLabel}</p>
              <SocialIcons />
            </div>
          </div>
        </div>

        <div className="contact-foot">
          <Logo variant="color" className="foot-logo" />
          {/* /founding is deliberately NOT linked here — it's shared directly
              with Founding Families. */}
          <nav className="foot-links" aria-label="Legal">
            <Link href="/privacy">{t.footer.privacy}</Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms">{t.footer.terms}</Link>
          </nav>
          <p className="foot-legal">{t.footer.legal}</p>
        </div>
      </div>
    </section>
  );
}
