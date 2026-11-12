import { useNavigate } from "@tanstack/react-router";
import { Check, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ROLE_HOME } from "@/components/navigation/RoleSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROLES } from "@/shared/constants/roles";
import type { RoleId } from "@/shared/types/domain";
import { ONBOARDING_STEPS, missingFields } from "../onboarding-config";

export function OnboardingWizard({ role }: { role: RoleId }) {
  const navigate = useNavigate();
  const steps = ONBOARDING_STEPS[role];
  const [index, setIndex] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const isReview = index === steps.length;
  const step = steps[index];

  const next = () => {
    if (step) {
      const missing = missingFields(step, values);
      setErrors(missing);
      if (missing.length) return;
    }
    setIndex((i) => i + 1);
  };

  const finish = () => {
    toast.success("Onboarding selesai (prototipe)", { description: "Data tidak disimpan ke server." });
    void navigate({ to: ROLE_HOME[role] });
  };

  const labels = [...steps.map((s) => s.title), "Tinjau"];

  return (
    <div>
      <ol className="mb-8 flex items-center gap-2" aria-label="Langkah onboarding">
        {labels.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                i < index ? "bg-pitch text-pitch-foreground" : i === index ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
              aria-current={i === index ? "step" : undefined}
            >
              {i < index ? <Check className="size-3.5" /> : i + 1}
            </span>
            <span className={`hidden text-xs font-medium sm:inline ${i === index ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
            {i < labels.length - 1 && <span className="h-px flex-1 bg-border" aria-hidden />}
          </li>
        ))}
      </ol>

      {!isReview && step ? (
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-foreground">{step.title}</h2>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
          {step.fields.map((f) => {
            const id = `ob-${f.name}`;
            const invalid = errors.includes(f.name);
            return (
              <div key={f.name} className="space-y-2">
                <Label htmlFor={id}>
                  {f.label} {f.optional && <span className="font-normal text-muted-foreground">(opsional)</span>}
                </Label>
                {f.type === "select" ? (
                  <Select value={values[f.name] ?? ""} onValueChange={(v) => setValues((s) => ({ ...s, [f.name]: v }))}>
                    <SelectTrigger id={id} aria-invalid={invalid} className="h-11 bg-card">
                      <SelectValue placeholder="Pilih…" />
                    </SelectTrigger>
                    <SelectContent>
                      {f.options?.map((o) => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={id}
                    type={f.type}
                    inputMode={f.type === "number" ? "numeric" : undefined}
                    placeholder={f.placeholder}
                    aria-invalid={invalid}
                    className="h-11 bg-card"
                    value={values[f.name] ?? ""}
                    onChange={(e) => setValues((s) => ({ ...s, [f.name]: e.target.value }))}
                  />
                )}
                {invalid && <p className="text-[0.8rem] font-medium text-destructive">Wajib diisi</p>}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-5">
          <h2 className="text-lg font-bold text-foreground">Tinjau data Anda</h2>
          <dl className="divide-y rounded-lg border bg-card">
            <div className="flex justify-between gap-4 px-4 py-3 text-sm">
              <dt className="text-muted-foreground">Peran</dt>
              <dd className="font-semibold">{ROLES[role].label}</dd>
            </div>
            {steps.flatMap((s) => s.fields).map((f) => (
              <div key={f.name} className="flex justify-between gap-4 px-4 py-3 text-sm">
                <dt className="text-muted-foreground">{f.label}</dt>
                <dd className="text-right font-semibold">{f.options?.find((o) => o.value === values[f.name])?.label ?? (values[f.name] || "—")}</dd>
              </div>
            ))}
          </dl>
          <div className="flex gap-3 rounded-lg bg-success-soft p-4 text-sm text-success-text">
            <ShieldCheck className="size-5 shrink-0" aria-hidden />
            <p>
              {role === "player"
                ? "Setelah verifikasi, Anda menerima Football ID permanen. Untuk pemain usia anak, wali perlu memberi persetujuan."
                : role === "parent"
                  ? "Semua izin berbagi data anak dimulai dalam keadaan mati. Anda yang memutuskan apa yang dibagikan."
                  : "Akses ke data pemain mengikuti relasi dan izin dari wali."}
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between gap-3">
        <Button variant="ghost" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
          Kembali
        </Button>
        {isReview ? <Button size="lg" onClick={finish}>Masuk ke dashboard</Button> : <Button size="lg" onClick={next}>Lanjut</Button>}
      </div>
    </div>
  );
}
