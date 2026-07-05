import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, ScrollText, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutModal } from "@/components/gallery/CheckoutModal";
import { getArtwork, formatPrice } from "@/data/artworks";

export const Route = createFileRoute("/gallery/$artworkId")({
  loader: ({ params }) => {
    const artwork = getArtwork(params.artworkId);
    if (!artwork) throw notFound();
    return { artwork };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Artwork not found — Maison" }, { name: "robots", content: "noindex" }] };
    }
    const { artwork } = loaderData;
    return {
      meta: [
        { title: `${artwork.title} — Maison` },
        { name: "description", content: `${artwork.title}. ${artwork.dimensions}, ${artwork.medium}. ${artwork.story}` },
        { property: "og:title", content: `${artwork.title} — Maison` },
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
      <h1 className="text-section mt-4 text-foreground">This artwork couldn't be found</h1>
      <Button asChild className="mt-8">
        <Link to="/gallery">Back to gallery</Link>
      </Button>
    </div>
  );
}

function ArtworkPage() {
  const { artwork } = Route.useLoaderData();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const sold = artwork.availability === "Sold";

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
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-3xl bg-muted shadow-frame"
        >
          <img
            src={artwork.image}
            alt={`${artwork.title} — ${artwork.medium}`}
            width={1024}
            height={artwork.orientation === "portrait" ? 1280 : 1024}
            className="size-full object-cover"
          />
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <span
            className={
              "inline-block rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] " +
              (sold ? "bg-foreground text-background" : "bg-accent/15 text-accent")
            }
          >
            {artwork.availability}
          </span>
          <h1 className="text-hero mt-5 text-foreground">{artwork.title}</h1>
          <p className="mt-4 font-display text-3xl text-foreground">{formatPrice(artwork.price)}</p>

          <p className="mt-7 text-lg leading-relaxed text-muted-foreground">{artwork.story}</p>

          {/* Specs */}
          <dl className="mt-8 grid grid-cols-2 gap-y-5 border-y border-border py-7 text-sm">
            <div>
              <dt className="text-muted-foreground">Dimensions</dt>
              <dd className="mt-1 text-foreground">{artwork.dimensions}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Medium</dt>
              <dd className="mt-1 text-foreground">{artwork.medium}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Year</dt>
              <dd className="mt-1 text-foreground">{artwork.year}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Category</dt>
              <dd className="mt-1 text-foreground">{artwork.category}</dd>
            </div>
          </dl>

          {/* Assurances */}
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <ScrollText className="size-4 text-accent" /> Certificate of Authenticity included
            </li>
            <li className="flex items-center gap-3">
              <Truck className="size-4 text-accent" /> Insured, hand-packed worldwide shipping
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="size-4 text-accent" /> Secure payment via Razorpay
            </li>
          </ul>

          <div className="mt-9">
            {sold ? (
              <Button asChild variant="outline" size="xl" className="w-full sm:w-auto">
                <Link to="/commission">Commission something similar</Link>
              </Button>
            ) : (
              <Button size="xl" className="w-full sm:w-auto" onClick={() => setCheckoutOpen(true)}>
                Buy Now — {formatPrice(artwork.price)}
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
