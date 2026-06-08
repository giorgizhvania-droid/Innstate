"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import DestinationCard from "./DestinationCard";
import CityHotelsModal from "./CityHotelsModal";
import type { Destination, Deal } from "@/lib/data";

export default function DestinationsGrid({
  locale,
  destinations,
  deals,
  dealsLabel,
  ctaLabel,
  reveal = true,
}: {
  locale: string;
  destinations: Destination[];
  deals: Deal[];
  dealsLabel: string;
  ctaLabel: string;
  reveal?: boolean;
}) {
  const [active, setActive] = useState<Destination | null>(null);

  const hotels = active ? deals.filter((d) => d.destinationSlug === active.slug) : [];

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((d, i) =>
          reveal ? (
            <Reveal key={d.slug} delay={i * 0.06}>
              <DestinationCard destination={d} dealsLabel={dealsLabel} onClick={() => setActive(d)} />
            </Reveal>
          ) : (
            <DestinationCard key={d.slug} destination={d} dealsLabel={dealsLabel} onClick={() => setActive(d)} />
          )
        )}
      </div>

      <CityHotelsModal
        destination={active}
        hotels={hotels}
        locale={locale}
        ctaLabel={ctaLabel}
        onClose={() => setActive(null)}
      />
    </>
  );
}
