import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  ExternalLink,
  Star,
} from "lucide-react";
import { toast } from "sonner";

import { Reveal } from "@/components/common/Reveal";
import { submitCustomerFeedback } from "@/services/customer-feedback.service";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      {
        title: "Share Your Thoughts • PaintTheory",
      },
      {
        name: "description",
        content:
          "Share your experience with a PaintTheory artwork.",
      },
    ],
  }),
  component: FeedbackPage,
});

function FeedbackPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [allowPublish, setAllowPublish] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      toast.error("Please add your name.");
      return;
    }

    if (!trimmedMessage) {
      toast.error("Please share your thoughts.");
      return;
    }

    if (rating === 0) {
      toast.error("Please choose a rating.");
      return;
    }

    try {
      setSubmitting(true);

      await submitCustomerFeedback({
        name: trimmedName,
        message: trimmedMessage,
        rating,
        allowPublish,
      });

      setSubmitted(true);

      setName("");
      setMessage("");
      setRating(0);
      setAllowPublish(false);
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-[1400px] px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">

      {submitted ? (
        <Reveal className="mx-auto max-w-2xl text-center">

          {/* PaintTheory */}
          <p
            className="text-2xl tracking-tight text-foreground"
            style={{
              fontFamily: "Melodrama",
            }}
          >
            PaintTheory
          </p>

          {/* Success icon */}
          <div className="mx-auto mt-8 flex size-10 items-center justify-center rounded-full bg-foreground/5">
            <Check className="size-5" />
          </div>

          {/* Heading */}
          <h1 className="display mt-6 text-4xl md:text-6xl">
            Thank you.
          </h1>

          {/* Message */}
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Your feedback has been received. I really appreciate
            you taking the time to share it.
          </p>

          {/* Visit website */}
          <Link
            to="/"
            className="
              group
              mt-8
              inline-flex
              items-center
              gap-2
              text-xs
              font-medium
            "
          >
            <span className="link-underline">
              Visit PaintTheory
            </span>

            <ExternalLink
              className="
                size-3.5
                text-muted-foreground
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </Link>

        </Reveal>
      ) : (
        <div className="mx-auto max-w-2xl">

          {/* Intro */}
          <Reveal>

            <p
              className="text-xl tracking-tight text-foreground"
              style={{
                fontFamily: "Melodrama",
              }}
            >
              PaintTheory
            </p>

            <span className="label mt-8 block">
              A little note
            </span>

            <h1 className="display mt-5 text-3xl md:text-5xl">
              Share your thoughts
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
              I’d love to know what you thought of the painting.
              A few words, a feeling, or simply what came to mind
              when you first saw it.
            </p>

          </Reveal>


          {/* Form */}
          <Reveal className="mt-12">

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="feedback-name"
                  className="label"
                >
                  Your name
                </label>

                <input
                  id="feedback-name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Your name"
                  autoComplete="name"
                  className="
                    mt-3
                    w-full
                    border-0
                    border-b
                    border-border
                    bg-transparent
                    px-0
                    py-3
                    text-sm
                    outline-none
                    transition-colors
                    placeholder:text-muted-foreground/50
                    focus:border-foreground
                  "
                />
              </div>


              {/* Rating */}
              <div>
                <span className="label">
                  How would you rate your experience?
                </span>

                <div className="mt-4 flex items-center gap-2">

                  {[1, 2, 3, 4, 5].map(
                    (value) => (
                      <button
                        key={value}
                        type="button"
                        aria-label={`${value} star${value > 1 ? "s" : ""}`}
                        aria-pressed={
                          rating === value
                        }
                        onClick={() =>
                          setRating(value)
                        }
                        className="
                          p-1
                          text-muted-foreground/40
                          transition-all
                          duration-200
                          hover:scale-105
                          hover:text-foreground
                          focus:outline-none
                        "
                      >
                        <Star
                          className={`
                            size-5
                            ${
                              value <= rating
                                ? "fill-current text-foreground"
                                : ""
                            }
                          `}
                        />
                      </button>
                    ),
                  )}

                </div>
              </div>


              {/* Message */}
              <div>
                <label
                  htmlFor="feedback-message"
                  className="label"
                >
                  Your thoughts
                </label>

                <textarea
                  id="feedback-message"
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  placeholder="Tell me what you thought..."
                  rows={5}
                  className="
                    mt-3
                    w-full
                    resize-none
                    border-0
                    border-b
                    border-border
                    bg-transparent
                    px-0
                    py-3
                    text-sm
                    leading-relaxed
                    outline-none
                    transition-colors
                    placeholder:text-muted-foreground/50
                    focus:border-foreground
                  "
                />
              </div>


              {/* Permission */}
              <label className="flex cursor-pointer items-start gap-3">

                <input
                  type="checkbox"
                  checked={allowPublish}
                  onChange={(event) =>
                    setAllowPublish(
                      event.target.checked,
                    )
                  }
                  className="
                    mt-0.5
                    size-3.5
                    shrink-0
                    accent-foreground
                  "
                />

                <span className="text-xs leading-relaxed text-muted-foreground">
                  I’m happy for my feedback to be
                  featured on PaintTheory.
                </span>

              </label>


              {/* Submit */}
              <button
  type="submit"
  disabled={submitting}
  className="
    rounded-full
    bg-foreground
    px-5
    py-2.5
    text-xs
    font-medium
    text-background
    transition-opacity
    hover:opacity-80
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
>
  {submitting ? "Sending..." : "Send feedback"}
</button>

            </form>

          </Reveal>
        </div>
      )}

    </main>
  );
}