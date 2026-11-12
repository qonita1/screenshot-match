import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { PROTOTYPE_OTP, otpSchema, type OtpValues } from "../schemas";

export function OtpForm({ purpose }: { purpose: "register" | "reset" }) {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(30);
  const form = useForm<OtpValues>({ resolver: zodResolver(otpSchema), defaultValues: { code: "" } });

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const onSubmit = async ({ code }: OtpValues) => {
    await new Promise((r) => setTimeout(r, 400));
    if (code !== PROTOTYPE_OTP) {
      form.setError("code", { message: "Kode salah. Gunakan kode prototipe 123456." });
      return;
    }
    toast.success("Akun terverifikasi (prototipe)");
    void navigate(purpose === "reset" ? { to: "/account-recovery" } : { to: "/select-role" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode verifikasi</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} className="size-12 bg-card text-lg" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="rounded-md bg-info-soft px-3 py-2 text-sm text-info-text">
          Prototipe: gunakan kode <span className="font-tabular font-semibold">{PROTOTYPE_OTP}</span>. Tidak ada SMS/email yang dikirim.
        </p>
        <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          Verifikasi
        </Button>
        <Button type="button" variant="ghost" className="w-full" disabled={seconds > 0} onClick={() => { setSeconds(30); toast("Kode baru dikirim (simulasi)"); }}>
          {seconds > 0 ? `Kirim ulang dalam ${seconds} dtk` : "Kirim ulang kode"}
        </Button>
      </form>
    </Form>
  );
}
