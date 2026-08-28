import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/common/Reveal";
import { PaintWordmark } from "@/components/paint-wordmark";
import { ArrowRight } from "lucide-react";


export function HomeHero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-28 md:pt-24">
      <div className="relative mx-auto max-w-[1400px]">
        <Reveal delay={1}><PaintWordmark
            text="Painttheory"
            className="mt-6 text-[17vw] md:text-[11.5vw]"
        /></Reveal>
        <Reveal delay={2}>
          <span className="label">
            by KAMLESH SAHOO
          </span>
        </Reveal>
        <Reveal delay={2} className="hairline mt-10 grid gap-8 pt-8 md:grid-cols-[1.2fr_1fr]">
          <p className="max-w-l text-base leading-relaxed md:text-lg">
            This is where I put my paintings. Some stay here. Some find new walls.
            <br></br>A growing collection of original works made by hand, lived with for a while, and shared with the world.
          </p>
          <div className="flex flex-wrap items-start gap-x-8 gap-y-3 md:justify-end">
            <Link to="/gallery" className="rounded-full bg-ink px-6 py-3 text-xs font-medium text-paper transition-opacity hover:opacity-85">
              See available work
            </Link>
            <Link
              to="/commission"
              className="group inline-flex items-center gap-1.5 py-3 text-xs font-medium"
            >
              <span className="link-underline">
                Commission something
              </span>

              <ArrowRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}