import { a as __toESM } from "../_runtime.mjs";
import { r as performance_default } from "../_libs/framer-motion.mjs";
import { i as getAllArtworks, o as getFeaturedArtworks } from "./artwork.service-D5UQhGTZ.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { N as ArrowRight } from "../_libs/lucide-react.mjs";
import { i as getAllJournal } from "./journal.service-dNpgGlAg.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as Reveal } from "./Reveal-DhgqaqLa.mjs";
import { t as formatPrice } from "./artwork-BcBh99Ev.mjs";
import { r as getFeedback } from "./feedback.service-D-EWxhuj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Pk4j_f2B.js
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
		selected: (featured.length ? featured : artworks).slice(0, 4)
	};
}
/** Watercolour palette — each completed painting moves to the next hue. */
var PALETTE = [
	{
		h: 24,
		s: 42,
		l: 46
	},
	{
		h: 12,
		s: 78,
		l: 52
	},
	{
		h: 205,
		s: 72,
		l: 48
	},
	{
		h: 142,
		s: 55,
		l: 40
	},
	{
		h: 42,
		s: 90,
		l: 52
	},
	{
		h: 292,
		s: 55,
		l: 50
	},
	{
		h: 340,
		s: 70,
		l: 55
	}
];
function PaintWordmark({ text = "Painttheory", className }) {
	const wrapRef = (0, import_react.useRef)(null);
	const baseRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const maskRef = (0, import_react.useRef)(null);
	const paintRef = (0, import_react.useRef)(null);
	const stampsRef = (0, import_react.useRef)([]);
	const textPixelsRef = (0, import_react.useRef)(1);
	const colorRef = (0, import_react.useRef)(0);
	const lastRef = (0, import_react.useRef)(null);
	const doneRef = (0, import_react.useRef)(false);
	const rafRef = (0, import_react.useRef)(0);
	const dirtyRef = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		const wrap = wrapRef.current;
		const base = baseRef.current;
		const canvas = canvasRef.current;
		if (!wrap || !base || !canvas) return;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const BLEED_MS = 2600;
		const buildMask = () => {
			const rect = wrap.getBoundingClientRect();
			const w = Math.max(1, Math.round(rect.width));
			const h = Math.max(1, Math.round(rect.height));
			if (canvas.width === w * dpr && canvas.height === h * dpr) return;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			const paint = paintRef.current ?? document.createElement("canvas");
			const mask = maskRef.current ?? document.createElement("canvas");
			paintRef.current = paint;
			maskRef.current = mask;
			paint.width = mask.width = canvas.width;
			paint.height = mask.height = canvas.height;
			const cs = getComputedStyle(base);
			const fontSize = parseFloat(cs.fontSize);
			const mctx = mask.getContext("2d");
			if (!mctx) return;
			mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			mctx.clearRect(0, 0, w, h);
			mctx.font = `${cs.fontStyle} ${cs.fontWeight} ${fontSize}px ${cs.fontFamily}`;
			if ("letterSpacing" in mctx) mctx.letterSpacing = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
			mctx.textAlign = "left";
			mctx.textBaseline = "alphabetic";
			mctx.fillStyle = "#000";
			const bRect = base.getBoundingClientRect();
			const m = mctx.measureText(text);
			const ascent = m.fontBoundingBoxAscent || fontSize * .8;
			const descent = m.fontBoundingBoxDescent || fontSize * .2;
			const lineH = bRect.height;
			const y = bRect.top - rect.top + (lineH - (ascent + descent)) / 2 + ascent;
			mctx.fillText(text, bRect.left - rect.left, y);
			const step = 4;
			let count = 0;
			const data = mctx.getImageData(0, 0, mask.width, mask.height).data;
			for (let i = 3; i < data.length; i += 4 * step) if ((data[i] ?? 0) > 40) count++;
			textPixelsRef.current = Math.max(1, count);
			stampsRef.current = [];
			doneRef.current = false;
			lastRef.current = null;
			dirtyRef.current = true;
		};
		const drawStamp = (ctx, s, now) => {
			const t = Math.min(1, (now - s.born) / BLEED_MS);
			const r = s.r * (1 + s.grow * (1 - Math.pow(1 - t, 2)));
			const c = PALETTE[s.c % PALETTE.length] ?? PALETTE[0];
			const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r);
			g.addColorStop(0, `hsl(${c.h} ${c.s}% ${c.l}% / 0.34)`);
			g.addColorStop(.6, `hsl(${c.h + 8} ${c.s - 8}% ${c.l + 5}% / 0.2)`);
			g.addColorStop(.85, `hsl(${c.h + 12} ${c.s}% ${c.l + 8}% / 0.08)`);
			g.addColorStop(1, `hsl(${c.h + 14} ${c.s}% ${c.l + 10}% / 0)`);
			ctx.fillStyle = g;
			ctx.beginPath();
			ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
			ctx.fill();
		};
		const render = (now) => {
			const ctx = canvas.getContext("2d");
			const paint = paintRef.current;
			const mask = maskRef.current;
			if (!ctx || !paint || !mask) return;
			const pctx = paint.getContext("2d");
			if (!pctx) return;
			pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			pctx.clearRect(0, 0, paint.width, paint.height);
			for (const s of stampsRef.current) drawStamp(pctx, s, now);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.globalCompositeOperation = "source-over";
			ctx.drawImage(paint, 0, 0);
			ctx.globalCompositeOperation = "destination-in";
			ctx.drawImage(mask, 0, 0);
			ctx.globalCompositeOperation = "source-over";
		};
		const loop = (now) => {
			const flowing = stampsRef.current.some((s) => now - s.born < BLEED_MS);
			if (dirtyRef.current || flowing) {
				render(now);
				dirtyRef.current = false;
				if (!doneRef.current) checkComplete();
			}
			rafRef.current = requestAnimationFrame(loop);
		};
		const paintAt = (cx, cy) => {
			const rect = wrap.getBoundingClientRect();
			const x = cx - rect.left;
			const y = cy - rect.top;
			const brush = Math.max(40, Math.min(rect.height, rect.width) * .34);
			const now = performance_default.now();
			const prev = lastRef.current ?? {
				x,
				y
			};
			const dist = Math.hypot(x - prev.x, y - prev.y);
			const steps = Math.max(1, Math.ceil(dist / (brush * .3)));
			for (let i = 1; i <= steps; i++) {
				const t = i / steps;
				const px = prev.x + (x - prev.x) * t;
				const py = prev.y + (y - prev.y) * t;
				stampsRef.current.push({
					x: px,
					y: py,
					r: brush * (.85 + Math.random() * .3),
					grow: .55 + Math.random() * .4,
					born: now,
					c: colorRef.current
				});
				stampsRef.current.push({
					x: px + (Math.random() - .5) * brush * .2,
					y: py + brush * (.55 + Math.random() * .35),
					r: brush * (.5 + Math.random() * .2),
					grow: .9 + Math.random() * .5,
					born: now,
					c: colorRef.current
				});
			}
			lastRef.current = {
				x,
				y
			};
			if (stampsRef.current.length > 900) stampsRef.current.splice(0, stampsRef.current.length - 900);
			dirtyRef.current = true;
		};
		const checkComplete = () => {
			const ctx = canvas.getContext("2d");
			if (!ctx || canvas.width === 0) return;
			const step = 8;
			const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
			let painted = 0;
			for (let i = 3; i < data.length; i += 4 * step) if ((data[i] ?? 0) > 24) painted++;
			if (painted / (textPixelsRef.current / 2) > .8) doneRef.current = true;
		};
		const startStroke = (cx, cy) => {
			if (doneRef.current) {
				colorRef.current = (colorRef.current + 1) % PALETTE.length;
				doneRef.current = false;
			}
			lastRef.current = null;
			paintAt(cx, cy);
		};
		const onMove = (e) => {
			if (e.pointerType !== "mouse" && !(e.buttons > 0 || e.pressure > 0)) return;
			paintAt(e.clientX, e.clientY);
		};
		const onEnter = (e) => startStroke(e.clientX, e.clientY);
		const onDown = (e) => {
			if (e.pointerType === "mouse") return;
			startStroke(e.clientX, e.clientY);
		};
		const onLeave = () => {
			lastRef.current = null;
		};
		wrap.addEventListener("pointermove", onMove);
		wrap.addEventListener("pointerenter", onEnter);
		wrap.addEventListener("pointerdown", onDown);
		wrap.addEventListener("pointerup", onLeave);
		wrap.addEventListener("pointerleave", onLeave);
		wrap.addEventListener("pointercancel", onLeave);
		buildMask();
		rafRef.current = requestAnimationFrame(loop);
		let roFrame = 0;
		const ro = new ResizeObserver(() => {
			cancelAnimationFrame(roFrame);
			roFrame = requestAnimationFrame(() => buildMask());
		});
		ro.observe(wrap);
		document.fonts?.ready.then(() => {
			canvas.width = 0;
			buildMask();
		});
		const coarse = window.matchMedia("(hover: none)").matches;
		let autoTimer = 0;
		let io = null;
		if (coarse) {
			const sweep = () => {
				const rect = wrap.getBoundingClientRect();
				const rows = [.35, .62];
				let i = 0;
				const total = 48;
				const tick = () => {
					const row = rows[Math.floor(i / total) % rows.length] ?? .5;
					const p = i % total / (total - 1);
					const dir = Math.floor(i / total) % 2 === 0 ? p : 1 - p;
					paintAt(rect.left + rect.width * dir, rect.top + rect.height * row);
					i++;
					if (i < total * rows.length) autoTimer = window.setTimeout(tick, 45);
				};
				lastRef.current = null;
				tick();
			};
			io = new IntersectionObserver((entries) => {
				for (const e of entries) if (e.isIntersecting) {
					window.clearTimeout(autoTimer);
					autoTimer = window.setTimeout(sweep, 350);
				}
			}, { threshold: .5 });
			io.observe(wrap);
		}
		return () => {
			wrap.removeEventListener("pointermove", onMove);
			wrap.removeEventListener("pointerenter", onEnter);
			wrap.removeEventListener("pointerdown", onDown);
			wrap.removeEventListener("pointerup", onLeave);
			wrap.removeEventListener("pointerleave", onLeave);
			wrap.removeEventListener("pointercancel", onLeave);
			cancelAnimationFrame(rafRef.current);
			cancelAnimationFrame(roFrame);
			window.clearTimeout(autoTimer);
			io?.disconnect();
			ro.disconnect();
		};
	}, [text]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref: wrapRef,
		className: cn("paint-mark", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			ref: baseRef,
			className: "paint-mark-base",
			children: text
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			"aria-hidden": true,
			className: "paint-mark-canvas"
		})]
	});
}
function HomeHero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-28 md:pt-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-[1400px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label",
					children: "Studio of Kamlesh Sahoo · est. 2026"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaintWordmark, {
						text: "Painttheory",
						className: "mt-6 text-[17vw] md:text-[11.5vw]"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: 2,
					className: "hairline mt-10 grid gap-8 pt-8 md:grid-cols-[1.2fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "max-w-l text-base leading-relaxed md:text-lg",
						children: [
							"This is where I put my paintings. Some stay here. Some find new walls.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"A growing collection of original works made by hand, lived with for a while, and shared with the world."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start gap-x-8 gap-y-3 md:justify-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/gallery",
							className: "rounded-full bg-ink px-6 py-3 text-xs font-medium text-paper transition-opacity hover:opacity-85",
							children: "See available work"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/commission",
							className: "group inline-flex items-center gap-1.5 py-3 text-xs font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "link-underline",
								children: "Commission something"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" })]
						})]
					})]
				})
			]
		})
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
		className: "relative overflow-hidden px-5 py-24 transition-colors duration-700 md:px-10 md:py-24",
		style: { backgroundColor: walls[wall].value },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "fog-field pointer-events-none absolute inset-x-[-15%] top-[-10%] h-[120%] opacity-90"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-[1400px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "flex items-baseline justify-between gap-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display text-5xl md:text-6xl",
						children: "On the wall"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 grid items-center gap-12 md:mt-20 md:grid-cols-[1.05fr_0.95fr] md:gap-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						className: "flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							className: "relative w-full max-w-[480px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"aria-hidden": true,
									className: "pointer-events-none absolute -inset-[18%] rounded-[50%] bg-[radial-gradient(closest-side,oklch(1_0_0/38%),transparent_75%)]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"aria-hidden": true,
									className: "pointer-events-none absolute -right-6 bottom-2 top-8 w-1/2 -skew-y-3 rounded-[40%] bg-ink/12 blur-2xl"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "art-frame relative",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "art-mat",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "art-glass art-inner-shadow relative aspect-[4/5] overflow-hidden bg-secondary",
											children: [works.map((piece, itemIndex) => {
												const previousIndex = (index - 1 + works.length) % works.length;
												if (itemIndex !== index && itemIndex !== previousIndex) return null;
												const pieceWallMedia = piece.wall_media_id ? piece.media.find((media) => media.id === piece.wall_media_id) : void 0;
												const piecePrimaryMedia = piece.media.find((media) => media.role === "primary") ?? piece.media[0];
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: pieceWallMedia?.largeUrl || piecePrimaryMedia?.largeUrl || piece.image,
													alt: piece.title,
													loading: "lazy",
													className: `absolute inset-0 size-full object-cover ${itemIndex === index ? "art-bloom-in z-[1]" : ""}`
												}, `${piece.id}-${itemIndex === index ? index : "previous"}`);
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"aria-hidden": true,
												className: "pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(150deg,oklch(1_0_0/22%),transparent_45%,oklch(0.19_0.012_60/16%))]"
											})]
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"aria-hidden": true,
									className: "mx-auto mt-4 h-7 w-[72%] translate-x-3 rounded-[100%] bg-ink/14 blur-2xl"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "label",
										children: "Wall"
									}), walls.map((item, itemIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": `${item.name} wall`,
										"aria-pressed": itemIndex === wall,
										onClick: () => setWall(itemIndex),
										style: { backgroundColor: item.value },
										className: `h-3 w-3 rounded-full ring-1 outline-none transition-all focus:outline-none ${itemIndex === wall ? "ring-clay ring-offset-2" : "ring-ink/20"}`
									}, item.name))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 flex items-center justify-center gap-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": "Previous artwork",
											onClick: () => go(-1),
											className: "text-muted-foreground transition-colors hover:text-clay",
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
												" /",
												" ",
												String(works.length).padStart(2, "0")
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": "Next artwork",
											onClick: () => go(1),
											className: "text-muted-foreground transition-colors hover:text-clay",
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
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label",
							children: "Now hanging"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "display mt-4 text-4xl md:text-6xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Morph, { value: work.title })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-md text-sm leading-relaxed text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Morph, { value: work.description ?? "" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-8 grid max-w-md grid-cols-2 gap-x-6 gap-y-4 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hairline pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "label",
										children: "Medium"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Morph, { value: work.medium })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hairline pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "label",
										children: "Size"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Morph, { value: work.dimensions })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hairline pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "label",
										children: "Year"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Morph, { value: String(work.year) })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hairline pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "label",
										children: "Price"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Morph, { value: price })
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/gallery/$artworkId",
							params: { artworkId: work.id },
							className: "group inline-flex items-center gap-1.5 py-3 text-xs font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "link-underline",
								children: "Enquire about this piece"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" })]
						})
					] }) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex items-center gap-3 md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label",
						children: "Wall"
					}), walls.map((item, itemIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `${item.name} wall`,
						"aria-pressed": itemIndex === wall,
						onClick: () => setWall(itemIndex),
						style: { backgroundColor: item.value },
						className: `h-3 w-3 rounded-full ring-1 transition-all ${itemIndex === wall ? "ring-clay ring-offset-2" : "ring-ink/20"}`
					}, item.name))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 flex gap-2",
					children: works.map((piece, itemIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `Show ${piece.title}`,
						onClick: () => setIndex(itemIndex),
						className: `h-px flex-1 transition-colors duration-500 ${itemIndex === index ? "bg-clay" : "bg-ink/15"}`
					}, piece.id))
				})
			]
		})]
	});
}
function Testimonials() {
	const [feedback, setFeedback] = (0, import_react.useState)([]);
	const [start, setStart] = (0, import_react.useState)(0);
	const [step, setStep] = (0, import_react.useState)(340);
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
			setStep(Math.max(180, Math.min(430, width * .38)));
		};
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, []);
	function pauseTemporarily() {
		setPaused(true);
		if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
		resumeTimerRef.current = window.setTimeout(() => {
			setPaused(false);
		}, 1200);
	}
	(0, import_react.useEffect)(() => {
		if (feedback.length <= 1) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		if (paused || dragging) return;
		const interval = window.setInterval(() => {
			setStart((current) => (current + 1) % feedback.length);
		}, 3200);
		return () => window.clearInterval(interval);
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
	function setFromPosition(clientX) {
		const track = sliderRef.current;
		if (!track || feedback.length <= 1) return;
		const rect = track.getBoundingClientRect();
		const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
		const index = Math.round(percentage * (feedback.length - 1));
		setStart(index);
	}
	function handlePointerDown(event) {
		if (feedback.length <= 1) return;
		setDragging(true);
		pauseTemporarily();
		event.currentTarget.setPointerCapture(event.pointerId);
		setFromPosition(event.clientX);
	}
	function handlePointerMove(event) {
		if (!dragging) return;
		setFromPosition(event.clientX);
	}
	function handlePointerUp(event) {
		setDragging(false);
		try {
			event.currentTarget.releasePointerCapture(event.pointerId);
		} catch {}
	}
	if (!feedback.length) return null;
	const visible = [
		-1,
		0,
		1,
		2,
		3
	].map((offset) => ({
		offset,
		feedbackIndex: (start + offset + feedback.length * 2) % feedback.length
	}));
	const sliderProgress = feedback.length <= 1 ? 0 : start / (feedback.length - 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto w-full max-w-[1400px] px-5 pb-20 md:px-10 md:pb-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "hairline flex flex-wrap items-baseline justify-between gap-4 pt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display text-5xl md:text-6xl",
				children: "In their words"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "label",
				children: "From the people who found the work"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "mt-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: wrapRef,
				className: "relative mt-4 h-[520px] w-full overflow-hidden md:h-[620px]",
				children: visible.map(({ offset, feedbackIndex }) => {
					const item = feedback[feedbackIndex];
					if (!item) return null;
					const isCenter = offset === 1;
					const x = (offset - 1) * step;
					const hidden = offset === -1 || offset === 3;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
						onPointerEnter: () => {
							setPaused(true);
						},
						onPointerLeave: () => {
							setPaused(false);
						},
						onPointerDown: () => {
							setPaused(true);
						},
						onPointerUp: () => {
							setPaused(false);
						},
						onPointerCancel: () => {
							setPaused(false);
						},
						className: "absolute left-1/2 top-1/2 w-[300px] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-20px_rgba(0,0,0,0.3)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:w-[360px] lg:w-[420px]",
						style: {
							transform: `
                      translate(-50%, -50%)
                      translateX(${x}px)
                      scale(${isCenter ? 1.08 : .86})
                    `,
							opacity: hidden ? 0 : isCenter ? 1 : .65,
							filter: hidden ? "blur(6px)" : isCenter ? "none" : "saturate(0.85)",
							zIndex: isCenter ? 20 : 10,
							pointerEvents: hidden ? "none" : "auto"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.imageUrl,
							alt: "Collector feedback",
							loading: "lazy",
							className: "block h-auto w-full object-contain"
						})
					}, `${item.id}-${offset}`);
				})
			}), feedback.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex items-center justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": paused ? "Play feedback rotation" : "Pause feedback rotation",
					onClick: () => {
						setPaused((current) => !current);
					},
					className: "flex size-4 items-center justify-center text-muted-foreground/80 transition-colors hover:text-foreground",
					children: paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 12 12",
						className: "h-4.5 w-4.5",
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
					className: "relative h-3 w-[220px] cursor-pointer touch-none select-none rounded-[2px] bg-border/50 outline-none focus-visible:ring-2 focus-visible:ring-clay/20 md:w-[380px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: ["absolute top-0 h-3 w-12 rounded-[2px] bg-muted-foreground/40", dragging ? "cursor-grabbing" : "cursor-grab"].join(" "),
						style: { left: feedback.length <= 1 ? "0px" : `calc(${sliderProgress * 100}% - ${sliderProgress * 48}px)` }
					})
				})]
			})]
		})]
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
	(0, import_react.useEffect)(() => {
		getAllJournal().then(setPosts).catch(console.error);
	}, []);
	const selected = posts.filter((post) => post.pinned).slice(0, 3);
	if (!selected.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-36",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "hairline flex flex-wrap items-baseline justify-between gap-4 pt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display text-5xl md:text-6xl",
				children: "From the journal"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/journal",
				className: "group inline-flex items-center gap-1.5 py-3 text-xs font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "link-underline",
					children: "All notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid gap-10 md:grid-cols-3",
			children: selected.map((post, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: index,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/journal/$journalId",
					params: { journalId: post.id },
					className: "group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-card/60 transition-colors duration-500 hover:border-clay/40 hover:bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[16/9] w-full overflow-hidden rounded-t-2xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: getPrimaryImage(post),
							alt: post.title,
							loading: "lazy",
							className: "size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full flex-col p-6 md:p-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label",
								children: post.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "display mt-4 text-xl transition-colors group-hover:text-clay md:text-2xl",
								children: post.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs leading-relaxed text-muted-foreground",
								children: getExcerpt(post.body)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-auto flex flex-wrap gap-x-2 gap-y-1 pt-6 text-[11px] text-muted-foreground",
								children: [
									post.location && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.location }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [post.readTime, " min read"] })
								]
							})
						]
					})]
				})
			}, post.id))
		})]
	});
}
function SelectedWorks({ artworks }) {
	const selected = artworks.filter((art) => art.featured).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "hairline flex flex-wrap items-baseline justify-between gap-4 pt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display text-5xl md:text-6xl",
				children: "Featured works"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/gallery",
				className: "group inline-flex items-center gap-1.5 py-3 text-xs font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "link-underline",
					children: "All works in the gallery"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-14 grid gap-x-10 gap-y-20 md:grid-cols-12",
			children: selected.map((art, index) => {
				const imageSrc = (art.media.find((media) => media.role === "primary") ?? art.media[0])?.mediumUrl || art.image;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: index,
					className: [
						"md:col-span-7",
						"md:col-span-4 md:col-start-9 md:mt-32",
						"md:col-span-6 md:col-start-2",
						"md:col-span-5 md:col-start-8 md:-mt-24"
					][index] ?? "md:col-span-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/gallery/$artworkId",
						params: { artworkId: art.id },
						className: "group block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `overflow-hidden bg-secondary ${art.orientation === "landscape" ? "aspect-[4/3]" : "aspect-[4/5]"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: imageSrc,
									alt: art.title,
									loading: "lazy",
									className: "size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-baseline justify-between gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "display text-xl md:text-2xl",
									children: art.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label shrink-0",
									children: art.availability === "Sold" ? "Sold" : art.year
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground",
								children: art.description
							})
						]
					})
				}, art.id);
			})
		})]
	});
}
var steps = [
	[
		"01",
		"Buy something already made",
		"Originals from the gallery, priced and ready. One of one, signed, shipped rolled or stretched, worldwide."
	],
	[
		"02",
		"Ask for something that doesn't exist",
		"Portraits, conceptual pieces, an idea you can't shake. We discuss first, then I stretch a canvas for it."
	],
	[
		"03",
		"Watch it get made",
		"Watch your idea become a finished painting. from the first marks to the final details. then hang it on your wall."
	]
];
function WhatHappensHere() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-[1400px] px-5 py-14 md:px-10 md:py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "self-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label text-muted-foreground",
							children: "What happens here"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "display mt-6 max-w-[620px] text-5xl leading-[0.9] md:text-6xl lg:text-[4.6rem]",
							children: [
								"Explore the work.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Or create something new."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/gallery",
							className: "mt-10 inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-clay",
							children: ["Browse available originals", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-border",
						children: steps.map(([number, title, text], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
							delay: index,
							className: "grid grid-cols-[42px_1fr] gap-5 border-b border-border py-8 md:grid-cols-[64px_1fr] md:py-9",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pt-1 font-mono text-xs tracking-[0.16em] text-clay",
								children: number
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "display max-w-2xl text-2xl leading-[1.05] md:text-3xl",
								children: title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-2xl text-[13px] leading-[1.7] text-muted-foreground md:text-[15px]",
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-end gap-8 md:grid-cols-[0.65fr_1.35fr] md:gap-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group relative flex items-end justify-center md:justify-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-0 left-1/2 h-[48%] w-[320px] -translate-x-1/2 bg-[#eee6da] transition-all duration-700 ease-out group-hover:h-[40%] md:left-[42%] md:h-[52%] md:w-[340px] md:group-hover:h-[44%]",
					style: { clipPath: "polygon(0 0, 82% 0, 100% 100%, 0 100%)" }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: artist_pose_1_default,
						alt: "Kamlesh Sahoo",
						loading: "lazy",
						width: 900,
						height: 1125,
						className: "block w-[245px] md:w-[285px]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute left-[72%] top-[34%]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "translate-x-3 translate-y-2 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-background/60 px-4 py-2 text-sm font-medium tracking-tight text-foreground/85 backdrop-blur-md",
								children: "Kamlesh Sahoo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-1 top-1/2 size-2 -translate-y-1/2 -translate-x-1/2 rotate-45 border-b border-l border-foreground/10 bg-background/60 backdrop-blur-md" })]
						})
					})]
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "pb-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label",
						children: "The artist"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "display mt-6 max-w-[980px] text-2xl leading-[1.08] md:text-4xl",
						children: "“I overthink the idea, the composition, the smallest details. Somewhere between all that thinking, a painting begins.”"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground",
						children: "Kamlesh is a self-taught artist who spends as much time thinking about a painting as he does making one. He is drawn to unusual ideas, unexpected compositions, and familiar subjects seen from a different angle."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/about",
						className: "group mt-8 inline-flex items-center gap-1.5 text-xs font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "link-underline",
							children: "More about the practice"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" })]
					})
				]
			})]
		})
	});
}
function CommissionCTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-[1400px] px-5 pb-10 md:px-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "hairline pt-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label",
					children: "A painting starts with an idea"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "display mt-5 max-w-4xl text-[11vw] leading-[0.85] md:text-[6vw]",
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
									children: "Commission an idea"
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
									children: "Roam the gallery"
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
