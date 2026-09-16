"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const clientTypes = [
  { value: "INDIVIDUAL", label: "Individual" },
  { value: "COMPANY", label: "Company" },
  { value: "PARTNERSHIP", label: "Partnership" },
  { value: "GOVERNMENT", label: "Government" },
  { value: "NGO", label: "NGO" },
  { value: "TRUST", label: "Trust" },
  { value: "OTHER", label: "Other" },
];

export default function NewClientPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    type: "COMPANY",
    email: "",
    phone: "",
    alternativePhone: "",
    postalAddress: "",
    physicalAddress: "",
    city: "",
    country: "Kenya",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Client name is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create client.");
      }

      router.push("/clients");
    } catch (submissionError) {
      console.error("Client creation failed:", submissionError);

      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Failed to create client.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">Legal Practice Platform</h1>
            <p className="text-sm text-gray-500">
              Legal practice management system
            </p>
          </div>

          <div className="rounded-lg border px-4 py-2 text-sm">
            Administrator
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        <aside className="min-h-[calc(100vh-89px)] w-64 border-r bg-white p-5">
          <nav className="space-y-2">
            <Link
              href="/"
              className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>

            <Link
              href="/clients"
              className="block rounded-lg bg-gray-900 px-4 py-3 font-medium text-white"
            >
              Clients
            </Link>

            {[
              "Matters",
              "Tasks",
              "Deadlines",
              "Documents",
              "Correspondence",
              "Legal Knowledge",
              "Finance",
            ].map((item) => (
              <div key={item} className="px-4 py-3 text-gray-700">
                {item}
              </div>
            ))}
          </nav>
        </aside>

        <section className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-gray-500">
                Clients
              </p>
              <h2 className="mt-2 text-3xl font-bold">New client</h2>
            </div>

            <Link
              href="/clients"
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to clients
            </Link>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_360px]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormSection title="Client details">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="Client name"
                    placeholder="e.g. Ndungu Njoroge & Kwach Advocates LLP"
                    value={form.name}
                    onChange={(value) => updateField("name", value)}
                    required
                    className="md:col-span-2"
                  />

                  <label className="block text-sm font-medium text-gray-700">
                    <span className="mb-2 block">Entity type</span>

                    <select
                      value={form.type}
                      onChange={(event) =>
                        updateField("type", event.target.value)
                      }
                      className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 font-normal outline-none focus:ring-2 focus:ring-gray-200"
                    >
                      {clientTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <Field
                    label="Email address"
                    type="email"
                    placeholder="client@example.com"
                    value={form.email}
                    onChange={(value) => updateField("email", value)}
                  />

                  <Field
                    label="Phone number"
                    type="tel"
                    placeholder="+254 7XX XXX XXX"
                    value={form.phone}
                    onChange={(value) => updateField("phone", value)}
                  />

                  <Field
                    label="Alternative phone"
                    type="tel"
                    placeholder="+254 7XX XXX XXX"
                    value={form.alternativePhone}
                    onChange={(value) =>
                      updateField("alternativePhone", value)
                    }
                  />
                </div>
              </FormSection>

              <FormSection title="Address & jurisdiction">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="Postal address"
                    placeholder="P.O. Box 12345-00100"
                    value={form.postalAddress}
                    onChange={(value) =>
                      updateField("postalAddress", value)
                    }
                    className="md:col-span-2"
                  />

                  <Field
                    label="Physical address"
                    placeholder="Building, street, office"
                    value={form.physicalAddress}
                    onChange={(value) =>
                      updateField("physicalAddress", value)
                    }
                    className="md:col-span-2"
                  />

                  <Field
                    label="City"
                    placeholder="Nairobi"
                    value={form.city}
                    onChange={(value) => updateField("city", value)}
                  />

                  <Field
                    label="Country"
                    placeholder="Kenya"
                    value={form.country}
                    onChange={(value) => updateField("country", value)}
                  />
                </div>
              </FormSection>

              <FormSection title="Notes & preferences">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="mb-2 block">Internal notes</span>

                  <textarea
                    rows={6}
                    value={form.notes}
                    onChange={(event) =>
                      updateField("notes", event.target.value)
                    }
                    placeholder="Add internal client notes, engagement details, or other relevant information..."
                    className="w-full rounded-xl border border-gray-300 px-3.5 py-3 font-normal outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </label>
              </FormSection>

              <div className="flex justify-end gap-3">
                <Link
                  href="/clients"
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Creating client..." : "Create client"}
                </button>
              </div>
            </form>

            <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Client summary</h3>

              <div className="mt-5 flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                  {getInitials(form.name)}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold">
                    {form.name || "New client"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {getClientTypeLabel(form.type)}
                  </p>
                </div>
              </div>

              <dl className="mt-6 space-y-4 text-sm">
                <SummaryRow
                  label="Email"
                  value={form.email || "Not provided"}
                />

                <SummaryRow
                  label="Phone"
                  value={form.phone || "Not provided"}
                />

                <SummaryRow
                  label="City"
                  value={form.city || "Not provided"}
                />

                <SummaryRow
                  label="Country"
                  value={form.country || "Not provided"}
                />

                <SummaryRow label="Status" value="Active" />
              </dl>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold">{title}</h3>
      {children}
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  required = false,
  className = "",
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block text-sm font-medium text-gray-700 ${className}`}>
      <span className="mb-2 block">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </span>

      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-gray-300 px-3.5 py-3 font-normal outline-none focus:ring-2 focus:ring-gray-200"
      />
    </label>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-gray-200 pb-3 last:border-0">
      <dt className="text-gray-500">{label}</dt>
      <dd className="max-w-[190px] truncate text-right font-medium">
        {value}
      </dd>
    </div>
  );
}

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return "NC";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

function getClientTypeLabel(type: string) {
  return (
    clientTypes.find((clientType) => clientType.value === type)?.label ??
    "Company"
  );
}