export type ArtworkCategory =
  | "Landscape"
  | "Portrait"
  | "Abstract"
  | "Sacred";

export type Availability = "Available" | "Reserved" | "Sold";

export interface Artwork {
  id: string;
  title: string;
  image: string;
  media: ArtworkMedia[];
  category: ArtworkCategory;
  availability: Availability;
  dimensions: string;
  medium: string;
  year: number;
  price: number; // INR
  featured: boolean;
  on_wall: boolean;
  description: string;
  story: string;
  orientation: "portrait" | "square" | "landscape";
}

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

export interface ArtworkMedia {
  id: string;
  role: "primary" | "detail" | "wall";
  sortOrder: number;
  originalUrl: string;
  largeUrl: string;
  mediumUrl: string;
  thumbUrl: string;
  width: number | null;
  height: number | null;
  altText: string | null;
}