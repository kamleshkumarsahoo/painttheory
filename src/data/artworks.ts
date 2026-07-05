import silentWarrior from "@/assets/art-silent-warrior.jpg";
import morningHills from "@/assets/art-morning-hills.jpg";
import goldenSilence from "@/assets/art-golden-silence.jpg";
import reverie from "@/assets/art-reverie.jpg";
import sacredBloom from "@/assets/art-sacred-bloom.jpg";
import tidalMemory from "@/assets/art-tidal-memory.jpg";
import emberField from "@/assets/art-ember-field.jpg";
import wanderer from "@/assets/art-wanderer.jpg";

// Artwork categories — extend freely as collections grow.
export type ArtworkCategory = "Landscape" | "Portrait" | "Abstract" | "Sacred";
export type Availability = "Available" | "Sold";

export interface Artwork {
  id: string;
  title: string;
  image: string;
  category: ArtworkCategory;
  availability: Availability;
  dimensions: string;
  medium: string;
  year: number;
  price: number; // INR
  featured: boolean;
  story: string;
  orientation: "portrait" | "square" | "landscape";
}

// Central artwork catalogue. In future this can be sourced from Lovable Cloud.
export const artworks: Artwork[] = [
  {
    id: "the-silent-warrior",
    title: "The Silent Warrior",
    image: silentWarrior,
    category: "Portrait",
    availability: "Available",
    dimensions: "32 × 32 inches",
    medium: "Acrylic on Canvas",
    year: 2024,
    price: 18000,
    featured: true,
    orientation: "square",
    story:
      "Painted over three quiet winter mornings, The Silent Warrior holds the tension between stillness and readiness — a portrait of the strength we carry without ever raising our voice.",
  },
  {
    id: "morning-hills",
    title: "Morning Hills",
    image: morningHills,
    category: "Landscape",
    availability: "Available",
    dimensions: "24 × 30 inches",
    medium: "Acrylic on Canvas",
    year: 2024,
    price: 22000,
    featured: true,
    orientation: "portrait",
    story:
      "A memory of dawn in the foothills, when the mist had not yet decided whether to stay. Layered palette-knife strokes hold the exact colour of that hush before the world woke.",
  },
  {
    id: "golden-silence",
    title: "Golden Silence",
    image: goldenSilence,
    category: "Abstract",
    availability: "Available",
    dimensions: "36 × 36 inches",
    medium: "Acrylic & Gold Leaf on Canvas",
    year: 2025,
    price: 34000,
    featured: true,
    orientation: "square",
    story:
      "Movement caught mid-breath. Ribbons of ivory and charcoal fold into one another, threaded with gold leaf that catches the light differently through the day.",
  },
  {
    id: "reverie",
    title: "Reverie",
    image: reverie,
    category: "Portrait",
    availability: "Sold",
    dimensions: "24 × 30 inches",
    medium: "Acrylic on Canvas",
    year: 2023,
    price: 26000,
    featured: false,
    orientation: "portrait",
    story:
      "A face turned toward the warmth, eyes closed to the noise. Reverie is about the private moment of surrender we rarely let anyone witness.",
  },
  {
    id: "sacred-bloom",
    title: "Sacred Bloom",
    image: sacredBloom,
    category: "Sacred",
    availability: "Available",
    dimensions: "30 × 30 inches",
    medium: "Acrylic & Gold on Canvas",
    year: 2025,
    price: 28000,
    featured: true,
    orientation: "square",
    story:
      "Built petal by petal like a meditation, Sacred Bloom draws on temple geometry — a mandala that unfolds outward the longer you stand with it.",
  },
  {
    id: "tidal-memory",
    title: "Tidal Memory",
    image: tidalMemory,
    category: "Landscape",
    availability: "Available",
    dimensions: "24 × 30 inches",
    medium: "Acrylic on Canvas",
    year: 2024,
    price: 19000,
    featured: false,
    orientation: "portrait",
    story:
      "The horizon line where sea meets sky, reduced to its calmest essentials. A single band of white marks the tide — the only movement in an otherwise still afternoon.",
  },
  {
    id: "ember-field",
    title: "Ember Field",
    image: emberField,
    category: "Abstract",
    availability: "Available",
    dimensions: "36 × 36 inches",
    medium: "Acrylic on Canvas",
    year: 2025,
    price: 31000,
    featured: false,
    orientation: "square",
    story:
      "Heat and release. Ember Field is the most gestural of the collection — poured, dripped and scraped back until only the essential warmth remained.",
  },
  {
    id: "the-wanderer",
    title: "The Wanderer",
    image: wanderer,
    category: "Landscape",
    availability: "Sold",
    dimensions: "24 × 30 inches",
    medium: "Acrylic on Canvas",
    year: 2023,
    price: 24000,
    featured: false,
    orientation: "portrait",
    story:
      "A lone figure dissolving into gold grass and light. The Wanderer is about the quiet courage of walking on when the path ahead is uncertain.",
  },
];

export function getArtwork(id: string): Artwork | undefined {
  return artworks.find((a) => a.id === id);
}

export const featuredArtworks = artworks.filter((a) => a.featured);

// Gallery filters — availability + category, as specified in the brief.
export const galleryFilters = [
  "All",
  "Available",
  "Sold",
  "Landscape",
  "Portrait",
  "Abstract",
  "Sacred",
] as const;

export type GalleryFilter = (typeof galleryFilters)[number];

export function formatPrice(inr: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(inr);
}
