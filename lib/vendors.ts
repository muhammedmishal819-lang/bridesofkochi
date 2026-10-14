import { supabase, isSupabaseConfigured } from "./supabase";

export type VendorCategory = "photographer" | "makeup_artist";

export type Vendor = {
  id: string;
  name: string;
  slug: string;
  category: VendorCategory;
  area: string;
  starting_price: number;
  price_range: "Under 25k" | "25k-50k" | "50k+";
  style: string;
  bio: string;
  profile_image: string;
  gallery_images: string[];
  instagram_url: string;
  whatsapp_number: string;
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_verified: boolean;
  created_at?: string;
};

export const AREAS = [
  "Kakkanad",
  "Fort Kochi",
  "Edappally",
  "Kaloor",
  "Tripunithura",
  "Panampilly Nagar"
] as const;

export const PHOTOGRAPHER_STYLES = ["Candid", "Traditional", "Cinematic"];
export const MAKEUP_STYLES = ["HD", "Airbrush", "Natural"];

const U = (id: string) => `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

export const DUMMY_VENDORS: Vendor[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    name: "Lens & Light Kochi",
    slug: "lens-and-light-kochi",
    category: "photographer",
    area: "Kakkanad",
    starting_price: 45000,
    price_range: "25k-50k",
    style: "Candid, Cinematic",
    bio: "Candid-first wedding team shooting across Kochi for 8 years. Calm crew, same-day teaser reels and premium albums.",
    profile_image: U("photo-1606216794074-735e91aa2c92"),
    gallery_images: [U("photo-1519741497674-611481863552"), U("photo-1511285560929-80b456fea0bc"), U("photo-1583939003579-730e3918a45a")],
    instagram_url: "https://instagram.com/lensandlight.kochi",
    whatsapp_number: "9847012345",
    rating: 4.9,
    review_count: 132,
    is_featured: true,
    is_verified: true
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    name: "Malabar Frames",
    slug: "malabar-frames",
    category: "photographer",
    area: "Fort Kochi",
    starting_price: 65000,
    price_range: "50k+",
    style: "Cinematic, Traditional",
    bio: "Fort Kochi studio known for cinematic films and heritage backdrops. Drone, LED wall portraits and full-day coverage.",
    profile_image: U("photo-1583939003579-730e3918a45a"),
    gallery_images: [U("photo-1522673607200-164d1b6ce486"), U("photo-1520854221256-17451cc331bf"), U("photo-1537633552985-df8429e8048b")],
    instagram_url: "https://instagram.com/malabarframes",
    whatsapp_number: "9847023456",
    rating: 4.8,
    review_count: 98,
    is_featured: true,
    is_verified: true
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    name: "Shutter Stories",
    slug: "shutter-stories-kochi",
    category: "photographer",
    area: "Edappally",
    starting_price: 28000,
    price_range: "25k-50k",
    style: "Candid, Traditional",
    bio: "Budget-friendly candid + traditional combo for intimate weddings and home functions around Edappally and Kalamassery.",
    profile_image: U("photo-1511285560929-80b456fea0bc"),
    gallery_images: [U("photo-1606216794074-735e91aa2c92"), U("photo-1591604466107-ec97de577aff"), U("photo-1519741497674-611481863552")],
    instagram_url: "https://instagram.com/shutterstories.kochi",
    whatsapp_number: "9847034567",
    rating: 4.7,
    review_count: 76,
    is_featured: false,
    is_verified: true
  },
  {
    id: "44444444-4444-4444-8444-444444444444",
    name: "Candid Karma",
    slug: "candid-karma",
    category: "photographer",
    area: "Kaloor",
    starting_price: 55000,
    price_range: "50k+",
    style: "Candid",
    bio: "Two-women candid crew loved by brides for comfort and natural posing. Unposed mornings, emotional evenings.",
    profile_image: U("photo-1520854221256-17451cc331bf"),
    gallery_images: [U("photo-1519741497674-611481863552"), U("photo-1583939003579-730e3918a45a"), U("photo-1522673607200-164d1b6ce486")],
    instagram_url: "https://instagram.com/candidkarma",
    whatsapp_number: "9847045678",
    rating: 4.9,
    review_count: 154,
    is_featured: true,
    is_verified: true
  },
  {
    id: "55555555-5555-4555-8555-555555555555",
    name: "Eternal Knots",
    slug: "eternal-knots",
    category: "photographer",
    area: "Tripunithura",
    starting_price: 32000,
    price_range: "25k-50k",
    style: "Traditional, Cinematic",
    bio: "Traditional Kerala wedding specialists. Full mundapuri coverage, muhurtham moments and family portraits done right.",
    profile_image: U("photo-1591604466107-ec97de577aff"),
    gallery_images: [U("photo-1511285560929-80b456fea0bc"), U("photo-1606216794074-735e91aa2c92"), U("photo-1537633552985-df8429e8048b")],
    instagram_url: "https://instagram.com/eternalknots",
    whatsapp_number: "9847056789",
    rating: 4.6,
    review_count: 61,
    is_featured: false,
    is_verified: true
  },
  {
    id: "66666666-6666-4666-8666-666666666666",
    name: "Pixel Priyan Films",
    slug: "pixel-priyan-films",
    category: "photographer",
    area: "Panampilly Nagar",
    starting_price: 80000,
    price_range: "50k+",
    style: "Cinematic",
    bio: "Premium cinema-style wedding films with SFX teaser, couple story shoot in Fort Kochi and Mattancherry.",
    profile_image: U("photo-1522673607200-164d1b6ce486"),
    gallery_images: [U("photo-1583939003579-730e3918a45a"), U("photo-1519741497674-611481863552"), U("photo-1520854221256-17451cc331bf")],
    instagram_url: "https://instagram.com/pixelpriyan",
    whatsapp_number: "9847067890",
    rating: 5.0,
    review_count: 48,
    is_featured: false,
    is_verified: true
  },
  {
    id: "77777777-7777-4777-8777-777777777777",
    name: "Glow by Anjali",
    slug: "glow-by-anjali",
    category: "makeup_artist",
    area: "Kakkanad",
    starting_price: 15000,
    price_range: "Under 25k",
    style: "HD, Natural",
    bio: "HD bridal makeup with soft Kerala glow. Trial available in Kakkanad studio, saree draping included.",
    profile_image: U("photo-1487412947147-5cebf100ffc2"),
    gallery_images: [U("photo-1610173826608-bd1f53a52db1"), U("photo-1457972729786-0411a8b2b626"), U("photo-1520854221256-17451cc331bf")],
    instagram_url: "https://instagram.com/glowbyanjali",
    whatsapp_number: "9847078901",
    rating: 4.9,
    review_count: 187,
    is_featured: true,
    is_verified: true
  },
  {
    id: "88888888-8888-4888-8888-888888888888",
    name: "Airbrush Asha Menon",
    slug: "airbrush-asha-menon",
    category: "makeup_artist",
    area: "Panampilly Nagar",
    starting_price: 28000,
    price_range: "25k-50k",
    style: "Airbrush, HD",
    bio: "Kochi's go-to airbrush bridal artist for long-lasting sweat-proof finish. Destination weddings handled.",
    profile_image: U("photo-1610173826608-bd1f53a52db1"),
    gallery_images: [U("photo-1487412947147-5cebf100ffc2"), U("photo-1520854221256-17451cc331bf"), U("photo-1457972729786-0411a8b2b626")],
    instagram_url: "https://instagram.com/airbrushasha",
    whatsapp_number: "9847089012",
    rating: 4.8,
    review_count: 112,
    is_featured: true,
    is_verified: true
  },
  {
    id: "99999999-9999-4999-8999-999999999999",
    name: "Natural Nidhi Bridal",
    slug: "natural-nidhi-bridal",
    category: "makeup_artist",
    area: "Edappally",
    starting_price: 12000,
    price_range: "Under 25k",
    style: "Natural, HD",
    bio: "No-makeup makeup specialist for morning muhurthams. Skin-prep routine and hairstyle included in package.",
    profile_image: U("photo-1457972729786-0411a8b2b626"),
    gallery_images: [U("photo-1487412947147-5cebf100ffc2"), U("photo-1610173826608-bd1f53a52db1"), U("photo-1537633552985-df8429e8048b")],
    instagram_url: "https://instagram.com/naturalnidhi",
    whatsapp_number: "9847090123",
    rating: 4.7,
    review_count: 89,
    is_featured: false,
    is_verified: true
  },
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    name: "Diva Divya Kochi",
    slug: "diva-divya-kochi",
    category: "makeup_artist",
    area: "Fort Kochi",
    starting_price: 18000,
    price_range: "Under 25k",
    style: "HD, Airbrush",
    bio: "Bridal + family packages. On-venue touch-up box and pre-bridal glow plan for 30 days.",
    profile_image: U("photo-1537633552985-df8429e8048b"),
    gallery_images: [U("photo-1457972729786-0411a8b2b626"), U("photo-1487412947147-5cebf100ffc2"), U("photo-1520854221256-17451cc331bf")],
    instagram_url: "https://instagram.com/divadivya.kochi",
    whatsapp_number: "9847101234",
    rating: 4.8,
    review_count: 143,
    is_featured: false,
    is_verified: true
  },
  {
    id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    name: "Lakme Leela Studio",
    slug: "lakme-leela-studio",
    category: "makeup_artist",
    area: "Kaloor",
    starting_price: 22000,
    price_range: "Under 25k",
    style: "Airbrush, Natural",
    bio: "Studio in Kaloor with trial room. Christian, Hindu and Muslim bridal looks with custom lens + lash bar.",
    profile_image: U("photo-1522337660859-02fbefca4702"),
    gallery_images: [U("photo-1610173826608-bd1f53a52db1"), U("photo-1487412947147-5cebf100ffc2"), U("photo-1520854221256-17451cc331bf")],
    instagram_url: "https://instagram.com/leelastudio.kaloor",
    whatsapp_number: "9847112345",
    rating: 4.6,
    review_count: 67,
    is_featured: false,
    is_verified: true
  },
  {
    id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
    name: "Serene Sona Makeovers",
    slug: "serene-sona-makeovers",
    category: "makeup_artist",
    area: "Tripunithura",
    starting_price: 30000,
    price_range: "25k-50k",
    style: "HD, Natural, Airbrush",
    bio: "Luxury bridal makeovers with premium Kryolan + Huda palette. Groom styling add-on available.",
    profile_image: U("photo-1596704017254-9b121068fb31"),
    gallery_images: [U("photo-1487412947147-5cebf100ffc2"), U("photo-1457972729786-0411a8b2b626"), U("photo-1610173826608-bd1f53a52db1")],
    instagram_url: "https://instagram.com/serenesona",
    whatsapp_number: "9847123456",
    rating: 4.9,
    review_count: 95,
    is_featured: true,
    is_verified: true
  }
];

/** Normalize one DB row: trims strings, lowercases category, coerces numbers/arrays.
 *  Protects listing pages against manually-added rows with 'Photographer',
 *  trailing spaces, null galleries, or string-typed ratings. */
function normalizeVendor(row: Record<string, unknown>): Vendor {
  const rawCat = String(row.category ?? "").trim().toLowerCase();
  const category: VendorCategory =
    rawCat === "makeup_artist" || rawCat === "makeup-artist" || rawCat === "makeup artist"
      ? "makeup_artist"
      : "photographer";
  const gallery = Array.isArray(row.gallery_images)
    ? (row.gallery_images as unknown[]).map(String)
    : [];
  const priceRangeRaw = String(row.price_range ?? "").trim();
  const price_range =
    priceRangeRaw === "Under 25k" || priceRangeRaw === "25k-50k" || priceRangeRaw === "50k+"
      ? (priceRangeRaw as Vendor["price_range"])
      : category === "photographer"
        ? ("25k-50k" as const)
        : ("Under 25k" as const);
  return {
    id: String(row.id ?? ""),
    name: String(row.name ?? "Unnamed vendor"),
    slug: String(row.slug ?? ""),
    category,
    area: String(row.area ?? "").trim() || "Kochi",
    starting_price: Number(row.starting_price) || 0,
    price_range,
    style: String(row.style ?? ""),
    bio: String(row.bio ?? ""),
    profile_image: String(row.profile_image ?? ""),
    gallery_images: gallery,
    instagram_url: String(row.instagram_url ?? ""),
    whatsapp_number: String(row.whatsapp_number ?? ""),
    rating: Number(row.rating) || 0,
    review_count: Number(row.review_count) || 0,
    is_featured: Boolean(row.is_featured),
    is_verified: row.is_verified !== false,
    created_at: row.created_at ? String(row.created_at) : undefined
  };
}

function sortVendors(a: Vendor, b: Vendor) {
  return Number(b.is_featured) - Number(a.is_featured) || b.rating - a.rating;
}

async function fromDb(category?: VendorCategory, attempts = 2): Promise<{ vendors: Vendor[] | null; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { vendors: null, error: "Supabase env vars missing" };
  const label = category ? ` (category=${category})` : "";
  // Retry transient Vercel↔Supabase network blips; surfaced cause codes
  // (ENOTFOUND/EAI_AGAIN = DNS, CONNECT_TIMEOUT = routing/firewall) tell us exactly why.
  let lastError = "unknown";
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      let query = supabase
        .from("vendors")
        .select("*")
        .order("is_featured", { ascending: false })
        .order("rating", { ascending: false });
      if (category) query = query.eq("category", category);
      const { data, error } = await query;
      if (error) {
        lastError = error.message;
        console.error(`[vendors] Supabase SELECT attempt ${attempt}${label}:`, error.message);
      } else if (!data || data.length === 0) {
        return { vendors: null, error: "empty" };
      } else {
        return { vendors: (data as Record<string, unknown>[]).map(normalizeVendor), error: null };
      }
    } catch (e) {
      const cause = (e as { cause?: { code?: string; message?: string } }).cause;
      lastError = `${e instanceof Error ? e.message : String(e)}${cause?.code ? ` [${cause.code}]` : ""}`;
      console.error(`[vendors] Supabase fetch attempt ${attempt}${label} threw:`, lastError);
    }
    if (attempt < attempts) await new Promise((r) => setTimeout(r, 400 * attempt * attempt));
  }
  return { vendors: null, error: lastError };
}

export async function getAllVendors(): Promise<Vendor[]> {
  const { vendors } = await fromDb();
  if (vendors) return [...vendors].sort(sortVendors);
  return [...DUMMY_VENDORS].sort(sortVendors);
}

export type CategoryResult = {
  vendors: Vendor[];
  /** null on success; otherwise a short machine-readable reason: 'db-error: ...' | 'rls-or-empty' | 'demo-fallback' */
  error: string | null;
  source: "db" | "demo";
};

export async function getVendorsByCategory(cat: VendorCategory): Promise<Vendor[]> {
  return (await getVendorsByCategorySafe(cat)).vendors;
}

/**
 * Robust category fetch:
 *  1. Direct DB query with exact .eq('category', cat) (uses idx_vendors_category).
 *  2. Fallback: fetch all + case-insensitive match (catches 'Photographer', whitespace, etc).
 *  3. Last resort: bundled demo vendors so the page NEVER renders empty on DB trouble
 *     (error string explains why — surfaced in UI, not an infinite spinner).
 */
export async function getVendorsByCategorySafe(cat: VendorCategory): Promise<CategoryResult> {
  const wanted = cat.trim().toLowerCase();

  // Run both queries in parallel: worst case waits ~one query's timeouts,
  // not the sum (keeps SSR fast even when the network is completely down).
  const [direct, all] = await Promise.all([fromDb(cat, 2), fromDb(undefined, 1)]);

  if (direct.vendors && direct.vendors.length > 0) {
    return { vendors: [...direct.vendors].sort(sortVendors), error: null, source: "db" };
  }

  if (all.vendors && all.vendors.length > 0) {
    const matched = all.vendors.filter((v) => v.category.trim().toLowerCase() === wanted);
    if (matched.length > 0) {
      console.warn(
        `[vendors] Exact category query for '${cat}' returned 0 rows but ${matched.length} rows matched case-insensitively. Check category casing in Supabase.`
      );
      return { vendors: matched.sort(sortVendors), error: null, source: "db" };
    }
    // Table readable but genuinely has no rows for this category.
    return { vendors: [], error: null, source: "db" };
  }

  // DB unreachable / RLS-blocked / table empty → demo fallback, never infinite loading.
  const demo = DUMMY_VENDORS.filter((v) => v.category === cat).sort(sortVendors);
  const reason = all.error && all.error !== "empty" ? `db-error: ${all.error}` : "rls-or-empty";
  console.warn(`[vendors] Falling back to demo data for '${cat}' (${reason}).`);
  return { vendors: demo, error: reason === "rls-or-empty" && direct.error ? `db-error: ${direct.error}` : reason, source: "demo" };
}

export async function getFeaturedVendors(limit = 6): Promise<Vendor[]> {
  const all = await getAllVendors();
  const f = all.filter((v) => v.is_featured);
  return (f.length ? f : all.slice(0, limit)).slice(0, limit);
}

export async function getVendorBySlug(slug: string): Promise<Vendor | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data } = await supabase.from("vendors").select("*").eq("slug", slug).single();
      if (data) return data as Vendor;
    } catch {}
  }
  return DUMMY_VENDORS.find((v) => v.slug === slug) ?? null;
}

export async function getRelatedVendors(vendor: Vendor, limit = 3): Promise<Vendor[]> {
  const all = await getAllVendors();
  const same = all.filter((v) => v.slug !== vendor.slug && v.category === vendor.category);
  same.sort((a, b) => {
    const areaScore = (x: Vendor) => (x.area === vendor.area ? 0 : 1);
    return areaScore(a) - areaScore(b) || b.rating - a.rating;
  });
  return same.slice(0, limit);
}

export function filterVendors(
  vendors: Vendor[],
  opts: { q?: string; areas?: string[]; budgets?: string[]; styles?: string[]; minRating?: number; featuredOnly?: boolean }
): Vendor[] {
  const q = (opts.q || "").toLowerCase().trim();
  return vendors
    .filter((v) => {
      if (q && !(v.name.toLowerCase().includes(q) || v.area.toLowerCase().includes(q))) return false;
      if (opts.areas?.length && !opts.areas.includes(v.area)) return false;
      if (opts.budgets?.length && !opts.budgets.includes(v.price_range)) return false;
      if (opts.styles?.length && !opts.styles.some((s) => v.style.toLowerCase().includes(s.toLowerCase()))) return false;
      if (opts.minRating && v.rating < opts.minRating) return false;
      if (opts.featuredOnly && !v.is_featured) return false;
      return true;
    })
    .sort((a, b) => Number(b.is_featured) - Number(a.is_featured) || b.rating - a.rating);
}

/**
 * Browser-side fetch of one category straight from Supabase REST.
 * Used as a self-healing second chance: if the server (Vercel) cannot reach
 * Supabase but the visitor's browser can, the listing upgrades itself from
 * demo data to live data a moment after page load. The anon key is public
 * by design and RLS still enforces read-only access.
 */
export async function fetchVendorsBrowser(cat: VendorCategory): Promise<Vendor[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) throw new Error("Supabase env vars missing in browser");
  const qs = new URLSearchParams({
    select: "*",
    category: `eq.${cat}`,
    order: "is_featured.desc,rating.desc"
  });
  const res = await fetch(`${url}/rest/v1/vendors?${qs.toString()}`, {
    headers: { apikey: anon, Authorization: `Bearer ${anon}` },
    signal: AbortSignal.timeout(10000)
  });
  if (!res.ok) throw new Error(`Supabase HTTP ${res.status}`);
  const rows = (await res.json()) as Record<string, unknown>[];
  const wanted = cat.trim().toLowerCase();
  return rows
    .map(normalizeVendor)
    .filter((v) => v.category.trim().toLowerCase() === wanted)
    .sort(sortVendors);
}
