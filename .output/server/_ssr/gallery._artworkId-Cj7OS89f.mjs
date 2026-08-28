import { a as getArtworkById } from "./artwork.service-D5UQhGTZ.mjs";
import { N as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery._artworkId-Cj7OS89f.js
var $$splitComponentImporter = () => import("./gallery._artworkId-DOx6Gfse.mjs");
var $$splitNotFoundComponentImporter = () => import("./gallery._artworkId-CgKe_X8C.mjs");
var Route = createFileRoute("/gallery/$artworkId")({
	loader: async ({ params }) => {
		try {
			const artwork = await getArtworkById(params.artworkId);
			if (!artwork) throw notFound();
			return { artwork };
		} catch {
			throw notFound();
		}
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Artwork not found — Maison" }, {
			name: "robots",
			content: "noindex"
		}] };
		const { artwork } = loaderData;
		return { meta: [
			{ title: `${artwork.title} — Maison` },
			{
				name: "description",
				content: `${artwork.title}. ${artwork.description ?? ""} ${artwork.dimensions}, ${artwork.medium}.`
			},
			{
				property: "og:title",
				content: `${artwork.title} — Maison`
			},
			{
				property: "og:description",
				content: artwork.story
			},
			{
				property: "og:image",
				content: artwork.image
			},
			{
				property: "og:type",
				content: "product"
			},
			{
				name: "twitter:image",
				content: artwork.image
			}
		] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
