import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/common/Reveal";
import type { Artwork } from "@/types/artwork";
import { ArrowRight } from "lucide-react";

interface SelectedWorksProps {
  artworks: Artwork[];
}

export function SelectedWorks({ artworks }: SelectedWorksProps) {
  const selected = artworks
  .filter((art) => art.featured)
  .slice(0, 6);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-24">
      <Reveal className="hairline flex flex-wrap items-baseline justify-between gap-4 pt-8">
        <h2 className="display text-5xl md:text-6xl">Featured works</h2>

        <Link
          to="/gallery"
          className="group inline-flex items-center gap-1.5 py-3 text-xs font-medium"
        >
          <span className="link-underline">
            All works in the gallery
          </span>

          <ArrowRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Reveal>

      <div className="mt-14 grid gap-x-10 gap-y-20 md:grid-cols-12">
        {selected.map((art, index) => {
          const primaryMedia =
            art.media.find((media) => media.role === "primary") ??
            art.media[0];

          const imageSrc =
            primaryMedia?.mediumUrl ||
            art.image;

          return (
            <Reveal
              key={art.id}
              delay={index}
              className={[
                "md:col-span-7",
                "md:col-span-4 md:col-start-9 md:mt-32",
                "md:col-span-6 md:col-start-2",
                "md:col-span-5 md:col-start-8 md:-mt-24",
              ][index] ?? "md:col-span-6"}
            >
              <Link
                to="/gallery/$artworkId"
                params={{ artworkId: art.id }}
                className="group block"
              >
                <div
                  className={`overflow-hidden bg-secondary ${
                    art.orientation === "landscape"
                      ? "aspect-[4/3]"
                      : "aspect-[4/5]"
                  }`}
                >
                  <img
                    src={imageSrc}
                    alt={art.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-6">
                  <h3 className="display text-xl md:text-2xl">
                    {art.title}
                  </h3>

                  <span className="label shrink-0">
                    {art.availability === "Sold"
                      ? "Sold"
                      : art.year}
                  </span>
                </div>

                <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
                  {art.description}
                </p>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}