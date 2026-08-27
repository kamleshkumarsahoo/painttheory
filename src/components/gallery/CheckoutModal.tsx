import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import type { Artwork } from "@/types/artwork";
import { formatPrice } from "@/types/artwork";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createInquiry } from "@/services/inquiry.service";

interface CheckoutModalProps {
  artwork: Artwork;
  open: boolean;
  onClose: () => void;
}

const SHIPPING = 0;

/*const paymentMethods = ["UPI", "Cards", "Net Banking", "Wallets"] as const;*/

type Stage = "review" | "processing" | "success";

/**
 * Checkout modal with a Razorpay integration placeholder.
 * Flow: Buy Now → review → (Razorpay) → success confirmation.
 * Swap `simulatePayment` with the real Razorpay checkout when keys are ready.
 */
export function CheckoutModal({ artwork, open, onClose }: CheckoutModalProps) {
  const [stage, setStage] = useState<Stage>("review");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submittedOrderNumber, setSubmittedOrderNumber] = useState("");

  const total = artwork.price + SHIPPING;

  function handleClose() {
    onClose();
    // Reset after the exit animation completes.
    setTimeout(() => setStage("review"), 300);
  }

  async function submitInquiry() {
    try {
      const missing = [];
      const trimmedEmail = email.trim();
      const trimmedPhone = phone.trim();

      if (!name.trim()) missing.push("name");
      if (!trimmedPhone) missing.push("WhatsApp number");
      if (!trimmedEmail) missing.push("email address");

      if (missing.length > 0) {
        toast.error(`Please add your ${missing.join(", ")}.`);
        return;
      }

      if (!isValidEmail(trimmedEmail)) {
        toast.error("Please enter a valid email address.");
        return;
      }

      if (!isValidPhone(trimmedPhone)) {
        toast.error("Please enter a valid WhatsApp number.");
        return;
      }

      setStage("processing");

      const inquiry = await createInquiry({
        artwork_id: artwork.id,
        artwork_price_snapshot: artwork.price,
        customer_name: name,
        customer_email: trimmedEmail,
        customer_phone: trimmedPhone,
        note,
      });

      setSubmittedOrderNumber(inquiry.order_number ?? inquiry.id.slice(0, 8));
      setStage("success");
    } catch (err) {
      console.error("Inquiry Error:", err);
      toast.error("Could not submit your request. Please try again.");
      setStage("review");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="scrollbar-none relative max-h-[calc(100dvh-1rem)] w-full max-w-lg overflow-y-auto overscroll-contain rounded-t-3xl bg-card shadow-frame sm:max-h-[min(90dvh,760px)] sm:rounded-3xl"
          >
            <button
              onClick={handleClose}
              aria-label="Close checkout"
              className="absolute right-5 top-5 z-10 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-5" />
            </button>

            {stage !== "success" ? (
              <div className="p-7 sm:p-9">
                <p className="eyebrow">Artwork Request</p>
                <h2 className="mt-2 font-display text-2xl text-foreground">Complete your collection</h2>

                {/* Artwork summary */}
                <div className="mt-6 flex gap-4 rounded-2xl bg-muted p-4">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    loading="lazy"
                    className="size-20 rounded-xl object-cover"
                  />
                  <div className="flex flex-col justify-center">
                    <h3 className="font-display text-lg text-foreground">{artwork.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {artwork.dimensions} · {artwork.medium}
                    </p>
                  </div>
                </div>

                {/* Price breakdown */}
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Artwork</dt>
                    <dd className="text-foreground">{formatPrice(artwork.price)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Shipping & insured packaging</dt>
                    <dd className="text-foreground">
                      {SHIPPING === 0 ? "FREE" : formatPrice(SHIPPING)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3 text-base">
                    <dt className="font-medium text-foreground">Total</dt>
                    <dd className="font-display text-lg text-foreground">{formatPrice(total)}</dd>
                  </div>
                </dl>

                <div className="mt-6 space-y-4">
                  <Field label="Your Name" required>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3"
                    />
                  </Field>

                  <Field label="WhatsApp Number" required>
                    <input
                      type="tel"
                      inputMode="tel"
                      placeholder="WhatsApp number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3"
                    />
                  </Field>

                  <Field label="Email Address" required>
                    <input
                      type="email"
                      inputMode="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3"
                    />
                  </Field>

                  <Field label="Message">
                    <textarea
                      placeholder="Anything you'd like to tell me? (Optional)"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={4}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3"
                    />
                  </Field>
                </div>

                {/* Payment methods 
                <div className="mt-6">
                  <p className="mb-3 text-sm text-muted-foreground">Payment method</p>
                  <div className="grid grid-cols-2 gap-2">
                    {paymentMethods.map((m) => (
                      <button
                        key={m}
                        onClick={() => setMethod(m)}
                        className={
                          "rounded-full border px-4 py-2.5 text-sm transition-all " +
                          (method === m
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border text-muted-foreground hover:border-foreground/40")
                        }
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>*/}

                <Button
                  size="lg"
                  className="mt-7 w-full"
                  onClick={submitInquiry}
                  disabled={stage === "processing"}
                >
                  {stage === "processing" ? (
                    <>
                      <Loader2 className="animate-spin" /> Submitting your request...
                    </>
                  ) : (
                    <>Request Artwork</>
                  )}
                </Button>

                <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="size-3.5" /> Your request will be personally reviewed before payment is requested.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center p-9 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground"
                >
                  <Check className="size-8" />
                </motion.div>
                <p className="eyebrow mt-6">Request Submitted</p>
                <h2 className="mt-2 font-display text-2xl text-foreground">Thank you!</h2>
                <p className="mt-2 text-muted-foreground">
                  Reference <span className="font-medium text-foreground">{submittedOrderNumber}</span>
                </p>
                <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                  Your request has been received successfully. I'll review it personally and get in touch with you shortly.
                </p>
                <Button variant="outline" className="mt-8" onClick={handleClose}>
                  Continue exploring
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isValidPhone(value: string) {
  const compact = value.replace(/[\s().-]/g, "");

  if (!/^\+?\d+$/.test(compact)) return false;

  const digits = compact.replace(/^\+/, "");
  if (digits.length === 10) return /^[6-9]\d{9}$/.test(digits);
  if (digits.length === 12 && digits.startsWith("91")) {
    return /^[6-9]\d{9}$/.test(digits.slice(2));
  }

  return digits.length >= 8 && digits.length <= 15;
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-2 block text-sm text-foreground">
        {label}
        {required && <span className="text-accent"> *</span>}
      </Label>
      {children}
    </div>
  );
}
