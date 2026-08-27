import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Button } from "./button-0h_v-pWj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery._artworkId-CgKe_X8C.js
var import_jsx_runtime = require_jsx_runtime();
function ArtworkNotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-6 py-32 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Not on this wall"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-section mt-4 text-foreground",
				children: "This artwork couldn't be found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/gallery",
					children: "Back to gallery"
				})
			})
		]
	});
}
//#endregion
export { ArtworkNotFound as notFoundComponent };
