import { Link, createFileRoute } from "@tanstack/react-router";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Daftar · Ekosistem Sepak Bola Usia Dini" },
      { name: "description", content: "Buat akun untuk pemain, orang tua, SSB, atau penyelenggara turnamen." },
      { property: "og:title", content: "Daftar · Ekosistem Sepak Bola Usia Dini" },
      { property: "og:description", content: "Mulai bergabung dengan ekosistem sepak bola usia dini Indonesia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <AuthLayout
      title="Mulai bergabung"
      description="Satu akun untuk seluruh perjalanan sepak bola. Peran dipilih setelah verifikasi."
      footer={<>Sudah punya akun? <Link to="/login" className="font-semibold text-pitch hover:underline">Masuk</Link></>}
    >
      <RegisterForm />
    </AuthLayout>
  );
}
