import { supabase } from "@/lib/supabase";
import type { Artwork, ArtworkMedia } from "@/types/artwork";

const STORAGE_BUCKET = "artworks";

const availabilityMap: Record<string, Artwork["availability"]> = {
  AVAILABLE: "Available",
  RESERVED: "Reserved",
  SOLD: "Sold",
};

type ArtworkMediaRow = {
  id: string;
  role: "primary" | "detail" | "wall";
  sort_order: number;
  original_path: string;
  large_path: string;
  medium_path: string;
  thumb_path: string;
  width: number | null;
  height: number | null;
  mime_type: string | null;
  file_size: number | null;
  alt_text: string | null;
};

function getPublicUrl(path: string) {
  return supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path)
    .data.publicUrl;
}

function mapArtwork(row: any): Artwork {
  const artworkMedia: ArtworkMediaRow[] = row.artwork_media ?? [];

  const media: ArtworkMedia[] = [...artworkMedia]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((item) => ({
      id: item.id,
      role: item.role,
      sortOrder: item.sort_order,
      originalUrl: getPublicUrl(item.original_path),
      largeUrl: getPublicUrl(item.large_path),
      mediumUrl: getPublicUrl(item.medium_path),
      thumbUrl: getPublicUrl(item.thumb_path),
      width: item.width,
      height: item.height,
      altText: item.alt_text,
    }));

  const primaryMedia =
    media.find((item) => item.role === "primary") ?? media[0];

  return {
    id: row.id,
    title: row.title,

    image:
      primaryMedia?.largeUrl ||
      row.thumbnail_url ||
      "/placeholder.jpg",

    media,
    category: row.category ?? "",
    availability:
      availabilityMap[row.availability_status] ?? "Available",

    dimensions: row.dimensions ?? "",
    medium: row.medium ?? "",
    year: row.year,
    price: row.price,
    featured: row.featured,
    on_wall: Boolean(row.on_wall),
    wall_media_id: row.wall_media_id ?? null,
    story: row.story ?? "",
    description: row.description ?? "",
    orientation: row.orientation ?? "square",
  };
}

const ARTWORK_MEDIA_SELECT = `
  id,
  role,
  sort_order,
  original_path,
  large_path,
  medium_path,
  thumb_path,
  width,
  height,
  mime_type,
  file_size,
  alt_text
`;

export async function getAllArtworks(): Promise<Artwork[]> {
  const { data, error } = await supabase
    .from("artworks")
    .select(`
      *,
      artwork_media!artwork_media_artwork_id_fkey (
        ${ARTWORK_MEDIA_SELECT}
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map(mapArtwork);
}

export async function getFeaturedArtworks(): Promise<Artwork[]> {
  const { data, error } = await supabase
    .from("artworks")
    .select(`
      *,
      artwork_media!artwork_media_artwork_id_fkey (
        ${ARTWORK_MEDIA_SELECT}
      )
    `)
    .eq("featured", true)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map(mapArtwork);
}

export async function getArtworkById(
  id: string,
): Promise<Artwork> {
  const { data, error } = await supabase
    .from("artworks")
    .select(`
      *,
      artwork_media!artwork_media_artwork_id_fkey (
        ${ARTWORK_MEDIA_SELECT}
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;

  return mapArtwork(data);
}

function generateRandomCode(length = 5) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  const values = crypto.getRandomValues(
    new Uint32Array(length),
  );

  return Array.from(values, (value) =>
    chars[value % chars.length],
  ).join("");
}


export async function createArtwork(artwork: {
  title: string;
  description?: string;
  price?: number;
  availability_status?: "AVAILABLE" | "RESERVED" | "SOLD";
  category?: string;
  dimensions?: string;
  medium?: string;
  year?: number;
  featured?: boolean;
  on_wall?: boolean;
  wall_media_id?: string | null;
  story?: string;
  orientation?: "portrait" | "square" | "landscape";
}) {
  const year = new Date().getFullYear().toString().slice(-2);

  // Find the latest serial number for this year.
  const { data: latestArtwork, error: latestError } =
    await supabase
      .from("artworks")
      .select("artwork_code")
      .like("artwork_code", `PT${year}-%`)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

  if (latestError) throw latestError;

  let nextNumber = 1;

  if (latestArtwork?.artwork_code) {
    const match = latestArtwork.artwork_code.match(
      /^PT\d{2}-[A-Z0-9]{5}-(\d{3})$/,
    );

    if (match) {
      nextNumber = Number(match[1]) + 1;
    }
  }

  // Generate a random 5-character identifier.
  const randomPart = generateRandomCode();

  const artworkCode =
    `PT${year}-${randomPart}-${String(nextNumber).padStart(3, "0")}`;

  const { data, error } = await supabase
    .from("artworks")
    .insert({
      artwork_code: artworkCode,
      title: artwork.title,
      description: artwork.description ?? null,
      price: artwork.price ?? null,
      availability_status:
        artwork.availability_status ?? "AVAILABLE",
      category: artwork.category ?? null,
      dimensions: artwork.dimensions ?? null,
      medium: artwork.medium ?? null,
      year: artwork.year ?? null,
      featured: artwork.featured ?? false,
      on_wall: artwork.on_wall ?? false,
      wall_media_id: artwork.wall_media_id ?? null,
      story: artwork.story ?? null,
      orientation: artwork.orientation ?? "square",

      // tags is NOT NULL in the database.
      tags: [],
    })
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function updateArtwork(
  id: string,
  artwork: {
    title?: string;
    description?: string | null;
    price?: number | null;
    availability_status?: "AVAILABLE" | "RESERVED" | "SOLD";
    category?: string | null;
    dimensions?: string | null;
    medium?: string | null;
    year?: number | null;
    featured?: boolean;
    on_wall?: boolean;
    wall_media_id?: string | null;
    story?: string | null;
    orientation?: "portrait" | "square" | "landscape";
  },
) {
  const { data, error } = await supabase
    .from("artworks")
    .update({
      ...artwork,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function deleteArtwork(id: string) {
  const { error } = await supabase
    .from("artworks")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export interface AdminArtwork {
  id: string;
  artwork_code: string;
  title: string;
  description: string | null;
  price: number | null;
  availability_status: "AVAILABLE" | "RESERVED" | "SOLD" | null;
  category: string | null;
  dimensions: string | null;
  medium: string | null;
  year: number | null;
  featured: boolean | null;
  on_wall: boolean;
  wall_media_id: string | null;
  story: string | null;
  orientation: "portrait" | "square" | "landscape" | null;
  media: ArtworkMedia[];
}


export async function getAdminArtworkById(
  id: string,
): Promise<AdminArtwork> {
  const { data, error } = await supabase
    .from("artworks")
    .select(`
      id,
      artwork_code,
      title,
      description,
      price,
      availability_status,
      category,
      dimensions,
      medium,
      year,
      featured,
      on_wall,
      wall_media_id,
      story,
      orientation,
      artwork_media!artwork_media_artwork_id_fkey (
        ${ARTWORK_MEDIA_SELECT}
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;

  const mediaRows: ArtworkMediaRow[] =
    data.artwork_media ?? [];

  const media: ArtworkMedia[] = [...mediaRows]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((item) => ({
      id: item.id,
      role: item.role,
      sortOrder: item.sort_order,
      originalUrl: getPublicUrl(item.original_path),
      largeUrl: getPublicUrl(item.large_path),
      mediumUrl: getPublicUrl(item.medium_path),
      thumbUrl: getPublicUrl(item.thumb_path),
      width: item.width,
      height: item.height,
      altText: item.alt_text,
    }));

  return {
    ...data,
    media,
  };
}