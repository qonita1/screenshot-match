import { z } from "zod";

/** Email or Indonesian mobile number (08… / +628…). Prototype validation only. */
export const identifierSchema = z
  .string()
  .trim()
  .min(1, "Wajib diisi")
  .refine(
    (v) => z.string().email().safeParse(v).success || /^(\+62|62|0)8\d{7,12}$/.test(v.replace(/[\s-]/g, "")),
    "Masukkan email atau nomor HP yang valid",
  );

const passwordSchema = z.string().min(8, "Minimal 8 karakter");

export const loginSchema = z.object({
  identifier: identifierSchema,
  password: z.string().min(1, "Wajib diisi"),
});

export const registerSchema = z
  .object({
    fullName: z.string().trim().min(3, "Minimal 3 karakter").max(80),
    identifier: identifierSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    agree: z.boolean().refine((v) => v, "Anda perlu menyetujui ketentuan dan kebijakan privasi"),
  })
  .refine((d) => d.password === d.confirmPassword, { path: ["confirmPassword"], message: "Kata sandi tidak sama" });

export const forgotSchema = z.object({ identifier: identifierSchema });

export const otpSchema = z.object({ code: z.string().regex(/^\d{6}$/, "Masukkan 6 digit kode") });

export const recoverySchema = z
  .object({ password: passwordSchema, confirmPassword: z.string() })
  .refine((d) => d.password === d.confirmPassword, { path: ["confirmPassword"], message: "Kata sandi tidak sama" });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type ForgotValues = z.infer<typeof forgotSchema>;
export type OtpValues = z.infer<typeof otpSchema>;
export type RecoveryValues = z.infer<typeof recoverySchema>;

/** Prototype OTP code shown in the UI. Not a real verification. */
export const PROTOTYPE_OTP = "123456";
