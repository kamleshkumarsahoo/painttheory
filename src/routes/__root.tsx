import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <p className="eyebrow">Lost in the gallery</p>
      <h1 className="mt-4 text-hero text-foreground">404</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        This wall is empty. The piece you're looking for may have moved or sold.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
      >
        Return home
      </a>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-section text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Maison — Original Artworks that Carry Stories" },
      {
        name: "description",
        content:
          "One-of-a-kind acrylic paintings inspired by places, memories and emotions. Collect an original or commission a bespoke artwork.",
      },
      { name: "author", content: "Maison Studio" },
      { name: "theme-color", content: "#fdfbf7" },
      { property: "og:title", content: "Maison — Original Artworks that Carry Stories" },
      {
        property: "og:description",
        content:
          "One-of-a-kind acrylic paintings inspired by places, memories and emotions. Collect an original or commission a bespoke artwork.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Maison — Original Artworks that Carry Stories" },
      { name: "description", content: "One-of-a-kind acrylic paintings inspired by places, memories and emotions. Collect an original or commission a bespoke artwork." },
      { property: "og:description", content: "One-of-a-kind acrylic paintings inspired by places, memories and emotions. Collect an original or commission a bespoke artwork." },
      { name: "twitter:description", content: "One-of-a-kind acrylic paintings inspired by places, memories and emotions. Collect an original or commission a bespoke artwork." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/deb5ce44-f5b1-49d9-b897-cbf7c5c6eed8/id-preview-6247deb0--2d6c3fac-0f5b-4f8d-90de-516c77b2284d.lovable.app-1783181880840.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/deb5ce44-f5b1-49d9-b897-cbf7c5c6eed8/id-preview-6247deb0--2d6c3fac-0f5b-4f8d-90de-516c77b2284d.lovable.app-1783181880840.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        {!isAdmin && <SiteHeader />}

        <main className="flex-1">
          <Outlet />
        </main>

        {!isAdmin && <SiteFooter />}
      </div>

      <Toaster />
    </QueryClientProvider>
  );
}
