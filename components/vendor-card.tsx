"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck, MapPin, Star, MessageCircle } from "lucide-react";
import type { Vendor } from "@/lib/vendors";
import { formatINR, whatsappLink } from "@/lib/utils";

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      className="group overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
        <Image
          src={vendor.profile_image}
          alt={vendor.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {vendor.is_verified && (
            <span className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-neutral-800 shadow-sm">
              <BadgeCheck size={13} className="text-sky-600" /> Verified
            </span>
          )}
          {vendor.is_featured && (
            <span className="rounded-full bg-rose-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
              Featured
            </span>
          )}
        </div>
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[12px] font-semibold text-white">
          <Star size={12} fill="currentColor" /> {vendor.rating.toFixed(1)} ({vendor.review_count})
        </span>
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-[16px] font-bold tracking-tight">{vendor.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-[13px] text-neutral-500">
          <MapPin size={13} /> {vendor.area}, Kochi · {vendor.style}
        </p>
        <p className="mt-2 text-[14px] font-semibold">
          Starts at <span className="text-neutral-900">{formatINR(vendor.starting_price)}</span>
          <span className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600">{vendor.price_range}</span>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href={`/vendor/${vendor.slug}`}
            className="rounded-xl border border-neutral-200 px-3 py-2 text-center text-[13px] font-semibold transition hover:border-neutral-900"
          >
            View Profile
          </Link>
          <a
            href={whatsappLink(vendor.name, vendor.whatsapp_number)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-[13px] font-semibold text-white transition hover:bg-green-700"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>
      </div>
    </motion.article>
  );
}
