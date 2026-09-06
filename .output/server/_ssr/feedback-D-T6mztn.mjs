import { a as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/@icons-pack/react-simple-icons+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Check, O as ExternalLink, s as Star } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Reveal } from "./Reveal-DhgqaqLa.mjs";
import { r as submitCustomerFeedback } from "./customer-feedback.service-C2NmmL7I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feedback-D-T6mztn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FeedbackPage() {
	const [name, setName] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [rating, setRating] = (0, import_react.useState)(0);
	const [allowPublish, setAllowPublish] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	async function handleSubmit(event) {
		event.preventDefault();
		const trimmedName = name.trim();
		const trimmedMessage = message.trim();
		if (!trimmedName) {
			toast.error("Please add your name.");
			return;
		}
		if (!trimmedMessage) {
			toast.error("Please share your thoughts.");
			return;
		}
		if (rating === 0) {
			toast.error("Please choose a rating.");
			return;
		}
		try {
			setSubmitting(true);
			await submitCustomerFeedback({
				name: trimmedName,
				message: trimmedMessage,
				rating,
				allowPublish
			});
			setSubmitted(true);
			setName("");
			setMessage("");
			setRating(0);
			setAllowPublish(false);
		} catch (error) {
			console.error(error);
			toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto max-w-[1400px] px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40",
		children: submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "mx-auto max-w-2xl text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xl tracking-tight text-foreground",
					style: { fontFamily: "Melodrama" },
					children: "PaintTheory"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-8 flex size-10 items-center justify-center rounded-full bg-foreground/5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display mt-6 text-4xl md:text-6xl",
					children: "Thank you."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground",
					children: "Your feedback has been received. I really appreciate you taking the time to share it."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "\r\n              group\r\n              mt-8\r\n              inline-flex\r\n              items-center\r\n              gap-2\r\n              text-xs\r\n              font-medium\r\n            ",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "link-underline",
						children: "Visit PaintTheory"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "\r\n                size-3.5\r\n                text-muted-foreground\r\n                transition-transform\r\n                duration-300\r\n                group-hover:translate-x-0.5\r\n                group-hover:-translate-y-0.5\r\n              " })]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xl tracking-tight text-foreground",
					style: { fontFamily: "Melodrama" },
					children: "PaintTheory"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label mt-8 block",
					children: "A little note"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display mt-5 text-3xl md:text-5xl",
					children: "Share your thoughts"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground",
					children: "I’d love to know what you thought of the painting. A few words, a feeling, or simply what came to mind when you first saw it."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				className: "mt-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "feedback-name",
							className: "label",
							children: "Your name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "feedback-name",
							type: "text",
							value: name,
							onChange: (event) => setName(event.target.value),
							placeholder: "Your name",
							autoComplete: "name",
							className: "\r\n                    mt-3\r\n                    w-full\r\n                    border-0\r\n                    border-b\r\n                    border-border\r\n                    bg-transparent\r\n                    px-0\r\n                    py-3\r\n                    text-sm\r\n                    outline-none\r\n                    transition-colors\r\n                    placeholder:text-muted-foreground/50\r\n                    focus:border-foreground\r\n                  "
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label",
							children: "How would you rate your experience?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex items-center gap-2",
							children: [
								1,
								2,
								3,
								4,
								5
							].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `${value} star${value > 1 ? "s" : ""}`,
								"aria-pressed": rating === value,
								onClick: () => setRating(value),
								className: "\r\n                          p-1\r\n                          text-muted-foreground/40\r\n                          transition-all\r\n                          duration-200\r\n                          hover:scale-105\r\n                          hover:text-foreground\r\n                          focus:outline-none\r\n                        ",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `
                            size-5
                            ${value <= rating ? "fill-current text-foreground" : ""}
                          ` })
							}, value))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "feedback-message",
							className: "label",
							children: "Your thoughts"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "feedback-message",
							value: message,
							onChange: (event) => setMessage(event.target.value),
							placeholder: "Tell me what you thought...",
							rows: 5,
							className: "\r\n                    mt-3\r\n                    w-full\r\n                    resize-none\r\n                    border-0\r\n                    border-b\r\n                    border-border\r\n                    bg-transparent\r\n                    px-0\r\n                    py-3\r\n                    text-sm\r\n                    leading-relaxed\r\n                    outline-none\r\n                    transition-colors\r\n                    placeholder:text-muted-foreground/50\r\n                    focus:border-foreground\r\n                  "
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex cursor-pointer items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: allowPublish,
								onChange: (event) => setAllowPublish(event.target.checked),
								className: "\r\n                    mt-0.5\r\n                    size-3.5\r\n                    shrink-0\r\n                    accent-foreground\r\n                  "
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs leading-relaxed text-muted-foreground",
								children: "I’m happy for my feedback to be featured on PaintTheory."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: submitting,
							className: "\r\n    rounded-full\r\n    bg-foreground\r\n    px-5\r\n    py-2.5\r\n    text-xs\r\n    font-medium\r\n    text-background\r\n    transition-opacity\r\n    hover:opacity-80\r\n    disabled:cursor-not-allowed\r\n    disabled:opacity-50\r\n  ",
							children: submitting ? "Sending..." : "Send feedback"
						})
					]
				})
			})]
		})
	});
}
//#endregion
export { FeedbackPage as component };
