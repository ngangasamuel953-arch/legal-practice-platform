import Link from "next/link";
import { notFound } from "next/navigation";
import { getMatterById } from "@/lib/services/matters";

type MatterDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MatterDetailsPage({
  params,
}: MatterDetailsPageProps) {
  const { id } = await params;

  const matter = await getMatterById(id);

  if (!matter) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Ndungu Njoroge & Kwach Advocates LLP
              </p>

              <div className="mt-2 flex items-center gap-3">
                <h1 className="text-2xl font-bold">{matter.title}</h1>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold">
                  {matter.status.replaceAll("_", " ")}
                </span>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                {matter.matterNumber}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/matters"
                className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
              >
                Back to Matters
              </Link>

              <Link
                href={`/matters/${matter.id}/edit`}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
              >
                Edit Matter
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 overflow-x-auto rounded-xl border bg-white">
          <nav className="flex min-w-max">
            {[
              "Overview",
              "Parties",
              "Hearings",
              "Tasks",
              "Deadlines",
              "Documents",
              "Activity",
            ].map((tab, index) => (
              <span
                key={tab}
                className={`border-b-2 px-5 py-4 text-sm font-semibold ${
                  index === 0
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500"
                }`}
              >
                {tab}
              </span>
            ))}
          </nav>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Matter Information</h2>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Matter Number
                  </p>
                  <p className="mt-1 font-medium">{matter.matterNumber}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Matter Type
                  </p>
                  <p className="mt-1 font-medium">
                    {matter.type.replaceAll("_", " ")}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Client
                  </p>
                  <p className="mt-1 font-medium">{matter.client.name}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {matter.client.clientNumber}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Opened
                  </p>
                  <p className="mt-1 font-medium">
                    {new Date(matter.openedAt).toLocaleDateString("en-KE")}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Description</h2>

              <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                {matter.description || "No description has been added."}
              </p>
            </section>

            <section className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Internal Notes</h2>

              <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                {matter.notes || "No internal notes have been added."}
              </p>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Tasks</h2>

              {matter.tasks.length === 0 ? (
                <p className="mt-4 text-sm text-gray-500">
                  No tasks have been created.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {matter.tasks.map((task) => (
                    <div key={task.id} className="rounded-lg border p-3">
                      <p className="text-sm font-semibold">{task.title}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        {task.status.replaceAll("_", " ")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Deadlines</h2>

              {matter.deadlines.length === 0 ? (
                <p className="mt-4 text-sm text-gray-500">
                  No deadlines have been created.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {matter.deadlines.map((deadline) => (
                    <div key={deadline.id} className="rounded-lg border p-3">
                      <p className="text-sm font-semibold">
                        {deadline.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(deadline.dueAt).toLocaleDateString("en-KE")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Recent Activity</h2>

              {matter.activities.length === 0 ? (
                <p className="mt-4 text-sm text-gray-500">
                  No activity has been recorded yet.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {matter.activities.map((activity) => (
                    <div key={activity.id} className="rounded-lg border p-3">
                      <p className="text-sm font-semibold">
                        {activity.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(activity.createdAt).toLocaleString("en-KE")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}