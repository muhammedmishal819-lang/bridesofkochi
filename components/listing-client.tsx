"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, Search, X, TriangleAlert, RefreshCw } from "lucide-react";
import type { Vendor, VendorCategory } from "@/lib/vendors";
import { AREAS, fetchVendorsBrowser, filterVendors } from "@/lib/vendors";
import VendorCard from "@/components/vendor-card";
import { cn } from "@/lib/utils";

const BUDGETS = ["Under 25k", "25k-50k", "50k+"];

type Filters = {
  q: string;
  areas: string[];
  budgets: string[];
  styles: string[];
  minRating: number;
  featuredOnly: boolean;
};

const EMPTY: Filters = { q: "", areas: [], budgets: [], styles: [], minRating: 0, featuredOnly: false };

function parseSearch(search: string): Filters {
  try {
    const p = new URLSearchParams(search);
    const list = (k: string) => (p.get(k) ? p.get(k)!.split(",").filter(Boolean) : []);
    return {
      q: p.get("q") || "",
      areas: list("areas"),
      budgets: list("budget"),
      styles: list("style"),
      minRating: Number(p.get("rating") || 0) || 0,
      featuredOnly: p.get("featured") === "1"
    };
  } catch {
    return EMPTY;
  }
}

function toSearch(f: Filters): string {
  const p = new URLSearchParams();
  if (f.q) p.set("q", f.q);
  if (f.areas.length) p.set("areas", f.areas.join(","));
  if (f.budgets.length) p.set("budget", f.budgets.join(","));
  if (f.styles.length) p.set("style", f.styles.join(","));
  if (f.minRating) p.set("rating", String(f.minRating));
  if (f.featuredOnly) p.set("featured", "1");
  return p.toString();
}

/** Skeleton grid used during route transitions (see loading.tsx) and slow filter sync. */
export function VendorGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-label="Loading vendors">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-soft">
          <div className="aspect-[16/9] bg-neutral-100" />
          <div className="space-y-2.5 p-5">
            <div className="h-4 w-2/3 rounded bg-neutral-100" />
            <div className="h-3 w-1/2 rounded bg-neutral-100" />
            <div className="h-3 w-1/3 rounded bg-neutral-100" />
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="h-9 rounded-xl bg-neutral-100" />
              <div className="h-9 rounded-xl bg-neutral-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ListingClient({
  vendors,
  styles,
  basePath,
  category,
  loadError: initialError
}: {
  vendors: Vendor[];
  styles: string[];
  basePath: string;
  category: VendorCategory;
  loadError?: string | null;
}) {
  const router = useRouter();
  // Self-heal: if SSR fell back to demo data, retry straight from the
  // visitor's browser (different network path) and upgrade silently.
  const [liveVendors, setLiveVendors] = useState<Vendor[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(initialError ?? null);
  const [reconnecting, setReconnecting] = useState(false);
  const [browserError, setBrowserError] = useState<string | null>(null);
  useEffect(() => {
    if (!initialError) return;
    let alive = true;
    setReconnecting(true);
    fetchVendorsBrowser(category)
      .then((rows) => {
        if (!alive || rows.length === 0) return;
        setLiveVendors(rows);
        setLoadError(null);
      })
      .catch((e) => {
        if (alive) setBrowserError(e instanceof Error ? e.message : String(e));
      })
      .finally(() => {
        if (alive) setReconnecting(false);
      });
    return () => {
      alive = false;
    };
  }, [initialError, category]);
  const displayVendors = liveVendors ?? vendors;
  // Filters render IMMEDIATELY from local state — the grid never suspends on
  // useSearchParams, so a hydration delay can no longer trap the page on a spinner.
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [urlState, setUrlState] = useState<"pending" | "ready" | "slow">("pending");
  const [drawer, setDrawer] = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  // One-time: adopt filters from the URL (back/forward handled via popstate).
  useEffect(() => {
    try {
      setFilters(parseSearch(window.location.search));
    } catch {
      /* defaults stand */
    }
    setUrlState("ready");
    const onPop = () => setFilters(parseSearch(window.location.search));
    window.addEventListener("popstate", onPop);
    // Watchdog: if URL adoption ever stalls >3s, stop waiting and show all vendors.
    const t = setTimeout(() => {
      setUrlState((s) => (s === "pending" ? "slow" : s));
    }, 3000);
    return () => {
      window.removeEventListener("popstate", onPop);
      clearTimeout(t);
    };
  }, []);

  function commit(next: Filters, immediate = false) {
    setFilters(next);
    const write = () => {
      const qs = toSearch(next);
      router.replace(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
    };
    if (debounce.current) clearTimeout(debounce.current);
    if (immediate) write();
    else debounce.current = setTimeout(write, 350);
  }

  function toggleList(key: "areas" | "budgets" | "styles", val: string) {
    const cur = filters[key];
    const next = cur.includes(val) ? cur.filter((x) => x !== val) : [...cur, val];
    commit({ ...filters, [key]: next }, true);
  }

  const filtered = useMemo(
    () =>
      filterVendors(displayVendors, {
        q: filters.q,
        areas: filters.areas,
        budgets: filters.budgets,
        styles: filters.styles,
        minRating: filters.minRating,
        featuredOnly: filters.featuredOnly
      }),
    [displayVendors, filters]
  );

  const activeCount =
    filters.areas.length +
    filters.budgets.length +
    filters.styles.length +
    (filters.minRating ? 1 : 0) +
    (filters.featuredOnly ? 1 : 0);

  const filterBody = (
    <div className="space-y-6">
      <div>
        <p className="text-[13px] font-bold uppercase tracking-wide text-neutral-500">Area</p>
        <div className="mt-2.5 space-y-2">
          {AREAS.map((a) => (
            <label key={a} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={filters.areas.includes(a)}
                onChange={() => toggleList("areas", a)}
                className="h-4 w-4 rounded accent-rose-600"
              />
              {a}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[13px] font-bold uppercase tracking-wide text-neutral-500">Budget</p>
        <div className="mt-2.5 space-y-2">
          {BUDGETS.map((b) => (
            <label key={b} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={filters.budgets.includes(b)}
                onChange={() => toggleList("budgets", b)}
                className="h-4 w-4 rounded accent-rose-600"
              />
              {b}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[13px] font-bold uppercase tracking-wide text-neutral-500">Style</p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {styles.map((s) => (
            <button
              key={s}
              onClick={() => toggleList("styles", s)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[13px] font-medium transition",
                filters.styles.includes(s)
                  ? "border-rose-600 bg-rose-50 text-rose-700"
                  : "border-neutral-200 hover:border-neutral-400"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[13px] font-bold uppercase tracking-wide text-neutral-500">Rating</p>
        <div className="mt-2.5 flex gap-2">
          {[0, 4.7, 4.8, 4.9].map((r) => (
            <button
              key={r}
              onClick={() => commit({ ...filters, minRating: r }, true)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[13px] font-medium",
                filters.minRating === r ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200"
              )}
            >
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </div>
      <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-neutral-50 p-3.5 text-sm font-medium">
        Featured only
        <input
          type="checkbox"
          checked={filters.featuredOnly}
          onChange={() => commit({ ...filters, featuredOnly: !filters.featuredOnly }, true)}
          className="h-4 w-4 accent-rose-600"
        />
      </label>
      {activeCount > 0 && (
        <button
          onClick={() => commit(EMPTY, true)}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-200 py-2.5 text-sm font-semibold hover:border-neutral-900"
        >
          <X size={15} /> Clear all ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="flex gap-8">
      <aside className="hidden w-60 shrink-0 lg:block">
        <div className="sticky top-24 rounded-2xl border border-neutral-100 bg-white p-5 shadow-soft">{filterBody}</div>
      </aside>
      <div className="flex-1">
        {loadError && (
          <div className="mb-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm">
            <TriangleAlert size={18} className="mt-0.5 shrink-0 text-amber-600" />
            <div>
              <p className="font-bold text-amber-900">Live database unavailable — showing demo vendors</p>
              <p className="mt-0.5 text-amber-800">
                {loadError.startsWith("db-error:")
                  ? `Supabase error: ${loadError.replace("db-error: ", "")}. Check the anon key and RLS policy.`
                  : "Supabase returned no rows for this category (RLS policy may block public SELECT) or env vars are missing."}{" "}
                Run the RLS fix in Supabase SQL Editor, then refresh.
              </p>
              {!reconnecting && browserError && (
                <p className="mt-1 text-amber-800">
                  Browser retry also failed: {browserError}. Try incognito (no extensions) or another network.
                </p>
              )}
              <button
                onClick={() => window.location.reload()}
                className="mt-2 flex items-center gap-1.5 rounded-full bg-amber-900 px-3.5 py-1.5 text-[12px] font-bold text-white hover:bg-black"
              >
                <RefreshCw size={13} /> {reconnecting ? "Retrying live data…" : "Retry live data"}
              </button>
            </div>
          </div>
        )}
        {urlState === "slow" && (
          <div className="mb-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-3.5 text-[13px] text-neutral-600">
            Taking longer than expected to read filters from the URL — showing all vendors meanwhile.
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5">
            <Search size={17} className="text-neutral-400" />
            <input
              value={filters.q}
              onChange={(e) => commit({ ...filters, q: e.target.value })}
              placeholder="Search by name or area…"
              className="w-full bg-transparent text-sm outline-none"
            />
            {filters.q && (
              <button onClick={() => commit({ ...filters, q: "" }, true)} aria-label="Clear search">
                <X size={15} className="text-neutral-400" />
              </button>
            )}
          </div>
          <button
            onClick={() => setDrawer(true)}
            className="flex items-center gap-1.5 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold lg:hidden"
          >
            <SlidersHorizontal size={16} /> Filters{activeCount > 0 && ` (${activeCount})`}
          </button>
        </div>
        <p className="mt-3 text-[13px] text-neutral-500">
          Showing <b className="text-neutral-900">{filtered.length}</b> vendor{filtered.length !== 1 && "s"}
          {filters.q && <> for “{filters.q}”</>}
        </p>
        {displayVendors.length === 0 ? (          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-12 text-center">
            <p className="font-bold text-red-900">We couldn&apos;t load any vendors</p>
            <p className="mx-auto mt-1 max-w-md text-sm text-red-700">
              {loadError
                ? `Reason: ${loadError}. Verify the Supabase RLS public-SELECT policy and that the vendors table has rows.`
                : "The vendors table has no rows for this category yet. Add vendors in /admin or seed the database."}
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-1.5 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white"
              >
                <RefreshCw size={15} /> Retry
              </button>
              <a
                href="/admin"
                className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold hover:border-neutral-900"
              >
                Open admin
              </a>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 p-12 text-center">
            <p className="font-bold">No vendors match your filters</p>
            <p className="mt-1 text-sm text-neutral-500">Try clearing a filter or searching a different area.</p>
            <button
              onClick={() => commit(EMPTY, true)}
              className="mx-auto mt-4 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((v) => (
              <VendorCard key={v.slug} vendor={v} />
            ))}
          </div>
        )}
      </div>
      {drawer && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-bold">Filters</p>
              <button onClick={() => setDrawer(false)} aria-label="Close filters">
                <X size={20} />
              </button>
            </div>
            {filterBody}
            <button
              onClick={() => setDrawer(false)}
              className="mt-5 w-full rounded-xl bg-neutral-900 py-3 text-sm font-semibold text-white"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
