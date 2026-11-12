import type { RoleId } from "@/shared/types/domain";

export interface OnboardingField {
  name: string;
  label: string;
  type: "text" | "number" | "select";
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  optional?: boolean;
}

export interface OnboardingStep {
  title: string;
  description: string;
  fields: OnboardingField[];
}

const BASE: OnboardingStep = {
  title: "Profil dasar",
  description: "Informasi ini membantu kami menyesuaikan pengalaman Anda.",
  fields: [
    { name: "fullName", label: "Nama lengkap", type: "text" },
    { name: "city", label: "Kota / Kabupaten", type: "text", placeholder: "Makassar" },
  ],
};

const POSITIONS = [
  { value: "GK", label: "Penjaga Gawang" },
  { value: "DF", label: "Bek" },
  { value: "MF", label: "Gelandang" },
  { value: "FW", label: "Penyerang" },
];

export const ONBOARDING_STEPS: Record<RoleId, OnboardingStep[]> = {
  player: [
    BASE,
    {
      title: "Profil sepak bola",
      description: "Data ini akan tampil di Football ID Anda.",
      fields: [
        { name: "birthYear", label: "Tahun lahir", type: "number", placeholder: "2016" },
        { name: "position", label: "Posisi favorit", type: "select", options: POSITIONS },
        { name: "foot", label: "Kaki dominan", type: "select", options: [{ value: "right", label: "Kanan" }, { value: "left", label: "Kiri" }, { value: "both", label: "Keduanya" }] },
      ],
    },
  ],
  parent: [
    BASE,
    {
      title: "Hubungan dengan anak",
      description: "Hubungan wali akan diverifikasi sebelum Anda dapat mengelola data anak.",
      fields: [
        { name: "relationship", label: "Hubungan", type: "select", options: [{ value: "Ayah", label: "Ayah" }, { value: "Ibu", label: "Ibu" }, { value: "Wali", label: "Wali" }] },
        { name: "childName", label: "Nama anak", type: "text" },
        { name: "childBirthYear", label: "Tahun lahir anak", type: "number", placeholder: "2016" },
      ],
    },
  ],
  ssb: [
    BASE,
    {
      title: "Profil organisasi",
      description: "Organisasi akan diverifikasi sebelum dapat mendaftarkan pemain.",
      fields: [
        { name: "orgName", label: "Nama SSB / klub", type: "text", placeholder: "SSB Makassar United" },
        { name: "foundedYear", label: "Tahun berdiri", type: "number", placeholder: "2012" },
        { name: "contact", label: "Nomor kontak admin", type: "text", placeholder: "0812…" },
      ],
    },
  ],
  tournament: [
    BASE,
    {
      title: "Penyelenggara",
      description: "Detail penyelenggara turnamen.",
      fields: [
        { name: "organizer", label: "Nama penyelenggara", type: "text" },
        { name: "tournamentName", label: "Nama turnamen pertama", type: "text", placeholder: "Makassar Youth Cup 2027", optional: true },
      ],
    },
  ],
  coach: [
    BASE,
    { title: "Kepelatihan", description: "Lisensi akan diverifikasi.", fields: [{ name: "license", label: "Lisensi kepelatihan", type: "text", placeholder: "Lisensi D PSSI", optional: true }] },
  ],
  scout: [
    BASE,
    { title: "Afiliasi scout", description: "Akses scout memerlukan verifikasi dan hanya melihat pemain yang diizinkan wali.", fields: [{ name: "affiliation", label: "Klub / akademi", type: "text" }] },
  ],
};

/** Returns the names of required fields that are empty. */
export function missingFields(step: OnboardingStep, values: Record<string, string>): string[] {
  return step.fields.filter((f) => !f.optional && !values[f.name]?.trim()).map((f) => f.name);
}
