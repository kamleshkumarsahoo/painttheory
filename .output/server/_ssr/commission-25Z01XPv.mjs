import { a as __toESM } from "../_runtime.mjs";
import { n as AnimatePresence } from "../_libs/framer-motion.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/@icons-pack/react-simple-icons+[...].mjs";
import { t as Button } from "./button-BQQ3Gu5O.mjs";
import { F as Check } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-D8Gto0Jm.mjs";
import { t as Label } from "./label-Crsw69af.mjs";
import { r as createInquiry } from "./inquiry.service-CUIWxkhp.mjs";
import { t as Textarea } from "./textarea-BU-_euTZ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as Reveal } from "./Reveal-DhgqaqLa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/commission-25Z01XPv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var timeline = [
	{
		step: "01",
		title: "Tell me what you have in mind",
		text: "Share the idea, feeling, subject or story behind your piece."
	},
	{
		step: "02",
		title: "We shape the idea",
		text: "We discuss the details and I send you a clear quotation."
	},
	{
		step: "03",
		title: "I paint it",
		text: "Once approved, I create your original and share progress along the way."
	},
	{
		step: "04",
		title: "It comes home",
		text: "The finished piece is carefully packed and shipped to you."
	}
];
var empty = {
	name: "",
	email: "",
	phone: "",
	country: "",
	budget: "",
	description: "",
	deadline: ""
};
function CommissionPage() {
	const [form, setForm] = (0, import_react.useState)(empty);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	function update(key, value) {
		setForm((f) => ({
			...f,
			[key]: value
		}));
	}
	async function handleSubmit(e) {
		e.preventDefault();
		const name = form.name.trim();
		const email = form.email.trim();
		const phone = form.phone.trim();
		if (!name || !email || !phone) {
			toast.error("Please add your name, email and phone number.");
			return;
		}
		try {
			await createInquiry({
				inquiry_type: "COMMISSION",
				customer_name: name,
				customer_email: email,
				customer_phone: phone,
				country: form.country,
				budget: form.budget,
				deadline: form.deadline,
				note: form.description
			});
			setSubmitted(true);
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		} catch (error) {
			console.error("Commission request error:", error);
			toast.error("Could not submit your request. Please try again.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-4xl px-6 pt-24 text-center lg:pt-26",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Commissions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-hero mt-5 text-foreground",
					children: "Commission a story worth hanging."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground",
					children: "You say it, I paint it"
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-5xl px-6 py-10 lg:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-4",
				children: timeline.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group relative h-full border-t border-border pt-5 transition-transform duration-500 hover:-translate-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 top-0 h-[2px] w-0 bg-foreground transition-all duration-200 group-hover:w-full" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label text-accent",
								children: t.step
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 font-display text-xl leading-tight text-foreground",
								children: t.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted-foreground",
								children: t.text
							})
						]
					})
				}, t.step))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-3xl px-6 pb-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "wait",
				children: submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					className: "rounded-3xl border border-border bg-card p-10 text-center shadow-lift lg:p-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-8" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-section mt-6 text-foreground",
							children: "Request received"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-md text-muted-foreground",
							children: "Thank you, We'll review your request and get back within 24-48 hours with the next steps and a quotation."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "mt-8",
							onClick: () => {
								setSubmitted(false);
								setForm(empty);
							},
							children: "Submit another request"
						})
					]
				}, "success") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						className: "mb-10 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-section text-foreground",
							children: "Tell me about your piece"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Name",
										required: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											required: true,
											value: form.name,
											onChange: (e) => update("name", e.target.value),
											placeholder: "Your full name"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Email",
										required: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											required: true,
											type: "email",
											value: form.email,
											onChange: (e) => update("email", e.target.value),
											placeholder: "you@email.com"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Phone",
										required: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											required: true,
											type: "tel",
											value: form.phone,
											onChange: (e) => update("phone", e.target.value),
											placeholder: "+91 …"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Country",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.country,
											onChange: (e) => update("country", e.target.value),
											placeholder: "India"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Budget",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.budget,
											onChange: (e) => update("budget", e.target.value),
											placeholder: "e.g. ₹30,000"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Deadline (optional)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "date",
											value: form.deadline,
											onChange: (e) => update("deadline", e.target.value)
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Tell me about the piece",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										rows: 5,
										value: form.description,
										onChange: (e) => update("description", e.target.value),
										placeholder: "Tell me about the story, subject, mood, or anything else you have in mind…"
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "xl",
								className: "mt-8 w-full",
								children: "Request Commission"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-center text-xs text-muted-foreground",
								children: "No payment now, payment happens later, after we agree on a quotation."
							})
						]
					})]
				}, "form")
			})
		})
	] });
}
function Field({ label, required, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
		className: "mb-2 block text-sm text-foreground",
		children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-accent",
			children: " *"
		})]
	}), children] });
}
//#endregion
export { CommissionPage as component };
