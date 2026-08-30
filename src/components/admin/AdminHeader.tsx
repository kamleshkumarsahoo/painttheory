import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  const navigate = useNavigate();

  async function handleSignOut() {
    await supabase.auth.signOut();
    await navigate({ to: "/admin" });
  }

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <Link to="/" className="group">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Admin Space
          </p>

          <p className="font-display text-lg text-foreground transition-colors group-hover:text-accent">
            Painttheory
          </p>
        </Link>

        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/artworks">Gallery</Link>
          </Button>

          <Button asChild variant="ghost" size="sm">
            <Link to="/admin">Inquiries</Link>
          </Button>

          {/* Existing curated testimonials */}
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/feedback">Feedback</Link>
          </Button>

          {/* Customer-submitted feedback */}
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/customer-feedback">
              Customer Feedback
            </Link>
          </Button>

          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/contact-messages">Messages</Link>
          </Button>

          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/journal">Journal</Link>
          </Button>

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
      </div>
    </header>
  );
}