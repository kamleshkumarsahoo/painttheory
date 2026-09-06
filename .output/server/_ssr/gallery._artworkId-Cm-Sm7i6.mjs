import { a as __toESM } from "../_runtime.mjs";
import { n as AnimatePresence } from "../_libs/framer-motion.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/@icons-pack/react-simple-icons+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-BQQ3Gu5O.mjs";
import { C as LoaderCircle, F as Check, R as ArrowLeft, i as Truck, l as ShieldCheck, t as X, u as ScrollText } from "../_libs/lucide-react.mjs";
import { t as Label } from "./label-Crsw69af.mjs";
import { r as createInquiry } from "./inquiry.service-CUIWxkhp.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as formatPrice } from "./artwork-BcBh99Ev.mjs";
import { t as Route } from "./gallery._artworkId-DeIfoO_G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery._artworkId-Cm-Sm7i6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SHIPPING = 0;
/**
* Checkout modal with a Razorpay integration placeholder.
* Flow: Buy Now → review → (Razorpay) → success confirmation.
* Swap `simulatePayment` with the real Razorpay checkout when keys are ready.
*/
function CheckoutModal({ artwork, open, onClose }) {
	const [stage, setStage] = (0, import_react.useState)("review");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [submittedOrderNumber, setSubmittedOrderNumber] = (0, import_react.useState)("");
	const total = artwork.price + SHIPPING;
	function handleClose() {
		onClose();
		setTimeout(() => setStage("review"), 300);
	}
	async function submitInquiry() {
		try {
			const missing = [];
			const trimmedEmail = email.trim();
			const trimmedPhone = phone.trim();
			if (!name.trim()) missing.push("name");
			if (!trimmedPhone) missing.push("WhatsApp number");
			if (!trimmedEmail) missing.push("email address");
			if (missing.length > 0) {
				toast.error(`Please add your ${missing.join(", ")}.`);
				return;
			}
			if (!isValidEmail(trimmedEmail)) {
				toast.error("Please enter a valid email address.");
				return;
			}
			if (!isValidPhone(trimmedPhone)) {
				toast.error("Please enter a valid WhatsApp number.");
				return;
			}
			setStage("processing");
			const inquiry = await createInquiry({
				artwork_id: artwork.id,
				artwork_price_snapshot: artwork.price,
				customer_name: name,
				customer_email: trimmedEmail,
				customer_phone: trimmedPhone,
				note
			});
			setSubmittedOrderNumber(inquiry.order_number ?? inquiry.id.slice(0, 8));
			setStage("success");
		} catch (err) {
			console.error("Inquiry Error:", err);
			toast.error("Could not submit your request. Please try again.");
			setStage("review");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm",
			onClick: handleClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			role: "dialog",
			"aria-modal": "true",
			initial: {
				y: 40,
				opacity: 0,
				scale: .98
			},
			animate: {
				y: 0,
				opacity: 1,
				scale: 1
			},
			exit: {
				y: 40,
				opacity: 0,
				scale: .98
			},
			transition: {
				duration: .4,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			className: "scrollbar-none relative max-h-[calc(100dvh-1rem)] w-full max-w-lg overflow-y-auto overscroll-contain rounded-t-3xl bg-card shadow-frame sm:max-h-[min(90dvh,760px)] sm:rounded-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: handleClose,
				"aria-label": "Close checkout",
				className: "absolute right-5 top-5 z-10 text-muted-foreground transition-colors hover:text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
			}), stage !== "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-7 sm:p-9",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Artwork Request"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl text-foreground",
						children: "Complete your collection"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex gap-4 rounded-2xl bg-muted p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: artwork.image,
							alt: artwork.title,
							loading: "lazy",
							className: "size-20 rounded-xl object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg text-foreground",
								children: artwork.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									artwork.dimensions,
									" · ",
									artwork.medium
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-6 space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Artwork"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-foreground",
									children: formatPrice(artwork.price)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Shipping & insured packaging"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-foreground",
									children: "FREE"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-t border-border pt-3 text-base",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "font-medium text-foreground",
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-display text-lg text-foreground",
									children: formatPrice(total)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Your Name",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Your full name",
									value: name,
									onChange: (e) => setName(e.target.value),
									className: "w-full rounded-xl border border-border bg-background px-4 py-3"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "WhatsApp Number",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "tel",
									inputMode: "tel",
									placeholder: "WhatsApp number",
									value: phone,
									onChange: (e) => setPhone(e.target.value),
									className: "w-full rounded-xl border border-border bg-background px-4 py-3"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Email Address",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									inputMode: "email",
									placeholder: "you@email.com",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "w-full rounded-xl border border-border bg-background px-4 py-3"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Message",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									placeholder: "Anything you'd like to tell me? (Optional)",
									value: note,
									onChange: (e) => setNote(e.target.value),
									rows: 4,
									className: "w-full rounded-xl border border-border bg-background px-4 py-3"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						className: "mt-7 w-full",
						onClick: submitInquiry,
						disabled: stage === "processing",
						children: stage === "processing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), " Submitting your request..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Request Artwork" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), " Your request will be personally reviewed before payment is requested."]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center p-9 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { scale: 0 },
						animate: { scale: 1 },
						transition: {
							type: "spring",
							stiffness: 200,
							damping: 15
						},
						className: "flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mt-6",
						children: "Request Submitted"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl text-foreground",
						children: "Thank you!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted-foreground",
						children: ["Reference ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-foreground",
							children: submittedOrderNumber
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-sm text-sm text-muted-foreground",
						children: "Your request has been received successfully. I'll review it personally and get in touch with you shortly."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "mt-8",
						onClick: handleClose,
						children: "Continue exploring"
					})
				]
			})]
		})]
	}) });
}
function isValidEmail(value) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}
function isValidPhone(value) {
	const compact = value.replace(/[\s().-]/g, "");
	if (!/^\+?\d+$/.test(compact)) return false;
	const digits = compact.replace(/^\+/, "");
	if (digits.length === 10) return /^[6-9]\d{9}$/.test(digits);
	if (digits.length === 12 && digits.startsWith("91")) return /^[6-9]\d{9}$/.test(digits.slice(2));
	return digits.length >= 8 && digits.length <= 15;
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
function ArtworkPage() {
	const { artwork } = Route.useLoaderData();
	const [checkoutOpen, setCheckoutOpen] = (0, import_react.useState)(false);
	const primaryMedia = artwork.media.find((media) => media.role === "primary") ?? artwork.media[0];
	const [selectedMediaId, setSelectedMediaId] = (0, import_react.useState)(primaryMedia?.id ?? "");
	const selectedMedia = artwork.media.find((media) => media.id === selectedMediaId) ?? primaryMedia;
	const sold = artwork.availability === "Sold";
	const reserved = artwork.availability === "Reserved";
	const mainImage = selectedMedia?.largeUrl || artwork.image;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/gallery",
				className: "link-underline group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4 transition-transform group-hover:-translate-x-1" }), "Back to gallery"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						scale: 1.02
					},
					animate: {
						opacity: 1,
						scale: 1
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
					className: "overflow-hidden bg-muted shadow-frame",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: mainImage,
						alt: selectedMedia?.altText || `${artwork.title} - ${artwork.medium}`,
						width: selectedMedia?.width ?? 1024,
						height: selectedMedia?.height ?? (artwork.orientation === "portrait" ? 1280 : 1024),
						className: "size-full object-cover"
					})
				}, selectedMedia?.id ?? mainImage), artwork.media.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex gap-3 overflow-x-auto pb-1",
					children: artwork.media.map((media) => {
						const selected = media.id === selectedMedia?.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSelectedMediaId(media.id),
							"aria-label": `View ${artwork.title} image`,
							"aria-pressed": selected,
							className: ["relative size-20 shrink-0 overflow-hidden border transition-all", selected ? "border-accent ring-2 ring-accent/20" : "border-border opacity-70 hover:opacity-100"].join(" "),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: media.thumbUrl,
								alt: media.altText || artwork.title,
								loading: "lazy",
								className: "size-full object-cover"
							})
						}, media.id);
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 24
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .8,
						delay: .15,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "lg:sticky lg:top-28 lg:self-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] " + (sold ? "bg-foreground text-background" : "bg-accent/15 text-accent"),
							children: artwork.availability
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-hero mt-5 text-foreground",
							children: artwork.title
						}),
						artwork.availability === "Available" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl",
							children: formatPrice(artwork.price)
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl",
							children: artwork.availability === "Reserved" ? "Currently Reserved" : "Collected"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-7 text-lg leading-relaxed text-muted-foreground",
							children: artwork.story
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-8 grid grid-cols-2 gap-y-5 border-y border-border py-7 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Dimensions"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-foreground",
									children: artwork.dimensions
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Medium"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-foreground",
									children: artwork.medium
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Year"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-foreground",
									children: artwork.year
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Category"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-foreground",
									children: artwork.category
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-6 space-y-3 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "size-4 text-accent" }), "Certificate of Authenticity included"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4 text-accent" }), "Insured, hand-packed worldwide shipping"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-accent" }), "Secure payment via Razorpay"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-9",
							children: [
								reserved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-4 text-sm text-muted-foreground",
									children: "If the reservation is not completed, this artwork may become available again."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "xl",
									className: "w-full sm:w-auto",
									onClick: () => setCheckoutOpen(true),
									children: "Request This Artwork"
								})] }),
								sold && !reserved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									size: "xl",
									className: "w-full sm:w-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/commission",
										children: "Commission something similar"
									})
								}),
								!sold && !reserved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "xl",
									className: "w-full sm:w-auto",
									onClick: () => setCheckoutOpen(true),
									children: "Buy Now"
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutModal, {
				artwork,
				open: checkoutOpen,
				onClose: () => setCheckoutOpen(false)
			})
		]
	});
}
//#endregion
export { ArtworkPage as component };
