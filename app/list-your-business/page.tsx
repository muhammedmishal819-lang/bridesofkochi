import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BusinessForm from "@/components/business-form";

export const metadata: Metadata = {
  title: "List Your Business — Get Featured on BridesOfKochi",
  description: "Are you a wedding photographer or makeup artist in Kochi? Submit your business and get listed in front of brides. Featured slots available."
};

export default function ListBusinessPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl flex-1 px-4 pt-12 sm:px-6">
        <span className="rounded-full bg-rose-50 px-3 py-1 text-[12px] font-semibold text-rose-700">For vendors · Free basic listing</span>
        <h1 className="font-serif-d mt-3 text-3xl font-bold tracking-tight sm:text-4xl">List your business</h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500">
          Wedding photographer or bridal makeup artist in Kochi? Submit your details below. We verify every profile manually and list you within 24 hours. Want more bookings? Ask about <b>Featured</b> placement at the top of your category.
        </p>
        <div className="mt-6 rounded-2xl border border-neutral-100 bg-white p-6 shadow-soft sm:p-8">
          <BusinessForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
