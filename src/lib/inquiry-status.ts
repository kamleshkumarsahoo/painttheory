export const STATUS_FLOW = [
  "NEW",
  "REVIEWED",
  "PAYMENT_REQUESTED",
  "PAID",
  "ADDRESS_RECEIVED",
  "SHIPPED",
  "DELIVERED",
] as const;

export const STATUS_LABELS: Record<string, string> = {
  NEW: "New",
  REVIEWED: "Reviewed",
  PAYMENT_REQUESTED: "Payment Requested",
  PAID: "Payment Received",
  ADDRESS_RECEIVED: "Address Received",
  SHIPPED: "Packed & Shipped",
  DELIVERED: "Delivered",
  DISCARDED: "Discarded",
};

export const STATUS_OPTIONS = [...STATUS_FLOW, "DISCARDED"];

export function statusIndex(status?: string | null) {
  return STATUS_FLOW.indexOf(status as (typeof STATUS_FLOW)[number]);
}

export function getEffectiveInquiryStatus(inquiry: any) {
  if (!inquiry) return "NEW";

  if (inquiry.inquiry_status === "DISCARDED") return "DISCARDED";

  if (inquiry.inquiry_status === "DELIVERED") return "DELIVERED";

  if (inquiry.shipped_at || inquiry.inquiry_status === "SHIPPED") {
    return "SHIPPED";
  }

  if (
    inquiry.address_received_at ||
    inquiry.address_submitted_at ||
    inquiry.inquiry_status === "ADDRESS_RECEIVED"
  ) {
    return "ADDRESS_RECEIVED";
  }

  if (
    inquiry.payment_status === "PAID" ||
    inquiry.paid_at ||
    inquiry.inquiry_status === "PAID"
  ) {
    return "PAID";
  }

  if (
    inquiry.payment_requested_at ||
    inquiry.customer_link ||
    inquiry.razorpay_payment_link ||
    inquiry.inquiry_status === "PAYMENT_REQUESTED"
  ) {
    return "PAYMENT_REQUESTED";
  }

  if (inquiry.reviewed_at || inquiry.inquiry_status === "REVIEWED") {
    return "REVIEWED";
  }

  return "NEW";
}