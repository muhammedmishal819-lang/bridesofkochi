"use client";
import { useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function BusinessForm() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const category = String(fd.get("category") || "photographer");
    const phone = String(fd.get("phone") || "").trim();
    const instagram = String(fd.get("instagram") || "").trim();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now().toString().slice(-4);

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from("vendors").insert({
          name,
          slug,
          category,
          area: "Kakkanad",
          starting_price: category === "photographer" ? 30000 : 15000,
          price_range: category === "photographer" ? "25k-50k" : "Under 25k",
          style: category === "photographer" ? "Candid" : "HD",
          bio: "New vendor — profile under verification.",
          profile_image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
          gallery_images: [],
          instagram_url: instagram,
          whatsapp_number: phone,
          rating: 5.0,
          review_count: 0,
          is_featured: false,
          is_verified: false
        });
        if (error) throw error;
      }
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  }

  if (done)
    return (
      <div className="rounded-2xl bg-green-50 p-8 text-center">
        <p className="text-lg font-bold text-green-900">Received ✓</p>
        <p className="mt-1 text-sm text-green-700">We will verify and list you in 24 hours. We&apos;ll WhatsApp you for portfolio photos.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-semibold">Business name</label>
        <input name="name" required placeholder="e.g. Lens & Light Kochi" className="mt-1.5 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold">Category</label>
          <select name="category" className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none">
            <option value="photographer">Photographer</option>
            <option value="makeup_artist">Makeup Artist</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold">WhatsApp number</label>
          <input name="phone" required placeholder="98XXXXXXXX" className="mt-1.5 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900" />
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold">Instagram link</label>
        <input name="instagram" placeholder="https://instagram.com/…" className="mt-1.5 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900" />
      </div>
      {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <button disabled={loading} className="w-full rounded-xl bg-rose-600 py-3 text-sm font-bold text-white transition hover:bg-rose-700 disabled:opacity-60">
        {loading ? "Submitting…" : "Submit for Verification"}
      </button>
      <p className="text-center text-[12px] text-neutral-400">Free basic listing · Featured slots are paid — we&apos;ll share details on WhatsApp.</p>
    </form>
  );
}
