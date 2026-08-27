import { createFileRoute } from "@tanstack/react-router";
import { saveCommissionShippingAddress } from "@/services/inquiry.service";
import { useEffect, useState } from "react";
import {
  Check,
  Lock,
  Loader2,
  CreditCard,
} from "lucide-react";

export const Route = createFileRoute(
  "/commission-payment/$paymentId",
)({
  head: () => ({
    meta: [
      {
        title: "Commission Payment | Painttheory by Kamlesh Sahoo",
      },
      {
        name: "description",
        content:
          "Complete your commission payment securely.",
      },
    ],
  }),
  component: CommissionPaymentPage,
});

function AddressField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs text-muted-foreground">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground"
      />
    </div>
  );
}

type PaymentData = {
  id: string;
  inquiry_id: string;
  customer_token: string;
  payment_number: number;
  amount: number;
  status: string;
  customer_link: string | null;
  is_final: boolean;
};

function CommissionPaymentPage() {
  const { paymentId } = Route.useParams();

  const [payment, setPayment] =
    useState<PaymentData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openingCheckout, setOpeningCheckout] =
    useState(false);

  const [shippingName, setShippingName] =
  useState("");

  const [shippingPhone, setShippingPhone] =
  useState("");

  const [shippingAddressLine1, setShippingAddressLine1] =
  useState("");

  const [shippingAddressLine2, setShippingAddressLine2] =
  useState("");

  const [shippingCity, setShippingCity] =
  useState("");

  const [shippingState, setShippingState] =
  useState("");

  const [shippingPincode, setShippingPincode] =
  useState("");

  const [shippingLandmark, setShippingLandmark] =
  useState("");

  const [savingAddress, setSavingAddress] =
  useState(false);

  const [addressSubmitted, setAddressSubmitted] =
  useState(false);

  const paymentSuccessful =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get(
      "payment",
    ) === "success";

  useEffect(() => {
    loadPayment();
  }, [paymentId]);

  async function loadPayment() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-commission-payment-link`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            paymentId,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Unable to load this payment.",
        );
      }

      if (!result.payment) {
        throw new Error(
          "Payment information could not be loaded.",
        );
      }

      setPayment(result.payment);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load this payment.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handlePayment() {
    if (!payment?.customer_link) {
      return;
    }

    setOpeningCheckout(true);

    window.location.href =
      payment.customer_link;
  }

  
  async function submitShippingAddress() {
    if (!payment?.inquiry_id) {
        setError("Commission information could not be found.");
        return;
    }

    if (
        !shippingName.trim() ||
        !shippingPhone.trim() ||
        !shippingAddressLine1.trim() ||
        !shippingCity.trim() ||
        !shippingState.trim() ||
        !shippingPincode.trim()
    ) {
        setError(
        "Please fill in your name, phone, address, city, state and PIN code.",
        );
        return;
    }

    try {
        setSavingAddress(true);
        setError("");

        await saveCommissionShippingAddress(payment.id, {
        shipping_name: shippingName.trim(),
        shipping_phone: shippingPhone.trim(),
        shipping_address_line1:
            shippingAddressLine1.trim(),
        shipping_address_line2:
            shippingAddressLine2.trim(),
        shipping_city: shippingCity.trim(),
        shipping_state: shippingState.trim(),
        shipping_pincode: shippingPincode.trim(),
        shipping_landmark:
            shippingLandmark.trim(),
        });

        setAddressSubmitted(true);
    } catch (err: any) {
        console.error("SAVE ADDRESS ERROR:", err);

        const message =
            err?.message ||
            err?.details ||
            err?.hint ||
            "Could not save your shipping address.";

        setError(
            typeof message === "string"
                ? message
                : JSON.stringify(message),
        );
    } finally {
        setSavingAddress(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background px-5 py-16 sm:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto size-5 animate-spin text-accent" />

            <p className="mt-4 text-sm text-muted-foreground">
              Preparing your payment...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !payment) {
    return (
      <main className="min-h-screen bg-background px-5 py-16 sm:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
          <div className="w-full text-center">
            <p className="eyebrow">
              Commission Payment
            </p>

            <h1 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
              Payment unavailable
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground">
              {error ||
                "This payment request could not be loaded."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const amount = Number(payment.amount || 0);

  if (paymentSuccessful) {
    const showAddressForm =
        payment.status === "PAID" &&
        payment.is_final;

    if (addressSubmitted) {
        return (
        <main className="min-h-screen bg-background px-5 py-12 sm:px-8 sm:py-20">
            <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
            <div className="w-full text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-6" />
                </div>

                <p className="eyebrow mt-7">
                Address received
                </p>

                <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
                All set.
                </h1>

                <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                Your final payment and shipping details have
                been received successfully.
                </p>

                <p className="mt-7 text-xs leading-6 text-muted-foreground">
                I'll be in touch regarding the next step of
                your commission.
                </p>
            </div>
            </div>
        </main>
        );
    }

    return (
        <main className="min-h-screen bg-background px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-xl">
            <div className="text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-6" />
            </div>

            <p className="eyebrow mt-7">
                Payment received
            </p>

            <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
                Thank you.
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                Your commission payment has been received
                successfully.
            </p>
            </div>

            <div className="mx-auto mt-8 max-w-sm border-y border-border py-5">
            <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                Payment
                </span>

                <span className="font-medium text-foreground">
                #{payment.payment_number}
                </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                Amount
                </span>

                <span className="font-display text-xl text-foreground">
                ₹{amount.toLocaleString("en-IN")}
                </span>
            </div>
            </div>

            {showAddressForm ? (
            <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
                <p className="eyebrow">
                Final step
                </p>

                <h2 className="mt-2 font-display text-2xl text-foreground">
                Where should I send your artwork?
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Your final payment is complete. Please provide
                the shipping details for your commissioned
                artwork.
                </p>

                <div className="mt-7 space-y-4">
                <AddressField
                    label="Full name"
                    value={shippingName}
                    onChange={setShippingName}
                    placeholder="Your full name"
                />

                <AddressField
                    label="Phone"
                    value={shippingPhone}
                    onChange={setShippingPhone}
                    placeholder="Phone number"
                    type="tel"
                />

                <AddressField
                    label="Address line 1"
                    value={shippingAddressLine1}
                    onChange={setShippingAddressLine1}
                    placeholder="House / flat / building"
                />

                <AddressField
                    label="Address line 2"
                    value={shippingAddressLine2}
                    onChange={setShippingAddressLine2}
                    placeholder="Street / locality (optional)"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                    <AddressField
                    label="City"
                    value={shippingCity}
                    onChange={setShippingCity}
                    placeholder="City"
                    />

                    <AddressField
                    label="State"
                    value={shippingState}
                    onChange={setShippingState}
                    placeholder="State"
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <AddressField
                    label="PIN code"
                    value={shippingPincode}
                    onChange={setShippingPincode}
                    placeholder="PIN code"
                    type="text"
                    />

                    <AddressField
                    label="Landmark"
                    value={shippingLandmark}
                    onChange={setShippingLandmark}
                    placeholder="Landmark (optional)"
                    />
                </div>

                {error && (
                    <p className="text-sm text-destructive">
                    {error}
                    </p>
                )}

                <button
                    type="button"
                    onClick={submitShippingAddress}
                    disabled={savingAddress}
                    className="mt-2 flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {savingAddress
                    ? "Saving address..."
                    : "Submit shipping address"}
                </button>
                </div>
            </div>
            ) : (
            <p className="mt-7 text-center text-xs leading-6 text-muted-foreground">
                I'll be in touch regarding the next step of
                your commission.
            </p>
            )}
        </div>
        </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-10 sm:px-8 sm:py-16">
      <div className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center">
        <div className="w-full">
          {/* Header */}

          <div className="text-center">
            <p className="eyebrow">
              Kamlesh Sahoo Art
            </p>

            <h1 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Commission Payment
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground">
              A private payment request for your commissioned
              artwork.
            </p>
          </div>

          {/* Payment */}

          <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Payment
                  </p>

                  <p className="mt-1 font-display text-2xl text-foreground">
                    #{payment.payment_number}
                  </p>
                </div>

                <div className="flex size-11 items-center justify-center rounded-full bg-muted">
                  <CreditCard className="size-5 text-accent" />
                </div>
              </div>

              <div className="mt-8 border-t border-border pt-7">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Amount due
                </p>

                <p className="mt-2 font-display text-4xl text-foreground sm:text-5xl">
                  ₹{amount.toLocaleString("en-IN")}
                </p>
              </div>

              <button
                type="button"
                onClick={handlePayment}
                disabled={
                  openingCheckout ||
                  !payment.customer_link
                }
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {openingCheckout ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Opening secure payment...
                  </>
                ) : (
                  <>
                    <Lock className="size-4" />
                    Complete Payment
                  </>
                )}
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="size-3.5" />
                <span>
                  Secure payment powered by Razorpay
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}

          <div className="mt-8 text-center">
            <p className="text-xs leading-6 text-muted-foreground">
              If you have any questions regarding this
              payment, please contact the artist directly.
            </p>

            <p className="mt-5 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground/70">
              Kamlesh Sahoo Art
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}