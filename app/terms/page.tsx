import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = { title: "Terms of Service" };

export default function Terms() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl flex-1 px-4 pt-12">
        <h1 className="text-3xl font-bold tracking-tight">Terms</h1>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-600">
          <p>Prices and availability shown are indicative starting prices shared by vendors and may change. Always confirm final quote, date, deliverables and advance directly with the vendor on WhatsApp or call.</p>
          <p>BridesOfKochi is a discovery directory and is not a party to bookings or payments between you and vendors.</p>
          <p>Featured badges mark paid promotional placement; all vendors must still pass our verification check.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
