import { a as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Button } from "./button-0h_v-pWj.mjs";
import { S as LoaderCircle, T as ImagePlus, a as Trash2, d as Plus, t as X } from "../_libs/lucide-react.mjs";
import { i as uploadFeedback, n as deleteFeedback, r as getFeedback, t as createFeedback } from "./feedback.service-D-EWxhuj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feedback-DAbw5UbT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FeedbackPage() {
	const [feedback, setFeedback] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [showCreateForm, setShowCreateForm] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [quote, setQuote] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [location, setLocation] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	const [rating, setRating] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		loadFeedback();
	}, []);
	async function loadFeedback() {
		try {
			setLoading(true);
			setError("");
			const data = await getFeedback();
			setFeedback(data);
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Could not load feedback.");
		} finally {
			setLoading(false);
		}
	}
	async function handleUpload(files) {
		if (!files) return;
		const images = Array.from(files).filter((file) => file.type.startsWith("image/"));
		if (!images.length) return;
		try {
			setUploading(true);
			setError("");
			const startingIndex = feedback.length;
			for (let index = 0; index < images.length; index += 1) await uploadFeedback(images[index], startingIndex + index);
			await loadFeedback();
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Could not upload feedback.");
		} finally {
			setUploading(false);
			if (inputRef.current) inputRef.current.value = "";
		}
	}
	async function handleCreate() {
		if (!quote.trim()) {
			setError("Feedback text is required.");
			return;
		}
		const parsedRating = rating ? Number(rating) : void 0;
		if (parsedRating !== void 0 && (!Number.isInteger(parsedRating) || parsedRating < 1 || parsedRating > 5)) {
			setError("Rating must be between 1 and 5.");
			return;
		}
		try {
			setCreating(true);
			setError("");
			await createFeedback({
				quote: quote.trim(),
				name: name.trim() || void 0,
				location: location.trim() || void 0,
				date: date.trim() || void 0,
				rating: parsedRating,
				sortOrder: feedback.length
			});
			setQuote("");
			setName("");
			setLocation("");
			setDate("");
			setRating("");
			setShowCreateForm(false);
			await loadFeedback();
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Could not create feedback.");
		} finally {
			setCreating(false);
		}
	}
	async function handleDelete(item) {
		if (!window.confirm("Delete this feedback?")) return;
		try {
			setError("");
			await deleteFeedback(item);
			await loadFeedback();
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Could not delete feedback.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-6 py-10 lg:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Studio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-4xl text-foreground",
						children: "Feedback"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Upload customer feedback cards or create one from text."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary",
						children: [
							uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }),
							uploading ? "Uploading..." : "Upload feedback",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: inputRef,
								type: "file",
								accept: "image/*",
								multiple: true,
								disabled: uploading,
								className: "hidden",
								onChange: (event) => handleUpload(event.target.files)
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						onClick: () => setShowCreateForm((current) => !current),
						children: [showCreateForm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), showCreateForm ? "Close" : "Create feedback"]
					})]
				})]
			}),
			showCreateForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-start justify-between gap-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "New feedback"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-2xl text-foreground",
							children: "Create feedback card"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Only fields you fill in will appear on the card."
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm font-medium",
								children: ["Feedback", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-destructive",
									children: [" ", "*"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: quote,
								onChange: (event) => setQuote(event.target.value),
								rows: 5,
								placeholder: "Write the collector's feedback...",
								className: "w-full rounded-md border border-input bg-background px-3 py-3 text-sm leading-relaxed"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-5 md:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Name",
									value: name,
									onChange: setName,
									placeholder: "e.g. Agrima"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Location",
									value: location,
									onChange: setLocation,
									placeholder: "e.g. Bengaluru"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Date",
									value: date,
									onChange: setDate,
									type: "date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: "Rating"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: rating,
										onChange: (event) => setRating(event.target.value),
										className: "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "No rating"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "5",
												children: "5 stars"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "4",
												children: "4 stars"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "3",
												children: "3 stars"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "2",
												children: "2 stars"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "1",
												children: "1 star"
											})
										]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								disabled: creating,
								onClick: handleCreate,
								children: creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Creating..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Create feedback"] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								disabled: creating,
								onClick: () => {
									setQuote("");
									setName("");
									setLocation("");
									setDate("");
									setRating("");
								},
								children: "Clear"
							})]
						})
					]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive",
				children: error
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 flex items-center justify-center py-16 text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" })
			}) : feedback.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 rounded-2xl border border-dashed border-border px-6 py-16 text-center text-sm text-muted-foreground",
				children: "No feedback yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: feedback.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-2xl border border-border bg-card shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.thumbUrl,
						alt: "Customer feedback",
						loading: "lazy",
						className: "aspect-[4/3] w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "Feedback card"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => handleDelete(item),
							className: "text-muted-foreground transition-colors hover:text-destructive",
							"aria-label": "Delete feedback",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					})]
				}, item.id))
			})
		]
	});
}
function Field({ label, value, onChange, type = "text", placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
			placeholder,
			onChange: (event) => onChange(event.target.value),
			className: "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
		})]
	});
}
//#endregion
export { FeedbackPage as component };
