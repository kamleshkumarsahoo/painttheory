import { a as __toESM } from "./_runtime.mjs";
import { r as getAdminArtworkById, s as updateArtwork } from "./_ssr/artwork.service-D5UQhGTZ.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "./_libs/@radix-ui/react-label+[...].mjs";
import { t as Route } from "./_artworkId-CzJqtP9v.mjs";
import { t as Button } from "./_ssr/button-0h_v-pWj.mjs";
import { i as uploadArtworkMedia, n as getArtworkMedia, r as setPrimaryArtworkMedia, t as deleteArtworkMedia } from "./_ssr/artwork-media.service-ClnAtzMv.mjs";
import { P as ArrowLeft, S as LoaderCircle, T as ImagePlus, a as Trash2, u as Save } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_artworkId-CG-zxVop.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EditArtworkPage() {
	const { artworkId } = Route.useParams();
	const [artwork, setArtwork] = (0, import_react.useState)(null);
	const [media, setMedia] = (0, import_react.useState)([]);
	const [title, setTitle] = (0, import_react.useState)("");
	const [artworkCode, setArtworkCode] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [price, setPrice] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("");
	const [dimensions, setDimensions] = (0, import_react.useState)("");
	const [medium, setMedium] = (0, import_react.useState)("");
	const [year, setYear] = (0, import_react.useState)("");
	const [story, setStory] = (0, import_react.useState)("");
	const [orientation, setOrientation] = (0, import_react.useState)("portrait");
	const [featured, setFeatured] = (0, import_react.useState)(false);
	const [onWall, setOnWall] = (0, import_react.useState)(false);
	const [wallMediaId, setWallMediaId] = (0, import_react.useState)(null);
	const [availabilityStatus, setAvailabilityStatus] = (0, import_react.useState)("AVAILABLE");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const primaryMedia = (0, import_react.useMemo)(() => media.find((item) => item.role === "primary") ?? media[0], [media]);
	(0, import_react.useEffect)(() => {
		loadArtwork();
	}, [artworkId]);
	async function loadArtwork() {
		try {
			setLoading(true);
			setError("");
			const data = await getAdminArtworkById(artworkId);
			const artworkMedia = await getArtworkMedia(artworkId);
			setArtwork(data);
			setMedia(artworkMedia);
			setTitle(data.title ?? "");
			setArtworkCode(data.artwork_code ?? "");
			setDescription(data.description ?? "");
			setPrice(data.price == null ? "" : String(data.price));
			setCategory(data.category ?? "");
			setDimensions(data.dimensions ?? "");
			setMedium(data.medium ?? "");
			setYear(data.year == null ? "" : String(data.year));
			setStory(data.story ?? "");
			setOrientation(data.orientation === "landscape" ? "landscape" : data.orientation === "square" ? "square" : "portrait");
			setFeatured(Boolean(data.featured));
			setOnWall(Boolean(data.on_wall));
			setWallMediaId(data.wall_media_id ?? null);
			setAvailabilityStatus(data.availability_status ?? "AVAILABLE");
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Could not load artwork.");
		} finally {
			setLoading(false);
		}
	}
	async function handleSave(event) {
		event.preventDefault();
		setError("");
		setSaving(true);
		try {
			await updateArtwork(artworkId, {
				artwork_code: artworkCode.trim(),
				title: title.trim(),
				description: description.trim() || null,
				price: price ? Number(price) : null,
				availability_status: availabilityStatus,
				category: category || null,
				dimensions: dimensions.trim() || null,
				medium: medium.trim() || null,
				year: year ? Number(year) : null,
				featured,
				on_wall: onWall,
				wall_media_id: onWall ? wallMediaId : null,
				story: story.trim() || null,
				orientation
			});
			await loadArtwork();
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Could not save artwork.");
		} finally {
			setSaving(false);
		}
	}
	async function handleAddPhotos(files) {
		if (!files) return;
		const selectedFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
		if (!selectedFiles.length) return;
		setUploading(true);
		setError("");
		try {
			const startingCount = media.length;
			for (let index = 0; index < selectedFiles.length; index += 1) {
				const file = selectedFiles[index];
				const isFirstPhoto = media.length === 0 && index === 0;
				await uploadArtworkMedia({
					artworkId,
					file,
					role: isFirstPhoto ? "primary" : "detail",
					sortOrder: startingCount + index,
					altText: title.trim() || artwork?.title || file.name
				});
			}
			const updatedMedia = await getArtworkMedia(artworkId);
			setMedia(updatedMedia);
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Could not upload photos.");
		} finally {
			setUploading(false);
		}
	}
	async function handleDeleteMedia(mediaItem) {
		if (!window.confirm("Delete this photo? This cannot be undone.")) return;
		try {
			setError("");
			await deleteArtworkMedia(mediaItem);
			if (wallMediaId === mediaItem.id) setWallMediaId(null);
			const updatedMedia = await getArtworkMedia(artworkId);
			setMedia(updatedMedia);
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Could not delete photo.");
		}
	}
	async function handleSetPrimary(mediaItem) {
		try {
			setError("");
			await setPrimaryArtworkMedia(artworkId, mediaItem.id);
			const updatedMedia = await getArtworkMedia(artworkId);
			setMedia(updatedMedia);
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Could not change primary photo.");
		}
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-6 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "eyebrow",
			children: "Studio gallery"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 font-display text-3xl text-foreground",
			children: "Loading artwork"
		})]
	});
	if (!artwork) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-6 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Studio gallery"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-3xl text-foreground",
				children: "Artwork not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/artworks",
					children: "Back to gallery"
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-6 py-10 lg:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/artworks",
				className: "link-underline inline-flex items-center gap-2 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back to gallery"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Studio gallery"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-4xl text-foreground",
						children: "Edit artwork"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: artworkCode
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSave,
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
									label: "Artwork code",
									value: artworkCode,
									onChange: setArtworkCode,
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Title",
									value: title,
									onChange: setTitle,
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Price",
									value: price,
									onChange: setPrice,
									type: "number"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Year",
									value: year,
									onChange: setYear,
									type: "number"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Medium",
									value: medium,
									onChange: setMedium
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Dimensions",
									value: dimensions,
									onChange: setDimensions
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "space-y-2 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-foreground",
										children: "Category"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: category,
										onChange: (event) => setCategory(event.target.value),
										className: "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground",
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
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-foreground",
										children: "Orientation"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: orientation,
										onChange: (event) => setOrientation(event.target.value),
										className: "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground",
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
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-foreground",
										children: "Availability"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: availabilityStatus,
										onChange: (event) => setAvailabilityStatus(event.target.value),
										className: "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "AVAILABLE",
												children: "Available"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "RESERVED",
												children: "Reserved"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "SOLD",
												children: "Sold"
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: onWall,
											onChange: (event) => {
												const checked = event.target.checked;
												setOnWall(checked);
												if (!checked) setWallMediaId(null);
											},
											className: "size-4"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-foreground",
											children: "Show on the wall"
										})]
									}), onWall && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 ml-7 max-w-md",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-medium text-foreground",
													children: "Wall image"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: wallMediaId ?? "",
													onChange: (event) => setWallMediaId(event.target.value || null),
													className: "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "",
														disabled: true,
														children: "Select an image"
													}), media.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: item.id,
														children: item.role === "primary" ? "Primary image" : `Photo ${index + 1}`
													}, item.id))]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Choose which uploaded image should appear on the wall."
												})
											]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAreaField, {
									label: "Description",
									value: description,
									onChange: setDescription,
									rows: 4
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAreaField, {
									label: "Story",
									value: story,
									onChange: setStory,
									rows: 6
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card p-6 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-4",
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
									children: "Manage the primary image and supporting photos."
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary",
								children: [
									uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }),
									uploading ? "Uploading..." : "Add photos",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										accept: "image/*",
										multiple: true,
										disabled: uploading,
										className: "hidden",
										onChange: (event) => {
											handleAddPhotos(event.target.files);
											event.currentTarget.value = "";
										}
									})
								]
							})]
						}), media.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 rounded-2xl border border-dashed border-border px-5 py-12 text-center text-sm text-muted-foreground",
							children: "No photos uploaded."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid gap-4 sm:grid-cols-2",
							children: media.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "overflow-hidden rounded-2xl border border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.thumbUrl,
									alt: item.altText || title,
									loading: "lazy",
									className: "aspect-[4/3] w-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium text-foreground",
												children: item.role === "primary" ? "Primary" : "Detail"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: [
													item.width ?? "—",
													" ×",
													" ",
													item.height ?? "—"
												]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => handleDeleteMedia(item),
												className: "text-muted-foreground hover:text-destructive",
												"aria-label": "Delete photo",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-2",
											children: item.role !== "primary" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												size: "sm",
												variant: "outline",
												onClick: () => handleSetPrimary(item),
												children: "Make primary"
											})
										}),
										item.role === "primary" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-medium text-accent",
											children: "Primary artwork image"
										}),
										onWall && wallMediaId === item.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-medium text-accent",
											children: "Selected for wall"
										})
									]
								})]
							}, item.id))
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "lg:sticky lg:top-24 lg:self-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-6 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Save changes"
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
											children: media.length
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Primary image"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-foreground",
											children: primaryMedia ? "Ready" : "Missing"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Wall image"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-foreground",
											children: onWall && wallMediaId ? "Selected" : "Primary"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "border-t border-border pt-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs leading-relaxed text-muted-foreground",
											children: "New photos are automatically processed into optimized sizes for the website."
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
								children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Saving..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), "Save changes"] })
							})
						]
					})
				})]
			})
		]
	});
}
function Field({ label, value, onChange, type = "text", required = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-sm font-medium text-foreground",
			children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-destructive",
				children: [" ", "*"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
			onChange: (event) => onChange(event.target.value),
			required,
			className: "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
		})]
	});
}
function TextAreaField({ label, value, onChange, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "space-y-2 sm:col-span-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium text-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value,
			onChange: (event) => onChange(event.target.value),
			rows,
			className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
		})]
	});
}
//#endregion
export { EditArtworkPage as component };
