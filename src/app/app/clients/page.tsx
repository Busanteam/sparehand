"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { Panel, PrimaryButton } from "@/components/ui";
import {
  deleteClient,
  loadClients,
  saveClients,
  upsertClient,
  type ClientRecord,
} from "@/lib/storage/clients";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  siteAddress: "",
  notes: "",
};

export default function ClientsPage() {
  const { t } = useI18n();
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setClients(loadClients());
  }, []);

  function persist(next: ClientRecord[]) {
    setClients(next);
    saveClients(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1200);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    const next = upsertClient(clients, {
      id: editingId ?? undefined,
      ...form,
      name: form.name.trim(),
    });
    persist(next);
    setForm(emptyForm);
    setEditingId(null);
  }

  function edit(c: ClientRecord) {
    setEditingId(c.id);
    setForm({
      name: c.name,
      email: c.email,
      phone: c.phone,
      siteAddress: c.siteAddress,
      notes: c.notes,
    });
  }

  function remove(id: string) {
    if (!window.confirm(t.clients.deleteConfirm)) return;
    persist(deleteClient(clients, id));
    if (editingId === id) {
      setEditingId(null);
      setForm(emptyForm);
    }
  }

  return (
    <Panel title={t.clients.title} hint={t.clients.hint} help={t.help.clients}>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <form
          onSubmit={submit}
          className="space-y-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5"
        >
          <h2 className="font-[family-name:var(--font-display)] text-lg">
            {editingId ? t.clients.edit : t.clients.add}
          </h2>
          {(
            [
              ["name", t.clients.name],
              ["email", t.clients.email],
              ["phone", t.clients.phone],
              ["siteAddress", t.clients.site],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block text-sm font-medium">
              {label}
              <input
                className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2.5"
                value={form[key]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [key]: e.target.value }))
                }
                required={key === "name"}
              />
            </label>
          ))}
          <label className="block text-sm font-medium">
            {t.clients.notes}
            <textarea
              className="mt-1 min-h-20 w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2.5"
              value={form.notes}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, notes: e.target.value }))
              }
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <PrimaryButton type="submit">
              {saved ? t.common.saved : editingId ? t.common.save : t.clients.add}
            </PrimaryButton>
            {editingId ? (
              <button
                type="button"
                className="rounded-lg border border-[var(--line)] px-4 py-2.5 text-sm"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                {t.common.cancel}
              </button>
            ) : null}
          </div>
        </form>

        <div className="space-y-3">
          {clients.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">{t.clients.empty}</p>
          ) : (
            clients.map((c) => (
              <div
                key={c.id}
                className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    {c.siteAddress ? (
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {c.siteAddress}
                      </p>
                    ) : null}
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {[c.email, c.phone].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="text-sm text-[var(--accent)]"
                      onClick={() => edit(c)}
                    >
                      {t.clients.edit}
                    </button>
                    <button
                      type="button"
                      className="text-sm text-[var(--warn)]"
                      onClick={() => remove(c.id)}
                    >
                      {t.clients.remove}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Panel>
  );
}
