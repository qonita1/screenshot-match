import { createFileRoute } from "@tanstack/react-router";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { OtpForm } from "@/features/auth/components/OtpForm";

interface OtpSearch {
  purpose?: "register" | "reset";
}

export const Route = createFileRoute("/verify-otp")({
  validateSearch: (search: Record<string, unknown>): OtpSearch => ({
    purpose: search.purpose === "reset" ? "reset" : search.purpose === "register" ? "register" : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Verifikasi Akun · Ekosistem Sepak Bola" },
      { name: "description", content: "Masukkan kode verifikasi 6 digit." },
      { property: "og:title", content: "Verifikasi Akun · Ekosistem Sepak Bola" },
      { property: "og:description", content: "Verifikasi akun dengan kode OTP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VerifyPage,
});

function VerifyPage() {
  const { purpose = "register" } = Route.useSearch();
  return (
    <AuthLayout title="Verifikasi akun" description="Kami mengirim 6 digit kode ke email atau nomor HP Anda.">
      <OtpForm purpose={purpose} />
    </AuthLayout>
  );
}
