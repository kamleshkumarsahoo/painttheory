import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  Save,
  Trash2,
} from "lucide-react";

import {
  getAdminArtworkById,
  updateArtwork,
} from "@/services/artwork.service";

import {
  deleteArtworkMedia,
  getArtworkMedia,
  setPrimaryArtworkMedia,
  uploadArtworkMedia,
  type ArtworkMedia,
} from "@/services/artwork-media.service";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/artworks/$artworkId")({
  component: EditArtworkPage,
});

function EditArtworkPage() {
  const { artworkId } = Route.useParams();

  const [artwork, setArtwork] = useState<any>(null);
  const [media, setMedia] = useState<ArtworkMedia[]>([]);

  const [title, setTitle] = useState("");
  const [artworkCode, setArtworkCode] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [medium, setMedium] = useState("");
  const [year, setYear] = useState("");
  const [story, setStory] = useState("");

  const [orientation, setOrientation] = useState<
    "portrait" | "square" | "landscape"
  >("portrait");

  const [featured, setFeatured] = useState(false);
  const [onWall, setOnWall] = useState(false);
  const [wallMediaId, setWallMediaId] = useState<string | null>(null);

  const [availabilityStatus, setAvailabilityStatus] = useState<
    "AVAILABLE" | "RESERVED" | "SOLD"
  >("AVAILABLE");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const primaryMedia = useMemo(
    () => media.find((item) => item.role === "primary") ?? media[0],
    [media],
  );

  useEffect(() => {
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

      setOrientation(
        data.orientation === "landscape"
          ? "landscape"
          : data.orientation === "square"
            ? "square"
            : "portrait",
      );

      setFeatured(Boolean(data.featured));
      setOnWall(Boolean(data.on_wall));
      setWallMediaId(data.wall_media_id ?? null);

      setAvailabilityStatus(
        data.availability_status ?? "AVAILABLE",
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Could not load artwork.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(
    event: React.FormEvent<HTMLFormElement>,
  ) {
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
        orientation,
      });

      await loadArtwork();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Could not save artwork.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleAddPhotos(
    files: FileList | null,
  ) {
    if (!files) return;

    const selectedFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );

    if (!selectedFiles.length) return;

    setUploading(true);
    setError("");

    try {
      const startingCount = media.length;

      for (
        let index = 0;
        index < selectedFiles.length;
        index += 1
      ) {
        const file = selectedFiles[index];

        const isFirstPhoto =
          media.length === 0 && index === 0;

        await uploadArtworkMedia({
          artworkId,
          file,
          role: isFirstPhoto ? "primary" : "detail",
          sortOrder: startingCount + index,
          altText:
            title.trim() ||
            artwork?.title ||
            file.name,
        });
      }

      const updatedMedia =
        await getArtworkMedia(artworkId);

      setMedia(updatedMedia);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Could not upload photos.",
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleDeleteMedia(
    mediaItem: ArtworkMedia,
  ) {
    const confirmed = window.confirm(
      "Delete this photo? This cannot be undone.",
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteArtworkMedia(mediaItem);

      if (wallMediaId === mediaItem.id) {
        setWallMediaId(null);
      }

      const updatedMedia =
        await getArtworkMedia(artworkId);

      setMedia(updatedMedia);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Could not delete photo.",
      );
    }
  }

  async function handleSetPrimary(
    mediaItem: ArtworkMedia,
  ) {
    try {
      setError("");

      await setPrimaryArtworkMedia(
        artworkId,
        mediaItem.id,
      );

      const updatedMedia =
        await getArtworkMedia(artworkId);

      setMedia(updatedMedia);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Could not change primary photo.",
      );
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="eyebrow">Studio gallery</p>

        <h1 className="mt-3 font-display text-3xl text-foreground">
          Loading artwork
        </h1>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="eyebrow">Studio gallery</p>

        <h1 className="mt-3 font-display text-3xl text-foreground">
          Artwork not found
        </h1>

        <Button asChild className="mt-6">
          <Link to="/admin/artworks">
            Back to gallery
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
      <Link
        to="/admin/artworks"
        className="link-underline inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to gallery
      </Link>

      <div className="mt-6">
        <p className="eyebrow">Studio gallery</p>

        <h1 className="mt-1 font-display text-4xl text-foreground">
          Edit artwork
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {artworkCode}
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <p className="eyebrow">Artwork details</p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field
                label="Artwork code"
                value={artworkCode}
                onChange={setArtworkCode}
                required
              />

              <Field
                label="Title"
                value={title}
                onChange={setTitle}
                required
              />

              <Field
                label="Price"
                value={price}
                onChange={setPrice}
                type="number"
              />

              <Field
                label="Year"
                value={year}
                onChange={setYear}
                type="number"
              />

              <Field
                label="Medium"
                value={medium}
                onChange={setMedium}
              />

              <Field
                label="Dimensions"
                value={dimensions}
                onChange={setDimensions}
              />

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-foreground">
                  Category
                </span>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="Landscape">
                    Landscape
                  </option>

                  <option value="Portrait">
                    Portrait
                  </option>

                  <option value="Abstract">
                    Abstract
                  </option>

                  <option value="Sacred">
                    Sacred
                  </option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-foreground">
                  Orientation
                </span>

                <select
                  value={orientation}
                  onChange={(event) =>
                    setOrientation(
                      event.target.value as
                        | "portrait"
                        | "square"
                        | "landscape",
                    )
                  }
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                >
                  <option value="portrait">
                    Portrait
                  </option>

                  <option value="square">
                    Square
                  </option>

                  <option value="landscape">
                    Landscape
                  </option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-foreground">
                  Availability
                </span>

                <select
                  value={availabilityStatus}
                  onChange={(event) =>
                    setAvailabilityStatus(
                      event.target.value as
                        | "AVAILABLE"
                        | "RESERVED"
                        | "SOLD",
                    )
                  }
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                >
                  <option value="AVAILABLE">
                    Available
                  </option>

                  <option value="RESERVED">
                    Reserved
                  </option>

                  <option value="SOLD">
                    Sold
                  </option>
                </select>
              </label>

              {/* FEATURE */}
              <label className="sm:col-span-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(event) =>
                    setFeatured(event.target.checked)
                  }
                  className="size-4"
                />

                <span className="text-sm text-foreground">
                  Feature this artwork
                </span>
              </label>

              {/* WALL */}
              <div className="sm:col-span-2">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={onWall}
                    onChange={(event) => {
                      const checked =
                        event.target.checked;

                      setOnWall(checked);

                      if (!checked) {
                        setWallMediaId(null);
                      }
                    }}
                    className="size-4"
                  />

                  <span className="text-sm text-foreground">
                    Show on the wall
                  </span>
                </label>

                {onWall && (
                  <div className="mt-4 ml-7 max-w-md">
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-foreground">
                        Wall image
                      </span>

                      <select
                        value={wallMediaId ?? ""}
                        onChange={(event) =>
                          setWallMediaId(
                            event.target.value ||
                              null,
                          )
                        }
                        className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                      >
                        <option value="" disabled>
                          Select an image
                        </option>

                        {media.map((item, index) => (
                          <option
                            key={item.id}
                            value={item.id}
                          >
                            {item.role === "primary"
                              ? "Primary image"
                              : `Photo ${index + 1}`}
                          </option>
                        ))}
                      </select>

                      <p className="text-xs text-muted-foreground">
                        Choose which uploaded image
                        should appear on the wall.
                      </p>
                    </label>
                  </div>
                )}
              </div>

              <TextAreaField
                label="Description"
                value={description}
                onChange={setDescription}
                rows={4}
              />

              <TextAreaField
                label="Story"
                value={story}
                onChange={setStory}
                rows={6}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Photos</p>

                <h2 className="mt-1 font-display text-2xl text-foreground">
                  Artwork media
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Manage the primary image and supporting photos.
                </p>
              </div>

              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">
                {uploading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <ImagePlus className="size-4" />
                )}

                {uploading
                  ? "Uploading..."
                  : "Add photos"}

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={uploading}
                  className="hidden"
                  onChange={(event) => {
                    handleAddPhotos(
                      event.target.files,
                    );

                    event.currentTarget.value = "";
                  }}
                />
              </label>
            </div>

            {media.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-border px-5 py-12 text-center text-sm text-muted-foreground">
                No photos uploaded.
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {media.map((item) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-border"
                  >
                    <img
                      src={item.thumbUrl}
                      alt={item.altText || title}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />

                    <div className="space-y-3 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {item.role === "primary"
                              ? "Primary"
                              : "Detail"}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {item.width ?? "—"} ×{" "}
                            {item.height ?? "—"}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteMedia(item)
                          }
                          className="text-muted-foreground hover:text-destructive"
                          aria-label="Delete photo"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {item.role !== "primary" && (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleSetPrimary(item)
                            }
                          >
                            Make primary
                          </Button>
                        )}
                      </div>

                      {item.role === "primary" && (
                        <p className="text-xs font-medium text-accent">
                          Primary artwork image
                        </p>
                      )}

                      {onWall &&
                        wallMediaId === item.id && (
                          <p className="text-xs font-medium text-accent">
                            Selected for wall
                          </p>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <p className="eyebrow">Save changes</p>

            <div className="mt-5 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">
                  Photos
                </span>

                <span className="font-medium text-foreground">
                  {media.length}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">
                  Primary image
                </span>

                <span className="font-medium text-foreground">
                  {primaryMedia
                    ? "Ready"
                    : "Missing"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">
                  Wall image
                </span>

                <span className="font-medium text-foreground">
                  {onWall && wallMediaId
                    ? "Selected"
                    : "Primary"}
                </span>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  New photos are automatically processed
                  into optimized sizes for the website.
                </p>
              </div>
            </div>

            {error && (
              <div className="mt-5 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="mt-6 w-full"
              size="lg"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save changes
                </>
              )}
            </Button>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-foreground">
        {label}

        {required && (
          <span className="text-destructive">
            {" "}*
          </span>
        )}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        required={required}
        className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
}) {
  return (
    <label className="space-y-2 sm:col-span-2">
      <span className="text-sm font-medium text-foreground">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        rows={rows}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
      />
    </label>
  );
}