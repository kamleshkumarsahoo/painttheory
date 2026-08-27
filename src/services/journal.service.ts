import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { processArtworkImage } from "@/lib/image-processing";

const STORAGE_BUCKET = "artworks";
const JOURNAL_FOLDER = "journal";

export type JournalCategory =
  | "Commission"
  | "Story"
  | "Process";

export interface JournalMedia {
  id: string;
  role: "primary" | "secondary";
  sortOrder: number;
  originalUrl: string;
  largeUrl: string;
  mediumUrl: string;
  thumbUrl: string;
  width: number | null;
  height: number | null;
  altText: string | null;
}

export interface JournalEntry {
  id: string;
  title: string;
  body: string;
  location: string | null;
  publishedAt: string;
  readTime: number;
  category: JournalCategory;
  media: JournalMedia[];
  pinned: boolean;
}

function getPublicUrl(path: string) {
  return supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path)
    .data.publicUrl;
}

function mapMedia(row: any): JournalMedia {
  return {
    id: row.id,
    role: row.role,
    sortOrder: row.sort_order,
    originalUrl: getPublicUrl(row.original_path),
    largeUrl: getPublicUrl(row.large_path),
    mediumUrl: getPublicUrl(row.medium_path),
    thumbUrl: getPublicUrl(row.thumb_path),
    width: row.width,
    height: row.height,
    altText: row.alt_text,
  };
}

function mapJournal(row: any): JournalEntry {
  const media = [...(row.journal_media ?? [])]
    .sort(
      (a: any, b: any) =>
        a.sort_order - b.sort_order,
    )
    .map(mapMedia);

  return {
    id: row.id,
    title: row.title,
    body: row.body,
    location: row.location,
    publishedAt: row.published_at,
    readTime: row.read_time,
    category: row.category,
    pinned: Boolean(row.pinned),
    media,
  };
}

const MEDIA_SELECT = `
  id,
  role,
  sort_order,
  original_path,
  large_path,
  medium_path,
  thumb_path,
  width,
  height,
  alt_text
`;

export async function getAllJournal(): Promise<JournalEntry[]> {
  const { data, error } = await supabase
    .from("journal")
    .select(`
      *,
      journal_media (
        ${MEDIA_SELECT}
      )
    `)
    .order("published_at", {
      ascending: false,
    });

  if (error) throw error;

  return (data ?? []).map(mapJournal);
}

export async function getJournalById(
  id: string,
): Promise<JournalEntry> {
  const { data, error } = await supabase
    .from("journal")
    .select(`
      *,
      journal_media (
        ${MEDIA_SELECT}
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;

  return mapJournal(data);
}

export async function createJournal(entry: {
  title: string;
  body: string;
  location?: string | null;
  published_at?: string;
  read_time?: number;
  pinned?: boolean;
  category?: JournalCategory;
}) {
  const { data, error } = await supabase
    .from("journal")
    .insert({
      title: entry.title,
      body: entry.body,
      location: entry.location ?? null,
      published_at:
        entry.published_at ??
        new Date().toISOString(),
      read_time: entry.read_time ?? 5,
      category: entry.category ?? "Story",
      pinned: entry.pinned ?? false,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateJournal(
  id: string,
  entry: {
    title?: string;
    body?: string;
    location?: string | null;
    published_at?: string;
    read_time?: number;
    category?: JournalCategory;
    pinned?: boolean;
  },
) {
  const { data, error } = await supabase
    .from("journal")
    .update({
      ...entry,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteJournal(id: string) {
  const { error } = await supabase
    .from("journal")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function toggleJournalPinned(
  id: string,
  pinned: boolean,
) {
  const { error } = await supabase
    .from("journal")
    .update({ pinned })
    .eq("id", id);

  if (error) throw error;
}

export async function uploadJournalMedia({
  journalId,
  file,
  role,
  sortOrder,
  altText,
}: {
  journalId: string;
  file: File;
  role: "primary" | "secondary";
  sortOrder: number;
  altText?: string;
}) {
  const mediaId = uuidv4();

  const extension =
    file.name.split(".").pop()?.toLowerCase() || "jpg";

  const basePath =
    `${JOURNAL_FOLDER}/${journalId}/${mediaId}`;

  const processed = await processArtworkImage(file);

  const originalPath =
    `${basePath}/original.${extension}`;

  const largePath =
    `${basePath}/large.webp`;

  const mediumPath =
    `${basePath}/medium.webp`;

  const thumbPath =
    `${basePath}/thumb.webp`;

  const uploads = [
    {
      path: originalPath,
      file,
      contentType: file.type,
    },
    {
      path: largePath,
      file: processed.large.blob,
      contentType: "image/webp",
    },
    {
      path: mediumPath,
      file: processed.medium.blob,
      contentType: "image/webp",
    },
    {
      path: thumbPath,
      file: processed.thumb.blob,
      contentType: "image/webp",
    },
  ];

  try {
    for (const upload of uploads) {
      const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(upload.path, upload.file, {
          upsert: false,
          contentType: upload.contentType,
          cacheControl: "31536000",
        });

      if (error) throw error;
    }

    const { error } = await supabase
      .from("journal_media")
      .insert({
        id: mediaId,
        journal_id: journalId,
        role,
        sort_order: sortOrder,
        original_path: originalPath,
        large_path: largePath,
        medium_path: mediumPath,
        thumb_path: thumbPath,
        width: processed.large.width,
        height: processed.large.height,
        alt_text: altText ?? null,
      });

    if (error) throw error;
  } catch (error) {
    await supabase.storage
      .from(STORAGE_BUCKET)
      .remove(
        uploads.map((item) => item.path),
      );

    throw error;
  }
}

export async function deleteJournalMedia(
  mediaId: string,
) {
  const { data, error } = await supabase
    .from("journal_media")
    .select(`
      id,
      original_path,
      large_path,
      medium_path,
      thumb_path
    `)
    .eq("id", mediaId)
    .single();

  if (error) throw error;

  const paths = [
    data.original_path,
    data.large_path,
    data.medium_path,
    data.thumb_path,
  ].filter(Boolean);

  const { error: storageError } =
    await supabase.storage
      .from(STORAGE_BUCKET)
      .remove(paths);

  if (storageError) throw storageError;

  const { error: deleteError } = await supabase
    .from("journal_media")
    .delete()
    .eq("id", mediaId);

  if (deleteError) throw deleteError;
}