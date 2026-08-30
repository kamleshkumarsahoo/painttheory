import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/common/Reveal";
import { ArrowRight } from "lucide-react";

const steps = [
  [
    "01",
    "Buy something already made",
    "Pick a finished painting from the gallery. Signed, packed, and shipped to you.",
  ],
  [
    "02",
    "Ask for a new painting",
    "Have an idea? Share it with me, and I’ll turn it into a painting for you.",
  ],
  [
    "03",
    "From idea to your home",
    "We discuss the idea, I paint it, and then it’s carefully packed and shipped to you.",
  ],
];

export function WhatHappensHere() {
  return (
    <section className="bg-background text-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-1 md:px-10 md:py-1">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          {/* LEFT */}
          <Reveal className="self-start pb-5">
            <span className="label text-muted-foreground">
              What happens here
            </span>

            <h2 className="display mt-4 max-w-[580px] text-5xl leading-[0.9] md:text-6xl lg:text-[4.4rem]">
              Explore the work.
              <br />
              Or create something new.
            </h2>
          </Reveal>

          {/* RIGHT */}
          <div className="w-full lg:pt-5">
            <div className="border-t border-border py-1">
              {steps.map(
                ([number, title, text], index) => (
                  <Reveal
                    key={number}
                    delay={index}
                    className="grid grid-cols-[42px_1fr] gap-5 border-b border-border py-4 md:grid-cols-[64px_1fr] md:py-6 lg:py-7 pb-5"
                  >
                    <div>
                      <span className="pt-1 font-mono text-xs tracking-[0.16em] text-clay">
                        {number}
                      </span>
                    
                    </div>

                    <div>
                      <h3 className="display max-w-2xl text-2xl leading-[1.05] md:text-3xl">
                        {title}
                      </h3>

                      <p className="mt-1 max-w-2xl text-[13px] leading-[1.5] text-muted-foreground md:text-[15px]">
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