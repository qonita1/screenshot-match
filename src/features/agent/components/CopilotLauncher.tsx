import { Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { RoleId } from "@/shared/types/domain";
import { CopilotPanel } from "./CopilotPanel";

export function CopilotLauncher({ role, pathname }: { role: RoleId; pathname: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="lime"
        size="lg"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-30 rounded-full shadow-raised"
        aria-label="Buka Football Ecosystem Copilot"
      >
        <Sparkles /> <span className="hidden sm:inline">Copilot</span>
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
          <SheetHeader className="px-4 pt-5 text-left">
            <SheetTitle>Football Ecosystem Copilot</SheetTitle>
            <SheetDescription>Bantuan kontekstual sesuai peran dan halaman Anda.</SheetDescription>
          </SheetHeader>
          <div className="min-h-0 flex-1 pt-3">
            <CopilotPanel role={role} pathname={pathname} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
