import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/app")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: AppShell,
});
