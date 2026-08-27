import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ImagePlus, Loader2, Trash2, Upload } from "lucide-react";

import {
  createArtwork,
  getAllArtworks,
} from "@/services/artwork.service";
import {
  uploadArtworkMedia,
  type ArtworkMediaRole,
} from "@/services/artwork-media.service";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/artworks/new")({
  component: NewArtworkPage,
});

type PhotoDraft = {
  id: string;
  file: File;
  previewUrl: string;
  role: ArtworkMediaRole;
};

function NewArtworkPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
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

  const [photos, setPhotos] = useState<PhotoDraft[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const primaryPhoto = useMemo(
    () => photos.find((photo) => photo.role === "primary"),
    [photos],
  );

  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        URL.revokeObjectURL(photo.previewUrl);
      });
    };
  }, [photos]);

  function addPhotos(files: FileList | null) {
    if (!files) return;

    const incoming = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );

    const newPhotos: PhotoDraft[] = incoming.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      role: "detail",
    }));

    setPhotos((current) => {
      const next = [...current, ...newPhotos];

      if (!next.some((photo) => photo.role === "primary") && next[0]) {
        next[0] = {
          ...next[0],
          role: "primary",
        };
      }

      return next;
    });
  }

  function removePhoto(photoId: string) {
    setPhotos((current) => {
      const photo = current.find((item) => item.id === photoId);

      if (photo) {
        URL.revokeObjectURL(photo.previewUrl);
      }

      const next = current.filter((item) => item.id !== photoId);

      if (
        !next.some((item) => item.role === "primary") &&
        next[0]
      ) {
        next[0] = {
          ...next[0],
          role: "primary",
        };
      }

      return next;
    });
  }

  function setPhotoRole(
    photoId: string,
    role: ArtworkMediaRole,
  ) {
    setPhotos((current) =>
      current.map((photo) => {
        if (role === "primary") {
          return {
            ...photo,
            role: photo.id === photoId ? "primary" : "detail",
          };
        }

        return photo.id === photoId
          ? { ...photo, role }
          : photo;
      }),
    );
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
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
        description: description.trim() || undefined,
        price: price ? Number(price) : undefined,
        availability_status: "AVAILABLE",
        category: category || undefined,
        dimensions: dimensions.trim() || undefined,
        medium: medium.trim() || undefined,
        year: year ? Number(year) : undefined,
        featured,
        story: story.trim() || undefined,
        orientation,
      });

      for (let index = 0; index < photos.length; index += 1) {
        const photo = photos[index];

        await uploadArtworkMedia({
          artworkId: artwork.id,
          file: photo.file,
          role: photo.role,
          sortOrder: index,
          altText: title.trim(),
        });
      }

      await getAllArtworks();

      await navigate({
        to: "/admin/artworks/$artworkId",
        params: {
          artworkId: artwork.id,
        },
      });
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Could not create artwork.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
      <Link
        to="/admin/artworks"
        className="link-underline inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to artworks
      </Link>

      <div className="mt-6">
        <p className="eyebrow">Studio dashboard</p>

        <h1 className="mt-1 font-display text-4xl text-foreground">
          Add artwork
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <p className="eyebrow">Artwork details</p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">

              <Field
                label="Title"
                value={title}
                onChange={setTitle}
                placeholder="Artwork title"
                required
              />

              <Field
                label="Price"
                value={price}
                onChange={setPrice}
                placeholder="45000"
                type="number"
              />

              <Field
                label="Year"
                value={year}
                onChange={setYear}
                placeholder="2026"
                type="number"
              />

              <Field
                label="Medium"
                value={medium}
                onChange={setMedium}
                placeholder="Acrylic on canvas"
              />

              <Field
                label="Dimensions"
                value={dimensions}
                onChange={setDimensions}
                placeholder="24 × 36 in"
              />

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-foreground">
                  Category
                </span>

                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select category</option>
                  <option value="Landscape">Landscape</option>
                  <option value="Portrait">Portrait</option>
                  <option value="Abstract">Abstract</option>
                  <option value="Sacred">Sacred</option>
                </select>
              </label>

              <label className="space-y-2 sm:col-span-2">
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
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="portrait">Portrait</option>
                  <option value="square">Square</option>
                  <option value="landscape">Landscape</option>
                </select>
              </label>

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

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-foreground">
                  Description
                </span>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </label>

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-foreground">
                  Story
                </span>

                <textarea
                  value={story}
                  onChange={(event) => setStory(event.target.value)}
                  rows={6}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Photos</p>

                <h2 className="mt-1 font-display text-2xl text-foreground">
                  Artwork media
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Add the main painting plus optional detail and wall
                  photos.
                </p>
              </div>

              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary">
                <ImagePlus className="size-4" />
                Add photos
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(event) => {
                    addPhotos(event.target.files);
                    event.currentTarget.value = "";
                  }}
                />
              </label>
            </div>

            {photos.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-border px-5 py-12 text-center text-sm text-muted-foreground">
                No photos added yet.
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="overflow-hidden rounded-2xl border border-border"
                  >
                    <img
                      src={photo.previewUrl}
                      alt={photo.file.name}
                      className="aspect-[4/3] w-full object-cover"
                    />

                    <div className="space-y-3 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-medium">
                          {photo.file.name}
                        </p>

                        <button
                          type="button"
                          onClick={() => removePhoto(photo.id)}
                          className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                          aria-label={`Remove ${photo.file.name}`}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      <select
                        value={photo.role}
                        onChange={(event) =>
                          setPhotoRole(
                            photo.id,
                            event.target.value as ArtworkMediaRole,
                          )
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                      >
                        <option value="primary">Primary</option>
                        <option value="detail">Detail</option>
                        <option value="wall">Wall</option>
                      </select>

                      {photo.role === "primary" && (
                        <p className="text-xs font-medium text-accent">
                          Primary artwork image
                        </p>
                      )}

                      {index === 0 &&
                        photo.role !== "primary" &&
                        !primaryPhoto && (
                          <p className="text-xs text-muted-foreground">
                            This will become primary automatically.
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
            <p className="eyebrow">Publish</p>

            <div className="mt-5 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">
                  Photos
                </span>

                <span className="font-medium text-foreground">
                  {photos.length}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">
                  Primary
                </span>

                <span className="font-medium text-foreground">
                  {primaryPhoto ? "Ready" : "Missing"}
                </span>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Each selected photo will automatically generate an
                  original, large, medium and thumbnail version.
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
                  Uploading artwork...
                </>
              ) : (
                <>
                  <Upload className="size-4" />
                  Create artwork
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
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </label>
  );
}