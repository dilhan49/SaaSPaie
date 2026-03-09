"use client";

import { useEffect, useState } from "react";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  status?: string;
};

type NewEmployeeForm = {
  firstName: string;
  lastName: string;
  email: string;
  status: string;
};

const initialForm: NewEmployeeForm = {
  firstName: "",
  lastName: "",
  email: "",
  status: "",
};

export default function EmployeesView() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState<NewEmployeeForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const backendBaseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";

  async function loadEmployees() {
    try {
      setError(null);
      const response = await fetch(`${backendBaseUrl}/employees`);
      if (!response.ok) {
        throw new Error("Impossible de charger les salariés");
      }
      const data = (await response.json()) as Employee[];
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    }
  }

  useEffect(() => {
    void loadEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${backendBaseUrl}/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du salarié");
      }

      setForm(initialForm);
      await loadEmployees();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Gestion des salariés
          </h1>
          <p className="text-sm text-zinc-600">
            Crée des salariés dans le backend NestJS et visualise la liste.
          </p>
        </header>

        <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-100">
          <h2 className="mb-4 text-lg font-medium">Nouveau salarié</h2>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Prénom</label>
              <input
                required
                className="rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none ring-0 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                value={form.firstName}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    firstName: event.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Nom</label>
              <input
                required
                className="rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none ring-0 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                value={form.lastName}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    lastName: event.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none ring-0 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                value={form.email}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    email: event.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Statut</label>
              <input
                placeholder="Cadre, Non-cadre..."
                className="rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none ring-0 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                value={form.status}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    status: event.target.value,
                  }))
                }
              />
            </div>

            <div className="md:col-span-2 flex items-center justify-between gap-4 pt-2">
              {error && (
                <p className="text-sm text-red-600">
                  Erreur : <span className="font-medium">{error}</span>
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="ml-auto inline-flex items-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
              >
                {loading ? "Enregistrement..." : "Créer le salarié"}
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-100">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">Liste des salariés</h2>
            <button
              type="button"
              onClick={() => {
                void loadEmployees();
              }}
              className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
            >
              Rafraîchir
            </button>
          </div>
          {employees.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Aucun salarié pour le moment.
            </p>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {employees.map((employee) => (
                <li
                  key={employee.id}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {employee.firstName} {employee.lastName}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {employee.email ?? "Email non renseigné"}
                    </p>
                  </div>
                  {employee.status && (
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                      {employee.status}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

