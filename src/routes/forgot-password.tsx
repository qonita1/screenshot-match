import { Link, createFileRoute } from "@tanstack/react-router";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Lupa Kata Sandi · Ekosistem Sepak Bola" },
      { name: "description", content: "Atur ulang kata sandi akun Anda dengan kode verifikasi." },
      { property: "og:title", content: "Lupa Kata Sandi · Ekosistem Sepak Bola" },
      { property: "og:description", content: "Pulihkan akses akun Anda." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <AuthLayout
      title="Lupa kata sandi?"
      description="Masukkan email atau nomor HP. Kami akan mengirim kode verifikasi."
      footer={<Link to="/login" className="font-semibold text-pitch hover:underline">← Kembali ke halaman masuk</Link>}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  ),
});
