import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anon && url.includes("supabase"));

export const supabase =
  isSupabaseConfigured
    ? createClient(url as string, anon as string, {
        global: {
          // Bound each request so a hung connection fails fast (and hits
          // the retry loop in lib/vendors.ts) instead of stalling SSR.
          fetch: (input, init) =>
            fetch(input, { ...init, signal: AbortSignal.timeout(15000) })
        }
      })
    : null;
