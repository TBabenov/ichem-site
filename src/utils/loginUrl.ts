/**
 * URL для входа во внутреннюю систему.
 * - Если задан VITE_LOGIN_URL — используется он (полный URL).
 * - Иначе в браузере: https://<текущий host>/login (чтобы не уходить на http://… и Apache на :80).
 */
export function getLoginHref(): string {
  const fromEnv = import.meta.env.VITE_LOGIN_URL as string | undefined;
  if (fromEnv?.trim()) return fromEnv.trim();

  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location;
    const local = host.startsWith('localhost') || host.startsWith('127.');
    if (local && protocol === 'http:') {
      return `${protocol}//${host}/login`;
    }
    return `https://${host}/login`;
  }

  return '/login';
}
