import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/common/Reveal";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Maison" },
      {
        name: "description",
        content: "Get in touch about collecting an original artwork, commissions or shipping.",
      },
      { property: "og:title", content: "Contact — Maison" },
      { property: "og:description", content: "Get in touch with Maison Studio." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent — we'll reply within 24–48 hours.");
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="text-hero mt-4 text-foreground">Let's talk.</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Whether you're drawn to a specific piece, dreaming up a commission, or have a question
            about shipping — I'd love to hear from you.
          </p>

          <div className="mt-10 space-y-5">
            <a
              href="mailto:hello@maison-studio.art"
              className="group flex items-center gap-4 text-foreground"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-secondary">
                <Mail className="size-5 text-accent" />
              </span>
              <span className="link-underline">hello@maison-studio.art</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-foreground"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-secondary">
                <Instagram className="size-5 text-accent" />
              </span>
              <span className="link-underline">@maison.studio</span>
            </a>
            <div className="flex items-center gap-4 text-foreground">
              <span className="flex size-11 items-center justify-center rounded-full bg-secondary">
                <MapPin className="size-5 text-accent" />
              </span>
              <span>Studio visits by appointment · Bengaluru, India</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-10"
          >
            <div className="space-y-6">
              <div>
                <Label className="mb-2 block text-sm text-foreground">Name</Label>
                <Input required placeholder="Your name" disabled={sent} />
              </div>
              <div>
                <Label className="mb-2 block text-sm text-foreground">Email</Label>
                <Input type="email" required placeholder="you@email.com" disabled={sent} />
              </div>
              <div>
                <Label className="mb-2 block text-sm text-foreground">Message</Label>
                <Textarea rows={5} required placeholder="How can I help?" disabled={sent} />
              </div>
              <Button type="submit" size="xl" className="w-full" disabled={sent}>
                {sent ? "Message sent" : "Send message"}
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
