import { a as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { N as ArrowRight } from "../_libs/lucide-react.mjs";
import { i as getAllJournal } from "./journal.service-dNpgGlAg.mjs";
import { t as Reveal } from "./Reveal-DhgqaqLa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal.index-Cf2LL8G8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getPrimaryImage(entry) {
	return (entry.media.find((media) => media.role === "primary") ?? entry.media[0])?.mediumUrl ?? "/placeholder.jpg";
}
function getExcerpt(body) {
	const clean = body.replace(/\s+/g, " ").trim();
	if (clean.length <= 160) return clean;
	return `${clean.slice(0, 160).trim()}…`;
}
function JournalPage() {
	const [posts, setPosts] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getAllJournal().then(setPosts).catch(console.error);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pt-30",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label",
					children: "From the studio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display mt-5 text-[13vw] leading-[.85] md:text-[8vw]",
					children: "Journal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 pt-3 text-sm leading-relaxed text-muted-foreground",
					children: "Stories from my some of the fun, challenging, and occasionally absurd days."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16 grid gap-10 md:grid-cols-3",
				children: posts.map((post, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "display mt-4 text-xl transition-colors group-hover:text-clay md:text-2xl",
									children: post.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted-foreground",
									children: getExcerpt(post.body)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto flex flex-wrap gap-x-2 gap-y-1 pt-6 text-[11px] text-muted-foreground",
									children: [
										post.location && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.location }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [post.readTime, " min read"] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "label mt-5 inline-flex items-center gap-1.5",
									children: ["Read journal", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							]
						})]
					})
				}, post.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid md:grid-cols-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/contact",
					className: "group border-b border-hairline py-7 pr-6 transition-colors hover:bg-secondary/40 md:border-b-0 md:border-r md:pr-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 max-w-xs text-xs leading-relaxed text-muted-foreground",
						children: "Good, bad, strange, or completely unrelated, I'm listening."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "display text-2xl",
							children: "Your Thoughts?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" })]
					})]
				})
			})
		]
	});
}
//#endregion
export { JournalPage as component };
