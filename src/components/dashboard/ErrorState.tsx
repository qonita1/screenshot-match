import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Data belum bisa dimuat",
  description = "Periksa koneksi Anda lalu coba lagi.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-center rounded-lg border border-destructive/30 bg-destructive-soft px-6 py-10 text-center">
      <AlertTriangle className="size-6 text-destructive-text" aria-hidden />
      <p className="mt-3 text-sm font-semibold text-destructive-text">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
          Coba lagi
        </Button>
      )}
    </div>
  );
}
