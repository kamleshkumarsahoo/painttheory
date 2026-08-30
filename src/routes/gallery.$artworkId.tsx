import { useState } from "react";
import {
  createFileRoute,
  Link,
  notFound,
} from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ScrollText,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CheckoutModal } from "@/components/gallery/CheckoutModal";
import { getArtworkById } from "@/services/artwork.service";
import { formatPrice } from "@/types/artwork";

export const Route = createFileRoute("/gallery/$artworkId")({
  loader: async ({ params }) => {
    try {
      const artwork = await getArtworkById(params.artworkId);

      if (!artwork) {
        throw notFound();
      }

      return { artwork };
    } catch {
      throw notFound();
    }
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Artwork Not Found • PaintTheory" },
          { name: "robots", content: "noindex" },
        ],
      };
    }

    const { artwork } = loaderData;

    return {
      meta: [
        { title: `${artwork.title} • PaintTheory` },
        {
          name: "description",
          content: `${artwork.title}. ${artwork.description ?? ""} ${artwork.dimensions}, ${artwork.medium}.`,
        },
        { property: "og:title", content: `${artwork.title} • PaintTheory` },
        { property: "og:description", content: artwork.story },
        { property: "og:image", content: artwork.image },
        { property: "og:type", content: "product" },
        { name: "twitter:image", content: artwork.image },
      ],
    };
  },

  notFoundComponent: ArtworkNotFound,
  component: ArtworkPage,
});

function ArtworkNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <p className="eyebrow">Not on this wall</p>

      <h1 className="text-section mt-4 text-foreground">
        This artwork couldn't be found
      </h1>

      <Button asChild className="mt-8">
        <Link to="/gallery">Back to gallery</Link>
      </Button>
    </div>
  );
}

function ArtworkPage() {
  const { artwork } = Route.useLoaderData();

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const primaryMedia =
    artwork.media.find((media) => media.role === "primary") ??
    artwork.media[0];

  const [selectedMediaId, setSelectedMediaId] = useState(
    primaryMedia?.id ?? "",
  );

  const selectedMedia =
    artwork.media.find((media) => media.id === selectedMediaId) ??
    primaryMedia;

  const sold = artwork.availability === "Sold";
  const reserved = artwork.availability === "Reserved";

  const mainImage =
    selectedMedia?.largeUrl ||
    artwork.image;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
      <Link
        to="/gallery"
        className="link-underline group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        Back to gallery
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* Images */}
        <div>
          <motion.div
            key={selectedMedia?.id ?? mainImage}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden bg-muted shadow-frame"
          >
            <img
              src={mainImage}
              alt={
                selectedMedia?.altText ||
                `${artwork.title} - ${artwork.medium}`
              }
              width={selectedMedia?.width ?? 1024}
              height={
                selectedMedia?.height ??
                (artwork.orientation === "portrait"
                  ? 1280
                  : 1024)
              }
              className="size-full object-cover"
            />
          </motion.div>

          {artwork.media.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {artwork.media.map((media) => {
                const selected = media.id === selectedMedia?.id;

                return (
                  <button
                    key={media.id}
                    type="button"
                    onClick={() =>
                      setSelectedMediaId(media.id)
                    }
                    aria-label={`View ${artwork.title} image`}
                    aria-pressed={selected}
                    className={[
                      "relative size-20 shrink-0 overflow-hidden border transition-all",
                      selected
                        ? "border-accent ring-2 ring-accent/20"
                        : "border-border opacity-70 hover:opacity-100",
                    ].join(" ")}
                  >
                    <img
                      src={media.thumbUrl}
                      alt={media.altText || artwork.title}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <span
            className={
              "inline-block rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] " +
              (sold
                ? "bg-foreground text-background"
                : "bg-accent/15 text-accent")
            }
          >
            {artwork.availability}
          </span>

          <h1 className="text-hero mt-5 text-foreground">
            {artwork.title}
          </h1>

          {artwork.availability === "Available" ? (
            <h2 className="font-display text-3xl">
              {formatPrice(artwork.price)}
            </h2>
          ) : (
            <h2 className="font-display text-3xl">
              {artwork.availability === "Reserved"
                ? "Currently Reserved"
                : "Collected"}
            </h2>
          )}

          <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
            {artwork.story}
          </p>

          {/* Specs */}
          <dl className="mt-8 grid grid-cols-2 gap-y-5 border-y border-border py-7 text-sm">
            <div>
              <dt className="text-muted-foreground">
                Dimensions
              </dt>
              <dd className="mt-1 text-foreground">
                {artwork.dimensions}
              </dd>
            </div>

            <div>
              <dt className="text-muted-foreground">
                Medium
              </dt>
              <dd className="mt-1 text-foreground">
                {artwork.medium}
              </dd>
            </div>

            <div>
              <dt className="text-muted-foreground">
                Year
              </dt>
              <dd className="mt-1 text-foreground">
                {artwork.year}
              </dd>
            </div>

            <div>
              <dt className="text-muted-foreground">
                Category
              </dt>
              <dd className="mt-1 text-foreground">
                {artwork.category}
              </dd>
            </div>
          </dl>

          {/* Assurances */}
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <ScrollText className="size-4 text-accent" />
              Certificate of Authenticity included
            </li>

            <li className="flex items-center gap-3">
              <Truck className="size-4 text-accent" />
              Insured, hand-packed worldwide shipping
            </li>

            <li className="flex items-center gap-3">
              <ShieldCheck className="size-4 text-accent" />
              Secure payment via Razorpay
            </li>
          </ul>

          <div className="mt-9">
            {reserved && (
              <>
                <p className="mb-4 text-sm text-muted-foreground">
                  If the reservation is not completed, this artwork
                  may become available again.
                </p>

                <Button
                  size="xl"
                  className="w-full sm:w-auto"
                  onClick={() => setCheckoutOpen(true)}
                >
                  Request This Artwork
                </Button>
              </>
            )}

            {sold && !reserved && (
              <Button
                asChild
                variant="outline"
                size="xl"
                className="w-full sm:w-auto"
              >
                <Link to="/commission">
                  Commission something similar
                </Link>
              </Button>
            )}

            {!sold && !reserved && (
              <Button
                size="xl"
                className="w-full sm:w-auto"
                onClick={() => setCheckoutOpen(true)}
              >
                Buy Now
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      <CheckoutModal
        artwork={artwork}
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}