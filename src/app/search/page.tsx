import type { Metadata } from "next";
import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

export const metadata: Metadata = {
  title: "Search | Article 19",
  description: "Search movies, series, and content on Article 19 streaming platform.",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-[var(--nav-height)] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SearchPageClient />
    </Suspense>
  );
}
