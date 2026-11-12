import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { TextField } from "@/components/forms/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { recoverySchema, type RecoveryValues } from "../schemas";

export function RecoveryForm() {
  const navigate = useNavigate();
  const form = useForm<RecoveryValues>({ resolver: zodResolver(recoverySchema), defaultValues: { password: "", confirmPassword: "" } });
  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 400));
    toast.success("Kata sandi diperbarui (prototipe)");
    void navigate({ to: "/login" });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <TextField control={form.control} name="password" label="Kata sandi baru" type="password" autoComplete="new-password" description="Minimal 8 karakter." />
        <TextField control={form.control} name="confirmPassword" label="Ulangi kata sandi baru" type="password" autoComplete="new-password" />
        <Button type="submit" size="lg" className="w-full">Simpan kata sandi</Button>
      </form>
    </Form>
  );
}
