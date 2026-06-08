export const locales = ["en", "ka", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ka: "ქართული",
  ru: "Русский",
};

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  ka: () => import("./dictionaries/ka.json").then((m) => m.default),
  ru: () => import("./dictionaries/ru.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  (dictionaries[locale] ?? dictionaries.en)();

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
