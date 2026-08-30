import {
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Grid2X2,
  Layers3,
} from "lucide-react";
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

  /* Mobile */
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileView, setMobileView] = useState<
    "stack" | "grid"
  >("stack");

  /* Swipe */
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef =
    useRef<number | null>(null);

  const dragCurrentRef =
    useRef(0);

  const swipeTriggeredRef =
    useRef(false);

  useEffect(() => {
    getAllJournal()
      .then(setPosts)
      .catch(console.error);
  }, []);

  const selected = posts
    .filter((post) => post.pinned)
    .slice(0, 3);

  if (!selected.length) {
    return null;
  }

  /*
   * Mobile cards:
   *
   * 01 → Journal
   * 02 → Journal
   * 03 → Journal
   * 04 → Enter the journals
   */
  const mobileCards = [
    ...selected,
    {
      id: "__journal-more__",
      title: "Enter the journals",
    } as JournalEntry,
  ];


  /* ============================================================
     SWIPE HANDLERS
  ============================================================ */

  function handlePointerDown(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    if (mobileView !== "stack") {
      return;
    }

    dragStartRef.current =
      event.clientX;

    dragCurrentRef.current = 0;
    swipeTriggeredRef.current = false;

    setDragX(0);
    setIsDragging(true);

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );
  }


  function handlePointerMove(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    if (
      mobileView !== "stack" ||
      !isDragging ||
      dragStartRef.current === null
    ) {
      return;
    }

    const distance =
      event.clientX -
      dragStartRef.current;

    dragCurrentRef.current =
      distance;

    const limitedDistance =
      Math.max(
        -window.innerWidth * 0.9,
        Math.min(
          window.innerWidth * 0.9,
          distance,
        ),
      );

    setDragX(limitedDistance);
  }


  function handlePointerUp(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    if (
      mobileView !== "stack" ||
      dragStartRef.current === null
    ) {
      return;
    }

    const distance =
      dragCurrentRef.current;

    setIsDragging(false);
    dragStartRef.current = null;

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    } catch {
      // Already released.
    }

    if (Math.abs(distance) > 80) {
      swipeTriggeredRef.current =
        true;

      const direction =
        distance > 0 ? 1 : -1;

      setDragX(
        direction *
          window.innerWidth *
          1.15,
      );

      window.setTimeout(() => {
        setMobileIndex(
          (current) =>
            (current + 1) %
            mobileCards.length,
        );

        setDragX(0);

        window.setTimeout(() => {
          swipeTriggeredRef.current =
            false;
        }, 50);
      }, 280);

      return;
    }

    setDragX(0);
  }


  function handlePointerCancel() {
    setIsDragging(false);
    dragStartRef.current = null;
    dragCurrentRef.current = 0;
    setDragX(0);
  }


  function handleCardClick(
    event: React.MouseEvent,
  ) {
    if (
      swipeTriggeredRef.current ||
      Math.abs(dragCurrentRef.current) >
        10
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  }


  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-36">

      {/* ========================================================
          HEADER
      ======================================================== */}

      <Reveal
        className="
          hairline
          flex
          flex-wrap
          items-baseline
          justify-between
          gap-4
          pt-8
        "
      >
        <h2 className="display text-5xl md:text-6xl">
          From the journal
        </h2>

        <Link
          to="/journal"
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
            All notes
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


      {/* ========================================================
          MOBILE
      ======================================================== */}

      <div className="mt-10 md:hidden">

        {/* ======================================================
            STACK VIEW
        ====================================================== */}

        {mobileView === "stack" && (
          <>
            <div
              className="
                relative
                mx-auto
                h-[365px]
                w-full
                max-w-[330px]
              "
            >

              {mobileCards
                .map((card, index) => {

                  const relative =
                    (index -
                      mobileIndex +
                      mobileCards.length) %
                    mobileCards.length;

                  if (relative > 2) {
                    return null;
                  }

                  const isActive =
                    relative === 0;

                  const offset =
                    relative * 10;

                  const scale =
                    1 -
                    relative *
                      0.035;

                  const opacity =
                    relative === 0
                      ? 1
                      : relative === 1
                        ? 0.78
                        : 0.5;

                  const rotation =
                    relative === 0
                      ? isDragging
                        ? dragX * 0.025
                        : 0
                      : relative === 1
                        ? -2
                        : 2;


                  /* ==================================================
                     ENTER JOURNALS
                  ================================================== */

                  if (
                    card.id ===
                    "__journal-more__"
                  ) {
                    return (
                      <Link
                        key={card.id}
                        to="/journal"
                        className="
                          absolute
                          inset-x-0
                          top-0
                          mx-auto
                          flex
                          h-[340px]
                          w-[290px]
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-border
                          bg-card
                          shadow-[0_16px_40px_-24px_rgba(0,0,0,0.3)]
                        "
                        style={{
                          transform: `
                            translateY(${offset}px)
                            scale(${scale})
                            rotate(${rotation}deg)
                          `,
                          zIndex:
                            mobileCards.length -
                            relative,
                          opacity,
                        }}
                      >
                        <span
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
                            Enter the journals
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
                        </span>
                      </Link>
                    );
                  }


                  /* ==================================================
                     JOURNAL CARD
                  ================================================== */

                  return (
                    <div
                      key={card.id}
                      className="
                        absolute
                        inset-x-0
                        top-0
                        mx-auto
                        h-[340px]
                        w-[290px]
                        overflow-hidden
                        rounded-2xl
                        border
                        border-hairline
                        bg-card
                        shadow-[0_16px_40px_-24px_rgba(0,0,0,0.3)]
                      "
                      style={{
                        transform: `
                          translateX(
                            ${
                              isActive
                                ? dragX
                                : 0
                            }px
                          )
                          translateY(${offset}px)
                          scale(${scale})
                          rotate(${rotation}deg)
                        `,
                        zIndex:
                          mobileCards.length -
                          relative,
                        opacity,

                        transition:
                          isDragging &&
                          isActive
                            ? "none"
                            : "transform 400ms cubic-bezier(0.22,1,0.36,1), opacity 400ms ease",

                        touchAction:
                          isActive
                            ? "pan-y"
                            : "auto",
                      }}
                      onPointerDown={
                        isActive
                          ? handlePointerDown
                          : undefined
                      }
                      onPointerMove={
                        isActive
                          ? handlePointerMove
                          : undefined
                      }
                      onPointerUp={
                        isActive
                          ? handlePointerUp
                          : undefined
                      }
                      onPointerCancel={
                        isActive
                          ? handlePointerCancel
                          : undefined
                      }
                      onClick={
                        isActive
                          ? handleCardClick
                          : undefined
                      }
                    >

                      <Link
                        to="/journal/$journalId"
                        params={{
                          journalId:
                            card.id,
                        }}
                        className="
                          flex
                          h-full
                          flex-col
                        "
                      >

                        {/* Image */}

                        <div
                          className="
                            h-[180px]
                            w-full
                            shrink-0
                            overflow-hidden
                          "
                        >
                          <img
                            src={getPrimaryImage(
                              card,
                            )}
                            alt={card.title}
                            loading="lazy"
                            draggable={false}
                            className="
                              size-full
                              object-cover
                            "
                          />
                        </div>


                        {/* Content */}

                        <div
                          className="
                            flex
                            flex-1
                            flex-col
                            px-5
                            pb-6
                            pt-5
                          "
                        >

                          <span className="label">
                            {card.category}
                          </span>

                          <h3
                            className="
                              display
                              mt-3
                              line-clamp-2
                              text-xl
                            "
                          >
                            {card.title}
                          </h3>

                          {/* Read time pushed toward bottom */}

                          <div
                            className="
                              mt-auto
                              flex
                              items-center
                              gap-2
                              pt-6
                              text-[10px]
                              text-muted-foreground
                            "
                          >
                            {card.location && (
                              <>
                                <span>
                                  {card.location}
                                </span>

                                <span>
                                  ·
                                </span>
                              </>
                            )}

                            <span>
                              {card.readTime}{" "}
                              min read
                            </span>
                          </div>

                        </div>

                      </Link>

                    </div>
                  );
                })
                .reverse()}

            </div>


            {/* ==================================================
                STACK INDICATOR
            ================================================== */}

            <div className="mt-5 flex items-center justify-center gap-1.5">

              {mobileCards.map(
                (card, index) => (
                  <button
                    key={card.id}
                    type="button"
                    aria-label={`Go to ${
                      index + 1
                    }`}
                    onClick={() => {
                      setDragX(0);
                      setMobileIndex(
                        index,
                      );
                    }}
                    className={`
                      h-1
                      rounded-full
                      transition-all
                      duration-300
                      ${
                        index ===
                        mobileIndex
                          ? "w-5 bg-foreground/60"
                          : "w-1 bg-foreground/20"
                      }
                    `}
                  />
                ),
              )}

            </div>

            <p
              className="
                mt-4
                text-center
                text-[10px]
                text-muted-foreground
              "
            >
              Swipe to explore
            </p>
          </>
        )}


        {/* ======================================================
            GRID VIEW
        ====================================================== */}

        {mobileView === "grid" && (
          <div
            className="
              grid
              grid-cols-2
              gap-3
            "
          >

            {mobileCards.map(
              (card) => {

                /* Enter journals */

                if (
                  card.id ===
                  "__journal-more__"
                ) {
                  return (
                    <Link
                      key={card.id}
                      to="/journal"
                      className="
                        flex
                        aspect-[0.82]
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-border
                        bg-card
                        p-5
                        text-center
                      "
                    >
                      <span
                        className="
                          group
                          inline-flex
                          items-center
                          gap-1.5
                          text-sm
                          font-medium
                        "
                      >
                        <span className="link-underline">
                          Enter the journals
                        </span>

                        <ArrowRight
                          className="
                            size-4
                            text-muted-foreground
                          "
                        />
                      </span>
                    </Link>
                  );
                }


                /* Journal */

                return (
                  <Link
                    key={card.id}
                    to="/journal/$journalId"
                    params={{
                      journalId:
                        card.id,
                    }}
                    className="
                      group
                      overflow-hidden
                      rounded-2xl
                      border
                      border-hairline
                      bg-card
                    "
                  >

                    <div
                      className="
                        aspect-[4/3]
                        overflow-hidden
                      "
                    >
                      <img
                        src={getPrimaryImage(
                          card,
                        )}
                        alt={card.title}
                        loading="lazy"
                        className="
                          size-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-[1.03]
                        "
                      />
                    </div>

                    <div
                      className="
                        flex
                        min-h-[130px]
                        flex-col
                        p-4
                      "
                    >

                      <span className="label">
                        {card.category}
                      </span>

                      <h3
                        className="
                          display
                          mt-2
                          line-clamp-2
                          text-base
                        "
                      >
                        {card.title}
                      </h3>

                      <span
                        className="
                          mt-auto
                          pt-4
                          text-[10px]
                          text-muted-foreground
                        "
                      >
                        {card.readTime}{" "}
                        min read
                      </span>

                    </div>

                  </Link>
                );
              },
            )}

          </div>
        )}


        {/* ======================================================
            MOBILE VIEW TOGGLE
        ====================================================== */}

        <div
          className="
            mt-6
            flex
            justify-end
          "
        >
          <button
            type="button"
            aria-label={
              mobileView === "stack"
                ? "Switch to grid view"
                : "Switch to stacked view"
            }
            onClick={() =>
              setMobileView(
                (current) =>
                  current === "stack"
                    ? "grid"
                    : "stack",
              )
            }
            className="
              flex
              size-9
              items-center
              justify-center
              rounded-full
              border
              border-border
              text-muted-foreground
              transition-colors
              hover:text-foreground
            "
          >
            {mobileView === "stack" ? (
              <Grid2X2 className="size-4" />
            ) : (
              <Layers3 className="size-4" />
            )}
          </button>
        </div>

      </div>


      {/* ========================================================
          DESKTOP — EXISTING GRID
      ======================================================== */}

      <div
        className="
          mt-12
          hidden
          gap-10
          md:grid
          md:grid-cols-3
        "
      >

        {selected.map(
          (post, index) => (
            <Reveal
              key={post.id}
              delay={index}
            >
              <Link
                to="/journal/$journalId"
                params={{
                  journalId:
                    post.id,
                }}
                className="
                  group
                  flex
                  h-full
                  flex-col
                  overflow-hidden
                  rounded-2xl
                  border
                  border-hairline
                  bg-card/60
                  transition-colors
                  duration-500
                  hover:border-clay/40
                  hover:bg-card
                "
              >

                <div
                  className="
                    aspect-[16/9]
                    w-full
                    overflow-hidden
                    rounded-t-2xl
                  "
                >
                  <img
                    src={getPrimaryImage(
                      post,
                    )}
                    alt={post.title}
                    loading="lazy"
                    className="
                      size-full
                      object-cover
                      transition-transform
                      duration-[1200ms]
                      ease-out
                      group-hover:scale-[1.03]
                    "
                  />
                </div>

                <div
                  className="
                    flex
                    h-full
                    flex-col
                    p-6
                    md:p-7
                  "
                >

                  <span className="label">
                    {post.category}
                  </span>

                  <h3
                    className="
                      display
                      mt-4
                      text-xl
                      transition-colors
                      group-hover:text-clay
                      md:text-2xl
                    "
                  >
                    {post.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-xs
                      leading-relaxed
                      text-muted-foreground
                    "
                  >
                    {getExcerpt(
                      post.body,
                    )}
                  </p>

                  <div
                    className="
                      mt-auto
                      flex
                      flex-wrap
                      gap-x-2
                      gap-y-1
                      pt-6
                      text-[11px]
                      text-muted-foreground
                    "
                  >
                    {post.location && (
                      <span>
                        {post.location}
                      </span>
                    )}

                    <span>·</span>

                    <span>
                      {post.readTime}{" "}
                      min read
                    </span>
                  </div>

                </div>

              </Link>
            </Reveal>
          ),
        )}

      </div>

    </section>
  );
}