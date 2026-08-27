import {
  Mail,
  Phone,
  User,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { formatDateTime } from "@/lib/date";

interface CustomerPanelProps {
  inquiry: {
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    inquiry_status: string;
    created_at: string;
    note?: string;
  };
}

export function CustomerPanel({
  inquiry,
}: CustomerPanelProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">

      <div className="flex items-center justify-between">

        <p className="eyebrow">
          Customer
        </p>

        <StatusBadge
          status={inquiry.inquiry_status}
        />

      </div>

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-3">
          <User className="size-4 text-muted-foreground" />
          <span>{inquiry.customer_name}</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="size-4 text-muted-foreground" />
          <a
            href={`tel:${inquiry.customer_phone}`}
            className="hover:underline"
          >
            {inquiry.customer_phone}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="size-4 text-muted-foreground" />
          <a
            href={`mailto:${inquiry.customer_email}`}
            className="truncate hover:underline"
          >
            {inquiry.customer_email}
          </a>
        </div>

      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">

        <Button
          asChild
          variant="outline"
          size="sm"
        >
          <a
            href={`tel:${inquiry.customer_phone}`}
          >
            Call
          </a>
        </Button>

        <Button
          asChild
          variant="outline"
          size="sm"
        >
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://wa.me/${inquiry.customer_phone.replace(/\D/g, "")}`}
          >
            <MessageCircle className="mr-1 size-4" />
            WhatsApp
          </a>
        </Button>

        <Button
          asChild
          variant="outline"
          size="sm"
        >
          <a
            href={`mailto:${inquiry.customer_email}`}
          >
            Email
          </a>
        </Button>

      </div>

      {inquiry.note && (

        <div className="mt-6 rounded-xl bg-muted p-4">

          <p className="eyebrow mb-2">
            Customer Message
          </p>

          <p className="text-sm leading-7">
            {inquiry.note}
          </p>

        </div>

      )}

      <div className="mt-6 border-t border-border pt-4">

        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Inquiry Received
        </p>

        <p className="mt-1 text-sm">
          {formatDateTime(inquiry.created_at)}
        </p>

      </div>

    </div>
  );
}
