"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Camera, Sparkles, BadgeCheck, MessageCircle, Star } from "lucide-react";
import { motion } from "framer-motion";
import { AREAS } from "@/lib/vendors";

export function HeroSearch() {
  const [q, setQ] = useState("");
  const [area, setArea] = useState("");
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const p = new URLSearchParams();
        if (q) p.set("q", q);
        if (area) p.set("areas", area);
        router.push(`/photographers?${p.toString()}`);
      }}
      className="mx-auto mt-7 flex max-w-2xl flex-col gap-2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-soft sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 items-center gap-2 px-3 py-2">
        <Search size={18} className="text-neutral-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name — e.g. Candid Karma"
          className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
        />
      </div>
      <div className="hidden h-6 w-px bg-neutral-200 sm:block" />
      <div className="flex items-center gap-2 px-3 py-2 sm:w-48">
        <MapPin size={18} className="text-neutral-400" />
        <select value={area} onChange={(e) => setArea(e.target.value)} className="w-full bg-transparent text-sm outline-none">
          <option value="">All Kochi</option>
          {AREAS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>
      <button className="rounded-xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black">
        Search
      </button>
    </form>
  );
}

export function TrustBar() {
  const items = [
    { icon: BadgeCheck, text: "Verified Profiles" },
    { icon: MessageCircle, text: "Direct WhatsApp" },
    { icon: Star, text: "Updated 2025 Prices" }
  ];
  return (
    <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2 text-[13px] font-medium text-neutral-600">
      {items.map((i) => (
        <span key={i.text} className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5">
          <i.icon size={14} className="text-green-600" /> {i.text}
        </span>
      ))}
    </div>
  );
}

export function CtaCards() {
  return (
    <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
      {[
        { href: "/photographers", icon: Camera, title: "Find Photographers", sub: "Candid · Traditional · Cinematic", price: "From ₹28,000" },
        { href: "/makeup-artists", icon: Sparkles, title: "Find Makeup Artists", sub: "HD · Airbrush · Natural", price: "From ₹12,000" }
      ].map((c, idx) => (
        <motion.a
          key={c.href}
          href={c.href}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.08 }}
          className="group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-rose-50 text-rose-600">
            <c.icon size={22} />
          </span>
          <span>
            <span className="block font-bold">{c.title} →</span>
            <span className="block text-[13px] text-neutral-500">{c.sub}</span>
            <span className="mt-1 inline-block rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold">{c.price}</span>
          </span>
        </motion.a>
      ))}
    </div>
  );
}
