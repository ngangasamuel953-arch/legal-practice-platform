<Link
  href="/clients"
  className="block rounded-lg px-4 py-3 hover:bg-gray-100"
>
  Clients
</Link>export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">
              Legal Practice Platform
            </h1>
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
            <div className="rounded-lg bg-gray-900 px-4 py-3 font-medium text-white">
              Dashboard
            </div>

            <div className="px-4 py-3">Clients</div>
            <div className="px-4 py-3">Matters</div>
            <div className="px-4 py-3">Tasks</div>
            <div className="px-4 py-3">Deadlines</div>
            <div className="px-4 py-3">Documents</div>
            <div className="px-4 py-3">Correspondence</div>
            <div className="px-4 py-3">Legal Knowledge</div>
            <div className="px-4 py-3">Finance</div>

            <div className="mt-6 border-t pt-6 px-4 py-3">
              Administration
            </div>
          </nav>
        </aside>

        <section className="flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              Dashboard
            </h2>
            <p className="mt-2 text-gray-500">
              Overview of your legal practice.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              title="Active Matters"
              value="0"
            />

            <DashboardCard
              title="Due Today"
              value="0"
            />

            <DashboardCard
              title="Overdue"
              value="0"
            />

            <DashboardCard
              title="High Risk"
              value="0"
            />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl border bg-white p-6">
              <h3 className="text-lg font-semibold">
                Action Required
              </h3>

              <p className="mt-4 text-sm text-gray-500">
                No outstanding actions.
              </p>
            </section>

            <section className="rounded-xl border bg-white p-6">
              <h3 className="text-lg font-semibold">
                Recent Matters
              </h3>

              <p className="mt-4 text-sm text-gray-500">
                No matters have been created yet.
              </p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}