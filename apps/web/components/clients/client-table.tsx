"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

import { Client } from "@/types/client";
import { clientService } from "@/services/client.service";

interface ClientTableProps {
  clients: Client[];
  onDeleted: () => void;
}

export default function ClientTable({
  clients,
  onDeleted,
}: ClientTableProps) {
  async function handleDelete(id: string) {
    const ok = confirm(
      "Are you sure you want to delete this client?"
    );

    if (!ok) return;

    try {
      await clientService.delete(id);

      alert("Client deleted successfully!");

      onDeleted();
    } catch (error) {
      console.error(error);
      alert("Failed to delete client");
    }
  }

  if (clients.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800">
          No clients found
        </h3>

        <p className="mt-2 text-slate-500">
          Try changing your search or create a new client.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left font-semibold text-slate-800">
              Name
            </th>

            <th className="p-4 text-left font-semibold text-slate-800">
              Phone
            </th>

            <th className="p-4 text-left font-semibold text-slate-800">
              Email
            </th>

            <th className="p-4 text-left font-semibold text-slate-800">
              City
            </th>

            <th className="p-4 text-left font-semibold text-slate-800">
              Created At
            </th>

            <th className="p-4 text-center font-semibold text-slate-800">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <tr
              key={client.id}
              className="border-t transition hover:bg-slate-50"
            >
              <td className="p-4 font-medium text-slate-900">
                {client.primaryContactName}
              </td>

              <td className="p-4 text-slate-700">
                {client.primaryPhone || "-"}
              </td>

              <td className="p-4 text-slate-700">
                {client.primaryEmail || "-"}
              </td>

              <td className="p-4 text-slate-700">
                {client.city || "-"}
              </td>

               <td className="p-4 text-slate-700">
                {client.createdAt ? new Date(client.createdAt).toLocaleDateString() : "-"}
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-3">
                  <Link
                    href={`/clients/${client.id}/edit`}
                    className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() => handleDelete(client.id)}
                    className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}