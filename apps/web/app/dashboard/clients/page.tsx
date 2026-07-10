import PageHeader from "@/components/dashboard/page-header";
import { clientService } from "@/services/client.service";
import ClientTable from "@/components/clients/client-table";

export default async function ClientsPage() {
  const response = await clientService.getAll();

  return (
    <div className="space-y-8">

      <PageHeader
        title="Clients"
        description="Manage all your photography clients."
      />

      <ClientTable
        clients={response.items}
      />

    </div>
  );
}