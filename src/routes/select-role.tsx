import { createFileRoute } from "@tanstack/react-router";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { RoleSelectGrid } from "@/features/onboarding/components/RoleSelectGrid";

export const Route = createFileRoute("/select-role")({
  head: () => ({
    meta: [
      { title: "Pilih Peran · Ekosistem Sepak Bola" },
      { name: "description", content: "Pilih peran Anda: pemain, orang tua, SSB, penyelenggara turnamen, pelatih, atau scout." },
      { property: "og:title", content: "Pilih Peran · Ekosistem Sepak Bola" },
      { property: "og:description", content: "Setiap peran mendapat dashboard yang berbeda." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <AuthLayout wide title="Bagaimana Anda terlibat di sepak bola?" description="Setiap peran mendapat pengalaman yang berbeda. Satu akun bisa memiliki beberapa peran nanti.">
      <RoleSelectGrid />
    </AuthLayout>
  ),
});
