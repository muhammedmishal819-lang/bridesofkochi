# BridesOfKochi.com — Hyper-Local Wedding Vendor Directory for Kochi

Next.js 14 (App Router) + TypeScript + Tailwind + Supabase. Clean white premium design, rose accent `#E11D48`.

## Quick start (5 min)

1. **Create Supabase project** at https://supabase.com → New project → copy Project URL + anon key.
2. **Run SQL**: open Supabase → SQL Editor → paste entire `supabase-schema.sql` → Run. This creates the `vendors` table, RLS policies and seeds 12 demo vendors.
3. **Add env**:
   ```bash
   cp .env.example .env.local
   # fill NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```
4. **Run locally**:
   ```bash
   npm install
   npm run dev
   # open http://localhost:3000
   ```
   Without env keys the site runs in demo mode on built-in dummy data.
5. **Deploy to Vercel**:
   - Push to GitHub, Import in Vercel, add the 2 env vars, Deploy.
   - Or: `npx vercel --prod`

## Pages

- `/` homepage, `photographers`, `/makeup-artists`, `/vendor/[slug]`, `/admin` (password `admin123`), `/contact`, `/list-your-business`, `/privacy`, `/terms`
- `sitemap.ts` + `robots.ts` included. JSON-LD LocalBusiness on vendor pages.

## Monetization

Open `/admin` → toggle **Featured** on any vendor. Featured vendors sort first everywhere. Charge vendors offline/UPI for the toggle.

## WhatsApp links

`https://wa.me/91{number}?text=Hi {name}, I found you on BridesOfKochi.com...` — see `lib/utils.ts whatsappLink()`.
