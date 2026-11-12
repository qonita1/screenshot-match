import { Outlet, useRouterState } from "@tanstack/react-router";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppTopbar } from "@/components/layout/AppTopbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CopilotLauncher } from "@/features/agent/components/CopilotLauncher";
import { roleFromPath } from "@/shared/utils/role-path";

/** Responsive dashboard shell: collapsible sidebar (drawer on mobile), top bar, content, Copilot. */
export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const role = roleFromPath(pathname);

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset className="min-w-0 bg-background">
        <AppTopbar role={role} />
        <main id="main" className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 pb-24 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </SidebarInset>
      <CopilotLauncher role={role} pathname={pathname} />
    </SidebarProvider>
  );
}
