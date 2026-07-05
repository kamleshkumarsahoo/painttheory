import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/Reveal";
import portrait from "@/assets/artist-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Artist — Maison" },
      {
        name: "description",
        content:
          "The story behind Maison — an artist painting the feeling of places, memories and emotions in original acrylic works.",
      },
      { property: "og:title", content: "About the Artist — Maison" },
      { property: "og:description", content: "The story behind Maison original artworks." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="overflow-hidden rounded-3xl shadow-lift">
          <img
            src={portrait}
            alt="The artist in her studio holding a brush"
            loading="lazy"
            width={1024}
            height={1280}
            className="aspect-[4/5] size-full object-cover"
          />
        </Reveal>

        <Reveal delay={1}>
          <p className="eyebrow">About</p>
          <h1 className="text-hero mt-4 text-foreground">Hands, memory & paint.</h1>
          <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
            I paint to keep the moments that would otherwise slip away — the colour of a
            particular morning, the weight of a quiet room, a feeling I can't quite name.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Working only in acrylic, layer by layer, I let each canvas take its own time. Nothing
            is printed or reproduced. Every piece is an original, made once, meant to be lived
            with for a lifetime.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            <Stat value="120+" label="Originals collected" />
            <Stat value="9" label="Countries shipped" />
            <Stat value="100%" label="Hand-painted" />
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to="/gallery">Explore the gallery</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/commission">Commission a piece</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
