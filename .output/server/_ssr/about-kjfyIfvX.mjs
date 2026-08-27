import { a as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Button } from "./button-0h_v-pWj.mjs";
import { t as Reveal } from "./Reveal-DhgqaqLa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-kjfyIfvX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FlippingPhotoGrid({ cards }) {
	const [flippedIndex, setFlippedIndex] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (cards.length === 0) return;
		let timer;
		const scheduleNextFlip = () => {
			const delay = 4e3 + Math.random() * 3e3;
			timer = window.setTimeout(() => {
				setFlippedIndex((current) => {
					let nextIndex = Math.floor(Math.random() * cards.length);
					if (cards.length > 1 && nextIndex === current) nextIndex = (nextIndex + 1) % cards.length;
					return nextIndex;
				});
				scheduleNextFlip();
			}, delay);
		};
		timer = window.setTimeout(() => {
			const firstIndex = Math.floor(Math.random() * cards.length);
			setFlippedIndex(firstIndex);
			scheduleNextFlip();
		}, 2500);
		return () => {
			window.clearTimeout(timer);
		};
	}, [cards.length]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto grid w-full max-w-[300px] grid-cols-3 gap-2 sm:gap-2.5",
		children: cards.map((card, index) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-square [perspective:1200px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: [
						"relative size-full [transform-style:preserve-3d]",
						"transition-transform duration-[1100ms]",
						"ease-[cubic-bezier(0.22,1,0.36,1)]",
						flippedIndex === index ? "[transform:rotateY(180deg)]" : ""
					].join(" "),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 overflow-hidden bg-[#f3f2ef] [backface-visibility:hidden]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: card.image,
							alt: "",
							className: "size-full object-cover opacity-[0.78] mix-blend-multiply",
							draggable: false
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 flex items-center justify-center overflow-hidden bg-[#f5f4f1] px-3 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-[10px] tracking-[0.16em] text-[#777] sm:text-xs",
							children: card.text
						})
					})]
				})
			}, `${card.image}-${index}`);
		})
	});
}
var a_grid_1_default = "/assets/a-grid-1-BhsO67kD.jpeg";
var cards = [
	{
		image: a_grid_1_default,
		text: "Acrylic"
	},
	{
		image: "/assets/a-grid-2-K7uDVxGU.jpeg",
		text: "Oil Paint"
	},
	{
		image: "/assets/a-grid-3-aBclojhb.jpeg",
		text: "Sketching"
	},
	{
		image: "/assets/a-grid-4-RmdGhbTn.jpeg",
		text: "Colour"
	},
	{
		image: "/assets/a-grid-7-GlgWbjK7.jpeg",
		text: "Memories"
	},
	{
		image: "/assets/a-grid-6-DqWUpq36.jpeg",
		text: "Originals"
	},
	{
		image: "/assets/a-grid-5-M6d5ECqa.jpeg",
		text: "Creativity"
	},
	{
		image: "/assets/a-grid-8-DNL077Ue.png",
		text: "Dreams"
	},
	{
		image: a_grid_1_default,
		text: "Hand Painted"
	}
];
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] px-5 pb-20 pt-16 md:px-10 md:pb-32 md:pt-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-16 md:mb-20 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label",
				children: "From the studio"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display mt-8 text-center text-[13vw] leading-[0.78] tracking-[-0.055em] md:text-[8vw]",
				children: "About"
			})]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-start lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 pt-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				className: "flex justify-start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlippingPhotoGrid, { cards })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: 1,
				className: "mt-12 lg:mt-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-hero text-foreground",
						children: "The way I see it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-7 text-lg leading-relaxed text-muted-foreground",
						children: "For me, painting begins long before the first brushstroke. It starts with a thought, an image, a question, or sometimes just the feeling that something familiar could be seen in a different way."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-lg leading-relaxed text-muted-foreground",
						children: [
							"I’m drawn to subjects that already carry meaning, people, places, memories, concept, everyday moments  but I don't always want to present them in the way we're used to seeing them. A divine figure doesn't always need the familiar glow, dramatic pose, or perfectly arranged composition. Sometimes, I find more beauty in imagining the moment before the spectacle: quieter, more human, almost candid. That way of thinking shapes how I approach the entire painting. I care deeply about composition, proportion, balance, visual weight, and where the eye travels through a frame. I can spend an unreasonable amount of time deciding where something should sit before I even pick up a brush. Because to me, a painting doesn't become compelling simply because it is colourful or technically impressive. Every element should have a reason to be there. I have no formal training in art. I’m still learning, experimenting, making mistakes, and figuring out the craft as I go. But I've always trusted my eye and my curiosity enough to pursue the images I want to see.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"PaintTheory is my attempt to turn those ideas into something tangible. Sometimes familiar. Sometimes unexpected. Always personal. And perhaps that's what keeps me painting the possibility of seeing something differently, and making someone else see it too."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								value: "50+",
								label: "Original Artworks"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								value: "8+",
								label: "Years of Experiance"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								value: "100%",
								label: "Hand Painted"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-wrap gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/gallery",
								children: "Explore the gallery"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/commission",
								children: "Commission a piece"
							})
						})]
					})
				]
			})]
		})]
	});
}
function Stat({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-display text-3xl text-foreground",
		children: value
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-xs text-muted-foreground",
		children: label
	})] });
}
//#endregion
export { AboutPage as component };
