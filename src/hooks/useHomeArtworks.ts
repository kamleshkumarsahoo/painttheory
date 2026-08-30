import { useEffect, useState } from "react";
import type { Artwork } from "@/types/artwork";
import {
  getAllArtworks,
  getFeaturedArtworks,
} from "@/services/artwork.service";

export function useHomeArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [featured, setFeatured] = useState<Artwork[]>([]);

  useEffect(() => {
    getAllArtworks()
      .then(setArtworks)
      .catch(console.error);

    getFeaturedArtworks()
      .then(setFeatured)
      .catch(console.error);
  }, []);

  const selected = (featured.length ? featured : artworks).slice(0, 10);

  return {
    artworks,
    featured,
    selected,
  };
}