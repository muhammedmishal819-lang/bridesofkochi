"use client";
import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  return sent ? (
    <div className="rounded-2xl bg-green-50 p-8 text-center">
      <p className="text-lg font-bold text-green-900">Message sent ✓</p>
      <p className="mt-1 text-sm text-green-700">Thanks — we&apos;ll get back within 24 hours.</p>
    </div>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setSent(true);
        }, 700);
      }}
      className="space-y-4"
    >
      <div>
        <label className="text-sm font-semibold">Name</label>
        <input required placeholder="Your name" className="mt-1.5 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900" />
      </div>
      <div>
        <label className="text-sm font-semibold">Phone</label>
        <input required placeholder="98XXXXXXXX" className="mt-1.5 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900" />
      </div>
      <div>
        <label className="text-sm font-semibold">Message</label>
        <textarea required rows={4} placeholder="How can we help?" className="mt-1.5 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900" />
      </div>
      <button disabled={loading} className="w-full rounded-xl bg-neutral-900 py-3 text-sm font-bold text-white transition hover:bg-black disabled:opacity-60">
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
