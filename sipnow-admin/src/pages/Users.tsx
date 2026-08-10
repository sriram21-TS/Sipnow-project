import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ShieldCheck, ShieldOff, Search, Crown } from "lucide-react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

type Role = "user" | "store_owner" | "admin" | "root";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: Role;
  createdAt: string;
};

const ROLE_BADGE: Record<Role, string> = {
  root: "bg-yellow-100 text-yellow-800",
  admin: "bg-primary/10 text-primary",
  store_owner: "bg-blue-100 text-blue-700",
  user: "bg-gray-100 text-gray-600",
};

const ROLE_LABEL: Record<Role, string> = {
  root: "Root",
  admin: "Admin",
  store_owner: "Store Owner",
  user: "User",
};

export default function Users() {
  const queryClient = useQueryClient();
  const { user: me } = useAuth();
  const [search, setSearch] = useState("");

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.get<User[]>("/admin/users"),
  });

  const {
    mutate: changeRole,
    variables: roleVars,
    isPending: promoting,
  } = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: Role }) =>
      api.patch(`/auth/users/${userId}/role`, { role }),
    onSuccess: (_, { userId, role }) => {
      queryClient.setQueryData<User[]>(
        ["users"],
        (prev) =>
          prev?.map((u) => (u.id === userId ? { ...u, role } : u)) ?? [],
      );
    },
  });

  const filtered = users.filter(
    (u) =>
      !search ||
      u.firstName.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const isRoot = me?.role === "root";

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h2 className="text-xl font-semibold text-gray-900">Users</h2>
        <p className="text-sm text-gray-400">{users.length} total</p>
      </div>

      <div className="relative mb-4 max-w-xs">
        <Search
          size={13}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error.message}</p>}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Name
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Email
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Phone
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Role
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Joined
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 w-44">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(() => {
                if (isLoading) {
                  return (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-10 text-center text-sm text-gray-400"
                      >
                        Loading…
                      </td>
                    </tr>
                  );
                }
                if (filtered.length === 0) {
                  return (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-10 text-center text-sm text-gray-400"
                      >
                        No users found
                      </td>
                    </tr>
                  );
                }
                return filtered.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      <span className="flex items-center gap-1.5">
                        {u.role === "root" && (
                          <Crown
                            size={13}
                            className="text-yellow-600 shrink-0"
                          />
                        )}
                        {u.firstName} {u.lastName}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {u.email}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {u.phone ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${ROLE_BADGE[u.role]}`}
                      >
                        {ROLE_LABEL[u.role]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {new Date(u.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      {renderActions(
                        u,
                        isRoot,
                        promoting,
                        roleVars,
                        changeRole,
                      )}
                    </td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function renderActions(
  u: User,
  isRoot: boolean,
  promoting: boolean,
  roleVars: { userId: string; role: Role } | undefined,
  changeRole: (vars: { userId: string; role: Role }) => void,
) {
  // Root users cannot be actioned by anyone
  if (u.role === "root") {
    return <span className="text-xs text-gray-300">—</span>;
  }

  // Only root can change roles
  if (!isRoot) {
    return <span className="text-xs text-gray-300">—</span>;
  }

  const busy = promoting && roleVars?.userId === u.id;

  if (u.role === "admin") {
    return (
      <button
        onClick={() => changeRole({ userId: u.id, role: "store_owner" })}
        disabled={busy}
        className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:border-red-200 hover:bg-red-50 transition-colors disabled:opacity-60"
      >
        <ShieldOff size={12} /> Demote to Store Owner
      </button>
    );
  }

  if (u.role === "store_owner") {
    return (
      <div className="flex items-center gap-1 flex-wrap">
        <button
          onClick={() => changeRole({ userId: u.id, role: "admin" })}
          disabled={busy}
          className="flex items-center gap-1 text-xs text-primary border border-primary/30 rounded-lg px-2.5 py-1.5 hover:bg-primary/5 transition-colors disabled:opacity-60"
        >
          <ShieldCheck size={12} /> Make Admin
        </button>
        <button
          onClick={() => changeRole({ userId: u.id, role: "user" })}
          disabled={busy}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:border-red-200 hover:bg-red-50 transition-colors disabled:opacity-60"
        >
          <ShieldOff size={12} /> Demote to User
        </button>
      </div>
    );
  }

  // role === "user"
  return (
    <button
      onClick={() => changeRole({ userId: u.id, role: "store_owner" })}
      disabled={busy}
      className="flex items-center gap-1 text-xs text-blue-600 border border-blue-200 rounded-lg px-2.5 py-1.5 hover:bg-blue-50 transition-colors disabled:opacity-60"
    >
      <ShieldCheck size={12} /> Make Store Owner
    </button>
  );
}
