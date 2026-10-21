import { readFileSync } from "node:fs";
import path from "node:path";
import type { Lang } from "@/lib/dict";

/* Legal documents live as plain Markdown in /content/legal/<slug>.<lang>.md.
   Edit those files to change the copy — the page addresses (/privacy, /terms,
   /founding) never change. This file turns the Markdown into HTML at build time.

   Supported formatting (kept deliberately small):
     ## Heading            section heading
     ### Sub-heading       sub-heading
     - item                bullet list
     1.1 Text / F1. Text   numbered clause (number shown in the margin)
     > ...                 highlighted box (e.g. "The short version")
     **bold**              bold
   Emails and tutur.my/... addresses become links automatically. */

export type LegalSlug = "privacy" | "terms" | "founding";

export type LegalDoc = {
  title: string;
  eyebrow: string;
  version: string;
  html: string;
};

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inline(raw: string) {
  let s = esc(raw);
  s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(
    /\b([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g,
    '<a href="mailto:$1">$1</a>'
  );
  s = s.replace(/\btutur\.my\/(privacy|terms|founding)\b/g, '<a href="/$1">tutur.my/$1</a>');
  return s;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const CLAUSE_RE = /^((?:\d+\.\d+)|(?:F\d+\.))\s+(.*)$/;

function renderBlocks(lines: string[]): string {
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();
    if (!t) {
      i++;
      continue;
    }
    if (t.startsWith(">")) {
      const inner: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        inner.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      out.push(`<aside class="legal-callout">${renderBlocks(inner)}</aside>`);
      continue;
    }
    if (t.startsWith("### ")) {
      out.push(`<h3>${inline(t.slice(4))}</h3>`);
      i++;
      continue;
    }
    if (t.startsWith("## ")) {
      const text = t.slice(3);
      const num = text.match(/^(\d+)\./)?.[1];
      const id = num ? `s${num}` : slugify(text);
      out.push(`<h2 id="${id}">${inline(text)}</h2>`);
      i++;
      continue;
    }
    if (t.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(`<li>${inline(lines[i].trim().slice(2))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join("")}</ul>`);
      continue;
    }
    // paragraph: gather consecutive non-blank, non-special lines
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{2,3} |- |>)/.test(lines[i].trim())
    ) {
      para.push(lines[i].trim());
      i++;
    }
    const text = para.join(" ");
    const m = text.match(CLAUSE_RE);
    if (m) {
      out.push(
        `<div class="legal-clause"><span class="legal-num">${esc(m[1])}</span><p>${inline(m[2])}</p></div>`
      );
    } else {
      out.push(`<p>${inline(text)}</p>`);
    }
  }
  return out.join("\n");
}

export function loadLegalDoc(slug: LegalSlug, lang: Lang): LegalDoc {
  const file = path.join(process.cwd(), "content", "legal", `${slug}.${lang}.md`);
  const src = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const fm = src.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta: Record<string, string> = {};
  if (fm) {
    for (const l of fm[1].split("\n")) {
      const k = l.indexOf(":");
      if (k > 0) meta[l.slice(0, k).trim()] = l.slice(k + 1).trim();
    }
  }
  const body = fm ? src.slice(fm[0].length) : src;
  return {
    title: meta.title ?? "",
    eyebrow: meta.eyebrow ?? "",
    version: meta.version ?? "",
    html: renderBlocks(body.split("\n")),
  };
}

export function loadLegalBoth(slug: LegalSlug) {
  return { ms: loadLegalDoc(slug, "ms"), en: loadLegalDoc(slug, "en") };
}
