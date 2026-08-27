import { useEffect, useMemo, useState } from "react";

import {
  updateInquiryStatus,
} from "@/services/inquiry.service";

import {
  ArrowLeft,
  Check,
  Clock3,
  Copy,
  Mail,
  Pencil,
  Phone,
  Save,
  X,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { supabase } from "@/lib/supabase";
import { formatDateTime } from "@/lib/date";

type CommissionReviewProps = {
  inquiry: any;
};

const STATUS_OPTIONS = [
  "NEW",
  "REVIEWED",
  "PAYMENT_REQUESTED",
  "PAID",
  "ADDRESS_RECEIVED",
  "SHIPPED",
  "DELIVERED",
  "DISCARDED",
];

const WORKFLOW = [
  {
    key: "REVIEWED",
    label: "Reviewed",
    timestamp: "reviewed_at",
  },
  {
    key: "PAYMENT_REQUESTED",
    label: "Payment requested",
    timestamp: "payment_requested_at",
  },
  {
    key: "PAID",
    label: "Paid",
    timestamp: "paid_at",
  },
  {
    key: "ADDRESS_RECEIVED",
    label: "Address received",
    timestamp: "address_received_at",
  },
  {
    key: "SHIPPED",
    label: "Shipped",
    timestamp: "shipped_at",
  },
  {
    key: "DELIVERED",
    label: "Delivered",
    timestamp: "delivered_at",
  },
] as const;

function formatDate(date?: string | null) {
  return formatDateTime(date) || "Not recorded";
}

function formatStatus(status: string) {
  return status
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getWorkflowIndex(status: string) {
  switch (status) {
    case "REVIEWED":
      return 0;
    case "PAYMENT_REQUESTED":
      return 1;
    case "PAID":
      return 2;
    case "ADDRESS_RECEIVED":
      return 3;
    case "SHIPPED":
      return 4;
    case "DELIVERED":
      return 5;
    default:
      return -1;
  }
}

function getLogLabel(key: string) {
  switch (key) {
    case "created_at":
      return "Request received";
    case "reviewed_at":
      return "Reviewed";
    case "payment_requested_at":
      return "Payment requested";
    case "paid_at":
      return "Payment completed";
    case "address_submitted_at":
      return "Address submitted";
    case "address_received_at":
      return "Address received";
    case "communication_sent_at":
      return "Communication sent";
    case "shipped_at":
      return "Shipped";
    case "delivered_at":
      return "Delivered";
    default:
      return key;
  }
}

function formatPrice(amount?: number | null) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount ?? 0);
}

export function CommissionReview({
  inquiry,
}: CommissionReviewProps) {
  const navigate = useNavigate();

  /*
   * ============================================================
   * CUSTOMER
   * ============================================================
   */

  const [editingCustomer, setEditingCustomer] = useState(false);
  const [savingCustomer, setSavingCustomer] = useState(false);

  const [customerName, setCustomerName] = useState(
    inquiry.customer_name ?? "",
  );

  const [customerEmail, setCustomerEmail] = useState(
    inquiry.customer_email ?? "",
  );

  const [customerPhone, setCustomerPhone] = useState(
    inquiry.customer_phone ?? "",
  );

  const [addressLine1, setAddressLine1] = useState(
    inquiry.shipping_address_line1 ?? "",
  );

  const [addressLine2, setAddressLine2] = useState(
    inquiry.shipping_address_line2 ?? "",
  );

  const [city, setCity] = useState(
    inquiry.shipping_city ?? "",
  );

  const [state, setState] = useState(
    inquiry.shipping_state ?? "",
  );

  const [pincode, setPincode] = useState(
    inquiry.shipping_pincode ?? "",
  );

  const [landmark, setLandmark] = useState(
    inquiry.shipping_landmark ?? "",
  );

  useEffect(() => {
    setCustomerName(inquiry.customer_name ?? "");
    setCustomerEmail(inquiry.customer_email ?? "");
    setCustomerPhone(inquiry.customer_phone ?? "");
    setAddressLine1(
      inquiry.shipping_address_line1 ?? "",
    );
    setAddressLine2(
      inquiry.shipping_address_line2 ?? "",
    );
    setCity(inquiry.shipping_city ?? "");
    setState(inquiry.shipping_state ?? "");
    setPincode(inquiry.shipping_pincode ?? "");
    setLandmark(inquiry.shipping_landmark ?? "");
  }, [
    inquiry.id,
    inquiry.customer_name,
    inquiry.customer_email,
    inquiry.customer_phone,
    inquiry.shipping_address_line1,
    inquiry.shipping_address_line2,
    inquiry.shipping_city,
    inquiry.shipping_state,
    inquiry.shipping_pincode,
    inquiry.shipping_landmark,
  ]);

  async function saveCustomerDetails() {
    if (!customerName.trim()) {
      toast.error("Customer name is required.");
      return;
    }

    if (!customerEmail.trim()) {
      toast.error("Customer email is required.");
      return;
    }

    if (!customerPhone.trim()) {
      toast.error("Customer phone is required.");
      return;
    }

    try {
      setSavingCustomer(true);

      const { error } = await supabase
        .from("inquiries")
        .update({
          customer_name: customerName.trim(),
          customer_email: customerEmail.trim(),
          customer_phone: customerPhone.trim(),

          shipping_name: customerName.trim(),
          shipping_phone: customerPhone.trim(),

          shipping_address_line1:
            addressLine1.trim() || null,
          shipping_address_line2:
            addressLine2.trim() || null,
          shipping_city: city.trim() || null,
          shipping_state: state.trim() || null,
          shipping_pincode: pincode.trim() || null,
          shipping_landmark: landmark.trim() || null,

          updated_at: new Date().toISOString(),
        })
        .eq("id", inquiry.id);

      if (error) throw error;

      toast.success("Customer details updated.");
      setEditingCustomer(false);
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Could not save customer details.",
      );
    } finally {
      setSavingCustomer(false);
    }
  }

  /*
   * ============================================================
   * STATUS
   * ============================================================
   */

  const [pendingStatus, setPendingStatus] = useState(
    inquiry.inquiry_status ?? "NEW",
  );

  const effectiveStatus =
    inquiry.inquiry_status ?? "NEW";

  async function updateStatus() {
    if (!pendingStatus) {
        toast.error("Select a status first.");
        return;
    }

    if (pendingStatus === effectiveStatus) {
        toast.message(
        "This is already the current status.",
        );
        return;
    }

    try {
        await updateInquiryStatus(
        inquiry.id,
        pendingStatus,
        );

        toast.success(
        `Status updated to ${formatStatus(
            pendingStatus,
        )}.`,
        );

        window.location.reload();
    } catch (error) {
        console.error(error);

        toast.error(
        error instanceof Error
            ? error.message
            : "Could not update status.",
        );
    }
  }

  /*
   * ============================================================
   * COMMISSION PAYMENTS
   * ============================================================
   */

  const [payments, setPayments] = useState<any[]>([]);
  const [loadingPayments, setLoadingPayments] =
    useState(true);

  const [newPaymentAmount, setNewPaymentAmount] =
    useState("");

  const [isFinalPayment, setIsFinalPayment] =
    useState(false);

  const [creatingPayment, setCreatingPayment] =
    useState(false);

  async function loadPayments() {
    try {
      setLoadingPayments(true);

      const { data, error } = await supabase
        .from("commission_payments")
        .select(`
          id,
          inquiry_id,
          payment_number,
          amount,
          status,
          customer_link,
          requested_at,
          paid_at,
          created_at
        `)
        .eq("inquiry_id", inquiry.id)
        .order("payment_number", {
          ascending: true,
        });

      if (error) throw error;

      setPayments(data ?? []);
    } catch (error) {
      console.error(error);
      toast.error(
        "Could not load commission payments.",
      );
    } finally {
      setLoadingPayments(false);
    }
  }

  useEffect(() => {
    loadPayments();
  }, [inquiry.id]);

  const totalRequested = payments.reduce(
    (total, payment) =>
      total + Number(payment.amount || 0),
    0,
  );

  const totalPaid = payments
    .filter(
      (payment) => payment.status === "PAID",
    )
    .reduce(
      (total, payment) =>
        total + Number(payment.amount || 0),
      0,
    );

  const remainingAmount = Math.max(
    totalRequested - totalPaid,
    0,
  );

  const nextPaymentNumber =
    payments.length > 0
      ? Math.max(
          ...payments.map((payment) =>
            Number(payment.payment_number || 0),
          ),
        ) + 1
      : 1;

  async function createPayment() {
    const amount = Number(
      newPaymentAmount.replace(/,/g, "").trim(),
    );

    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error("Enter a valid payment amount.");
      return;
    }

    try {
      setCreatingPayment(true);

      const { data: payment, error: insertError } =
        await supabase
          .from("commission_payments")
          .insert({
            inquiry_id: inquiry.id,
            payment_number: nextPaymentNumber,
            amount,
            status: "PENDING",
            is_final: isFinalPayment,
          })
          .select()
          .single();

      if (insertError) throw insertError;

      const { data, error } =
        await supabase.functions.invoke(
          "create-commission-payment-link",
          {
            body: {
              paymentId: payment.id,
            },
          },
        );

      if (error) throw error;

      if (!data?.success) {
        throw new Error(
          data?.error ??
            "Could not create payment link.",
        );
      }

      setNewPaymentAmount("");
      setIsFinalPayment(false);

      await loadPayments();

      toast.success(
        `Payment ${nextPaymentNumber} created.`,
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Could not create commission payment.",
      );
    } finally {
      setCreatingPayment(false);
    }
  }

  async function copyPaymentLink(link: string) {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Payment link copied.");
    } catch {
      toast.error("Could not copy payment link.");
    }
  }

  function sendPaymentWhatsApp(payment: any) {
  if (!payment.customer_link) {
    toast.error("Payment link is not available.");
    return;
  }

  const phone = inquiry.customer_phone?.replace(
    /\D/g,
    "",
  );

  if (!phone) {
    toast.error("Customer phone number is not available.");
    return;
  }

  const message = [
    `Hi ${inquiry.customer_name},`,
    ``,
    `Here is the payment link for Payment ${payment.payment_number} of your commission.`,
    ``,
    `Amount: ${formatPrice(Number(payment.amount))}`,
    ``,
    payment.customer_link,
    ``,
    `Please let me know once the payment is completed.`,
    ``,
    `Regards,`,
    `Kamlesh Sahoo`,
  ].join("\n");

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank",
  );
}

async function sendPaymentEmail(payment: any) {
  if (!payment.customer_link) {
    toast.error("Payment link is not available.");
    return;
  }

  try {
    toast.loading("Sending payment email...", {
      id: `payment-email-${payment.id}`,
    });

    const { data, error } =
      await supabase.functions.invoke(
        "send-email",
        {
          body: {
            inquiryId: inquiry.id,
            template: "commission-payment",
            paymentId: payment.id,
          },
        },
      );

    if (error) throw error;

    if (data?.success === false) {
      throw new Error(
        data.error ||
          "Failed to send payment email.",
      );
    }

    toast.success(
      "Payment email sent successfully.",
      {
        id: `payment-email-${payment.id}`,
      },
    );
  } catch (error) {
    console.error(error);

    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to send payment email.",
      {
        id: `payment-email-${payment.id}`,
      },
    );
  }
}

  /*
   * ============================================================
   * ARTIST NOTES
   * ============================================================
   */

  const [artistNotes, setArtistNotes] = useState(
    inquiry.artist_notes ?? "",
  );

  const [savingNotes, setSavingNotes] =
    useState(false);

  async function saveArtistNotes() {
    try {
      setSavingNotes(true);

      const { error } = await supabase
        .from("inquiries")
        .update({
          artist_notes: artistNotes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", inquiry.id);

      if (error) throw error;

      toast.success("Private notes saved.");
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Could not save notes.",
      );
    } finally {
      setSavingNotes(false);
    }
  }

  /*
   * ============================================================
   * COMMUNICATION
   * ============================================================
   */

  const phoneNumber =
    customerPhone.replace(/\D/g, "");

  const callUrl = phoneNumber
    ? `tel:${phoneNumber}`
    : "#";

  const whatsappUrl = phoneNumber
    ? `https://wa.me/${phoneNumber}`
    : "#";

  const [showEmail, setShowEmail] =
    useState(false);

  const [emailSubject, setEmailSubject] =
    useState("Let's talk about your commission");

  const [emailBody, setEmailBody] =
    useState(
      `Hi ${inquiry.customer_name},

Thank you for reaching out about your commission. I've reviewed your request and would love to discuss it with you.

We can talk in whichever way is easiest for you - phone, WhatsApp, or email. Feel free to reach out and we can discuss your idea, requirements and next steps.

Looking forward to hearing from you.

Regards,
Kamlesh Sahoo
Painttheory`,
    );

  const [sendingEmail, setSendingEmail] =
    useState(false);

  async function sendEmail() {
    if (!emailSubject.trim()) {
      toast.error("Email subject is required.");
      return;
    }

    if (!emailBody.trim()) {
      toast.error("Email body is required.");
      return;
    }

    try {
      setSendingEmail(true);

      const { error } =
        await supabase.functions.invoke(
          "send-email",
          {
            body: {
              inquiryId: inquiry.id,
              template: "commission-conversation",
              subject: emailSubject,
              body: emailBody,
            },
          },
        );

      if (error) throw error;

      toast.success(
        "Conversation email sent.",
      );

      setShowEmail(false);
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send email.",
      );
    } finally {
      setSendingEmail(false);
    }
  }

  /*
   * ============================================================
   * DELETE
   * ============================================================
   */

  async function deleteRequest() {
    const confirmed = window.confirm(
      `Delete this request from ${inquiry.customer_name}?\n\nThis cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from("inquiries")
        .delete()
        .eq("id", inquiry.id);

      if (error) throw error;

      toast.success("Request deleted.");

      navigate({
        to: "/admin",
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Could not delete request.",
      );
    }
  }

  /*
   * ============================================================
   * ADDRESS
   * ============================================================
   */

  const displayAddress = [
    inquiry.shipping_address_line1,
    inquiry.shipping_address_line2,
    [
      inquiry.shipping_city,
      inquiry.shipping_state,
    ]
      .filter(Boolean)
      .join(", "),
    inquiry.shipping_pincode,
    inquiry.shipping_landmark
      ? `Landmark: ${inquiry.shipping_landmark}`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  /*
   * ============================================================
   * WORKFLOW + LOGS
   * ============================================================
   */

  const currentWorkflowIndex =
    getWorkflowIndex(effectiveStatus);

  const logs = useMemo(() => {
    const candidates = [
      {
        key: "created_at",
        value: inquiry.created_at,
      },

      ...WORKFLOW.map((item) => ({
        key: item.timestamp,
        value: inquiry[item.timestamp],
      })),

      {
        key: "address_submitted_at",
        value: inquiry.address_submitted_at,
      },

      {
        key: "communication_sent_at",
        value: inquiry.communication_sent_at,
      },
    ];

    return candidates
      .filter((item) => item.value)
      .sort(
        (a, b) =>
          new Date(a.value).getTime() -
          new Date(b.value).getTime(),
      );
  }, [inquiry]);

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-9">

        {/* HEADER */}

        <header className="border-b border-border pb-5 sm:pb-6">
          <button
            type="button"
            onClick={() =>
              navigate({
                to: "/admin",
              })
            }
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to inquiries
          </button>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="max-w-full break-words font-display text-2xl leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  Commission request
                </h1>

                <StatusBadge
                  status={effectiveStatus}
                />
              </div>

              <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
                Received{" "}
                {formatDate(inquiry.created_at)}
              </p>
            </div>

            <div className="flex items-center gap-2 sm:block sm:text-right">
              <span className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                Reference
              </span>

              <span className="font-mono text-xs text-foreground">
                {inquiry.order_number ??
                  inquiry.id.slice(0, 8)}
              </span>
            </div>
          </div>
        </header>

        {/* DETAILS */}

        <div className="grid lg:grid-cols-2">

          {/* COMMISSION REQUEST */}

          <section className="border-b border-border py-6 lg:border-r lg:py-7 lg:pr-8">
            <p className="eyebrow">
              Request details
            </p>

            <div className="mt-5 space-y-5">
              <InfoRow
                label="Request type"
                value="Custom commission"
              />

              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Customer message
                </p>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-foreground">
                  {inquiry.note ||
                    "No message provided."}
                </p>
              </div>

              {inquiry.description && (
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                    Description
                  </p>

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                    {inquiry.description}
                  </p>
                </div>
              )}

              {inquiry.budget && (
                <InfoRow
                  label="Budget"
                  value={inquiry.budget}
                />
              )}

              {inquiry.deadline && (
                <InfoRow
                  label="Deadline"
                  value={formatDate(
                    inquiry.deadline,
                  )}
                />
              )}
            </div>
          </section>

          {/* CUSTOMER */}

          <section className="border-b border-border py-6 lg:border-b-0 lg:py-7 lg:pl-8">
            <div className="flex items-center justify-between gap-4">
              <p className="eyebrow">
                Customer details
              </p>

              {!editingCustomer ? (
                <button
                  type="button"
                  onClick={() =>
                    setEditingCustomer(true)
                  }
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="size-3" />
                  Edit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setEditingCustomer(false)
                  }
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
              )}
            </div>

            {editingCustomer ? (
              <div className="mt-5 space-y-3.5">
                <EditField
                  label="Name"
                  value={customerName}
                  onChange={setCustomerName}
                />

                <EditField
                  label="Email"
                  type="email"
                  value={customerEmail}
                  onChange={setCustomerEmail}
                />

                <EditField
                  label="Phone"
                  value={customerPhone}
                  onChange={setCustomerPhone}
                />

                <div>
                  <Label className="text-xs font-normal text-muted-foreground">
                    Address
                  </Label>

                  <div className="mt-2 space-y-2.5">
                    <Input
                      className="h-9"
                      placeholder="Address line 1"
                      value={addressLine1}
                      onChange={(event) =>
                        setAddressLine1(
                          event.target.value,
                        )
                      }
                    />

                    <Input
                      className="h-9"
                      placeholder="Address line 2"
                      value={addressLine2}
                      onChange={(event) =>
                        setAddressLine2(
                          event.target.value,
                        )
                      }
                    />

                    <div className="grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2">
                      <Input
                        className="h-9"
                        placeholder="City"
                        value={city}
                        onChange={(event) =>
                          setCity(
                            event.target.value,
                          )
                        }
                      />

                      <Input
                        className="h-9"
                        placeholder="State"
                        value={state}
                        onChange={(event) =>
                          setState(
                            event.target.value,
                          )
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2">
                      <Input
                        className="h-9"
                        placeholder="PIN"
                        value={pincode}
                        onChange={(event) =>
                          setPincode(
                            event.target.value,
                          )
                        }
                      />

                      <Input
                        className="h-9"
                        placeholder="Landmark"
                        value={landmark}
                        onChange={(event) =>
                          setLandmark(
                            event.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button
                  size="sm"
                  onClick={saveCustomerDetails}
                  disabled={savingCustomer}
                >
                  <Save className="size-3.5" />
                  {savingCustomer
                    ? "Saving..."
                    : "Save"}
                </Button>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                <InfoRow
                  label="Name"
                  value={
                    inquiry.customer_name ||
                    "Not provided"
                  }
                />

                <InfoRow
                  label="Email"
                  value={
                    inquiry.customer_email ||
                    "Not provided"
                  }
                />

                <InfoRow
                  label="Phone"
                  value={
                    inquiry.customer_phone ||
                    "Not provided"
                  }
                />

                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                    Address
                  </p>

                  <p className="mt-1.5 whitespace-pre-line break-words text-sm leading-6 text-foreground">
                    {displayAddress ||
                      "Not received yet"}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* ACTIONS */}

        <section className="border-b border-border py-6 sm:py-7">
          <p className="eyebrow">
            Actions
          </p>

          <div className="mt-5">
            <Label className="text-xs font-normal text-muted-foreground">
              Update status
            </Label>

            <div className="mt-2 flex w-full max-w-xl flex-col gap-2 min-[420px]:flex-row">
              <select
                value={pendingStatus}
                onChange={(event) =>
                  setPendingStatus(
                    event.target.value,
                  )
                }
                className="h-10 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-foreground"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {formatStatus(status)}
                  </option>
                ))}
              </select>

              <Button
                type="button"
                size="sm"
                className="h-10 min-[420px]:shrink-0"
                onClick={updateStatus}
              >
                Update status
              </Button>
            </div>
          </div>

          {/* WORKFLOW */}

          <div className="mt-7">
            <p className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
              Workflow
            </p>

            <div className="mt-3 max-w-xl space-y-1">
              {WORKFLOW.map(
                (step, index) => {
                  const completed =
                    index <=
                    currentWorkflowIndex;

                  const timestamp =
                    inquiry[
                      step.timestamp
                    ];

                  return (
                    <div
                      key={step.key}
                      className="relative flex min-h-9 items-center gap-3"
                    >
                      {index <
                        WORKFLOW.length - 1 && (
                        <div
                          className={`absolute left-[11px] top-7 h-5 w-px ${
                            index <
                            currentWorkflowIndex
                              ? "bg-foreground"
                              : "bg-border"
                          }`}
                        />
                      )}

                      <div
                        className={`relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border ${
                          completed
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-background text-transparent"
                        }`}
                      >
                        <Check className="size-3" />
                      </div>

                      <p
                        className={`min-w-0 flex-1 text-sm ${
                          completed
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </p>

                      {timestamp && (
                        <span className="hidden shrink-0 text-right text-[11px] text-muted-foreground min-[480px]:block">
                          {formatDate(timestamp)}
                        </span>
                      )}
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </section>

        {/* PAYMENTS */}

        <section className="border-b border-border py-6 sm:py-7">
          <div>
            <p className="eyebrow">
              Payments
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Track individual commission payments.
            </p>
          </div>

          {loadingPayments ? (
            <p className="mt-5 text-sm text-muted-foreground">
              Loading payments...
            </p>
          ) : payments.length === 0 ? (
            <p className="mt-5 text-sm text-muted-foreground">
              No payments created yet.
            </p>
          ) : (
            <div className="mt-5 max-w-2xl divide-y divide-border">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex flex-col gap-3 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-foreground">
                        Payment{" "}
                        {payment.payment_number}
                      </p>

                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                          payment.status ===
                          "PAID"
                            ? "bg-foreground text-background"
                            : payment.status ===
                                "REQUESTED"
                              ? "bg-secondary text-foreground"
                              : "border border-border text-muted-foreground"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </div>

                    <p className="mt-1 font-display text-xl text-foreground">
                      {formatPrice(
                        Number(payment.amount),
                      )}
                    </p>

                    <div className="mt-1 text-xs text-muted-foreground">
                      {payment.status ===
                      "PAID"
                        ? `Paid ${formatDate(
                            payment.paid_at,
                          )}`
                        : payment.requested_at
                          ? `Requested ${formatDate(
                              payment.requested_at,
                            )}`
                          : "Not requested yet"}
                    </div>
                  </div>

                  {payment.customer_link && (
                    <div className="flex flex-wrap items-center gap-2">
                        <a
                        href={payment.customer_link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-muted-foreground hover:text-foreground hover:underline"
                        >
                        Open payment link
                        </a>

                        <button
                        type="button"
                        onClick={() =>
                            copyPaymentLink(payment.customer_link)
                        }
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs text-foreground transition-colors hover:bg-secondary"
                        >
                        <Copy className="size-3.5" />
                        Copy
                        </button>

                        {payment.status !== "PAID" && (
                        <>
                            <button
                            type="button"
                            onClick={() =>
                                sendPaymentWhatsApp(payment)
                            }
                            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs text-foreground transition-colors hover:bg-secondary"
                            >
                            WhatsApp
                            </button>

                            <button
                            type="button"
                            onClick={() =>
                                sendPaymentEmail(payment)
                            }
                            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs text-foreground transition-colors hover:bg-secondary"
                            >
                            <Mail className="size-3.5" />
                            Email
                            </button>
                        </>
                        )}
                    </div>
                    )}

                </div>
              ))}
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-5 min-[480px]:grid-cols-3">
            <InfoRow
              label="Total requested"
              value={formatPrice(totalRequested)}
            />

            <InfoRow
              label="Total paid"
              value={formatPrice(totalPaid)}
            />

            <InfoRow
              label="Remaining"
              value={formatPrice(remainingAmount)}
            />
          </div>

          <div className="mt-6 max-w-md">
            <Label className="text-xs font-normal text-muted-foreground">
                Create payment {nextPaymentNumber}
            </Label>

            <div className="mt-2 flex flex-col gap-2 min-[420px]:flex-row">
                <div className="relative min-w-0 flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    ₹
                </span>

                <Input
                    value={newPaymentAmount}
                    onChange={(event) =>
                    setNewPaymentAmount(event.target.value)
                    }
                    inputMode="decimal"
                    placeholder="Payment amount"
                    className="h-10 pl-8"
                />
                </div>

                <Button
                type="button"
                size="sm"
                className="h-10 min-[420px]:shrink-0"
                onClick={createPayment}
                disabled={creatingPayment}
                >
                {creatingPayment
                    ? "Creating..."
                    : `Create payment ${nextPaymentNumber}`}
                </Button>
            </div>

            <label className="mt-3 flex cursor-pointer items-start gap-2.5">
                <input
                type="checkbox"
                checked={isFinalPayment}
                onChange={(event) =>
                    setIsFinalPayment(event.target.checked)
                }
                className="mt-0.5 size-4 accent-primary"
                />

                <span>
                <span className="block text-sm text-foreground">
                    Final payment
                </span>

                <span className="block text-xs leading-5 text-muted-foreground">
                    After this payment is completed, the customer
                    will be asked to provide their shipping address.
                </span>
                </span>
            </label>
          </div>
        </section>

        {/* LOGS */}

        <section className="border-b border-border py-6 sm:py-7">
          <p className="eyebrow">
            Logs
          </p>

          {logs.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No activity recorded yet.
            </p>
          ) : (
            <div className="mt-5 max-w-xl space-y-3.5">
              {logs.map((log, index) => (
                <div
                  key={`${log.key}-${index}`}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-border">
                    {log.key ===
                    "created_at" ? (
                      <Clock3 className="size-3 text-muted-foreground" />
                    ) : (
                      <Check className="size-3 text-muted-foreground" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-foreground">
                      {getLogLabel(log.key)}
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {formatDate(log.value)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* COMMUNICATION */}

        <section className="border-b border-border py-6 sm:py-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">
                Communication
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Contact{" "}
                {customerName ||
                  inquiry.customer_name ||
                  "customer"}{" "}
                using whichever method is convenient.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:flex sm:shrink-0">
              <button
                type="button"
                onClick={() =>
                  setShowEmail(true)
                }
                className="inline-flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg border border-border px-2 text-xs text-foreground transition-colors hover:bg-secondary sm:px-3 sm:text-sm"
              >
                <Mail className="size-3.5 shrink-0 sm:size-4" />
                <span>Email</span>
              </button>

              <a
                href={callUrl}
                onClick={(event) => {
                  if (!phoneNumber) {
                    event.preventDefault();
                    toast.error(
                      "Customer phone number is not available.",
                    );
                  }
                }}
                className="inline-flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg border border-border px-2 text-xs text-foreground transition-colors hover:bg-secondary sm:px-3 sm:text-sm"
              >
                <Phone className="size-3.5 shrink-0 sm:size-4" />
                <span>Call</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => {
                  if (!phoneNumber) {
                    event.preventDefault();
                    toast.error(
                      "Customer phone number is not available.",
                    );
                  }
                }}
                className="inline-flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg border border-border px-2 text-xs text-foreground transition-colors hover:bg-secondary sm:px-3 sm:text-sm"
              >
                <span className="text-sm leading-none">
                  ◌
                </span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* ARTIST NOTES */}

        <section className="border-b border-border py-6 sm:py-7">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow">
              Artist notes
            </p>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2.5 text-xs"
              onClick={saveArtistNotes}
              disabled={savingNotes}
            >
              {savingNotes
                ? "Saving..."
                : "Save"}
            </Button>
          </div>

          <Textarea
            value={artistNotes}
            onChange={(event) =>
              setArtistNotes(
                event.target.value,
              )
            }
            placeholder="Private note..."
            rows={2}
            className="mt-3 resize-none border-border bg-secondary/20 shadow-none focus-visible:ring-1"
          />
        </section>

        {/* DELETE */}

        <div className="py-5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={deleteRequest}
          >
            Delete request
          </Button>
        </div>
      </main>

      {/* EMAIL MODAL */}

      {showEmail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
          <div className="flex h-[94dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-border bg-card shadow-lift sm:h-auto sm:max-h-[90vh] sm:max-w-3xl sm:rounded-2xl">
            <div className="flex shrink-0 items-start justify-between border-b border-border px-4 py-4 sm:px-5">
              <div>
                <p className="eyebrow">
                  Email
                </p>

                <h2 className="mt-1 font-display text-lg sm:text-xl">
                  Start conversation
                </h2>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="h-8"
                onClick={() =>
                  setShowEmail(false)
                }
              >
                Close
              </Button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
              <div>
                <Label>To</Label>

                <Input
                  value={`${inquiry.customer_name} <${inquiry.customer_email}>`}
                  readOnly
                  className="mt-1.5 bg-secondary/30"
                />
              </div>

              <div className="mt-4">
                <Label>Subject</Label>

                <Input
                  value={emailSubject}
                  onChange={(event) =>
                    setEmailSubject(
                      event.target.value,
                    )
                  }
                  className="mt-1.5"
                />
              </div>

              <div className="mt-4">
                <Label>Message</Label>

                <Textarea
                  value={emailBody}
                  onChange={(event) =>
                    setEmailBody(
                      event.target.value,
                    )
                  }
                  rows={12}
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="flex shrink-0 gap-2 border-t border-border px-4 py-3 sm:justify-end sm:px-5">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
                onClick={() =>
                  setShowEmail(false)
                }
              >
                Cancel
              </Button>

              <Button
                size="sm"
                className="flex-1 sm:flex-none"
                onClick={sendEmail}
                disabled={sendingEmail}
              >
                <Mail className="size-4" />

                {sendingEmail
                  ? "Sending..."
                  : "Send email"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   INFO ROW
============================================================ */

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>

      <p className="mt-1.5 break-words text-sm text-foreground">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   EDIT FIELD
============================================================ */

function EditField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <Label className="text-xs font-normal text-muted-foreground">
        {label}
      </Label>

      <Input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-1.5 h-9"
      />
    </div>
  );
}