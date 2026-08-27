import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/artworks")({
  component: AdminArtworksLayout,
});

function AdminArtworksLayout() {
  return <Outlet />;
}