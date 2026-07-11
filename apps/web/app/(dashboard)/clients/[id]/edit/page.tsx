"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import PageHeader from "@/components/dashboard/page-header";
import ClientForm from "@/components/clients/client-form";
import { clientService } from "@/services/client.service";

export default function EditClientPage() {
  const params = useParams();

  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    async function loadClient() {
      const data = await clientService.getById(
        params.id as string
      );

      setClient(data);
    }

    loadClient();
  }, [params.id]);

  if (!client) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit Client"
        description="Update client information."
      />

      <ClientForm initialData={client} />
    </div>
  );
}