"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Content } from "@/lib/content";
import type { Destination, Deal } from "@/lib/data";

type Tab = "destinations" | "deals";

const emptyDestination: Destination = { slug: "", name: "", country: "", image: "", dealsCount: 0 };
const emptyDeal: Deal = { slug: "", hotelName: "", destinationSlug: "", location: "", image: "", description: "" };

export default function AdminDashboard({ initialContent }: { initialContent: Content }) {
  const [content, setContent] = useState<Content>(initialContent);
  const [tab, setTab] = useState<Tab>("destinations");
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [status, setStatus] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function persist(next: Content) {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus({ type: "error", text: data.error || "Failed to save changes." });
        setSaving(false);
        return false;
      }
      setContent(next);
      setStatus({ type: "ok", text: "Saved successfully." });
      setSaving(false);
      return true;
    } catch {
      setStatus({ type: "error", text: "Network error — please try again." });
      setSaving(false);
      return false;
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  function saveDestination(d: Destination) {
    const exists = content.destinations.some((x) => x.slug === editingDestination?.slug);
    const list =
      editingDestination && exists
        ? content.destinations.map((x) => (x.slug === editingDestination.slug ? d : x))
        : [...content.destinations, d];
    persist({ ...content, destinations: list }).then((ok) => {
      if (ok) setEditingDestination(null);
    });
  }

  function deleteDestination(slug: string) {
    if (!confirm("Delete this destination? Its deals will remain but lose their link.")) return;
    persist({ ...content, destinations: content.destinations.filter((x) => x.slug !== slug) });
  }

  function saveDeal(d: Deal) {
    const exists = content.deals.some((x) => x.slug === editingDeal?.slug);
    const list =
      editingDeal && exists
        ? content.deals.map((x) => (x.slug === editingDeal.slug ? d : x))
        : [...content.deals, d];
    persist({ ...content, deals: list }).then((ok) => {
      if (ok) setEditingDeal(null);
    });
  }

  function deleteDeal(slug: string) {
    if (!confirm("Delete this hotel deal?")) return;
    persist({ ...content, deals: content.deals.filter((x) => x.slug !== slug) });
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-5 py-10 sm:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Innstate Admin</h1>
          <p className="mt-1 text-sm text-foreground/60">Manage destinations and hotel deals shown on the website.</p>
        </div>
        <button
          onClick={logout}
          className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-surface"
        >
          Sign Out
        </button>
      </div>

      <div className="mt-8 flex gap-2">
        {(["destinations", "deals"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              tab === t ? "bg-accent text-white" : "bg-surface text-foreground/70 hover:bg-accent/10"
            }`}
          >
            {t === "destinations" ? "Destinations" : "Hotel Deals"}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {status && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-4 rounded-xl px-4 py-3 text-sm ${
              status.type === "ok" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
            }`}
          >
            {status.text}
          </motion.p>
        )}
      </AnimatePresence>

      {tab === "destinations" ? (
        <div className="mt-6">
          <button
            onClick={() => setEditingDestination(emptyDestination)}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            + Add Destination
          </button>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.destinations.map((d) => (
              <div key={d.slug} className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.image} alt="" className="h-32 w-full object-cover" />
                <div className="p-4">
                  <p className="font-display text-sm font-semibold text-foreground">{d.name}</p>
                  <p className="text-xs text-foreground/50">{d.country} · slug: {d.slug} · {d.dealsCount} deals</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => setEditingDestination(d)}
                      className="rounded-full bg-surface px-3.5 py-1.5 text-xs font-medium text-foreground/70 transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteDestination(d.slug)}
                      className="rounded-full bg-red-50 px-3.5 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <button
            onClick={() => setEditingDeal(emptyDeal)}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            + Add Hotel Deal
          </button>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.deals.map((d) => (
              <div key={d.slug} className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.image} alt="" className="h-32 w-full object-cover" />
                <div className="p-4">
                  <p className="font-display text-sm font-semibold text-foreground">{d.hotelName}</p>
                  <p className="text-xs text-foreground/50">{d.location} · destination: {d.destinationSlug}</p>
                  <p className="mt-1.5 line-clamp-2 text-xs text-foreground/60">{d.description}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => setEditingDeal(d)}
                      className="rounded-full bg-surface px-3.5 py-1.5 text-xs font-medium text-foreground/70 transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteDeal(d.slug)}
                      className="rounded-full bg-red-50 px-3.5 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {editingDestination && (
          <DestinationModal
            initial={editingDestination}
            saving={saving}
            onCancel={() => setEditingDestination(null)}
            onSave={saveDestination}
          />
        )}
        {editingDeal && (
          <DealModal
            initial={editingDeal}
            destinations={content.destinations}
            saving={saving}
            onCancel={() => setEditingDeal(null)}
            onSave={saveDeal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ModalShell({ title, children, onCancel }: { title: string; children: React.ReactNode; onCancel: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm"
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
      >
        <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
        <div className="mt-4 space-y-3">{children}</div>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-foreground/60">{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded-xl border border-black/10 bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}

function DestinationModal({
  initial,
  saving,
  onCancel,
  onSave,
}: {
  initial: Destination;
  saving: boolean;
  onCancel: () => void;
  onSave: (d: Destination) => void;
}) {
  const [form, setForm] = useState<Destination>(initial);

  return (
    <ModalShell title={initial.slug ? "Edit Destination" : "Add Destination"} onCancel={onCancel}>
      <Field label="Slug (unique id, e.g. tokyo)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
      <Field label="City Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Field label="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
      <Field label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
      <Field
        label="Deals Count"
        type="number"
        value={form.dealsCount}
        onChange={(e) => setForm({ ...form, dealsCount: Number(e.target.value) })}
      />
      <div className="flex justify-end gap-2 pt-2">
        <button onClick={onCancel} className="rounded-full px-4 py-2 text-sm font-medium text-foreground/60 hover:bg-surface">
          Cancel
        </button>
        <button
          disabled={saving || !form.slug || !form.name || !form.country || !form.image}
          onClick={() => onSave(form)}
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </ModalShell>
  );
}

function DealModal({
  initial,
  destinations,
  saving,
  onCancel,
  onSave,
}: {
  initial: Deal;
  destinations: Destination[];
  saving: boolean;
  onCancel: () => void;
  onSave: (d: Deal) => void;
}) {
  const [form, setForm] = useState<Deal>(initial);

  return (
    <ModalShell title={initial.slug ? "Edit Hotel Deal" : "Add Hotel Deal"} onCancel={onCancel}>
      <Field label="Slug (unique id)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
      <Field label="Hotel Name" value={form.hotelName} onChange={(e) => setForm({ ...form, hotelName: e.target.value })} />
      <label className="block">
        <span className="block text-xs font-medium text-foreground/60">Destination</span>
        <select
          value={form.destinationSlug}
          onChange={(e) => setForm({ ...form, destinationSlug: e.target.value })}
          className="mt-1 w-full rounded-xl border border-black/10 bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
        >
          <option value="">Select destination...</option>
          {destinations.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name}
            </option>
          ))}
        </select>
      </label>
      <Field label="Location (e.g. Paris, France)" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <Field label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
      <label className="block">
        <span className="block text-xs font-medium text-foreground/60">Description</span>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="mt-1 w-full rounded-xl border border-black/10 bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </label>
      <div className="flex justify-end gap-2 pt-2">
        <button onClick={onCancel} className="rounded-full px-4 py-2 text-sm font-medium text-foreground/60 hover:bg-surface">
          Cancel
        </button>
        <button
          disabled={saving || !form.slug || !form.hotelName || !form.destinationSlug || !form.location || !form.image}
          onClick={() => onSave(form)}
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </ModalShell>
  );
}
