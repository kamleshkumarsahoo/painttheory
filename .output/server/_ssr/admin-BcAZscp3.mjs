import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-BYgwpyL6.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Button } from "./button-0h_v-pWj.mjs";
import { A as ChevronDown, N as ArrowRight, b as LogOut, w as Inbox, y as Mail } from "../_libs/lucide-react.mjs";
import { c as getEffectiveInquiryStatus, i as formatDateOnly, s as getAllInquiries } from "./inquiry.service-BAeOUobU.mjs";
import { n as inquiryPrice$1, t as StatusBadge } from "./inquiry-BbSKS8Gk.mjs";
import { t as formatPrice } from "./artwork-BcBh99Ev.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BcAZscp3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function fmt(iso) {
	return formatDateOnly(iso);
}
function inquiryPrice(inquiry) {
	return inquiry.artwork_price_snapshot ?? inquiry.artworks?.price ?? 0;
}
function getArtworkImage(artwork) {
	if (!artwork) return null;
	const media = artwork.artwork_media ?? [];
	const primary = media.find((item) => item.role === "primary") ?? [...media].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))[0];
	if (primary) {
		const path = primary.medium_path ?? primary.thumb_path ?? primary.large_path ?? primary.original_path;
		if (path) return supabase.storage.from("artworks").getPublicUrl(path).data.publicUrl;
	}
	return artwork.thumbnail_url ?? null;
}
function InquiryCard({ inquiry }) {
	const isCommission = !inquiry.artwork_id;
	const artwork = inquiry.artworks;
	const artworkImage = getArtworkImage(artwork);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-4 p-4",
			children: [isCommission ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-20 shrink-0 items-center justify-center rounded-xl bg-secondary text-[0.65rem] uppercase tracking-widest text-muted-foreground",
				children: "Commission"
			}) : artworkImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: artworkImage,
				alt: artwork.title ?? "Artwork",
				loading: "lazy",
				className: "size-20 shrink-0 rounded-xl object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-20 shrink-0 rounded-xl bg-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: getEffectiveInquiryStatus(inquiry) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-xs text-muted-foreground",
							children: fmt(inquiry.created_at)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 truncate font-display text-lg leading-tight text-foreground",
						children: isCommission ? "Commission request" : artwork?.title ?? "Artwork inquiry"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm text-foreground/80",
						children: inquiry.customer_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs font-medium text-accent",
						children: inquiry.order_number ?? `Ref ${inquiry.id.slice(0, 8)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1 truncate text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3" }), inquiry.customer_email]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-auto flex items-center justify-between border-t border-border px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground",
				children: isCommission ? "Request" : "Quote"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-base text-foreground",
				children: isCommission ? "To be discussed" : formatPrice(inquiryPrice(inquiry))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "sm",
				variant: inquiry.inquiry_status === "NEW" ? "default" : "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/inquiries/$inquiryId",
					params: { inquiryId: inquiry.id },
					children: ["Review", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
				})
			})]
		})]
	});
}
function getDashboardInquiries(inquiries) {
	const sorted = [...inquiries].sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
	const newRequests = sorted.filter((i) => getEffectiveInquiryStatus(i) === "NEW");
	const inProgress = sorted.filter((i) => {
		const status = getEffectiveInquiryStatus(i);
		return status !== "NEW" && status !== "DELIVERED" && status !== "DISCARDED";
	});
	return {
		newRequests,
		inProgress,
		completed: sorted.filter((i) => getEffectiveInquiryStatus(i) === "DELIVERED"),
		discarded: sorted.filter((i) => getEffectiveInquiryStatus(i) === "DISCARDED"),
		pipelineValue: [...newRequests, ...inProgress].reduce((sum, i) => sum + inquiryPrice$1(i), 0)
	};
}
function AdminPage() {
	const [inquiries, setInquiries] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getAllInquiries().then(setInquiries).catch(console.error);
	}, []);
	const { newRequests, inProgress, completed, discarded, pipelineValue } = getDashboardInquiries(inquiries);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border pb-5 sm:border-0 sm:pb-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Studio dashboard"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-1 font-display text-3xl leading-tight text-foreground sm:text-4xl",
								children: "Inquiries"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							className: "hidden shrink-0 sm:inline-flex",
							onClick: () => supabase.auth.signOut(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), "Sign out"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => supabase.auth.signOut(),
							className: "mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:hidden",
							"aria-label": "Sign out",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-4 sm:gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "New",
						value: String(newRequests.length),
						accent: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "In progress",
						value: String(inProgress.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Completed",
						value: String(completed.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Open pipeline",
						value: formatPrice(pipelineValue)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "New requests",
				hint: "Awaiting your review",
				count: newRequests.length,
				items: newRequests,
				emptyLabel: "No new inquiries right now."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "In progress",
				hint: "Communicated, paid or shipping",
				count: inProgress.length,
				items: inProgress,
				emptyLabel: "Nothing in progress."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Completed",
				hint: "Delivered, feedback or closed",
				count: completed.length,
				items: completed,
				emptyLabel: "No completed orders yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Discarded requests",
				hint: "Hidden from active workflow",
				count: discarded.length,
				items: discarded,
				emptyLabel: "No discarded requests.",
				collapsed: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 sm:hidden" })
		]
	});
}
function Stat({ label, value, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "\n        rounded-xl\n        border\n        border-border\n        bg-card\n        px-3.5\n        py-3\n        sm:rounded-2xl\n        sm:p-4\n        sm:shadow-soft\n      ",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[0.58rem] uppercase tracking-[0.16em] text-muted-foreground sm:text-[0.65rem] sm:tracking-widest",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-1 font-display text-xl leading-none sm:text-2xl ${accent ? "text-accent" : "text-foreground"}`,
			children: value
		})]
	});
}
function Section({ title, hint, count, items, emptyLabel, collapsed }) {
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "\n            mt-4\n            flex\n            items-center\n            gap-3\n            rounded-xl\n            border\n            border-dashed\n            border-border\n            bg-card/50\n            px-4\n            py-6\n            text-sm\n            text-muted-foreground\n            sm:mt-5\n            sm:rounded-2xl\n            sm:px-5\n            sm:py-8\n          ",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: emptyLabel })]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "\n            mt-4\n            grid\n            gap-3\n            sm:mt-5\n            sm:grid-cols-2\n            sm:gap-4\n            lg:grid-cols-3\n          ",
		children: items.map((inq) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InquiryCard, { inquiry: inq }, inq.id))
	}) });
	if (collapsed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "group mt-8 sm:mt-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
			className: "\n            flex\n            cursor-pointer\n            list-none\n            items-center\n            gap-2.5\n            rounded-xl\n            border\n            border-border\n            bg-card\n            px-4\n            py-3.5\n            transition-colors\n            hover:bg-secondary/40\n            sm:gap-3\n            sm:rounded-2xl\n            sm:px-5\n            sm:py-4\n            sm:shadow-soft\n          ",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "min-w-0 font-display text-lg text-foreground sm:text-2xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground sm:px-2.5 sm:text-xs",
					children: count
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-auto hidden text-sm text-muted-foreground md:inline",
					children: hint
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden text-[0.6rem] uppercase tracking-widest text-muted-foreground group-open:hidden sm:inline",
					children: "Show"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden text-[0.6rem] uppercase tracking-widest text-muted-foreground group-open:inline sm:inline",
					children: "Hide"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 sm:hidden" })
			]
		}), content]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8 sm:mt-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline gap-2.5 sm:gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-foreground sm:text-2xl",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground sm:px-2.5 sm:text-xs",
						children: count
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-auto hidden text-sm text-muted-foreground sm:inline",
						children: hint
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground sm:hidden",
				children: hint
			}),
			content
		]
	});
}
//#endregion
export { AdminPage as component };
