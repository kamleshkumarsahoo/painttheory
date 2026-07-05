import { useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useDropzone } from "react-dropzone";
import { Check, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/common/Reveal";
import { toast } from "sonner";

export const Route = createFileRoute("/commission")({
  head: () => ({
    meta: [
      { title: "Commission a Story — Maison" },
      {
        name: "description",
        content:
          "Commission a bespoke acrylic painting. Share your idea and we'll craft an original artwork through a considered six-step process.",
      },
      { property: "og:title", content: "Commission a Story — Maison" },
      {
        property: "og:description",
        content: "Commission a bespoke, one-of-a-kind acrylic painting made just for you.",
      },
    ],
  }),
  component: CommissionPage,
});

const timeline = [
  { step: "01", title: "Share your idea", text: "Tell me the story, the space and the feeling you want to keep." },
  { step: "02", title: "Discussion & quotation", text: "We refine the concept together and I send a clear quote." },
  { step: "03", title: "Advance payment", text: "A deposit reserves your place in the studio schedule." },
  { step: "04", title: "Sketch approval", text: "You review composition and palette before any paint is mixed." },
  { step: "05", title: "Painting process", text: "The work is created by hand, with progress shared along the way." },
  { step: "06", title: "Final payment & delivery", text: "Balance settled, then insured delivery to your door." },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  country: string;
  size: string;
  budget: string;
  description: string;
  deadline: string;
}

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  country: "",
  size: "",
  budget: "",
  description: "",
  deadline: "",
};

function CommissionPage() {
  const [form, setForm] = useState<FormState>(empty);
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const onDrop = useCallback((accepted: File[]) => {
    setFiles((prev) => [...prev, ...accepted].slice(0, 6));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 6,
  });

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.description) {
      toast.error("Please add your name, email and a short description.");
      return;
    }
    // Placeholder — wire to Lovable Cloud / email service later.
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-20 text-center lg:pt-28">
        <Reveal>
          <p className="eyebrow">Commissions</p>
          <h1 className="text-hero mt-5 text-foreground">Commission a story worth hanging.</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            A bespoke original, made for your space and your story. No payment today —
            we'll talk first, then I'll send a considered quote.
          </p>
        </Reveal>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-5xl px-6 py-20 lg:py-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {timeline.map((t, i) => (
            <Reveal key={t.step} delay={i}>
              <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-soft transition-transform duration-300 hover:-translate-y-1">
                <span className="font-display text-4xl text-accent">{t.step}</span>
                <h3 className="mt-4 font-display text-xl text-foreground">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
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
              <h2 className="text-section mt-6 text-foreground">Request received</h2>
              <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                Thank you — we'll review your request and get back within 24–48 hours with next
                steps and a quotation.
              </p>
              <Button
                variant="outline"
                className="mt-8"
                onClick={() => {
                  setSubmitted(false);
                  setForm(empty);
                  setFiles([]);
                }}
              >
                Submit another request
              </Button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Reveal className="mb-10 text-center">
                <h2 className="text-section text-foreground">Tell me about your piece</h2>
              </Reveal>
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-10"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Name" required>
                    <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" />
                  </Field>
                  <Field label="Email" required>
                    <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" />
                  </Field>
                  <Field label="Phone">
                    <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 …" />
                  </Field>
                  <Field label="Country">
                    <Input value={form.country} onChange={(e) => update("country", e.target.value)} placeholder="India" />
                  </Field>
                  <Field label="Canvas size">
                    <Input value={form.size} onChange={(e) => update("size", e.target.value)} placeholder="e.g. 36 × 36 inches" />
                  </Field>
                  <Field label="Budget">
                    <Input value={form.budget} onChange={(e) => update("budget", e.target.value)} placeholder="e.g. ₹30,000" />
                  </Field>
                </div>

                <div className="mt-6">
                  <Field label="Description" required>
                    <Textarea
                      rows={5}
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      placeholder="Describe the story, subject, mood and where it will hang…"
                    />
                  </Field>
                </div>

                {/* Reference images */}
                <div className="mt-6">
                  <Label className="mb-2 block text-sm text-foreground">Reference images</Label>
                  <div
                    {...getRootProps()}
                    className={
                      "flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-10 text-center transition-colors " +
                      (isDragActive ? "border-accent bg-accent/5" : "border-border hover:border-foreground/40")
                    }
                  >
                    <input {...getInputProps()} />
                    <ImagePlus className="size-6 text-accent" />
                    <p className="mt-3 text-sm text-foreground">Drop images here, or click to upload</p>
                    <p className="mt-1 text-xs text-muted-foreground">Up to 6 images</p>
                  </div>

                  {files.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {files.map((file, i) => (
                        <div key={i} className="group relative aspect-square overflow-hidden rounded-xl">
                          <img src={URL.createObjectURL(file)} alt={file.name} className="size-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                            className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-foreground/70 text-background opacity-0 transition-opacity group-hover:opacity-100"
                            aria-label="Remove image"
                          >
                            <X className="size-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <Field label="Deadline (optional)">
                    <Input type="date" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} />
                  </Field>
                </div>

                <Button type="submit" size="xl" className="mt-8 w-full">
                  Request Commission
                </Button>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  No payment now — payment happens later, after we agree on a quotation.
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
