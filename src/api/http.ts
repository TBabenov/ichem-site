export function getApiBaseUrl() {
  // Default to relative `/api/*` calls so dev can use Vite proxy (no CORS).
  const envBase = import.meta.env.VITE_CATALOG_API_BASE_URL as string | undefined;
  if (!envBase) return '';
  return envBase.replace(/\/$/, '');
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

