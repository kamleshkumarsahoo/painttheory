import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/Reveal";
import { FlippingPhotoGrid } from "@/components/about/FlippingPhotoGrid";

import photo1 from "@/assets/a-grid-1.jpeg";
import photo2 from "@/assets/a-grid-2.jpeg";
import photo3 from "@/assets/a-grid-3.jpeg";
import photo4 from "@/assets/a-grid-4.jpeg";
import photo5 from "@/assets/a-grid-5.jpeg";
import photo6 from "@/assets/a-grid-6.jpeg";
import photo7 from "@/assets/a-grid-7.jpeg";
import photo8 from "@/assets/a-grid-8.png";
import photo9 from "@/assets/a-grid-1.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Artist  Maison" },
      {
        name: "description",
        content:
          "The story behind Maison  an artist painting the feeling of places, memories and emotions in original acrylic works.",
      },
      {
        property: "og:title",
        content: "About the Artist  Maison",
      },
      {
        property: "og:description",
        content: "The story behind Maison original artworks.",
      },
    ],
  }),
  component: AboutPage,
});

const cards = [
  { image: photo1, text: "Acrylic" },
  { image: photo2, text: "Oil Paint" },
  { image: photo3, text: "Sketching" },
  { image: photo4, text: "Colour" },
  { image: photo7, text: "Memories" },
  { image: photo6, text: "Originals" },
  { image: photo5, text: "Creativity" },
  { image: photo8, text: "Dreams" },
  { image: photo9, text: "Hand Painted" },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-24 md:px-10 md:pb-32 md:pt-26">
      {/* PAGE HERO */}
      <Reveal>
        <div className="mb-16 md:mb-20 text-center">
          <p className="label">From the studio</p>

          <h1 className="display mt-8 text-center text-[13vw] leading-[0.78] tracking-[-0.055em] md:text-[8vw]">
            About
          </h1>
        </div>
      </Reveal>

      {/* ABOUT CONTENT */}
      <div className="grid items-start lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 pt-2">
        {/* PHOTO GRID */}
        <Reveal className="flex justify-start">
          <FlippingPhotoGrid cards={cards} />
        </Reveal>

        {/* TEXT */}
        <Reveal delay={1} className="mt-12 lg:mt-0">
          <h2 className="text-hero text-foreground">
            The way I see it.
          </h2>

          <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
            For me, painting begins long before the first brushstroke. It starts with a thought, an image, a question, or sometimes just the feeling that something familiar could be seen in a different way.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            I’m drawn to subjects that already carry meaning, people, places, memories, concept, everyday moments  but I don't always want to present them in the way we're used to seeing them. A divine figure doesn't always need the familiar glow, dramatic pose, or perfectly arranged composition. Sometimes, I find more beauty in imagining the moment before the spectacle: quieter, more human, almost candid.
            That way of thinking shapes how I approach the entire painting. I care deeply about composition, proportion, balance, visual weight, and where the eye travels through a frame. I can spend an unreasonable amount of time deciding where something should sit before I even pick up a brush. Because to me, a painting doesn't become compelling simply because it is colourful or technically impressive. Every element should have a reason to be there.
            I have no formal training in art. I’m still learning, experimenting, making mistakes, and figuring out the craft as I go. But I've always trusted my eye and my curiosity enough to pursue the images I want to see.
            <br /><br />PaintTheory is my attempt to turn those ideas into something tangible.
            Sometimes familiar. Sometimes unexpected. Always personal.

            And perhaps that's what keeps me painting the possibility of seeing something differently, and making someone else see it too.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            <Stat value="50+" label="Original Artworks" />
            <Stat value="8+" label="Years of Experiance" />
            <Stat value="100%" label="Hand Painted" />
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to="/gallery">Explore the Gallery</Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link to="/commission">Request a Painting</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div>
      <p className="font-display text-3xl text-foreground">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}