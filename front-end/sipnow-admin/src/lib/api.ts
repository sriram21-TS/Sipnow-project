export const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

function getToken() {
  return localStorage.getItem("sipnow_admin_token");
}

type FetchOptions = RequestInit & { skipAuth?: boolean };

async function request<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { skipAuth, ...rest } = options;
  const headers: Record<string, string> = {
    ...(rest.headers as Record<string, string>),
  };
  if (!skipAuth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  if (!(rest.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${BASE}/api/v1${path}`, { ...rest, headers });
  if (res.status === 204) return undefined as T;
  const data = await res.json();
  if (!res.ok)
    throw new Error(data.message ?? `Request failed (${res.status})`);
  return data as T;
}

async function requestBlob(path: string): Promise<Blob> {
  const token = getToken();
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE}/api/v1${path}`, { headers });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? `Request failed (${res.status})`);
  }
  return res.blob();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
  upload: <T>(path: string, form: FormData) =>
    request<T>(path, { method: "POST", body: form }),
  getBlob: (path: string) => requestBlob(path),
};

export function saveToken(token: string) {
  localStorage.setItem("sipnow_admin_token", token);
}
export function clearToken() {
  localStorage.removeItem("sipnow_admin_token");
}
export { getToken };
