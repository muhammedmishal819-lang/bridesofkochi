import { VendorGridSkeleton } from "@/components/listing-client";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
      <div className="h-9 w-2/3 animate-pulse rounded-lg bg-neutral-100" />
      <div className="mt-3 h-4 w-full animate-pulse rounded bg-neutral-100" />
      <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-neutral-100" />
      <VendorGridSkeleton count={6} />
    </div>
  );
}
