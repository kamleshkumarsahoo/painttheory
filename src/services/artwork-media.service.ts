import { v4 as uuidv4 } from "uuid";

import { supabase } from "@/lib/supabase";
import {
  processArtworkImage,
  type ProcessedArtworkImage,
} from "@/lib/image-processing";

const STORAGE_BUCKET = "artworks";

export type ArtworkMediaRole = "primary" | "detail" | "wall";

interface ArtworkMediaRow {
  id: string;
  artwork_id: string;
  role: ArtworkMediaRole;
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
  created_at: string;
}

export interface ArtworkMedia {
  id: string;
  artwork_id: string;
  role: ArtworkMediaRole;
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
  created_at: string;

  originalUrl: string;
  largeUrl: string;
  mediumUrl: string;
  thumbUrl: string;
}

function getPublicUrl(path: string) {
  return supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path)
    .data.publicUrl;
}

function mapArtworkMedia(
  row: ArtworkMediaRow,
): ArtworkMedia {
  return {
    ...row,

    originalUrl: getPublicUrl(row.original_path),
    largeUrl: getPublicUrl(row.large_path),
    mediumUrl: getPublicUrl(row.medium_path),
    thumbUrl: getPublicUrl(row.thumb_path),
  };
}

function getExtension(filename: string) {
  const extension = filename.split(".").pop()?.toLowerCase();

  if (!extension || extension.length > 5) {
    return "jpg";
  }

  return extension;
}

async function uploadFile(
  path: string,
  file: File | Blob,
) {
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, {
      upsert: false,
      contentType:
        file.type || "application/octet-stream",
      cacheControl: "31536000",
    });

  if (error) {
    throw error;
  }
}

async function uploadProcessedImage(
  artworkId: string,
  mediaId: string,
  file: File,
  processed: {
    large: ProcessedArtworkImage;
    medium: ProcessedArtworkImage;
    thumb: ProcessedArtworkImage;
  },
) {
  const extension = getExtension(file.name);
  const basePath = `${artworkId}/${mediaId}`;

  const originalPath =
    `${basePath}/original.${extension}`;

  const largePath =
    `${basePath}/large.webp`;

  const mediumPath =
    `${basePath}/medium.webp`;

  const thumbPath =
    `${basePath}/thumb.webp`;

  await uploadFile(originalPath, file);
  await uploadFile(
    largePath,
    processed.large.blob,
  );
  await uploadFile(
    mediumPath,
    processed.medium.blob,
  );
  await uploadFile(
    thumbPath,
    processed.thumb.blob,
  );

  return {
    originalPath,
    largePath,
    mediumPath,
    thumbPath,
  };
}

export async function uploadArtworkMedia({
  artworkId,
  file,
  role = "detail",
  sortOrder = 0,
  altText,
}: {
  artworkId: string;
  file: File;
  role?: ArtworkMediaRole;
  sortOrder?: number;
  altText?: string;
}): Promise<ArtworkMedia> {
  const processed =
    await processArtworkImage(file);

  const mediaId = uuidv4();

  const paths = await uploadProcessedImage(
    artworkId,
    mediaId,
    file,
    processed,
  );

  const { data, error } = await supabase
    .from("artwork_media")
    .insert({
      id: mediaId,
      artwork_id: artworkId,
      role,
      sort_order: sortOrder,

      original_path: paths.originalPath,
      large_path: paths.largePath,
      medium_path: paths.mediumPath,
      thumb_path: paths.thumbPath,

      width: processed.large.width,
      height: processed.large.height,

      mime_type: file.type,
      file_size: file.size,

      alt_text: altText ?? null,
    })
    .select()
    .single();

  if (error) {
    await cleanupUploadedMedia(paths);
    throw error;
  }

  return mapArtworkMedia(data as ArtworkMediaRow);
}

export async function getArtworkMedia(
  artworkId: string,
): Promise<ArtworkMedia[]> {
  const { data, error } = await supabase
    .from("artwork_media")
    .select("*")
    .eq("artwork_id", artworkId)
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) =>
    mapArtworkMedia(row as ArtworkMediaRow),
  );
}

export function getArtworkMediaUrls(
  media: ArtworkMedia,
) {
  return {
    original: media.originalUrl,
    large: media.largeUrl,
    medium: media.mediumUrl,
    thumb: media.thumbUrl,
  };
}

export async function deleteArtworkMedia(
  media: ArtworkMedia,
) {
  const paths = [
    media.original_path,
    media.large_path,
    media.medium_path,
    media.thumb_path,
  ];

  const { error: storageError } =
    await supabase.storage
      .from(STORAGE_BUCKET)
      .remove(paths);

  if (storageError) {
    throw storageError;
  }

  const { error: databaseError } =
    await supabase
      .from("artwork_media")
      .delete()
      .eq("id", media.id);

  if (databaseError) {
    throw databaseError;
  }
}

export async function setPrimaryArtworkMedia(
  artworkId: string,
  mediaId: string,
) {
  const { data: media, error } = await supabase
    .from("artwork_media")
    .select("id")
    .eq("artwork_id", artworkId);

  if (error) {
    throw error;
  }

  if (!media?.some((item) => item.id === mediaId)) {
    throw new Error(
      "Selected photo does not belong to this artwork.",
    );
  }

  // First remove the primary role from every photo.
  const { error: clearError } = await supabase
    .from("artwork_media")
    .update({
      role: "detail",
    })
    .eq("artwork_id", artworkId);

  if (clearError) {
    throw clearError;
  }

  // Now make the selected photo the only primary photo.
  const { error: primaryError } = await supabase
    .from("artwork_media")
    .update({
      role: "primary",
    })
    .eq("id", mediaId)
    .eq("artwork_id", artworkId);

  if (primaryError) {
    throw primaryError;
  }
}

export async function setWallArtworkMedia(
  artworkId: string,
  mediaId: string,
) {
  const { data: media, error } = await supabase
    .from("artwork_media")
    .select("id, role, sort_order")
    .eq("artwork_id", artworkId)
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  const selectedMedia = media?.find(
    (item) => item.id === mediaId,
  );

  if (!selectedMedia) {
    throw new Error(
      "Selected photo does not belong to this artwork.",
    );
  }

  // Primary image cannot also be the wall image.
  if (selectedMedia.role === "primary") {
    throw new Error(
      "The primary image cannot also be the wall image. Choose another photo.",
    );
  }

  for (const item of media ?? []) {
    const nextRole =
      item.id === mediaId
        ? "wall"
        : item.role === "primary"
          ? "primary"
          : "detail";

    const { error: updateError } = await supabase
      .from("artwork_media")
      .update({
        role: nextRole,
      })
      .eq("id", item.id);

    if (updateError) {
      throw updateError;
    }
  }
}

async function cleanupUploadedMedia(
  paths: {
    originalPath: string;
    largePath: string;
    mediumPath: string;
    thumbPath: string;
  },
) {
  await supabase.storage
    .from(STORAGE_BUCKET)
    .remove([
      paths.originalPath,
      paths.largePath,
      paths.mediumPath,
      paths.thumbPath,
    ]);
}