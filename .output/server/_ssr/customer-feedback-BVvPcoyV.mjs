import { a as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/@icons-pack/react-simple-icons+[...].mjs";
import { t as Button } from "./button-BQQ3Gu5O.mjs";
import { F as Check, a as Trash2, j as Clock, s as Star, t as X } from "../_libs/lucide-react.mjs";
import { n as getCustomerFeedback, t as deleteCustomerFeedback } from "./customer-feedback.service-C2NmmL7I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer-feedback-BVvPcoyV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomerFeedbackPage() {
	const [feedback, setFeedback] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [deleting, setDeleting] = (0, import_react.useState)(null);
	async function loadFeedback() {
		try {
			setLoading(true);
			const data = await getCustomerFeedback();
			setFeedback(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		loadFeedback();
	}, []);
	async function handleDelete(id) {
		if (!window.confirm("Delete this customer feedback? This cannot be undone.")) return;
		try {
			setDeleting(id);
			await deleteCustomerFeedback(id);
			setFeedback((current) => current.filter((item) => item.id !== id));
		} catch (error) {
			console.error(error);
		} finally {
			setDeleting(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-border pb-5 sm:pb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Studio dashboard"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-baseline gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl leading-tight text-foreground sm:text-4xl",
						children: "Customer feedback"
					}), !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground",
						children: feedback.length
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground",
					children: "Private feedback submitted by collectors. Nothing here is published automatically."
				})
			]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "py-16 text-center text-sm text-muted-foreground",
			children: "Loading feedback..."
		}) : feedback.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "\r\n            mt-6\r\n            rounded-2xl\r\n            border\r\n            border-dashed\r\n            border-border\r\n            bg-card/50\r\n            px-5\r\n            py-12\r\n            text-center\r\n            text-sm\r\n            text-muted-foreground\r\n          ",
			children: "No customer feedback yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 space-y-3 sm:mt-8 sm:space-y-4",
			children: feedback.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackCard, {
				feedback: item,
				deleting: deleting === item.id,
				onDelete: () => handleDelete(item.id)
			}, item.id))
		})]
	});
}
function FeedbackCard({ feedback, deleting, onDelete }) {
	const date = new Date(feedback.created_at).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "\r\n        rounded-2xl\r\n        border\r\n        border-border\r\n        bg-card\r\n        p-4\r\n        shadow-soft\r\n        sm:p-5\r\n      ",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg text-foreground sm:text-xl",
						children: feedback.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex items-center gap-0.5",
						"aria-label": `${feedback.rating} out of 5 stars`,
						children: [
							1,
							2,
							3,
							4,
							5
						].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `
                  size-3.5
                  ${star <= feedback.rating ? "fill-current text-foreground" : "text-muted-foreground/20"}
                ` }, star))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), date]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-border",
								children: "·"
							}),
							feedback.allow_publish ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 text-foreground/70",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), "Permission to feature"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" }), "Private"]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon",
				disabled: deleting,
				onClick: onDelete,
				className: "\r\n            shrink-0\r\n            text-muted-foreground\r\n            hover:text-destructive\r\n          ",
				"aria-label": "Delete feedback",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
			className: "\r\n          mt-5\r\n          max-w-3xl\r\n          text-sm\r\n          leading-relaxed\r\n          text-foreground/85\r\n          sm:text-base\r\n        ",
			children: [
				"“",
				feedback.message,
				"”"
			]
		})]
	});
}
//#endregion
export { CustomerFeedbackPage as component };
