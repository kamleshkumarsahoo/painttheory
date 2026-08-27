import { useState } from "react";
import { Lock } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSigningIn(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setSigningIn(false);

    if (error) {
      setError("Incorrect email or password.");
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
        <div className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Lock className="size-5" />
        </div>

        <p className="eyebrow mt-6">Studio access</p>

        <h1 className="mt-2 font-display text-3xl text-foreground">
          Admin sign in
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage collector inquiries, quotes and order status.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="studio@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" size="lg" className="w-full" disabled={signingIn}>
            {signingIn ? "Signing in..." : "Enter studio"}
          </Button>
        </form>
      </div>
    </div>
  );
}
