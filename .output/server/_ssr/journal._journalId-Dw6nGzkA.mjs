import { a as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { P as ArrowLeft, g as Moon, o as Sun } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as Route } from "./journal._journalId-eMjJHTaT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal._journalId-Dw6nGzkA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatDate(date) {
	return new Intl.DateTimeFormat("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric"
	}).format(new Date(date));
}
function getPrimaryMedia(journal) {
	return journal.media.find((item) => item.role === "primary") ?? journal.media[0];
}
function JournalArticlePage() {
	const { journal } = Route.useLoaderData();
	const [darkMode, setDarkMode] = (0, import_react.useState)(false);
	const primary = getPrimaryMedia(journal);
	const secondary = (0, import_react.useMemo)(() => journal.media.filter((item) => item.role === "secondary").sort((a, b) => a.sortOrder - b.sortOrder), [journal]);
	const paragraphs = journal.body.split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: ["min-h-screen transition-colors duration-500", darkMode ? "bg-[#171613] text-[#eee8dc]" : "bg-background text-foreground"].join(" "),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "mx-auto w-full max-w-[820px] px-6 pb-20 pt-20 md:px-10 md:pt-28",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/journal",
						className: ["inline-flex items-center gap-2 text-xs transition-colors", darkMode ? "text-[#bdb5a6] hover:text-[#eee8dc]" : "text-muted-foreground hover:text-foreground"].join(" "),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), "Back to journal"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setDarkMode((current) => !current),
						className: ["inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] transition-colors", darkMode ? "border-white/15 text-[#eee8dc] hover:bg-white/5" : "border-border text-muted-foreground hover:bg-secondary"].join(" "),
						children: [darkMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-3" }), darkMode ? "Light" : "Dark"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mt-12 w-full text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: ["label", darkMode ? "text-[#b99d7a]" : "text-clay"].join(" "),
							children: journal.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "display mt-3 text-4xl leading-[0.98] md:text-6xl",
							children: journal.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: ["mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap text-[11px]", darkMode ? "text-[#aaa293]" : "text-muted-foreground"].join(" "),
							children: [
								journal.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: journal.location }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(journal.publishedAt) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [journal.readTime, " min read"] })
							]
						})
					]
				}),
				primary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.figure, {
					initial: {
						opacity: 0,
						y: 14
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .7,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "mt-10 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: primary.largeUrl,
						alt: primary.altText || journal.title,
						className: "block aspect-[16/9] w-full object-cover"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: ["mt-10 w-full", darkMode ? "text-[#ddd6ca]" : "text-foreground/85"].join(" "),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: paragraphs.map((paragraph, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13px] leading-[1.75] md:text-[14px]",
							children: paragraph
						}, index))
					})
				}),
				secondary.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mt-10 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-5 sm:grid-cols-2",
						children: secondary.map((media) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.figure, {
							initial: {
								opacity: 0,
								y: 14
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
								duration: .6,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: media.largeUrl,
								alt: media.altText || journal.title,
								loading: "lazy",
								className: "block aspect-[4/3] w-full object-cover"
							})
						}, media.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: ["mt-10 w-full border-t pt-5 text-[11px]", darkMode ? "border-white/10 text-[#aaa293]" : "border-border text-muted-foreground"].join(" "),
					children: [
						journal.category,
						" ·",
						" ",
						journal.readTime,
						" min read"
					]
				})
			]
		})
	});
}
//#endregion
export { JournalArticlePage as component };
