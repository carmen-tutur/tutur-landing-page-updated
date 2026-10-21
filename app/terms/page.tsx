import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { loadLegalBoth } from "@/lib/legal";

/* tutur.my/terms — copy lives in content/legal/terms.ms.md and .en.md */
export const metadata: Metadata = {
  title: "Terma & Syarat · tutur",
  description: "Terma & Syarat Tutur untuk ibu bapa dan penjaga / Tutur Terms & Conditions.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPage docs={loadLegalBoth("terms")} />;
}
