import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/journal")({
  component: AdminJournalLayout,
});

function AdminJournalLayout() {
  return <Outlet />;
}