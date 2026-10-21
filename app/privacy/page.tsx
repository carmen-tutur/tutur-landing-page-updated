import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { loadLegalBoth } from "@/lib/legal";

/* tutur.my/privacy — copy lives in content/legal/privacy.ms.md and .en.md */
export const metadata: Metadata = {
  title: "Notis Privasi · tutur",
  description: "Notis Privasi Aplikasi Tutur / Tutur App Privacy Notice.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPage docs={loadLegalBoth("privacy")} />;
}
