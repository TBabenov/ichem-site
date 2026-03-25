export function getApiBaseUrl() {
  // Prefer explicit env; fall back to local backend in dev.
  const envBase = import.meta.env.VITE_CATALOG_API_BASE_URL as string | undefined;
  const base = envBase ?? (import.meta.env.DEV ? 'http://127.0.0.1:8080' : '');
  return base.replace(/\/$/, '');
}

export async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getApiBaseUrl();
  const url = base ? `${base}${path}` : path;

  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${path}`);
  }

  return (await res.json()) as T;
}

