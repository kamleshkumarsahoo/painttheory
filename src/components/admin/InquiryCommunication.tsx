import {
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type InquiryCommunicationProps = {
  inquiry: any;
  isCommission: boolean;
  customerPhone: string;
  whatsappUrl: string;
  onEmail: () => void;
};

export function InquiryCommunication({
  inquiry,
  isCommission,
  customerPhone,
  whatsappUrl,
  onEmail,
}: InquiryCommunicationProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <p className="eyebrow">
        Communication
      </p>

      <p className="mt-2 text-sm text-muted-foreground">
        Contact {inquiry.customer_name} using whichever method is convenient.
      </p>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-auto flex-col gap-2 py-4"
          onClick={onEmail}
        >
          <Mail className="size-4" />

          <span className="text-xs">
            Email
          </span>
        </Button>

        <Button
          asChild
          type="button"
          variant="outline"
          className="h-auto flex-col gap-2 py-4"
          disabled={!customerPhone}
        >
          <a
            href={
              customerPhone
                ? `tel:${customerPhone}`
                : undefined
            }
          >
            <Phone className="size-4" />

            <span className="text-xs">
              Call
            </span>
          </a>
        </Button>

        <Button
          asChild
          type="button"
          variant="outline"
          className="h-auto flex-col gap-2 py-4"
          disabled={!customerPhone}
        >
          <a
            href={
              customerPhone
                ? whatsappUrl
                : undefined
            }
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="size-4" />

            <span className="text-xs">
              WhatsApp
            </span>
          </a>
        </Button>
      </div>
    </section>
  );
}