import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { InquiryReview } from "@/components/admin/InquiryReview";
import { inquiryPrice } from "@/lib/inquiry";

import {
  getInquiryById,
  updateArtistNotes,
  updateInquiryStatus,
  generateCustomerLink,
} from "@/services/inquiry.service";

import { formatDateTime } from "@/lib/date";

import {
  getEffectiveInquiryStatus,
  STATUS_FLOW,
  STATUS_LABELS,
} from "@/lib/inquiry-status";

import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/inquiries/$inquiryId")({
  component: InquiryReviewPage,
});

function formatDate(date?: string | null) {
  return formatDateTime(date) || "Not recorded";
}

function formatPrice(price?: number | null) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price ?? 0);
}

function InquiryReviewPage() {
  const { inquiryId } = Route.useParams();
  const navigate = useNavigate();

  const [inquiry, setInquiry] = useState<any>(null);
  const [pendingStatus, setPendingStatus] = useState("");
  const [artistNotes, setArtistNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    loadInquiry();
  }, [inquiryId]);

  useEffect(() => {
    if (!inquiry) return;

    setPendingStatus(getEffectiveInquiryStatus(inquiry));
    setArtistNotes(inquiry.artist_notes ?? "");
  }, [
    inquiry?.id,
    inquiry?.inquiry_status,
    inquiry?.artist_notes,
  ]);

  async function loadInquiry() {
    try {
      const data = await getInquiryById(inquiryId);
      setInquiry(data);
    } catch (err) {
      console.error(err);
      toast.error("Could not load inquiry");
    }
  }

  async function changeStatus(status: string) {
    try {
      await updateInquiryStatus(inquiry.id, status);

      await loadInquiry();

      toast.success(
        `Status updated to ${STATUS_LABELS[status] ?? status}`,
      );
    } catch (err) {
      console.error(err);
      toast.error("Could not update status");
    }
  }

  async function saveNotes() {
    try {
      setSavingNotes(true);

      await updateArtistNotes(inquiry.id, artistNotes);
      await loadInquiry();

      toast.success("Private notes saved");
    } catch (err) {
      console.error(err);
      toast.error("Could not save notes");
    } finally {
      setSavingNotes(false);
    }
  }

  async function handleGenerateCustomerLink() {
    try {
      const updated = await generateCustomerLink(inquiry.id);

      setInquiry(updated);

      toast.success("Customer link generated.");

      return updated;
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate customer link.");
      return null;
    }
  }

  /*
   * Existing gallery purchase email.
   *
   * We are deliberately leaving this direct-send flow untouched
   * for now. We'll convert it to preview send later.
   */
  const handleSendEmail = async () => {
    try {
      toast.loading("Sending email...", {
        id: "send-email",
      });

      const { data, error } = await supabase.functions.invoke(
        "send-email",
        {
          body: {
            inquiryId: inquiry.id,
            template: "request-payment",
          },
        },
      );

      if (error) throw error;

      toast.success("Email sent successfully!", {
        id: "send-email",
      });

      console.log(data);
    } catch (err) {
      console.error(err);

      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to send email",
        {
          id: "send-email",
        },
      );
    }
  };

  if (!inquiry) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="eyebrow">Studio dashboard</p>

        <h1 className="mt-3 font-display text-3xl text-foreground">
          Loading inquiry
        </h1>

        <p className="mt-2 text-muted-foreground">
          Pulling the request details from the studio records.
        </p>
      </div>
    );
  }

  const isCommission =
    inquiry.inquiry_type === "COMMISSION";

  const artwork = inquiry.artworks;

  const requestedPrice = inquiryPrice(inquiry);

  const effectiveStatus =
    getEffectiveInquiryStatus(inquiry);

  const currentIndex =
    STATUS_FLOW.indexOf(effectiveStatus as any);

  const nextStatus =
    currentIndex >= 0
      ? STATUS_FLOW[currentIndex + 1]
      : undefined;

  const receivedDate = formatDate(inquiry.created_at);

  const customerMessage =
    inquiry.note?.trim() ||
    "No customer message was added with this inquiry.";

  /*
   * Purchase-only WhatsApp message.
   */
  const actionMessage = [
    `Hello ${inquiry.customer_name},`,
    ``,
    `Thank you for your interest in "${artwork?.title}".`,
    ``,
    `I'm delighted to let you know that your inquiry has been reviewed.`,
    ``,
    `Artwork`,
    `${artwork?.title}`,
    ``,
    `Reference`,
    `${inquiry.order_number ?? inquiry.id.slice(0, 8)}`,
    ``,
    `Amount`,
    `₹${Number(
      inquiry.artwork_price_snapshot,
    ).toLocaleString("en-IN")}`,
    ``,
    `Payment Link`,
    `${inquiry.customer_link ?? "Generating..."}`,
    ``,
    `After completing your payment, please submit your shipping address using the link below.`,
    ``,
    `Address Form`,
    `${inquiry.address_link ?? "Will be shared shortly."}`,
    ``,
    `If you have any questions, feel free to reply to this message.`,
    ``,
    `Regards,`,
    `Kamlesh Sahoo`,
  ].join("\n");

  const whatsappUrl = `https://wa.me/${inquiry.customer_phone.replace(
    /\D/g,
    "",
  )}?text=${encodeURIComponent(actionMessage)}`;

  const COUNTRY = "India";

  const customerAddress = [
    inquiry.shipping_name,
    `Phone: ${inquiry.shipping_phone}`,
    inquiry.shipping_address_line1,
    inquiry.shipping_address_line2,
    `${inquiry.shipping_city}, ${inquiry.shipping_state}, ${COUNTRY}`,
    inquiry.shipping_pincode &&
      `PIN: ${inquiry.shipping_pincode}`,
    inquiry.shipping_landmark &&
      `Landmark: ${inquiry.shipping_landmark}`,
  ]
    .filter(Boolean)
    .join("\n");

  const hasShippingAddress =
    !!inquiry.shipping_address_line1 ||
    !!inquiry.shipping_city ||
    !!inquiry.shipping_pincode;

  return (
    <InquiryReview
      inquiry={inquiry}
      artwork={artwork}
      isCommission={isCommission}
      requestedPrice={requestedPrice}
      effectiveStatus={effectiveStatus}
      nextStatus={nextStatus}
      receivedDate={receivedDate}
      customerMessage={customerMessage}
      whatsappUrl={whatsappUrl}
      customerAddress={customerAddress}
      hasShippingAddress={hasShippingAddress}
      pendingStatus={pendingStatus}
      artistNotes={artistNotes}
      savingNotes={savingNotes}
      onBack={() =>
        navigate({
          to: "/admin",
        })
      }
      onChangeStatus={changeStatus}
      onSaveNotes={saveNotes}
      onGenerateCustomerLink={
        handleGenerateCustomerLink
      }
      onSendEmail={handleSendEmail}
      onPendingStatusChange={setPendingStatus}
      onArtistNotesChange={setArtistNotes}
      formatPrice={formatPrice}
    />
  );
}