import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ListingClient from "@/components/listing-client";
import { getVendorsByCategory } from "@/lib/vendors";

export const metadata: Metadata = {
  title: "Best Wedding Photographers in Kochi [2025] - Top 30 with Price & WhatsApp",
  description: "Compare verified wedding photographers in Kochi: candid, traditional & cinematic. Real starting prices, portfolios, ratings & direct WhatsApp numbers in Kakkanad, Fort Kochi, Edappally & more."
};

export default async function PhotographersPage() {
  const vendors = await getVendorsByCategory("photographer");
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl flex-1 px-4 pt-10 sm:px-6">
        <h1 className="font-serif-d text-3xl font-bold tracking-tight sm:text-4xl">Best Wedding Photographers in Kochi [2025]</h1>
        <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-neutral-500">
          Planning a Kochi wedding? Compare the top 30 verified wedding photographers in Ernakulam — candid storytellers in Kaloor, cinematic filmmakers in Fort Kochi, and budget-friendly traditional + candid teams in Edappally and Tripunithura. Every profile shows starting price, style, rating and a direct WhatsApp button so you can check your date in one tap. Prices updated for the 2025 season: expect ₹28k+ for single-day coverage and ₹55k+ for premium two-shooter cinematic packages.
        </p>
        <div className="mt-8">
          <Suspense fallback={<div className="rounded-2xl border p-10 text-center text-sm text-neutral-500">Loading vendors…</div>}>
            <ListingClient vendors={vendors} styles={["Candid", "Traditional", "Cinematic"]} basePath="/photographers" />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
