import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import type { AdminUser } from "../context/AuthContext";

export const mockAdminUser: AdminUser = {
  id: "user-1",
  firstName: "Admin",
  lastName: "User",
  email: "admin@test.com",
  role: "admin",
};

export const mockStoreOwner: AdminUser = {
  id: "user-2",
  firstName: "Store",
  lastName: "Owner",
  email: "owner@test.com",
  role: "store_owner",
};

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });
}

export function renderWithProviders(
  ui: React.ReactElement,
  { route = "/" }: { route?: string } = {},
) {
  const qc = makeQueryClient();
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
}
