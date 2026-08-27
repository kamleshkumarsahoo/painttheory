import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-accent/15 text-accent border-accent/30",

  REVIEWED: "bg-secondary text-secondary-foreground border-border",

  PAYMENT_REQUESTED:
    "bg-secondary text-secondary-foreground border-border",

  PAID:
    "bg-primary/10 text-primary border-primary/20",

  ADDRESS_RECEIVED:
    "bg-primary/10 text-primary border-primary/20",

  SHIPPED:
    "bg-primary/10 text-primary border-primary/20",

  DELIVERED:
    "bg-primary/10 text-primary border-primary/20",

  DISCARDED:
    "bg-destructive/10 text-destructive border-destructive/25",
};

function pretty(status: string) {
  return status.replaceAll("_", " ");
}

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        STATUS_STYLES[status] ??
          "bg-muted text-muted-foreground border-border",
        className,
      )}
    >
      {status === "NEW" && (
        <span
          className="size-1.5 rounded-full bg-accent"
          aria-hidden
        />
      )}

      {pretty(status)}
    </span>
  );
}
