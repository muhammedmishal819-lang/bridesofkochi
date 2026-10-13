"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { DUMMY_VENDORS, type Vendor } from "@/lib/vendors";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { formatINR } from "@/lib/utils";
import { Star, Trash2, Pencil, Plus, Lock } from "lucide-react";

const AREAS = ["Kakkanad", "Fort Kochi", "Edappally", "Kaloor", "Tripunithura", "Panampilly Nagar"];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [vendors, setVendors] = useState<Vendor[]>(DUMMY_VENDORS);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [editing, setEditing] = useState<Vendor | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("bok_admin") === "1") setAuthed(true);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.from("vendors").select("*").order("created_at", { ascending: false });
      if (data && data.length) setVendors(data as Vendor[]);
    }
  }

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (pw === "admin123") {
      setAuthed(true);
      sessionStorage.setItem("bok_admin", "1");
    } else setMsg("Wrong password. Hint: admin123");
  }

  async function toggleFeatured(v: Vendor) {
    const next = !v.is_featured;
    setVendors((p) => p.map((x) => (x.id === v.id ? { ...x, is_featured: next } : x)));
    if (isSupabaseConfigured && supabase) {
      await supabase.from("vendors").update({ is_featured: next }).eq("id", v.id);
    }
    setMsg(`${v.name} is now ${next ? "FEATURED ★" : "not featured"}.`);
  }

  async function remove(id: string) {
    if (!confirm("Delete this vendor?")) return;
    setVendors((p) => p.filter((x) => x.id !== id));
    if (isSupabaseConfigured && supabase) await supabase.from("vendors").delete().eq("id", id);
  }

  async function saveForm(e: React.FormEvent<HTMLFormElement>, existing?: Vendor) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    let payload = {
      name: String(fd.get("name")),
      slug: String(fd.get("slug") || "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: String(fd.get("category")),
      area: String(fd.get("area")),
      starting_price: Number(fd.get("starting_price")),
      price_range: String(fd.get("price_range")),
      style: String(fd.get("style")),
      bio: String(fd.get("bio")),
      profile_image: String(fd.get("profile_image")),
      instagram_url: String(fd.get("instagram")),
      whatsapp_number: String(fd.get("phone")),
      rating: Number(fd.get("rating") || 4.8),
      review_count: Number(fd.get("review_count") || 0),
      is_featured: fd.get("is_featured") === "on",
      is_verified: true,
      gallery_images: [] as string[]
    };
    try {
      if (isSupabaseConfigured && supabase) {
        if (existing) {
          const { error } = await supabase.from("vendors").update(payload).eq("id", existing.id);
          if (error) throw error;
        } else {
          const { data, error } = await supabase.from("vendors").insert(payload).select();
          if (error) throw error;
          if (data) payload = { ...payload } as typeof payload;
        }
        await load();
      } else {
        if (existing) setVendors((p) => p.map((x) => (x.id === existing.id ? { ...x, ...payload, id: existing.id } as Vendor : x)));
        else setVendors((p) => [{ ...payload, id: `local-${Date.now()}`, gallery_images: [] } as Vendor, ...p]);
      }
      setEditing(null);
      setShowAdd(false);
      setMsg("Saved ✓ (Supabase not configured? Change is local-only demo mode.)");
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  if (!authed)
    return (
      <>
        <Header />
        <main className="mx-auto max-w-sm flex-1 px-4 pt-20">
          <div className="rounded-2xl border border-neutral-100 bg-white p-8 shadow-soft text-center">
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-neutral-900 text-white"><Lock size={20} /></span>
            <h1 className="mt-4 font-bold text-lg">Admin login</h1>
            <p className="text-sm text-neutral-500">Demo password: admin123</p>
            <form onSubmit={login} className="mt-4 space-y-3">
              <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none" />
              <button className="w-full rounded-xl bg-neutral-900 py-3 text-sm font-bold text-white">Unlock</button>
            </form>
            {msg && <p className="mt-3 text-sm text-red-600">{msg}</p>}
          </div>
        </main>
        <Footer />
      </>
    );

  const formFields = (v?: Vendor) => (
    <div className="grid gap-3 sm:grid-cols-2">
      <input name="name" required defaultValue={v?.name} placeholder="Name" className="rounded-xl border px-3 py-2.5 text-sm" />
      <input name="slug" required defaultValue={v?.slug} placeholder="slug-like-this" className="rounded-xl border px-3 py-2.5 text-sm" />
      <select name="category" defaultValue={v?.category || "photographer"} className="rounded-xl border px-3 py-2.5 text-sm">
        <option value="photographer">photographer</option>
        <option value="makeup_artist">makeup_artist</option>
      </select>
      <select name="area" defaultValue={v?.area || AREAS[0]} className="rounded-xl border px-3 py-2.5 text-sm">
        {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
      </select>
      <input name="starting_price" type="number" required defaultValue={v?.starting_price || 25000} placeholder="Starting price" className="rounded-xl border px-3 py-2.5 text-sm" />
      <select name="price_range" defaultValue={v?.price_range || "25k-50k"} className="rounded-xl border px-3 py-2.5 text-sm">
        <option>Under 25k</option><option>25k-50k</option><option>50k+</option>
      </select>
      <input name="style" defaultValue={v?.style} placeholder="Style e.g. Candid, Traditional" className="rounded-xl border px-3 py-2.5 text-sm" />
      <input name="phone" required defaultValue={v?.whatsapp_number} placeholder="WhatsApp number" className="rounded-xl border px-3 py-2.5 text-sm" />
      <input name="profile_image" defaultValue={v?.profile_image} placeholder="Profile image URL" className="rounded-xl border px-3 py-2.5 text-sm sm:col-span-2" />
      <input name="instagram" defaultValue={v?.instagram_url} placeholder="Instagram URL" className="rounded-xl border px-3 py-2.5 text-sm sm:col-span-2" />
      <textarea name="bio" defaultValue={v?.bio} placeholder="Bio (2 lines)" rows={2} className="rounded-xl border px-3 py-2.5 text-sm sm:col-span-2" />
      <input name="rating" type="number" step="0.1" min="1" max="5" defaultValue={v?.rating || 4.8} className="rounded-xl border px-3 py-2.5 text-sm" />
      <input name="review_count" type="number" defaultValue={v?.review_count || 0} className="rounded-xl border px-3 py-2.5 text-sm" />
      <label className="flex items-center gap-2 text-sm font-medium sm:col-span-2">
        <input name="is_featured" type="checkbox" defaultChecked={v?.is_featured} className="h-4 w-4 accent-rose-600" /> Featured (paid slot)
      </label>
    </div>
  );

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl flex-1 px-4 pt-10 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin — Vendors ({vendors.length})</h1>
            <p className="text-sm text-neutral-500">{isSupabaseConfigured ? "Connected to Supabase ✓" : "Demo mode — Supabase env missing, changes are local only."}</p>
          </div>
          <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-rose-700">
            <Plus size={16} /> Add vendor
          </button>
        </div>
        {msg && <p className="mt-4 rounded-xl bg-neutral-100 p-3 text-sm">{msg}</p>}
        {showAdd && (
          <form onSubmit={(e) => saveForm(e)} className="mt-5 rounded-2xl border bg-white p-5 shadow-soft">
            <p className="mb-3 font-bold">Add new vendor</p>
            {formFields()}
            <button disabled={loading} className="mt-4 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white">{loading ? "Saving…" : "Save vendor"}</button>
          </form>
        )}
        <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-100 bg-white shadow-soft">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b bg-neutral-50 text-[12px] uppercase tracking-wide text-neutral-500">
                <th className="p-3.5">Vendor</th><th className="p-3.5">Category</th><th className="p-3.5">Price</th><th className="p-3.5">Rating</th><th className="p-3.5">Featured</th><th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => (
                <tr key={v.id} className="border-b last:border-0 hover:bg-neutral-50/60">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                        {v.profile_image && <Image src={v.profile_image} alt={v.name} fill className="object-cover" sizes="40px" />}
                      </span>
                      <span><b>{v.name}</b><br /><span className="text-xs text-neutral-500">{v.area} · {v.slug}</span></span>
                    </div>
                    {editing?.id === v.id && (
                      <form onSubmit={(e) => saveForm(e, v)} className="mt-3 rounded-2xl bg-neutral-50 p-4">
                        {formFields(v)}
                        <div className="mt-3 flex gap-2">
                          <button disabled={loading} className="rounded-xl bg-neutral-900 px-4 py-2 text-[13px] font-bold text-white">Save</button>
                          <button type="button" onClick={() => setEditing(null)} className="rounded-xl border px-4 py-2 text-[13px] font-semibold">Cancel</button>
                        </div>
                      </form>
                    )}
                  </td>
                  <td className="p-3.5 text-neutral-600">{v.category}</td>
                  <td className="p-3.5 font-semibold">{formatINR(v.starting_price)}</td>
                  <td className="p-3.5"><span className="flex items-center gap-1"><Star size={13} fill="currentColor" className="text-amber-500" />{Number(v.rating).toFixed(1)} ({v.review_count})</span></td>
                  <td className="p-3.5">
                    <button
                      onClick={() => toggleFeatured(v)}
                      className={`relative h-6 w-11 rounded-full transition ${v.is_featured ? "bg-rose-600" : "bg-neutral-200"}`}
                      title="Toggle featured"
                    >
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${v.is_featured ? "left-[22px]" : "left-0.5"}`} />
                    </button>
                  </td>
                  <td className="p-3.5">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditing(editing?.id === v.id ? null : v)} className="rounded-lg border p-2 hover:border-neutral-900"><Pencil size={15} /></button>
                      <button onClick={() => remove(v.id)} className="rounded-lg border p-2 text-red-600 hover:border-red-600"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {vendors.length === 0 && <div className="mt-6 rounded-2xl border border-dashed p-10 text-center text-sm text-neutral-500">No vendors found.</div>}
      </main>
      <Footer />
    </>
  );
}
