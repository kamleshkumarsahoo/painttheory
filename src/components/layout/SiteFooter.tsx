import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <Link to="/" className="font-display text-3xl text-foreground">
              Maison<span className="text-accent">.</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Original acrylic paintings inspired by places, memories and emotions —
              each one a story worth hanging.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:hello@maison-studio.art"
              className="group inline-flex items-center gap-3 text-foreground transition-colors hover:text-accent"
            >
              <Mail className="size-4" />
              <span className="link-underline">hello@maison-studio.art</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-foreground transition-colors hover:text-accent"
            >
              <Instagram className="size-4" />
              <span className="link-underline">@maison.studio</span>
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {year} Maison Studio. All artworks are original and one-of-a-kind.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="link-underline hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/contact" className="link-underline hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
