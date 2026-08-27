import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/common/Reveal";
import { ArrowRight } from "lucide-react";

const steps = [
  [
    "01",
    "Buy something already made",
    "Originals from the gallery, priced and ready. One of one, signed, shipped rolled or stretched, worldwide.",
  ],
  [
    "02",
    "Ask for something that doesn't exist",
    "Portraits, conceptual pieces, an idea you can't shake. We discuss first, then I stretch a canvas for it.",
  ],
  [
    "03",
    "Watch it get made",
    "Watch your idea become a finished painting. from the first marks to the final details. then hang it on your wall.",
  ],
];

export function WhatHappensHere() {
  return (
    <section className="bg-background text-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10 md:py-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          {/* LEFT */}
          <Reveal className="self-start">
            <span className="label text-muted-foreground">
              What happens here
            </span>

            <h2 className="display mt-6 max-w-[620px] text-5xl leading-[0.9] md:text-6xl lg:text-[4.6rem]">
              Explore the work.
              <br />
              Or create something new.
            </h2>

            <Link
              to="/gallery"
              className="mt-10 inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-clay"
            >
              Browse available originals
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          {/* RIGHT */}
          <div className="w-full">
            <div className="border-t border-border">
              {steps.map(
                ([number, title, text], index) => (
                  <Reveal
                    key={number}
                    delay={index}
                    className="grid grid-cols-[42px_1fr] gap-5 border-b border-border py-8 md:grid-cols-[64px_1fr] md:py-9"
                  >
                    <span className="pt-1 font-mono text-xs tracking-[0.16em] text-clay">
                      {number}
                    </span>

                    <div>
                      <h3 className="display max-w-2xl text-2xl leading-[1.05] md:text-3xl">
                        {title}
                      </h3>

                      <p className="mt-4 max-w-2xl text-[13px] leading-[1.7] text-muted-foreground md:text-[15px]">
                        {text}
                      </p>
                    </div>
                  </Reveal>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}