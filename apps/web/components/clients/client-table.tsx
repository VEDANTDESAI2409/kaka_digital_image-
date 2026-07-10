import { Client } from "@/types/client";

interface ClientTableProps {
  clients: Client[];
}

export default function ClientTable({
  clients,
}: ClientTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Phone
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              City
            </th>

          </tr>

        </thead>

        <tbody>

          {clients.map((client) => (

            <tr
              key={client.id}
              className="border-t"
            >

              <td className="p-4">

                {client.primaryContactName}

              </td>

              <td className="p-4">

                {client.primaryPhone}

              </td>

              <td className="p-4">

                {client.primaryEmail}

              </td>

              <td className="p-4">

                {client.city}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}