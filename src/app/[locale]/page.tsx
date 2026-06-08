import Link from "next/link";
import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import DestinationsGrid from "@/components/DestinationsGrid";
import DealCard from "@/components/DealCard";
import Counter from "@/components/Counter";
import Testimonials from "@/components/Testimonials";
import { destinations, deals } from "@/lib/data";

const whyIcons = [
  <path key="globe" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.5-2.5 3.5-5.5 3.5-9S14.5 5 12 3M12 21c-2.5-2.5-3.5-5.5-3.5-9S9.5 5 12 3m-9 9h18" />,
  <path key="tag" d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L3 13V3h10l7.59 7.59a2 2 0 0 1 0 2.82Z M7 7h.01" />,
  <path key="bolt" d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  <path key="shield" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = await getDictionary(locale);

  const stats = [
    { label: dict.stats.destinations, value: destinations.length * 12, suffix: "+" },
    { label: dict.stats.deals, value: deals.length * 18, suffix: "+" },
    { label: dict.stats.inquiries, value: 4200, suffix: "+" },
    { label: dict.stats.countries, value: 38, suffix: "+" },
  ];

  return (
    <>
      <Hero locale={locale} dict={dict} />

      {/* Featured Destinations */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            {dict.destinationsSection.title}
          </h2>
          <p className="mt-3 text-foreground/60">{dict.destinationsSection.subtitle}</p>
        </Reveal>

        <div className="mt-12">
          <DestinationsGrid
            locale={locale}
            destinations={destinations}
            dealsLabel={dict.dealsSection.title.split(" ")[0]}
            ctaLabel={dict.dealsSection.request}
          />
        </div>
      </section>

      {/* Featured Deals */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{dict.dealsSection.title}</h2>
            <p className="mt-3 text-foreground/60">{dict.dealsSection.subtitle}</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deals.slice(0, 6).map((d, i) => (
              <Reveal key={d.slug} delay={i * 0.06}>
                <DealCard deal={d} locale={locale} ctaLabel={dict.dealsSection.request} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Link
              href={`/${locale}/deals`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground ring-1 ring-black/10 transition-transform hover:scale-105"
            >
              {dict.common.viewAll}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Why Innstate */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{dict.why.title}</h2>
          <p className="mt-3 text-foreground/60">{dict.why.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.why.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-surface p-6 transition-transform duration-300 hover:-translate-y-1.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {whyIcons[i % whyIcons.length]}
                  </svg>
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{dict.how.title}</h2>
          </Reveal>

          <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-black/10 sm:block" />
            {dict.how.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1} className="relative text-center">
                <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent font-display text-base font-bold text-white shadow-lg shadow-accent/30">
                  {i + 1}
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-foreground/60">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid grid-cols-2 gap-8 rounded-3xl bg-foreground px-8 py-12 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div>
                <Counter to={s.value} suffix={s.suffix} className="text-white" />
              </div>
              <p className="mt-1.5 text-sm text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-5 py-20 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{dict.testimonials.title}</h2>
          <p className="mt-3 text-foreground/60">{dict.testimonials.subtitle}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <Testimonials items={dict.testimonials.items} />
        </Reveal>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24 sm:px-8">
        <Reveal className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-accent px-8 py-16 text-center shadow-xl shadow-accent/20">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{dict.cta.headline}</h2>
          <Link
            href={`/${locale}/contact`}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-accent transition-transform hover:scale-105"
          >
            {dict.cta.button}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
