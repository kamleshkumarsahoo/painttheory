import { a as __toESM } from "../_runtime.mjs";
import { i as getAllArtworks } from "./artwork.service-ZQxopihE.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/testxxx-DcROwS0j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TestPage() {
	const [artworks, setArtworks] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getAllArtworks().then(setArtworks);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { padding: 40 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Database Test" }), artworks.map((art) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { marginBottom: 20 },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: art.title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["₹", art.price] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: art.availability_status })
			]
		}, art.id))]
	});
}
//#endregion
export { TestPage as component };
