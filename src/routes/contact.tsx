import { supabase } from "@/lib/supabase";
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
        content:
          "Get in touch about collecting an original artwork, commissions or shipping.",
      },
      { property: "og:title", content: "Contact — Maison" },
      {
        property: "og:description",
        content: "Get in touch with Maison Studio.",
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

  function updateField(
    field: keyof typeof form,
    value: string,
  ) {
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

      const { data, error } =
        await supabase.functions.invoke(
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

      if (error) {
        throw error;
      }

      if (!data?.success) {
        throw new Error(
          data?.error ||
            "Unable to send your message.",
        );
      }

      setSent(true);

      toast.success(
        "Message sent — I'll get back to you as soon as I can.",
      );
    } catch (error) {
      console.error(
        "CONTACT FORM ERROR:",
        error,
      );

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
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow">Contact</p>

          <h1 className="text-hero mt-4 text-foreground">
            Let's talk.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            For any quesions, ideas, discussion or random life thoughts. No formalities. Just write.
          </p>

          <div className="mt-10 space-y-5">
            <a
              href="mailto:emailkamleshsahoo@gmail.com"
              className="group flex items-center gap-4 text-foreground"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-secondary">
                <Mail className="size-5 text-accent" />
              </span>

              <span className="link-underline">
                emailkamleshsahoo@gmail.com
              </span>
            </a>

            <a
              href="https://www.instagram.com/painttheory.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-foreground"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-secondary">
                <Instagram className="size-5 text-accent" />
              </span>

              <span className="link-underline">
                @painttheory.in
              </span>
            </a>

            <div className="flex items-center gap-4 text-foreground">
              <span className="flex size-11 items-center justify-center rounded-full bg-secondary">
                <MapPin className="size-5 text-accent" />
              </span>

              <span>
                Bengaluru, India
              </span>
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
                    updateField(
                      "name",
                      e.target.value,
                    )
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
                    updateField(
                      "email",
                      e.target.value,
                    )
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
                    updateField(
                      "message",
                      e.target.value,
                    )
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