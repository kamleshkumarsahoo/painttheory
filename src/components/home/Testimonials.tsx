import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/common/Reveal";
import {
  getFeedback,
  type Feedback,
} from "@/services/feedback.service";

export function Testimonials() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [start, setStart] = useState(0);
  const [step, setStep] = useState(340);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const wrapRef =
    useRef<HTMLDivElement>(null);

  const sliderRef =
    useRef<HTMLDivElement>(null);

  const resumeTimerRef =
    useRef<number | null>(null);

  useEffect(() => {
    getFeedback()
      .then(setFeedback)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const measure = () => {
      const width =
        wrapRef.current?.offsetWidth ?? 1000;

      setStep(
        Math.max(
          180,
          Math.min(430, width * 0.38),
        ),
      );
    };

    measure();

    window.addEventListener(
      "resize",
      measure,
    );

    return () =>
      window.removeEventListener(
        "resize",
        measure,
      );
  }, []);

  function pauseTemporarily() {
    setPaused(true);

    if (resumeTimerRef.current) {
      window.clearTimeout(
        resumeTimerRef.current,
      );
    }

    resumeTimerRef.current =
      window.setTimeout(() => {
        setPaused(false);
      }, 1200);
  }

  useEffect(() => {
    if (feedback.length <= 1) return;

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
    ) {
      return;
    }

    if (paused || dragging) return;

    const interval = window.setInterval(() => {
      setStart(
        (current) =>
          (current + 1) % feedback.length,
      );
    }, 3200);

    return () =>
      window.clearInterval(interval);
  }, [
    feedback.length,
    paused,
    dragging,
  ]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        window.clearTimeout(
          resumeTimerRef.current,
        );
      }
    };
  }, []);

  function setFromPosition(
    clientX: number,
  ) {
    const track =
      sliderRef.current;

    if (!track || feedback.length <= 1) {
      return;
    }

    const rect =
      track.getBoundingClientRect();

    const percentage =
      Math.max(
        0,
        Math.min(
          1,
          (clientX - rect.left) /
            rect.width,
        ),
      );

    const index = Math.round(
      percentage *
        (feedback.length - 1),
    );

    setStart(index);
  }

  function handlePointerDown(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    if (feedback.length <= 1) return;

    setDragging(true);
    pauseTemporarily();

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );

    setFromPosition(event.clientX);
  }

  function handlePointerMove(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    if (!dragging) return;

    setFromPosition(event.clientX);
  }

  function handlePointerUp(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    setDragging(false);

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    } catch {
      // Pointer capture may already be released.
    }
  }

  if (!feedback.length) {
    return null;
  }

  const visible = [-1, 0, 1, 2, 3].map(
    (offset) => ({
      offset,
      feedbackIndex:
        (start +
          offset +
          feedback.length * 2) %
        feedback.length,
    }),
  );

  const sliderProgress =
    feedback.length <= 1
      ? 0
      : start / (feedback.length - 1);

  return (
    <section className="mx-auto w-full max-w-[1400px] px-5 pb-20 md:px-10 md:pb-28">
      <Reveal className="hairline flex flex-wrap items-baseline justify-between gap-4 pt-8">
        <h2 className="display text-5xl md:text-6xl">
          In their words
        </h2>

        <span className="label">
          From the people who found the work
        </span>
      </Reveal>

      <Reveal className="mt-12">
        <div
          ref={wrapRef}
          className="relative mt-4 h-[520px] w-full overflow-hidden md:h-[620px]"
        >
          {visible.map(
            ({
              offset,
              feedbackIndex,
            }) => {
              const item =
                feedback[feedbackIndex];

              if (!item) return null;

              const isCenter =
                offset === 1;

              const x =
                (offset - 1) * step;

              const hidden =
                offset === -1 ||
                offset === 3;

              return (
                <figure
                  key={`${item.id}-${offset}`}
                  onPointerEnter={() => {
                    setPaused(true);
                  }}
                  onPointerLeave={() => {
                    setPaused(false);
                  }}
                  onPointerDown={() => {
                    setPaused(true);
                  }}
                  onPointerUp={() => {
                    setPaused(false);
                  }}
                  onPointerCancel={() => {
                    setPaused(false);
                  }}
                  className="absolute left-1/2 top-1/2 w-[300px] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-20px_rgba(0,0,0,0.3)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:w-[360px] lg:w-[420px]"
                  style={{
                    transform: `
                      translate(-50%, -50%)
                      translateX(${x}px)
                      scale(${isCenter ? 1.08 : 0.86})
                    `,
                    opacity: hidden
                      ? 0
                      : isCenter
                        ? 1
                        : 0.65,
                    filter: hidden
                      ? "blur(6px)"
                      : isCenter
                        ? "none"
                        : "saturate(0.85)",
                    zIndex: isCenter
                      ? 20
                      : 10,
                    pointerEvents: hidden
                      ? "none"
                      : "auto",
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt="Collector feedback"
                    loading="lazy"
                    className="block h-auto w-full object-contain"
                  />
                </figure>
              );
            },
          )}
        </div>

        {/* Slider + play/pause */}
        {feedback.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            {/* Play / Pause */}
            <button
              type="button"
              aria-label={
                paused
                  ? "Play feedback rotation"
                  : "Pause feedback rotation"
              }
              onClick={() => {
                setPaused((current) => !current);
              }}
              className="flex size-4 items-center justify-center text-muted-foreground/80 transition-colors hover:text-foreground"
            >
              {paused ? (
                <svg
                  viewBox="0 0 12 12"
                  className="h-4.5 w-4.5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M3 2.1v7.8L9.5 6z" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 12 12"
                  className="h-4 w-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect
                    x="2.5"
                    y="2"
                    width="2"
                    height="8"
                    rx=".4"
                  />
                  <rect
                    x="7.5"
                    y="2"
                    width="2"
                    height="8"
                    rx=".4"
                  />
                </svg>
              )}
            </button>

            {/* Slider */}
            <div
              ref={sliderRef}
              role="slider"
              aria-label="Feedback position"
              aria-valuemin={0}
              aria-valuemax={feedback.length - 1}
              aria-valuenow={start}
              tabIndex={0}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  pauseTemporarily();

                  setStart(
                    (current) =>
                      (current + 1) % feedback.length,
                  );
                }

                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  pauseTemporarily();

                  setStart(
                    (current) =>
                      (current - 1 + feedback.length) %
                      feedback.length,
                  );
                }

                if (event.key === "Home") {
                  event.preventDefault();
                  pauseTemporarily();
                  setStart(0);
                }

                if (event.key === "End") {
                  event.preventDefault();
                  pauseTemporarily();
                  setStart(feedback.length - 1);
                }
              }}
              className="relative h-3 w-[220px] cursor-pointer touch-none select-none rounded-[2px] bg-border/50 outline-none focus-visible:ring-2 focus-visible:ring-clay/20 md:w-[380px]"
            >
              <div
                className={[
                  "absolute top-0 h-3 w-12 rounded-[2px] bg-muted-foreground/40",
                  dragging
                    ? "cursor-grabbing"
                    : "cursor-grab",
                ].join(" ")}
                style={{
                  left:
                    feedback.length <= 1
                      ? "0px"
                      : `calc(${sliderProgress * 100}% - ${
                          sliderProgress * 48
                        }px)`,
                }}
              />
            </div>
          </div>
        )}
      </Reveal>
    </section>
  );
}