import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { Reveal } from "@/components/common/Reveal";
import { artworks, galleryFilters, type GalleryFilter } from "@/data/artworks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery/")({
  head: () => ({
    meta: [
      { title: "Gallery — Maison Original Artworks" },
      {
        name: "description",
        content:
          "Browse original acrylic paintings — landscapes, portraits, abstract and sacred works. Filter by availability and collect a one-of-a-kind piece.",
      },
      { property: "og:title", content: "Gallery — Maison Original Artworks" },
      {
        property: "og:description",
        content: "Browse and collect original one-of-a-kind acrylic paintings.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [filter, setFilter] = useState<GalleryFilter>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return artworks;
    if (filter === "Available" || filter === "Sold")
      return artworks.filter((a) => a.availability === filter);
    return artworks.filter((a) => a.category === filter);
  }, [filter]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <Reveal>
        <p className="eyebrow">The collection</p>
        <h1 className="text-hero mt-4 max-w-2xl text-foreground">Gallery</h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          Every work is an original. Once a piece finds its home, it's gone for good.
        </p>
      </Reveal>

      {/* Filters */}
      <Reveal className="mt-12 flex flex-wrap gap-2.5" delay={1}>
        {galleryFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm transition-all duration-300",
              filter === f
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </Reveal>

      {/* Grid */}
      <motion.div layout className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((art, i) => (
          <ArtworkCard key={art.id} artwork={art} index={i} priority={i < 3} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-20 text-center text-muted-foreground">
          No works in this category right now — check back soon.
        </p>
      )}
    </div>
  );
}
