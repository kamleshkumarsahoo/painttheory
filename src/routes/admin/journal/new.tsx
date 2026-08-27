import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  Save,
  X,
} from "lucide-react";

import {
  createJournal,
  uploadJournalMedia,
  type JournalCategory,
} from "@/services/journal.service";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/journal/new")({
  component: NewJournalPage,
});

function NewJournalPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState<JournalCategory>("Story");
  const [location, setLocation] = useState("");
  const [publishedAt, setPublishedAt] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [readTime, setReadTime] = useState("5");
  const [body, setBody] = useState("");

  const [primaryFile, setPrimaryFile] =
    useState<File | null>(null);

  const [secondaryFiles, setSecondaryFiles] =
    useState<File[]>([]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const primaryInputRef =
    useRef<HTMLInputElement>(null);

  const secondaryInputRef =
    useRef<HTMLInputElement>(null);

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
        published_at: new Date(
          `${publishedAt}T12:00:00`,
        ).toISOString(),
        read_time: Number(readTime) || 5,
        category,
      });

      await uploadJournalMedia({
        journalId: journal.id,
        file: primaryFile,
        role: "primary",
        sortOrder: 0,
        altText: title.trim(),
      });

      for (
        let index = 0;
        index < secondaryFiles.length;
        index += 1
      ) {
        await uploadJournalMedia({
          journalId: journal.id,
          file: secondaryFiles[index],
          role: "secondary",
          sortOrder: index + 1,
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
          : "Could not create journal entry.",
      );
    } finally {
      setSaving(false);
    }
  }

  function handlePrimaryChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0] ?? null;
    setPrimaryFile(file);

    // Allows selecting the same file again later.
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

    // Allows selecting the same file again later.
    event.target.value = "";
  }

  function removeSecondaryFile(index: number) {
    setSecondaryFiles((current) =>
      current.filter((_, fileIndex) => fileIndex !== index),
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
      <button
        type="button"
        onClick={() =>
          navigate({ to: "/admin/journal" })
        }
        className="link-underline inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to journal
      </button>

      <div className="mt-6">
        <p className="eyebrow">Studio journal</p>

        <h1 className="mt-1 font-display text-4xl text-foreground">
          New journal
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
                    event.target.value as JournalCategory,
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
              placeholder="Write the journal entry here. Leave a blank line between paragraphs."
              className="w-full rounded-md border border-input bg-background px-3 py-3 text-sm leading-relaxed"
            />
          </label>
        </section>

        {/* Primary photo */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Primary photo</p>

              <p className="mt-1 text-xs text-muted-foreground">
                This is the main image for the journal.
              </p>
            </div>

            {primaryFile && (
              <button
                type="button"
                onClick={() => {
                  setPrimaryFile(null);

                  if (primaryInputRef.current) {
                    primaryInputRef.current.value = "";
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-destructive"
              >
                <X className="size-3.5" />
                Remove
              </button>
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
            <button
              type="button"
              onClick={() =>
                primaryInputRef.current?.click()
              }
              className="group relative mt-5 block w-full overflow-hidden rounded-2xl border border-border bg-secondary text-left"
            >
              <img
                src={URL.createObjectURL(primaryFile)}
                alt={primaryFile.name}
                className="max-h-[420px] w-full object-contain"
              />

              <div className="absolute inset-x-0 bottom-0 bg-background/85 px-4 py-3 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                <p className="truncate text-xs font-medium">
                  {primaryFile.name}
                </p>

                <p className="mt-1 text-[11px] text-muted-foreground">
                  Click to choose a different image
                </p>
              </div>
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                primaryInputRef.current?.click()
              }
              className="mt-5 flex w-full cursor-pointer items-center justify-center rounded-2xl border border-dashed border-border px-6 py-16 text-center transition-colors hover:bg-secondary"
            >
              <div>
                <ImagePlus className="mx-auto size-7 text-muted-foreground" />

                <p className="mt-3 text-sm font-medium">
                  Choose primary photo
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Click to browse your images.
                </p>
              </div>
            </button>
          )}
        </section>

        {/* Secondary photos */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">
                Secondary photos
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                These will appear throughout the journal.
              </p>
            </div>

            {secondaryFiles.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {secondaryFiles.length} selected
              </span>
            )}
          </div>

          <input
            ref={secondaryInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleSecondaryChange}
          />

          {secondaryFiles.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {secondaryFiles.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="group relative overflow-hidden rounded-xl border border-border bg-secondary"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="aspect-square w-full object-cover"
                  />

                  <button
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    onClick={() =>
                      removeSecondaryFile(index)
                    }
                    className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="size-3.5" />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 bg-background/80 px-2 py-2 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <p className="truncate text-[10px]">
                      {file.name}
                    </p>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  secondaryInputRef.current?.click()
                }
                className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-border transition-colors hover:bg-secondary"
              >
                <div className="text-center">
                  <ImagePlus className="mx-auto size-5 text-muted-foreground" />

                  <span className="mt-2 block text-xs font-medium">
                    Add more
                  </span>
                </div>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() =>
                secondaryInputRef.current?.click()
              }
              className="mt-5 flex w-full cursor-pointer items-center justify-center rounded-2xl border border-dashed border-border px-6 py-14 text-center transition-colors hover:bg-secondary"
            >
              <div>
                <ImagePlus className="mx-auto size-7 text-muted-foreground" />

                <p className="mt-3 text-sm font-medium">
                  Add secondary photos
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Select multiple images.
                </p>
              </div>
            </button>
          )}
        </section>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Save */}
        <Button
          type="submit"
          size="lg"
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving journal…
            </>
          ) : (
            <>
              <Save className="size-4" />
              Save journal
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