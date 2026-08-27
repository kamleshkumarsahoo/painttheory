import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal._journalId-CgpzeIuy.js
var import_jsx_runtime = require_jsx_runtime();
function JournalNotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-6 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label",
				children: "Journal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display mt-4 text-4xl",
				children: "This note couldn't be found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/journal",
				className: "link-underline mt-8 inline-block text-xs font-medium",
				children: "Back to journal →"
			})
		]
	});
}
//#endregion
export { JournalNotFound as notFoundComponent };
