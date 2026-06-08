"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import DealCard from "@/components/DealCard";
import type { Deal, Destination } from "@/lib/data";

export default function DealsClient({
  locale,
  deals,
  destinations,
  ctaLabel,
  noResults,
  allLabel,
}: {
  locale: string;
  deals: Deal[];
  destinations: Destination[];
  ctaLabel: string;
  noResults: string;
  allLabel: string;
}) {
  const params = useSearchParams();
  const [active, setActive] = useState<string>(params.get("destination") ?? "all");

  const filtered = active === "all" ? deals : deals.filter((d) => d.destinationSlug === active);

  return (
    <div>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setActive("all")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            active === "all" ? "bg-accent text-white" : "bg-surface text-foreground/70 hover:bg-accent/10"
          }`}
        >
          {allLabel}
        </button>
        {destinations.map((d) => (
          <button
            key={d.slug}
            onClick={() => setActive(d.slug)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === d.slug ? "bg-accent text-white" : "bg-surface text-foreground/70 hover:bg-accent/10"
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div layout className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((deal) => (
              <motion.div
                key={deal.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <DealCard deal={deal} locale={locale} ctaLabel={ctaLabel} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-16 text-center text-foreground/50">
            {noResults}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
