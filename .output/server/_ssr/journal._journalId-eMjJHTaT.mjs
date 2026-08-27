import { N as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getJournalById } from "./journal.service-dNpgGlAg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal._journalId-eMjJHTaT.js
var $$splitComponentImporter = () => import("./journal._journalId-Dw6nGzkA.mjs");
var $$splitNotFoundComponentImporter = () => import("./journal._journalId-CgpzeIuy.mjs");
var Route = createFileRoute("/journal/$journalId")({
	loader: async ({ params }) => {
		try {
			const journal = await getJournalById(params.journalId);
			if (!journal) throw notFound();
			return { journal };
		} catch {
			throw notFound();
		}
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Journal entry not found — Maison" }, {
			name: "robots",
			content: "noindex"
		}] };
		const { journal } = loaderData;
		return { meta: [{ title: `${journal.title} — Journal` }, {
			name: "description",
			content: journal.body.replace(/\s+/g, " ").slice(0, 155)
		}] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
