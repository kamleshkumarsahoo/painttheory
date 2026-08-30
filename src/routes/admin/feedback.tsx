import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ImagePlus,
  Loader2,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import {
  createFeedback,
  deleteFeedback,
  getFeedback,
  uploadFeedback,
  type Feedback,
} from "@/services/feedback.service";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/feedback")({
  head: () => ({
    meta: [
      {
        title: "Share Your Feedback | PaintTheory",
      },
      {
        name: "description",
        content:
          "Had a PaintTheory artwork? I’d love to hear what you thought of it.",
      },

      // Open Graph
      {
        property: "og:title",
        content: "Share Your Thoughts | PaintTheory",
      },
      {
        property: "og:description",
        content:
          "Had a PaintTheory artwork? I’d love to hear what you thought of it.",
      },
      {
        property: "og:type",
        content: "website",
      },

      // Twitter / X
      {
        name: "twitter:card",
        content: "summary",
      },
      {
        name: "twitter:title",
        content: "Share Your Thoughts | PaintTheory",
      },
      {
        name: "twitter:description",
        content:
          "Had a PaintTheory artwork? I’d love to hear what you thought of it.",
      },
    ],
  }),
  component: FeedbackPage,
});

function FeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] =
    useState(false);
  const [error, setError] = useState("");

  const [quote, setQuote] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [rating, setRating] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
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

      setError(
        err instanceof Error
          ? err.message
          : "Could not load feedback.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(
    files: FileList | null,
  ) {
    if (!files) return;

    const images = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );

    if (!images.length) return;

    try {
      setUploading(true);
      setError("");

      const startingIndex = feedback.length;

      for (
        let index = 0;
        index < images.length;
        index += 1
      ) {
        await uploadFeedback(
          images[index],
          startingIndex + index,
        );
      }

      await loadFeedback();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Could not upload feedback.",
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  async function handleCreate() {
    if (!quote.trim()) {
      setError("Feedback text is required.");
      return;
    }

    const parsedRating = rating
      ? Number(rating)
      : undefined;

    if (
      parsedRating !== undefined &&
      (!Number.isInteger(parsedRating) ||
        parsedRating < 1 ||
        parsedRating > 5)
    ) {
      setError("Rating must be between 1 and 5.");
      return;
    }

    try {
      setCreating(true);
      setError("");

      await createFeedback({
        quote: quote.trim(),
        name: name.trim() || undefined,
        location:
          location.trim() || undefined,
        date: date.trim() || undefined,
        rating: parsedRating,
        sortOrder: feedback.length,
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

      setError(
        err instanceof Error
          ? err.message
          : "Could not create feedback.",
      );
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(item: Feedback) {
    const confirmed = window.confirm(
      "Delete this feedback?",
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteFeedback(item);
      await loadFeedback();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Could not delete feedback.",
      );
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Studio</p>

          <h1 className="mt-1 font-display text-4xl text-foreground">
            Feedback
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Upload customer feedback cards or create one
            from text.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Upload */}
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary">
            {uploading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ImagePlus className="size-4" />
            )}

            {uploading
              ? "Uploading..."
              : "Upload feedback"}

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              disabled={uploading}
              className="hidden"
              onChange={(event) =>
                handleUpload(
                  event.target.files,
                )
              }
            />
          </label>

          {/* Create */}
          <Button
            type="button"
            onClick={() =>
              setShowCreateForm(
                (current) => !current,
              )
            }
          >
            {showCreateForm ? (
              <X className="size-4" />
            ) : (
              <Plus className="size-4" />
            )}

            {showCreateForm
              ? "Close"
              : "Create feedback"}
          </Button>
        </div>
      </div>

      {/* Create form */}
      {showCreateForm && (
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">
                New feedback
              </p>

              <h2 className="mt-1 font-display text-2xl text-foreground">
                Create feedback card
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Only fields you fill in will appear on
                the card.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {/* Quote */}
            <label className="block space-y-2">
              <span className="text-sm font-medium">
                Feedback
                <span className="text-destructive">
                  {" "}*
                </span>
              </span>

              <textarea
                value={quote}
                onChange={(event) =>
                  setQuote(event.target.value)
                }
                rows={5}
                placeholder="Write the collector's feedback..."
                className="w-full rounded-md border border-input bg-background px-3 py-3 text-sm leading-relaxed"
              />
            </label>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Name */}
              <Field
                label="Name"
                value={name}
                onChange={setName}
                placeholder="e.g. Agrima"
              />

              {/* Location */}
              <Field
                label="Location"
                value={location}
                onChange={setLocation}
                placeholder="e.g. Bengaluru"
              />

              {/* Date */}
              <Field
                label="Date"
                value={date}
                onChange={setDate}
                type="date"
              />

              {/* Rating */}
              <label className="space-y-2">
                <span className="text-sm font-medium">
                  Rating
                </span>

                <select
                  value={rating}
                  onChange={(event) =>
                    setRating(
                      event.target.value,
                    )
                  }
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">
                    No rating
                  </option>

                  <option value="5">
                    5 stars
                  </option>

                  <option value="4">
                    4 stars
                  </option>

                  <option value="3">
                    3 stars
                  </option>

                  <option value="2">
                    2 stars
                  </option>

                  <option value="1">
                    1 star
                  </option>
                </select>
              </label>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                type="button"
                disabled={creating}
                onClick={handleCreate}
              >
                {creating ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="size-4" />
                    Create feedback
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                disabled={creating}
                onClick={() => {
                  setQuote("");
                  setName("");
                  setLocation("");
                  setDate("");
                  setRating("");
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Existing feedback */}
      {loading ? (
        <div className="mt-12 flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
        </div>
      ) : feedback.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border px-6 py-16 text-center text-sm text-muted-foreground">
          No feedback yet.
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {feedback.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <img
                src={item.thumbUrl}
                alt="Customer feedback"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />

              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-xs text-muted-foreground">
                  Feedback card
                </span>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(item)
                  }
                  className="text-muted-foreground transition-colors hover:text-destructive"
                  aria-label="Delete feedback"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium">
        {label}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      />
    </label>
  );
}