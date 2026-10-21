import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { loadLegalBoth } from "@/lib/legal";

/* tutur.my/founding — shared directly with Founding Families.
   Not linked in the footer, not in the sitemap, and asks search engines not
   to list it. (Anyone with the link can still open it.)
   Copy lives in content/legal/founding.ms.md and .en.md */
export const metadata: Metadata = {
  title: "Tawaran Keluarga Pengasas · tutur",
  description: "Terma Tawaran Keluarga Pengasas Tutur / Tutur Founding Family Offer.",
  robots: { index: false, follow: false },
};

export default function FoundingPage() {
  return <LegalPage docs={loadLegalBoth("founding")} />;
}
