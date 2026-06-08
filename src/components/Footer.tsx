import Link from "next/link";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import SocialIcons from "./SocialIcons";
import type { Dictionary, Locale } from "@/i18n/config";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const navItems = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/destinations`, label: dict.nav.destinations },
    { href: `/${locale}/deals`, label: dict.nav.deals },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-black/5 bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo locale={locale} />
            <p className="mt-3 max-w-xs text-sm text-foreground/60">{dict.footer.tagline}</p>
            <SocialIcons className="mt-5" />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">{dict.footer.quickLinks}</h4>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-foreground/60 transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">{dict.footer.contact}</h4>
            <Link
              href={`/${locale}/contact`}
              className="mt-4 inline-block text-sm text-foreground/60 transition-colors hover:text-accent"
            >
              {dict.nav.contact}
            </Link>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Language</h4>
            <div className="mt-4">
              <LanguageSwitcher locale={locale} />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-black/5 pt-6 text-xs text-foreground/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Innstate. {dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
