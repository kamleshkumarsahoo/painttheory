import { a as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-BYgwpyL6.mjs";
import { a as require_react, i as require_jsx_runtime } from "./_libs/@icons-pack/react-simple-icons+[...].mjs";
import { _ as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./_ssr/button-BQQ3Gu5O.mjs";
import { A as Copy, F as Check, M as Clock3, R as ArrowLeft, b as Mail, d as Save, g as Pencil, h as Phone, t as X } from "./_libs/lucide-react.mjs";
import { t as Route } from "./_inquiryId-CDF6dpjR.mjs";
import { t as Input } from "./_ssr/input-D8Gto0Jm.mjs";
import { t as Label } from "./_ssr/label-Crsw69af.mjs";
import { a as formatDateTime, c as getEffectiveInquiryStatus, l as getInquiryById, m as updateInquiryStatus, n as STATUS_LABELS, o as generateCustomerLink, p as updateArtistNotes, t as STATUS_FLOW } from "./_ssr/inquiry.service-CUIWxkhp.mjs";
import { n as inquiryPrice, t as StatusBadge } from "./_ssr/inquiry-BwFIWw-v.mjs";
import { t as Textarea } from "./_ssr/textarea-BU-_euTZ.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_inquiryId-CCgMFUv_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WORKFLOW$1 = [
	{
		key: "REVIEWED",
		label: "Reviewed",
		timestamp: "reviewed_at"
	},
	{
		key: "PAYMENT_REQUESTED",
		label: "Payment requested",
		timestamp: "payment_requested_at"
	},
	{
		key: "PAID",
		label: "Paid",
		timestamp: "paid_at"
	},
	{
		key: "ADDRESS_RECEIVED",
		label: "Address received",
		timestamp: "address_received_at"
	},
	{
		key: "SHIPPED",
		label: "Shipped",
		timestamp: "shipped_at"
	},
	{
		key: "DELIVERED",
		label: "Delivered",
		timestamp: "delivered_at"
	}
];
var STATUS_OPTIONS$1 = [
	"NEW",
	"REVIEWED",
	"PAYMENT_REQUESTED",
	"PAID",
	"ADDRESS_RECEIVED",
	"SHIPPED",
	"DELIVERED",
	"DISCARDED"
];
function formatDate$2(date) {
	return formatDateTime(date) || "Not recorded";
}
function formatStatus$1(status) {
	return status.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
function getWorkflowIndex$1(status) {
	switch (status) {
		case "REVIEWED": return 0;
		case "PAYMENT_REQUESTED": return 1;
		case "PAID": return 2;
		case "ADDRESS_RECEIVED": return 3;
		case "SHIPPED": return 4;
		case "DELIVERED": return 5;
		default: return -1;
	}
}
function getLogLabel$1(key) {
	switch (key) {
		case "created_at": return "Request received";
		case "reviewed_at": return "Reviewed";
		case "payment_requested_at": return "Payment requested";
		case "payment_submitted_at": return "Payment submitted";
		case "paid_at": return "Payment marked paid";
		case "address_submitted_at": return "Address submitted";
		case "address_received_at": return "Address received";
		case "communication_sent_at": return "Communication sent";
		case "shipped_at": return "Shipped";
		case "delivered_at": return "Delivered";
		default: return key;
	}
}
function ArtPurchaseReview({ inquiry, artwork, requestedPrice, effectiveStatus, receivedDate, customerMessage, whatsappUrl, pendingStatus, artistNotes, savingNotes, onBack, onChangeStatus, onSaveNotes, onGenerateCustomerLink, onSendEmail, onPendingStatusChange, onArtistNotesChange, formatPrice }) {
	const isCommission = inquiry.inquiry_type === "COMMISSION" || !inquiry.artwork_id;
	const [commissionPayments, setCommissionPayments] = (0, import_react.useState)([]);
	const [loadingPayments, setLoadingPayments] = (0, import_react.useState)(false);
	const [creatingPayment, setCreatingPayment] = (0, import_react.useState)(false);
	const [newPaymentAmount, setNewPaymentAmount] = (0, import_react.useState)("");
	async function loadCommissionPayments() {
		if (!isCommission) return;
		try {
			setLoadingPayments(true);
			const { data, error } = await supabase.from("commission_payments").select(`
          id,
          inquiry_id,
          payment_number,
          amount,
          status,
          customer_link,
          requested_at,
          paid_at,
          created_at
        `).eq("inquiry_id", inquiry.id).order("payment_number", { ascending: true });
			if (error) throw error;
			setCommissionPayments(data ?? []);
		} catch (error) {
			console.error(error);
			toast.error("Could not load commission payments.");
		} finally {
			setLoadingPayments(false);
		}
	}
	(0, import_react.useEffect)(() => {
		if (isCommission) loadCommissionPayments();
	}, [inquiry.id, isCommission]);
	const totalPaid = commissionPayments.filter((payment) => payment.status === "PAID").reduce((total, payment) => total + Number(payment.amount || 0), 0);
	const totalRequested = commissionPayments.reduce((total, payment) => total + Number(payment.amount || 0), 0);
	const remainingAmount = Math.max(totalRequested - totalPaid, 0);
	const nextPaymentNumber = commissionPayments.length > 0 ? Math.max(...commissionPayments.map((payment) => Number(payment.payment_number || 0))) + 1 : 1;
	async function copyPaymentLink(link) {
		try {
			await navigator.clipboard.writeText(link);
			toast.success("Payment link copied.");
		} catch {
			toast.error("Could not copy payment link.");
		}
	}
	const [editingPrice, setEditingPrice] = (0, import_react.useState)(false);
	const [priceValue, setPriceValue] = (0, import_react.useState)(String(inquiry.artwork_price_snapshot ?? artwork?.price ?? requestedPrice ?? ""));
	const [savingPrice, setSavingPrice] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setPriceValue(String(inquiry.artwork_price_snapshot ?? artwork?.price ?? requestedPrice ?? ""));
	}, [
		inquiry.id,
		inquiry.artwork_price_snapshot,
		artwork?.price,
		requestedPrice
	]);
	async function savePrice() {
		const numericPrice = Number(priceValue.replace(/,/g, ""));
		if (!Number.isFinite(numericPrice) || numericPrice < 0) {
			toast.error("Enter a valid price.");
			return;
		}
		if (!artwork?.id) {
			toast.error("Artwork could not be identified.");
			return;
		}
		try {
			setSavingPrice(true);
			const { error: artworkError } = await supabase.from("artworks").update({ price: numericPrice }).eq("id", artwork.id);
			if (artworkError) throw artworkError;
			const { error: inquiryError } = await supabase.from("inquiries").update({ artwork_price_snapshot: numericPrice }).eq("id", inquiry.id);
			if (inquiryError) throw inquiryError;
			setPriceValue(String(numericPrice));
			setEditingPrice(false);
			toast.success("Price updated.");
		} catch (error) {
			console.error(error);
			toast.error(error instanceof Error ? error.message : "Could not update price.");
		} finally {
			setSavingPrice(false);
		}
	}
	const [editingCustomer, setEditingCustomer] = (0, import_react.useState)(false);
	const [savingCustomer, setSavingCustomer] = (0, import_react.useState)(false);
	const [customerName, setCustomerName] = (0, import_react.useState)(inquiry.customer_name ?? "");
	const [customerEmail, setCustomerEmail] = (0, import_react.useState)(inquiry.customer_email ?? "");
	const [customerPhone, setCustomerPhone] = (0, import_react.useState)(inquiry.customer_phone ?? "");
	const [addressLine1, setAddressLine1] = (0, import_react.useState)(inquiry.shipping_address_line1 ?? "");
	const [addressLine2, setAddressLine2] = (0, import_react.useState)(inquiry.shipping_address_line2 ?? "");
	const [city, setCity] = (0, import_react.useState)(inquiry.shipping_city ?? "");
	const [state, setState] = (0, import_react.useState)(inquiry.shipping_state ?? "");
	const [pincode, setPincode] = (0, import_react.useState)(inquiry.shipping_pincode ?? "");
	const [landmark, setLandmark] = (0, import_react.useState)(inquiry.shipping_landmark ?? "");
	(0, import_react.useEffect)(() => {
		setCustomerName(inquiry.customer_name ?? "");
		setCustomerEmail(inquiry.customer_email ?? "");
		setCustomerPhone(inquiry.customer_phone ?? "");
		setAddressLine1(inquiry.shipping_address_line1 ?? "");
		setAddressLine2(inquiry.shipping_address_line2 ?? "");
		setCity(inquiry.shipping_city ?? "");
		setState(inquiry.shipping_state ?? "");
		setPincode(inquiry.shipping_pincode ?? "");
		setLandmark(inquiry.shipping_landmark ?? "");
	}, [
		inquiry.id,
		inquiry.customer_name,
		inquiry.customer_email,
		inquiry.customer_phone,
		inquiry.shipping_address_line1,
		inquiry.shipping_address_line2,
		inquiry.shipping_city,
		inquiry.shipping_state,
		inquiry.shipping_pincode,
		inquiry.shipping_landmark
	]);
	async function saveCustomerDetails() {
		if (!customerName.trim()) {
			toast.error("Customer name is required.");
			return;
		}
		if (!customerEmail.trim()) {
			toast.error("Customer email is required.");
			return;
		}
		if (!customerPhone.trim()) {
			toast.error("Customer phone is required.");
			return;
		}
		try {
			setSavingCustomer(true);
			const { error } = await supabase.from("inquiries").update({
				customer_name: customerName.trim(),
				customer_email: customerEmail.trim(),
				customer_phone: customerPhone.trim(),
				shipping_name: customerName.trim(),
				shipping_phone: customerPhone.trim(),
				shipping_address_line1: addressLine1.trim() || null,
				shipping_address_line2: addressLine2.trim() || null,
				shipping_city: city.trim() || null,
				shipping_state: state.trim() || null,
				shipping_pincode: pincode.trim() || null,
				shipping_landmark: landmark.trim() || null
			}).eq("id", inquiry.id);
			if (error) throw error;
			toast.success("Customer details updated.");
			setEditingCustomer(false);
		} catch (error) {
			console.error(error);
			toast.error(error instanceof Error ? error.message : "Could not save customer details.");
		} finally {
			setSavingCustomer(false);
		}
	}
	async function handleDeleteRequest() {
		if (!window.confirm(`Delete this request from ${inquiry.customer_name}?\n\nThis cannot be undone.`)) return;
		try {
			toast.loading("Deleting request...", { id: "delete-inquiry" });
			const { error } = await supabase.from("inquiries").delete().eq("id", inquiry.id);
			if (error) throw error;
			toast.success("Request deleted.", { id: "delete-inquiry" });
			onBack();
		} catch (error) {
			console.error(error);
			toast.error(error instanceof Error ? error.message : "Could not delete request.", { id: "delete-inquiry" });
		}
	}
	const [portalCopied, setPortalCopied] = (0, import_react.useState)(false);
	async function copyCustomerPortal() {
		if (!inquiry.customer_link) return;
		try {
			await navigator.clipboard.writeText(inquiry.customer_link);
			setPortalCopied(true);
			toast.success("Customer portal link copied.");
			setTimeout(() => {
				setPortalCopied(false);
			}, 2e3);
		} catch {
			toast.error("Could not copy the portal link.");
		}
	}
	async function handleGeneratePortal() {
		if (editingPrice) await savePrice();
		await onGenerateCustomerLink();
	}
	const [showConversationEmail, setShowConversationEmail] = (0, import_react.useState)(false);
	const [conversationSubject, setConversationSubject] = (0, import_react.useState)("Let's talk about your commission");
	const [conversationBody, setConversationBody] = (0, import_react.useState)(`Hi ${inquiry.customer_name},

Thank you for reaching out about your commission. I've reviewed your request and would love to discuss it with you.

We can talk in whichever way is easiest for you - phone, WhatsApp, or email. Feel free to reach out and we can discuss your idea, requirements and next steps.

Looking forward to hearing from you.

Regards,
Kamlesh Sahoo
Painttheory`);
	const [sendingConversationEmail, setSendingConversationEmail] = (0, import_react.useState)(false);
	async function sendConversationEmail() {
		try {
			if (!conversationSubject.trim()) {
				toast.error("Email subject is required.");
				return;
			}
			if (!conversationBody.trim()) {
				toast.error("Email body is required.");
				return;
			}
			setSendingConversationEmail(true);
			toast.loading("Sending email...", { id: "commission-email" });
			const { error } = await supabase.functions.invoke("send-email", { body: {
				inquiryId: inquiry.id,
				template: "commission-conversation",
				subject: conversationSubject,
				body: conversationBody
			} });
			if (error) throw error;
			toast.success("Conversation email sent.", { id: "commission-email" });
			setShowConversationEmail(false);
		} catch (error) {
			console.error(error);
			toast.error(error instanceof Error ? error.message : "Failed to send email.", { id: "commission-email" });
		} finally {
			setSendingConversationEmail(false);
		}
	}
	const [showPurchaseEmail, setShowPurchaseEmail] = (0, import_react.useState)(false);
	const [purchaseEmail, setPurchaseEmail] = (0, import_react.useState)(null);
	async function previewPurchaseEmail() {
		try {
			const { data, error } = await supabase.functions.invoke("send-email", { body: {
				inquiryId: inquiry.id,
				template: "request-payment",
				action: "preview"
			} });
			if (error) throw error;
			if (!data?.html) throw new Error("Email preview was not generated.");
			setPurchaseEmail({
				subject: data.subject,
				html: data.html
			});
			setShowPurchaseEmail(true);
		} catch (error) {
			console.error(error);
			toast.error(error instanceof Error ? error.message : "Could not generate email preview.");
		}
	}
	async function handleUpdateStatus() {
		if (!pendingStatus) {
			toast.error("Select a status first.");
			return;
		}
		if (pendingStatus === effectiveStatus) {
			toast.message("This is already the current status.");
			return;
		}
		await onChangeStatus(pendingStatus);
	}
	const currentWorkflowIndex = getWorkflowIndex$1(effectiveStatus);
	const logs = (0, import_react.useMemo)(() => {
		return [
			{
				key: "created_at",
				value: inquiry.created_at
			},
			...WORKFLOW$1.map((item) => ({
				key: item.timestamp,
				value: inquiry[item.timestamp]
			})),
			{
				key: "payment_submitted_at",
				value: inquiry.payment_submitted_at
			},
			{
				key: "address_submitted_at",
				value: inquiry.address_submitted_at
			},
			{
				key: "communication_sent_at",
				value: inquiry.communication_sent_at
			}
		].filter((item) => item.value).sort((a, b) => new Date(a.value).getTime() - new Date(b.value).getTime());
	}, [inquiry]);
	isCommission && (loadingPayments || commissionPayments.length === 0 || commissionPayments.map((payment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium text-foreground",
						children: ["Payment ", payment.payment_number]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${payment.status === "PAID" ? "bg-foreground text-background" : payment.status === "REQUESTED" ? "bg-secondary text-foreground" : "border border-border text-muted-foreground"}`,
						children: payment.status
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-xl text-foreground",
					children: formatPrice(Number(payment.amount))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-xs text-muted-foreground",
					children: payment.status === "PAID" ? `Paid ${formatDate$2(payment.paid_at)}` : payment.requested_at ? `Requested ${formatDate$2(payment.requested_at)}` : "Not requested yet"
				})
			]
		}), payment.customer_link && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex shrink-0 items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: payment.customer_link,
				target: "_blank",
				rel: "noreferrer",
				className: "max-w-[220px] truncate text-xs text-muted-foreground hover:text-foreground hover:underline",
				children: payment.customer_link
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => copyPaymentLink(payment.customer_link),
				className: "inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
				title: "Copy payment link",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" })
			})]
		})]
	}, payment.id)), formatPrice(totalRequested), formatPrice(totalPaid), formatPrice(remainingAmount), creatingPayment || `${nextPaymentNumber}`);
	const displayAddress = [
		inquiry.shipping_address_line1,
		inquiry.shipping_address_line2,
		[inquiry.shipping_city, inquiry.shipping_state].filter(Boolean).join(", "),
		inquiry.shipping_pincode,
		inquiry.shipping_landmark ? `Landmark: ${inquiry.shipping_landmark}` : null
	].filter(Boolean).join("\n");
	const phoneNumber = customerPhone.replace(/\D/g, "");
	const callUrl = phoneNumber ? `tel:${phoneNumber}` : "#";
	const safeWhatsappUrl = whatsappUrl || (phoneNumber ? `https://wa.me/${phoneNumber}` : "#");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-9",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "border-b border-border pb-5 sm:pb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onBack,
							className: "mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back to inquiries"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "max-w-full break-words font-display text-2xl leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl",
										children: isCommission ? "Commission request" : artwork?.title ?? "Artwork inquiry"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: effectiveStatus })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1.5 text-xs text-muted-foreground sm:text-sm",
									children: ["Received ", receivedDate]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 sm:block sm:text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground",
									children: "Reference"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-foreground",
									children: inquiry.order_number ?? inquiry.id.slice(0, 8)
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "border-b border-border py-6 lg:border-r lg:py-7 lg:pr-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: isCommission ? "Request details" : "Artwork details"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 space-y-5",
								children: [!isCommission && artwork && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow$1, {
										label: "Title",
										value: artwork.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 gap-5 min-[420px]:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow$1, {
											label: "Medium",
											value: artwork.medium || "Not specified"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow$1, {
											label: "Dimensions",
											value: artwork.dimensions || "Not specified"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground",
											children: "Price"
										}), !editingPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setEditingPrice(true),
											className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3" }), "Edit"]
										})]
									}), editingPrice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex w-full max-w-md items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground",
													children: "₹"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: priceValue,
													onChange: (event) => setPriceValue(event.target.value),
													inputMode: "decimal",
													className: "h-9 pl-8"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												onClick: savePrice,
												disabled: savingPrice,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "hidden xs:inline",
													children: "Save"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "ghost",
												onClick: () => {
													setPriceValue(String(inquiry.artwork_price_snapshot ?? artwork.price ?? requestedPrice ?? ""));
													setEditingPrice(false);
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 font-display text-2xl text-foreground",
										children: formatPrice(Number(priceValue))
									})] })
								] }), isCommission && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow$1, {
										label: "Request type",
										value: "Custom commission"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground",
										children: "Customer message"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 whitespace-pre-wrap text-sm leading-6 text-foreground",
										children: customerMessage || "No message provided."
									})] }),
									inquiry.description && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground",
										children: "Description"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground",
										children: inquiry.description
									})] })
								] })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "border-b border-border py-6 lg:border-b-0 lg:py-7 lg:pl-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Customer details"
								}), !editingCustomer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setEditingCustomer(true),
									className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3" }), "Edit"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setEditingCustomer(false),
									className: "text-xs text-muted-foreground hover:text-foreground",
									children: "Cancel"
								})]
							}), editingCustomer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 space-y-3.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditField$1, {
										label: "Name",
										value: customerName,
										onChange: setCustomerName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditField$1, {
										label: "Email",
										type: "email",
										value: customerEmail,
										onChange: setCustomerEmail
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditField$1, {
										label: "Phone",
										value: customerPhone,
										onChange: setCustomerPhone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-normal text-muted-foreground",
										children: "Address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 space-y-2.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "h-9",
												placeholder: "Address line 1",
												value: addressLine1,
												onChange: (event) => setAddressLine1(event.target.value)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "h-9",
												placeholder: "Address line 2",
												value: addressLine2,
												onChange: (event) => setAddressLine2(event.target.value)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													className: "h-9",
													placeholder: "City",
													value: city,
													onChange: (event) => setCity(event.target.value)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													className: "h-9",
													placeholder: "State",
													value: state,
													onChange: (event) => setState(event.target.value)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													className: "h-9",
													placeholder: "PIN",
													value: pincode,
													onChange: (event) => setPincode(event.target.value)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													className: "h-9",
													placeholder: "Landmark",
													value: landmark,
													onChange: (event) => setLandmark(event.target.value)
												})]
											})
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										onClick: saveCustomerDetails,
										disabled: savingCustomer,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5" }), savingCustomer ? "Saving..." : "Save"]
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow$1, {
										label: "Name",
										value: inquiry.customer_name || "Not provided"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow$1, {
										label: "Email",
										value: inquiry.customer_email || "Not provided"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow$1, {
										label: "Phone",
										value: inquiry.customer_phone || "Not provided"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground",
										children: "Address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 whitespace-pre-line break-words text-sm leading-6 text-foreground",
										children: displayAddress || "Not received yet"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground",
										children: "Customer message"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground",
										children: customerMessage || "No message provided."
									})] })
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border-b border-border py-6 sm:py-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Actions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-normal text-muted-foreground",
									children: "Update status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex w-full max-w-xl flex-col gap-2 min-[420px]:flex-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: pendingStatus,
										onChange: (event) => onPendingStatusChange(event.target.value),
										className: "h-10 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-foreground",
										children: STATUS_OPTIONS$1.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: status,
											children: formatStatus$1(status)
										}, status))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										className: "h-10 min-[420px]:shrink-0",
										onClick: handleUpdateStatus,
										children: "Update status"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-col gap-2.5 min-[420px]:flex-row min-[420px]:items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									className: "h-9 justify-center rounded-lg",
									onClick: handleGeneratePortal,
									disabled: effectiveStatus === "NEW",
									children: "Generate Customer Portal"
								}), inquiry.customer_link && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: copyCustomerPortal,
									className: "inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border px-3 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
									children: [portalCopied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), portalCopied ? "Copied" : "Copy portal"]
								})]
							}),
							inquiry.customer_link && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: inquiry.customer_link,
								target: "_blank",
								rel: "noreferrer",
								className: "mt-2 block max-w-full truncate text-xs text-muted-foreground hover:text-foreground hover:underline",
								children: inquiry.customer_link
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-7",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground",
									children: "Workflow"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 max-w-xl space-y-1",
									children: WORKFLOW$1.map((step, index) => {
										const completed = index <= currentWorkflowIndex;
										const timestamp = inquiry[step.timestamp];
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative flex min-h-9 items-center gap-3",
											children: [
												index < WORKFLOW$1.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute left-[11px] top-7 h-5 w-px ${index < currentWorkflowIndex ? "bg-foreground" : "bg-border"}` }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border ${completed ? "border-foreground bg-foreground text-background" : "border-border bg-background text-transparent"}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: `min-w-0 flex-1 text-sm ${completed ? "text-foreground" : "text-muted-foreground"}`,
													children: step.label
												}),
												timestamp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "hidden shrink-0 text-right text-[11px] text-muted-foreground min-[480px]:block",
													children: formatDate$2(timestamp)
												})
											]
										}, step.key);
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border-b border-border py-6 sm:py-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Logs"
						}), logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted-foreground",
							children: "No activity recorded yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 max-w-xl space-y-3.5",
							children: logs.map((log, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-border",
									children: log.key === "created_at" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-3 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-muted-foreground" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-foreground",
										children: getLogLabel$1(log.key)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-xs text-muted-foreground",
										children: formatDate$2(log.value)
									})]
								})]
							}, `${log.key}-${index}`))
						})]
					}),
					!isCommission && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border-b border-border py-6 sm:py-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Purchase"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid grid-cols-1 gap-5 min-[520px]:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow$1, {
										label: "Price",
										value: formatPrice(Number(priceValue))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow$1, {
										label: "Payment",
										value: inquiry.payment_status ?? "PENDING"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow$1, {
										label: "Paid at",
										value: inquiry.paid_at ? formatDate$2(inquiry.paid_at) : "Not recorded"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow$1, {
										label: "Address received",
										value: inquiry.address_received_at ? formatDate$2(inquiry.address_received_at) : "Not recorded"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow$1, {
										label: "Shipped",
										value: inquiry.shipped_at ? formatDate$2(inquiry.shipped_at) : "Not recorded"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow$1, {
										label: "Delivered",
										value: inquiry.delivered_at ? formatDate$2(inquiry.delivered_at) : "Not recorded"
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "border-b border-border py-6 sm:py-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Communication"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [
									"Contact",
									" ",
									customerName || inquiry.customer_name || "customer",
									" ",
									"using whichever method is convenient."
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-2 sm:flex sm:shrink-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											if (isCommission) {
												setShowConversationEmail(true);
												return;
											}
											if (!inquiry.customer_link) {
												toast.error("Generate the customer portal first.");
												return;
											}
											previewPurchaseEmail();
										},
										className: "inline-flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg border border-border px-2 text-xs text-foreground transition-colors hover:bg-secondary sm:px-3 sm:text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5 shrink-0 sm:size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Email" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: callUrl,
										onClick: (event) => {
											if (!phoneNumber) {
												event.preventDefault();
												toast.error("Customer phone number is not available.");
											}
										},
										className: "inline-flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg border border-border px-2 text-xs text-foreground transition-colors hover:bg-secondary sm:px-3 sm:text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5 shrink-0 sm:size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Call" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: safeWhatsappUrl,
										target: "_blank",
										rel: "noreferrer",
										onClick: (event) => {
											if (!phoneNumber) {
												event.preventDefault();
												toast.error("Customer phone number is not available.");
											}
										},
										className: "inline-flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg border border-border px-2 text-xs text-foreground transition-colors hover:bg-secondary sm:px-3 sm:text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm leading-none",
											children: "◌"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											children: "WhatsApp"
										})]
									})
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border-b border-border py-6 sm:py-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Artist notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								className: "h-8 px-2.5 text-xs",
								onClick: onSaveNotes,
								disabled: savingNotes,
								children: savingNotes ? "Saving..." : "Save"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: artistNotes,
							onChange: (event) => onArtistNotesChange(event.target.value),
							placeholder: "Private note...",
							rows: 2,
							className: "mt-3 resize-none border-border bg-secondary/20 shadow-none focus-visible:ring-1"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							className: "h-8 px-2 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive",
							onClick: handleDeleteRequest,
							children: "Delete request"
						})
					})
				]
			}),
			isCommission && showConversationEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-[94dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-border bg-card shadow-lift sm:h-auto sm:max-h-[90vh] sm:max-w-3xl sm:rounded-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-start justify-between border-b border-border px-4 py-4 sm:px-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Email preview"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-display text-lg sm:text-xl",
								children: "Start conversation"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								className: "h-8",
								onClick: () => setShowConversationEmail(false),
								children: "Close"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-h-0 flex-1 overflow-y-auto p-4 sm:p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "To" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: `${inquiry.customer_name} <${inquiry.customer_email}>`,
									readOnly: true,
									className: "mt-1.5 bg-secondary/30"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Subject" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: conversationSubject,
										onChange: (event) => setConversationSubject(event.target.value),
										className: "mt-1.5"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Message" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										value: conversationBody,
										onChange: (event) => setConversationBody(event.target.value),
										rows: 12,
										className: "mt-1.5"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 gap-2 border-t border-border px-4 py-3 sm:justify-end sm:px-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								className: "flex-1 sm:flex-none",
								onClick: () => setShowConversationEmail(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								className: "flex-1 sm:flex-none",
								onClick: sendConversationEmail,
								disabled: sendingConversationEmail,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }), sendingConversationEmail ? "Sending..." : "Send email"]
							})]
						})
					]
				})
			}),
			!isCommission && showPurchaseEmail && purchaseEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-[96dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-border bg-card shadow-lift sm:h-auto sm:max-h-[92vh] sm:max-w-4xl sm:rounded-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center justify-between border-b border-border px-4 py-4 sm:px-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Email preview"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-display text-lg sm:text-xl",
								children: "Purchase email"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								className: "h-8",
								onClick: () => setShowPurchaseEmail(false),
								children: "Close"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shrink-0 border-b border-border px-4 py-3 sm:px-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "To"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "break-all text-sm",
									children: [
										inquiry.customer_name,
										" ",
										"<",
										inquiry.customer_email,
										">"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted-foreground",
									children: "Subject"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "break-words text-sm",
									children: purchaseEmail.subject
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-0 flex-1 overflow-auto bg-secondary/30 p-2 sm:p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
								title: "Purchase email preview",
								srcDoc: purchaseEmail.html,
								sandbox: "",
								className: "mx-auto min-h-[620px] w-full max-w-[680px] border-0 bg-white sm:rounded-lg sm:shadow-soft"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 gap-2 border-t border-border px-4 py-3 sm:justify-end sm:px-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								className: "flex-1 sm:flex-none",
								onClick: () => setShowPurchaseEmail(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								className: "flex-1 sm:flex-none",
								onClick: async () => {
									await onSendEmail();
									setShowPurchaseEmail(false);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }), "Send email"]
							})]
						})
					]
				})
			})
		]
	});
}
function InfoRow$1({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 break-words text-sm leading-6 text-foreground",
			children: value
		})]
	});
}
function EditField$1({ label, value, onChange, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		className: "text-xs font-normal text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		type,
		value,
		onChange: (event) => onChange(event.target.value),
		className: "mt-1.5 h-9"
	})] });
}
var STATUS_OPTIONS = [
	"NEW",
	"REVIEWED",
	"PAYMENT_REQUESTED",
	"PAID",
	"ADDRESS_RECEIVED",
	"SHIPPED",
	"DELIVERED",
	"DISCARDED"
];
var WORKFLOW = [
	{
		key: "REVIEWED",
		label: "Reviewed",
		timestamp: "reviewed_at"
	},
	{
		key: "PAYMENT_REQUESTED",
		label: "Payment requested",
		timestamp: "payment_requested_at"
	},
	{
		key: "PAID",
		label: "Paid",
		timestamp: "paid_at"
	},
	{
		key: "ADDRESS_RECEIVED",
		label: "Address received",
		timestamp: "address_received_at"
	},
	{
		key: "SHIPPED",
		label: "Shipped",
		timestamp: "shipped_at"
	},
	{
		key: "DELIVERED",
		label: "Delivered",
		timestamp: "delivered_at"
	}
];
function formatDate$1(date) {
	return formatDateTime(date) || "Not recorded";
}
function formatStatus(status) {
	return status.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
function getWorkflowIndex(status) {
	switch (status) {
		case "REVIEWED": return 0;
		case "PAYMENT_REQUESTED": return 1;
		case "PAID": return 2;
		case "ADDRESS_RECEIVED": return 3;
		case "SHIPPED": return 4;
		case "DELIVERED": return 5;
		default: return -1;
	}
}
function getLogLabel(key) {
	switch (key) {
		case "created_at": return "Request received";
		case "reviewed_at": return "Reviewed";
		case "payment_requested_at": return "Payment requested";
		case "paid_at": return "Payment completed";
		case "address_submitted_at": return "Address submitted";
		case "address_received_at": return "Address received";
		case "communication_sent_at": return "Communication sent";
		case "shipped_at": return "Shipped";
		case "delivered_at": return "Delivered";
		default: return key;
	}
}
function formatPrice$1(amount) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(amount ?? 0);
}
function CommissionReview({ inquiry }) {
	const navigate = useNavigate();
	const [editingCustomer, setEditingCustomer] = (0, import_react.useState)(false);
	const [savingCustomer, setSavingCustomer] = (0, import_react.useState)(false);
	const [customerName, setCustomerName] = (0, import_react.useState)(inquiry.customer_name ?? "");
	const [customerEmail, setCustomerEmail] = (0, import_react.useState)(inquiry.customer_email ?? "");
	const [customerPhone, setCustomerPhone] = (0, import_react.useState)(inquiry.customer_phone ?? "");
	const [addressLine1, setAddressLine1] = (0, import_react.useState)(inquiry.shipping_address_line1 ?? "");
	const [addressLine2, setAddressLine2] = (0, import_react.useState)(inquiry.shipping_address_line2 ?? "");
	const [city, setCity] = (0, import_react.useState)(inquiry.shipping_city ?? "");
	const [state, setState] = (0, import_react.useState)(inquiry.shipping_state ?? "");
	const [pincode, setPincode] = (0, import_react.useState)(inquiry.shipping_pincode ?? "");
	const [landmark, setLandmark] = (0, import_react.useState)(inquiry.shipping_landmark ?? "");
	(0, import_react.useEffect)(() => {
		setCustomerName(inquiry.customer_name ?? "");
		setCustomerEmail(inquiry.customer_email ?? "");
		setCustomerPhone(inquiry.customer_phone ?? "");
		setAddressLine1(inquiry.shipping_address_line1 ?? "");
		setAddressLine2(inquiry.shipping_address_line2 ?? "");
		setCity(inquiry.shipping_city ?? "");
		setState(inquiry.shipping_state ?? "");
		setPincode(inquiry.shipping_pincode ?? "");
		setLandmark(inquiry.shipping_landmark ?? "");
	}, [
		inquiry.id,
		inquiry.customer_name,
		inquiry.customer_email,
		inquiry.customer_phone,
		inquiry.shipping_address_line1,
		inquiry.shipping_address_line2,
		inquiry.shipping_city,
		inquiry.shipping_state,
		inquiry.shipping_pincode,
		inquiry.shipping_landmark
	]);
	async function saveCustomerDetails() {
		if (!customerName.trim()) {
			toast.error("Customer name is required.");
			return;
		}
		if (!customerEmail.trim()) {
			toast.error("Customer email is required.");
			return;
		}
		if (!customerPhone.trim()) {
			toast.error("Customer phone is required.");
			return;
		}
		try {
			setSavingCustomer(true);
			const { error } = await supabase.from("inquiries").update({
				customer_name: customerName.trim(),
				customer_email: customerEmail.trim(),
				customer_phone: customerPhone.trim(),
				shipping_name: customerName.trim(),
				shipping_phone: customerPhone.trim(),
				shipping_address_line1: addressLine1.trim() || null,
				shipping_address_line2: addressLine2.trim() || null,
				shipping_city: city.trim() || null,
				shipping_state: state.trim() || null,
				shipping_pincode: pincode.trim() || null,
				shipping_landmark: landmark.trim() || null,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", inquiry.id);
			if (error) throw error;
			toast.success("Customer details updated.");
			setEditingCustomer(false);
		} catch (error) {
			console.error(error);
			toast.error(error instanceof Error ? error.message : "Could not save customer details.");
		} finally {
			setSavingCustomer(false);
		}
	}
	const [pendingStatus, setPendingStatus] = (0, import_react.useState)(inquiry.inquiry_status ?? "NEW");
	const effectiveStatus = inquiry.inquiry_status ?? "NEW";
	async function updateStatus() {
		if (!pendingStatus) {
			toast.error("Select a status first.");
			return;
		}
		if (pendingStatus === effectiveStatus) {
			toast.message("This is already the current status.");
			return;
		}
		try {
			await updateInquiryStatus(inquiry.id, pendingStatus);
			toast.success(`Status updated to ${formatStatus(pendingStatus)}.`);
			window.location.reload();
		} catch (error) {
			console.error(error);
			toast.error(error instanceof Error ? error.message : "Could not update status.");
		}
	}
	const [payments, setPayments] = (0, import_react.useState)([]);
	const [loadingPayments, setLoadingPayments] = (0, import_react.useState)(true);
	const [newPaymentAmount, setNewPaymentAmount] = (0, import_react.useState)("");
	const [isFinalPayment, setIsFinalPayment] = (0, import_react.useState)(false);
	const [creatingPayment, setCreatingPayment] = (0, import_react.useState)(false);
	async function loadPayments() {
		try {
			setLoadingPayments(true);
			const { data, error } = await supabase.from("commission_payments").select(`
          id,
          inquiry_id,
          payment_number,
          amount,
          status,
          customer_link,
          requested_at,
          paid_at,
          created_at
        `).eq("inquiry_id", inquiry.id).order("payment_number", { ascending: true });
			if (error) throw error;
			setPayments(data ?? []);
		} catch (error) {
			console.error(error);
			toast.error("Could not load commission payments.");
		} finally {
			setLoadingPayments(false);
		}
	}
	(0, import_react.useEffect)(() => {
		loadPayments();
	}, [inquiry.id]);
	const totalRequested = payments.reduce((total, payment) => total + Number(payment.amount || 0), 0);
	const totalPaid = payments.filter((payment) => payment.status === "PAID").reduce((total, payment) => total + Number(payment.amount || 0), 0);
	const remainingAmount = Math.max(totalRequested - totalPaid, 0);
	const nextPaymentNumber = payments.length > 0 ? Math.max(...payments.map((payment) => Number(payment.payment_number || 0))) + 1 : 1;
	async function createPayment() {
		const amount = Number(newPaymentAmount.replace(/,/g, "").trim());
		if (!Number.isFinite(amount) || amount <= 0) {
			toast.error("Enter a valid payment amount.");
			return;
		}
		try {
			setCreatingPayment(true);
			const { data: payment, error: insertError } = await supabase.from("commission_payments").insert({
				inquiry_id: inquiry.id,
				payment_number: nextPaymentNumber,
				amount,
				status: "PENDING",
				is_final: isFinalPayment
			}).select().single();
			if (insertError) throw insertError;
			const { data, error } = await supabase.functions.invoke("create-commission-payment-link", { body: { paymentId: payment.id } });
			if (error) throw error;
			if (!data?.success) throw new Error(data?.error ?? "Could not create payment link.");
			setNewPaymentAmount("");
			setIsFinalPayment(false);
			await loadPayments();
			toast.success(`Payment ${nextPaymentNumber} created.`);
		} catch (error) {
			console.error(error);
			toast.error(error instanceof Error ? error.message : "Could not create commission payment.");
		} finally {
			setCreatingPayment(false);
		}
	}
	async function copyPaymentLink(link) {
		try {
			await navigator.clipboard.writeText(link);
			toast.success("Payment link copied.");
		} catch {
			toast.error("Could not copy payment link.");
		}
	}
	function sendPaymentWhatsApp(payment) {
		if (!payment.customer_link) {
			toast.error("Payment link is not available.");
			return;
		}
		const phone = inquiry.customer_phone?.replace(/\D/g, "");
		if (!phone) {
			toast.error("Customer phone number is not available.");
			return;
		}
		const message = [
			`Hi ${inquiry.customer_name},`,
			``,
			`Here is the payment link for Payment ${payment.payment_number} of your commission.`,
			``,
			`Amount: ${formatPrice$1(Number(payment.amount))}`,
			``,
			payment.customer_link,
			``,
			`Please let me know once the payment is completed.`,
			``,
			`Regards,`,
			`Kamlesh Sahoo`
		].join("\n");
		window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
	}
	async function sendPaymentEmail(payment) {
		if (!payment.customer_link) {
			toast.error("Payment link is not available.");
			return;
		}
		try {
			toast.loading("Sending payment email...", { id: `payment-email-${payment.id}` });
			const { data, error } = await supabase.functions.invoke("send-email", { body: {
				inquiryId: inquiry.id,
				template: "commission-payment",
				paymentId: payment.id
			} });
			if (error) throw error;
			if (data?.success === false) throw new Error(data.error || "Failed to send payment email.");
			toast.success("Payment email sent successfully.", { id: `payment-email-${payment.id}` });
		} catch (error) {
			console.error(error);
			toast.error(error instanceof Error ? error.message : "Failed to send payment email.", { id: `payment-email-${payment.id}` });
		}
	}
	const [artistNotes, setArtistNotes] = (0, import_react.useState)(inquiry.artist_notes ?? "");
	const [savingNotes, setSavingNotes] = (0, import_react.useState)(false);
	async function saveArtistNotes() {
		try {
			setSavingNotes(true);
			const { error } = await supabase.from("inquiries").update({
				artist_notes: artistNotes,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", inquiry.id);
			if (error) throw error;
			toast.success("Private notes saved.");
		} catch (error) {
			console.error(error);
			toast.error(error instanceof Error ? error.message : "Could not save notes.");
		} finally {
			setSavingNotes(false);
		}
	}
	const phoneNumber = customerPhone.replace(/\D/g, "");
	const callUrl = phoneNumber ? `tel:${phoneNumber}` : "#";
	const whatsappUrl = phoneNumber ? `https://wa.me/${phoneNumber}` : "#";
	const [showEmail, setShowEmail] = (0, import_react.useState)(false);
	const [emailSubject, setEmailSubject] = (0, import_react.useState)("Let's talk about your commission");
	const [emailBody, setEmailBody] = (0, import_react.useState)(`Hi ${inquiry.customer_name},

Thank you for reaching out about your commission. I've reviewed your request and would love to discuss it with you.

We can talk in whichever way is easiest for you - phone, WhatsApp, or email. Feel free to reach out and we can discuss your idea, requirements and next steps.

Looking forward to hearing from you.

Regards,
Kamlesh Sahoo
Painttheory`);
	const [sendingEmail, setSendingEmail] = (0, import_react.useState)(false);
	async function sendEmail() {
		if (!emailSubject.trim()) {
			toast.error("Email subject is required.");
			return;
		}
		if (!emailBody.trim()) {
			toast.error("Email body is required.");
			return;
		}
		try {
			setSendingEmail(true);
			const { error } = await supabase.functions.invoke("send-email", { body: {
				inquiryId: inquiry.id,
				template: "commission-conversation",
				subject: emailSubject,
				body: emailBody
			} });
			if (error) throw error;
			toast.success("Conversation email sent.");
			setShowEmail(false);
		} catch (error) {
			console.error(error);
			toast.error(error instanceof Error ? error.message : "Failed to send email.");
		} finally {
			setSendingEmail(false);
		}
	}
	async function deleteRequest() {
		if (!window.confirm(`Delete this request from ${inquiry.customer_name}?\n\nThis cannot be undone.`)) return;
		try {
			const { error } = await supabase.from("inquiries").delete().eq("id", inquiry.id);
			if (error) throw error;
			toast.success("Request deleted.");
			navigate({ to: "/admin" });
		} catch (error) {
			console.error(error);
			toast.error(error instanceof Error ? error.message : "Could not delete request.");
		}
	}
	const displayAddress = [
		inquiry.shipping_address_line1,
		inquiry.shipping_address_line2,
		[inquiry.shipping_city, inquiry.shipping_state].filter(Boolean).join(", "),
		inquiry.shipping_pincode,
		inquiry.shipping_landmark ? `Landmark: ${inquiry.shipping_landmark}` : null
	].filter(Boolean).join("\n");
	const currentWorkflowIndex = getWorkflowIndex(effectiveStatus);
	const logs = (0, import_react.useMemo)(() => {
		return [
			{
				key: "created_at",
				value: inquiry.created_at
			},
			...WORKFLOW.map((item) => ({
				key: item.timestamp,
				value: inquiry[item.timestamp]
			})),
			{
				key: "address_submitted_at",
				value: inquiry.address_submitted_at
			},
			{
				key: "communication_sent_at",
				value: inquiry.communication_sent_at
			}
		].filter((item) => item.value).sort((a, b) => new Date(a.value).getTime() - new Date(b.value).getTime());
	}, [inquiry]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-9",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "border-b border-border pb-5 sm:pb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => navigate({ to: "/admin" }),
						className: "mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back to inquiries"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "max-w-full break-words font-display text-2xl leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl",
									children: "Commission request"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: effectiveStatus })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1.5 text-xs text-muted-foreground sm:text-sm",
								children: [
									"Received",
									" ",
									formatDate$1(inquiry.created_at)
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 sm:block sm:text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground",
								children: "Reference"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-foreground",
								children: inquiry.order_number ?? inquiry.id.slice(0, 8)
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border-b border-border py-6 lg:border-r lg:py-7 lg:pr-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Request details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
									label: "Request type",
									value: "Custom commission"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground",
									children: "Customer message"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 whitespace-pre-wrap text-sm leading-6 text-foreground",
									children: inquiry.note || "No message provided."
								})] }),
								inquiry.description && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground",
									children: "Description"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground",
									children: inquiry.description
								})] }),
								inquiry.budget && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
									label: "Budget",
									value: inquiry.budget
								}),
								inquiry.deadline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
									label: "Deadline",
									value: formatDate$1(inquiry.deadline)
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border-b border-border py-6 lg:border-b-0 lg:py-7 lg:pl-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Customer details"
							}), !editingCustomer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setEditingCustomer(true),
								className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3" }), "Edit"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setEditingCustomer(false),
								className: "text-xs text-muted-foreground hover:text-foreground",
								children: "Cancel"
							})]
						}), editingCustomer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 space-y-3.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditField, {
									label: "Name",
									value: customerName,
									onChange: setCustomerName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditField, {
									label: "Email",
									type: "email",
									value: customerEmail,
									onChange: setCustomerEmail
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditField, {
									label: "Phone",
									value: customerPhone,
									onChange: setCustomerPhone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-normal text-muted-foreground",
									children: "Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 space-y-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											className: "h-9",
											placeholder: "Address line 1",
											value: addressLine1,
											onChange: (event) => setAddressLine1(event.target.value)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											className: "h-9",
											placeholder: "Address line 2",
											value: addressLine2,
											onChange: (event) => setAddressLine2(event.target.value)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "h-9",
												placeholder: "City",
												value: city,
												onChange: (event) => setCity(event.target.value)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "h-9",
												placeholder: "State",
												value: state,
												onChange: (event) => setState(event.target.value)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "h-9",
												placeholder: "PIN",
												value: pincode,
												onChange: (event) => setPincode(event.target.value)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "h-9",
												placeholder: "Landmark",
												value: landmark,
												onChange: (event) => setLandmark(event.target.value)
											})]
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: saveCustomerDetails,
									disabled: savingCustomer,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5" }), savingCustomer ? "Saving..." : "Save"]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
									label: "Name",
									value: inquiry.customer_name || "Not provided"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
									label: "Email",
									value: inquiry.customer_email || "Not provided"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
									label: "Phone",
									value: inquiry.customer_phone || "Not provided"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground",
									children: "Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 whitespace-pre-line break-words text-sm leading-6 text-foreground",
									children: displayAddress || "Not received yet"
								})] })
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border-b border-border py-6 sm:py-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Actions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs font-normal text-muted-foreground",
								children: "Update status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex w-full max-w-xl flex-col gap-2 min-[420px]:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: pendingStatus,
									onChange: (event) => setPendingStatus(event.target.value),
									className: "h-10 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-foreground",
									children: STATUS_OPTIONS.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: status,
										children: formatStatus(status)
									}, status))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									className: "h-10 min-[420px]:shrink-0",
									onClick: updateStatus,
									children: "Update status"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground",
								children: "Workflow"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 max-w-xl space-y-1",
								children: WORKFLOW.map((step, index) => {
									const completed = index <= currentWorkflowIndex;
									const timestamp = inquiry[step.timestamp];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative flex min-h-9 items-center gap-3",
										children: [
											index < WORKFLOW.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute left-[11px] top-7 h-5 w-px ${index < currentWorkflowIndex ? "bg-foreground" : "bg-border"}` }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border ${completed ? "border-foreground bg-foreground text-background" : "border-border bg-background text-transparent"}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: `min-w-0 flex-1 text-sm ${completed ? "text-foreground" : "text-muted-foreground"}`,
												children: step.label
											}),
											timestamp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden shrink-0 text-right text-[11px] text-muted-foreground min-[480px]:block",
												children: formatDate$1(timestamp)
											})
										]
									}, step.key);
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border-b border-border py-6 sm:py-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Payments"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Track individual commission payments."
						})] }),
						loadingPayments ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-sm text-muted-foreground",
							children: "Loading payments..."
						}) : payments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-sm text-muted-foreground",
							children: "No payments created yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 max-w-2xl divide-y divide-border",
							children: payments.map((payment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm font-medium text-foreground",
												children: [
													"Payment",
													" ",
													payment.payment_number
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${payment.status === "PAID" ? "bg-foreground text-background" : payment.status === "REQUESTED" ? "bg-secondary text-foreground" : "border border-border text-muted-foreground"}`,
												children: payment.status
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-display text-xl text-foreground",
											children: formatPrice$1(Number(payment.amount))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 text-xs text-muted-foreground",
											children: payment.status === "PAID" ? `Paid ${formatDate$1(payment.paid_at)}` : payment.requested_at ? `Requested ${formatDate$1(payment.requested_at)}` : "Not requested yet"
										})
									]
								}), payment.customer_link && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: payment.customer_link,
											target: "_blank",
											rel: "noreferrer",
											className: "text-xs text-muted-foreground hover:text-foreground hover:underline",
											children: "Open payment link"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => copyPaymentLink(payment.customer_link),
											className: "inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs text-foreground transition-colors hover:bg-secondary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), "Copy"]
										}),
										payment.status !== "PAID" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => sendPaymentWhatsApp(payment),
											className: "inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs text-foreground transition-colors hover:bg-secondary",
											children: "WhatsApp"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => sendPaymentEmail(payment),
											className: "inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs text-foreground transition-colors hover:bg-secondary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5" }), "Email"]
										})] })
									]
								})]
							}, payment.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid grid-cols-1 gap-4 border-t border-border pt-5 min-[480px]:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
									label: "Total requested",
									value: formatPrice$1(totalRequested)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
									label: "Total paid",
									value: formatPrice$1(totalPaid)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
									label: "Remaining",
									value: formatPrice$1(remainingAmount)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 max-w-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "text-xs font-normal text-muted-foreground",
									children: ["Create payment ", nextPaymentNumber]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-col gap-2 min-[420px]:flex-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground",
											children: "₹"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: newPaymentAmount,
											onChange: (event) => setNewPaymentAmount(event.target.value),
											inputMode: "decimal",
											placeholder: "Payment amount",
											className: "h-10 pl-8"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										className: "h-10 min-[420px]:shrink-0",
										onClick: createPayment,
										disabled: creatingPayment,
										children: creatingPayment ? "Creating..." : `Create payment ${nextPaymentNumber}`
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "mt-3 flex cursor-pointer items-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: isFinalPayment,
										onChange: (event) => setIsFinalPayment(event.target.checked),
										className: "mt-0.5 size-4 accent-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm text-foreground",
										children: "Final payment"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs leading-5 text-muted-foreground",
										children: "After this payment is completed, the customer will be asked to provide their shipping address."
									})] })]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border-b border-border py-6 sm:py-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Logs"
					}), logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted-foreground",
						children: "No activity recorded yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 max-w-xl space-y-3.5",
						children: logs.map((log, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-border",
								children: log.key === "created_at" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-3 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-muted-foreground" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-foreground",
									children: getLogLabel(log.key)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-xs text-muted-foreground",
									children: formatDate$1(log.value)
								})]
							})]
						}, `${log.key}-${index}`))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-b border-border py-6 sm:py-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Communication"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								"Contact",
								" ",
								customerName || inquiry.customer_name || "customer",
								" ",
								"using whichever method is convenient."
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-2 sm:flex sm:shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setShowEmail(true),
									className: "inline-flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg border border-border px-2 text-xs text-foreground transition-colors hover:bg-secondary sm:px-3 sm:text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5 shrink-0 sm:size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Email" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: callUrl,
									onClick: (event) => {
										if (!phoneNumber) {
											event.preventDefault();
											toast.error("Customer phone number is not available.");
										}
									},
									className: "inline-flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg border border-border px-2 text-xs text-foreground transition-colors hover:bg-secondary sm:px-3 sm:text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5 shrink-0 sm:size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Call" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: whatsappUrl,
									target: "_blank",
									rel: "noreferrer",
									onClick: (event) => {
										if (!phoneNumber) {
											event.preventDefault();
											toast.error("Customer phone number is not available.");
										}
									},
									className: "inline-flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg border border-border px-2 text-xs text-foreground transition-colors hover:bg-secondary sm:px-3 sm:text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm leading-none",
										children: "◌"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "WhatsApp" })]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border-b border-border py-6 sm:py-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Artist notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							className: "h-8 px-2.5 text-xs",
							onClick: saveArtistNotes,
							disabled: savingNotes,
							children: savingNotes ? "Saving..." : "Save"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: artistNotes,
						onChange: (event) => setArtistNotes(event.target.value),
						placeholder: "Private note...",
						rows: 2,
						className: "mt-3 resize-none border-border bg-secondary/20 shadow-none focus-visible:ring-1"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						className: "h-8 px-2 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive",
						onClick: deleteRequest,
						children: "Delete request"
					})
				})
			]
		}), showEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-[94dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-border bg-card shadow-lift sm:h-auto sm:max-h-[90vh] sm:max-w-3xl sm:rounded-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-start justify-between border-b border-border px-4 py-4 sm:px-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-lg sm:text-xl",
							children: "Start conversation"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							className: "h-8",
							onClick: () => setShowEmail(false),
							children: "Close"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-h-0 flex-1 overflow-y-auto p-4 sm:p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "To" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: `${inquiry.customer_name} <${inquiry.customer_email}>`,
								readOnly: true,
								className: "mt-1.5 bg-secondary/30"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Subject" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: emailSubject,
									onChange: (event) => setEmailSubject(event.target.value),
									className: "mt-1.5"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Message" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: emailBody,
									onChange: (event) => setEmailBody(event.target.value),
									rows: 12,
									className: "mt-1.5"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 gap-2 border-t border-border px-4 py-3 sm:justify-end sm:px-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							className: "flex-1 sm:flex-none",
							onClick: () => setShowEmail(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "flex-1 sm:flex-none",
							onClick: sendEmail,
							disabled: sendingEmail,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }), sendingEmail ? "Sending..." : "Send email"]
						})]
					})
				]
			})
		})]
	});
}
function InfoRow({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 break-words text-sm text-foreground",
			children: value
		})]
	});
}
function EditField({ label, value, onChange, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		className: "text-xs font-normal text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		type,
		value,
		onChange: (event) => onChange(event.target.value),
		className: "mt-1.5 h-9"
	})] });
}
function InquiryReview(props) {
	if (props.inquiry.inquiry_type === "COMMISSION") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommissionReview, { inquiry: props.inquiry });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtPurchaseReview, { ...props });
}
function formatDate(date) {
	return formatDateTime(date) || "Not recorded";
}
function formatPrice(price) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(price ?? 0);
}
function InquiryReviewPage() {
	const { inquiryId } = Route.useParams();
	const navigate = useNavigate();
	const [inquiry, setInquiry] = (0, import_react.useState)(null);
	const [pendingStatus, setPendingStatus] = (0, import_react.useState)("");
	const [artistNotes, setArtistNotes] = (0, import_react.useState)("");
	const [savingNotes, setSavingNotes] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		loadInquiry();
	}, [inquiryId]);
	(0, import_react.useEffect)(() => {
		if (!inquiry) return;
		setPendingStatus(getEffectiveInquiryStatus(inquiry));
		setArtistNotes(inquiry.artist_notes ?? "");
	}, [
		inquiry?.id,
		inquiry?.inquiry_status,
		inquiry?.artist_notes
	]);
	async function loadInquiry() {
		try {
			const data = await getInquiryById(inquiryId);
			setInquiry(data);
		} catch (err) {
			console.error(err);
			toast.error("Could not load inquiry");
		}
	}
	async function changeStatus(status) {
		try {
			await updateInquiryStatus(inquiry.id, status);
			await loadInquiry();
			toast.success(`Status updated to ${STATUS_LABELS[status] ?? status}`);
		} catch (err) {
			console.error(err);
			toast.error("Could not update status");
		}
	}
	async function saveNotes() {
		try {
			setSavingNotes(true);
			await updateArtistNotes(inquiry.id, artistNotes);
			await loadInquiry();
			toast.success("Private notes saved");
		} catch (err) {
			console.error(err);
			toast.error("Could not save notes");
		} finally {
			setSavingNotes(false);
		}
	}
	async function handleGenerateCustomerLink() {
		try {
			const updated = await generateCustomerLink(inquiry.id);
			setInquiry(updated);
			toast.success("Customer link generated.");
			return updated;
		} catch (err) {
			console.error(err);
			toast.error("Failed to generate customer link.");
			return null;
		}
	}
	const handleSendEmail = async () => {
		try {
			toast.loading("Sending email...", { id: "send-email" });
			const { data, error } = await supabase.functions.invoke("send-email", { body: {
				inquiryId: inquiry.id,
				template: "request-payment"
			} });
			if (error) throw error;
			toast.success("Email sent successfully!", { id: "send-email" });
			console.log(data);
		} catch (err) {
			console.error(err);
			toast.error(err instanceof Error ? err.message : "Failed to send email", { id: "send-email" });
		}
	};
	if (!inquiry) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-6 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Studio dashboard"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-3xl text-foreground",
				children: "Loading inquiry"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Pulling the request details from the studio records."
			})
		]
	});
	const isCommission = inquiry.inquiry_type === "COMMISSION";
	const artwork = inquiry.artworks;
	const requestedPrice = inquiryPrice(inquiry);
	const effectiveStatus = getEffectiveInquiryStatus(inquiry);
	const currentIndex = STATUS_FLOW.indexOf(effectiveStatus);
	const nextStatus = currentIndex >= 0 ? STATUS_FLOW[currentIndex + 1] : void 0;
	const receivedDate = formatDate(inquiry.created_at);
	const customerMessage = inquiry.note?.trim() || "No customer message was added with this inquiry.";
	const actionMessage = [
		`Hello ${inquiry.customer_name},`,
		``,
		`Thank you for your interest in "${artwork?.title}".`,
		``,
		`I'm delighted to let you know that your inquiry has been reviewed.`,
		``,
		`Artwork`,
		`${artwork?.title}`,
		``,
		`Reference`,
		`${inquiry.order_number ?? inquiry.id.slice(0, 8)}`,
		``,
		`Amount`,
		`₹${Number(inquiry.artwork_price_snapshot).toLocaleString("en-IN")}`,
		``,
		`Payment Link`,
		`${inquiry.customer_link ?? "Generating..."}`,
		``,
		`After completing your payment, please submit your shipping address using the link below.`,
		``,
		`Address Form`,
		`${inquiry.address_link ?? "Will be shared shortly."}`,
		``,
		`If you have any questions, feel free to reply to this message.`,
		``,
		`Regards,`,
		`Kamlesh Sahoo`
	].join("\n");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InquiryReview, {
		inquiry,
		artwork,
		isCommission,
		requestedPrice,
		effectiveStatus,
		nextStatus,
		receivedDate,
		customerMessage,
		whatsappUrl: `https://wa.me/${inquiry.customer_phone.replace(/\D/g, "")}?text=${encodeURIComponent(actionMessage)}`,
		customerAddress: [
			inquiry.shipping_name,
			`Phone: ${inquiry.shipping_phone}`,
			inquiry.shipping_address_line1,
			inquiry.shipping_address_line2,
			`${inquiry.shipping_city}, ${inquiry.shipping_state}, India`,
			inquiry.shipping_pincode && `PIN: ${inquiry.shipping_pincode}`,
			inquiry.shipping_landmark && `Landmark: ${inquiry.shipping_landmark}`
		].filter(Boolean).join("\n"),
		hasShippingAddress: !!inquiry.shipping_address_line1 || !!inquiry.shipping_city || !!inquiry.shipping_pincode,
		pendingStatus,
		artistNotes,
		savingNotes,
		onBack: () => navigate({ to: "/admin" }),
		onChangeStatus: changeStatus,
		onSaveNotes: saveNotes,
		onGenerateCustomerLink: handleGenerateCustomerLink,
		onSendEmail: handleSendEmail,
		onPendingStatusChange: setPendingStatus,
		onArtistNotesChange: setArtistNotes,
		formatPrice
	});
}
//#endregion
export { InquiryReviewPage as component };
