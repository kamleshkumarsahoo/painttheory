import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  SiInstagram,
  SiWhatsapp,
} from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/common/Reveal";
import { toast } from "sonner";
import { socials } from "@/lib/socials";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact • PaintTheory" },
      {
        name: "description",
        content:
          "Get in touch about artwork, commissions, ideas or simply to say hello.",
      },
      { property: "og:title", content: "Contact • PaintTheory" },
      {
        property: "og:description",
        content: "Get in touch with PaintTheory.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (!form.message.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    try {
      setSending(true);

      const { data, error } = await supabase.functions.invoke(
        "submit-contact",
        {
          body: {
            name: form.name.trim(),
            email: form.email.trim().toLowerCase(),
            phone: form.phone.trim() || null,
            message: form.message.trim(),
          },
        },
      );

      if (error) throw error;

      if (!data?.success) {
        throw new Error(
          data?.error || "Unable to send your message.",
        );
      }

      setSent(true);

      toast.success(
        "Message sent — I'll get back to you as soon as I can.",
      );
    } catch (error) {
      console.error("CONTACT FORM ERROR:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Could not send your message.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pt-24 lg:px-10 lg:pt-26">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow">Contact</p>

          <h1 className="text-hero mt-4 text-foreground">
            Let's talk.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            For questions, ideas, discussions or random life thoughts.
            No formalities. Just write.
          </p>

          <div className="mt-9 space-y-4">
            <a
              href={`mailto:${socials.email}`}
              className="group flex items-center gap-3 text-sm text-foreground"
            >
              <Mail className="size-4 text-muted-foreground" />
              <span className="link-underline">{socials.email}</span>
            </a>

            <a
              href={`tel:${socials.phone.replace(/\s/g, "")}`}
              className="group flex items-center gap-3 text-sm text-foreground"
            >
              <Phone className="size-4 text-muted-foreground" />
              <span className="link-underline">{socials.phone}</span>
            </a>

            <a
              href={socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-sm text-foreground"
            >
              <SiWhatsapp className="size-4 text-muted-foreground" />
              <span className="link-underline">WhatsApp</span>
            </a>

            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-sm text-foreground"
            >
              <SiInstagram className="size-4 text-muted-foreground" />
              <span className="link-underline">@painttheory.in</span>
            </a>

            <div className="flex items-center gap-3 text-sm text-foreground">
              <MapPin className="size-4 text-muted-foreground" />
              <span>Bengaluru, India</span>
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
                <Label className="mb-2 block text-sm text-foreground">
                  Name
                </Label>

                <Input
                  required
                  placeholder="Your name"
                  disabled={sent || sending}
                  value={form.name}
                  onChange={(e) =>
                    updateField("name", e.target.value)
                  }
                />
              </div>

              <div>
                <Label className="mb-2 block text-sm text-foreground">
                  Email
                </Label>

                <Input
                  type="email"
                  required
                  placeholder="you@email.com"
                  disabled={sent || sending}
                  value={form.email}
                  onChange={(e) =>
                    updateField("email", e.target.value)
                  }
                />
              </div>

              <div>
                <Label className="mb-2 block text-sm text-foreground">
                  Phone
                  <span className="ml-1 text-muted-foreground">
                    (optional)
                  </span>
                </Label>

                <Input
                  type="tel"
                  inputMode="tel"
                  placeholder="+91 98765 43210"
                  disabled={sent || sending}
                  value={form.phone}
                  onChange={(e) =>
                    updateField("phone", e.target.value)
                  }
                />
              </div>

              <div>
                <Label className="mb-2 block text-sm text-foreground">
                  Message
                </Label>

                <Textarea
                  rows={5}
                  required
                  placeholder="How can I help?"
                  disabled={sent || sending}
                  value={form.message}
                  onChange={(e) =>
                    updateField("message", e.target.value)
                  }
                />
              </div>

              <Button
                type="submit"
                size="xl"
                className="w-full"
                disabled={sent || sending}
              >
                {sending
                  ? "Sending..."
                  : sent
                    ? "Message sent"
                    : "Send message"}
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </div>
  );
}