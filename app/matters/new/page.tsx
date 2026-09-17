"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type Client = {
  id: string;
  clientNumber: string;
  name: string;
};

const matterTypes = [
  "LITIGATION",
  "CORPORATE",
  "COMMERCIAL",
  "CONVEYANCING",
  "INTELLECTUAL_PROPERTY",
  "EMPLOYMENT",
  "FAMILY",
  "PROBATE",
  "TAX",
  "COMPLIANCE",
  "ARBITRATION",
  "MEDIATION",
  "GENERAL",
  "OTHER",
];

export default function NewMatterPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("LITIGATION");
  const [clientId, setClientId] = useState("");
  const [description, setDescription] = useState("");
  const [responsibleUserId, setResponsibleUserId] = useState("");
  const [notes, setNotes] = useState("");

  const [loadingClients, setLoadingClients] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadClients() {
      try {
        const response = await fetch("/api/clients");

        if (!response.ok) {
          throw new Error("Failed to load clients.");
        }

const result = await response.json();
setClients(Array.isArray(result) ? result : result.data ?? []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load clients."
        );
      } finally {
        setLoadingClients(false);
      }
    }

    loadClients();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Matter title is required.");
      return;
    }

    if (!clientId) {
      setError("Please select a client.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("/api/matters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          type,
          clientId,
          description,
          responsibleUserId,
          notes,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Failed to create matter.");
      }

      router.push("/matters");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create matter."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Ndungu Njoroge & Kwach Advocates LLP
            </p>
            <h1 className="mt-1 text-2xl font-bold">New Matter</h1>
          </div>

          <Link
            href="/matters"
            className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Back to Matters
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Matter Details</h2>
            <p className="mt-1 text-sm text-gray-500">
              Create a new matter and associate it with an existing client.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold"
              >
                Matter Title
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. ABC Limited v XYZ Limited"
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="client"
                  className="mb-2 block text-sm font-semibold"
                >
                  Client
                </label>

                <select
                  id="client"
                  value={clientId}
                  onChange={(event) => setClientId(event.target.value)}
                  disabled={loadingClients}
                  className="w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none focus:ring-2"
                >
                  <option value="">
                    {loadingClients
                      ? "Loading clients..."
                      : "Select a client"}
                  </option>

                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name} — {client.clientNumber}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="mb-2 block text-sm font-semibold"
                >
                  Matter Type
                </label>

                <select
                  id="type"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  className="w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none focus:ring-2"
                >
                  {matterTypes.map((matterType) => (
                    <option key={matterType} value={matterType}>
                      {matterType.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold"
              >
                Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                placeholder="Brief description of the matter..."
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
              />
            </div>

            <div>
              <label
                htmlFor="responsibleUserId"
                className="mb-2 block text-sm font-semibold"
              >
                Responsible Advocate
              </label>

              <input
                id="responsibleUserId"
                type="text"
                value={responsibleUserId}
                onChange={(event) =>
                  setResponsibleUserId(event.target.value)
                }
                placeholder="User ID — we will replace this with an advocate selector later"
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
              />

              <p className="mt-2 text-xs text-gray-500">
                This field is temporary. We will connect it to the firm&apos;s
                Users/Advocates module later.
              </p>
            </div>

            <div>
              <label
                htmlFor="notes"
                className="mb-2 block text-sm font-semibold"
              >
                Notes
              </label>

              <textarea
                id="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={4}
                placeholder="Internal matter notes..."
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
              />
            </div>

            <div className="flex items-center justify-end gap-3 border-t pt-6">
              <Link
                href="/matters"
                className="rounded-lg border px-5 py-3 text-sm font-semibold hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving || loadingClients}
                className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Creating Matter..." : "Create Matter"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}