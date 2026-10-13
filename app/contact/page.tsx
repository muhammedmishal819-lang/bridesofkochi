import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact Us", description: "Contact BridesOfKochi — help finding a vendor, corrections or advertising." };

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl flex-1 px-4 pt-12 sm:px-6">
        <h1 className="font-serif-d text-3xl font-bold tracking-tight sm:text-4xl">Contact us</h1>
        <p className="mt-2 text-sm text-neutral-500">Brides, parents or vendors — we reply within a day on hello@bridesofkochi.com too.</p>
        <div className="mt-6 rounded-2xl border border-neutral-100 bg-white p-6 shadow-soft sm:p-8">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
