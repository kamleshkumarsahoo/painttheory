import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import {
  getAllArtworks,
  deleteArtwork,
} from "@/services/artwork.service";
import { formatPrice } from "@/types/artwork";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/artworks/")({
  component: AdminArtworksPage,
});

function AdminArtworksPage() {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadArtworks() {
    try {
      setLoading(true);
      setError("");

      const data = await getAllArtworks();

      console.log("ADMIN ARTWORKS:", data);

      setArtworks(data);
    } catch (error) {
      console.error("FAILED TO LOAD ARTWORKS:", error);

      setError(
        error instanceof Error
          ? error.message
          : JSON.stringify(error),
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadArtworks();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Delete this artwork? This cannot be undone.",
    );

    if (!confirmed) return;

    try {
      await deleteArtwork(id);
      await loadArtworks();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Studio dashboard</p>
          <h1 className="mt-1 font-display text-4xl text-foreground">
            Artworks
          </h1>
        </div>

        <Button asChild>
          <Link to="/admin/artworks/new">
            <Plus className="size-4" />
            Add artwork
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted-foreground">
          Loading artworks...
        </div>
      ) : error ? (
      <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-12 text-center">
        <p className="text-sm font-medium text-red-700">
          Failed to load artworks
        </p>

        <p className="mt-2 text-xs text-red-600">
          {error}
        </p>
      </div>
    ) : artworks.length === 0 ? (
      <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/50 px-5 py-12 text-center text-sm text-muted-foreground">
        No artworks yet.
      </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork) => (
            <article
              key={artwork.id}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              {artwork.image && (
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="aspect-[4/5] w-full object-cover"
                />
              )}

              <div className="p-5">
                <p className="eyebrow">{artwork.id}</p>

                <h2 className="mt-2 font-display text-xl text-foreground">
                  {artwork.title}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {artwork.medium}
                </p>

                <p className="mt-3 font-display text-lg text-accent">
                  {formatPrice(artwork.price)}
                </p>

                <div className="mt-5 flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link
                      to="/admin/artworks/$artworkId"
                      params={{ artworkId: artwork.id }}
                    >
                      Edit
                    </Link>
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(artwork.id)}
                  >
                    Delete
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