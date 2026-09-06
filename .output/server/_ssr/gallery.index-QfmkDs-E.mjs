import { a as __toESM } from "../_runtime.mjs";
import { i as getAllArtworks } from "./artwork.service-D5UQhGTZ.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/@icons-pack/react-simple-icons+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as Reveal } from "./Reveal-DhgqaqLa.mjs";
import { t as formatPrice } from "./artwork-BcBh99Ev.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery.index-QfmkDs-E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ArtworkCard({ artwork, priority = false, index = 0 }) {
	const status = artwork.availability === "Sold" ? "Sold" : artwork.availability === "Reserved" ? "Reserved" : formatPrice(artwork.price);
	const ratio = artwork.orientation === "landscape" ? "aspect-[4/3]" : artwork.orientation === "square" ? "aspect-square" : "aspect-[4/5]";
	const imageSrc = (artwork.media.find((media) => media.role === "primary") ?? artwork.media[0])?.mediumUrl || artwork.image;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.article, {
		initial: {
			opacity: 0,
			y: 24
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-60px"
		},
		transition: {
			duration: .8,
			delay: index % 3 * .09,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: "group",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/gallery/$artworkId",
			params: { artworkId: artwork.id },
			className: "block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `overflow-hidden bg-secondary ${ratio}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: imageSrc,
						alt: `${artwork.title} — ${artwork.medium}, ${artwork.dimensions}`,
						loading: priority ? "eager" : "lazy",
						className: "size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display text-lg",
						children: artwork.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							artwork.medium,
							" · ",
							artwork.dimensions,
							" · ",
							artwork.year
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `label shrink-0 ${artwork.availability === "Available" ? "text-clay" : ""}`,
						children: status
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground",
					children: artwork.description
				})
			]
		})
	});
}
function GalleryPage() {
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [artworks, setArtworks] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getAllArtworks().then(setArtworks).catch(console.error);
	}, []);
	const filters = [
		"All",
		...Array.from(new Set(artworks.flatMap((art) => art.category.split(",").map((category) => category.trim()).filter(Boolean)))).sort(),
		"Available",
		"Sold"
	];
	const list = (0, import_react.useMemo)(() => filter === "All" ? artworks : filter === "Available" || filter === "Sold" ? artworks.filter((art) => art.availability === filter) : artworks.filter((art) => art.category.split(",").map((category) => category.trim()).includes(filter)), [artworks, filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] px-5 pt-24 md:px-10 md:pt-26",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "label",
				children: "Complete works"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display mt-5 text-[13vw] leading-[0.85] md:text-[8vw]",
				children: "Gallery"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 1,
				className: "hairline mt-12 flex flex-wrap gap-6 pt-5",
				children: filters.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setFilter(item),
					className: `text-xs transition-colors ${filter === item ? "text-clay" : "text-muted-foreground hover:text-foreground"}`,
					children: [item, item === "All" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", {
						className: "ml-1 font-mono text-[9px]",
						children: artworks.length
					})]
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				layout: true,
				className: "mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3",
				children: list.map((art, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtworkCard, {
					artwork: art,
					index,
					priority: index < 3
				}, art.id))
			}),
			list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-20 text-center text-muted-foreground",
				children: "No works in this category right now."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "hairline mt-24 pt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-lg text-sm text-muted-foreground",
					children: "Nothing here quite yours? Every commission starts as a blank stretcher and one conversation."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/commission",
					className: "group mt-4 inline-flex items-center gap-1.5 text-xs font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "link-underline",
						children: "Ask me for a painting"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" })]
				})]
			})
		]
	});
}
//#endregion
export { GalleryPage as component };
