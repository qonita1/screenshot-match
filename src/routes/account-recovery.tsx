import { createFileRoute } from "@tanstack/react-router";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { RecoveryForm } from "@/features/auth/components/RecoveryForm";

export const Route = createFileRoute("/account-recovery")({
  head: () => ({
    meta: [
      { title: "Pemulihan Akun · Ekosistem Sepak Bola" },
      { name: "description", content: "Buat kata sandi baru untuk akun Anda." },
      { property: "og:title", content: "Pemulihan Akun · Ekosistem Sepak Bola" },
      { property: "og:description", content: "Buat kata sandi baru." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <AuthLayout title="Buat kata sandi baru" description="Identitas Anda sudah terverifikasi. Silakan buat kata sandi baru.">
      <RecoveryForm />
    </AuthLayout>
  ),
});
