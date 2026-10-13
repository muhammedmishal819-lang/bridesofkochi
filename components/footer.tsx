import Link from "next/link";
import { Heart, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-neutral-100 bg-neutral-50/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-rose-600 text-white">
              <Heart size={18} fill="currentColor" />
            </span>
            <span className="font-bold">BridesOfKochi</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500">
            Kochi&apos;s verified directory for wedding photographers & bridal makeup artists. Real prices, real portfolios, direct WhatsApp.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-neutral-600">
            <Link href="/photographers" className="hover:text-neutral-900">Photographers</Link>
            <Link href="/makeup-artists" className="hover:text-neutral-900">Makeup Artists</Link>
            <Link href="/list-your-business" className="hover:text-neutral-900">List Your Business</Link>
            <Link href="/admin" className="hover:text-neutral-900">Admin</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">Company</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-neutral-600">
            <Link href="/contact" className="hover:text-neutral-900">Contact</Link>
            <Link href="/privacy" className="hover:text-neutral-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-900">Terms</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">Contact</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-neutral-600">
            <a href="mailto:hello@bridesofkochi.com" className="flex items-center gap-2 hover:text-neutral-900">
              <Mail size={15} /> hello@bridesofkochi.com
            </a>
            <a href="https://instagram.com/bridesofkochi" className="flex items-center gap-2 hover:text-neutral-900">
              <Instagram size={15} /> @bridesofkochi
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-100 py-5 text-center text-xs text-neutral-400">
        © 2025 BridesOfKochi.com — Made for Kochi weddings.
      </div>
    </footer>
  );
}
