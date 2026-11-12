import { createFileRoute } from "@tanstack/react-router";

import { PublicFooter } from "@/components/layout/PublicFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { EcosystemSection } from "@/features/landing/components/EcosystemSection";
import { FeaturesSection } from "@/features/landing/components/FeaturesSection";
import { FootballIdSection } from "@/features/landing/components/FootballIdSection";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { PrivacyCtaSection } from "@/features/landing/components/PrivacyCtaSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "One Identity. One Journey. One Football Ecosystem." },
      {
        name: "description",
        content: "Platform digital yang menghubungkan pemain, orang tua, SSB, kompetisi, dan seluruh ekosistem sepak bola usia dini Indonesia.",
      },
      { property: "og:title", content: "One Identity. One Journey. One Football Ecosystem." },
      { property: "og:description", content: "Infrastruktur digital sepak bola usia dini Indonesia — Football ID milik pemain." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen">
      <PublicHeader />
      <main>
        <HeroSection />
        <EcosystemSection />
        <FootballIdSection />
        <FeaturesSection />
        <PrivacyCtaSection />
      </main>
      <PublicFooter />
    </div>
  );
}
