import { useQuery } from "@tanstack/react-query";
import { Bell, BellOff } from "lucide-react";
import { useState } from "react";

import { EmptyState } from "@/components/dashboard/EmptyState";
import { ListSkeleton } from "@/components/dashboard/LoadingState";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { platformApi } from "@/services";
import type { RoleId } from "@/shared/types/domain";
import { formatDate } from "@/shared/utils/format";

export function NotificationCenter({ role }: { role: RoleId }) {
  const { data, isLoading } = useQuery({
    queryKey: ["notifications", role],
    queryFn: () => platformApi.listNotifications(role),
  });
  const [readIds, setReadIds] = useState<string[]>([]);
  const items = (data ?? []).map((n) => ({ ...n, read: n.read || readIds.includes(n.id) }));
  const unread = items.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label={`Notifikasi, ${unread} belum dibaca`}>
          <Bell className="size-4" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 grid min-w-4 place-items-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(22rem,calc(100vw-2rem))] p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-semibold">Notifikasi</p>
          {unread > 0 && (
            <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={() => setReadIds(items.map((n) => n.id))}>
              Tandai semua dibaca
            </Button>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto p-2">
          {isLoading ? (
            <ListSkeleton rows={3} />
          ) : items.length === 0 ? (
            <EmptyState icon={BellOff} title="Belum ada notifikasi" />
          ) : (
            <ul className="space-y-1">
              {items.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => setReadIds((ids) => [...ids, n.id])}
                    className="flex w-full gap-3 rounded-md px-2 py-2.5 text-left hover:bg-accent"
                  >
                    <span className={`mt-1.5 size-2 shrink-0 rounded-full ${n.read ? "bg-transparent" : "bg-pitch"}`} aria-hidden />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-foreground">{n.title}</span>
                      <span className="block text-xs text-muted-foreground">{n.body}</span>
                      <span className="mt-0.5 block text-[11px] text-muted-foreground">{formatDate(n.createdAt)}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
