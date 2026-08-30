import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { Reveal } from "@/components/common/Reveal";
import type { Artwork } from "@/types/artwork";
import { getAllArtworks } from "@/services/artwork.service";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/gallery/")({ component: GalleryPage });

function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  useEffect(() => { getAllArtworks().then(setArtworks).catch(console.error); }, []);
  const filters = ["All", ...Array.from(new Set(artworks.flatMap((art) => art.category.split(",").map((category) => category.trim()).filter(Boolean)))).sort(), "Available", "Sold"];
  const list = useMemo(() => filter === "All" ? artworks : filter === "Available" || filter === "Sold" ? artworks.filter((art) => art.availability === filter) : artworks.filter((art) => art.category.split(",").map((category) => category.trim()).includes(filter)), [artworks, filter]);
  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-24 md:px-10 md:pt-26">
      <Reveal>
        <span className="label">
          Complete works
        </span>
        <h1 className="display mt-5 text-[13vw] leading-[0.85] md:text-[8vw]">
          Gallery</h1>
      </Reveal>
      
      <Reveal delay={1} className="hairline mt-12 flex flex-wrap gap-6 pt-5">
        {filters.map((item) => 
          <button key={item} type="button" 
            onClick={() => setFilter(item)} className={`text-xs transition-colors ${filter === item ? "text-clay" : "text-muted-foreground hover:text-foreground"}`}>{item}{item === "All" && <sup className="ml-1 font-mono text-[9px]">{artworks.length}</sup>}
          </button>)}
      </Reveal>
      
      <motion.div layout className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">{list.map((art, index) => 
        <ArtworkCard key={art.id} artwork={art} index={index} priority={index < 3} />)}
      </motion.div>{list.length === 0 && 
        <p className="mt-20 text-center text-muted-foreground">
          No works in this category right now.
        </p>}
      
      <Reveal className="hairline mt-24 pt-10">
        <p className="max-w-lg text-sm text-muted-foreground">
          Nothing here quite yours? Every commission starts as a blank stretcher and one conversation.
        </p>
        
        <Link
          to="/commission"
          className="group mt-4 inline-flex items-center gap-1.5 text-xs font-medium"
        >
          <span className="link-underline">
            Ask me for a painting
          </span>

          <ArrowRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

      </Reveal>
    </div>
  );
}
