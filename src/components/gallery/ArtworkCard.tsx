import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { Artwork } from "@/types/artwork";
import { formatPrice } from "@/types/artwork";

interface ArtworkCardProps {
  artwork: Artwork;
  priority?: boolean;
  index?: number;
}

export function ArtworkCard({
  artwork,
  priority = false,
  index = 0,
}: ArtworkCardProps) {
  const status =
    artwork.availability === "Sold"
      ? "Sold"
      : artwork.availability === "Reserved"
        ? "Reserved"
        : formatPrice(artwork.price);

  const ratio =
    artwork.orientation === "landscape"
      ? "aspect-[4/3]"
      : artwork.orientation === "square"
        ? "aspect-square"
        : "aspect-[4/5]";

  const primaryMedia =
    artwork.media.find((media) => media.role === "primary") ??
    artwork.media[0];

  const imageSrc =
    primaryMedia?.mediumUrl ||
    artwork.image;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <Link
        to="/gallery/$artworkId"
        params={{ artworkId: artwork.id }}
        className="block"
      >
        <div
          className={`overflow-hidden bg-secondary ${ratio}`}
        >
          <img
            src={imageSrc}
            alt={`${artwork.title} — ${artwork.medium}, ${artwork.dimensions}`}
            loading={priority ? "eager" : "lazy"}
            className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="display text-lg">
              {artwork.title}
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              {artwork.medium} · {artwork.dimensions} · {artwork.year}
            </p>
          </div>

          <span
            className={`label shrink-0 ${
              artwork.availability === "Available"
                ? "text-clay"
                : ""
            }`}
          >
            {status}
          </span>
        </div>

        <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">
          {artwork.description}
        </p>
      </Link>
    </motion.article>
  );
}