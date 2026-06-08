import { Suspense } from "react";
import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { deals, destinations } from "@/lib/data";
import DealsClient from "./DealsClient";

export default async function DealsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">{dict.dealsPage.title}</h1>
        <p className="mt-3 text-foreground/60">{dict.dealsPage.subtitle}</p>
      </div>

      <Suspense fallback={null}>
        <DealsClient
          locale={locale}
          deals={deals}
          destinations={destinations}
          ctaLabel={dict.dealsSection.request}
          noResults={dict.dealsPage.noResults}
          allLabel={dict.destinationsPage.all}
        />
      </Suspense>
    </div>
  );
}
