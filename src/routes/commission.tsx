import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/common/Reveal";
import { toast } from "sonner";
import { createInquiry } from "@/services/inquiry.service";
import { useState } from "react";

export const Route = createFileRoute("/commission")({
  head: () => ({
    meta: [
      { title: "Request a painting • PainthTheory" },
      {
        name: "description",
        content:
          "Commission a bespoke acrylic painting. Share your idea and we'll create an original artwork made just for you.",
      },
      {
        property: "og:title",
        content: "Request a painting • PaintTheory",
      },
      {
        property: "og:description",
        content:
          "Request for a painting, share your inputs, thoughts and then we see the though unveil into reality",
      },
    ],
  }),
  component: CommissionPage,
});

const timeline = [
  {
    step: "01",
    title: "Tell me what you have in mind",
    text: "Share the idea, feeling, subject or story behind your piece.",
  },
  {
    step: "02",
    title: "We shape the idea",
    text: "We discuss the details and I send you a clear quotation.",
  },
  {
    step: "03",
    title: "I paint it",
    text: "Once approved, I create your original and share progress along the way.",
  },
  {
    step: "04",
    title: "It comes home",
    text: "The finished piece is carefully packed and shipped to you.",
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  country: string;
  budget: string;
  description: string;
  deadline: string;
}

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  country: "",
  budget: "",
  description: "",
  deadline: "",
};

function CommissionPage() {
  const [form, setForm] = useState<FormState>(empty);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    if (!name || !email || !phone) {
      toast.error("Please add your name, email and phone number.");
      return;
    }

    try {
      await createInquiry({
        inquiry_type: "COMMISSION",
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        country: form.country,
        budget: form.budget,
        deadline: form.deadline,
        note: form.description,
      });

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Commission request error:", error);
      toast.error(
        "Could not submit your request. Please try again."
      );
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-24 text-center lg:pt-26">
        <Reveal>
          <p className="eyebrow">Commissions</p>

          <h1 className="text-hero mt-5 text-foreground">
            Commission a story worth hanging.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            You say it, I paint it
          </p>
        </Reveal>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((t, i) => (
            <Reveal key={t.step} delay={i}>
              <div className="group relative h-full border-t border-border pt-5 transition-transform duration-500 hover:-translate-y-1">
                <span className="absolute left-0 top-0 h-[2px] w-0 bg-foreground transition-all duration-200 group-hover:w-full" />
                <span className="label text-accent">{t.step}</span>

                <h3 className="mt-5 font-display text-xl leading-tight text-foreground">
                  {t.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form / Success */}
      <section className="mx-auto max-w-3xl px-6 pb-28">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-border bg-card p-10 text-center shadow-lift lg:p-16"
            >
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Check className="size-8" />
              </div>

              <h2 className="text-section mt-6 text-foreground">
                Request received
              </h2>

              <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                Thank you, We'll review your request and get back within 24-48
                hours with the next steps and a quotation.
              </p>

              <Button
                variant="outline"
                className="mt-8"
                onClick={() => {
                  setSubmitted(false);
                  setForm(empty);
                }}
              >
                Submit another request
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Reveal className="mb-10 text-center">
                <h2 className="text-section text-foreground">
                  Tell me about your piece
                </h2>
              </Reveal>

              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-10"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Name" required>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your full name"
                    />
                  </Field>

                  <Field label="Email" required>
                    <Input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@email.com"
                    />
                  </Field>

                  <Field label="Phone" required>
                    <Input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+91 …"
                    />
                  </Field>

                  <Field label="Country">
                    <Input
                      value={form.country}
                      onChange={(e) => update("country", e.target.value)}
                      placeholder="India"
                    />
                  </Field>

                  <Field label="Budget">
                    <Input
                      value={form.budget}
                      onChange={(e) => update("budget", e.target.value)}
                      placeholder="e.g. ₹30,000"
                    />
                  </Field>

                  <Field label="Deadline (optional)">
                    <Input
                      type="date"
                      value={form.deadline}
                      onChange={(e) => update("deadline", e.target.value)}
                    />
                  </Field>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <Field label="Tell me about the piece">
                    <Textarea
                      rows={5}
                      value={form.description}
                      onChange={(e) =>
                        update("description", e.target.value)
                      }
                      placeholder="Tell me about the story, subject, mood, or anything else you have in mind…"
                    />
                  </Field>
                </div>

                <Button type="submit" size="xl" className="mt-8 w-full">
                  Request Commission
                </Button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  No payment now, payment happens later, after we agree on a
                  quotation.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-2 block text-sm text-foreground">
        {label}
        {required && <span className="text-accent"> *</span>}
      </Label>

      {children}
    </div>
  );
}