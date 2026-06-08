import Link from "next/link";

export default function Logo({ locale, className = "" }: { locale: string; className?: string }) {
  return (
    <Link
      href={`/${locale}`}
      className={`font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground ${className}`}
    >
      Inn<span className="text-accent">state</span>
    </Link>
  );
}
