import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { NotificationCenter } from "@/components/navigation/NotificationCenter";
import { RoleSwitcher } from "@/components/navigation/RoleSwitcher";
import { UserMenu } from "@/components/navigation/UserMenu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { RoleId } from "@/shared/types/domain";

export function AppTopbar({ role }: { role: RoleId }) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b bg-card/90 px-3 backdrop-blur sm:px-5">
      <SidebarTrigger aria-label="Buka/tutup menu" />
      <div className="mx-1 h-5 w-px bg-border" aria-hidden />
      <div className="min-w-0 flex-1">
        <Breadcrumbs />
      </div>
      <RoleSwitcher role={role} />
      <NotificationCenter role={role} />
      <UserMenu role={role} />
    </header>
  );
}
