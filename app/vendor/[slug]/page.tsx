import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin, Star, MessageCircle, Phone, Instagram, ArrowLeft } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import VendorCard from "@/components/vendor-card";
import { getVendorBySlug, getRelatedVendors, getAllVendors } from "@/lib/vendors";
import { formatINR, whatsappLink } from "@/lib/utils";

export async function generateStaticParams() {
  const all = await getAllVendors();
  return all.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const v = await getVendorBySlug(params.slug);
  if (!v) return { title: "Vendor not found" };
  const cat = v.category === "photographer" ? "Wedding Photographer" : "Bridal Makeup Artist";
  return {
    title: `${v.name} — ${cat} in ${v.area}, Kochi | Price ${formatINR(v.starting_price)}`,
    description: `${v.name} is a verified ${cat.toLowerCase()} in ${v.area}, Kochi. ${v.style}. Starts at ${formatINR(v.starting_price)}. Rated ${v.rating} (${v.review_count} reviews). Chat on WhatsApp.`
  };
}

export default async function VendorPage({ params }: { params: { slug: string } }) {
  const vendor = await getVendorBySlug(params.slug);
  if (!vendor) notFound();
  const related = await getRelatedVendors(vendor, 3);
  const cat = vendor.category === "photographer" ? "Wedding Photographer" : "Bridal Makeup Artist";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: vendor.name,
    description: vendor.bio,
    areaServed: `${vendor.area}, Kochi, Kerala`,
    priceRange: formatINR(vendor.starting_price),
    aggregateRating: { "@type": "AggregateRating", ratingValue: vendor.rating, reviewCount: vendor.review_count },
    image: vendor.profile_image,
    sameAs: [vendor.instagram_url].filter(Boolean)
  };

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl flex-1 px-4 pt-6 sm:px-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Link href={vendor.category === "photographer" ? "/photographers" : "/makeup-artists"} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-neutral-500 hover:text-neutral-900">
          <ArrowLeft size={15} /> Back to {vendor.category === "photographer" ? "photographers" : "makeup artists"}
        </Link>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 sm:col-span-2 sm:aspect-[16/8]">
                <Image src={vendor.profile_image} alt={vendor.name} fill className="object-cover" priority sizes="100vw" />
              </div>
              {vendor.gallery_images.slice(0, 3).map((g, i) => (
                <div key={i} className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100">
                  <Image src={g} alt={`${vendor.name} work ${i + 1}`} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-neutral-100 bg-white p-6 shadow-soft sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                {vendor.is_verified && (
                  <span className="flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-[12px] font-semibold text-sky-700">
                    <BadgeCheck size={14} /> Verified
                  </span>
                )}
                {vendor.is_featured && (
                  <span className="rounded-full bg-rose-600 px-2.5 py-1 text-[12px] font-semibold text-white">Featured</span>
                )}
                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[12px] font-medium text-neutral-600">{cat}</span>
              </div>
              <h1 className="font-serif-d mt-3 text-3xl font-bold tracking-tight">{vendor.name}</h1>
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500">
                <span className="flex items-center gap-1"><MapPin size={14} /> {vendor.area}, Kochi</span>
                <span className="flex items-center gap-1 font-semibold text-neutral-800"><Star size={14} fill="currentColor" className="text-amber-500" /> {vendor.rating.toFixed(1)} ({vendor.review_count} reviews)</span>
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">{vendor.bio}</p>
              <div className="mt-5 grid gap-3 rounded-2xl bg-neutral-50 p-5 text-sm sm:grid-cols-3">
                <div><p className="text-[12px] font-semibold uppercase tracking-wide text-neutral-400">Starts at</p><p className="mt-0.5 text-lg font-bold">{formatINR(vendor.starting_price)}</p></div>
                <div><p className="text-[12px] font-semibold uppercase tracking-wide text-neutral-400">Style</p><p className="mt-0.5 font-semibold">{vendor.style}</p></div>
                <div><p className="text-[12px] font-semibold uppercase tracking-wide text-neutral-400">Budget</p><p className="mt-0.5 font-semibold">{vendor.price_range}</p></div>
              </div>
              {vendor.instagram_url && (
                <a href={vendor.instagram_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold hover:border-neutral-900">
                  <Instagram size={16} /> View Instagram portfolio
                </a>
              )}
            </div>
          </div>
          <aside>
            <div className="lg:sticky lg:top-24 rounded-2xl border border-neutral-100 bg-white p-6 shadow-soft">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-neutral-400">Starting price</p>
              <p className="mt-1 text-3xl font-bold">{formatINR(vendor.starting_price)}</p>
              <p className="mt-1 text-[13px] text-neutral-500">Final quote depends on date, hours & deliverables.</p>
              <a
                href={whatsappLink(vendor.name, vendor.whatsapp_number)}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-green-600 py-3.5 font-bold text-white transition hover:bg-green-700"
              >
                <MessageCircle size={19} /> Contact on WhatsApp
              </a>
              <a
                href={`tel:+91${vendor.whatsapp_number.replace(/\D/g, "").replace(/^91/, "")}`}
                className="mt-2.5 flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 py-3 font-bold transition hover:border-neutral-900"
              >
                <Phone size={17} /> Call Now
              </a>
              {vendor.instagram_url && (
                <a href={vendor.instagram_url} target="_blank" rel="noreferrer" className="mt-2.5 flex items-center justify-center gap-2 rounded-2xl bg-neutral-100 py-3 text-sm font-semibold hover:bg-neutral-200">
                  <Instagram size={16} /> Instagram
                </a>
              )}
              <p className="mt-4 rounded-xl bg-green-50 p-3 text-[12px] leading-relaxed text-green-800">
                Mention <b>BridesOfKochi.com</b> when you message — vendors prioritise directory brides and share date availability faster.
              </p>
            </div>
          </aside>
        </div>
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold tracking-tight">Similar {vendor.category === "photographer" ? "photographers" : "makeup artists"} in Kochi</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <VendorCard key={r.slug} vendor={r} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
