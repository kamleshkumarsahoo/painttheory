import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-BYgwpyL6.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Button } from "./button-0h_v-pWj.mjs";
import { C as Instagram, v as MapPin, y as Mail } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Reveal } from "./Reveal-DhgqaqLa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-B2xNuSMI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const [sent, setSent] = (0, import_react.useState)(false);
	const [sending, setSending] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		phone: "",
		message: ""
	});
	function updateField(field, value) {
		setForm((current) => ({
			...current,
			[field]: value
		}));
	}
	async function handleSubmit(e) {
		e.preventDefault();
		if (!form.name.trim()) {
			toast.error("Please enter your name.");
			return;
		}
		if (!form.email.trim()) {
			toast.error("Please enter your email.");
			return;
		}
		if (!form.message.trim()) {
			toast.error("Please enter a message.");
			return;
		}
		try {
			setSending(true);
			const { data, error } = await supabase.functions.invoke("submit-contact", { body: {
				name: form.name.trim(),
				email: form.email.trim().toLowerCase(),
				phone: form.phone.trim() || null,
				message: form.message.trim()
			} });
			if (error) throw error;
			if (!data?.success) throw new Error(data?.error || "Unable to send your message.");
			setSent(true);
			toast.success("Message sent — I'll get back to you as soon as I can.");
		} catch (error) {
			console.error("CONTACT FORM ERROR:", error);
			toast.error(error instanceof Error ? error.message : "Could not send your message.");
		} finally {
			setSending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-14 lg:grid-cols-2 lg:gap-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Contact"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-hero mt-4 text-foreground",
					children: "Let's talk."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-md text-lg leading-relaxed text-muted-foreground",
					children: "For any quesions, ideas, discussion or random life thoughts. No formalities. Just write."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "mailto:emailkamleshsahoo@gmail.com",
							className: "group flex items-center gap-4 text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-11 items-center justify-center rounded-full bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-5 text-accent" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "link-underline",
								children: "emailkamleshsahoo@gmail.com"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "https://www.instagram.com/painttheory.in",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "group flex items-center gap-4 text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-11 items-center justify-center rounded-full bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-5 text-accent" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "link-underline",
								children: "@painttheory.in"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-11 items-center justify-center rounded-full bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-5 text-accent" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bengaluru, India" })]
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					onSubmit: handleSubmit,
					className: "rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "mb-2 block text-sm text-foreground",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								placeholder: "Your name",
								disabled: sent || sending,
								value: form.name,
								onChange: (e) => updateField("name", e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "mb-2 block text-sm text-foreground",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								required: true,
								placeholder: "you@email.com",
								disabled: sent || sending,
								value: form.email,
								onChange: (e) => updateField("email", e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "mb-2 block text-sm text-foreground",
								children: ["Phone", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-muted-foreground",
									children: "(optional)"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "tel",
								inputMode: "tel",
								placeholder: "+91 98765 43210",
								disabled: sent || sending,
								value: form.phone,
								onChange: (e) => updateField("phone", e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "mb-2 block text-sm text-foreground",
								children: "Message"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 5,
								required: true,
								placeholder: "How can I help?",
								disabled: sent || sending,
								value: form.message,
								onChange: (e) => updateField("message", e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "xl",
								className: "w-full",
								disabled: sent || sending,
								children: sending ? "Sending..." : sent ? "Message sent" : "Send message"
							})
						]
					})
				})
			})]
		})
	});
}
//#endregion
export { ContactPage as component };
