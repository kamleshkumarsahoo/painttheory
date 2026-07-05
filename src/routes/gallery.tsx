import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route for /gallery and /gallery/$artworkId — children render here.
export const Route = createFileRoute("/gallery")({
  component: () => <Outlet />,
});
