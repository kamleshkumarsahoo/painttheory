import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, ShieldCheck, X } from "lucide-react";
import type { Artwork } from "@/data/artworks";
import { formatPrice } from "@/data/artworks";
import { Button } from "@/components/ui/button";

interface CheckoutModalProps {
  artwork: Artwork;
  open: boolean;
  onClose: () => void;
}

const SHIPPING = 1500;

const paymentMethods = ["UPI", "Cards", "Net Banking", "Wallets"] as const;

type Stage = "review" | "processing" | "success";

/**
 * Checkout modal with a Razorpay integration placeholder.
 * Flow: Buy Now → review → (Razorpay) → success confirmation.
 * Swap `simulatePayment` with the real Razorpay checkout when keys are ready.
 */
export function CheckoutModal({ artwork, open, onClose }: CheckoutModalProps) {
  const [stage, setStage] = useState<Stage>("review");
  const [method, setMethod] = useState<(typeof paymentMethods)[number]>("UPI");
  const [orderNumber] = useState(
    () => "MSN-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
  );

  const total = artwork.price + SHIPPING;

  function handleClose() {
    onClose();
    // Reset after the exit animation completes.
    setTimeout(() => setStage("review"), 300);
  }

  // Razorpay placeholder — replace with real razorpay.open() once enabled.
  function simulatePayment() {
    setStage("processing");
    setTimeout(() => setStage("success"), 2200);
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
            className="relative w-full max-w-lg overflow-hidden rounded-t-3xl bg-card shadow-frame sm:rounded-3xl"
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
                <p className="eyebrow">Secure checkout</p>
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
                    <dd className="text-foreground">{formatPrice(SHIPPING)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3 text-base">
                    <dt className="font-medium text-foreground">Total</dt>
                    <dd className="font-display text-lg text-foreground">{formatPrice(total)}</dd>
                  </div>
                </dl>

                {/* Payment methods */}
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
                </div>

                <Button
                  size="lg"
                  className="mt-7 w-full"
                  onClick={simulatePayment}
                  disabled={stage === "processing"}
                >
                  {stage === "processing" ? (
                    <>
                      <Loader2 className="animate-spin" /> Contacting Razorpay…
                    </>
                  ) : (
                    <>Pay {formatPrice(total)}</>
                  )}
                </Button>

                <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="size-3.5" /> Secured via Razorpay · UPI, Cards, Net Banking & Wallets
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
                <p className="eyebrow mt-6">Payment successful</p>
                <h2 className="mt-2 font-display text-2xl text-foreground">Thank you for collecting</h2>
                <p className="mt-2 text-muted-foreground">
                  Order <span className="font-medium text-foreground">{orderNumber}</span>
                </p>
                <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                  We'll carefully prepare your artwork and send tracking details shortly. A
                  Certificate of Authenticity travels with every original.
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
