import Link from "next/link";

export default function NewClientPage() {
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

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_360px]">
            <form className="space-y-6">
              <FormSection title="Client details">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Client name" placeholder="Acme Legal Group" />
                  <Field label="Entity type" placeholder="Corporate entity" />
                  <Field label="Primary contact" placeholder="Jordan Patel" />
                  <Field
                    label="Email address"
                    type="email"
                    placeholder="jordan@acme.com"
                  />
                  <Field
                    label="Phone number"
                    type="tel"
                    placeholder="+1 (415) 555-0130"
                  />
                  <Field label="Matter type" placeholder="Corporate advisory" />
                </div>
              </FormSection>

              <FormSection title="Address & jurisdiction">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="Street address"
                    placeholder="1560 Market Street"
                    className="md:col-span-2"
                  />
                  <Field label="City" placeholder="San Francisco" />
                  <Field label="State / Province" placeholder="California" />
                  <Field label="Postal code" placeholder="94103" />
                  <Field label="Country" placeholder="United States" />
                  <Field
                    label="Jurisdiction"
                    placeholder="California State Courts"
                    className="md:col-span-2"
                  />
                </div>
              </FormSection>

              <FormSection title="Notes & preferences">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="mb-2 block">Internal notes</span>
                  <textarea
                    rows={5}
                    placeholder="Add context, billing preferences, or engagement details..."
                    className="w-full rounded-xl border border-gray-300 px-3.5 py-3 font-normal outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </label>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <Checkbox label="Require monthly billing" />
                  <Checkbox label="Send strategic updates" />
                </div>
              </FormSection>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
                >
                  Save draft
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Create client
                </button>
              </div>
            </form>

            <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Client summary</h3>
              <div className="mt-5 flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                  AC
                </div>
                <div>
                  <p className="font-semibold">Acme Legal Group</p>
                  <p className="text-sm text-gray-500">Corporate entity</p>
                </div>
              </div>
              <dl className="mt-6 space-y-4 text-sm">
                <SummaryRow label="Primary contact" value="Jordan Patel" />
                <SummaryRow label="Email" value="jordan@acme.com" />
                <SummaryRow label="Jurisdiction" value="California" />
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
  className = "",
}: {
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block text-sm font-medium text-gray-700 ${className}`}>
      <span className="mb-2 block">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 px-3.5 py-3 font-normal outline-none focus:ring-2 focus:ring-gray-200"
      />
    </label>
  );
}

function Checkbox({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-normal">
      <input type="checkbox" defaultChecked className="h-4 w-4 accent-gray-900" />
      {label}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-gray-200 pb-3 last:border-0">
      <dt className="text-gray-500">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}