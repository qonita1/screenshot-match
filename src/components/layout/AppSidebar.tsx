import { Link } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";

import { BrandMark } from "@/components/layout/BrandMark";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NAV } from "@/shared/constants/navigation";
import { ROLES } from "@/shared/constants/roles";
import type { RoleId } from "@/shared/types/domain";

export function AppSidebar({ role }: { role: RoleId }) {
  const { setOpenMobile } = useSidebar();
  const items = NAV[role];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-4">
        <BrandMark tone="inverse" className="group-data-[collapsible=icon]:[&>span:last-child]:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/55">{ROLES[role].label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(({ label, icon: Icon, ...link }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton asChild tooltip={label}>
                    <Link
                      {...link}
                      onClick={() => setOpenMobile(false)}
                      className="data-[status=active]:bg-sidebar-accent data-[status=active]:font-semibold data-[status=active]:text-sidebar-accent-foreground data-[status=active]:[&>svg]:text-sidebar-primary"
                    >
                      <Icon />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3 group-data-[collapsible=icon]:hidden">
        <div className="rounded-md border border-sidebar-border bg-sidebar-accent/60 p-3 text-xs text-sidebar-foreground">
          <p className="flex items-center gap-1.5 font-semibold text-sidebar-primary">
            <FlaskConical className="size-3.5" aria-hidden /> Mode Prototipe
          </p>
          <p className="mt-1 leading-relaxed text-sidebar-foreground/75">
            Data contoh, tanpa login sungguhan dan tanpa transaksi nyata.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
