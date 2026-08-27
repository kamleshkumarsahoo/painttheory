import { t as supabase } from "./supabase-BYgwpyL6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/artwork.service-ZQxopihE.js
var STORAGE_BUCKET = "artworks";
var availabilityMap = {
	AVAILABLE: "Available",
	RESERVED: "Reserved",
	SOLD: "Sold"
};
function getPublicUrl(path) {
	return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}
function mapArtwork(row) {
	const media = [...row.artwork_media ?? []].sort((a, b) => a.sort_order - b.sort_order).map((item) => ({
		id: item.id,
		role: item.role,
		sortOrder: item.sort_order,
		originalUrl: getPublicUrl(item.original_path),
		largeUrl: getPublicUrl(item.large_path),
		mediumUrl: getPublicUrl(item.medium_path),
		thumbUrl: getPublicUrl(item.thumb_path),
		width: item.width,
		height: item.height,
		altText: item.alt_text
	}));
	const primaryMedia = media.find((item) => item.role === "primary") ?? media[0];
	return {
		id: row.id,
		title: row.title,
		image: primaryMedia?.largeUrl || row.thumbnail_url || "/placeholder.jpg",
		media,
		category: row.category ?? "",
		availability: availabilityMap[row.availability_status] ?? "Available",
		dimensions: row.dimensions ?? "",
		medium: row.medium ?? "",
		year: row.year,
		price: row.price,
		featured: row.featured,
		on_wall: Boolean(row.on_wall),
		wall_media_id: row.wall_media_id ?? null,
		story: row.story ?? "",
		description: row.description ?? "",
		orientation: row.orientation ?? "square"
	};
}
var ARTWORK_MEDIA_SELECT = `
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
async function getAllArtworks() {
	const { data, error } = await supabase.from("artworks").select(`
      *,
      artwork_media (
        ${ARTWORK_MEDIA_SELECT}
      )
    `).order("created_at", { ascending: false });
	if (error) throw error;
	return (data ?? []).map(mapArtwork);
}
async function getFeaturedArtworks() {
	const { data, error } = await supabase.from("artworks").select(`
      *,
      artwork_media (
        ${ARTWORK_MEDIA_SELECT}
      )
    `).eq("featured", true).order("created_at", { ascending: false });
	if (error) throw error;
	return (data ?? []).map(mapArtwork);
}
async function getArtworkById(id) {
	const { data, error } = await supabase.from("artworks").select(`
      *,
      artwork_media (
        ${ARTWORK_MEDIA_SELECT}
      )
    `).eq("id", id).single();
	if (error) throw error;
	return mapArtwork(data);
}
function generateRandomCode(length = 5) {
	const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	const values = crypto.getRandomValues(new Uint32Array(length));
	return Array.from(values, (value) => chars[value % 32]).join("");
}
async function createArtwork(artwork) {
	const year = (/* @__PURE__ */ new Date()).getFullYear().toString().slice(-2);
	const { data: latestArtwork, error: latestError } = await supabase.from("artworks").select("artwork_code").like("artwork_code", `PT${year}-%`).order("created_at", { ascending: false }).limit(1).maybeSingle();
	if (latestError) throw latestError;
	let nextNumber = 1;
	if (latestArtwork?.artwork_code) {
		const match = latestArtwork.artwork_code.match(/^PT\d{2}-[A-Z0-9]{5}-(\d{3})$/);
		if (match) nextNumber = Number(match[1]) + 1;
	}
	const artworkCode = `PT${year}-${generateRandomCode()}-${String(nextNumber).padStart(3, "0")}`;
	const { data, error } = await supabase.from("artworks").insert({
		artwork_code: artworkCode,
		title: artwork.title,
		description: artwork.description ?? null,
		price: artwork.price ?? null,
		availability_status: artwork.availability_status ?? "AVAILABLE",
		category: artwork.category ?? null,
		dimensions: artwork.dimensions ?? null,
		medium: artwork.medium ?? null,
		year: artwork.year ?? null,
		featured: artwork.featured ?? false,
		on_wall: artwork.on_wall ?? false,
		story: artwork.story ?? null,
		orientation: artwork.orientation ?? "square"
	}).select("*").single();
	if (error) throw error;
	return data;
}
async function updateArtwork(id, artwork) {
	const { data, error } = await supabase.from("artworks").update({
		...artwork,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", id).select("*").single();
	if (error) throw error;
	return data;
}
async function deleteArtwork(id) {
	const { error } = await supabase.from("artworks").delete().eq("id", id);
	if (error) throw error;
}
async function getAdminArtworkById(id) {
	const { data, error } = await supabase.from("artworks").select(`
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
      artwork_media (
        ${ARTWORK_MEDIA_SELECT}
      )
    `).eq("id", id).single();
	if (error) throw error;
	const media = [...data.artwork_media ?? []].sort((a, b) => a.sort_order - b.sort_order).map((item) => ({
		id: item.id,
		role: item.role,
		sortOrder: item.sort_order,
		originalUrl: getPublicUrl(item.original_path),
		largeUrl: getPublicUrl(item.large_path),
		mediumUrl: getPublicUrl(item.medium_path),
		thumbUrl: getPublicUrl(item.thumb_path),
		width: item.width,
		height: item.height,
		altText: item.alt_text
	}));
	return {
		...data,
		media
	};
}
//#endregion
export { getArtworkById as a, getAllArtworks as i, deleteArtwork as n, getFeaturedArtworks as o, getAdminArtworkById as r, updateArtwork as s, createArtwork as t };
