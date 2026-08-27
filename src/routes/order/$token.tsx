import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BadgeCheck, Check, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getInquiryByToken,
  saveShippingAddress,
} from "@/services/inquiry.service";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Wallet, MapPinned, ChevronRight } from "lucide-react";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";


export const Route = createFileRoute("/order/$token")({
  head: () => ({
    meta: [
      {
        title: "Your Artwork Has Been Reserved",
      },
      {
        name: "description",
        content:
          "Complete your purchase securely from your private collector portal.",
      },
    ],
  }),
  component: CustomerOrderPage,
});

function getArtworkImage(artwork: any) {
  const media = artwork?.artwork_media ?? [];

  const primary =
    media.find(
      (item: any) => item.role === "primary",
    ) ??
    [...media].sort(
      (a: any, b: any) =>
        (a.sort_order ?? 0) -
        (b.sort_order ?? 0),
    )[0];

  if (!primary) {
    return null;
  }

  const path =
    primary.medium_path ??
    primary.thumb_path ??
    primary.large_path ??
    primary.original_path;

  if (!path) {
    return null;
  }

  return supabase.storage
    .from("artworks")
    .getPublicUrl(path)
    .data.publicUrl;
}

function CustomerOrderPage() {
  const { token } = Route.useParams();
  const [inquiry, setInquiry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [savingAddress, setSavingAddress] = useState(false);
  const [paidStage, setPaidStage] = useState<
    "confirmed" | "thanks" | "delivered"
  >("confirmed");
  const [address, setAddress] = useState({
    shipping_name: inquiry?.customer_name ?? "",
    shipping_phone: inquiry?.customer_phone ?? "",
    shipping_address_line1: "",
    shipping_address_line2: "",
    shipping_city: "",
    shipping_state: "",
    shipping_pincode: "",
    shipping_landmark: "",
  });
  const [isOpeningCheckout, setIsOpeningCheckout] = useState(false);

  useEffect(() => {
    loadInquiry();
  }, [token]);

  async function loadInquiry() {
    try {
      const data = await getInquiryByToken(token);
      setInquiry(data);
      if (data.inquiry_status === "DELIVERED") {
        setPaidStage("delivered");
      } else if (data.address_received_at) {
        setPaidStage("thanks");
      } else {
        setPaidStage("confirmed");
      }
      setAddress({
      shipping_name: data.customer_name ?? "",
      shipping_phone: data.customer_phone ?? "",
      shipping_address_line1: data.shipping_address_line1 ?? "",
      shipping_address_line2: data.shipping_address_line2 ?? "",
      shipping_city: data.shipping_city ?? "",
      shipping_state: data.shipping_state ?? "",
      shipping_pincode: data.shipping_pincode ?? "",
      shipping_landmark: data.shipping_landmark ?? "",
    });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  async function handlePayment() {
    setIsOpeningCheckout(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-link`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            inquiryId: inquiry.id,
          }),
        }
      );

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error);
      }
      window.location.href = result.url;
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Payment failed");
      setIsOpeningCheckout(false);
    }
  }

  async function handleSaveAddress() {
    try {
      const requiredFields = [
        address.shipping_name,
        address.shipping_phone,
        address.shipping_address_line1,
        address.shipping_city,
        address.shipping_state,
        address.shipping_pincode,
      ];

      if (requiredFields.some((value) => !value.trim())) {
        toast.error("Please complete the required shipping details.");
        return;
      }

      setSavingAddress(true);
      const updatedInquiry = await saveShippingAddress(
        token,
        address
      );

      setInquiry(updatedInquiry);
      setPaidStage("thanks");

      toast.success(
        "Address received. We'll prepare your artwork now."
      );
    } catch (err) {
      console.error("SAVE ADDRESS ERROR:", err);
      toast.error(
        err instanceof Error
          ? err.message
          : "Unable to save address.",
      );
    } finally {
      setSavingAddress(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl p-10">
        Loading...
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">

        <p className="eyebrow">
          Collector Portal
        </p>

        <h1 className="mt-4 font-display text-4xl text-foreground">
          This Customer Portal is no longer available
        </h1>

        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          This private link expired or is no longer active.
          If you need any assistance regarding your artwork, please feel free
          to contact me.
        </p>

        <Button asChild className="mt-8">
          <a href="/gallery">
            Explore Gallery
          </a>
        </Button>

      </div>
    );
  }

  const amount = Number(
    inquiry.artwork_price_snapshot
    );
  
  const artworkImage = getArtworkImage(
    inquiry.artworks
  );

  if (inquiry.payment_status === "PAID") {
    return (
      <div className="mx-auto max-w-lg px-6 py-16">
        <div className="overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-9">
          {paidStage === "confirmed" ? (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 180, damping: 16 }}
                    className="size-20 overflow-hidden rounded-full ring-4 ring-accent/20"
                  >
                    <img
                      src={artworkImage ?? "/placeholder.jpg"}
                      alt={inquiry.artworks.title}
                      className="size-full object-cover"
                    />

                  </motion.div>

                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.35, type: "spring", stiffness: 260, damping: 14 }}
                    className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-soft ring-4 ring-card"
                  >
                    <BadgeCheck className="size-5" />
                  </motion.div>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="eyebrow mt-6"
                >
                  Payment confirmed
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2 font-display text-2xl text-foreground"
                >
                  Thank you, {inquiry.customer_name?.split(" ")[0] ?? "collector"}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-2 max-w-sm text-sm text-muted-foreground"
                >
                  Your payment for "{inquiry.artworks.title}" is secured. One last
                  step: tell us where to send it.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-8 rounded-2xl border border-border bg-muted/40 p-5"
              >
                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
                  <MapPin className="size-4 text-accent" />
                  Shipping address
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="shipping-name">Full name</Label>
                      <Input
                        id="shipping-name"
                        value={address.shipping_name}
                        onChange={(event) =>
                          setAddress({
                            ...address,
                            shipping_name: event.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shipping-phone">Phone</Label>
                      <Input
                        id="shipping-phone"
                        type="tel"
                        inputMode="tel"
                        value={address.shipping_phone}
                        onChange={(event) =>
                          setAddress({
                            ...address,
                            shipping_phone: event.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shipping-address">Address</Label>
                    <Textarea
                      id="shipping-address"
                      rows={2}
                      placeholder="House / flat, street, area"
                      value={address.shipping_address_line1}
                      onChange={(event) =>
                        setAddress({
                          ...address,
                          shipping_address_line1: event.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="shipping-city">City</Label>
                      <Input
                        id="shipping-city"
                        value={address.shipping_city}
                        onChange={(event) =>
                          setAddress({
                            ...address,
                            shipping_city: event.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shipping-postal">Postal code</Label>
                      <Input
                        id="shipping-postal"
                        inputMode="numeric"
                        value={address.shipping_pincode}
                        onChange={(event) =>
                          setAddress({
                            ...address,
                            shipping_pincode: event.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shipping-state">State</Label>
                    <Input
                      id="shipping-state"
                      value={address.shipping_state}
                      onChange={(event) =>
                        setAddress({
                          ...address,
                          shipping_state: event.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <Button
                    size="lg"
                    type="button"
                    className="w-full"
                    disabled={savingAddress}
                    onClick={handleSaveAddress}
                  >
                    {savingAddress ? "Saving..." : "Confirm shipping address"}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          ) : paidStage === "thanks" ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground"
              >
                <Check className="size-8" />
              </motion.div>

              <p className="eyebrow mt-6">Order confirmed</p>

              <h1 className="mt-2 font-display text-3xl text-foreground">
                Your artwork is on its way
              </h1>

              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                Thank you for collecting "{inquiry.artworks.title}". We'll
                hand-wrap it with a Certificate of Authenticity and share
                tracking details by email / WhatsApp shortly.
              </p>

              <div className="mt-7 w-full rounded-2xl border border-border bg-muted/40 p-5 text-left">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Truck className="size-4 text-accent" />
                  Shipping to
                </div>

                <p className="whitespace-pre-line text-sm text-muted-foreground">
                  {formatShippingAddress(address)}
                </p>
              </div>

              <Button asChild variant="outline" className="mt-8">
                <a href="/gallery">Explore the gallery</a>
              </Button>
            </motion.div>
          ):(
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground"
              >
                <BadgeCheck className="size-8" />
              </motion.div>

              <p className="eyebrow mt-6">Delivered Successfully</p>

              <h1 className="mt-2 font-display text-3xl text-foreground">
                Your artwork has been delivered
              </h1>

              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                Your artwork has been successfully delivered.
                Thank you for supporting original art.
                I hope it has found a beautiful place in your home.
              </p>

              <div className="mt-7 w-full rounded-2xl border border-border bg-muted/40 p-5 text-left">
                <div className="mb-1 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Truck className="size-4 text-accent" />
                  Delivered Artwork
                </div>
              </div>

              <Button asChild variant="outline" className="mt-8">
                <a href="/gallery">Explore the gallery</a>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">

      <div className="text-center">

        <p className="eyebrow">
            Kamlesh Sahoo Studio
        </p>

        <h1 className="mt-3 font-display text-5xl">
            Artwork Purchase Portal
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Thank you for your interest in this original artwork.
            Complete the payment and shipping details below to
            collect your artwork.
        </p>

      </div>

      <div className="mt-12 rounded-3xl border border-border bg-card shadow-soft overflow-hidden">

        <div className="grid lg:grid-cols-[420px_1fr]">

            <img
              src={artworkImage ?? "/placeholder.jpg"}
              alt={inquiry.artworks.title}
              className="h-full w-full object-cover"
            />

            <div className="p-10">

            <p className="eyebrow">
                Original Artwork
            </p>

            <h2 className="mt-3 font-display text-4xl">
                {inquiry.artworks.title}
            </h2>

            <p className="mt-5 font-display text-3xl text-accent">
                ₹{Number(
                inquiry.artwork_price_snapshot
                ).toLocaleString("en-IN")}
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">

                <div>

                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Medium
                </p>

                <p className="mt-1">
                    {inquiry.artworks.medium ?? "-"}
                </p>

                </div>

                <div>

                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Dimensions
                </p>

                <p className="mt-1">
                    {inquiry.artworks.dimensions ?? "-"}
                </p>
                </div>
            </div>
            </div>
        </div>
      </div>

      <div className="my-10">

  <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
    What Happens Next
  </p>

  <div className="mt-8 flex items-start justify-center">
    {/* Payment */}

    <div className="flex w-40 flex-col items-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8a6d3b] text-white">
        <Wallet className="h-5 w-5" />
      </div>
      <p className="mt-3 font-medium text-foreground">
        Payment
      </p>
      <p className="mt-1 text-center text-xs text-muted-foreground">
        Complete securely
      </p>
    </div>

    {/* Connector */}

    <div className="mt-6 flex w-24 items-center">
      <div className="h-px flex-1 bg-[#d8c8aa]" />
      <ChevronRight className="mx-2 h-4 w-4 text-[#8a6d3b]" />
      <div className="h-px flex-1 bg-[#d8c8aa]" />
    </div>

    {/* Address */}

    <div className="flex w-40 flex-col items-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#8a6d3b] text-[#8a6d3b]">
        <MapPinned className="h-5 w-5" />
      </div>

      <p className="mt-3 font-medium text-foreground">
        Shipping Address
      </p>

      <p className="mt-1 text-center text-xs text-muted-foreground">
        We'll ask this next
      </p>
    </div>
  </div>
</div>

      {inquiry.payment_status !== "PAID" && (
        <div className="mt-10 rounded-3xl border border-border bg-card p-10 shadow-soft">
          <p className="eyebrow">
              Payment
          </p>

          <h2 className="mt-3 font-display text-3xl">
              Secure Payment
          </h2>

          <p className="mt-4 text-muted-foreground leading-7">
              Your payment is securely processed by Razorpay.
              After completing the payment, simply continue below
              and submit your shipping address.
          </p>

          <div className="mt-8 rounded-2xl bg-muted p-8">

              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Amount
              </p>

              <h3 className="mt-2 font-display text-4xl">
                  ₹{amount.toLocaleString("en-IN")}
              </h3>

              <p className="text-xs tracking-widest text-muted-foreground pt-2">
                  Free Shipping Included*
              </p>

          </div>

          <Button
            size="lg"
            className="mt-8 w-full"
            disabled={isOpeningCheckout}
            onClick={handlePayment}
          >
            {isOpeningCheckout ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Opening Secure Payment...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Complete Payment
              </>
            )}
          </Button>

          <p className="mt-4 text-center text-sm text-muted-foreground">
              Powered by Razorpay
          </p>

      </div>
    )}
    </div>
  );
}

function formatShippingAddress(address: {
  shipping_name: string;
  shipping_phone: string;
  shipping_address_line1: string;
  shipping_address_line2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  shipping_landmark: string;
}) {
  return [
    address.shipping_name,
    address.shipping_phone,
    address.shipping_address_line1,
    address.shipping_address_line2,
    [address.shipping_city, address.shipping_state, address.shipping_pincode]
      .filter(Boolean)
      .join(" "),
    address.shipping_landmark,
  ]
    .filter(Boolean)
    .join("\n");
}
