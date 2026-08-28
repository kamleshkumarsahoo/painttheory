import { a as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-BYgwpyL6.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "./_libs/@radix-ui/react-label+[...].mjs";
import { t as Button } from "./_ssr/button-0h_v-pWj.mjs";
import { M as BadgeCheck, S as LoaderCircle, _ as MapPinned, i as Truck, j as Check, k as ChevronRight, n as Wallet, v as MapPin, x as Lock } from "./_libs/lucide-react.mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { f as saveShippingAddress, u as getInquiryByToken } from "./_ssr/inquiry.service-gmQRkgGf.mjs";
import { t as Textarea } from "./_ssr/textarea-kko37XEX.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Route } from "./_token-WJ4iWXWx.mjs";
import { t as motion } from "./_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_token-Dr65Pv9W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getArtworkImage(artwork) {
	const media = artwork?.artwork_media ?? [];
	const primary = media.find((item) => item.role === "primary") ?? [...media].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))[0];
	if (!primary) return null;
	const path = primary.medium_path ?? primary.thumb_path ?? primary.large_path ?? primary.original_path;
	if (!path) return null;
	return supabase.storage.from("artworks").getPublicUrl(path).data.publicUrl;
}
function CustomerOrderPage() {
	const { token } = Route.useParams();
	const [inquiry, setInquiry] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [savingAddress, setSavingAddress] = (0, import_react.useState)(false);
	const [paidStage, setPaidStage] = (0, import_react.useState)("confirmed");
	const [address, setAddress] = (0, import_react.useState)({
		shipping_name: inquiry?.customer_name ?? "",
		shipping_phone: inquiry?.customer_phone ?? "",
		shipping_address_line1: "",
		shipping_address_line2: "",
		shipping_city: "",
		shipping_state: "",
		shipping_pincode: "",
		shipping_landmark: ""
	});
	const [isOpeningCheckout, setIsOpeningCheckout] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		loadInquiry();
	}, [token]);
	async function loadInquiry() {
		try {
			const data = await getInquiryByToken(token);
			setInquiry(data);
			if (data.inquiry_status === "DELIVERED") setPaidStage("delivered");
			else if (data.address_received_at) setPaidStage("thanks");
			else setPaidStage("confirmed");
			setAddress({
				shipping_name: data.customer_name ?? "",
				shipping_phone: data.customer_phone ?? "",
				shipping_address_line1: data.shipping_address_line1 ?? "",
				shipping_address_line2: data.shipping_address_line2 ?? "",
				shipping_city: data.shipping_city ?? "",
				shipping_state: data.shipping_state ?? "",
				shipping_pincode: data.shipping_pincode ?? "",
				shipping_landmark: data.shipping_landmark ?? ""
			});
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}
	async function handlePayment() {
		setIsOpeningCheckout(true);
		try {
			const res = await fetch(`https://upwojfacbhkpnddotpkb.supabase.co/functions/v1/create-payment-link`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer sb_publishable_EGn_J1G2_3AVoTnzMs_w_g_opAp9kDo`
				},
				body: JSON.stringify({ inquiryId: inquiry.id })
			});
			const result = await res.json();
			if (!res.ok) throw new Error(result.error);
			window.location.href = result.url;
		} catch (err) {
			console.error(err);
			alert(err instanceof Error ? err.message : "Payment failed");
			setIsOpeningCheckout(false);
		}
	}
	async function handleSaveAddress() {
		try {
			if ([
				address.shipping_name,
				address.shipping_phone,
				address.shipping_address_line1,
				address.shipping_city,
				address.shipping_state,
				address.shipping_pincode
			].some((value) => !value.trim())) {
				toast.error("Please complete the required shipping details.");
				return;
			}
			setSavingAddress(true);
			const updatedInquiry = await saveShippingAddress(token, address);
			setInquiry(updatedInquiry);
			setPaidStage("thanks");
			toast.success("Address received. We'll prepare your artwork now.");
		} catch (err) {
			console.error("SAVE ADDRESS ERROR:", err);
			toast.error(err instanceof Error ? err.message : "Unable to save address.");
		} finally {
			setSavingAddress(false);
		}
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-5xl p-10",
		children: "Loading..."
	});
	if (!inquiry) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-6 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Collector Portal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-4xl text-foreground",
				children: "This Customer Portal is no longer available"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-4 max-w-md text-muted-foreground",
				children: "This private link expired or is no longer active. If you need any assistance regarding your artwork, please feel free to contact me."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/gallery",
					children: "Explore Gallery"
				})
			})
		]
	});
	const amount = Number(inquiry.artwork_price_snapshot);
	const artworkImage = getArtworkImage(inquiry.artworks);
	if (inquiry.payment_status === "PAID") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-lg px-6 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-9",
			children: paidStage === "confirmed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									scale: .6,
									opacity: 0
								},
								animate: {
									scale: 1,
									opacity: 1
								},
								transition: {
									type: "spring",
									stiffness: 180,
									damping: 16
								},
								className: "size-20 overflow-hidden rounded-full ring-4 ring-accent/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: artworkImage ?? "/placeholder.jpg",
									alt: inquiry.artworks.title,
									className: "size-full object-cover"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									scale: 0,
									rotate: -30
								},
								animate: {
									scale: 1,
									rotate: 0
								},
								transition: {
									delay: .35,
									type: "spring",
									stiffness: 260,
									damping: 14
								},
								className: "absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-soft ring-4 ring-card",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: { delay: .25 },
							className: "eyebrow mt-6",
							children: "Payment confirmed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
							initial: {
								opacity: 0,
								y: 8
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: .3 },
							className: "mt-2 font-display text-2xl text-foreground",
							children: ["Thank you, ", inquiry.customer_name?.split(" ")[0] ?? "collector"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: { delay: .4 },
							className: "mt-2 max-w-sm text-sm text-muted-foreground",
							children: [
								"Your payment for \"",
								inquiry.artworks.title,
								"\" is secured. One last step: tell us where to send it."
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						delay: .5,
						duration: .4
					},
					className: "mt-8 rounded-2xl border border-border bg-muted/40 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center gap-2 text-sm font-medium text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-accent" }), "Shipping address"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "shipping-name",
										children: "Full name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "shipping-name",
										value: address.shipping_name,
										onChange: (event) => setAddress({
											...address,
											shipping_name: event.target.value
										}),
										required: true
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "shipping-phone",
										children: "Phone"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "shipping-phone",
										type: "tel",
										inputMode: "tel",
										value: address.shipping_phone,
										onChange: (event) => setAddress({
											...address,
											shipping_phone: event.target.value
										}),
										required: true
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "shipping-address",
									children: "Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "shipping-address",
									rows: 2,
									placeholder: "House / flat, street, area",
									value: address.shipping_address_line1,
									onChange: (event) => setAddress({
										...address,
										shipping_address_line1: event.target.value
									}),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "shipping-city",
										children: "City"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "shipping-city",
										value: address.shipping_city,
										onChange: (event) => setAddress({
											...address,
											shipping_city: event.target.value
										}),
										required: true
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "shipping-postal",
										children: "Postal code"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "shipping-postal",
										inputMode: "numeric",
										value: address.shipping_pincode,
										onChange: (event) => setAddress({
											...address,
											shipping_pincode: event.target.value
										}),
										required: true
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "shipping-state",
									children: "State"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "shipping-state",
									value: address.shipping_state,
									onChange: (event) => setAddress({
										...address,
										shipping_state: event.target.value
									}),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								type: "button",
								className: "w-full",
								disabled: savingAddress,
								onClick: handleSaveAddress,
								children: savingAddress ? "Saving..." : "Confirm shipping address"
							})
						]
					})]
				})]
			}, "confirmed") : paidStage === "thanks" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
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
				className: "flex flex-col items-center text-center",
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
						children: "Order confirmed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-3xl text-foreground",
						children: "Your artwork is on its way"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-sm text-sm text-muted-foreground",
						children: [
							"Thank you for collecting \"",
							inquiry.artworks.title,
							"\". We'll hand-wrap it with a Certificate of Authenticity and share tracking details by email / WhatsApp shortly."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 w-full rounded-2xl border border-border bg-muted/40 p-5 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center gap-2 text-sm font-medium text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4 text-accent" }), "Shipping to"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-line text-sm text-muted-foreground",
							children: formatShippingAddress(address)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/gallery",
							children: "Explore the gallery"
						})
					})
				]
			}, "thanks") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
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
				className: "flex flex-col items-center text-center",
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
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mt-6",
						children: "Delivered Successfully"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-3xl text-foreground",
						children: "Your artwork has been delivered"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-sm text-sm text-muted-foreground",
						children: "Your artwork has been successfully delivered. Thank you for supporting original art. I hope it has found a beautiful place in your home."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-7 w-full rounded-2xl border border-border bg-muted/40 p-5 text-left",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex items-center gap-2 text-sm font-medium text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4 text-accent" }), "Delivered Artwork"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/gallery",
							children: "Explore the gallery"
						})
					})
				]
			}, "thanks")
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-6 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Kamlesh Sahoo Studio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-5xl",
						children: "Artwork Purchase Portal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-2xl text-lg text-muted-foreground",
						children: "Thank you for your interest in this original artwork. Complete the payment and shipping details below to collect your artwork."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 rounded-3xl border border-border bg-card shadow-soft overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-[420px_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: artworkImage ?? "/placeholder.jpg",
						alt: inquiry.artworks.title,
						className: "h-full w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Original Artwork"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-4xl",
								children: inquiry.artworks.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-5 font-display text-3xl text-accent",
								children: ["₹", Number(inquiry.artwork_price_snapshot).toLocaleString("en-IN")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 grid gap-5 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-widest text-muted-foreground",
									children: "Medium"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1",
									children: inquiry.artworks.medium ?? "-"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-widest text-muted-foreground",
									children: "Dimensions"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1",
									children: inquiry.artworks.dimensions ?? "-"
								})] })]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground",
					children: "What Happens Next"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-start justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex w-40 flex-col items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-12 w-12 items-center justify-center rounded-full bg-[#8a6d3b] text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-medium text-foreground",
									children: "Payment"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-center text-xs text-muted-foreground",
									children: "Complete securely"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex w-24 items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-[#d8c8aa]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "mx-2 h-4 w-4 text-[#8a6d3b]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-[#d8c8aa]" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex w-40 flex-col items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#8a6d3b] text-[#8a6d3b]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPinned, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-medium text-foreground",
									children: "Shipping Address"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-center text-xs text-muted-foreground",
									children: "We'll ask this next"
								})
							]
						})
					]
				})]
			}),
			inquiry.payment_status !== "PAID" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 rounded-3xl border border-border bg-card p-10 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Payment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl",
						children: "Secure Payment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground leading-7",
						children: "Your payment is securely processed by Razorpay. After completing the payment, simply continue below and submit your shipping address."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 rounded-2xl bg-muted p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-widest text-muted-foreground",
								children: "Amount"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "mt-2 font-display text-4xl",
								children: ["₹", amount.toLocaleString("en-IN")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-widest text-muted-foreground pt-2",
								children: "Free Shipping Included*"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						className: "mt-8 w-full",
						disabled: isOpeningCheckout,
						onClick: handlePayment,
						children: isOpeningCheckout ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Opening Secure Payment..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mr-2 h-4 w-4" }), "Complete Payment"] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-center text-sm text-muted-foreground",
						children: "Powered by Razorpay"
					})
				]
			})
		]
	});
}
function formatShippingAddress(address) {
	return [
		address.shipping_name,
		address.shipping_phone,
		address.shipping_address_line1,
		address.shipping_address_line2,
		[
			address.shipping_city,
			address.shipping_state,
			address.shipping_pincode
		].filter(Boolean).join(" "),
		address.shipping_landmark
	].filter(Boolean).join("\n");
}
//#endregion
export { CustomerOrderPage as component };
