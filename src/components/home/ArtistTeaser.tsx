import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/common/Reveal";
import portrait from "@/assets/artist-pose-1.png";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ArtistTeaser() {
  const [showArtistTag, setShowArtistTag] = useState(false);

  const tagTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleArtistTap = () => {
    setShowArtistTag(true);

    if (tagTimerRef.current) {
      clearTimeout(tagTimerRef.current);
    }

    tagTimerRef.current = setTimeout(() => {
      setShowArtistTag(false);
      tagTimerRef.current = null;
    }, 2200);
  };

  useEffect(() => {
    return () => {
      if (tagTimerRef.current) {
        clearTimeout(tagTimerRef.current);
      }
    };
  }, []);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-28">

      {/* =====================================================
          Section label
          ===================================================== */}
      <Reveal>
        <span className="label">
          The artist
        </span>
      </Reveal>


      {/* =====================================================
          MOBILE
          Photo + Quote
          ===================================================== */}
      <div className="mt-6 grid grid-cols-[100px_minmax(0,1fr)] items-center gap-5 md:hidden">

        {/* Artist photo */}
        <Reveal>
          <div className="relative flex size-[100px] items-center justify-center">

            <button
              type="button"
              aria-label="Show artist name"
              onClick={handleArtistTap}
              className="
                group
                relative
                size-[100px]
                overflow-visible
                rounded-full
                focus:outline-none
              "
            >

              {/* Cream circle background */}
              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-[#eee6da]
                "
              />

              {/* Portrait */}
              <img
                src={portrait}
                alt="Kamlesh Sahoo"
                loading="lazy"
                width={900}
                height={1125}
                className="
                  relative
                  z-10
                  h-full
                  w-full
                  rounded-full
                  object-cover
                  object-[50%_20%]
                "
              />

              {/* Artist identity tag */}
              <span
                className={`
                  pointer-events-none
                  absolute
                  left-[75%]
                  top-[-10%]
                  z-20
                  whitespace-nowrap
                  bg-background/70
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  tracking-tight
                  text-foreground/85
                  backdrop-blur-md
                  transition-all
                  duration-300

                  ${
                    showArtistTag
                      ? "animate-[artist-wiggle_0.5s_ease-out] opacity-100"
                      : "translate-x-2 translate-y-1 opacity-0"
                  }
                `}
              >
                Kamlesh Sahoo

                {/* Small notch */}
                <span
                  className="
                    absolute
                    -left-1
                    top-1/2
                    size-2
                    -translate-x-1/2
                    -translate-y-1/2
                    rotate-45
                    border-b
                    border-l
                    border-foreground/10
                    bg-background/70
                    backdrop-blur-md
                  "
                />
              </span>

            </button>
          </div>
        </Reveal>


        {/* Mobile quote */}
        <Reveal>
          <p className="text-[21px] leading-[1.08]">
            “I paint the things I find interesting. Sometimes that means a person, sometimes a place, 
            sometimes just an idea I can't quite let go of.”
          </p>
        </Reveal>

      </div>


      {/* =====================================================
          MOBILE
          Remaining text
          ===================================================== */}
      <Reveal className="mt-8 md:hidden">

        <p className="max-w-lg text-xs leading-[1.7] text-muted-foreground">
          I'm Kamlesh, the artist behind PaintTheory. 
          I work mostly by instinct, curiosity, and probably more overthinking than necessary. 
          My work moves between familiar subjects, unusual ideas, 
          and whatever catches my attention along the way.
        </p>

        <Link
          to="/about"
          className="group mt-6 inline-flex items-center gap-1.5 text-xs font-medium"
        >
          <span className="link-underline">
            More about the practice
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


      {/* =====================================================
          DESKTOP
          Existing layout
          ===================================================== */}
      <div className="mt-6 hidden items-end gap-6 md:mt-8 md:grid md:grid-cols-[0.65fr_1.35fr] md:gap-10">

        {/* Artist image */}
        <Reveal>
          <div className="group relative flex items-end justify-start">

            {/* Light strip */}
            <div
              className="
                absolute
                bottom-0
                left-[45%]
                h-[48%]
                w-[120px]
                -translate-x-1/2
                bg-[#eee6da]
                transition-all
                duration-700
                ease-out
                group-hover:h-[42%]

                md:left-[42%]
                md:h-[52%]
                md:w-[280px]
                md:group-hover:h-[44%]
              "
              style={{
                clipPath:
                  "polygon(0 0, 82% 0, 100% 100%, 0 100%)",
              }}
            />

            {/* Image */}
            <div className="relative z-10">

              <img
                src={portrait}
                alt="Kamlesh Sahoo"
                loading="lazy"
                width={900}
                height={1125}
                className="
                  block
                  w-[90px]
                  sm:w-[105px]
                  md:w-[200px]
                  lg:w-[220px]
                "
              />

              {/* Floating identity tag */}
              <div className="pointer-events-none absolute left-[72%] top-[34%]">

                <div
                  className="
                    translate-x-3
                    translate-y-2
                    opacity-0
                    transition-all
                    duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:translate-x-0
                    group-hover:translate-y-0
                    group-hover:opacity-100
                  "
                >

                  <div
                    className="
                      whitespace-nowrap
                      bg-background/60
                      px-4
                      py-2
                      text-sm
                      font-medium
                      tracking-tight
                      text-foreground/85
                      backdrop-blur-md
                    "
                  >
                    Kamlesh Sahoo
                  </div>

                  {/* Small notch */}
                  <span
                    className="
                      absolute
                      -left-1
                      top-1/2
                      size-2
                      -translate-x-1/2
                      -translate-y-1/2
                      rotate-45
                      border-b
                      border-l
                      border-foreground/10
                      bg-background/60
                      backdrop-blur-md
                    "
                  />

                </div>
              </div>

            </div>
          </div>
        </Reveal>


        {/* Desktop text */}
        <Reveal className="pb-1">

          <p className="mt-4 max-w-[980px] text-xl leading-[1.08] md:mt-0 md:text-4xl">
            “I paint the things I find interesting. Sometimes that means a person, sometimes a place, 
            sometimes just an idea I can't quite let go of.”
          </p>

          <p className="mt-5 max-w-xl text-xs leading-relaxed text-muted-foreground md:mt-6 md:text-sm">
            I'm Kamlesh, the artist behind PaintTheory. 
            I work mostly by instinct, curiosity, and probably more overthinking than necessary. 
            My work moves between familiar subjects, unusual ideas, 
            and whatever catches my attention along the way.
          </p>

          <Link
            to="/about"
            className="group mt-6 inline-flex items-center gap-1.5 text-xs font-medium md:mt-8"
          >
            <span className="link-underline">
              More about the practice
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

      </div>

    </section>
  );
}