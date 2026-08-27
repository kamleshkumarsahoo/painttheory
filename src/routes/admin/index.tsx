import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Inbox, LogOut, ChevronDown } from "lucide-react";

import { getAllInquiries } from "@/services/inquiry.service";
import { InquiryCard } from "@/components/admin/InquiryCard";
import { formatPrice } from "@/types/artwork";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { getDashboardInquiries } from "@/lib/admin-dashboard";

export const Route = createFileRoute("/admin/")({
  component: AdminPage,
});

function AdminPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    getAllInquiries()
      .then(setInquiries)
      .catch(console.error);
  }, []);

  const {
    newRequests,
    inProgress,
    completed,
    discarded,
    pipelineValue,
  } = getDashboardInquiries(inquiries);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-border pb-5 sm:border-0 sm:pb-0">
        <div className="flex items-start justify-between gap-4">

          <div className="min-w-0">
            <p className="eyebrow">
              Studio dashboard
            </p>

            <h1 className="mt-1 font-display text-3xl leading-tight text-foreground sm:text-4xl">
              Inquiries
            </h1>
          </div>

          {/* Desktop sign out */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="hidden shrink-0 sm:inline-flex"
            onClick={() => supabase.auth.signOut()}
          >
            <LogOut className="size-4" />
            Sign out
          </Button>

          {/* Mobile sign out */}
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:hidden"
            aria-label="Sign out"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </header>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-4 sm:gap-3">

        <Stat
          label="New"
          value={String(newRequests.length)}
          accent
        />

        <Stat
          label="In progress"
          value={String(inProgress.length)}
        />

        <Stat
          label="Completed"
          value={String(completed.length)}
        />

        <Stat
          label="Open pipeline"
          value={formatPrice(pipelineValue)}
        />

      </div>

      {/* =====================================================
          REQUEST SECTIONS
      ===================================================== */}

      <Section
        title="New requests"
        hint="Awaiting your review"
        count={newRequests.length}
        items={newRequests}
        emptyLabel="No new inquiries right now."
      />

      <Section
        title="In progress"
        hint="Communicated, paid or shipping"
        count={inProgress.length}
        items={inProgress}
        emptyLabel="Nothing in progress."
      />

      <Section
        title="Completed"
        hint="Delivered, feedback or closed"
        count={completed.length}
        items={completed}
        emptyLabel="No completed orders yet."
      />

      <Section
        title="Discarded requests"
        hint="Hidden from active workflow"
        count={discarded.length}
        items={discarded}
        emptyLabel="No discarded requests."
        collapsed
      />

      {/* Mobile bottom spacing */}
      <div className="h-4 sm:hidden" />
    </div>
  );
}

/* ============================================================
   STAT
============================================================ */

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-border
        bg-card
        px-3.5
        py-3
        sm:rounded-2xl
        sm:p-4
        sm:shadow-soft
      "
    >
      <p className="text-[0.58rem] uppercase tracking-[0.16em] text-muted-foreground sm:text-[0.65rem] sm:tracking-widest">
        {label}
      </p>

      <p
        className={`mt-1 font-display text-xl leading-none sm:text-2xl ${
          accent
            ? "text-accent"
            : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   SECTION
============================================================ */

function Section({
  title,
  hint,
  count,
  items,
  emptyLabel,
  collapsed,
}: {
  title: string;
  hint: string;
  count: number;
  items: any[];
  emptyLabel: string;
  collapsed?: boolean;
}) {
  const content = (
    <>
      {items.length === 0 ? (
        <div
          className="
            mt-4
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-dashed
            border-border
            bg-card/50
            px-4
            py-6
            text-sm
            text-muted-foreground
            sm:mt-5
            sm:rounded-2xl
            sm:px-5
            sm:py-8
          "
        >
          <Inbox className="size-4 shrink-0" />

          <span>{emptyLabel}</span>
        </div>
      ) : (
        <div
          className="
            mt-4
            grid
            gap-3
            sm:mt-5
            sm:grid-cols-2
            sm:gap-4
            lg:grid-cols-3
          "
        >
          {items.map((inq) => (
            <InquiryCard
              key={inq.id}
              inquiry={inq}
            />
          ))}
        </div>
      )}
    </>
  );

  /* ==========================================================
     COLLAPSED SECTION
  ========================================================== */

  if (collapsed) {
    return (
      <details className="group mt-8 sm:mt-12">

        <summary
          className="
            flex
            cursor-pointer
            list-none
            items-center
            gap-2.5
            rounded-xl
            border
            border-border
            bg-card
            px-4
            py-3.5
            transition-colors
            hover:bg-secondary/40
            sm:gap-3
            sm:rounded-2xl
            sm:px-5
            sm:py-4
            sm:shadow-soft
          "
        >
          <h2 className="min-w-0 font-display text-lg text-foreground sm:text-2xl">
            {title}
          </h2>

          <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground sm:px-2.5 sm:text-xs">
            {count}
          </span>

          <span className="ml-auto hidden text-sm text-muted-foreground md:inline">
            {hint}
          </span>

          <span className="hidden text-[0.6rem] uppercase tracking-widest text-muted-foreground group-open:hidden sm:inline">
            Show
          </span>

          <span className="hidden text-[0.6rem] uppercase tracking-widest text-muted-foreground group-open:inline sm:inline">
            Hide
          </span>

          <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 sm:hidden" />
        </summary>

        {content}
      </details>
    );
  }

  /* ==========================================================
     NORMAL SECTION
  ========================================================== */

  return (
    <section className="mt-8 sm:mt-12">

      {/* Section heading */}

      <div className="flex items-baseline gap-2.5 sm:gap-3">

        <h2 className="font-display text-xl text-foreground sm:text-2xl">
          {title}
        </h2>

        <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground sm:px-2.5 sm:text-xs">
          {count}
        </span>

        {/* Desktop hint */}
        <span className="ml-auto hidden text-sm text-muted-foreground sm:inline">
          {hint}
        </span>

      </div>

      {/* Mobile hint */}

      <p className="mt-1 text-xs text-muted-foreground sm:hidden">
        {hint}
      </p>

      {content}
    </section>
  );
}