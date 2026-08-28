import { a as __toESM } from "../_runtime.mjs";
import { i as getAllArtworks, t as createArtwork } from "./artwork.service-D5UQhGTZ.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Button } from "./button-0h_v-pWj.mjs";
import { i as uploadArtworkMedia } from "./artwork-media.service-ClnAtzMv.mjs";
import { P as ArrowLeft, S as LoaderCircle, T as ImagePlus, a as Trash2, r as Upload } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-vGWGWT9s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewArtworkPage() {
	const navigate = useNavigate();
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [price, setPrice] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("");
	const [dimensions, setDimensions] = (0, import_react.useState)("");
	const [medium, setMedium] = (0, import_react.useState)("");
	const [year, setYear] = (0, import_react.useState)("");
	const [story, setStory] = (0, import_react.useState)("");
	const [orientation, setOrientation] = (0, import_react.useState)("portrait");
	const [featured, setFeatured] = (0, import_react.useState)(false);
	const [photos, setPhotos] = (0, import_react.useState)([]);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const primaryPhoto = (0, import_react.useMemo)(() => photos.find((photo) => photo.role === "primary"), [photos]);
	(0, import_react.useEffect)(() => {
		return () => {
			photos.forEach((photo) => {
				URL.revokeObjectURL(photo.previewUrl);
			});
		};
	}, [photos]);
	function addPhotos(files) {
		if (!files) return;
		const newPhotos = Array.from(files).filter((file) => file.type.startsWith("image/")).map((file) => ({
			id: crypto.randomUUID(),
			file,
			previewUrl: URL.createObjectURL(file),
			role: "detail"
		}));
		setPhotos((current) => {
			const next = [...current, ...newPhotos];
			if (!next.some((photo) => photo.role === "primary") && next[0]) next[0] = {
				...next[0],
				role: "primary"
			};
			return next;
		});
	}
	function removePhoto(photoId) {
		setPhotos((current) => {
			const photo = current.find((item) => item.id === photoId);
			if (photo) URL.revokeObjectURL(photo.previewUrl);
			const next = current.filter((item) => item.id !== photoId);
			if (!next.some((item) => item.role === "primary") && next[0]) next[0] = {
				...next[0],
				role: "primary"
			};
			return next;
		});
	}
	function setPhotoRole(photoId, role) {
		setPhotos((current) => current.map((photo) => {
			if (role === "primary") return {
				...photo,
				role: photo.id === photoId ? "primary" : "detail"
			};
			return photo.id === photoId ? {
				...photo,
				role
			} : photo;
		}));
	}
	async function handleSubmit(event) {
		event.preventDefault();
		setError("");
		if (!title.trim()) {
			setError("Title is required.");
			return;
		}
		if (!photos.length) {
			setError("Add at least one artwork photo.");
			return;
		}
		if (!primaryPhoto) {
			setError("One photo must be marked as primary.");
			return;
		}
		setSaving(true);
		try {
			const artwork = await createArtwork({
				title: title.trim(),
				description: description.trim() || void 0,
				price: price ? Number(price) : void 0,
				availability_status: "AVAILABLE",
				category: category || void 0,
				dimensions: dimensions.trim() || void 0,
				medium: medium.trim() || void 0,
				year: year ? Number(year) : void 0,
				featured,
				story: story.trim() || void 0,
				orientation
			});
			for (let index = 0; index < photos.length; index += 1) {
				const photo = photos[index];
				await uploadArtworkMedia({
					artworkId: artwork.id,
					file: photo.file,
					role: photo.role,
					sortOrder: index,
					altText: title.trim()
				});
			}
			await getAllArtworks();
			await navigate({
				to: "/admin/artworks/$artworkId",
				params: { artworkId: artwork.id }
			});
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Could not create artwork.");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-6 py-10 lg:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/artworks",
				className: "link-underline inline-flex items-center gap-2 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back to artworks"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Studio dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-4xl text-foreground",
					children: "Add artwork"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card p-6 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Artwork details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-5 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Title",
									value: title,
									onChange: setTitle,
									placeholder: "Artwork title",
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Price",
									value: price,
									onChange: setPrice,
									placeholder: "45000",
									type: "number"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Year",
									value: year,
									onChange: setYear,
									placeholder: "2026",
									type: "number"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Medium",
									value: medium,
									onChange: setMedium,
									placeholder: "Acrylic on canvas"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Dimensions",
									value: dimensions,
									onChange: setDimensions,
									placeholder: "24 × 36 in"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "space-y-2 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-foreground",
										children: "Category"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: category,
										onChange: (event) => setCategory(event.target.value),
										className: "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Select category"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Landscape",
												children: "Landscape"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Portrait",
												children: "Portrait"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Abstract",
												children: "Abstract"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Sacred",
												children: "Sacred"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "space-y-2 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-foreground",
										children: "Orientation"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: orientation,
										onChange: (event) => setOrientation(event.target.value),
										className: "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "portrait",
												children: "Portrait"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "square",
												children: "Square"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "landscape",
												children: "Landscape"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "sm:col-span-2 flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: featured,
										onChange: (event) => setFeatured(event.target.checked),
										className: "size-4"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-foreground",
										children: "Feature this artwork"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "space-y-2 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-foreground",
										children: "Description"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: description,
										onChange: (event) => setDescription(event.target.value),
										rows: 4,
										className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "space-y-2 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-foreground",
										children: "Story"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: story,
										onChange: (event) => setStory(event.target.value),
										rows: 6,
										className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card p-6 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Photos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 font-display text-2xl text-foreground",
									children: "Artwork media"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "Add the main painting plus optional detail and wall photos."
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }),
									"Add photos",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										accept: "image/*",
										multiple: true,
										className: "hidden",
										onChange: (event) => {
											addPhotos(event.target.files);
											event.currentTarget.value = "";
										}
									})
								]
							})]
						}), photos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 rounded-2xl border border-dashed border-border px-5 py-12 text-center text-sm text-muted-foreground",
							children: "No photos added yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid gap-4 sm:grid-cols-2",
							children: photos.map((photo, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "overflow-hidden rounded-2xl border border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: photo.previewUrl,
									alt: photo.file.name,
									className: "aspect-[4/3] w-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-sm font-medium",
												children: photo.file.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => removePhoto(photo.id),
												className: "shrink-0 text-muted-foreground transition-colors hover:text-destructive",
												"aria-label": `Remove ${photo.file.name}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: photo.role,
											onChange: (event) => setPhotoRole(photo.id, event.target.value),
											className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "primary",
													children: "Primary"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "detail",
													children: "Detail"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "wall",
													children: "Wall"
												})
											]
										}),
										photo.role === "primary" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-medium text-accent",
											children: "Primary artwork image"
										}),
										index === 0 && photo.role !== "primary" && !primaryPhoto && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "This will become primary automatically."
										})
									]
								})]
							}, photo.id))
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "lg:sticky lg:top-24 lg:self-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-6 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Publish"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 space-y-4 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Photos"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-foreground",
											children: photos.length
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Primary"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-foreground",
											children: primaryPhoto ? "Ready" : "Missing"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "border-t border-border pt-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs leading-relaxed text-muted-foreground",
											children: "Each selected photo will automatically generate an original, large, medium and thumbnail version."
										})
									})
								]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "mt-6 w-full",
								size: "lg",
								disabled: saving,
								children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Uploading artwork..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), "Create artwork"] })
							})
						]
					})
				})]
			})
		]
	});
}
function Field({ label, value, onChange, placeholder, type = "text", required = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-sm font-medium text-foreground",
			children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-destructive",
				children: " *"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
			onChange: (event) => onChange(event.target.value),
			placeholder,
			required,
			className: "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
		})]
	});
}
//#endregion
export { NewArtworkPage as component };
