import { useState } from "react";
import { Expand } from "lucide-react";

interface ArtworkPanelProps {
  artwork: {
    id: string;
    title: string;
    thumbnail_url: string;
    price: number;
    medium?: string;
    dimensions?: string;
  };
}

export function ArtworkPanel({ artwork }: ArtworkPanelProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <p className="eyebrow">
            Artwork
        </p>
        <div className="mt-5 flex gap-5">

            <button
            onClick={() => setPreviewOpen(true)}
            className="group relative shrink-0"
            >
            <img
                src={artwork.thumbnail_url}
                alt={artwork.title}
                className="h-28 w-28 rounded-xl border border-border object-cover transition-all duration-300 group-hover:shadow-lift"
            />

            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/35 opacity-0 transition-opacity group-hover:opacity-100">
                <Expand className="size-5 text-white" />
            </div>
            </button>

            <div className="min-w-0 flex-1">

            <h2 className="font-display text-2xl text-foreground">
                {artwork.title}
            </h2>

            <p className="mt-1 font-display text-xl text-accent">
                ₹{artwork.price.toLocaleString()}
            </p>

            {(artwork.medium || artwork.dimensions) && (
                <div className="mt-4 space-y-1 text-sm text-muted-foreground">

                {artwork.medium && (
                    <p>{artwork.medium}</p>
                )}

                {artwork.dimensions && (
                    <p>{artwork.dimensions}</p>
                )}

                </div>
            )}
            </div>
        </div>
      </div>

      {previewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-10"
          onClick={() => setPreviewOpen(false)}
        >
          <img
            src={artwork.thumbnail_url}
            alt={artwork.title}
            className="max-h-[92vh] max-w-[92vw] rounded-3xl shadow-frame"
          />
        </div>
      )}
    </>
  );
}