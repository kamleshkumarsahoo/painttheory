import { i as require_jsx_runtime } from "../_libs/@icons-pack/react-simple-icons+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Reveal-DhgqaqLa.js
var import_jsx_runtime = require_jsx_runtime();
var variants = {
	hidden: {
		opacity: 0,
		y: 28
	},
	visible: (i = 0) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: .8,
			delay: i * .08,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	})
};
/** Scroll-triggered fade-and-rise reveal used across the site. */
function Reveal({ children, className, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className,
		variants,
		custom: delay,
		initial: "hidden",
		whileInView: "visible",
		viewport: {
			once: true,
			margin: "-80px"
		},
		children
	});
}
//#endregion
export { Reveal as t };
