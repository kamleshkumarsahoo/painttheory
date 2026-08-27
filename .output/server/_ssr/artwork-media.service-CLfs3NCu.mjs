import { t as supabase } from "./supabase-BYgwpyL6.mjs";
import { t as processArtworkImage } from "./image-processing-O04xFheh.mjs";
import { t as v4 } from "../_libs/uuid.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/artwork-media.service-CLfs3NCu.js
var STORAGE_BUCKET = "artworks";
function getPublicUrl(path) {
	return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}
function mapArtworkMedia(row) {
	return {
		...row,
		originalUrl: getPublicUrl(row.original_path),
		largeUrl: getPublicUrl(row.large_path),
		mediumUrl: getPublicUrl(row.medium_path),
		thumbUrl: getPublicUrl(row.thumb_path)
	};
}
function getExtension(filename) {
	const extension = filename.split(".").pop()?.toLowerCase();
	if (!extension || extension.length > 5) return "jpg";
	return extension;
}
async function uploadFile(path, file) {
	const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
		upsert: false,
		contentType: file.type || "application/octet-stream",
		cacheControl: "31536000"
	});
	if (error) throw error;
}
async function uploadProcessedImage(artworkId, mediaId, file, processed) {
	const extension = getExtension(file.name);
	const basePath = `${artworkId}/${mediaId}`;
	const originalPath = `${basePath}/original.${extension}`;
	const largePath = `${basePath}/large.webp`;
	const mediumPath = `${basePath}/medium.webp`;
	const thumbPath = `${basePath}/thumb.webp`;
	await uploadFile(originalPath, file);
	await uploadFile(largePath, processed.large.blob);
	await uploadFile(mediumPath, processed.medium.blob);
	await uploadFile(thumbPath, processed.thumb.blob);
	return {
		originalPath,
		largePath,
		mediumPath,
		thumbPath
	};
}
async function uploadArtworkMedia({ artworkId, file, role = "detail", sortOrder = 0, altText }) {
	const processed = await processArtworkImage(file);
	const mediaId = v4();
	const paths = await uploadProcessedImage(artworkId, mediaId, file, processed);
	const { data, error } = await supabase.from("artwork_media").insert({
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
		alt_text: altText ?? null
	}).select().single();
	if (error) {
		await cleanupUploadedMedia(paths);
		throw error;
	}
	return mapArtworkMedia(data);
}
async function getArtworkMedia(artworkId) {
	const { data, error } = await supabase.from("artwork_media").select("*").eq("artwork_id", artworkId).order("sort_order", { ascending: true });
	if (error) throw error;
	return (data ?? []).map((row) => mapArtworkMedia(row));
}
async function deleteArtworkMedia(media) {
	const paths = [
		media.original_path,
		media.large_path,
		media.medium_path,
		media.thumb_path
	];
	const { error: storageError } = await supabase.storage.from(STORAGE_BUCKET).remove(paths);
	if (storageError) throw storageError;
	const { error: databaseError } = await supabase.from("artwork_media").delete().eq("id", media.id);
	if (databaseError) throw databaseError;
}
async function setPrimaryArtworkMedia(artworkId, mediaId) {
	const { data: media, error } = await supabase.from("artwork_media").select("id, sort_order").eq("artwork_id", artworkId).order("sort_order", { ascending: true });
	if (error) throw error;
	if (!media?.some((item) => item.id === mediaId)) throw new Error("Selected photo does not belong to this artwork.");
	for (let index = 0; index < media.length; index += 1) {
		const item = media[index];
		const { error: updateError } = await supabase.from("artwork_media").update({
			role: item.id === mediaId ? "primary" : "detail",
			sort_order: index
		}).eq("id", item.id);
		if (updateError) throw updateError;
	}
}
async function cleanupUploadedMedia(paths) {
	await supabase.storage.from(STORAGE_BUCKET).remove([
		paths.originalPath,
		paths.largePath,
		paths.mediumPath,
		paths.thumbPath
	]);
}
//#endregion
export { uploadArtworkMedia as i, getArtworkMedia as n, setPrimaryArtworkMedia as r, deleteArtworkMedia as t };
