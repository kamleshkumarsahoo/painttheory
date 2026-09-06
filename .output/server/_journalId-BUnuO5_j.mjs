import { a as __toESM } from "./_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "./_libs/@icons-pack/react-simple-icons+[...].mjs";
import { _ as useNavigate, v as useParams } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./_ssr/button-BQQ3Gu5O.mjs";
import { C as LoaderCircle, E as ImagePlus, R as ArrowLeft, a as Trash2, d as Save, t as X } from "./_libs/lucide-react.mjs";
import { a as getJournalById, c as uploadJournalMedia, r as deleteJournalMedia, s as updateJournal } from "./_ssr/journal.service-dNpgGlAg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_journalId-BUnuO5_j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EditJournalPage() {
	const navigate = useNavigate();
	const { journalId } = useParams({ from: "/admin/journal/$journalId" });
	const [journal, setJournal] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("Story");
	const [location, setLocation] = (0, import_react.useState)("");
	const [publishedAt, setPublishedAt] = (0, import_react.useState)("");
	const [readTime, setReadTime] = (0, import_react.useState)("5");
	const [body, setBody] = (0, import_react.useState)("");
	const [primaryFile, setPrimaryFile] = (0, import_react.useState)(null);
	const [secondaryFiles, setSecondaryFiles] = (0, import_react.useState)([]);
	const [deletingMediaId, setDeletingMediaId] = (0, import_react.useState)(null);
	const primaryInputRef = (0, import_react.useRef)(null);
	const secondaryInputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		async function loadJournal() {
			try {
				const data = await getJournalById(journalId);
				setJournal(data);
				setTitle(data.title);
				setCategory(data.category);
				setLocation(data.location ?? "");
				setPublishedAt(data.publishedAt ? new Date(data.publishedAt).toISOString().slice(0, 10) : "");
				setReadTime(String(data.readTime));
				setBody(data.body);
			} catch (err) {
				console.error(err);
				setError(err instanceof Error ? err.message : "Could not load journal.");
			} finally {
				setLoading(false);
			}
		}
		loadJournal();
	}, [journalId]);
	async function handleSave(event) {
		event.preventDefault();
		if (!title.trim()) {
			setError("Title is required.");
			return;
		}
		if (!body.trim()) {
			setError("Body is required.");
			return;
		}
		try {
			setSaving(true);
			setError("");
			await updateJournal(journalId, {
				title: title.trim(),
				body: body.trim(),
				location: location.trim() || null,
				published_at: (/* @__PURE__ */ new Date(`${publishedAt}T12:00:00`)).toISOString(),
				read_time: Number(readTime) || 5,
				category
			});
			if (primaryFile) {
				const currentPrimary = journal?.media.find((media) => media.role === "primary") ?? journal?.media[0];
				if (currentPrimary) await deleteJournalMedia(currentPrimary.id);
				await uploadJournalMedia({
					journalId,
					file: primaryFile,
					role: "primary",
					sortOrder: 0,
					altText: title.trim()
				});
			}
			for (let index = 0; index < secondaryFiles.length; index += 1) {
				const existingSecondaryCount = journal?.media.filter((media) => media.role === "secondary").length ?? 0;
				await uploadJournalMedia({
					journalId,
					file: secondaryFiles[index],
					role: "secondary",
					sortOrder: existingSecondaryCount + index + 1,
					altText: title.trim()
				});
			}
			await navigate({ to: "/admin/journal" });
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Could not update journal entry.");
		} finally {
			setSaving(false);
		}
	}
	async function handleDeleteMedia(media) {
		if (!window.confirm(media.role === "primary" ? "Delete the current primary photo?" : "Delete this secondary photo?")) return;
		try {
			setDeletingMediaId(media.id);
			setError("");
			await deleteJournalMedia(media.id);
			setJournal((current) => {
				if (!current) return current;
				return {
					...current,
					media: current.media.filter((item) => item.id !== media.id)
				};
			});
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Could not delete photo.");
		} finally {
			setDeletingMediaId(null);
		}
	}
	function handlePrimaryChange(event) {
		setPrimaryFile(event.target.files?.[0] ?? null);
		event.target.value = "";
	}
	function handleSecondaryChange(event) {
		const files = Array.from(event.target.files ?? []);
		setSecondaryFiles((current) => [...current, ...files]);
		event.target.value = "";
	}
	function removeSecondaryFile(index) {
		setSecondaryFiles((current) => current.filter((_, fileIndex) => fileIndex !== index));
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-5xl px-6 py-10 lg:px-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading journal…"
		})
	});
	const currentPrimary = journal?.media.find((media) => media.role === "primary") ?? journal?.media[0];
	const currentSecondary = journal?.media.filter((media) => media.role === "secondary").sort((a, b) => a.sortOrder - b.sortOrder) ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-6 py-10 lg:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => navigate({ to: "/admin/journal" }),
				className: "link-underline inline-flex items-center gap-2 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back to journal"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Studio journal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-4xl text-foreground",
					children: "Edit journal"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSave,
				className: "mt-8 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card p-6 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-5 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Title",
									value: title,
									onChange: setTitle,
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: "Category"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: category,
										onChange: (event) => setCategory(event.target.value),
										className: "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Commission",
												children: "Commission"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Story",
												children: "Story"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Process",
												children: "Process"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Location",
									value: location,
									onChange: setLocation,
									placeholder: "e.g. Bengaluru"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Read time (minutes)",
									value: readTime,
									onChange: setReadTime,
									type: "number"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Date",
									value: publishedAt,
									onChange: setPublishedAt,
									type: "date"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-5 block space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "Body"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: body,
								onChange: (event) => setBody(event.target.value),
								rows: 14,
								className: "w-full rounded-md border border-input bg-background px-3 py-3 text-sm leading-relaxed"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card p-6 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Primary photo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "Current main image."
								})] }), currentPrimary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "destructive",
									size: "sm",
									disabled: deletingMediaId === currentPrimary.id,
									onClick: () => handleDeleteMedia(currentPrimary),
									children: [deletingMediaId === currentPrimary.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Delete"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: primaryInputRef,
								type: "file",
								accept: "image/*",
								className: "hidden",
								onChange: handlePrimaryChange
							}),
							primaryFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mt-5 overflow-hidden rounded-2xl border border-border bg-secondary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: URL.createObjectURL(primaryFile),
									alt: primaryFile.name,
									className: "max-h-[420px] w-full object-contain"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-background/90 px-4 py-3 backdrop-blur",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate text-xs font-medium",
										children: ["New primary: ", primaryFile.name]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setPrimaryFile(null);
											if (primaryInputRef.current) primaryInputRef.current.value = "";
										},
										className: "ml-4 shrink-0 text-xs text-destructive hover:underline",
										children: "Cancel"
									})]
								})]
							}) : currentPrimary ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mt-5 overflow-hidden rounded-2xl border border-border bg-secondary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: currentPrimary.largeUrl,
									alt: currentPrimary.altText || journal?.title || "Primary photo",
									className: "max-h-[420px] w-full object-contain"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => primaryInputRef.current?.click(),
									className: "absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-background",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-3.5" }), "Replace"]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => primaryInputRef.current?.click(),
								className: "mt-5 flex w-full items-center justify-center rounded-2xl border border-dashed border-border px-6 py-16 text-center hover:bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "mx-auto size-7 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm font-medium",
									children: "Choose primary photo"
								})] })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card p-6 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Secondary photos"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "Delete photos you no longer want, or add new ones."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => secondaryInputRef.current?.click(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-3.5" }), "Add photos"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: secondaryInputRef,
								type: "file",
								accept: "image/*",
								multiple: true,
								className: "hidden",
								onChange: handleSecondaryChange
							}),
							currentSecondary.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4",
								children: currentSecondary.map((media) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative overflow-hidden rounded-xl border border-border bg-secondary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: media.mediumUrl,
										alt: media.altText || journal?.title || "Journal photo",
										className: "aspect-square w-full object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": "Delete photo",
										disabled: deletingMediaId === media.id,
										onClick: () => handleDeleteMedia(media),
										className: "absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-background/90 text-destructive shadow-sm backdrop-blur transition-colors hover:bg-destructive hover:text-destructive-foreground",
										children: deletingMediaId === media.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
									})]
								}, media.id))
							}),
							secondaryFiles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-xs font-medium text-foreground",
								children: "New photos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4",
								children: secondaryFiles.map((file, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative overflow-hidden rounded-xl border border-accent/40 bg-secondary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: URL.createObjectURL(file),
										alt: file.name,
										className: "aspect-square w-full object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": "Remove selected photo",
										onClick: () => removeSecondaryFile(index),
										className: "absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-background/90 shadow-sm hover:bg-destructive hover:text-destructive-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
									})]
								}, `${file.name}-${index}`))
							})] }),
							currentSecondary.length === 0 && secondaryFiles.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 rounded-2xl border border-dashed border-border px-6 py-12 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "mx-auto size-6 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm font-medium",
									children: "No secondary photos"
								})]
							})
						]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "lg",
						disabled: saving,
						children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Saving changes…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), "Save changes"] })
					})
				]
			})
		]
	});
}
function Field({ label, value, onChange, type = "text", placeholder, required = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-sm font-medium",
			children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-destructive",
				children: [" ", "*"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
			placeholder,
			required,
			onChange: (event) => onChange(event.target.value),
			className: "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
		})]
	});
}
//#endregion
export { EditJournalPage as component };
