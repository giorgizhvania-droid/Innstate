"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import type { Deal, Destination } from "@/lib/data";

export default function CityHotelsModal({
  destination,
  hotels,
  locale,
  ctaLabel,
  onClose,
}: {
  destination: Destination | null;
  hotels: Deal[];
  locale: string;
  ctaLabel: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (destination) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [destination]);

  return (
    <AnimatePresence>
      {destination && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end sm:items-center sm:justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ y: "100%", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.6 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120) onClose();
            }}
            className="relative z-10 flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[80vh] sm:max-w-3xl sm:rounded-3xl"
          >
            <div className="relative h-40 shrink-0 overflow-hidden sm:h-48">
              <Image src={destination.image} alt={destination.name} fill sizes="700px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">{destination.name}</h2>
                  <p className="text-sm text-white/75">{destination.country}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-foreground transition-transform hover:scale-110"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
              <div className="absolute left-1/2 top-2 h-1 w-12 -translate-x-1/2 rounded-full bg-white/60 sm:hidden" />
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {hotels.map((hotel, i) => (
                  <motion.div
                    key={hotel.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    className="overflow-hidden rounded-2xl bg-surface ring-1 ring-black/5"
                  >
                    <div className="relative h-36 w-full overflow-hidden">
                      <Image src={hotel.image} alt={hotel.hotelName} fill sizes="350px" className="object-cover transition-transform duration-500 hover:scale-110" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-sm font-semibold text-foreground">{hotel.hotelName}</h3>
                      <p className="mt-0.5 text-xs text-foreground/50">{hotel.location}</p>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-foreground/60">{hotel.description}</p>
                      <Link
                        href={`/${locale}/contact?hotel=${encodeURIComponent(hotel.hotelName)}`}
                        onClick={onClose}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-medium text-white transition-transform hover:scale-105"
                      >
                        {ctaLabel}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
