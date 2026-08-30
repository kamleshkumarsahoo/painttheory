import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/common/Reveal";
import { ArrowRight } from "lucide-react";
import bgPhoto from "@/assets/bg-photo1.jpg";

export function HomeHero() {
  return (
    <section
      className="
        relative
        min-h-[720px]
        overflow-hidden
        text-white
        md:min-h-[calc(100svh-120px)]
      "
    >
      {/* ======================================================
          BACKGROUND IMAGE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="absolute inset-0"
      >
        <img
          src={bgPhoto}
          alt=""
          className="
            size-full
            object-cover
            object-center
          "
        />

        {/* Soft overall overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Bottom readability */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[58%]
            bg-gradient-to-t
            from-black/70
            via-black/30
            to-transparent
            md:h-[48%]
          "
        />
      </div>


      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          flex
          min-h-[720px]
          max-w-[1400px]
          flex-col
          justify-between
          px-5
          pb-17
          pt-30
          md:min-h-[calc(100svh-120px)]
          md:px-10
          md:pb-12
          md:pt-52
        "
      >

        {/* ====================================================
            WORDMARK
        ==================================================== */}

        <Reveal delay={1}>
          <span
            className="
              block
              whitespace-nowrap
              text-[16vw]
              leading-[0.85]
              tracking-[-0.04em]
              text-white
              md:text-[11.5vw]
              pb-3
            "
            style={{
              fontFamily: "Melodrama",
              fontWeight: 700,
            }}
          >
            PaintTheory
          </span>
        </Reveal>


        {/* ====================================================
            BOTTOM CONTENT
        ==================================================== */}

        <div>

          {/* Artist */}

          <Reveal delay={2}>
            <span
              className="
                label
                font-[500]
                text-white/85
              "
            >
              <span className="lowercase italic text-white/60">
                by
              </span>{" "}
              KAMLESH SAHOO
            </span>
          </Reveal>


          {/* Description + actions */}

          <Reveal
            delay={2}
            className="
              mt-5
              grid
              gap-2
              border-t
              border-white/25
              pt-5
              md:mt-6
              md:grid-cols-[1.45fr_1fr]
              md:gap-12
              md:pt-6
            "
          >

            {/* Description */}

            <p
              className="
                max-w-7xl
                text-sm
                pb-10
                leading-relaxed
                text-white/90
                md:text-base
              "
            >
              PaintTheory is my corner of the internet where
              I share the paintings I make, the ideas behind, and the stories that come along.
              <br className="hidden md:block" />
              A place to explore my work, follow along, and perhaps find something that speaks to you.
            </p>


            {/* Actions */}

            <div
              className="
                flex
                flex-wrap
                items-start
                gap-x-7
                gap-y-2
                md:justify-end
              "
            >

              <Link
                to="/gallery"
                className="
                  rounded-full
                  bg-white
                  px-6
                  py-3
                  text-xs
                  font-medium
                  text-black
                  transition-opacity
                  hover:opacity-90
                "
              >
                See available work
              </Link>

              <Link
                to="/commission"
                className="
                  group
                  inline-flex
                  items-center
                  gap-1.5
                  py-3
                  text-xs
                  font-medium
                  text-white
                "
              >
                <span className="link-underline">
                  Commission something
                </span>

                <ArrowRight
                  className="
                    size-4
                    text-white/70
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}