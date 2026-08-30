import {
  createFileRoute,
  Link,
  notFound,
} from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Moon,
  Sun,
} from "lucide-react";
import { motion } from "motion/react";

import {
  getJournalById,
  type JournalEntry,
} from "@/services/journal.service";

export const Route = createFileRoute(
  "/journal/$journalId",
)({
  loader: async ({ params }) => {
    try {
      const journal = await getJournalById(
        params.journalId,
      );

      if (!journal) {
        throw notFound();
      }

      return { journal };
    } catch {
      throw notFound();
    }
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          {
            title:
              "Journal entry not found • PaintTheory",
          },
          {
            name: "robots",
            content: "noindex",
          },
        ],
      };
    }

    const { journal } = loaderData;

    return {
      meta: [
        {
          title: `${journal.title} • PaintTheory`,
        },
        {
          name: "description",
          content: journal.body
            .replace(/\s+/g, " ")
            .slice(0, 155),
        },
      ],
    };
  },

  notFoundComponent: JournalNotFound,
  component: JournalArticlePage,
});

function JournalNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="label">Journal</p>

      <h1 className="display mt-4 text-4xl">
        This note couldn't be found
      </h1>

      <Link
        to="/journal"
        className="link-underline mt-8 inline-block text-xs font-medium"
      >
        Back to journal →
      </Link>
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getPrimaryMedia(
  journal: JournalEntry,
) {
  return (
    journal.media.find(
      (item) => item.role === "primary",
    ) ?? journal.media[0]
  );
}

function JournalArticlePage() {
  const { journal } = Route.useLoaderData();

  const [darkMode, setDarkMode] = useState(false);

  const primary = getPrimaryMedia(journal);

  const secondary = useMemo(
    () =>
      journal.media
        .filter(
          (item) => item.role === "secondary",
        )
        .sort(
          (a, b) =>
            a.sortOrder - b.sortOrder,
        ),
    [journal],
  );

  const paragraphs = journal.body
    .split(/\n\s*\n/)
    .map((text) => text.trim())
    .filter(Boolean);

  return (
    <div
      className={[
        "min-h-screen transition-colors duration-500",
        darkMode
          ? "bg-[#171613] text-[#eee8dc]"
          : "bg-background text-foreground",
      ].join(" ")}
    >
      <article className="mx-auto w-full max-w-[820px] px-6 pb-20 pt-20 md:px-10 md:pt-28">

        {/* Controls */}
        <div className="flex items-center justify-between">
          <Link
            to="/journal"
            className={[
              "inline-flex items-center gap-2 text-xs transition-colors",
              darkMode
                ? "text-[#bdb5a6] hover:text-[#eee8dc]"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            <ArrowLeft className="size-3.5" />
            Back to journal
          </Link>

          <button
            type="button"
            onClick={() =>
              setDarkMode(
                (current) => !current,
              )
            }
            className={[
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] transition-colors",
              darkMode
                ? "border-white/15 text-[#eee8dc] hover:bg-white/5"
                : "border-border text-muted-foreground hover:bg-secondary",
            ].join(" ")}
          >
            {darkMode ? (
              <Sun className="size-3" />
            ) : (
              <Moon className="size-3" />
            )}

            {darkMode ? "Light" : "Dark"}
          </button>
        </div>

        {/* Header */}
        <header className="mt-12 w-full text-center">
          <p
            className={[
              "label",
              darkMode
                ? "text-[#b99d7a]"
                : "text-clay",
            ].join(" ")}
          >
            {journal.category}
          </p>

          <h1 className="display mt-3 text-4xl leading-[0.98] md:text-6xl">
            {journal.title}
          </h1>

          <div
            className={[
              "mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap text-[11px]",
              darkMode
                ? "text-[#aaa293]"
                : "text-muted-foreground",
            ].join(" ")}
          >
            {journal.location && (
              <>
                <span>{journal.location}</span>
                <span>·</span>
              </>
            )}

            <span>
              {formatDate(
                journal.publishedAt,
              )}
            </span>

            <span>·</span>

            <span>
              {journal.readTime} min read
            </span>
          </div>
        </header>

        {/* Primary image */}
        {primary && (
          <motion.figure
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 w-full"
          >
            <img
              src={primary.largeUrl}
              alt={
                primary.altText ||
                journal.title
              }
              className="block aspect-[16/9] w-full object-cover"
            />
          </motion.figure>
        )}

        {/* Text */}
        <div
          className={[
            "mt-10 w-full",
            darkMode
              ? "text-[#ddd6ca]"
              : "text-foreground/85",
          ].join(" ")}
        >
          <div className="space-y-4">
            {paragraphs.map(
              (paragraph, index) => (
                <p
                  key={index}
                  className="text-[13px] leading-[1.75] md:text-[14px]"
                >
                  {paragraph}
                </p>
              ),
            )}
          </div>
        </div>

        {/* Secondary gallery */}
        {secondary.length > 0 && (
          <section className="mt-10 w-full">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {secondary.map((media) => (
                <motion.figure
                  key={media.id}
                  initial={{
                    opacity: 0,
                    y: 14,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-60px",
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="w-full"
                >
                  <img
                    src={media.largeUrl}
                    alt={
                      media.altText ||
                      journal.title
                    }
                    loading="lazy"
                    className="block aspect-[4/3] w-full object-cover"
                  />
                </motion.figure>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <div
          className={[
            "mt-10 w-full border-t pt-5 text-[11px]",
            darkMode
              ? "border-white/10 text-[#aaa293]"
              : "border-border text-muted-foreground",
          ].join(" ")}
        >
          {journal.category} ·{" "}
          {journal.readTime} min read
        </div>
      </article>
    </div>
  );
}