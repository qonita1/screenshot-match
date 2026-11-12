import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { TextField } from "@/components/forms/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { loginSchema, type LoginValues } from "../schemas";

export function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { identifier: "", password: "" } });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 400));
    toast.success("Masuk (prototipe)", { description: "Belum ada autentikasi sungguhan." });
    void navigate({ to: "/select-role" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <TextField control={form.control} name="identifier" label="Email atau nomor HP" placeholder="nama@email.com / 0812…" autoComplete="username" />
        <div className="space-y-1">
          <TextField control={form.control} name="password" label="Kata sandi" type="password" autoComplete="current-password" />
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm font-medium text-pitch hover:underline">Lupa kata sandi?</Link>
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Memproses…" : "Masuk"}
        </Button>
      </form>
    </Form>
  );
}
