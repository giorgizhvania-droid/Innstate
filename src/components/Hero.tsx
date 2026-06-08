"use client";

import { useRef } from "react";
import Link from "next/link";
import CallButton from "./CallButton";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Dictionary, Locale } from "@/i18n/config";

export default function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-surface pb-24 pt-36 sm:pt-44">
      {/* animated background blobs (parallax on scroll) */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <motion.div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"
          animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto max-w-4xl px-5 text-center sm:px-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl"
        >
          {dict.hero.headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/60 sm:text-lg"
        >
          {dict.hero.subheadline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href={`/${locale}/deals`}
            className="w-full rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97] sm:w-auto"
          >
            {dict.hero.explore}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="w-full rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-foreground ring-1 ring-black/10 transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97] sm:w-auto"
          >
            {dict.hero.contact}
          </Link>
          <CallButton label={dict.nav.call} className="w-full sm:w-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
}
