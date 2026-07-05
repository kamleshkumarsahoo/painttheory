import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Package, Palette, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/Reveal";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { featuredArtworks, artworks } from "@/data/artworks";
import heroImage from "@/assets/studio-hero.jpg";
import portrait from "@/assets/artist-portrait.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const buySteps = [
  { icon: Sparkles, label: "Collect Original" },
  { icon: ShieldCheck, label: "Payment" },
  { icon: Package, label: "Packaging" },
  { icon: Truck, label: "Shipping" },
  { icon: Palette, label: "Delivered" },
];

const testimonials = [
  {
    quote:
      "The painting arrived impeccably packaged and even more beautiful in person. It has completely changed the feeling of our living room.",
    name: "Ananya R.",
    place: "Bengaluru",
  },
  {
    quote:
      "Commissioning a piece felt personal and unhurried. Every step was thoughtful — it's now the first thing guests notice.",
    name: "Daniel M.",
    place: "London",
  },
  {
    quote:
      "You can feel the intention in each brushstroke. Owning an original from this studio feels like owning a quiet memory.",
    name: "Priya S.",
    place: "Mumbai",
  },
];

function HomePage() {
  const instagramTiles = artworks.slice(0, 6);

  return (
    <>
      {/* ——— HERO ——— */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:pb-28 lg:pt-24">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow"
            >
              Original acrylic paintings
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-hero mt-5 text-foreground"
            >
              Original artworks that carry stories.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground"
            >
              I create one-of-a-kind acrylic paintings inspired by places, memories and
              emotions — each piece finished by hand and made to be lived with.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Button asChild size="xl">
                <Link to="/gallery">Collect an Original</Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/commission">Commission an Artwork</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl shadow-frame">
              <img
                src={heroImage}
                alt="A single large painting resting against a warm white studio wall in morning light"
                width={1920}
                height={1080}
                className="aspect-[4/3] size-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ——— FEATURED ——— */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Featured</p>
            <h2 className="text-section mt-3 max-w-lg text-foreground">
              A selection of recent originals
            </h2>
          </div>
          <Link
            to="/gallery"
            className="link-underline group inline-flex items-center gap-2 text-sm text-foreground"
          >
            View full gallery
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featuredArtworks.slice(0, 6).map((art, i) => (
            <ArtworkCard key={art.id} artwork={art} index={i} priority={i < 3} />
          ))}
        </div>
      </section>

      {/* ——— ABOUT ——— */}
      <section className="bg-secondary/40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28">
          <Reveal className="overflow-hidden rounded-3xl shadow-lift">
            <img
              src={portrait}
              alt="The artist painting in her light-filled studio"
              loading="lazy"
              width={1024}
              height={1280}
              className="aspect-[4/5] size-full object-cover"
            />
          </Reveal>
          <Reveal delay={1}>
            <p className="eyebrow">The artist</p>
            <h2 className="text-section mt-3 text-foreground">Painting the feeling of a place</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              I paint the moments that stay with me — a hush before dawn, a face turned toward
              the light, a memory that refuses to fade.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Every canvas is worked slowly, by hand, until it holds the exact feeling I set out
              to keep. Nothing is reproduced. Each piece exists once.
            </p>
            <Button asChild variant="outline" className="mt-8">
              <Link to="/about">Read the full story</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ——— PROCESS ——— */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <Reveal className="text-center">
          <p className="eyebrow">How collecting works</p>
          <h2 className="text-section mx-auto mt-3 max-w-xl text-foreground">
            From our studio to your wall
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-5">
          {buySteps.map((step, i) => (
            <Reveal key={step.label} delay={i} className="flex flex-col items-center text-center">
              <div className="flex size-16 items-center justify-center rounded-full border border-border bg-card shadow-soft">
                <step.icon className="size-6 text-accent" />
              </div>
              <p className="mt-4 text-sm font-medium text-foreground">{step.label}</p>
              <span className="mt-1 text-xs text-muted-foreground">Step {i + 1}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ——— INSTAGRAM ——— */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">From the studio</p>
            <h2 className="text-section mt-3 text-foreground">Follow the process</h2>
          </div>
          <Button asChild variant="outline">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              Follow on Instagram
            </a>
          </Button>
        </Reveal>

        {/* Masonry-style feed placeholder */}
        <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {instagramTiles.map((art, i) => (
            <motion.a
              key={art.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="block overflow-hidden rounded-2xl"
            >
              <img
                src={art.image}
                alt={`Studio post — ${art.title}`}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.a>
          ))}
        </div>
      </section>

      {/* ——— TESTIMONIALS ——— */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal className="text-center">
            <p className="eyebrow">Collectors</p>
            <h2 className="text-section mx-auto mt-3 max-w-xl text-foreground">
              Words from those who live with the work
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i}>
                <figure className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-soft">
                  <blockquote className="font-display text-lg leading-relaxed text-foreground">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-8 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{t.name}</span> · {t.place}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— CLOSING CTA ——— */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground lg:px-16 lg:py-24">
          <h2 className="text-section mx-auto max-w-2xl">
            Find the piece that already feels like yours
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button asChild variant="bronze" size="xl">
              <Link to="/gallery">Collect an Original</Link>
            </Button>
            <Button
              asChild
              size="xl"
              className="border border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link to="/commission">Commission an Artwork</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
