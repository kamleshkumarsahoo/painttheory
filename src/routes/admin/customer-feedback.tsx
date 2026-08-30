import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Check,
  Clock,
  Star,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  deleteCustomerFeedback,
  getCustomerFeedback,
  type CustomerFeedback,
} from "@/services/customer-feedback.service";

export const Route = createFileRoute(
  "/admin/customer-feedback",
)({
  component: CustomerFeedbackPage,
});

function CustomerFeedbackPage() {
  const [feedback, setFeedback] = useState<CustomerFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function loadFeedback() {
    try {
      setLoading(true);

      const data = await getCustomerFeedback();

      setFeedback(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFeedback();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Delete this customer feedback? This cannot be undone.",
    );

    if (!confirmed) return;

    try {
      setDeleting(id);

      await deleteCustomerFeedback(id);

      setFeedback((current) =>
        current.filter((item) => item.id !== id),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">

      {/* Header */}
      <header className="border-b border-border pb-5 sm:pb-6">

        <p className="eyebrow">
          Studio dashboard
        </p>

        <div className="mt-1 flex items-baseline gap-3">

          <h1 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">
            Customer feedback
          </h1>

          {!loading && (
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
              {feedback.length}
            </span>
          )}

        </div>

        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Private feedback submitted by collectors. Nothing here
          is published automatically.
        </p>

      </header>


      {/* Content */}
      {loading ? (

        <div className="py-16 text-center text-sm text-muted-foreground">
          Loading feedback...
        </div>

      ) : feedback.length === 0 ? (

        <div
          className="
            mt-6
            rounded-2xl
            border
            border-dashed
            border-border
            bg-card/50
            px-5
            py-12
            text-center
            text-sm
            text-muted-foreground
          "
        >
          No customer feedback yet.
        </div>

      ) : (

        <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">

          {feedback.map((item) => (
            <FeedbackCard
              key={item.id}
              feedback={item}
              deleting={deleting === item.id}
              onDelete={() =>
                handleDelete(item.id)
              }
            />
          ))}

        </div>

      )}

    </div>
  );
}


/* ============================================================
   FEEDBACK CARD
============================================================ */

function FeedbackCard({
  feedback,
  deleting,
  onDelete,
}: {
  feedback: CustomerFeedback;
  deleting: boolean;
  onDelete: () => void;
}) {
  const date = new Date(
    feedback.created_at,
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article
      className="
        rounded-2xl
        border
        border-border
        bg-card
        p-4
        shadow-soft
        sm:p-5
      "
    >

      {/* Top row */}
      <div className="flex items-start gap-3">

        <div className="min-w-0 flex-1">

          {/* Name */}
          <h2 className="font-display text-lg text-foreground sm:text-xl">
            {feedback.name}
          </h2>


          {/* Rating */}
          <div
            className="mt-2 flex items-center gap-0.5"
            aria-label={`${feedback.rating} out of 5 stars`}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`
                  size-3.5
                  ${
                    star <= feedback.rating
                      ? "fill-current text-foreground"
                      : "text-muted-foreground/20"
                  }
                `}
              />
            ))}
          </div>


          {/* Date + permission */}
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">

            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" />
              {date}
            </span>

            <span className="text-border">
              ·
            </span>

            {feedback.allow_publish ? (
              <span className="inline-flex items-center gap-1 text-foreground/70">
                <Check className="size-3" />
                Permission to feature
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <X className="size-3" />
                Private
              </span>
            )}

          </div>

        </div>


        {/* Delete */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={deleting}
          onClick={onDelete}
          className="
            shrink-0
            text-muted-foreground
            hover:text-destructive
          "
          aria-label="Delete feedback"
        >
          <Trash2 className="size-4" />
        </Button>

      </div>


      {/* Message */}
      <blockquote
        className="
          mt-5
          max-w-3xl
          text-sm
          leading-relaxed
          text-foreground/85
          sm:text-base
        "
      >
        “{feedback.message}”
      </blockquote>

    </article>
  );
}