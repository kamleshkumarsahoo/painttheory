import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { getKolkataDateStamp } from "@/lib/date";
import { STATUS_FLOW, statusIndex } from "@/lib/inquiry-status";

const STATUS_DATE_FIELDS: Record<string, string> = {
  REVIEWED: "reviewed_at",
  PAYMENT_REQUESTED: "payment_requested_at",
  PAID: "paid_at",
  ADDRESS_RECEIVED: "address_received_at",
  SHIPPED: "shipped_at",
  DELIVERED: "delivered_at",
};

const LINK_EXPIRY_DAYS = 30;

const ARTWORK_MEDIA_SELECT = `
  id,
  role,
  sort_order,
  thumb_path,
  alt_text
`;

function createOrderNumber() {
  const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `KS-${getKolkataDateStamp()}-${randomPart}`;
}

function withStatusProgress(
  currentStatus: string | null | undefined,
  nextStatus: string,
  now = new Date().toISOString(),
) {
  const updateData: Record<string, string> = {
    updated_at: now,
  };

  const nextIndex = statusIndex(nextStatus);
  const currentIndex = statusIndex(currentStatus);

  if (nextStatus === "DISCARDED") {
    updateData.inquiry_status = "DISCARDED";
    updateData.link_expires_on = now;

    return updateData;
  }

  if (nextIndex >= 0 && nextIndex > currentIndex) {
    updateData.inquiry_status = nextStatus;
  }

  STATUS_FLOW.slice(1, nextIndex + 1).forEach((status) => {
    updateData[STATUS_DATE_FIELDS[status]] = now;
  });

  return updateData;
}

async function updateArtworkAvailability(
  artworkId: string,
  status: "AVAILABLE" | "RESERVED" | "SOLD",
) {
  const { error } = await supabase
    .from("artworks")
    .update({
      availability_status: status,
    })
    .eq("id", artworkId);

  if (error) throw error;
}

export async function createInquiry(inquiry: {
  inquiry_type?: "ART_PURCHASE" | "COMMISSION";
  artwork_id?: string;
  artwork_price_snapshot?: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  country?: string;
  budget?: string;
  deadline?: string;
  note?: string;
}) {
  let artworkPriceSnapshot = inquiry.artwork_price_snapshot;

  if (inquiry.artwork_id && artworkPriceSnapshot == null) {
    const { data: artwork, error: artworkError } =
      await supabase
        .from("artworks")
        .select("price")
        .eq("id", inquiry.artwork_id)
        .single();

    if (artworkError) throw artworkError;

    artworkPriceSnapshot = artwork.price;
  }

  const { error } = await supabase
    .from("inquiries")
    .insert({
      inquiry_type:
        inquiry.inquiry_type ?? "ART_PURCHASE",

      artwork_id:
        inquiry.artwork_id ?? null,

      artwork_price_snapshot:
        artworkPriceSnapshot ?? null,

      order_number: createOrderNumber(),

      customer_name:
        inquiry.customer_name.trim(),

      customer_email:
        inquiry.customer_email.trim(),

      customer_phone:
        inquiry.customer_phone.trim(),

      country:
        inquiry.country?.trim() || null,

      budget:
        inquiry.budget?.trim() || null,

      deadline:
        inquiry.deadline || null,

      note:
        inquiry.note?.trim() || null,

      inquiry_status: "NEW",
    });

  if (error) throw error;
}

export async function getAllInquiries() {
  const { data, error } = await supabase
    .from("inquiries")
    .select(`
      *,
      artworks (
        id,
        title,
        thumbnail_url,
        price,
        artwork_media!artwork_media_artwork_id_fkey (
          ${ARTWORK_MEDIA_SELECT}
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getInquiryById(id: string) {
  const { data, error } = await supabase
    .from("inquiries")
    .select(`
      *,
      artworks (
        id,
        title,
        thumbnail_url,
        price,
        medium,
        dimensions,
        availability_status,
        artwork_media!artwork_media_artwork_id_fkey (
          ${ARTWORK_MEDIA_SELECT}
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function updateArtistNotes(
  inquiryId: string,
  artistNotes: string,
) {
  const { data, error } = await supabase
    .from("inquiries")
    .update({
      artist_notes: artistNotes,
      updated_at: new Date().toISOString(),
    })
    .eq("id", inquiryId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateInquiryStatus(
  inquiryId: string,
  status: string,
) {
  const now = new Date().toISOString();

  const { data: current, error: currentError } = await supabase
    .from("inquiries")
    .select("inquiry_status")
    .eq("id", inquiryId)
    .single();

  if (currentError) throw currentError;

  const updateData: Record<string, any> = {
    ...withStatusProgress(current.inquiry_status, status, now),
    inquiry_status: status,
  };

  // Keep payment_status in sync with the workflow status.
  if (status === "PAID") {
    updateData.payment_status = "PAID";
    updateData.payment_submitted_at = now;
  }

  if (status === "DELIVERED") {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + LINK_EXPIRY_DAYS);

    updateData.link_expires_on = expiry.toISOString();
  }

  const { data, error } = await supabase
    .from("inquiries")
    .update(updateData)
    .eq("id", inquiryId)
    .select(`
      *,
      artworks (
        id,
        title,
        thumbnail_url,
        price,
        medium,
        dimensions,
        availability_status,
        artwork_media!artwork_media_artwork_id_fkey (
          ${ARTWORK_MEDIA_SELECT}
        )
      )
    `)
    .single();

  if (error) throw error;

  // Only gallery purchases have an artwork to update.
  if (
    (status === "SHIPPED" || status === "DELIVERED") &&
    data.artwork_id
  ) {
    await updateArtworkAvailability(
      data.artwork_id,
      "SOLD",
    );
  }

  if (
    status === "DISCARDED" &&
    data.artwork_id
  ) {
    await updateArtworkAvailability(
      data.artwork_id,
      "AVAILABLE",
    );
  }

  return data;
}

export async function generateCustomerLink(
  inquiryId: string,
) {
  const token = uuidv4();
  const now = new Date().toISOString();

  const customerLink =
    `${window.location.origin}/order/${token}`;

  const { data: current, error: currentError } = await supabase
    .from("inquiries")
    .select("inquiry_status")
    .eq("id", inquiryId)
    .single();

  if (currentError) throw currentError;

  const { data, error } = await supabase
    .from("inquiries")
    .update({
      customer_token: token,
      customer_link: customerLink,
      link_expires_on: null,
      ...withStatusProgress(
        current.inquiry_status,
        "PAYMENT_REQUESTED",
        now,
      ),
    })
    .eq("id", inquiryId)
    .select(`
      *,
      artworks (
        id,
        title,
        thumbnail_url,
        price,
        medium,
        dimensions,
        availability_status,
        artwork_media!artwork_media_artwork_id_fkey (
          ${ARTWORK_MEDIA_SELECT}
        )
      )
    `)
    .single();

  if (error) throw error;

  await updateArtworkAvailability(
    data.artwork_id,
    "RESERVED",
  );

  return data;
}

export async function getInquiryByToken(token: string) {
  const { data, error } = await supabase.rpc(
    "get_customer_inquiry",
    {
      p_customer_token: token,
    },
  );

  if (error) throw error;

  return data;
}

export async function saveShippingAddress(
  token: string,
  address: {
    shipping_name: string;
    shipping_phone: string;
    shipping_address_line1: string;
    shipping_address_line2: string;
    shipping_city: string;
    shipping_state: string;
    shipping_pincode: string;
    shipping_landmark: string;
  },
) {
  const { data, error } = await supabase.rpc(
    "save_customer_shipping",
    {
      p_customer_token: token,
      p_shipping_name: address.shipping_name,
      p_shipping_phone: address.shipping_phone,
      p_shipping_address_line1:
        address.shipping_address_line1,
      p_shipping_address_line2:
        address.shipping_address_line2,
      p_shipping_city: address.shipping_city,
      p_shipping_state: address.shipping_state,
      p_shipping_pincode: address.shipping_pincode,
      p_shipping_landmark:
        address.shipping_landmark,
    },
  );

  if (error) throw error;

  return data;
}


export async function saveCommissionShippingAddress(
  paymentId: string,
  address: {
    shipping_name: string;
    shipping_phone: string;
    shipping_address_line1: string;
    shipping_address_line2: string;
    shipping_city: string;
    shipping_state: string;
    shipping_pincode: string;
    shipping_landmark: string;
  },
) {
  const { data, error } = await supabase.rpc(
    "save_commission_shipping",
    {
      p_payment_id: paymentId,
      p_shipping_name: address.shipping_name,
      p_shipping_phone: address.shipping_phone,
      p_shipping_address_line1:
        address.shipping_address_line1,
      p_shipping_address_line2:
        address.shipping_address_line2,
      p_shipping_city: address.shipping_city,
      p_shipping_state: address.shipping_state,
      p_shipping_pincode: address.shipping_pincode,
      p_shipping_landmark:
        address.shipping_landmark,
    },
  );

  if (error) throw error;

  return data;
}

/* ============================================================
   COMMISSION PAYMENTS
============================================================ */

export type CommissionPaymentStatus =
  | "PENDING"
  | "REQUESTED"
  | "PAID"
  | "CANCELLED";

export interface CommissionPayment {
  id: string;
  inquiry_id: string;
  payment_number: number;
  amount: number;
  status: CommissionPaymentStatus;
  customer_link: string | null;
  requested_at: string | null;
  paid_at: string | null;
  created_at: string;
}

/**
 * Get all payment records for a commission.
 *
 * Payments are stored as separate rows, so there is no
 * limit to how many payments a commission can have.
 */
export async function getCommissionPayments(
  inquiryId: string,
) {
  const { data, error } = await supabase
    .from("commission_payments")
    .select("*")
    .eq("inquiry_id", inquiryId)
    .order("payment_number", {
      ascending: true,
    });

  if (error) throw error;

  return data as CommissionPayment[];
}

/**
 * Get the next payment number for a commission.
 *
 * Example:
 * no payments      -> 1
 * payment 1 exists -> 2
 * payments 1-3     -> 4
 */
export async function getNextCommissionPaymentNumber(
  inquiryId: string,
) {
  const { data, error } = await supabase
    .from("commission_payments")
    .select("payment_number")
    .eq("inquiry_id", inquiryId)
    .order("payment_number", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  return (data?.payment_number ?? 0) + 1;
}

/**
 * Create a new commission payment record.
 *
 * This does NOT generate a customer portal yet.
 * It simply creates the payment entry.
 */
export async function createCommissionPayment(
  inquiryId: string,
  amount: number,
) {
  if (!amount || amount <= 0) {
    throw new Error("Payment amount must be greater than zero.");
  }

  const paymentNumber =
    await getNextCommissionPaymentNumber(inquiryId);

  const { data, error } = await supabase
    .from("commission_payments")
    .insert({
      inquiry_id: inquiryId,
      payment_number: paymentNumber,
      amount,
      status: "PENDING",
    })
    .select()
    .single();

  if (error) throw error;

  return data as CommissionPayment;
}

/**
 * Update the amount of a payment before it has been requested.
 */
export async function updateCommissionPaymentAmount(
  paymentId: string,
  amount: number,
) {
  if (!amount || amount <= 0) {
    throw new Error("Payment amount must be greater than zero.");
  }

  const { data: current, error: currentError } =
    await supabase
      .from("commission_payments")
      .select("status")
      .eq("id", paymentId)
      .single();

  if (currentError) throw currentError;

  if (current.status === "PAID") {
    throw new Error(
      "A paid payment cannot be edited.",
    );
  }

  const { data, error } = await supabase
    .from("commission_payments")
    .update({
      amount,
    })
    .eq("id", paymentId)
    .select()
    .single();

  if (error) throw error;

  return data as CommissionPayment;
}

/**
 * Mark a commission payment as requested.
 *
 * The actual customer portal generation will be wired
 * separately once we build the commission portal flow.
 */
export async function markCommissionPaymentRequested(
  paymentId: string,
  customerLink?: string,
) {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("commission_payments")
    .update({
      status: "REQUESTED",
      requested_at: now,
      customer_link: customerLink ?? null,
    })
    .eq("id", paymentId)
    .select()
    .single();

  if (error) throw error;

  return data as CommissionPayment;
}

/**
 * Mark an individual commission payment as paid.
 */
export async function markCommissionPaymentPaid(
  paymentId: string,
) {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("commission_payments")
    .update({
      status: "PAID",
      paid_at: now,
    })
    .eq("id", paymentId)
    .select()
    .single();

  if (error) throw error;

  return data as CommissionPayment;
}

/**
 * Cancel a payment request.
 */
export async function cancelCommissionPayment(
  paymentId: string,
) {
  const { data, error } = await supabase
    .from("commission_payments")
    .update({
      status: "CANCELLED",
    })
    .eq("id", paymentId)
    .select()
    .single();

  if (error) throw error;

  return data as CommissionPayment;
}

/**
 * Calculate commission payment totals.
 */
export function calculateCommissionPaymentTotals(
  payments: CommissionPayment[],
) {
  const totalRequested = payments
    .filter(
      (payment) =>
        payment.status !== "CANCELLED",
    )
    .reduce(
      (total, payment) =>
        total + Number(payment.amount || 0),
      0,
    );

  const totalPaid = payments
    .filter(
      (payment) =>
        payment.status === "PAID",
    )
    .reduce(
      (total, payment) =>
        total + Number(payment.amount || 0),
      0,
    );

  const remaining = Math.max(
    totalRequested - totalPaid,
    0,
  );

  return {
    totalRequested,
    totalPaid,
    remaining,
  };
}