import type { Metadata } from "next";
import Link from "next/link";
import { Search, GitCompareArrows, MessageCircle } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import VendorCard from "@/components/vendor-card";
import { HeroSearch, TrustBar, CtaCards } from "@/components/home-blocks";
import { getFeaturedVendors, getVendorCounts } from "@/lib/vendors";

export const metadata: Metadata = {
  title: "Best Wedding Photographers & Makeup Artists in Kochi",
  description: "Verified list of top wedding photographers & bridal makeup artists in Kochi with price, portfolio & direct WhatsApp contact."
};

export default async function Home() {
  const [featured, counts] = await Promise.all([getFeaturedVendors(6), getVendorCounts()]);
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-[12px] font-semibold text-rose-700">
              Kochi · Kerala — Updated for 2025 weddings
            </span>
            <h1 className="font-serif-d mt-4 text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl">
              Find Best Wedding Photographers & Makeup Artists in Kochi
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-500">
              Verified list of {counts.total}+ top vendors with price, portfolio & direct WhatsApp contact. No brokers, no spam — chat directly.
            </p>
          </div>
          <HeroSearch />
          <TrustBar />
          <CtaCards />
          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[13px] font-medium text-neutral-500">
            <span><b className="text-neutral-900">{counts.total}+</b> verified vendors</span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span><b className="text-neutral-900">{counts.areas}</b> Kochi areas</span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span><b className="text-neutral-900">{counts.avgRating.toFixed(1)}★</b> average rating</span>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Featured vendors</h2>
              <p className="mt-1 text-sm text-neutral-500">Hand-picked, verified & highly rated by Kochi brides.</p>
            </div>
            <Link href="/photographers" className="hidden text-sm font-semibold text-rose-600 hover:text-rose-700 sm:block">
              View all →
            </Link>
          </div>
          {featured.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed p-10 text-center text-sm text-neutral-500">No featured vendors yet.</div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((v) => (
                <VendorCard key={v.slug} vendor={v} />
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight">How it works</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Search, step: "1", title: "Search", text: "Filter by area, budget and style across Kakkanad, Fort Kochi, Edappally & more." },
              { icon: GitCompareArrows, step: "2", title: "Compare", text: "Compare starting prices, ratings, portfolios and Instagram work side-by-side." },
              { icon: MessageCircle, step: "3", title: "Chat on WhatsApp", text: "Tap WhatsApp and message the vendor directly. No middlemen, no commission." }
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-soft">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-neutral-900 text-white"><s.icon size={20} /></span>
                <p className="mt-4 text-[12px] font-bold uppercase tracking-wider text-rose-600">Step {s.step}</p>
                <h3 className="mt-1 font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 pt-14 sm:px-6">
          <div className="rounded-2xl border border-neutral-100 bg-neutral-50/70 p-6 sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight">Wedding Photographers in Kochi — what to know before you book</h2>
            <div className="prose-sm mt-4 space-y-4 text-[14px] leading-relaxed text-neutral-600">
              <p>
                Kochi weddings blend Kerala tradition with modern celebration — a morning muhurtham in Tripunithura, a Christian ceremony in Fort Kochi, and a reception in Kakkanad or Edappally. The best wedding photographers in Kochi understand this rhythm: they arrive early for getting-ready candids, stay invisible during rituals, and know exactly when the light turns golden over the backwaters for couple portraits.
              </p>
              <p>
                Pricing in 2025 typically starts at ₹25,000–₹32,000 for a single-day candid + traditional combo, ₹45,000–₹65,000 for two shooters with cinematic teaser, and ₹65,000+ for premium films with drone and same-day reels. Bridal makeup artists in Kochi charge ₹12,000–₹18,000 for HD bridal looks, ₹22,000–₹30,000 for airbrush, with trials available in Kaloor, Kakkanad and Panampilly Nagar studios. Always ask what is included — hairstyle, saree draping, lashes, touch-up kit and travel.
              </p>
              <p>
                On BridesOfKochi every profile is verified with a real portfolio, starting price, area and direct WhatsApp number. Shortlist 3–4 vendors in your budget, compare their candid vs traditional balance, check recent Kerala bridal work on Instagram, and message them directly with your date. Most top photographers and makeup artists in Ernakulam get booked 3–6 months ahead for December–February season — so enquire early.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
