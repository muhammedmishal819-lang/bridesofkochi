import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ListingClient from "@/components/listing-client";
import { getVendorsByCategory } from "@/lib/vendors";

export const metadata: Metadata = {
  title: "Best Bridal Makeup Artists in Kochi [2025] - HD & Airbrush with Price",
  description: "Top verified bridal makeup artists in Kochi for HD, airbrush & natural Kerala looks. Compare prices from ₹12,000, see portfolios & chat on WhatsApp directly."
};

export default async function MakeupPage() {
  const vendors = await getVendorsByCategory("makeup_artist");
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl flex-1 px-4 pt-10 sm:px-6">
        <h1 className="font-serif-d text-3xl font-bold tracking-tight sm:text-4xl">Best Bridal Makeup Artists in Kochi [2025]</h1>
        <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-neutral-500">
          From soft HD glow for morning muhurthams to sweat-proof airbrush for evening receptions — these are Kochi&apos;s most-booked bridal makeup artists across Panampilly Nagar, Kakkanad, Kaloor and Fort Kochi. HD bridal packages start around ₹12,000–₹18,000 and airbrush around ₹22,000–₹30,000, usually including hairstyle, saree draping and lashes. Tap WhatsApp on any profile to ask about trial availability and your wedding date.
        </p>
        <div className="mt-8">
          <Suspense fallback={<div className="rounded-2xl border p-10 text-center text-sm text-neutral-500">Loading vendors…</div>}>
            <ListingClient vendors={vendors} styles={["HD", "Airbrush", "Natural"]} basePath="/makeup-artists" />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
