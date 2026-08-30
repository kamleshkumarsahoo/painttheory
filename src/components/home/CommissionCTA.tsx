import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/common/Reveal";
import { ArrowRight } from "lucide-react";

export function CommissionCTA() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-10 md:px-10">
      <Reveal className="hairline pt-8">
        <p className="label pb-6">
          A painting starts with an idea
        </p>

        <h2 className="display text-5xl md:text-6xl">
          Scrolled this far?
          <br />
          Have a look around.
        </h2>

        <div className="mt-12 grid border-y border-hairline md:grid-cols-3">
          <Link
            to="/contact"
            className="group border-b border-hairline py-7 px-0 transition-colors hover:bg-secondary/40 md:border-b-0 md:border-r md:pr-10"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="display text-2xl">
                Say 'Hi'
              </h3>

              <ArrowRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
            </div>

            <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Have a question, a thought, or just want to say hello.
            </p>
          </Link>

          <Link
            to="/commission"
            className="group border-b border-hairline py-7 px-0 transition-colors hover:bg-secondary/40 md:border-b-0 md:border-r md:px-10"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="display text-2xl">
                Request a Painting
              </h3>

              <ArrowRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
            </div>

            <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Have an idea you'd like to see become a painting.
            </p>
          </Link>

          <Link
            to="/gallery"
            className="group py-7 pl-0 transition-colors hover:bg-secondary/40 md:pl-10"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="display text-2xl">
                Roam the Gallery
              </h3>

              <ArrowRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
            </div>

            <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Take a look around. You might find something that resonates with you.
            </p>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}