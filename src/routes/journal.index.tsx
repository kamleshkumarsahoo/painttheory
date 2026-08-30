import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/common/Reveal";
import {
  getAllJournal,
  type JournalEntry,
} from "@/services/journal.service";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal • PaintTheory" },
      {
        name: "description",
        content:
          "Journal, stories and insights on artwork, process and life by Kamlesh Sahoo",
      },
      { property: "og:title", content: "Journal • PaintTheory" },
      {
        property: "og:description",
        content: "Journal, stories and insights on artwork, process and life by Kamlesh Sahoo",
      },
    ],
  }),
  component: JournalPage,
});

function getPrimaryImage(entry: JournalEntry) {
  const primary =
    entry.media.find((media) => media.role === "primary") ??
    entry.media[0];

  return primary?.mediumUrl ?? "/placeholder.jpg";
}

function getExcerpt(body: string) {
  const clean = body.replace(/\s+/g, " ").trim();

  if (clean.length <= 160) {
    return clean;
  }

  return `${clean.slice(0, 160).trim()}…`;
}

function JournalPage() {
  const [posts, setPosts] = useState<JournalEntry[]>([]);

  useEffect(() => {
    getAllJournal()
      .then(setPosts)
      .catch(console.error);
  }, []);

  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-24 md:px-10 md:pt-26">
      <Reveal>
        <span className="label">From the studio</span>

        <h1 className="display mt-5 text-[13vw] leading-[.85] md:text-[8vw]">
          Journal
        </h1>

        <p className="mt-3 pt-3 text-sm leading-relaxed text-muted-foreground">
          Stories from my some of the fun, challenging, and occasionally absurd
          days.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-10 md:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.id} delay={index}>
            <Link
              to="/journal/$journalId"
              params={{
                journalId: post.id,
              }}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-card/60 transition-colors duration-500 hover:border-clay/40 hover:bg-card"
            >
              <div className="aspect-[16/9] w-full overflow-hidden rounded-t-2xl">
                <img
                  src={getPrimaryImage(post)}
                  alt={post.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex h-full flex-col p-6 md:p-7">
                <span className="label">
                  {post.category}
                </span>

                <h2 className="display mt-4 text-xl transition-colors group-hover:text-clay md:text-2xl">
                  {post.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {getExcerpt(post.body)}
                </p>

                <div className="mt-auto flex flex-wrap gap-x-2 gap-y-1 pt-6 text-[11px] text-muted-foreground">
                  {post.location && (
                    <span>{post.location}</span>
                  )}

                  <span>·</span>

                  <span>{post.readTime} min read</span>
                </div>

                <span className="label mt-5 inline-flex items-center gap-1.5">
                  Read journal
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid md:grid-cols-3">
        <Link
          to="/contact"
          className="group border-b border-hairline py-7 pr-6 transition-colors hover:bg-secondary/40 md:border-b-0 md:border-r md:pr-10"
        >
          <p className="mb-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
            Good, bad, strange, or completely unrelated, I'm listening.
          </p>

          <div className="flex items-center justify-between gap-4">
            <h3 className="display text-2xl">
              Your Thoughts?
            </h3>

            <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}