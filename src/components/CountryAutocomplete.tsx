"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CountryAutocomplete({
  countries,
  placeholder,
  onQueryChange,
  onSelect,
  emptyHint,
}: {
  countries: string[];
  placeholder: string;
  onQueryChange: (query: string) => void;
  onSelect: (country: string) => void;
  emptyHint: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const matches = query.trim()
    ? countries.filter((c) => c.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 8)
    : [];

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function choose(country: string) {
    setQuery(country);
    setOpen(false);
    onSelect(country);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || matches.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % matches.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + matches.length) % matches.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(matches[highlight]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="relative w-full" ref={ref}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setHighlight(0);
          onQueryChange(e.target.value);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list" aria-controls="country-listbox"
        className="w-full rounded-full border border-black/10 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
      />

      <AnimatePresence>
        {open && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            id="country-listbox" role="listbox" className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-black/5 bg-white py-1.5 shadow-lg"
          >
            {matches.length > 0 ? (
              matches.map((country, i) => (
                <button
                  key={country}
                  type="button"
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => choose(country)}
                  className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${
                    i === highlight ? "bg-accent/10 text-accent" : "text-foreground/80"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  {country}
                </button>
              ))
            ) : (
              <p className="px-4 py-3 text-sm text-foreground/50">{emptyHint}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
