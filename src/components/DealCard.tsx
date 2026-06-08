"use client";

import SafeImage from "./SafeImage";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Deal } from "@/lib/data";

export default function DealCard({
  deal,
  locale,
  ctaLabel,
}: {
  deal: Deal;
  locale: string;
  ctaLabel: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5"
    >
      <div className="relative h-52 overflow-hidden">
        <SafeImage
          src={deal.image}
          alt={deal.hotelName}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground">{deal.hotelName}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-foreground/50">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          {deal.location}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-foreground/65">{deal.description}</p>
        <Link
          href={`/${locale}/contact?hotel=${encodeURIComponent(deal.hotelName)}`}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
        >
          {ctaLabel}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
