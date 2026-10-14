import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Safe diagnostics: NEVER returns secret values, only shapes.
// Visit /api/debug-env on the live site to verify Vercel env vars.
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  let host: string | null = null;
  try {
    host = url ? new URL(url).hostname : null;
  } catch {
    host = "INVALID_URL_FORMAT";
  }
  return NextResponse.json({
    supabaseConfigured: Boolean(url && anon && url.includes("supabase")),
    urlHost: host,
    urlStartsHttps: url.startsWith("https://"),
    keyLength: anon.length,
    keyStart: anon.slice(0, 12),
    hasTrailingSpace: url !== url.trim() || anon !== anon.trim(),
    timestamp: new Date().toISOString()
  });
}
