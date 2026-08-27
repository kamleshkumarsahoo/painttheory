import { a as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Button } from "./button-0h_v-pWj.mjs";
import { P as ArrowLeft, S as LoaderCircle, T as ImagePlus, t as X, u as Save } from "../_libs/lucide-react.mjs";
import { c as uploadJournalMedia, t as createJournal } from "./journal.service-dNpgGlAg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-BZNknIjR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewJournalPage() {
	const navigate = useNavigate();
	const [title, setTitle] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("Story");
	const [location, setLocation] = (0, import_react.useState)("");
	const [publishedAt, setPublishedAt] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [readTime, setReadTime] = (0, import_react.useState)("5");
	const [body, setBody] = (0, import_react.useState)("");
	const [primaryFile, setPrimaryFile] = (0, import_react.useState)(null);
	const [secondaryFiles, setSecondaryFiles] = (0, import_react.useState)([]);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const primaryInputRef = (0, import_react.useRef)(null);
	const secondaryInputRef = (0, import_react.useRef)(null);
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
		if (!primaryFile) {
			setError("Primary photo is required.");
			return;
		}
		try {
			setSaving(true);
			setError("");
			const journal = await createJournal({
				title: title.trim(),
				body: body.trim(),
				location: location.trim() || null,
				published_at: (/* @__PURE__ */ new Date(`${publishedAt}T12:00:00`)).toISOString(),
				read_time: Number(readTime) || 5,
				category
			});
			await uploadJournalMedia({
				journalId: journal.id,
				file: primaryFile,
				role: "primary",
				sortOrder: 0,
				altText: title.trim()
			});
			for (let index = 0; index < secondaryFiles.length; index += 1) await uploadJournalMedia({
				journalId: journal.id,
				file: secondaryFiles[index],
				role: "secondary",
				sortOrder: index + 1,
				altText: title.trim()
			});
			await navigate({ to: "/admin/journal" });
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Could not create journal entry.");
		} finally {
			setSaving(false);
		}
	}
	function handlePrimaryChange(event) {
		const file = event.target.files?.[0] ?? null;
		setPrimaryFile(file);
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
					children: "New journal"
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
								placeholder: "Write the journal entry here. Leave a blank line between paragraphs.",
								className: "w-full rounded-md border border-input bg-background px-3 py-3 text-sm leading-relaxed"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card p-6 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Primary photo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "This is the main image for the journal."
								})] }), primaryFile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										setPrimaryFile(null);
										if (primaryInputRef.current) primaryInputRef.current.value = "";
									},
									className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-destructive",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), "Remove"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: primaryInputRef,
								type: "file",
								accept: "image/*",
								className: "hidden",
								onChange: handlePrimaryChange
							}),
							primaryFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => primaryInputRef.current?.click(),
								className: "group relative mt-5 block w-full overflow-hidden rounded-2xl border border-border bg-secondary text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: URL.createObjectURL(primaryFile),
									alt: primaryFile.name,
									className: "max-h-[420px] w-full object-contain"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-x-0 bottom-0 bg-background/85 px-4 py-3 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs font-medium",
										children: primaryFile.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] text-muted-foreground",
										children: "Click to choose a different image"
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => primaryInputRef.current?.click(),
								className: "mt-5 flex w-full cursor-pointer items-center justify-center rounded-2xl border border-dashed border-border px-6 py-16 text-center transition-colors hover:bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "mx-auto size-7 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm font-medium",
										children: "Choose primary photo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "Click to browse your images."
									})
								] })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card p-6 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Secondary photos"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "These will appear throughout the journal."
								})] }), secondaryFiles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [secondaryFiles.length, " selected"]
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
							secondaryFiles.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4",
								children: [secondaryFiles.map((file, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "group relative overflow-hidden rounded-xl border border-border bg-secondary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: URL.createObjectURL(file),
											alt: file.name,
											className: "aspect-square w-full object-cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": `Remove ${file.name}`,
											onClick: () => removeSecondaryFile(index),
											className: "absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-destructive hover:text-destructive-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-x-0 bottom-0 bg-background/80 px-2 py-2 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-[10px]",
												children: file.name
											})
										})
									]
								}, `${file.name}-${index}`)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => secondaryInputRef.current?.click(),
									className: "flex aspect-square items-center justify-center rounded-xl border border-dashed border-border transition-colors hover:bg-secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "mx-auto size-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-2 block text-xs font-medium",
											children: "Add more"
										})]
									})
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => secondaryInputRef.current?.click(),
								className: "mt-5 flex w-full cursor-pointer items-center justify-center rounded-2xl border border-dashed border-border px-6 py-14 text-center transition-colors hover:bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "mx-auto size-7 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm font-medium",
										children: "Add secondary photos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "Select multiple images."
									})
								] })
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
						children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Saving journal…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), "Save journal"] })
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
export { NewJournalPage as component };
