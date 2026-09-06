import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const adminLinks = [
  { to: "/admin/artworks", label: "Gallery" },
  { to: "/admin", label: "Inquiries" },
  { to: "/admin/feedback", label: "Feedback" },
  { to: "/admin/customer-feedback", label: "Customer Feedback" },
  { to: "/admin/contact-messages", label: "Messages" },
  { to: "/admin/journal", label: "Journal" },
] as const;

export function AdminHeader() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  async function handleSignOut() {
    setOpen(false);
    await supabase.auth.signOut();
    await navigate({ to: "/admin" });
  }

  // Close menu when clicking outside.
  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (
        headerRef.current &&
        !headerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur"
    >
      <div className="mx-auto flex min-h-[74px] max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        {/* Brand */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="group shrink-0"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Admin Space
          </p>

          <p className="font-display text-lg text-foreground transition-colors group-hover:text-accent">
            Painttheory
          </p>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {adminLinks.map((link) => (
            <Button
              key={link.to}
              asChild
              variant="ghost"
              size="sm"
            >
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSignOut}
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="label md:hidden"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        className={`
          overflow-hidden
          transition-all duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          md:hidden
          ${
            open
              ? "max-h-[700px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <nav className="mx-4 mb-3 flex flex-col gap-1 rounded-2xl border border-border bg-background px-6 py-5 shadow-lg">
          {adminLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="py-2 text-lg text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={handleSignOut}
            className="mt-3 flex h-10 items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-background"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </nav>
      </div>
    </header>
  );
}