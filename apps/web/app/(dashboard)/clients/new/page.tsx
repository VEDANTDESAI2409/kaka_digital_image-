import PageHeader from "@/components/dashboard/page-header";
import ClientForm from "@/components/clients/client-form";

export default function NewClientPage() {
  return (
    <div className="space-y-8">

      <PageHeader
        title="New Client"
        description="Create a new photography client."
      />

      <ClientForm />

    </div>
  );
}