"use client";
import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, Search, X } from "lucide-react";
import type { Vendor } from "@/lib/vendors";
import { AREAS } from "@/lib/vendors";
import { filterVendors } from "@/lib/vendors";
import VendorCard from "@/components/vendor-card";
import { cn } from "@/lib/utils";

const BUDGETS = ["Under 25k", "25k-50k", "50k+"];

export default function ListingClient({
  vendors,
  styles,
  basePath
}: {
  vendors: Vendor[];
  styles: string[];
  basePath: string;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const [drawer, setDrawer] = useState(false);

  const q = params.get("q") || "";
  const areas = params.get("areas") ? params.get("areas")!.split(",") : [];
  const budgets = params.get("budget") ? params.get("budget")!.split(",") : [];
  const styleSel = params.get("style") ? params.get("style")!.split(",") : [];
  const minRating = Number(params.get("rating") || 0);
  const featuredOnly = params.get("featured") === "1";

  function set(key: string, value: string) {
    const p = new URLSearchParams(params.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    router.replace(`${basePath}?${p.toString()}`, { scroll: false });
  }

  function toggleList(key: string, val: string, current: string[]) {
    const next = current.includes(val) ? current.filter((x) => x !== val) : [...current, val];
    set(key, next.join(","));
  }

  const filtered = useMemo(
    () => filterVendors(vendors, { q, areas, budgets, styles: styleSel, minRating, featuredOnly }),
    [vendors, q, areas, budgets, styleSel, minRating, featuredOnly, params]
  );

  const activeCount = areas.length + budgets.length + styleSel.length + (minRating ? 1 : 0) + (featuredOnly ? 1 : 0);

  const filterBody = (
    <div className="space-y-6">
      <div>
        <p className="text-[13px] font-bold uppercase tracking-wide text-neutral-500">Area</p>
        <div className="mt-2.5 space-y-2">
          {AREAS.map((a) => (
            <label key={a} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={areas.includes(a)}
                onChange={() => toggleList("areas", a, areas)}
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
                checked={budgets.includes(b)}
                onChange={() => toggleList("budget", b, budgets)}
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
              onClick={() => toggleList("style", s, styleSel)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[13px] font-medium transition",
                styleSel.includes(s) ? "border-rose-600 bg-rose-50 text-rose-700" : "border-neutral-200 hover:border-neutral-400"
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
              onClick={() => set("rating", r ? String(r) : "")}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[13px] font-medium",
                (minRating || 0) === r ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200"
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
          checked={featuredOnly}
          onChange={() => set("featured", featuredOnly ? "" : "1")}
          className="h-4 w-4 accent-rose-600"
        />
      </label>
      {activeCount > 0 && (
        <button
          onClick={() => router.replace(basePath, { scroll: false })}
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
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5">
            <Search size={17} className="text-neutral-400" />
            <input
              defaultValue={q}
              key={q}
              onChange={(e) => set("q", e.target.value)}
              placeholder="Search by name or area…"
              className="w-full bg-transparent text-sm outline-none"
            />
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
          {q && <> for “{q}”</>}
        </p>
        {filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 p-12 text-center">
            <p className="font-bold">No vendors match your filters</p>
            <p className="mt-1 text-sm text-neutral-500">Try clearing a filter or searching a different area.</p>
            <button
              onClick={() => router.replace(basePath)}
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
              <button onClick={() => setDrawer(false)}><X size={20} /></button>
            </div>
            {filterBody}
            <button onClick={() => setDrawer(false)} className="mt-5 w-full rounded-xl bg-neutral-900 py-3 text-sm font-semibold text-white">
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
