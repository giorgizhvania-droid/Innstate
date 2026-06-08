"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Destination } from "@/lib/data";

export default function DestinationCard({
  destination,
  dealsLabel,
  onClick,
}: {
  destination: Destination;
  locale?: string;
  dealsLabel: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative block h-72 w-full overflow-hidden rounded-3xl text-left shadow-sm"
    >
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-xl font-semibold text-white">{destination.name}</h3>
        <p className="mt-0.5 text-sm text-white/80">
          {destination.dealsCount} {dealsLabel}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-foreground"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      </motion.div>
    </motion.button>
  );
}
