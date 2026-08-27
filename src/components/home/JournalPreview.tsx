import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import {
  getAllJournal,
  type JournalEntry,
} from "@/services/journal.service";

function getPrimaryImage(entry: JournalEntry) {
  const primary =
    entry.media.find(
      (media) => media.role === "primary",
    ) ?? entry.media[0];

  return primary?.mediumUrl ?? "/placeholder.jpg";
}

function getExcerpt(body: string) {
  const clean = body.replace(/\s+/g, " ").trim();

  if (clean.length <= 130) {
    return clean;
  }

  return `${clean.slice(0, 130).trim()}…`;
}

export function JournalPreview() {
  const [posts, setPosts] = useState<JournalEntry[]>([]);

  useEffect(() => {
    getAllJournal()
      .then(setPosts)
      .catch(console.error);
  }, []);

  const selected = posts
    .filter((post) => post.pinned)
    .slice(0, 3);

  // Don't render the journal section if there are
  // no pinned journal entries.
  if (!selected.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-36">
      <Reveal className="hairline flex flex-wrap items-baseline justify-between gap-4 pt-8">
        <h2 className="display text-5xl md:text-6xl">
          From the journal
        </h2>

        <Link
          to="/journal"
          className="group inline-flex items-center gap-1.5 py-3 text-xs font-medium"
        >
          <span className="link-underline">
            All notes
          </span>

          <ArrowRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
        </Link>


      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {selected.map((post, index) => (
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

                <h3 className="display mt-4 text-xl transition-colors group-hover:text-clay md:text-2xl">
                  {post.title}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {getExcerpt(post.body)}
                </p>

                <div className="mt-auto flex flex-wrap gap-x-2 gap-y-1 pt-6 text-[11px] text-muted-foreground">
                  {post.location && (
                    <span>{post.location}</span>
                  )}

                  <span>·</span>

                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}