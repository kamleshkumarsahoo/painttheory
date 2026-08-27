//#region node_modules/.nitro/vite/services/ssr/assets/artwork-BcBh99Ev.js
function formatPrice(inr) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(inr);
}
//#endregion
export { formatPrice as t };
