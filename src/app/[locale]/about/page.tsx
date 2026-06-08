import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = await getDictionary(locale);
  const a = dict.about;

  const sections = [
    { title: a.p1Title, text: a.p1 },
    { title: a.p2Title, text: a.p2 },
    { title: a.p3Title, text: a.p3 },
    { title: a.p4Title, text: a.p4 },
    { title: a.p5Title, text: a.p5 },
  ];

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <Reveal className="text-center">
        <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">{a.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/60">{a.intro}</p>
      </Reveal>

      <div className="mt-14 space-y-6">
        {sections.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.07}>
            <div className="rounded-3xl bg-surface p-7 sm:p-8">
              <h2 className="font-display text-lg font-semibold text-foreground">{s.title}</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-foreground/65 sm:text-base">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
