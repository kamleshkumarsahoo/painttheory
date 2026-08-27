import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Edit,
  Pin,
  PinOff,
  Plus,
  Trash2,
} from "lucide-react";

import {
  deleteJournal,
  getAllJournal,
  toggleJournalPinned,
  type JournalEntry,
} from "@/services/journal.service";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/journal/")({
  component: AdminJournalPage,
});

function getPrimaryImage(entry: JournalEntry) {
  const primary =
    entry.media.find(
      (item) => item.role === "primary",
    ) ?? entry.media[0];

  return primary?.mediumUrl ?? "/placeholder.jpg";
}

function AdminJournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] =
    useState<string | null>(null);
  const [pinningId, setPinningId] =
    useState<string | null>(null);

  useEffect(() => {
    getAllJournal()
      .then(setEntries)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(entry: JournalEntry) {
    const confirmed = window.confirm(
      `Delete "${entry.title}"?\n\nThis cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(entry.id);

      await deleteJournal(entry.id);

      setEntries((current) =>
        current.filter(
          (item) => item.id !== entry.id,
        ),
      );
    } catch (error) {
      console.error(error);

      window.alert(
        "Could not delete this journal. Please try again.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  async function handlePin(entry: JournalEntry) {
    try {
      setPinningId(entry.id);

      const nextPinned = !entry.pinned;

      await toggleJournalPinned(
        entry.id,
        nextPinned,
      );

      setEntries((current) =>
        current.map((item) =>
          item.id === entry.id
            ? {
                ...item,
                pinned: nextPinned,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error(error);

      window.alert(
        "Could not update the homepage pin. Please try again.",
      );
    } finally {
      setPinningId(null);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Studio journal</p>

          <h1 className="mt-1 font-display text-4xl text-foreground">
            Journal
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Create, edit, and manage your studio journal.
          </p>
        </div>

        <Button asChild>
          <Link to="/admin/journal/new">
            <Plus className="size-4" />
            New journal
          </Link>
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="mt-10 text-sm text-muted-foreground">
          Loading journal…
        </p>
      ) : entries.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border px-6 py-16 text-center text-sm text-muted-foreground">
          No journal entries yet.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={getPrimaryImage(entry)}
                  alt={entry.title}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />

                {/* Pinned badge */}
                {entry.pinned && (
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/90 px-3 py-1.5 text-[11px] font-medium backdrop-blur">
                    <Pin className="size-3" />
                    Pinned
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-5">
                <p className="eyebrow">
                  {entry.category}
                </p>

                <h2 className="mt-2 font-display text-xl text-foreground">
                  {entry.title}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  {entry.location ?? "Studio"} ·{" "}
                  {entry.readTime} min read
                </p>

                {/* Actions */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                  >
                    <Link
                      to="/admin/journal/$journalId"
                      params={{
                        journalId: entry.id,
                      }}
                    >
                      <Edit className="size-3.5" />
                      Edit
                    </Link>
                  </Button>

                  <Button
                    type="button"
                    variant={
                      entry.pinned
                        ? "secondary"
                        : "outline"
                    }
                    size="sm"
                    disabled={pinningId === entry.id}
                    onClick={() =>
                      handlePin(entry)
                    }
                  >
                    {entry.pinned ? (
                      <PinOff className="size-3.5" />
                    ) : (
                      <Pin className="size-3.5" />
                    )}

                    {pinningId === entry.id
                      ? "Saving…"
                      : entry.pinned
                        ? "Unpin"
                        : "Pin"}
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    disabled={deletingId === entry.id}
                    onClick={() =>
                      handleDelete(entry)
                    }
                  >
                    <Trash2 className="size-3.5" />

                    {deletingId === entry.id
                      ? "Deleting…"
                      : "Delete"}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}