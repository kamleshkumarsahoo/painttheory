import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/common/Reveal";
import portrait from "@/assets/artist-pose-1.png";
import { ArrowRight } from "lucide-react";

export function ArtistTeaser() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
      <div className="grid items-end gap-8 md:grid-cols-[0.65fr_1.35fr] md:gap-10">
        {/* Artist image */}
        <Reveal>
          <div className="group relative flex items-end justify-center md:justify-start">
            {/* Light strip */}
            <div
              className="absolute bottom-0 left-1/2 h-[48%] w-[320px] -translate-x-1/2 bg-[#eee6da] transition-all duration-700 ease-out group-hover:h-[40%] md:left-[42%] md:h-[52%] md:w-[340px] md:group-hover:h-[44%]"
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
                className="block w-[245px] md:w-[285px]"
              />

              {/* Floating identity tag */}
              <div className="pointer-events-none absolute left-[72%] top-[34%]">
                <div className="translate-x-3 translate-y-2 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="bg-background/60 px-4 py-2 text-sm font-medium tracking-tight text-foreground/85 backdrop-blur-md">
                    Kamlesh Sahoo
                  </div>

                  {/* Small notch */}
                  <span className="absolute -left-1 top-1/2 size-2 -translate-y-1/2 -translate-x-1/2 rotate-45 border-b border-l border-foreground/10 bg-background/60 backdrop-blur-md" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal className="pb-1">
          <span className="label">
            The artist
          </span>

          <p className="display mt-6 max-w-[980px] text-2xl leading-[1.08] md:text-4xl">
            “I overthink the idea, the composition, the smallest details.
            Somewhere between all that thinking, a painting begins.”
          </p>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Kamlesh is a self-taught artist who spends as much time
            thinking about a painting as he does making one.
            He is drawn to unusual ideas, unexpected compositions,
            and familiar subjects seen from a different angle.
          </p>

          <Link
            to="/about"
            className="group mt-8 inline-flex items-center gap-1.5 text-xs font-medium"
          >
            <span className="link-underline">
              More about the practice
            </span>

            <ArrowRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}