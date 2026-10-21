"use client";

import { useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Contact from "@/components/Contact";
import { useLang } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/dict";
import type { LegalDoc } from "@/lib/legal";

/* Shared layout for /privacy, /terms and /founding.
   Both languages are rendered into the page (good for search engines and no
   flash on load); the BM | EN toggle just shows one. BM is the default, a
   visitor's choice is remembered, and ?lang=en in a link opens English. */
export default function LegalPage({ docs }: { docs: Record<Lang, LegalDoc> }) {
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "en" || q === "ms") setLang(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = `${docs[lang].title} · tutur`;
  }, [lang, docs]);

  return (
    <>
      <header className="legal-hero">
        <div className="wrap legal-bar">
          <Link href="/" className="logo" aria-label={t.legalPage.home}>
            <Logo variant="white" className="legal-logo" />
          </Link>
          <div className="lang-toggle on-dark" role="group" aria-label={t.legalPage.langLabel}>
            <button type="button" className={lang === "ms" ? "on" : ""} aria-pressed={lang === "ms"} onClick={() => setLang("ms")}>
              BM
            </button>
            <button type="button" className={lang === "en" ? "on" : ""} aria-pressed={lang === "en"} onClick={() => setLang("en")}>
              EN
            </button>
          </div>
        </div>
        {(["ms", "en"] as const).map((l) => (
          <div key={l} className="wrap legal-head" hidden={l !== lang} lang={l}>
            {docs[l].eyebrow && <p className="legal-eyebrow">{docs[l].eyebrow}</p>}
            <h1>{docs[l].title}</h1>
            <p className="legal-version">{docs[l].version}</p>
          </div>
        ))}
      </header>

      <main className="legal-main">
        {(["ms", "en"] as const).map((l) => (
          <article
            key={l}
            lang={l}
            hidden={l !== lang}
            className="legal-body"
            dangerouslySetInnerHTML={{ __html: docs[l].html }}
          />
        ))}
      </main>

      <Contact />
    </>
  );
}
