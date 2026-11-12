import { createFileRoute } from "@tanstack/react-router";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { OnboardingWizard } from "@/features/onboarding/components/OnboardingWizard";
import { ROLES, isRoleId } from "@/shared/constants/roles";
import type { RoleId } from "@/shared/types/domain";

interface OnboardingSearch {
  role?: RoleId;
}

export const Route = createFileRoute("/onboarding")({
  validateSearch: (search: Record<string, unknown>): OnboardingSearch => ({
    role: typeof search.role === "string" && isRoleId(search.role) ? search.role : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Onboarding · Ekosistem Sepak Bola" },
      { name: "description", content: "Lengkapi profil sesuai peran Anda." },
      { property: "og:title", content: "Onboarding · Ekosistem Sepak Bola" },
      { property: "og:description", content: "Lengkapi profil untuk memulai." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const { role = "player" } = Route.useSearch();
  return (
    <AuthLayout title={`Lengkapi profil ${ROLES[role].label}`} description="Hanya beberapa langkah singkat.">
      <OnboardingWizard key={role} role={role} />
    </AuthLayout>
  );
}
