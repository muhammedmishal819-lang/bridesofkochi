import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl flex-1 px-4 pt-12">
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-600">
          <p>BridesOfKochi.com is a directory. We display vendor business details (name, area, price, public portfolio links and business WhatsApp numbers) provided by vendors or publicly shared on Instagram.</p>
          <p>Contact form messages are used only to respond to your enquiry. We do not sell personal data. WhatsApp chats happen directly between you and the vendor.</p>
          <p>For removal or correction of a listing email hello@bridesofkochi.com.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
