import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { TextField } from "@/components/forms/TextField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { registerSchema, type RegisterValues } from "../schemas";

export function RegisterForm() {
  const navigate = useNavigate();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", identifier: "", password: "", confirmPassword: "", agree: false },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 400));
    void navigate({ to: "/verify-otp", search: { purpose: "register" } });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <TextField control={form.control} name="fullName" label="Nama lengkap" autoComplete="name" />
        <TextField control={form.control} name="identifier" label="Email atau nomor HP" placeholder="nama@email.com / 0812…" autoComplete="username" description="Kode verifikasi akan dikirim ke sini." />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField control={form.control} name="password" label="Kata sandi" type="password" autoComplete="new-password" />
          <TextField control={form.control} name="confirmPassword" label="Ulangi kata sandi" type="password" autoComplete="new-password" />
        </div>
        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start gap-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} className="mt-0.5" />
                </FormControl>
                <FormLabel className="text-sm font-normal leading-snug text-muted-foreground">
                  Saya menyetujui Ketentuan Layanan dan Kebijakan Privasi (dokumen menyusul).
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Memproses…" : "Buat akun"}
        </Button>
      </form>
    </Form>
  );
}
