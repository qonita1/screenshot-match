import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { TextField } from "@/components/forms/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { forgotSchema, type ForgotValues } from "../schemas";

export function ForgotPasswordForm() {
  const navigate = useNavigate();
  const form = useForm<ForgotValues>({ resolver: zodResolver(forgotSchema), defaultValues: { identifier: "" } });
  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 400));
    void navigate({ to: "/verify-otp", search: { purpose: "reset" } });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <TextField control={form.control} name="identifier" label="Email atau nomor HP terdaftar" autoComplete="username" />
        <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          Kirim kode verifikasi
        </Button>
      </form>
    </Form>
  );
}
