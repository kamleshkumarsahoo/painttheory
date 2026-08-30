import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/common/Reveal";
import type { Artwork } from "@/types/artwork";
import { ArrowRight } from "lucide-react";

interface SelectedWorksProps {
  artworks: Artwork[];
}

export function SelectedWorks({
  artworks,
}: SelectedWorksProps) {
  const selected = artworks.filter(
    (art) => art.featured,
  );

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-10 md:px-10 md:py-14">

      {/* Section heading */}
      <Reveal className="flex items-baseline justify-between gap-6 pb-6">
        <h2 className="display text-4xl md:text-6xl">
          Featured works
        </h2>

        <Link
          to="/gallery"
          className="
            group
            inline-flex
            shrink-0
            items-center
            gap-1.5
            text-xs
            font-medium
          "
        >
          <span className="link-underline">
            View all works
          </span>

          <ArrowRight
            className="
              size-4
              text-muted-foreground
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </Link>
      </Reveal>


      {/* Artwork grid */}
      <div
        className="
          mt-8
          grid
          grid-cols-1
          gap-y-14
          sm:grid-cols-2
          sm:gap-x-6
          sm:gap-y-16
          md:mt-10
          md:grid-cols-3
          md:gap-x-8
          md:gap-y-16
          lg:grid-cols-4
        "
      >

        {selected.map((art, index) => {
          const primaryMedia =
            art.media.find(
              (media) =>
                media.role === "primary",
            ) ?? art.media[0];

          const imageSrc =
            primaryMedia?.mediumUrl ||
            art.image;

          /*
           * Mobile:
           * The 4th artwork becomes the
           * "Show more" card.
           *
           * Desktop:
           * All artworks are displayed normally.
           */
          const hiddenOnMobile = index >= 4;
          const isMobileShowMore = index === 3;

          return (
            <Reveal
              key={art.id}
              delay={index}
              className={`
                min-w-0
                ${
                  hiddenOnMobile
                    ? "hidden sm:block"
                    : ""
                }
              `}
            >
              <Link
                to={
                  isMobileShowMore
                    ? "/gallery"
                    : "/gallery/$artworkId"
                }
                params={
                  isMobileShowMore
                    ? undefined
                    : {
                        artworkId: art.id,
                      }
                }
                className="group block"
              >

                {/* Artwork */}
                <div className="relative overflow-hidden bg-secondary">

                  <img
                    src={imageSrc}
                    alt={art.title}
                    loading="lazy"
                    className="
                      block
                      h-auto
                      w-full
                      object-cover
                      transition-transform
                      duration-[1200ms]
                      ease-out
                      group-hover:scale-[1.025]
                    "
                  />


                  {/* ==================================================
                      MOBILE SHOW MORE
                  ================================================== */}

                  {isMobileShowMore && (
                    <div
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        flex
                        h-[45%]
                        items-end
                        justify-center
                        bg-gradient-to-t
                        from-background
                        via-background/100
                        to-transparent
                        pb-8
                        sm:hidden
                      "
                    >
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          text-xl
                          font-medium
                          text-foreground
                          animate-[show-more-motion_1s_ease-in-out_infinite]
                        "
                      >
                        <span className="link-underline">
                          Show more
                        </span>

                        <ArrowRight
                          className="
                            size-6
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          "
                        />
                      </span>
                    </div>
                  )}

                </div>


                {/* ==================================================
                    ARTWORK INFORMATION
                ================================================== */}

                <div
                  className={`
                    mt-4
                    ${
                      isMobileShowMore
                        ? "hidden sm:block"
                        : ""
                    }
                  `}
                >

                  <div className="flex items-baseline justify-between gap-4">

                    <h3 className="display min-w-0 text-lg md:text-xl">
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

                </div>

              </Link>
            </Reveal>
          );
        })}

      </div>


      {/* ========================================================
          DESKTOP SHOW MORE
          Hidden on mobile because mobile already has
          the 4th-card "Show more" treatment.
      ======================================================== */}

      <Reveal
        className="
          mt-16
          hidden
          justify-center
          md:flex
          md:mt-20
        "
      >
        <Link
          to="/gallery"
          className="
            group
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
          "
        >
          <span className="link-underline">
            Show more artworks
          </span>

          <ArrowRight
            className="
              size-4
              text-muted-foreground
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </Link>
      </Reveal>

    </section>
  );
}