import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { Artwork } from "@/data/artworks";
import { formatPrice } from "@/data/artworks";
import { cn } from "@/lib/utils";

interface ArtworkCardProps {
  artwork: Artwork;
  priority?: boolean;
  index?: number;
}

/** Large gallery card: image zooms on hover, card lifts subtly. */
export function ArtworkCard({ artwork, priority = false, index = 0 }: ArtworkCardProps) {
  const sold = artwork.availability === "Sold";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link to="/gallery/$artworkId" params={{ artworkId: artwork.id }} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-muted shadow-soft transition-shadow duration-500 group-hover:shadow-lift">
          <div
            className={cn(
              "overflow-hidden",
              artwork.orientation === "portrait" ? "aspect-[4/5]" : "aspect-square",
            )}
          >
            <img
              src={artwork.image}
              alt={`${artwork.title} — ${artwork.medium}, ${artwork.dimensions}`}
              loading={priority ? "eager" : "lazy"}
              width={1024}
              height={artwork.orientation === "portrait" ? 1280 : 1024}
              className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
          </div>

          <span
            className={cn(
              "absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur",
              sold
                ? "bg-foreground/70 text-background"
                : "bg-background/80 text-foreground",
            )}
          >
            {artwork.availability}
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl text-foreground">{artwork.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {artwork.dimensions} · {artwork.medium}
            </p>
          </div>
          <p className="whitespace-nowrap font-display text-lg text-foreground">
            {formatPrice(artwork.price)}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
