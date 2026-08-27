import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  Save,
  Trash2,
  X,
} from "lucide-react";

import {
  deleteJournalMedia,
  getJournalById,
  updateJournal,
  uploadJournalMedia,
  type JournalCategory,
  type JournalEntry,
  type JournalMedia,
} from "@/services/journal.service";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute(
  "/admin/journal/$journalId",
)({
  component: EditJournalPage,
});

function EditJournalPage() {
  const navigate = useNavigate();

  const { journalId } = useParams({
    from: "/admin/journal/$journalId",
  });

  const [journal, setJournal] =
    useState<JournalEntry | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState<JournalCategory>("Story");
  const [location, setLocation] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [readTime, setReadTime] = useState("5");
  const [body, setBody] = useState("");

  const [primaryFile, setPrimaryFile] =
    useState<File | null>(null);

  const [secondaryFiles, setSecondaryFiles] =
    useState<File[]>([]);

  const [deletingMediaId, setDeletingMediaId] =
    useState<string | null>(null);

  const primaryInputRef =
    useRef<HTMLInputElement>(null);

  const secondaryInputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadJournal() {
      try {
        const data =
          await getJournalById(journalId);

        setJournal(data);
        setTitle(data.title);
        setCategory(data.category);
        setLocation(data.location ?? "");
        setPublishedAt(
          data.publishedAt
            ? new Date(data.publishedAt)
                .toISOString()
                .slice(0, 10)
            : "",
        );
        setReadTime(String(data.readTime));
        setBody(data.body);
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Could not load journal.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadJournal();
  }, [journalId]);

  async function handleSave(
    event: React.FormEvent<HTMLFormElement>,
  ) {
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
        published_at: new Date(
          `${publishedAt}T12:00:00`,
        ).toISOString(),
        read_time: Number(readTime) || 5,
        category,
      });

      /*
       * If a new primary was selected:
       * 1. Delete the old primary.
       * 2. Upload the new primary.
       */
      if (primaryFile) {
        const currentPrimary =
          journal?.media.find(
            (media) => media.role === "primary",
          ) ?? journal?.media[0];

        if (currentPrimary) {
          await deleteJournalMedia(
            currentPrimary.id,
          );
        }

        await uploadJournalMedia({
          journalId,
          file: primaryFile,
          role: "primary",
          sortOrder: 0,
          altText: title.trim(),
        });
      }

      /*
       * Add newly selected secondary photos.
       */
      for (
        let index = 0;
        index < secondaryFiles.length;
        index += 1
      ) {
        const existingSecondaryCount =
          journal?.media.filter(
            (media) => media.role === "secondary",
          ).length ?? 0;

        await uploadJournalMedia({
          journalId,
          file: secondaryFiles[index],
          role: "secondary",
          sortOrder:
            existingSecondaryCount +
            index +
            1,
          altText: title.trim(),
        });
      }

      await navigate({
        to: "/admin/journal",
      });
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Could not update journal entry.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteMedia(
    media: JournalMedia,
  ) {
    const confirmed = window.confirm(
      media.role === "primary"
        ? "Delete the current primary photo?"
        : "Delete this secondary photo?",
    );

    if (!confirmed) return;

    try {
      setDeletingMediaId(media.id);
      setError("");

      await deleteJournalMedia(media.id);

      setJournal((current) => {
        if (!current) return current;

        return {
          ...current,
          media: current.media.filter(
            (item) => item.id !== media.id,
          ),
        };
      });
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Could not delete photo.",
      );
    } finally {
      setDeletingMediaId(null);
    }
  }

  function handlePrimaryChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setPrimaryFile(
      event.target.files?.[0] ?? null,
    );

    event.target.value = "";
  }

  function handleSecondaryChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(
      event.target.files ?? [],
    );

    setSecondaryFiles((current) => [
      ...current,
      ...files,
    ]);

    event.target.value = "";
  }

  function removeSecondaryFile(
    index: number,
  ) {
    setSecondaryFiles((current) =>
      current.filter(
        (_, fileIndex) => fileIndex !== index,
      ),
    );
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
        <p className="text-sm text-muted-foreground">
          Loading journal…
        </p>
      </div>
    );
  }

  const currentPrimary =
    journal?.media.find(
      (media) => media.role === "primary",
    ) ?? journal?.media[0];

  const currentSecondary =
    journal?.media
      .filter(
        (media) => media.role === "secondary",
      )
      .sort(
        (a, b) =>
          a.sortOrder - b.sortOrder,
      ) ?? [];

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
      <button
        type="button"
        onClick={() =>
          navigate({
            to: "/admin/journal",
          })
        }
        className="link-underline inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to journal
      </button>

      <div className="mt-6">
        <p className="eyebrow">Studio journal</p>

        <h1 className="mt-1 font-display text-4xl text-foreground">
          Edit journal
        </h1>
      </div>

      <form
        onSubmit={handleSave}
        className="mt-8 space-y-6"
      >
        {/* Details */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Title"
              value={title}
              onChange={setTitle}
              required
            />

            <label className="space-y-2">
              <span className="text-sm font-medium">
                Category
              </span>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target
                      .value as JournalCategory,
                  )
                }
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="Commission">
                  Commission
                </option>
                <option value="Story">
                  Story
                </option>
                <option value="Process">
                  Process
                </option>
              </select>
            </label>

            <Field
              label="Location"
              value={location}
              onChange={setLocation}
              placeholder="e.g. Bengaluru"
            />

            <Field
              label="Read time (minutes)"
              value={readTime}
              onChange={setReadTime}
              type="number"
            />

            <Field
              label="Date"
              value={publishedAt}
              onChange={setPublishedAt}
              type="date"
            />
          </div>

          <label className="mt-5 block space-y-2">
            <span className="text-sm font-medium">
              Body
            </span>

            <textarea
              value={body}
              onChange={(event) =>
                setBody(event.target.value)
              }
              rows={14}
              className="w-full rounded-md border border-input bg-background px-3 py-3 text-sm leading-relaxed"
            />
          </label>
        </section>

        {/* Primary */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">
                Primary photo
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Current main image.
              </p>
            </div>

            {currentPrimary && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                disabled={
                  deletingMediaId ===
                  currentPrimary.id
                }
                onClick={() =>
                  handleDeleteMedia(
                    currentPrimary,
                  )
                }
              >
                {deletingMediaId ===
                currentPrimary.id ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Trash2 className="size-3.5" />
                )}
                Delete
              </Button>
            )}
          </div>

          <input
            ref={primaryInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePrimaryChange}
          />

          {primaryFile ? (
            <div className="relative mt-5 overflow-hidden rounded-2xl border border-border bg-secondary">
              <img
                src={URL.createObjectURL(
                  primaryFile,
                )}
                alt={primaryFile.name}
                className="max-h-[420px] w-full object-contain"
              />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-background/90 px-4 py-3 backdrop-blur">
                <p className="truncate text-xs font-medium">
                  New primary: {primaryFile.name}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setPrimaryFile(null);

                    if (primaryInputRef.current) {
                      primaryInputRef.current.value = "";
                    }
                  }}
                  className="ml-4 shrink-0 text-xs text-destructive hover:underline"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : currentPrimary ? (
            <div className="relative mt-5 overflow-hidden rounded-2xl border border-border bg-secondary">
              <img
                src={currentPrimary.largeUrl}
                alt={
                  currentPrimary.altText ||
                  journal?.title ||
                  "Primary photo"
                }
                className="max-h-[420px] w-full object-contain"
              />

              <button
                type="button"
                onClick={() =>
                  primaryInputRef.current?.click()
                }
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-background"
              >
                <ImagePlus className="size-3.5" />
                Replace
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() =>
                primaryInputRef.current?.click()
              }
              className="mt-5 flex w-full items-center justify-center rounded-2xl border border-dashed border-border px-6 py-16 text-center hover:bg-secondary"
            >
              <div>
                <ImagePlus className="mx-auto size-7 text-muted-foreground" />

                <p className="mt-3 text-sm font-medium">
                  Choose primary photo
                </p>
              </div>
            </button>
          )}
        </section>

        {/* Secondary */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">
                Secondary photos
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Delete photos you no longer want, or add new ones.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                secondaryInputRef.current?.click()
              }
            >
              <ImagePlus className="size-3.5" />
              Add photos
            </Button>
          </div>

          <input
            ref={secondaryInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleSecondaryChange}
          />

          {currentSecondary.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {currentSecondary.map((media) => (
                <div
                  key={media.id}
                  className="relative overflow-hidden rounded-xl border border-border bg-secondary"
                >
                  <img
                    src={media.mediumUrl}
                    alt={
                      media.altText ||
                      journal?.title ||
                      "Journal photo"
                    }
                    className="aspect-square w-full object-cover"
                  />

                  <button
                    type="button"
                    aria-label="Delete photo"
                    disabled={
                      deletingMediaId === media.id
                    }
                    onClick={() =>
                      handleDeleteMedia(media)
                    }
                    className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-background/90 text-destructive shadow-sm backdrop-blur transition-colors hover:bg-destructive hover:text-destructive-foreground"
                  >
                    {deletingMediaId ===
                    media.id ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="size-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {secondaryFiles.length > 0 && (
            <>
              <p className="mt-6 text-xs font-medium text-foreground">
                New photos
              </p>

              <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {secondaryFiles.map(
                  (file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="relative overflow-hidden rounded-xl border border-accent/40 bg-secondary"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="aspect-square w-full object-cover"
                      />

                      <button
                        type="button"
                        aria-label="Remove selected photo"
                        onClick={() =>
                          removeSecondaryFile(
                            index,
                          )
                        }
                        className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-background/90 shadow-sm hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ),
                )}
              </div>
            </>
          )}

          {currentSecondary.length === 0 &&
            secondaryFiles.length === 0 && (
              <div className="mt-5 rounded-2xl border border-dashed border-border px-6 py-12 text-center">
                <ImagePlus className="mx-auto size-6 text-muted-foreground" />

                <p className="mt-3 text-sm font-medium">
                  No secondary photos
                </p>
              </div>
            )}
        </section>

        {error && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving changes…
            </>
          ) : (
            <>
              <Save className="size-4" />
              Save changes
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium">
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
        placeholder={placeholder}
        required={required}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      />
    </label>
  );
}