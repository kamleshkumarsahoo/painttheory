import { a as __toESM } from "../_runtime.mjs";
import { i as getAllArtworks, o as getFeaturedArtworks } from "./artwork.service-D5UQhGTZ.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/@icons-pack/react-simple-icons+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Grid2x2, L as ArrowRight, w as Layers } from "../_libs/lucide-react.mjs";
import { i as getAllJournal } from "./journal.service-dNpgGlAg.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as Reveal } from "./Reveal-DhgqaqLa.mjs";
import { t as formatPrice } from "./artwork-BcBh99Ev.mjs";
import { r as getFeedback } from "./feedback.service-D-EWxhuj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bz3z7_HZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useHomeArtworks() {
	const [artworks, setArtworks] = (0, import_react.useState)([]);
	const [featured, setFeatured] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getAllArtworks().then(setArtworks).catch(console.error);
		getFeaturedArtworks().then(setFeatured).catch(console.error);
	}, []);
	return {
		artworks,
		featured,
		selected: (featured.length ? featured : artworks).slice(0, 10)
	};
}
var bg_photo1_default = "/assets/bg-photo1-YXW9J7sU.jpg";
function HomeHero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "\r\n        relative\r\n        min-h-[720px]\r\n        overflow-hidden\r\n        text-white\r\n        md:min-h-[calc(100svh-120px)]\r\n      ",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-hidden": "true",
			className: "absolute inset-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: bg_photo1_default,
					alt: "",
					className: "\r\n            size-full\r\n            object-cover\r\n            object-center\r\n          "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/10" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "\r\n            absolute\r\n            inset-x-0\r\n            bottom-0\r\n            h-[58%]\r\n            bg-gradient-to-t\r\n            from-black/70\r\n            via-black/30\r\n            to-transparent\r\n            md:h-[48%]\r\n          " })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "\r\n          relative\r\n          mx-auto\r\n          flex\r\n          min-h-[720px]\r\n          max-w-[1400px]\r\n          flex-col\r\n          justify-between\r\n          px-5\r\n          pb-17\r\n          pt-30\r\n          md:min-h-[calc(100svh-120px)]\r\n          md:px-10\r\n          md:pb-12\r\n          md:pt-52\r\n        ",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "\r\n              block\r\n              whitespace-nowrap\r\n              text-[16vw]\r\n              leading-[0.85]\r\n              tracking-[-0.04em]\r\n              text-white\r\n              md:text-[11.5vw]\r\n              pb-3\r\n            ",
					style: {
						fontFamily: "Melodrama",
						fontWeight: 700
					},
					children: "PaintTheory"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 2,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "\r\n                label\r\n                font-[500]\r\n                text-white/85\r\n              ",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "lowercase italic text-white/60",
							children: "by"
						}),
						" ",
						"KAMLESH SAHOO"
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: 2,
				className: "\r\n              mt-5\r\n              grid\r\n              gap-2\r\n              border-t\r\n              border-white/25\r\n              pt-5\r\n              md:mt-6\r\n              md:grid-cols-[1.45fr_1fr]\r\n              md:gap-12\r\n              md:pt-6\r\n            ",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "\r\n                max-w-7xl\r\n                text-sm\r\n                pb-10\r\n                leading-relaxed\r\n                text-white/90\r\n                md:text-base\r\n              ",
					children: [
						"PaintTheory is my corner of the internet where I share the paintings I make, the ideas behind, and the stories that come along.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "hidden md:block" }),
						"A place to explore my work, follow along, and perhaps find something that speaks to you."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "\r\n                flex\r\n                flex-wrap\r\n                items-start\r\n                gap-x-7\r\n                gap-y-2\r\n                md:justify-end\r\n              ",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/gallery",
						className: "\r\n                  rounded-full\r\n                  bg-white\r\n                  px-6\r\n                  py-3\r\n                  text-xs\r\n                  font-medium\r\n                  text-black\r\n                  transition-opacity\r\n                  hover:opacity-90\r\n                ",
						children: "See available work"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/commission",
						className: "\r\n                  group\r\n                  inline-flex\r\n                  items-center\r\n                  gap-1.5\r\n                  py-3\r\n                  text-xs\r\n                  font-medium\r\n                  text-white\r\n                ",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "link-underline",
							children: "Commission something"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "\r\n                    size-4\r\n                    text-white/70\r\n                    transition-transform\r\n                    duration-300\r\n                    group-hover:translate-x-1\r\n                  " })]
					})]
				})]
			})] })]
		})]
	});
}
var walls = [
	{
		name: "Bone",
		value: "oklch(0.965 0.004 90)"
	},
	{
		name: "Clay",
		value: "oklch(0.93 0.02 60)"
	},
	{
		name: "Sage",
		value: "oklch(0.925 0.02 150)"
	},
	{
		name: "Slate",
		value: "oklch(0.88 0.012 250)"
	}
];
function Morph({ value, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
		initial: {
			opacity: 0,
			y: 8,
			clipPath: "inset(100% 0 0 0)"
		},
		animate: {
			opacity: 1,
			y: 0,
			clipPath: "inset(0 0 0 0)"
		},
		transition: {
			duration: .45,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: `inline-block ${className ?? ""}`,
		children: value
	}, value);
}
function AutoFitTitle({ value }) {
	const containerRef = (0, import_react.useRef)(null);
	const textRef = (0, import_react.useRef)(null);
	const [fontSize, setFontSize] = (0, import_react.useState)(48);
	(0, import_react.useLayoutEffect)(() => {
		const fit = () => {
			const container = containerRef.current;
			const text = textRef.current;
			if (!container || !text) return;
			const isDesktop = window.innerWidth >= 768;
			const maxSize = isDesktop ? 48 : 30;
			const minSize = isDesktop ? 24 : 20;
			let size = maxSize;
			text.style.fontSize = `${size}px`;
			while (text.scrollHeight > container.clientHeight && size > minSize) {
				size -= 1;
				text.style.fontSize = `${size}px`;
			}
			setFontSize(size);
		};
		const frame = window.requestAnimationFrame(fit);
		const observer = new ResizeObserver(fit);
		if (containerRef.current) observer.observe(containerRef.current);
		window.addEventListener("resize", fit);
		return () => {
			window.cancelAnimationFrame(frame);
			observer.disconnect();
			window.removeEventListener("resize", fit);
		};
	}, [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: containerRef,
		className: "\r\n        mt-4\r\n        h-[60px]\r\n        overflow-hidden\r\n        md:h-[110px]\r\n      ",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			ref: textRef,
			className: "\r\n          display\r\n          leading-[1]\r\n        ",
			style: {
				fontFamily: "Melodrama",
				fontWeight: 700,
				fontSize: `${fontSize}px`
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Morph, { value })
		})
	});
}
function OnTheWall({ artworks }) {
	const works = artworks.filter((art) => art.on_wall);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [wall, setWall] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!works.length) return;
		const interval = window.setInterval(() => {
			setIndex((current) => (current + 1) % works.length);
		}, 5200);
		return () => window.clearInterval(interval);
	}, [works.length]);
	if (!works.length) return null;
	const work = works[index];
	const wallMedia = work.wall_media_id ? work.media.find((media) => media.id === work.wall_media_id) : void 0;
	const primaryMedia = work.media.find((media) => media.role === "primary") ?? work.media[0];
	wallMedia?.largeUrl || primaryMedia?.largeUrl || work.image;
	const price = work.availability === "Sold" ? "Sold — prints on request" : work.availability === "Reserved" ? "Reserved" : formatPrice(work.price);
	const go = (direction) => {
		setIndex((current) => (current + direction + works.length) % works.length);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "\r\n        relative\r\n        overflow-hidden\r\n        px-5\r\n        py-10\r\n        transition-colors\r\n        duration-700\r\n        md:px-10\r\n        md:py-12\r\n      ",
		style: { backgroundColor: walls[wall].value },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "\r\n          fog-field\r\n          pointer-events-none\r\n          absolute\r\n          inset-x-[-15%]\r\n          top-[-10%]\r\n          h-[120%]\r\n          opacity-90\r\n        "
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "\r\n          relative\r\n          mx-auto\r\n          max-w-[1400px]\r\n        ",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "\r\n            flex\r\n            items-baseline\r\n            justify-between\r\n            gap-6\r\n          ",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "\r\n              display\r\n              text-5xl\r\n              text-foreground/30\r\n              md:text-6xl\r\n            ",
						children: "On the wall"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "\r\n            mt-15\r\n            grid\r\n            items-center\r\n            gap-12\r\n            md:mt-20\r\n            md:grid-cols-[1.05fr_0.95fr]\r\n            md:gap-20\r\n          ",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						className: "flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							className: "\r\n                relative\r\n                w-full\r\n                max-w-[480px]\r\n              ",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"aria-hidden": true,
									className: "\r\n                  pointer-events-none\r\n                  absolute\r\n                  -inset-[18%]\r\n                  rounded-[50%]\r\n                  bg-[radial-gradient(closest-side,oklch(1_0_0/38%),transparent_75%)]\r\n                "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"aria-hidden": true,
									className: "\r\n                  pointer-events-none\r\n                  absolute\r\n                  -right-6\r\n                  bottom-2\r\n                  top-8\r\n                  w-1/2\r\n                  -skew-y-3\r\n                  rounded-[40%]\r\n                  bg-ink/12\r\n                  blur-2xl\r\n                "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "art-frame relative",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "art-mat",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "\r\n                      art-glass\r\n                      art-inner-shadow\r\n                      relative\r\n                      aspect-[4/5]\r\n                      overflow-hidden\r\n                      bg-secondary\r\n                    ",
											children: [works.map((piece, itemIndex) => {
												const previousIndex = (index - 1 + works.length) % works.length;
												if (itemIndex !== index && itemIndex !== previousIndex) return null;
												const pieceWallMedia = piece.wall_media_id ? piece.media.find((media) => media.id === piece.wall_media_id) : void 0;
												const piecePrimaryMedia = piece.media.find((media) => media.role === "primary") ?? piece.media[0];
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: pieceWallMedia?.largeUrl || piecePrimaryMedia?.largeUrl || piece.image,
													alt: piece.title,
													loading: "lazy",
													className: `
                              absolute
                              inset-0
                              size-full
                              object-cover
                              ${itemIndex === index ? "art-bloom-in z-[1]" : ""}
                            `
												}, `${piece.id}-${itemIndex === index ? index : "previous"}`);
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"aria-hidden": true,
												className: "\r\n                        pointer-events-none\r\n                        absolute\r\n                        inset-0\r\n                        z-[2]\r\n                        bg-[linear-gradient(150deg,oklch(1_0_0/22%),transparent_45%,oklch(0.19_0.012_60/16%))]\r\n                      "
											})]
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"aria-hidden": true,
									className: "\r\n                  mx-auto\r\n                  mt-1\r\n                  h-3\r\n                  w-[72%]\r\n                  translate-x-3\r\n                  rounded-[100%]\r\n                  bg-ink/14\r\n                  blur-2xl\r\n                "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "\r\n                  mt-4\r\n                  flex\r\n                  items-center\r\n                  justify-between\r\n                  gap-6\r\n                ",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "\r\n                    flex\r\n                    items-center\r\n                    gap-4\r\n                  ",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "label",
											children: "Wall"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "\r\n                      flex\r\n                      items-center\r\n                      gap-3\r\n                    ",
											children: walls.map((item, itemIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												"aria-label": `${item.name} wall`,
												"aria-pressed": itemIndex === wall,
												onClick: () => setWall(itemIndex),
												style: { backgroundColor: item.value },
												className: `
                            h-3
                            w-3
                            rounded-full
                            ring-1
                            outline-none
                            transition-all
                            focus:outline-none
                            ${itemIndex === wall ? "ring-clay ring-offset-2" : "ring-ink/20"}
                          `
											}, item.name))
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "\r\n                    flex\r\n                    items-center\r\n                    gap-5\r\n                  ",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												"aria-label": "Previous artwork",
												onClick: () => go(-1),
												className: "\r\n                      text-muted-foreground\r\n                      transition-colors\r\n                      hover:text-clay\r\n                    ",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
													viewBox: "0 0 24 24",
													className: "h-5 w-5",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "1.2",
													"aria-hidden": true,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														d: "M15 4L7 12l8 8",
														strokeLinecap: "round",
														strokeLinejoin: "round"
													})
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "label",
												children: [
													String(index + 1).padStart(2, "0"),
													" ",
													"/",
													" ",
													String(works.length).padStart(2, "0")
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												"aria-label": "Next artwork",
												onClick: () => go(1),
												className: "\r\n                      text-muted-foreground\r\n                      transition-colors\r\n                      hover:text-clay\r\n                    ",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
													viewBox: "0 0 24 24",
													className: "h-5 w-5",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "1.2",
													"aria-hidden": true,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														d: "M9 4l8 8-8 8",
														strokeLinecap: "round",
														strokeLinejoin: "round"
													})
												})
											})
										]
									})]
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						className: "self-stretch",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "\r\n                flex\r\n                h-full\r\n                flex-col\r\n              ",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "label",
										children: "Now hanging"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoFitTitle, { value: work.title })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "\r\n                  mt-5\r\n                  h-[140px]\r\n                  max-w-md\r\n                  md:mt-6\r\n                  md:h-[120px]\r\n                ",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "\r\n                    text-sm\r\n                    leading-relaxed\r\n                    text-muted-foreground\r\n                  ",
										children: (() => {
											const description = work.description ?? "";
											const words = description.split(" ");
											if (words.length <= 24) return description;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [words.slice(0, 48).join(" "), "..."] });
										})()
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "\r\n                  mt-8\r\n                  grid\r\n                  max-w-2xl\r\n                  grid-cols-4\r\n                  text-xs\r\n                ",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "\r\n                    min-w-0\r\n                    pr-4\r\n                  ",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "label",
												children: "Medium"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
												className: "\r\n                      mt-2\r\n                      truncate\r\n                    ",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Morph, { value: work.medium })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "\r\n                    min-w-0\r\n                    border-l\r\n                    border-foreground/10\r\n                    px-4\r\n                  ",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "label",
												children: "Size"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
												className: "\r\n                      mt-2\r\n                      truncate\r\n                    ",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Morph, { value: work.dimensions })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "\r\n                    min-w-0\r\n                    border-l\r\n                    border-foreground/10\r\n                    px-4\r\n                  ",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "label",
												children: "Year"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
												className: "\r\n                      mt-2\r\n                      truncate\r\n                    ",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Morph, { value: String(work.year) })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "\r\n                    min-w-0\r\n                    border-l\r\n                    border-foreground/10\r\n                    pl-4\r\n                  ",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "label",
												children: "Price"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
												className: "\r\n                      mt-2\r\n                      truncate\r\n                    ",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Morph, { value: price })
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-8",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/gallery/$artworkId",
										params: { artworkId: work.id },
										className: "\r\n                    group\r\n                    inline-flex\r\n                    items-center\r\n                    gap-1.5\r\n                    py-3\r\n                    text-xs\r\n                    font-medium\r\n                  ",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "link-underline",
											children: "Enquire about this piece"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "\r\n                      size-4\r\n                      text-muted-foreground\r\n                      transition-transform\r\n                      duration-300\r\n                      group-hover:translate-x-1\r\n                    " })]
									})
								})
							]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "\r\n            mt-12\r\n            flex\r\n            gap-2\r\n          ",
					children: works.map((piece, itemIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `Show ${piece.title}`,
						onClick: () => setIndex(itemIndex),
						className: `
                  h-px
                  flex-1
                  transition-colors
                  duration-500
                  ${itemIndex === index ? "bg-clay" : "bg-ink/15"}
                `
					}, piece.id))
				})
			]
		})]
	});
}
function Testimonials() {
	const [feedback, setFeedback] = (0, import_react.useState)([]);
	const [start, setStart] = (0, import_react.useState)(0);
	const [step, setStep] = (0, import_react.useState)(300);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const wrapRef = (0, import_react.useRef)(null);
	const sliderRef = (0, import_react.useRef)(null);
	const resumeTimerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		getFeedback().then(setFeedback).catch(console.error);
	}, []);
	(0, import_react.useEffect)(() => {
		const measure = () => {
			const width = wrapRef.current?.offsetWidth ?? 1e3;
			setStep(Math.max(150, Math.min(300, width * .25)));
		};
		measure();
		window.addEventListener("resize", measure);
		return () => {
			window.removeEventListener("resize", measure);
		};
	}, []);
	const pauseTemporarily = () => {
		setPaused(true);
		if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
		resumeTimerRef.current = window.setTimeout(() => {
			setPaused(false);
		}, 1200);
	};
	(0, import_react.useEffect)(() => {
		if (feedback.length <= 1) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		if (paused || dragging) return;
		const interval = window.setInterval(() => {
			setStart((current) => {
				return (current + 1) % feedback.length;
			});
		}, 3200);
		return () => {
			window.clearInterval(interval);
		};
	}, [
		feedback.length,
		paused,
		dragging
	]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
		};
	}, []);
	const setFromPosition = (clientX) => {
		const track = sliderRef.current;
		if (!track || feedback.length <= 1) return;
		const rect = track.getBoundingClientRect();
		const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
		const index = Math.round(percentage * (feedback.length - 1));
		setStart(index);
	};
	const handlePointerDown = (event) => {
		if (feedback.length <= 1) return;
		setDragging(true);
		pauseTemporarily();
		event.currentTarget.setPointerCapture(event.pointerId);
		setFromPosition(event.clientX);
	};
	const handlePointerMove = (event) => {
		if (!dragging) return;
		setFromPosition(event.clientX);
	};
	const handlePointerUp = (event) => {
		setDragging(false);
		try {
			event.currentTarget.releasePointerCapture(event.pointerId);
		} catch {}
	};
	if (!feedback.length) return null;
	const visiblePositions = [
		-1,
		0,
		1
	];
	const sliderProgress = feedback.length <= 1 ? 0 : start / (feedback.length - 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "w-full bg-[#eee9df]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "\r\n          mx-auto\r\n          w-full\r\n          max-w-[1400px]\r\n          px-0\r\n          pb-1\r\n          md:px-10\r\n          md:pb-5\r\n        ",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "\r\n            flex\r\n            flex-wrap\r\n            items-end\r\n            justify-between\r\n            px-5\r\n            gap-6\r\n            pt-8\r\n            md:pt-12\r\n          ",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display text-5xl md:text-6xl",
					children: "In their words"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label mt-2 block",
					children: "From the people who found the work"
				})] }), feedback.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 pb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": paused ? "Play feedback rotation" : "Pause feedback rotation",
						onClick: () => {
							setPaused((current) => !current);
						},
						className: "\r\n                  flex\r\n                  size-4\r\n                  items-center\r\n                  justify-center\r\n                  text-muted-foreground/80\r\n                  transition-colors\r\n                  hover:text-foreground\r\n                ",
						children: paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 12 12",
							className: "h-4 w-4",
							fill: "currentColor",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 2.1v7.8L9.5 6z" })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 12 12",
							className: "h-4 w-4",
							fill: "currentColor",
							"aria-hidden": "true",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "2.5",
								y: "2",
								width: "2",
								height: "8",
								rx: ".4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "7.5",
								y: "2",
								width: "2",
								height: "8",
								rx: ".4"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: sliderRef,
						role: "slider",
						"aria-label": "Feedback position",
						"aria-valuemin": 0,
						"aria-valuemax": feedback.length - 1,
						"aria-valuenow": start,
						tabIndex: 0,
						onPointerDown: handlePointerDown,
						onPointerMove: handlePointerMove,
						onPointerUp: handlePointerUp,
						onPointerCancel: handlePointerUp,
						onKeyDown: (event) => {
							if (event.key === "ArrowRight") {
								event.preventDefault();
								pauseTemporarily();
								setStart((current) => (current + 1) % feedback.length);
							}
							if (event.key === "ArrowLeft") {
								event.preventDefault();
								pauseTemporarily();
								setStart((current) => (current - 1 + feedback.length) % feedback.length);
							}
							if (event.key === "Home") {
								event.preventDefault();
								pauseTemporarily();
								setStart(0);
							}
							if (event.key === "End") {
								event.preventDefault();
								pauseTemporarily();
								setStart(feedback.length - 1);
							}
						},
						className: "\r\n                  relative\r\n                  h-3\r\n                  w-[320px]\r\n                  cursor-pointer\r\n                  touch-none\r\n                  select-none\r\n                  rounded-[2px]\r\n                  bg-border/50\r\n                  outline-none\r\n                  focus-visible:ring-2\r\n                  focus-visible:ring-clay/20\r\n                  md:w-[240px]\r\n                ",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: ["absolute top-0 h-3 w-12 rounded-[2px] bg-muted-foreground/40", dragging ? "cursor-grabbing" : "cursor-grab"].join(" "),
							style: { left: feedback.length <= 1 ? "0px" : `calc(${sliderProgress * 100}% - ${sliderProgress * 48}px)` }
						})
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				className: "mt-2 md:mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: wrapRef,
					className: "\r\n              relative\r\n              h-[380px]\r\n              w-full\r\n              overflow-hidden\r\n              md:h-[440px]\r\n            ",
					children: feedback.map((item, index) => {
						let relative = index - start;
						const length = feedback.length;
						if (relative > length / 2) relative -= length;
						if (relative < -length / 2) relative += length;
						if (!visiblePositions.includes(relative)) return null;
						const isCenter = relative === 0;
						const x = relative * step;
						const scale = isCenter ? 1 : .88;
						const opacity = isCenter ? 1 : .72;
						const zIndex = isCenter ? 30 : 20;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
							className: "\r\n                    absolute\r\n                    left-1/2\r\n                    top-1/2\r\n                    w-[260px]\r\n                    overflow-hidden\r\n                    rounded-2xl\r\n                    border\r\n                    border-border\r\n                    bg-card\r\n                    shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-20px_rgba(0,0,0,0.3)]\r\n                    transition-all\r\n                    duration-1000\r\n                    ease-[cubic-bezier(0.22,1,0.36,1)]\r\n                    sm:w-[290px]\r\n                    md:w-[340px]\r\n                    lg:w-[390px]\r\n                  ",
							style: {
								transform: `
                      translate(-50%, -50%)
                      translateX(${x}px)
                      scale(${scale})
                    `,
								opacity,
								zIndex
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.imageUrl,
								alt: "Collector feedback",
								loading: "lazy",
								className: "\r\n                      block\r\n                      h-auto\r\n                      w-full\r\n                      object-contain\r\n                    "
							})
						}, item.id);
					})
				})
			})]
		})
	});
}
function getPrimaryImage(entry) {
	return (entry.media.find((media) => media.role === "primary") ?? entry.media[0])?.mediumUrl ?? "/placeholder.jpg";
}
function getExcerpt(body) {
	const clean = body.replace(/\s+/g, " ").trim();
	if (clean.length <= 130) return clean;
	return `${clean.slice(0, 130).trim()}…`;
}
function JournalPreview() {
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [mobileIndex, setMobileIndex] = (0, import_react.useState)(0);
	const [mobileView, setMobileView] = (0, import_react.useState)("stack");
	const [dragX, setDragX] = (0, import_react.useState)(0);
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const dragStartRef = (0, import_react.useRef)(null);
	const dragCurrentRef = (0, import_react.useRef)(0);
	const swipeTriggeredRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		getAllJournal().then(setPosts).catch(console.error);
	}, []);
	const selected = posts.filter((post) => post.pinned).slice(0, 3);
	if (!selected.length) return null;
	const mobileCards = [...selected, {
		id: "__journal-more__",
		title: "Enter the journals"
	}];
	function handlePointerDown(event) {
		if (mobileView !== "stack") return;
		dragStartRef.current = event.clientX;
		dragCurrentRef.current = 0;
		swipeTriggeredRef.current = false;
		setDragX(0);
		setIsDragging(true);
		event.currentTarget.setPointerCapture(event.pointerId);
	}
	function handlePointerMove(event) {
		if (mobileView !== "stack" || !isDragging || dragStartRef.current === null) return;
		const distance = event.clientX - dragStartRef.current;
		dragCurrentRef.current = distance;
		const limitedDistance = Math.max(-window.innerWidth * .9, Math.min(window.innerWidth * .9, distance));
		setDragX(limitedDistance);
	}
	function handlePointerUp(event) {
		if (mobileView !== "stack" || dragStartRef.current === null) return;
		const distance = dragCurrentRef.current;
		setIsDragging(false);
		dragStartRef.current = null;
		try {
			event.currentTarget.releasePointerCapture(event.pointerId);
		} catch {}
		if (Math.abs(distance) > 80) {
			swipeTriggeredRef.current = true;
			setDragX((distance > 0 ? 1 : -1) * window.innerWidth * 1.15);
			window.setTimeout(() => {
				setMobileIndex((current) => (current + 1) % mobileCards.length);
				setDragX(0);
				window.setTimeout(() => {
					swipeTriggeredRef.current = false;
				}, 50);
			}, 280);
			return;
		}
		setDragX(0);
	}
	function handlePointerCancel() {
		setIsDragging(false);
		dragStartRef.current = null;
		dragCurrentRef.current = 0;
		setDragX(0);
	}
	function handleCardClick(event) {
		if (swipeTriggeredRef.current || Math.abs(dragCurrentRef.current) > 10) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-36",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "\r\n          hairline\r\n          flex\r\n          flex-wrap\r\n          items-baseline\r\n          justify-between\r\n          gap-4\r\n          pt-8\r\n        ",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display text-5xl md:text-6xl",
					children: "From the journal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/journal",
					className: "\r\n            group\r\n            inline-flex\r\n            items-center\r\n            gap-1.5\r\n            py-3\r\n            text-xs\r\n            font-medium\r\n          ",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "link-underline",
						children: "All notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "\r\n              size-4\r\n              text-muted-foreground\r\n              transition-transform\r\n              duration-300\r\n              group-hover:translate-x-1\r\n            " })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 md:hidden",
				children: [
					mobileView === "stack" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "\r\n                relative\r\n                mx-auto\r\n                h-[365px]\r\n                w-full\r\n                max-w-[330px]\r\n              ",
							children: mobileCards.map((card, index) => {
								const relative = (index - mobileIndex + mobileCards.length) % mobileCards.length;
								if (relative > 2) return null;
								const isActive = relative === 0;
								const offset = relative * 10;
								const scale = 1 - relative * .035;
								const opacity = relative === 0 ? 1 : relative === 1 ? .78 : .5;
								const rotation = relative === 0 ? isDragging ? dragX * .025 : 0 : relative === 1 ? -2 : 2;
								if (card.id === "__journal-more__") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/journal",
									className: "\r\n                          absolute\r\n                          inset-x-0\r\n                          top-0\r\n                          mx-auto\r\n                          flex\r\n                          h-[340px]\r\n                          w-[290px]\r\n                          items-center\r\n                          justify-center\r\n                          rounded-2xl\r\n                          border\r\n                          border-border\r\n                          bg-card\r\n                          shadow-[0_16px_40px_-24px_rgba(0,0,0,0.3)]\r\n                        ",
									style: {
										transform: `
                            translateY(${offset}px)
                            scale(${scale})
                            rotate(${rotation}deg)
                          `,
										zIndex: mobileCards.length - relative,
										opacity
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "\r\n                            group\r\n                            inline-flex\r\n                            items-center\r\n                            gap-2\r\n                            text-sm\r\n                            font-medium\r\n                          ",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "link-underline",
											children: "Enter the journals"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "\r\n                              size-4\r\n                              text-muted-foreground\r\n                              transition-transform\r\n                              duration-300\r\n                              group-hover:translate-x-1\r\n                            " })]
									})
								}, card.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "\r\n                        absolute\r\n                        inset-x-0\r\n                        top-0\r\n                        mx-auto\r\n                        h-[340px]\r\n                        w-[290px]\r\n                        overflow-hidden\r\n                        rounded-2xl\r\n                        border\r\n                        border-hairline\r\n                        bg-card\r\n                        shadow-[0_16px_40px_-24px_rgba(0,0,0,0.3)]\r\n                      ",
									style: {
										transform: `
                          translateX(
                            ${isActive ? dragX : 0}px
                          )
                          translateY(${offset}px)
                          scale(${scale})
                          rotate(${rotation}deg)
                        `,
										zIndex: mobileCards.length - relative,
										opacity,
										transition: isDragging && isActive ? "none" : "transform 400ms cubic-bezier(0.22,1,0.36,1), opacity 400ms ease",
										touchAction: isActive ? "pan-y" : "auto"
									},
									onPointerDown: isActive ? handlePointerDown : void 0,
									onPointerMove: isActive ? handlePointerMove : void 0,
									onPointerUp: isActive ? handlePointerUp : void 0,
									onPointerCancel: isActive ? handlePointerCancel : void 0,
									onClick: isActive ? handleCardClick : void 0,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/journal/$journalId",
										params: { journalId: card.id },
										className: "\r\n                          flex\r\n                          h-full\r\n                          flex-col\r\n                        ",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "\r\n                            h-[180px]\r\n                            w-full\r\n                            shrink-0\r\n                            overflow-hidden\r\n                          ",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: getPrimaryImage(card),
												alt: card.title,
												loading: "lazy",
												draggable: false,
												className: "\r\n                              size-full\r\n                              object-cover\r\n                            "
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "\r\n                            flex\r\n                            flex-1\r\n                            flex-col\r\n                            px-5\r\n                            pb-6\r\n                            pt-5\r\n                          ",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "label",
													children: card.category
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "\r\n                              display\r\n                              mt-3\r\n                              line-clamp-2\r\n                              text-xl\r\n                            ",
													children: card.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "\r\n                              mt-auto\r\n                              flex\r\n                              items-center\r\n                              gap-2\r\n                              pt-6\r\n                              text-[10px]\r\n                              text-muted-foreground\r\n                            ",
													children: [card.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: card.location }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
														card.readTime,
														" ",
														"min read"
													] })]
												})
											]
										})]
									})
								}, card.id);
							}).reverse()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 flex items-center justify-center gap-1.5",
							children: mobileCards.map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `Go to ${index + 1}`,
								onClick: () => {
									setDragX(0);
									setMobileIndex(index);
								},
								className: `
                      h-1
                      rounded-full
                      transition-all
                      duration-300
                      ${index === mobileIndex ? "w-5 bg-foreground/60" : "w-1 bg-foreground/20"}
                    `
							}, card.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "\r\n                mt-4\r\n                text-center\r\n                text-[10px]\r\n                text-muted-foreground\r\n              ",
							children: "Swipe to explore"
						})
					] }),
					mobileView === "grid" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "\r\n              grid\r\n              grid-cols-2\r\n              gap-3\r\n            ",
						children: mobileCards.map((card) => {
							if (card.id === "__journal-more__") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/journal",
								className: "\r\n                        flex\r\n                        aspect-[0.82]\r\n                        items-center\r\n                        justify-center\r\n                        rounded-2xl\r\n                        border\r\n                        border-border\r\n                        bg-card\r\n                        p-5\r\n                        text-center\r\n                      ",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "\r\n                          group\r\n                          inline-flex\r\n                          items-center\r\n                          gap-1.5\r\n                          text-sm\r\n                          font-medium\r\n                        ",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "link-underline",
										children: "Enter the journals"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "\r\n                            size-4\r\n                            text-muted-foreground\r\n                          " })]
								})
							}, card.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/journal/$journalId",
								params: { journalId: card.id },
								className: "\r\n                      group\r\n                      overflow-hidden\r\n                      rounded-2xl\r\n                      border\r\n                      border-hairline\r\n                      bg-card\r\n                    ",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "\r\n                        aspect-[4/3]\r\n                        overflow-hidden\r\n                      ",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: getPrimaryImage(card),
										alt: card.title,
										loading: "lazy",
										className: "\r\n                          size-full\r\n                          object-cover\r\n                          transition-transform\r\n                          duration-700\r\n                          group-hover:scale-[1.03]\r\n                        "
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "\r\n                        flex\r\n                        min-h-[130px]\r\n                        flex-col\r\n                        p-4\r\n                      ",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "label",
											children: card.category
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "\r\n                          display\r\n                          mt-2\r\n                          line-clamp-2\r\n                          text-base\r\n                        ",
											children: card.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "\r\n                          mt-auto\r\n                          pt-4\r\n                          text-[10px]\r\n                          text-muted-foreground\r\n                        ",
											children: [
												card.readTime,
												" ",
												"min read"
											]
										})
									]
								})]
							}, card.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "\r\n            mt-6\r\n            flex\r\n            justify-end\r\n          ",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": mobileView === "stack" ? "Switch to grid view" : "Switch to stacked view",
							onClick: () => setMobileView((current) => current === "stack" ? "grid" : "stack"),
							className: "\r\n              flex\r\n              size-9\r\n              items-center\r\n              justify-center\r\n              rounded-full\r\n              border\r\n              border-border\r\n              text-muted-foreground\r\n              transition-colors\r\n              hover:text-foreground\r\n            ",
							children: mobileView === "stack" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid2x2, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4" })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "\r\n          mt-12\r\n          hidden\r\n          gap-10\r\n          md:grid\r\n          md:grid-cols-3\r\n        ",
				children: selected.map((post, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: index,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/journal/$journalId",
						params: { journalId: post.id },
						className: "\r\n                  group\r\n                  flex\r\n                  h-full\r\n                  flex-col\r\n                  overflow-hidden\r\n                  rounded-2xl\r\n                  border\r\n                  border-hairline\r\n                  bg-card/60\r\n                  transition-colors\r\n                  duration-500\r\n                  hover:border-clay/40\r\n                  hover:bg-card\r\n                ",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "\r\n                    aspect-[16/9]\r\n                    w-full\r\n                    overflow-hidden\r\n                    rounded-t-2xl\r\n                  ",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: getPrimaryImage(post),
								alt: post.title,
								loading: "lazy",
								className: "\r\n                      size-full\r\n                      object-cover\r\n                      transition-transform\r\n                      duration-[1200ms]\r\n                      ease-out\r\n                      group-hover:scale-[1.03]\r\n                    "
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "\r\n                    flex\r\n                    h-full\r\n                    flex-col\r\n                    p-6\r\n                    md:p-7\r\n                  ",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label",
									children: post.category
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "\r\n                      display\r\n                      mt-4\r\n                      text-xl\r\n                      transition-colors\r\n                      group-hover:text-clay\r\n                      md:text-2xl\r\n                    ",
									children: post.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "\r\n                      mt-3\r\n                      text-xs\r\n                      leading-relaxed\r\n                      text-muted-foreground\r\n                    ",
									children: getExcerpt(post.body)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "\r\n                      mt-auto\r\n                      flex\r\n                      flex-wrap\r\n                      gap-x-2\r\n                      gap-y-1\r\n                      pt-6\r\n                      text-[11px]\r\n                      text-muted-foreground\r\n                    ",
									children: [
										post.location && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.location }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											post.readTime,
											" ",
											"min read"
										] })
									]
								})
							]
						})]
					})
				}, post.id))
			})
		]
	});
}
function SelectedWorks({ artworks }) {
	const selected = artworks.filter((art) => art.featured);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-[1400px] px-5 py-10 md:px-10 md:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "flex items-baseline justify-between gap-6 pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display text-4xl md:text-6xl",
					children: "Featured works"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/gallery",
					className: "\r\n            group\r\n            inline-flex\r\n            shrink-0\r\n            items-center\r\n            gap-1.5\r\n            text-xs\r\n            font-medium\r\n          ",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "link-underline",
						children: "View all works"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "\r\n              size-4\r\n              text-muted-foreground\r\n              transition-transform\r\n              duration-300\r\n              group-hover:translate-x-1\r\n            " })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "\r\n          mt-8\r\n          grid\r\n          grid-cols-1\r\n          gap-y-14\r\n          sm:grid-cols-2\r\n          sm:gap-x-6\r\n          sm:gap-y-16\r\n          md:mt-10\r\n          md:grid-cols-3\r\n          md:gap-x-8\r\n          md:gap-y-16\r\n          lg:grid-cols-4\r\n        ",
				children: selected.map((art, index) => {
					const imageSrc = (art.media.find((media) => media.role === "primary") ?? art.media[0])?.mediumUrl || art.image;
					const hiddenOnMobile = index >= 4;
					const isMobileShowMore = index === 3;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: index,
						className: `
                min-w-0
                ${hiddenOnMobile ? "hidden sm:block" : ""}
              `,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: isMobileShowMore ? "/gallery" : "/gallery/$artworkId",
							params: isMobileShowMore ? void 0 : { artworkId: art.id },
							className: "group block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative overflow-hidden bg-secondary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: imageSrc,
									alt: art.title,
									loading: "lazy",
									className: "\r\n                      block\r\n                      h-auto\r\n                      w-full\r\n                      object-cover\r\n                      transition-transform\r\n                      duration-[1200ms]\r\n                      ease-out\r\n                      group-hover:scale-[1.025]\r\n                    "
								}), isMobileShowMore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "\r\n                        absolute\r\n                        inset-x-0\r\n                        bottom-0\r\n                        flex\r\n                        h-[45%]\r\n                        items-end\r\n                        justify-center\r\n                        bg-gradient-to-t\r\n                        from-background\r\n                        via-background/100\r\n                        to-transparent\r\n                        pb-8\r\n                        sm:hidden\r\n                      ",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "\r\n                          inline-flex\r\n                          items-center\r\n                          gap-1.5\r\n                          text-xl\r\n                          font-medium\r\n                          text-foreground\r\n                          animate-[show-more-motion_1s_ease-in-out_infinite]\r\n                        ",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "link-underline",
											children: "Show more"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "\r\n                            size-6\r\n                            transition-transform\r\n                            duration-300\r\n                            group-hover:translate-x-1\r\n                          " })]
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `
                    mt-4
                    ${isMobileShowMore ? "hidden sm:block" : ""}
                  `,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "display min-w-0 text-lg md:text-xl",
										children: art.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "label shrink-0",
										children: art.availability === "Sold" ? "Sold" : art.year
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground",
									children: art.description
								})]
							})]
						})
					}, art.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				className: "\r\n          mt-16\r\n          hidden\r\n          justify-center\r\n          md:flex\r\n          md:mt-20\r\n        ",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/gallery",
					className: "\r\n            group\r\n            inline-flex\r\n            items-center\r\n            gap-2\r\n            text-sm\r\n            font-medium\r\n          ",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "link-underline",
						children: "Show more artworks"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "\r\n              size-4\r\n              text-muted-foreground\r\n              transition-transform\r\n              duration-300\r\n              group-hover:translate-x-1\r\n            " })]
				})
			})
		]
	});
}
var steps = [
	[
		"01",
		"Buy something already made",
		"Pick a finished painting from the gallery. Signed, packed, and shipped to you."
	],
	[
		"02",
		"Ask for a new painting",
		"Have an idea? Share it with me, and I’ll turn it into a painting for you."
	],
	[
		"03",
		"From idea to your home",
		"We discuss the idea, I paint it, and then it’s carefully packed and shipped to you."
	]
];
function WhatHappensHere() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-[1400px] px-5 py-1 md:px-10 md:py-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "self-start pb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label text-muted-foreground",
						children: "What happens here"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "display mt-4 max-w-[580px] text-5xl leading-[0.9] md:text-6xl lg:text-[4.4rem]",
						children: [
							"Explore the work.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Or create something new."
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full lg:pt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-border py-1",
						children: steps.map(([number, title, text], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
							delay: index,
							className: "grid grid-cols-[42px_1fr] gap-5 border-b border-border py-4 md:grid-cols-[64px_1fr] md:py-6 lg:py-7 pb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pt-1 font-mono text-xs tracking-[0.16em] text-clay",
								children: number
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "display max-w-2xl text-2xl leading-[1.05] md:text-3xl",
								children: title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 max-w-2xl text-[13px] leading-[1.5] text-muted-foreground md:text-[15px]",
								children: text
							})] })]
						}, number))
					})
				})]
			})
		})
	});
}
var artist_pose_1_default = "/assets/artist-pose-1-DJVQHJB7.png";
function ArtistTeaser() {
	const [showArtistTag, setShowArtistTag] = (0, import_react.useState)(false);
	const tagTimerRef = (0, import_react.useRef)(null);
	const handleArtistTap = () => {
		setShowArtistTag(true);
		if (tagTimerRef.current) clearTimeout(tagTimerRef.current);
		tagTimerRef.current = setTimeout(() => {
			setShowArtistTag(false);
			tagTimerRef.current = null;
		}, 2200);
	};
	(0, import_react.useEffect)(() => {
		return () => {
			if (tagTimerRef.current) clearTimeout(tagTimerRef.current);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "label",
				children: "The artist"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-[100px_minmax(0,1fr)] items-center gap-5 md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative flex size-[100px] items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-label": "Show artist name",
						onClick: handleArtistTap,
						className: "\r\n                group\r\n                relative\r\n                size-[100px]\r\n                overflow-visible\r\n                rounded-full\r\n                focus:outline-none\r\n              ",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "\r\n                  absolute\r\n                  inset-0\r\n                  rounded-full\r\n                  bg-[#eee6da]\r\n                " }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: artist_pose_1_default,
								alt: "Kamlesh Sahoo",
								loading: "lazy",
								width: 900,
								height: 1125,
								className: "\r\n                  relative\r\n                  z-10\r\n                  h-full\r\n                  w-full\r\n                  rounded-full\r\n                  object-cover\r\n                  object-[50%_20%]\r\n                "
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `
                  pointer-events-none
                  absolute
                  left-[75%]
                  top-[-10%]
                  z-20
                  whitespace-nowrap
                  bg-background/70
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  tracking-tight
                  text-foreground/85
                  backdrop-blur-md
                  transition-all
                  duration-300

                  ${showArtistTag ? "animate-[artist-wiggle_0.5s_ease-out] opacity-100" : "translate-x-2 translate-y-1 opacity-0"}
                `,
								children: ["Kamlesh Sahoo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "\r\n                    absolute\r\n                    -left-1\r\n                    top-1/2\r\n                    size-2\r\n                    -translate-x-1/2\r\n                    -translate-y-1/2\r\n                    rotate-45\r\n                    border-b\r\n                    border-l\r\n                    border-foreground/10\r\n                    bg-background/70\r\n                    backdrop-blur-md\r\n                  " })]
							})
						]
					})
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[21px] leading-[1.08]",
					children: "“I paint the things I find interesting. Sometimes that means a person, sometimes a place, sometimes just an idea I can't quite let go of.”"
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "mt-8 md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-lg text-xs leading-[1.7] text-muted-foreground",
					children: "I'm Kamlesh, the artist behind PaintTheory. I work mostly by instinct, curiosity, and probably more overthinking than necessary. My work moves between familiar subjects, unusual ideas, and whatever catches my attention along the way."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/about",
					className: "group mt-6 inline-flex items-center gap-1.5 text-xs font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "link-underline",
						children: "More about the practice"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "\r\n              size-4\r\n              text-muted-foreground\r\n              transition-transform\r\n              duration-300\r\n              group-hover:translate-x-1\r\n            " })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 hidden items-end gap-6 md:mt-8 md:grid md:grid-cols-[0.65fr_1.35fr] md:gap-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group relative flex items-end justify-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "\r\n                absolute\r\n                bottom-0\r\n                left-[45%]\r\n                h-[48%]\r\n                w-[120px]\r\n                -translate-x-1/2\r\n                bg-[#eee6da]\r\n                transition-all\r\n                duration-700\r\n                ease-out\r\n                group-hover:h-[42%]\r\n\r\n                md:left-[42%]\r\n                md:h-[52%]\r\n                md:w-[280px]\r\n                md:group-hover:h-[44%]\r\n              ",
						style: { clipPath: "polygon(0 0, 82% 0, 100% 100%, 0 100%)" }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: artist_pose_1_default,
							alt: "Kamlesh Sahoo",
							loading: "lazy",
							width: 900,
							height: 1125,
							className: "\r\n                  block\r\n                  w-[90px]\r\n                  sm:w-[105px]\r\n                  md:w-[200px]\r\n                  lg:w-[220px]\r\n                "
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute left-[72%] top-[34%]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "\r\n                    translate-x-3\r\n                    translate-y-2\r\n                    opacity-0\r\n                    transition-all\r\n                    duration-500\r\n                    ease-[cubic-bezier(0.22,1,0.36,1)]\r\n                    group-hover:translate-x-0\r\n                    group-hover:translate-y-0\r\n                    group-hover:opacity-100\r\n                  ",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "\r\n                      whitespace-nowrap\r\n                      bg-background/60\r\n                      px-4\r\n                      py-2\r\n                      text-sm\r\n                      font-medium\r\n                      tracking-tight\r\n                      text-foreground/85\r\n                      backdrop-blur-md\r\n                    ",
									children: "Kamlesh Sahoo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "\r\n                      absolute\r\n                      -left-1\r\n                      top-1/2\r\n                      size-2\r\n                      -translate-x-1/2\r\n                      -translate-y-1/2\r\n                      rotate-45\r\n                      border-b\r\n                      border-l\r\n                      border-foreground/10\r\n                      bg-background/60\r\n                      backdrop-blur-md\r\n                    " })]
							})
						})]
					})]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "pb-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-[980px] text-xl leading-[1.08] md:mt-0 md:text-4xl",
							children: "“I paint the things I find interesting. Sometimes that means a person, sometimes a place, sometimes just an idea I can't quite let go of.”"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl text-xs leading-relaxed text-muted-foreground md:mt-6 md:text-sm",
							children: "I'm Kamlesh, the artist behind PaintTheory. I work mostly by instinct, curiosity, and probably more overthinking than necessary. My work moves between familiar subjects, unusual ideas, and whatever catches my attention along the way."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/about",
							className: "group mt-6 inline-flex items-center gap-1.5 text-xs font-medium md:mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "link-underline",
								children: "More about the practice"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "\r\n                size-4\r\n                text-muted-foreground\r\n                transition-transform\r\n                duration-300\r\n                group-hover:translate-x-1\r\n              " })]
						})
					]
				})]
			})
		]
	});
}
function CommissionCTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-[1400px] px-5 pb-10 md:px-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "hairline pt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label pb-6",
					children: "A painting starts with an idea"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "display text-5xl md:text-6xl",
					children: [
						"Scrolled this far?",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Have a look around."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 grid border-y border-hairline md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "group border-b border-hairline py-7 px-0 transition-colors hover:bg-secondary/40 md:border-b-0 md:border-r md:pr-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "display text-2xl",
									children: "Say 'Hi'"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground",
								children: "Have a question, a thought, or just want to say hello."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/commission",
							className: "group border-b border-hairline py-7 px-0 transition-colors hover:bg-secondary/40 md:border-b-0 md:border-r md:px-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "display text-2xl",
									children: "Request a Painting"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground",
								children: "Have an idea you'd like to see become a painting."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/gallery",
							className: "group py-7 pl-0 transition-colors hover:bg-secondary/40 md:pl-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "display text-2xl",
									children: "Roam the Gallery"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground",
								children: "Take a look around. You might find something that resonates with you."
							})]
						})
					]
				})
			]
		})
	});
}
function HomePage() {
	const { artworks, selected } = useHomeArtworks();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeHero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnTheWall, { artworks }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectedWorks, { artworks: selected }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatHappensHere, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistTeaser, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalPreview, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommissionCTA, {})
	] });
}
//#endregion
export { HomePage as component };
