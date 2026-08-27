import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, Phone, Loader2 } from "lucide-react";

import { supabase } from "@/lib/supabase";

export const Route = createFileRoute(
  "/admin/contact-messages",
)({
  component: ContactMessagesPage,
});

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: "NEW" | "READ" | "REPLIED" | "ARCHIVED";
  created_at: string;
  read_at: string | null;
  replied_at: string | null;
};

function ContactMessagesPage() {
  const [messages, setMessages] = useState<
    ContactMessage[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      setMessages(data ?? []);
    } catch (error) {
      console.error(
        "LOAD CONTACT MESSAGES ERROR:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load contact messages.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Loading messages...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <p className="eyebrow">Studio dashboard</p>

        <h1 className="mt-3 font-display text-4xl text-foreground">
          Contact Messages
        </h1>

        <p className="mt-6 text-sm text-destructive">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Studio dashboard</p>

          <h1 className="mt-3 font-display text-4xl text-foreground">
            Contact Messages
          </h1>

          <p className="mt-3 text-muted-foreground">
            Messages received through the website contact form.
          </p>
        </div>

        <div className="text-sm text-muted-foreground">
          {messages.length}{" "}
          {messages.length === 1
            ? "message"
            : "messages"}
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-border bg-card p-10 text-center">
          <p className="font-display text-xl text-foreground">
            No messages yet
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Messages submitted through the contact form
            will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {messages.map((message) => (
            <article
              key={message.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-xl text-foreground">
                      {message.name}
                    </h2>

                    <span className="rounded-full bg-secondary px-3 py-1 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                      {message.status}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-5">
                    <a
                      href={`mailto:${message.email}`}
                      className="flex items-center gap-2 hover:text-accent"
                    >
                      <Mail className="size-3.5" />
                      {message.email}
                    </a>

                    {message.phone && (
                      <a
                        href={`tel:${message.phone}`}
                        className="flex items-center gap-2 hover:text-accent"
                      >
                        <Phone className="size-3.5" />
                        {message.phone}
                      </a>
                    )}
                  </div>
                </div>

                <time className="shrink-0 text-xs text-muted-foreground">
                  {new Date(
                    message.created_at,
                  ).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </time>
              </div>

              <div className="mt-6 border-t border-border pt-5">
                <p className="whitespace-pre-wrap text-sm leading-7 text-foreground/85">
                  {message.message}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}