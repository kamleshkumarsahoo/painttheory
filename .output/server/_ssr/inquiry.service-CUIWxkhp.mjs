import { t as supabase } from "./supabase-BYgwpyL6.mjs";
import { t as v4 } from "../_libs/uuid.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inquiry.service-CUIWxkhp.js
var APP_TIME_ZONE = "Asia/Kolkata";
function formatDateTime(date) {
	if (!date) return "";
	return new Date(date).toLocaleString("en-IN", {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: APP_TIME_ZONE
	});
}
function formatDateOnly(date) {
	if (!date) return "";
	return new Date(date).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: APP_TIME_ZONE
	});
}
function getKolkataDateStamp(date = /* @__PURE__ */ new Date()) {
	const parts = new Intl.DateTimeFormat("en-CA", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		timeZone: APP_TIME_ZONE
	}).formatToParts(date);
	const value = (type) => parts.find((part) => part.type === type)?.value ?? "";
	return `${value("year")}${value("month")}${value("day")}`;
}
var STATUS_FLOW = [
	"NEW",
	"REVIEWED",
	"PAYMENT_REQUESTED",
	"PAID",
	"ADDRESS_RECEIVED",
	"SHIPPED",
	"DELIVERED"
];
var STATUS_LABELS = {
	NEW: "New",
	REVIEWED: "Reviewed",
	PAYMENT_REQUESTED: "Payment Requested",
	PAID: "Payment Received",
	ADDRESS_RECEIVED: "Address Received",
	SHIPPED: "Packed & Shipped",
	DELIVERED: "Delivered",
	DISCARDED: "Discarded"
};
[...STATUS_FLOW];
function statusIndex(status) {
	return STATUS_FLOW.indexOf(status);
}
function getEffectiveInquiryStatus(inquiry) {
	if (!inquiry) return "NEW";
	if (inquiry.inquiry_status === "DISCARDED") return "DISCARDED";
	if (inquiry.inquiry_status === "DELIVERED") return "DELIVERED";
	if (inquiry.shipped_at || inquiry.inquiry_status === "SHIPPED") return "SHIPPED";
	if (inquiry.address_received_at || inquiry.address_submitted_at || inquiry.inquiry_status === "ADDRESS_RECEIVED") return "ADDRESS_RECEIVED";
	if (inquiry.payment_status === "PAID" || inquiry.paid_at || inquiry.inquiry_status === "PAID") return "PAID";
	if (inquiry.payment_requested_at || inquiry.customer_link || inquiry.razorpay_payment_link || inquiry.inquiry_status === "PAYMENT_REQUESTED") return "PAYMENT_REQUESTED";
	if (inquiry.reviewed_at || inquiry.inquiry_status === "REVIEWED") return "REVIEWED";
	return "NEW";
}
var STATUS_DATE_FIELDS = {
	REVIEWED: "reviewed_at",
	PAYMENT_REQUESTED: "payment_requested_at",
	PAID: "paid_at",
	ADDRESS_RECEIVED: "address_received_at",
	SHIPPED: "shipped_at",
	DELIVERED: "delivered_at"
};
var LINK_EXPIRY_DAYS = 30;
var ARTWORK_MEDIA_SELECT = `
  id,
  role,
  sort_order,
  thumb_path,
  alt_text
`;
function createOrderNumber() {
	const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();
	return `KS-${getKolkataDateStamp()}-${randomPart}`;
}
function withStatusProgress(currentStatus, nextStatus, now = (/* @__PURE__ */ new Date()).toISOString()) {
	const updateData = { updated_at: now };
	const nextIndex = statusIndex(nextStatus);
	const currentIndex = statusIndex(currentStatus);
	if (nextStatus === "DISCARDED") {
		updateData.inquiry_status = "DISCARDED";
		updateData.link_expires_on = now;
		return updateData;
	}
	if (nextIndex >= 0 && nextIndex > currentIndex) updateData.inquiry_status = nextStatus;
	STATUS_FLOW.slice(1, nextIndex + 1).forEach((status) => {
		updateData[STATUS_DATE_FIELDS[status]] = now;
	});
	return updateData;
}
async function updateArtworkAvailability(artworkId, status) {
	const { error } = await supabase.from("artworks").update({ availability_status: status }).eq("id", artworkId);
	if (error) throw error;
}
async function createInquiry(inquiry) {
	let artworkPriceSnapshot = inquiry.artwork_price_snapshot;
	if (inquiry.artwork_id && artworkPriceSnapshot == null) {
		const { data: artwork, error: artworkError } = await supabase.from("artworks").select("price").eq("id", inquiry.artwork_id).single();
		if (artworkError) throw artworkError;
		artworkPriceSnapshot = artwork.price;
	}
	const { data, error } = await supabase.from("inquiries").insert({
		inquiry_type: inquiry.inquiry_type ?? "ART_PURCHASE",
		artwork_id: inquiry.artwork_id ?? null,
		artwork_price_snapshot: artworkPriceSnapshot ?? null,
		order_number: createOrderNumber(),
		customer_name: inquiry.customer_name.trim(),
		customer_email: inquiry.customer_email.trim(),
		customer_phone: inquiry.customer_phone.trim(),
		country: inquiry.country?.trim() || null,
		budget: inquiry.budget?.trim() || null,
		deadline: inquiry.deadline || null,
		note: inquiry.note?.trim() || null,
		inquiry_status: "NEW"
	}).select().single();
	if (error) throw error;
	return data;
}
async function getAllInquiries() {
	const { data, error } = await supabase.from("inquiries").select(`
      *,
      artworks (
        id,
        title,
        thumbnail_url,
        price,
        artwork_media!artwork_media_artwork_id_fkey (
          ${ARTWORK_MEDIA_SELECT}
        )
      )
    `).order("created_at", { ascending: false });
	if (error) throw error;
	return data;
}
async function getInquiryById(id) {
	const { data, error } = await supabase.from("inquiries").select(`
      *,
      artworks (
        id,
        title,
        thumbnail_url,
        price,
        medium,
        dimensions,
        availability_status,
        artwork_media!artwork_media_artwork_id_fkey (
          ${ARTWORK_MEDIA_SELECT}
        )
      )
    `).eq("id", id).single();
	if (error) throw error;
	return data;
}
async function updateArtistNotes(inquiryId, artistNotes) {
	const { data, error } = await supabase.from("inquiries").update({
		artist_notes: artistNotes,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", inquiryId).select().single();
	if (error) throw error;
	return data;
}
async function updateInquiryStatus(inquiryId, status) {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const { data: current, error: currentError } = await supabase.from("inquiries").select("inquiry_status").eq("id", inquiryId).single();
	if (currentError) throw currentError;
	const updateData = {
		...withStatusProgress(current.inquiry_status, status, now),
		inquiry_status: status
	};
	if (status === "PAID") {
		updateData.payment_status = "PAID";
		updateData.payment_submitted_at = now;
	}
	if (status === "DELIVERED") {
		const expiry = /* @__PURE__ */ new Date();
		expiry.setDate(expiry.getDate() + LINK_EXPIRY_DAYS);
		updateData.link_expires_on = expiry.toISOString();
	}
	const { data, error } = await supabase.from("inquiries").update(updateData).eq("id", inquiryId).select(`
      *,
      artworks (
        id,
        title,
        thumbnail_url,
        price,
        medium,
        dimensions,
        availability_status,
        artwork_media!artwork_media_artwork_id_fkey (
          ${ARTWORK_MEDIA_SELECT}
        )
      )
    `).single();
	if (error) throw error;
	if ((status === "SHIPPED" || status === "DELIVERED") && data.artwork_id) await updateArtworkAvailability(data.artwork_id, "SOLD");
	if (status === "DISCARDED" && data.artwork_id) await updateArtworkAvailability(data.artwork_id, "AVAILABLE");
	return data;
}
async function generateCustomerLink(inquiryId) {
	const token = v4();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const customerLink = `${window.location.origin}/order/${token}`;
	const { data: current, error: currentError } = await supabase.from("inquiries").select("inquiry_status").eq("id", inquiryId).single();
	if (currentError) throw currentError;
	const { data, error } = await supabase.from("inquiries").update({
		customer_token: token,
		customer_link: customerLink,
		link_expires_on: null,
		...withStatusProgress(current.inquiry_status, "PAYMENT_REQUESTED", now)
	}).eq("id", inquiryId).select(`
      *,
      artworks (
        id,
        title,
        thumbnail_url,
        price,
        medium,
        dimensions,
        availability_status,
        artwork_media!artwork_media_artwork_id_fkey (
          ${ARTWORK_MEDIA_SELECT}
        )
      )
    `).single();
	if (error) throw error;
	await updateArtworkAvailability(data.artwork_id, "RESERVED");
	return data;
}
async function getInquiryByToken(token) {
	const { data, error } = await supabase.rpc("get_customer_inquiry", { p_customer_token: token });
	if (error) throw error;
	return data;
}
async function saveShippingAddress(token, address) {
	const { data, error } = await supabase.rpc("save_customer_shipping", {
		p_customer_token: token,
		p_shipping_name: address.shipping_name,
		p_shipping_phone: address.shipping_phone,
		p_shipping_address_line1: address.shipping_address_line1,
		p_shipping_address_line2: address.shipping_address_line2,
		p_shipping_city: address.shipping_city,
		p_shipping_state: address.shipping_state,
		p_shipping_pincode: address.shipping_pincode,
		p_shipping_landmark: address.shipping_landmark
	});
	if (error) throw error;
	return data;
}
async function saveCommissionShippingAddress(paymentId, address) {
	const { data, error } = await supabase.rpc("save_commission_shipping", {
		p_payment_id: paymentId,
		p_shipping_name: address.shipping_name,
		p_shipping_phone: address.shipping_phone,
		p_shipping_address_line1: address.shipping_address_line1,
		p_shipping_address_line2: address.shipping_address_line2,
		p_shipping_city: address.shipping_city,
		p_shipping_state: address.shipping_state,
		p_shipping_pincode: address.shipping_pincode,
		p_shipping_landmark: address.shipping_landmark
	});
	if (error) throw error;
	return data;
}
//#endregion
export { formatDateTime as a, getEffectiveInquiryStatus as c, saveCommissionShippingAddress as d, saveShippingAddress as f, formatDateOnly as i, getInquiryById as l, updateInquiryStatus as m, STATUS_LABELS as n, generateCustomerLink as o, updateArtistNotes as p, createInquiry as r, getAllInquiries as s, STATUS_FLOW as t, getInquiryByToken as u };
