import { t as supabase } from "./supabase-BYgwpyL6.mjs";
import { t as processArtworkImage } from "./image-processing-O04xFheh.mjs";
import { t as v4 } from "../_libs/uuid.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feedback.service-D-EWxhuj.js
var STORAGE_BUCKET = "artworks";
var FEEDBACK_FOLDER = "feedback";
function getPublicUrl(path) {
	return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}
function getExtension(filename) {
	const extension = filename.split(".").pop()?.toLowerCase();
	return extension && extension.length <= 5 ? extension : "jpg";
}
function escapeXml(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function wrapText(text, maxCharacters) {
	const words = text.trim().split(/\s+/);
	const lines = [];
	let current = "";
	for (const word of words) {
		const next = current ? `${current} ${word}` : word;
		if (next.length > maxCharacters && current) {
			lines.push(current);
			current = word;
		} else current = next;
	}
	if (current) lines.push(current);
	return lines;
}
function createFeedbackSvg({ quote, name, location, date, rating }) {
	const width = 1200;
	const padding = 120;
	const displayFont = "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif";
	const sansFont = "DM Sans, ui-sans-serif, system-ui, sans-serif";
	const monoFont = "JetBrains Mono, ui-monospace, monospace";
	const quoteLines = wrapText(quote, 55);
	const lineHeight = 48;
	const quoteTop = 250;
	let cursorY = quoteTop + quoteLines.length * lineHeight + 60;
	const details = [];
	if (name?.trim()) details.push(escapeXml(name.trim()));
	if (location?.trim()) details.push(escapeXml(location.trim()));
	if (date?.trim()) details.push(escapeXml(date.trim()));
	const detailsText = details.join("  ·  ");
	const ratingText = rating && rating > 0 ? "★".repeat(Math.min(5, rating)) : "";
	const ratingBlock = ratingText ? `
      <text
        x="${padding}"
        y="${cursorY}"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="25"
        letter-spacing="5"
        fill="#a46d42"
      >${ratingText}</text>
    ` : "";
	if (ratingText) cursorY += 50;
	const detailsBlock = detailsText ? `
        <text
          x="${padding}"
          y="${cursorY + 4}"
          font-family="Arial, Helvetica, sans-serif"
          font-size="34"
          fill="#6f685f"
        >${detailsText}</text>
      ` : "";
	const finalHeight = Math.max(720, cursorY + (detailsText ? 110 : 35));
	const quoteMarkup = quoteLines.map((line, index) => `
          <text
            x="${padding}"
            y="${quoteTop + index * lineHeight}"
            font-family="${sansFont}"
            font-size="40"
            font-weight="400"
            fill="#27231f"
          >${escapeXml(line)}</text>
        `).join("");
	return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${finalHeight}"
      viewBox="0 0 ${width} ${finalHeight}"
    >
      <rect
        width="100%"
        height="100%"
        fill="#fbf8f2"
      />

      <rect
        x="36"
        y="36"
        width="${width - 72}"
        height="${finalHeight - 72}"
        rx="28"
        fill="none"
        stroke="#e5ddd1"
        stroke-width="2"
      />

      <text
        x="${padding}"
        y="125"
        font-family="${monoFont}"
        font-size="24"
        letter-spacing="5"
        text-transform="uppercase"
        fill="#9a8b79"
      >BUYER'S NOTE</text>

      <text
        x="${width - padding}"
        y="185"
        text-anchor="end"
        font-family="${displayFont}"
        font-size="120"
        fill="#d5c7b6"
      >“</text>

      ${quoteMarkup}

      ${ratingBlock}

      ${detailsBlock}
    </svg>
  `;
}
async function getFeedback() {
	const { data, error } = await supabase.from("feedback").select("id, image_path, sort_order, created_at").order("sort_order", { ascending: true }).order("created_at", { ascending: true });
	if (error) throw error;
	return (data ?? []).map((item) => {
		const isSvg = item.image_path.endsWith(".svg");
		const basePath = item.image_path.replace(isSvg ? /\/medium\.svg$/ : /\/medium\.webp$/, "");
		return {
			id: item.id,
			sortOrder: item.sort_order,
			createdAt: item.created_at,
			imageUrl: getPublicUrl(item.image_path),
			thumbUrl: getPublicUrl(`${basePath}/${isSvg ? "thumb.svg" : "thumb.webp"}`)
		};
	});
}
async function uploadFeedback(file, sortOrder) {
	const feedbackId = v4();
	const extension = getExtension(file.name);
	const basePath = `${FEEDBACK_FOLDER}/${feedbackId}`;
	const processed = await processArtworkImage(file);
	const originalPath = `${basePath}/original.${extension}`;
	const largePath = `${basePath}/large.webp`;
	const mediumPath = `${basePath}/medium.webp`;
	const thumbPath = `${basePath}/thumb.webp`;
	try {
		const uploads = [
			{
				path: originalPath,
				file,
				contentType: file.type
			},
			{
				path: largePath,
				file: processed.large.blob,
				contentType: "image/webp"
			},
			{
				path: mediumPath,
				file: processed.medium.blob,
				contentType: "image/webp"
			},
			{
				path: thumbPath,
				file: processed.thumb.blob,
				contentType: "image/webp"
			}
		];
		for (const item of uploads) {
			const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(item.path, item.file, {
				upsert: false,
				contentType: item.contentType,
				cacheControl: "31536000"
			});
			if (error) throw error;
		}
		const { error: databaseError } = await supabase.from("feedback").insert({
			id: feedbackId,
			image_path: mediumPath,
			sort_order: sortOrder
		});
		if (databaseError) throw databaseError;
	} catch (error) {
		await supabase.storage.from(STORAGE_BUCKET).remove([
			originalPath,
			largePath,
			mediumPath,
			thumbPath
		]);
		throw error;
	}
}
async function createFeedback({ quote, name, location, date, rating, sortOrder }) {
	if (!quote.trim()) throw new Error("Feedback text is required.");
	const feedbackId = v4();
	const basePath = `${FEEDBACK_FOLDER}/${feedbackId}`;
	const svg = createFeedbackSvg({
		quote: quote.trim(),
		name,
		location,
		date,
		rating
	});
	const svgFile = new File([svg], "feedback.svg", { type: "image/svg+xml" });
	const originalPath = `${basePath}/original.svg`;
	const largePath = `${basePath}/large.svg`;
	const mediumPath = `${basePath}/medium.svg`;
	const thumbPath = `${basePath}/thumb.svg`;
	try {
		const uploads = [
			{
				path: originalPath,
				file: svgFile
			},
			{
				path: largePath,
				file: svgFile
			},
			{
				path: mediumPath,
				file: svgFile
			},
			{
				path: thumbPath,
				file: svgFile
			}
		];
		for (const item of uploads) {
			const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(item.path, item.file, {
				upsert: false,
				contentType: "image/svg+xml",
				cacheControl: "31536000"
			});
			if (error) throw error;
		}
		const { error: databaseError } = await supabase.from("feedback").insert({
			id: feedbackId,
			image_path: mediumPath,
			sort_order: sortOrder
		});
		if (databaseError) throw databaseError;
		return feedbackId;
	} catch (error) {
		await supabase.storage.from(STORAGE_BUCKET).remove([
			originalPath,
			largePath,
			mediumPath,
			thumbPath
		]);
		throw error;
	}
}
async function deleteFeedback(feedback) {
	const basePath = feedback.imageUrl.split("/storage/v1/object/public/artworks/")[1]?.replace(/\/medium\.(webp|svg)$/, "");
	if (basePath) await supabase.storage.from(STORAGE_BUCKET).remove([
		`${basePath}/original.jpg`,
		`${basePath}/original.jpeg`,
		`${basePath}/original.png`,
		`${basePath}/original.webp`,
		`${basePath}/original.svg`,
		`${basePath}/large.webp`,
		`${basePath}/medium.webp`,
		`${basePath}/thumb.webp`,
		`${basePath}/large.svg`,
		`${basePath}/medium.svg`,
		`${basePath}/thumb.svg`
	]);
	const { error } = await supabase.from("feedback").delete().eq("id", feedback.id);
	if (error) throw error;
}
//#endregion
export { uploadFeedback as i, deleteFeedback as n, getFeedback as r, createFeedback as t };
