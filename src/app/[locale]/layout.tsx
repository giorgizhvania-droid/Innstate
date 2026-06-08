import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/i18n/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import AssistantWidget from "@/components/AssistantWidget";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const dict = await getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: [
      "hotel deals",
      "cheap hotel offers",
      "travel deals worldwide",
      "hotel discounts",
      "global hotel search",
      "hotel deals worldwide",
      "best hotel offers",
      "Innstate",
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ka: "/ka", ru: "/ru", "x-default": "/en" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${SITE_URL}/${locale}`,
      siteName: "Innstate",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Innstate",
  url: SITE_URL,
  description:
    "Innstate helps travelers discover hotel deals worldwide and submit inquiries for exclusive offers across hundreds of destinations.",
  sameAs: ["https://www.facebook.com/Innstate/", "https://www.instagram.com/innstate_ge"],
  areaServed: "Worldwide",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = await getDictionary(locale);

  return (
    <div lang={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LoadingScreen />
      <Header locale={locale} dict={dict} />
      <main>{children}</main>
      <Footer locale={locale} dict={dict} />
      <AssistantWidget dict={dict} />
    </div>
  );
}
