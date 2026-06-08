"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/i18n/config";

type Message = { role: "bot" | "user"; text: string };

function findAnswer(input: string, questions: { q: string; a: string }[], fallback: string) {
  const normalized = input.toLowerCase();
  let best: { a: string; score: number } | null = null;
  for (const { q, a } of questions) {
    const words = q.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
    const score = words.reduce((acc, w) => (normalized.includes(w) ? acc + 1 : acc), 0);
    if (score > 0 && (!best || score > best.score)) best = { a, score };
  }
  return best ? best.a : fallback;
}

export default function AssistantWidget({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: dict.assistant.greeting }]);

  function ask(text: string) {
    if (!text.trim()) return;
    const answer = findAnswer(text, dict.assistant.questions, dict.assistant.fallback);
    setMessages((m) => [...m, { role: "user", text }, { role: "bot", text: answer }]);
    setInput("");
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-3 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between bg-foreground px-5 py-4">
              <p className="font-display text-sm font-semibold text-white">{dict.assistant.title}</p>
              <button
                aria-label="Close assistant"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <p
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user" ? "bg-accent text-white" : "bg-surface text-foreground/80"
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-col gap-2 pt-1">
                  {dict.assistant.questions.map((item) => (
                    <button
                      key={item.q}
                      onClick={() => ask(item.q)}
                      className="rounded-xl border border-black/5 bg-white px-3.5 py-2.5 text-left text-sm text-foreground/70 transition-colors hover:border-accent/30 hover:bg-accent/5 hover:text-accent"
                    >
                      {item.q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2 border-t border-black/5 px-4 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={dict.assistant.placeholder}
                className="flex-1 rounded-full border border-black/10 bg-surface px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                aria-label={dict.assistant.send}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent/90"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={dict.assistant.title}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition-colors hover:bg-accent/90"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
