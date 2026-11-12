import { Badge, type BadgeProps } from "@/components/ui/badge";

export type StatusTone = "success" | "warning" | "info" | "danger" | "neutral" | "lime";

interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
  tone: StatusTone;
  dot?: boolean;
}

const DOT: Record<StatusTone, string> = {
  success: "bg-success",
  warning: "bg-warning",
  info: "bg-info",
  danger: "bg-destructive",
  neutral: "bg-muted-foreground",
  lime: "bg-lime-foreground",
};

export function StatusBadge({ tone, dot = true, children, ...props }: StatusBadgeProps) {
  return (
    <Badge variant={tone} {...props}>
      {dot && <span aria-hidden className={`size-1.5 rounded-full ${DOT[tone]}`} />}
      {children}
    </Badge>
  );
}
