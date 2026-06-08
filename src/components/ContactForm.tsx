"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/i18n/config";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const f = dict.contactPage.form;
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const fields: { name: string; label: string; type: string; span?: boolean }[] = [
    { name: "fullName", label: f.fullName, type: "text" },
    { name: "email", label: f.email, type: "email" },
    { name: "phone", label: f.phone, type: "tel" },
    { name: "destination", label: f.destination, type: "text" },
    { name: "dates", label: f.dates, type: "text" },
    { name: "guests", label: f.guests, type: "number" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={field.span ? "sm:col-span-2" : ""}>
            <label className="mb-1.5 block text-sm font-medium text-foreground/70">{field.label}</label>
            <input
              name={field.name}
              type={field.type}
              defaultValue={field.name === "destination" ? params.get("hotel") ?? "" : ""}
              required
              min={field.type === "number" ? 1 : undefined}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
        ))}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground/70">{f.message}</label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === "sending"}
        whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
        whileTap={{ scale: status === "sending" ? 1 : 0.97 }}
        className="w-full rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-opacity disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? f.sending : f.submit}
      </motion.button>

      <AnimatePresence>
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
          >
            {f.success}
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {f.error}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
