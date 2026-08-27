import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDateOnly } from "@/lib/date";
import { getEffectiveInquiryStatus } from "@/lib/inquiry-status";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/types/artwork";

function fmt(iso: string) {
  return formatDateOnly(iso);
}

function inquiryPrice(inquiry: any) {
  return inquiry.artwork_price_snapshot ?? inquiry.artworks?.price ?? 0;
}

function getArtworkImage(artwork: any) {
  if (!artwork) {
    return null;
  }

  // Prefer the primary artwork media.
  const media = artwork.artwork_media ?? [];

  const primary =
    media.find((item: any) => item.role === "primary") ??
    [...media].sort(
      (a: any, b: any) =>
        (a.sort_order ?? 0) - (b.sort_order ?? 0),
    )[0];

  if (primary) {
    const path =
      primary.medium_path ??
      primary.thumb_path ??
      primary.large_path ??
      primary.original_path;

    if (path) {
      return supabase.storage
        .from("artworks")
        .getPublicUrl(path)
        .data.publicUrl;
    }
  }

  // Fallback for older artworks.
  return artwork.thumbnail_url ?? null;
}

export function InquiryCard({
  inquiry,
}: {
  inquiry: any;
}) {
  const isCommission = !inquiry.artwork_id;
  const artwork = inquiry.artworks;
  const artworkImage = getArtworkImage(artwork);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift">
      <div className="flex gap-4 p-4">
        {isCommission ? (
          <div className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-secondary text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            Commission
          </div>
        ) : artworkImage ? (
          <img
            src={artworkImage}
            alt={artwork.title ?? "Artwork"}
            loading="lazy"
            className="size-20 shrink-0 rounded-xl object-cover"
          />
        ) : (
          <div className="size-20 shrink-0 rounded-xl bg-secondary" />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <StatusBadge
              status={getEffectiveInquiryStatus(inquiry)}
            />

            <span className="shrink-0 text-xs text-muted-foreground">
              {fmt(inquiry.created_at)}
            </span>
          </div>

          <h3 className="mt-2 truncate font-display text-lg leading-tight text-foreground">
            {isCommission
              ? "Commission request"
              : artwork?.title ?? "Artwork inquiry"}
          </h3>

          <p className="truncate text-sm text-foreground/80">
            {inquiry.customer_name}
          </p>

          <p className="mt-1 text-xs font-medium text-accent">
            {inquiry.order_number ?? `Ref ${inquiry.id.slice(0, 8)}`}
          </p>

          <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
            <Mail className="size-3" />
            {inquiry.customer_email}
          </p>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border px-4 py-3">
        <div>
          <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            {isCommission ? "Request" : "Quote"}
          </p>

          <p className="font-display text-base text-foreground">
            {isCommission
              ? "To be discussed"
              : formatPrice(inquiryPrice(inquiry))}
          </p>
        </div>

        <Button
          asChild
          size="sm"
          variant={
            inquiry.inquiry_status === "NEW"
              ? "default"
              : "outline"
          }
        >
          <Link
            to="/admin/inquiries/$inquiryId"
            params={{
              inquiryId: inquiry.id,
            }}
          >
            Review
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>
    </article>
  );
}