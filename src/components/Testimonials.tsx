"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Testimonial = { name: string; text: string };

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="relative h-56 sm:h-44">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-white px-6 py-8 text-center shadow-sm ring-1 ring-black/5 sm:px-10"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="mb-3 text-accent/30">
              <path d="M9.5 6.5C6.5 8 4.5 10.8 4.5 14.2c0 2.4 1.7 4.1 3.8 4.1 2 0 3.5-1.5 3.5-3.4 0-1.8-1.3-3.2-3-3.4.4-1.6 2-3 3.7-3.6L11.3 6c-.6.1-1.2.3-1.8.5Zm9.3 0c-3 1.5-5 4.3-5 7.7 0 2.4 1.7 4.1 3.8 4.1 2 0 3.5-1.5 3.5-3.4 0-1.8-1.3-3.2-3-3.4.4-1.6 2-3 3.7-3.6L20.6 6c-.6.1-1.2.3-1.8.5Z" />
            </svg>
            <p className="max-w-lg text-base leading-relaxed text-foreground/75">{items[index].text}</p>
            <p className="mt-4 font-display text-sm font-semibold text-foreground">{items[index].name}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-7 bg-accent" : "w-2 bg-accent/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
