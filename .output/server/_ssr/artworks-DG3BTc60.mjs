import { a as __toESM } from "../_runtime.mjs";
import { i as getAllArtworks, n as deleteArtwork } from "./artwork.service-D5UQhGTZ.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/@icons-pack/react-simple-icons+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-BQQ3Gu5O.mjs";
import { f as Plus } from "../_libs/lucide-react.mjs";
import { t as formatPrice } from "./artwork-BcBh99Ev.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/artworks-DG3BTc60.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminArtworksPage() {
	const [artworks, setArtworks] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	async function loadArtworks() {
		try {
			setLoading(true);
			setError("");
			const data = await getAllArtworks();
			console.log("ADMIN ARTWORKS:", data);
			setArtworks(data);
		} catch (error) {
			console.error("FAILED TO LOAD ARTWORKS:", error);
			setError(error instanceof Error ? error.message : JSON.stringify(error));
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		loadArtworks();
	}, []);
	async function handleDelete(id) {
		if (!window.confirm("Delete this artwork? This cannot be undone.")) return;
		try {
			await deleteArtwork(id);
			await loadArtworks();
		} catch (error) {
			console.error(error);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-6 py-10 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Studio dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-4xl text-foreground",
				children: "Artworks"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/artworks/new",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add artwork"]
				})
			})]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "py-16 text-center text-muted-foreground",
			children: "Loading artworks..."
		}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-12 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-red-700",
				children: "Failed to load artworks"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-red-600",
				children: error
			})]
		}) : artworks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 rounded-2xl border border-dashed border-border bg-card/50 px-5 py-12 text-center text-sm text-muted-foreground",
			children: "No artworks yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: artworks.map((artwork) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "overflow-hidden rounded-2xl border border-border bg-card shadow-soft",
				children: [artwork.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: artwork.image,
					alt: artwork.title,
					className: "aspect-[4/5] w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: artwork.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-xl text-foreground",
							children: artwork.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: artwork.medium
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-lg text-accent",
							children: formatPrice(artwork.price)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin/artworks/$artworkId",
									params: { artworkId: artwork.id },
									children: "Edit"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "destructive",
								onClick: () => handleDelete(artwork.id),
								children: "Delete"
							})]
						})
					]
				})]
			}, artwork.id))
		})]
	});
}
//#endregion
export { AdminArtworksPage as component };
