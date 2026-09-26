// Auth storage for Supabase client.
// Uses localStorage in the browser, undefined on the server.
export function localAuthStorage() {
  if (typeof window === "undefined") return undefined;
  return {
    getItem: (key: string) => {
      try { return window.localStorage.getItem(key); } catch { return null; }
    },
    setItem: (key: string, value: string) => {
      try { window.localStorage.setItem(key, value); } catch { /* no-op */ }
    },
    removeItem: (key: string) => {
      try { window.localStorage.removeItem(key); } catch { /* no-op */ }
    },
  };
}
