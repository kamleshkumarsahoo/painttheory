import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { Artwork } from "@/types/artwork";
import { formatPrice } from "@/types/artwork";
import { Reveal } from "@/components/common/Reveal";
import { ArrowRight } from "lucide-react";

const walls = [
  {
    name: "Bone",
    value: "oklch(0.965 0.004 90)",
  },
  {
    name: "Clay",
    value: "oklch(0.93 0.02 60)",
  },
  {
    name: "Sage",
    value: "oklch(0.925 0.02 150)",
  },
  {
    name: "Slate",
    value: "oklch(0.88 0.012 250)",
  },
];

/* ============================================================
   MORPH TEXT
============================================================ */

function Morph({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return (
    <motion.span
      key={value}
      initial={{
        opacity: 0,
        y: 8,
        clipPath: "inset(100% 0 0 0)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0 0)",
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`inline-block ${className ?? ""}`}
    >
      {value}
    </motion.span>
  );
}


/* ============================================================
   AUTO-FIT TITLE
============================================================ */

function AutoFitTitle({
  value,
}: {
  value: string;
}) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const textRef =
    useRef<HTMLHeadingElement>(null);

  const [fontSize, setFontSize] =
    useState(48);

  useLayoutEffect(() => {
    const fit = () => {
      const container =
        containerRef.current;

      const text =
        textRef.current;

      if (!container || !text) {
        return;
      }

      const isDesktop =
        window.innerWidth >= 768;

      const maxSize = isDesktop
        ? 48
        : 30;

      const minSize = isDesktop
        ? 24
        : 20;

      let size = maxSize;

      text.style.fontSize =
        `${size}px`;

      /*
       * Reduce the font size until the
       * title fits inside the fixed box.
       */
      while (
        text.scrollHeight >
          container.clientHeight &&
        size > minSize
      ) {
        size -= 1;

        text.style.fontSize =
          `${size}px`;
      }

      setFontSize(size);
    };

    /*
     * Wait one frame so Morph has had
     * a chance to render the new title.
     */
    const frame =
      window.requestAnimationFrame(
        fit,
      );

    const observer =
      new ResizeObserver(fit);

    if (containerRef.current) {
      observer.observe(
        containerRef.current,
      );
    }

    window.addEventListener(
      "resize",
      fit,
    );

    return () => {
      window.cancelAnimationFrame(
        frame,
      );

      observer.disconnect();

      window.removeEventListener(
        "resize",
        fit,
      );
    };
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="
        mt-4
        h-[60px]
        overflow-hidden
        md:h-[110px]
      "
    >
      <h3
        ref={textRef}
        className="
          display
          leading-[1]
        "
        style={{
          fontFamily: "Melodrama",
          fontWeight: 700,
          fontSize: `${fontSize}px`,
        }}
      >
        <Morph value={value} />
      </h3>
    </div>
  );
}


/* ============================================================
   ON THE WALL
============================================================ */

export function OnTheWall({
  artworks,
}: {
  artworks: Artwork[];
}) {
  const works =
    artworks.filter(
      (art) => art.on_wall,
    );

  const [index, setIndex] =
    useState(0);

  const [wall, setWall] =
    useState(0);


  /* ==========================================================
     AUTO ROTATION
  ========================================================== */

  useEffect(() => {
    if (!works.length) return;

    const interval =
      window.setInterval(() => {
        setIndex(
          (current) =>
            (current + 1) %
            works.length,
        );
      }, 5200);

    return () =>
      window.clearInterval(
        interval,
      );
  }, [works.length]);


  if (!works.length) {
    return null;
  }


  const work = works[index];


  /* ==========================================================
     IMAGE
  ========================================================== */

  const wallMedia =
    work.wall_media_id
      ? work.media.find(
          (media) =>
            media.id ===
            work.wall_media_id,
        )
      : undefined;

  const primaryMedia =
    work.media.find(
      (media) =>
        media.role === "primary",
    ) ?? work.media[0];

  const imageSrc =
    wallMedia?.largeUrl ||
    primaryMedia?.largeUrl ||
    work.image;


  /* ==========================================================
     PRICE
  ========================================================== */

  const price =
    work.availability === "Sold"
      ? "Sold — prints on request"
      : work.availability ===
          "Reserved"
        ? "Reserved"
        : formatPrice(work.price);


  /* ==========================================================
     NAVIGATION
  ========================================================== */

  const go = (
    direction: number,
  ) => {
    setIndex(
      (current) =>
        (current +
          direction +
          works.length) %
        works.length,
    );
  };


  return (
    <section
      className="
        relative
        overflow-hidden
        px-5
        py-10
        transition-colors
        duration-700
        md:px-10
        md:py-12
      "
      style={{
        backgroundColor:
          walls[wall].value,
      }}
    >

      {/* ========================================================
          FOG / LIGHT
      ======================================================== */}

      <div
        aria-hidden
        className="
          fog-field
          pointer-events-none
          absolute
          inset-x-[-15%]
          top-[-10%]
          h-[120%]
          opacity-90
        "
      />


      {/* ========================================================
          CONTENT
      ======================================================== */}

      <div
        className="
          relative
          mx-auto
          max-w-[1400px]
        "
      >

        {/* ======================================================
            SECTION HEADING
        ====================================================== */}

        <Reveal
          className="
            flex
            items-baseline
            justify-between
            gap-6
          "
        >
          <h2
            className="
              display
              text-5xl
              text-foreground/30
              md:text-6xl
            "
          >
            On the wall
          </h2>
        </Reveal>


        {/* ======================================================
            MAIN ARTWORK + DETAILS
        ====================================================== */}

        <div
          className="
            mt-15
            grid
            items-center
            gap-12
            md:mt-20
            md:grid-cols-[1.05fr_0.95fr]
            md:gap-20
          "
        >

          {/* ====================================================
              ARTWORK
          ==================================================== */}

          <Reveal className="flex justify-center">

            <figure
              className="
                relative
                w-full
                max-w-[480px]
              "
            >

              {/* Light */}
              <div
                aria-hidden
                className="
                  pointer-events-none
                  absolute
                  -inset-[18%]
                  rounded-[50%]
                  bg-[radial-gradient(closest-side,oklch(1_0_0/38%),transparent_75%)]
                "
              />


              {/* Shadow */}
              <div
                aria-hidden
                className="
                  pointer-events-none
                  absolute
                  -right-6
                  bottom-2
                  top-8
                  w-1/2
                  -skew-y-3
                  rounded-[40%]
                  bg-ink/12
                  blur-2xl
                "
              />


              {/* Frame */}
              <div className="art-frame relative">

                <div className="art-mat">

                  <div
                    className="
                      art-glass
                      art-inner-shadow
                      relative
                      aspect-[4/5]
                      overflow-hidden
                      bg-secondary
                    "
                  >

                    {works.map(
                      (
                        piece,
                        itemIndex,
                      ) => {

                        const previousIndex =
                          (index -
                            1 +
                            works.length) %
                          works.length;

                        if (
                          itemIndex !==
                            index &&
                          itemIndex !==
                            previousIndex
                        ) {
                          return null;
                        }

                        const pieceWallMedia =
                          piece.wall_media_id
                            ? piece.media.find(
                                (media) =>
                                  media.id ===
                                  piece.wall_media_id,
                              )
                            : undefined;

                        const piecePrimaryMedia =
                          piece.media.find(
                            (media) =>
                              media.role ===
                              "primary",
                          ) ??
                          piece.media[0];

                        const pieceImage =
                          pieceWallMedia?.largeUrl ||
                          piecePrimaryMedia?.largeUrl ||
                          piece.image;

                        return (
                          <img
                            key={`${piece.id}-${itemIndex === index ? index : "previous"}`}
                            src={pieceImage}
                            alt={piece.title}
                            loading="lazy"
                            className={`
                              absolute
                              inset-0
                              size-full
                              object-cover
                              ${
                                itemIndex ===
                                index
                                  ? "art-bloom-in z-[1]"
                                  : ""
                              }
                            `}
                          />
                        );
                      },
                    )}


                    {/* Glass reflection */}

                    <div
                      aria-hidden
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        z-[2]
                        bg-[linear-gradient(150deg,oklch(1_0_0/22%),transparent_45%,oklch(0.19_0.012_60/16%))]
                      "
                    />

                  </div>

                </div>

              </div>


              {/* Ground shadow */}

              <div
                aria-hidden
                className="
                  mx-auto
                  mt-1
                  h-3
                  w-[72%]
                  translate-x-3
                  rounded-[100%]
                  bg-ink/14
                  blur-2xl
                "
              />


              {/* ==================================================
                  ARTWORK NAVIGATION
              ================================================== */}

              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-between
                  gap-6
                "
              >

                {/* Wall selector */}

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >
                  <span className="label">
                    Wall
                  </span>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    {walls.map(
                      (
                        item,
                        itemIndex,
                      ) => (
                        <button
                          key={
                            item.name
                          }
                          type="button"
                          aria-label={`${item.name} wall`}
                          aria-pressed={
                            itemIndex ===
                            wall
                          }
                          onClick={() =>
                            setWall(
                              itemIndex,
                            )
                          }
                          style={{
                            backgroundColor:
                              item.value,
                          }}
                          className={`
                            h-3
                            w-3
                            rounded-full
                            ring-1
                            outline-none
                            transition-all
                            focus:outline-none
                            ${
                              itemIndex ===
                              wall
                                ? "ring-clay ring-offset-2"
                                : "ring-ink/20"
                            }
                          `}
                        />
                      ),
                    )}
                  </div>
                </div>


                {/* Artwork navigation */}

                <div
                  className="
                    flex
                    items-center
                    gap-5
                  "
                >

                  <button
                    type="button"
                    aria-label="Previous artwork"
                    onClick={() =>
                      go(-1)
                    }
                    className="
                      text-muted-foreground
                      transition-colors
                      hover:text-clay
                    "
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      aria-hidden
                    >
                      <path
                        d="M15 4L7 12l8 8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>


                  <span className="label">
                    {String(
                      index + 1,
                    ).padStart(2, "0")}{" "}
                    /{" "}
                    {String(
                      works.length,
                    ).padStart(2, "0")}
                  </span>


                  <button
                    type="button"
                    aria-label="Next artwork"
                    onClick={() =>
                      go(1)
                    }
                    className="
                      text-muted-foreground
                      transition-colors
                      hover:text-clay
                    "
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      aria-hidden
                    >
                      <path
                        d="M9 4l8 8-8 8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                </div>

              </div>

            </figure>

          </Reveal>


          {/* ====================================================
              ARTWORK INFORMATION
          ==================================================== */}

          <Reveal className="self-stretch">

            <div
              className="
                flex
                h-full
                flex-col
              "
            >

              {/* Fixed heading area */}

              <div className="shrink-0">

                <span className="label">
                  Now hanging
                </span>

                <AutoFitTitle
                  value={work.title}
                />

              </div>


              {/* Fixed description area */}

              <div
                className="
                  mt-5
                  h-[140px]
                  max-w-md
                  md:mt-6
                  md:h-[120px]
                "
              >
                <p
                  className="
                    text-sm
                    leading-relaxed
                    text-muted-foreground
                  "
                >
                  {(() => {
                    const description =
                      work.description ??
                      "";

                    const words =
                      description.split(
                        " ",
                      );

                    if (
                      words.length <=
                      24
                    ) {
                      return description;
                    }

                    return (
                      <>
                        {words
                          .slice(
                            0,
                            48,
                          )
                          .join(
                            " ",
                          )}
                        ...
                      </>
                    );
                  })()}
                </p>
              </div>


              {/* Fixed metadata area */}

              <dl
                className="
                  mt-8
                  grid
                  max-w-2xl
                  grid-cols-4
                  text-xs
                "
              >

                {/* Medium */}

                <div
                  className="
                    min-w-0
                    pr-4
                  "
                >
                  <dt className="label">
                    Medium
                  </dt>

                  <dd
                    className="
                      mt-2
                      truncate
                    "
                  >
                    <Morph
                      value={
                        work.medium
                      }
                    />
                  </dd>
                </div>


                {/* Size */}

                <div
                  className="
                    min-w-0
                    border-l
                    border-foreground/10
                    px-4
                  "
                >
                  <dt className="label">
                    Size
                  </dt>

                  <dd
                    className="
                      mt-2
                      truncate
                    "
                  >
                    <Morph
                      value={
                        work.dimensions
                      }
                    />
                  </dd>
                </div>


                {/* Year */}

                <div
                  className="
                    min-w-0
                    border-l
                    border-foreground/10
                    px-4
                  "
                >
                  <dt className="label">
                    Year
                  </dt>

                  <dd
                    className="
                      mt-2
                      truncate
                    "
                  >
                    <Morph
                      value={String(
                        work.year,
                      )}
                    />
                  </dd>
                </div>


                {/* Price */}

                <div
                  className="
                    min-w-0
                    border-l
                    border-foreground/10
                    pl-4
                  "
                >
                  <dt className="label">
                    Price
                  </dt>

                  <dd
                    className="
                      mt-2
                      truncate
                    "
                  >
                    <Morph
                      value={price}
                    />
                  </dd>
                </div>

              </dl>


              {/* Fixed action */}

              <div className="mt-8">

                <Link
                  to="/gallery/$artworkId"
                  params={{
                    artworkId:
                      work.id,
                  }}
                  className="
                    group
                    inline-flex
                    items-center
                    gap-1.5
                    py-3
                    text-xs
                    font-medium
                  "
                >
                  <span className="link-underline">
                    Enquire about this piece
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

              </div>

            </div>

          </Reveal>

        </div>


        {/* ======================================================
            ARTWORK PROGRESS
        ====================================================== */}

        <div
          className="
            mt-12
            flex
            gap-2
          "
        >
          {works.map(
            (
              piece,
              itemIndex,
            ) => (
              <button
                key={piece.id}
                type="button"
                aria-label={`Show ${piece.title}`}
                onClick={() =>
                  setIndex(
                    itemIndex,
                  )
                }
                className={`
                  h-px
                  flex-1
                  transition-colors
                  duration-500
                  ${
                    itemIndex ===
                    index
                      ? "bg-clay"
                      : "bg-ink/15"
                  }
                `}
              />
            ),
          )}
        </div>

      </div>

    </section>
  );
}