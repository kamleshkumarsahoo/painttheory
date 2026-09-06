import { t as supabase } from "./supabase-BYgwpyL6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer-feedback.service-C2NmmL7I.js
async function submitCustomerFeedback(input) {
	const { error } = await supabase.from("customer_feedback").insert({
		name: input.name.trim(),
		message: input.message.trim(),
		rating: input.rating,
		allow_publish: input.allowPublish
	});
	if (error) throw error;
}
async function getCustomerFeedback() {
	const { data, error } = await supabase.from("customer_feedback").select("id, name, message, rating, allow_publish, created_at").order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
}
async function deleteCustomerFeedback(id) {
	const { error } = await supabase.from("customer_feedback").delete().eq("id", id);
	if (error) throw error;
}
//#endregion
export { getCustomerFeedback as n, submitCustomerFeedback as r, deleteCustomerFeedback as t };
