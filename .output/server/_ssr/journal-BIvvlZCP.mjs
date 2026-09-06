import { a as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/@icons-pack/react-simple-icons+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-BQQ3Gu5O.mjs";
import { a as Trash2, c as SquarePen, f as Plus, m as PinOff, p as Pin } from "../_libs/lucide-react.mjs";
import { i as getAllJournal, n as deleteJournal, o as toggleJournalPinned } from "./journal.service-dNpgGlAg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal-BIvvlZCP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getPrimaryImage(entry) {
	return (entry.media.find((item) => item.role === "primary") ?? entry.media[0])?.mediumUrl ?? "/placeholder.jpg";
}
function AdminJournalPage() {
	const [entries, setEntries] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [deletingId, setDeletingId] = (0, import_react.useState)(null);
	const [pinningId, setPinningId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		getAllJournal().then(setEntries).catch(console.error).finally(() => setLoading(false));
	}, []);
	async function handleDelete(entry) {
		if (!window.confirm(`Delete "${entry.title}"?\n\nThis cannot be undone.`)) return;
		try {
			setDeletingId(entry.id);
			await deleteJournal(entry.id);
			setEntries((current) => current.filter((item) => item.id !== entry.id));
		} catch (error) {
			console.error(error);
			window.alert("Could not delete this journal. Please try again.");
		} finally {
			setDeletingId(null);
		}
	}
	async function handlePin(entry) {
		try {
			setPinningId(entry.id);
			const nextPinned = !entry.pinned;
			await toggleJournalPinned(entry.id, nextPinned);
			setEntries((current) => current.map((item) => item.id === entry.id ? {
				...item,
				pinned: nextPinned
			} : item));
		} catch (error) {
			console.error(error);
			window.alert("Could not update the homepage pin. Please try again.");
		} finally {
			setPinningId(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-6 py-10 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Studio journal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-4xl text-foreground",
					children: "Journal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Create, edit, and manage your studio journal."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/journal/new",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New journal"]
				})
			})]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-10 text-sm text-muted-foreground",
			children: "Loading journal…"
		}) : entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 rounded-2xl border border-dashed border-border px-6 py-16 text-center text-sm text-muted-foreground",
			children: "No journal entries yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
			children: entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "overflow-hidden rounded-2xl border border-border bg-card shadow-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: getPrimaryImage(entry),
						alt: entry.title,
						loading: "lazy",
						className: "aspect-[16/10] w-full object-cover"
					}), entry.pinned && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/90 px-3 py-1.5 text-[11px] font-medium backdrop-blur",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "size-3" }), "Pinned"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: entry.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-xl text-foreground",
							children: entry.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: [
								entry.location ?? "Studio",
								" ·",
								" ",
								entry.readTime,
								" min read"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									size: "sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/admin/journal/$journalId",
										params: { journalId: entry.id },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "size-3.5" }), "Edit"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: entry.pinned ? "secondary" : "outline",
									size: "sm",
									disabled: pinningId === entry.id,
									onClick: () => handlePin(entry),
									children: [entry.pinned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinOff, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "size-3.5" }), pinningId === entry.id ? "Saving…" : entry.pinned ? "Unpin" : "Pin"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "destructive",
									size: "sm",
									disabled: deletingId === entry.id,
									onClick: () => handleDelete(entry),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), deletingId === entry.id ? "Deleting…" : "Delete"]
								})
							]
						})
					]
				})]
			}, entry.id))
		})]
	});
}
//#endregion
export { AdminJournalPage as component };
