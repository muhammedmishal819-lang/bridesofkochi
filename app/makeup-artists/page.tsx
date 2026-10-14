import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ListingClient from "@/components/listing-client";
import { getVendorsByCategorySafe } from "@/lib/vendors";

// Always fetch fresh at request time: a static build-time snapshot would go
// stale (and could ship an empty list if Supabase hiccuped during deploy).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Best Bridal Makeup Artists in Kochi [2025] - HD & Airbrush with Price",
  description: "Top verified bridal makeup artists in Kochi for HD, airbrush & natural Kerala looks. Compare prices from ₹12,000, see portfolios & chat on WhatsApp directly."
};

export default async function MakeupPage() {
  let vendors: Awaited<ReturnType<typeof getVendorsByCategorySafe>>["vendors"] = [];
  let loadError: string | null = null;
  try {
    const res = await getVendorsByCategorySafe("makeup_artist");
    vendors = res.vendors;
    loadError = res.error;
  } catch (e) {
    loadError = e instanceof Error ? `db-error: ${e.message}` : "db-error: unknown";
  }
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl flex-1 px-4 pt-10 sm:px-6">
        <h1 className="font-serif-d text-3xl font-bold tracking-tight sm:text-4xl">Best Bridal Makeup Artists in Kochi [2025]</h1>
        <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-neutral-500">
          From soft HD glow for morning muhurthams to sweat-proof airbrush for evening receptions — these are Kochi&apos;s most-booked bridal makeup artists across Panampilly Nagar, Kakkanad, Kaloor and Fort Kochi. HD bridal packages start around ₹12,000–₹18,000 and airbrush around ₹22,000–₹30,000, usually including hairstyle, saree draping and lashes. Tap WhatsApp on any profile to ask about trial availability and your wedding date.
        </p>
        <div className="mt-8">
          <ListingClient
            vendors={vendors}
            styles={["HD", "Airbrush", "Natural"]}
            basePath="/makeup-artists"
            category="makeup_artist"
            loadError={loadError}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
