import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { destinations } from "@/lib/data";
import DestinationsClient from "./DestinationsClient";

export default async function DestinationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">{dict.destinationsPage.title}</h1>
        <p className="mt-3 text-foreground/60">{dict.destinationsPage.subtitle}</p>
      </div>

      <DestinationsClient
        locale={locale}
        destinations={destinations}
        dict={{
          searchPlaceholder: dict.destinationsPage.searchPlaceholder,
          all: dict.destinationsPage.all,
          noResults: dict.destinationsPage.noResults,
          dealsLabel: dict.dealsSection.title.split(" ")[0],
          ctaLabel: dict.dealsSection.request,
          noMatchHint: dict.destinationsPage.noMatchHint,
        }}
      />
    </div>
  );
}
