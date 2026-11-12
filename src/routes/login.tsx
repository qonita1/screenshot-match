import { Link, createFileRoute } from "@tanstack/react-router";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Masuk · Ekosistem Sepak Bola Usia Dini" },
      { name: "description", content: "Masuk ke akun Football ID, orang tua, SSB, atau penyelenggara turnamen." },
      { property: "og:title", content: "Masuk · Ekosistem Sepak Bola Usia Dini" },
      { property: "og:description", content: "Masuk ke platform ekosistem sepak bola usia dini Indonesia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <AuthLayout
      title="Selamat datang kembali"
      description="Masuk untuk melanjutkan perjalanan sepak bola Anda."
      footer={<>Belum punya akun? <Link to="/register" className="font-semibold text-pitch hover:underline">Daftar sekarang</Link></>}
    >
      <LoginForm />
    </AuthLayout>
  );
}
