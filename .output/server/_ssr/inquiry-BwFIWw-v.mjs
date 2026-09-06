import { i as require_jsx_runtime } from "../_libs/@icons-pack/react-simple-icons+[...].mjs";
import { n as cn } from "./button-BQQ3Gu5O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inquiry-BwFIWw-v.js
var import_jsx_runtime = require_jsx_runtime();
var STATUS_STYLES = {
	NEW: "bg-accent/15 text-accent border-accent/30",
	REVIEWED: "bg-secondary text-secondary-foreground border-border",
	PAYMENT_REQUESTED: "bg-secondary text-secondary-foreground border-border",
	PAID: "bg-primary/10 text-primary border-primary/20",
	ADDRESS_RECEIVED: "bg-primary/10 text-primary border-primary/20",
	SHIPPED: "bg-primary/10 text-primary border-primary/20",
	DELIVERED: "bg-primary/10 text-primary border-primary/20",
	DISCARDED: "bg-destructive/10 text-destructive border-destructive/25"
};
function pretty(status) {
	return status.replaceAll("_", " ");
}
function StatusBadge({ status, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium", STATUS_STYLES[status] ?? "bg-muted text-muted-foreground border-border", className),
		children: [status === "NEW" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-1.5 rounded-full bg-accent",
			"aria-hidden": true
		}), pretty(status)]
	});
}
function inquiryPrice(inquiry) {
	return inquiry.artwork_price_snapshot ?? inquiry.artworks?.price ?? 0;
}
//#endregion
export { inquiryPrice as n, StatusBadge as t };
