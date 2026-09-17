import Link from "next/link";
import { listMatters } from "@/lib/services/matters";

export default async function MattersPage() {
  const matters = await listMatters();

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Ndungu Njoroge & Kwach Advocates LLP
            </p>
            <h1 className="mt-1 text-2xl font-bold">Matters</h1>
          </div>

          <Link
            href="/matters/new"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
          >
            + New Matter
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Matter Register</h2>
          <p className="mt-1 text-sm text-gray-500">
            All matters currently recorded in the litigation system.
          </p>
        </div>

        {matters.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-white p-12 text-center">
            <h3 className="text-lg font-semibold">No matters yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Create the first matter to begin building the matter register.
            </p>

            <Link
              href="/matters/new"
              className="mt-5 inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Create Matter
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Matter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {matters.map((matter) => (
                    <tr key={matter.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold">{matter.title}</p>
                          <p className="mt-1 text-xs text-gray-500">
                            {matter.matterNumber}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {matter.client.name}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {matter.type.replaceAll("_", " ")}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                          {matter.status.replaceAll("_", " ")}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/matters/${matter.id}`}
                          className="text-sm font-semibold underline"
                        >
                          Open
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}