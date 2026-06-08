"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DestinationCard from "@/components/DestinationCard";
import CityHotelsModal from "@/components/CityHotelsModal";
import CountryAutocomplete from "@/components/CountryAutocomplete";
import { countries, countryToDestination, type Destination, type Deal } from "@/lib/data";

export default function DestinationsClient({
  locale,
  destinations,
  deals,
  dict,
}: {
  locale: string;
  destinations: Destination[];
  deals: Deal[];
  dict: {
    searchPlaceholder: string;
    all: string;
    noResults: string;
    dealsLabel: string;
    ctaLabel: string;
    noMatchHint: string;
  };
}) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string>("all");
  const [active, setActive] = useState<Destination | null>(null);
  const [countryNotice, setCountryNotice] = useState<string | null>(null);

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

  function handleCountrySelect(country: string) {
    setCountryNotice(null);
    const slug = countryToDestination[country];
    const destination = slug ? destinations.find((d) => d.slug === slug) : undefined;
    if (destination) {
      setActive(destination);
    } else {
      setCountryNotice(country);
    }
  }

  return (
    <div>
      <div className="mx-auto mt-10 max-w-2xl">
        <CountryAutocomplete
          countries={countries}
          placeholder={dict.searchPlaceholder}
          onQueryChange={(q) => {
            setQuery(q);
            setCountryNotice(null);
          }}
          onSelect={handleCountrySelect}
          emptyHint={dict.noResults}
        />
        <AnimatePresence>
          {countryNotice && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 rounded-xl bg-accent/10 px-4 py-3 text-center text-sm text-accent"
            >
              {countryNotice} — {dict.noMatchHint}
            </motion.p>
          )}
        </AnimatePresence>
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
