import { a as __toESM } from "./_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "./_libs/@icons-pack/react-simple-icons+[...].mjs";
import { C as LoaderCircle, F as Check, S as Lock, k as CreditCard } from "./_libs/lucide-react.mjs";
import { d as saveCommissionShippingAddress } from "./_ssr/inquiry.service-CUIWxkhp.mjs";
import { t as Route } from "./_paymentId-Dq_ZSR3W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_paymentId-Cw0Im1Dd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AddressField({ label, value, onChange, placeholder, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "text-xs text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		value,
		onChange: (event) => onChange(event.target.value),
		placeholder,
		className: "mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground"
	})] });
}
function CommissionPaymentPage() {
	const { paymentId } = Route.useParams();
	const [payment, setPayment] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const [openingCheckout, setOpeningCheckout] = (0, import_react.useState)(false);
	const [shippingName, setShippingName] = (0, import_react.useState)("");
	const [shippingPhone, setShippingPhone] = (0, import_react.useState)("");
	const [shippingAddressLine1, setShippingAddressLine1] = (0, import_react.useState)("");
	const [shippingAddressLine2, setShippingAddressLine2] = (0, import_react.useState)("");
	const [shippingCity, setShippingCity] = (0, import_react.useState)("");
	const [shippingState, setShippingState] = (0, import_react.useState)("");
	const [shippingPincode, setShippingPincode] = (0, import_react.useState)("");
	const [shippingLandmark, setShippingLandmark] = (0, import_react.useState)("");
	const [savingAddress, setSavingAddress] = (0, import_react.useState)(false);
	const [addressSubmitted, setAddressSubmitted] = (0, import_react.useState)(false);
	const paymentSuccessful = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("payment") === "success";
	(0, import_react.useEffect)(() => {
		loadPayment();
	}, [paymentId]);
	async function loadPayment() {
		try {
			setLoading(true);
			setError("");
			const response = await fetch(`https://upwojfacbhkpnddotpkb.supabase.co/functions/v1/create-commission-payment-link`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer sb_publishable_EGn_J1G2_3AVoTnzMs_w_g_opAp9kDo`
				},
				body: JSON.stringify({ paymentId })
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error || "Unable to load this payment.");
			if (!result.payment) throw new Error("Payment information could not be loaded.");
			setPayment(result.payment);
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Unable to load this payment.");
		} finally {
			setLoading(false);
		}
	}
	function handlePayment() {
		if (!payment?.customer_link) return;
		setOpeningCheckout(true);
		window.location.href = payment.customer_link;
	}
	async function submitShippingAddress() {
		if (!payment?.inquiry_id) {
			setError("Commission information could not be found.");
			return;
		}
		if (!shippingName.trim() || !shippingPhone.trim() || !shippingAddressLine1.trim() || !shippingCity.trim() || !shippingState.trim() || !shippingPincode.trim()) {
			setError("Please fill in your name, phone, address, city, state and PIN code.");
			return;
		}
		try {
			setSavingAddress(true);
			setError("");
			await saveCommissionShippingAddress(payment.id, {
				shipping_name: shippingName.trim(),
				shipping_phone: shippingPhone.trim(),
				shipping_address_line1: shippingAddressLine1.trim(),
				shipping_address_line2: shippingAddressLine2.trim(),
				shipping_city: shippingCity.trim(),
				shipping_state: shippingState.trim(),
				shipping_pincode: shippingPincode.trim(),
				shipping_landmark: shippingLandmark.trim()
			});
			setAddressSubmitted(true);
		} catch (err) {
			console.error("SAVE ADDRESS ERROR:", err);
			const message = err?.message || err?.details || err?.hint || "Could not save your shipping address.";
			setError(typeof message === "string" ? message : JSON.stringify(message));
		} finally {
			setSavingAddress(false);
		}
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background px-5 py-16 sm:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex min-h-[70vh] max-w-xl items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto size-5 animate-spin text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "Preparing your payment..."
				})]
			})
		})
	});
	if (error || !payment) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background px-5 py-16 sm:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex min-h-[70vh] max-w-xl items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Commission Payment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-3xl text-foreground sm:text-4xl",
						children: "Payment unavailable"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground",
						children: error || "This payment request could not be loaded."
					})
				]
			})
		})
	});
	const amount = Number(payment.amount || 0);
	if (paymentSuccessful) {
		const showAddressForm = payment.status === "PAID" && payment.is_final;
		if (addressSubmitted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "min-h-screen bg-background px-5 py-12 sm:px-8 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex min-h-[70vh] max-w-xl items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow mt-7",
							children: "Address received"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-4xl text-foreground sm:text-5xl",
							children: "All set."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-5 max-w-md text-sm leading-7 text-muted-foreground",
							children: "Your final payment and shipping details have been received successfully."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-7 text-xs leading-6 text-muted-foreground",
							children: "I'll be in touch regarding the next step of your commission."
						})
					]
				})
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "min-h-screen bg-background px-5 py-12 sm:px-8 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow mt-7",
								children: "Payment received"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-3 font-display text-4xl text-foreground sm:text-5xl",
								children: "Thank you."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-5 max-w-md text-sm leading-7 text-muted-foreground",
								children: "Your commission payment has been received successfully."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto mt-8 max-w-sm border-y border-border py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Payment"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium text-foreground",
								children: ["#", payment.payment_number]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Amount"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-xl text-foreground",
								children: ["₹", amount.toLocaleString("en-IN")]
							})]
						})]
					}),
					showAddressForm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Final step"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-display text-2xl text-foreground",
								children: "Where should I send your artwork?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-6 text-muted-foreground",
								children: "Your final payment is complete. Please provide the shipping details for your commissioned artwork."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-7 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressField, {
										label: "Full name",
										value: shippingName,
										onChange: setShippingName,
										placeholder: "Your full name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressField, {
										label: "Phone",
										value: shippingPhone,
										onChange: setShippingPhone,
										placeholder: "Phone number",
										type: "tel"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressField, {
										label: "Address line 1",
										value: shippingAddressLine1,
										onChange: setShippingAddressLine1,
										placeholder: "House / flat / building"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressField, {
										label: "Address line 2",
										value: shippingAddressLine2,
										onChange: setShippingAddressLine2,
										placeholder: "Street / locality (optional)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressField, {
											label: "City",
											value: shippingCity,
											onChange: setShippingCity,
											placeholder: "City"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressField, {
											label: "State",
											value: shippingState,
											onChange: setShippingState,
											placeholder: "State"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressField, {
											label: "PIN code",
											value: shippingPincode,
											onChange: setShippingPincode,
											placeholder: "PIN code",
											type: "text"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressField, {
											label: "Landmark",
											value: shippingLandmark,
											onChange: setShippingLandmark,
											placeholder: "Landmark (optional)"
										})]
									}),
									error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-destructive",
										children: error
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: submitShippingAddress,
										disabled: savingAddress,
										className: "mt-2 flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
										children: savingAddress ? "Saving address..." : "Submit shipping address"
									})
								]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-7 text-center text-xs leading-6 text-muted-foreground",
						children: "I'll be in touch regarding the next step of your commission."
					})
				]
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background px-5 py-10 sm:px-8 sm:py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex min-h-[80vh] max-w-xl items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Kamlesh Sahoo Art"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl",
								children: "Commission Payment"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground",
								children: "A private payment request for your commissioned artwork."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-soft",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 sm:p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground",
										children: "Payment"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 font-display text-2xl text-foreground",
										children: ["#", payment.payment_number]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex size-11 items-center justify-center rounded-full bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-5 text-accent" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 border-t border-border pt-7",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-[0.18em] text-muted-foreground",
										children: "Amount due"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 font-display text-4xl text-foreground sm:text-5xl",
										children: ["₹", amount.toLocaleString("en-IN")]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handlePayment,
									disabled: openingCheckout || !payment.customer_link,
									className: "mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
									children: openingCheckout ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Opening secure payment..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" }), "Complete Payment"] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Secure payment powered by Razorpay" })]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-6 text-muted-foreground",
							children: "If you have any questions regarding this payment, please contact the artist directly."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground/70",
							children: "Kamlesh Sahoo Art"
						})]
					})
				]
			})
		})
	});
}
//#endregion
export { CommissionPaymentPage as component };
