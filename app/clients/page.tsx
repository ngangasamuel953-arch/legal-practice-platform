import Link from "next/link";
import { listClients } from "@/lib/services/clients";

export default async function ClientsPage() {
  const clients = await listClients();

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">Clients</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your firm&apos;s clients.
            </p>
          </div>

          <Link
            href="/clients/new"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
          >
            + New client
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          {clients.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <h2 className="text-lg font-semibold">No clients yet</h2>
              <p className="mt-2 text-sm text-gray-600">
                Create your first client to get started.
              </p>

              <Link
                href="/clients/new"
                className="mt-5 inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Create client
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-gray-500">
                          {client.clientNumber}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        {client.type}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <div>{client.email || "—"}</div>
                        <div className="text-gray-500">
                          {client.phone || "—"}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        {client.city || "—"}, {client.country || "—"}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        {client.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
