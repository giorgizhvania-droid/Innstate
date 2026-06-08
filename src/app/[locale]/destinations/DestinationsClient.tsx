"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DestinationCard from "@/components/DestinationCard";
import CityHotelsModal from "@/components/CityHotelsModal";
import { deals, type Destination } from "@/lib/data";

export default function DestinationsClient({
  locale,
  destinations,
  dict,
}: {
  locale: string;
  destinations: Destination[];
  dict: { searchPlaceholder: string; all: string; noResults: string; dealsLabel: string; ctaLabel: string };
}) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string>("all");
  const [active, setActive] = useState<Destination | null>(null);

  const regions = useMemo(() => {
    const set = new Set(destinations.map((d) => d.country));
    return ["all", ...Array.from(set)];
  }, [destinations]);

  const filtered = destinations.filter((d) => {
    const matchesQuery = d.name.toLowerCase().includes(query.toLowerCase()) || d.country.toLowerCase().includes(query.toLowerCase());
    const matchesRegion = region === "all" || d.country === region;
    return matchesQuery && matchesRegion;
  });

  const hotels = active ? deals.filter((d) => d.destinationSlug === active.slug) : [];

  return (
    <div>
      <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-4 sm:flex-row">
        <div className="relative w-full">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.searchPlaceholder}
            className="w-full rounded-full border border-black/10 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      <div className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-2">
        {regions.map((r) => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              region === r ? "bg-accent text-white" : "bg-surface text-foreground/70 hover:bg-accent/10"
            }`}
          >
            {r === "all" ? dict.all : r}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div layout className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d) => (
              <motion.div
                key={d.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <DestinationCard destination={d} dealsLabel={dict.dealsLabel} onClick={() => setActive(d)} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center text-foreground/50"
          >
            {dict.noResults}
          </motion.p>
        )}
      </AnimatePresence>

      <CityHotelsModal destination={active} hotels={hotels} locale={locale} ctaLabel={dict.ctaLabel} onClose={() => setActive(null)} />
    </div>
  );
}
