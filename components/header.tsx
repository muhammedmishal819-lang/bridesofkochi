"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/photographers", label: "Photographers" },
  { href: "/makeup-artists", label: "Makeup Artists" },
  { href: "/contact", label: "Contact" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-rose-600 text-white">
            <Heart size={18} fill="currentColor" />
          </span>
          <span className="text-[17px] font-bold tracking-tight">
            Brides<span className="text-rose-600">Of</span>Kochi
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-[14px] font-medium text-neutral-600 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn("hover:text-neutral-900", path === l.href && "text-neutral-900")}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/list-your-business"
            className="rounded-full bg-rose-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-rose-700"
          >
            List Your Business
          </Link>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-neutral-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-[15px] font-medium">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link
              href="/list-your-business"
              onClick={() => setOpen(false)}
              className="rounded-full bg-rose-600 px-4 py-2.5 text-center font-semibold text-white"
            >
              List Your Business
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
