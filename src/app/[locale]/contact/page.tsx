import { Suspense } from "react";
import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <Reveal className="text-center">
        <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">{dict.contactPage.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-foreground/60">{dict.contactPage.subtitle}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12 rounded-3xl bg-surface p-6 shadow-sm sm:p-10">
        <Suspense fallback={null}>
          <ContactForm dict={dict} />
        </Suspense>
      </Reveal>

      <Reveal delay={0.15} className="mt-8 text-center">
        <h2 className="font-display text-base font-semibold text-foreground">{dict.contactPage.directTitle}</h2>
        <p className="mt-1 text-sm text-foreground/60">{dict.contactPage.directText}</p>
      </Reveal>
    </div>
  );
}
