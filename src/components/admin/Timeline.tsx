import { CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/date";
import { getEffectiveInquiryStatus } from "@/lib/inquiry-status";

interface TimelineProps {
  inquiry: any;
}

const steps = [
  {
    key: "NEW",
    title: "New",
    dateField: "created_at",
    note: "Inquiry received via gallery.",
  },
  {
    key: "REVIEWED",
    title: "Reviewed",
    dateField: "reviewed_at",
    note: "Confirmed availability and details.",
  },
  {
    key: "PAYMENT_REQUESTED",
    title: "Payment Requested",
    dateField: "payment_requested_at",
    note: "Payment instructions shared with customer.",
  },
  {
    key: "PAID",
    title: "Payment Received",
    dateField: "paid_at",
    note: "Payment marked as received.",
  },
  {
    key: "ADDRESS_RECEIVED",
    title: "Address Received",
    dateField: "address_received_at",
    note: "Shipping details are ready.",
  },
  {
    key: "SHIPPED",
    title: "Packed & Shipped",
    dateField: "shipped_at",
    note: "Artwork has left the studio.",
  },
  {
    key: "DELIVERED",
    title: "Delivered",
    dateField: "delivered_at",
    note: "Artwork delivered to the collector.",
  },
];

export function Timeline({ inquiry }: TimelineProps) {
  const currentIndex = steps.findIndex(
    (step) => step.key === getEffectiveInquiryStatus(inquiry),
  );

  return (
    <ol className="relative space-y-6">
      {steps.map((step, index) => {
        const reached = currentIndex >= 0 && index <= currentIndex;
        const current = index === currentIndex;
        const date = inquiry[step.dateField];

        return (
          <li key={step.key} className="relative flex gap-4">
            {index !== steps.length - 1 && (
              <span
                className={cn(
                  "absolute left-[11px] top-6 h-[calc(100%+0.5rem)] w-px",
                  reached ? "bg-accent/40" : "bg-border",
                )}
                aria-hidden
              />
            )}

            <span
              className={cn(
                "relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border",
                reached
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card text-muted-foreground",
                current && "ring-4 ring-accent/15",
              )}
            >
              {reached ? (
                <CheckCircle2 className="size-3.5" />
              ) : (
                <span className="size-1.5 rounded-full bg-current" />
              )}
            </span>

            <div className="pb-1">
              <p
                className={cn(
                  "text-sm font-medium",
                  reached ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.title}
              </p>

              {date && (
                <p className="text-xs text-muted-foreground">
                  {formatDateTime(date)}
                </p>
              )}

              {date && step.note && (
                <p className="mt-1 text-sm text-foreground/70">
                  {step.note}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}