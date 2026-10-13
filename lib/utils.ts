import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export function whatsappLink(vendorName: string, number: string) {
  const clean = (number || "").replace(/\D/g, "").replace(/^91/, "");
  const text = `Hi ${vendorName}, I found you on BridesOfKochi.com. I would like to check availability and pricing for my wedding date.`;
  return `https://wa.me/91${clean}?text=${encodeURIComponent(text)}`;
}
