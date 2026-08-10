import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { api, saveToken, clearToken, getToken } from "../lib/api";

type Role = "admin" | "store_owner" | "root";
export type AdminUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};

type AuthCtx = {
  readonly user: AdminUser | null;
  readonly loading: boolean;
  readonly login: (email: string, password: string) => Promise<void>;
  readonly logout: () => void;
};

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    Promise.resolve(token ? api.get<AdminUser>("/auth/me") : null)
      .then((u) => {
        if (
          u &&
          (u.role === "admin" || u.role === "store_owner" || u.role === "root")
        )
          setUser(u);
        else if (token) clearToken();
      })
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const data = await api.post<{ token: string; user: AdminUser }>(
      "/auth/login",
      { email, password },
    );
    if (
      data.user.role !== "admin" &&
      data.user.role !== "store_owner" &&
      data.user.role !== "root"
    ) {
      throw new Error(
        "Access restricted to admin, store owner, and root accounts",
      );
    }
    saveToken(data.token);
    setUser(data.user);
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  const ctxValue = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading],
  );

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
