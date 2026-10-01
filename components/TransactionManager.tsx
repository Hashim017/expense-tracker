"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { formatMoney, formatDate } from "@/lib/format";

export type TxItem = {
  id: string;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  date: string;
  note: string | null;
  categoryId: string;
  categoryName: string;
};

export type CategoryItem = {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
};

type FormState = {
  id?: string;
  title: string;
  amount: string;
  type: "INCOME" | "EXPENSE";
  date: string;
  categoryId: string;
  note: string;
};

export default function TransactionManager({
  transactions,
  categories,
}: {
  transactions: TxItem[];
  categories: CategoryItem[];
}) {
  const router = useRouter();
  const [filter, setFilter] = useState<"ALL" | "INCOME" | "EXPENSE">("ALL");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<FormState | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const visible = useMemo(
    () =>
      transactions.filter(
        (t) =>
          (filter === "ALL" || t.type === filter) &&
          t.title.toLowerCase().includes(search.toLowerCase())
      ),
    [transactions, filter, search]
  );

  const formCategories = form
    ? categories.filter((c) => c.type === form.type)
    : [];

  function openNew() {
    const first = categories.find((c) => c.type === "EXPENSE");
    setError("");
    setForm({
      title: "",
      amount: "",
      type: "EXPENSE",
      date: new Date().toISOString().slice(0, 10),
      categoryId: first?.id ?? "",
      note: "",
    });
  }

  function openEdit(t: TxItem) {
    setError("");
    setForm({
      id: t.id,
      title: t.title,
      amount: String(t.amount),
      type: t.type,
      date: t.date.slice(0, 10),
      categoryId: t.categoryId,
      note: t.note ?? "",
    });
  }

  function changeType(type: "INCOME" | "EXPENSE") {
    const first = categories.find((c) => c.type === type);
    setForm((f) => (f ? { ...f, type, categoryId: first?.id ?? "" } : f));
  }

  async function save() {
    if (!form) return;
    setSaving(true);
    setError("");

    const res = await fetch(
      form.id ? `/api/transactions/${form.id}` : "/api/transactions",
      {
        method: form.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          amount: Number(form.amount),
          type: form.type,
          date: form.date,
          categoryId: form.categoryId,
          note: form.note,
        }),
      }
    );

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong");
      return;
    }

    setForm(null);
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this transaction?")) return;
    const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Transactions
          </h2>
          <p className="text-sm text-slate-400">
            Add, edit and delete your income and expenses.
          </p>
        </div>
        <button onClick={openNew} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add transaction
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg bg-white/5 p-1 text-sm">
          {(["ALL", "INCOME", "EXPENSE"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 font-medium capitalize ${
                filter === f
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {f.toLowerCase()}
            </button>
          ))}
        </div>
        <div className="relative min-w-48 flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title"
            className="input pl-9"
          />
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="card border-dashed py-16 text-center text-sm text-slate-500">
          No transactions found.
        </div>
      ) : (
        <ul className="card divide-y divide-white/5">
          {visible.map((t) => (
            <li
              key={t.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] sm:px-5"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  t.type === "INCOME"
                    ? "bg-emerald-400/15 text-emerald-300"
                    : "bg-rose-400/15 text-rose-300"
                }`}
              >
                {t.type === "INCOME" ? (
                  <ArrowUpRight size={18} />
                ) : (
                  <ArrowDownRight size={18} />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-slate-100">{t.title}</p>
                <p className="truncate text-xs text-slate-500">
                  {t.categoryName} · {formatDate(t.date)}
                </p>
              </div>
              <p
                className={`font-semibold ${
                  t.type === "INCOME" ? "text-emerald-300" : "text-rose-300"
                }`}
              >
                {t.type === "INCOME" ? "+" : "-"}
                {formatMoney(t.amount)}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => openEdit(t)}
                  aria-label="Edit"
                  className="rounded-lg p-2 text-slate-500 hover:bg-white/10 hover:text-indigo-300"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => remove(t.id)}
                  aria-label="Delete"
                  className="rounded-lg p-2 text-slate-500 hover:bg-white/10 hover:text-rose-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
            className="w-full max-w-md space-y-4 rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {form.id ? "Edit transaction" : "Add transaction"}
              </h3>
              <button
                type="button"
                onClick={() => setForm(null)}
                aria-label="Close"
                className="rounded-lg p-1 text-slate-400 hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {(["EXPENSE", "INCOME"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => changeType(t)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                    form.type === t
                      ? t === "INCOME"
                        ? "border-emerald-400 bg-emerald-400/10 text-emerald-300"
                        : "border-rose-400 bg-rose-400/10 text-rose-300"
                      : "border-white/10 text-slate-400"
                  }`}
                >
                  {t === "INCOME" ? "Income" : "Expense"}
                </button>
              ))}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">
                Title
              </label>
              <input
                required
                maxLength={100}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="input"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Amount
                </label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Date
                </label>
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="input"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">
                Category
              </label>
              <select
                required
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
                className="input"
              >
                {formCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">
                Note, optional
              </label>
              <input
                maxLength={250}
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="input"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setForm(null)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/5"
              >
                Cancel
              </button>
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}