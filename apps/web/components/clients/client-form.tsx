"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clientService } from "@/services/client.service";

interface ClientFormProps {
  initialData?: any;
}

export default function ClientForm({
  initialData,
}: ClientFormProps) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

const [form, setForm] = useState({
  primaryContactName: initialData?.primaryContactName ?? "",
  primaryPhone: initialData?.primaryPhone ?? "",
  primaryWhatsApp: initialData?.primaryWhatsApp ?? "",
  primaryEmail: initialData?.primaryEmail ?? "",
  partnerName: initialData?.partnerName ?? "",
  partnerPhone: initialData?.partnerPhone ?? "",
  partnerWhatsApp: initialData?.partnerWhatsApp ?? "",
  partnerEmail: initialData?.partnerEmail ?? "",
  address: initialData?.address ?? "",
  city: initialData?.city ?? "",
  state: initialData?.state ?? "",
  pincode: initialData?.pincode ?? "",
  notes: initialData?.notes ?? "",
});
async function handleSubmit() {
  try {
    setLoading(true);

    console.log("FORM DATA:", form);

    let res;

    if (initialData) {
      res = await clientService.update(
        initialData.id,
        form
      );

      alert("Client updated successfully!");
    } else {
      res = await clientService.create(form);

      alert("Client created successfully!");
    }

    console.log(res);

    router.push("/clients");
    router.refresh();
  } catch (error: any) {
    console.log("FULL ERROR:", error);

    console.log("RESPONSE:", error.response);

    console.log("DATA:", error.response?.data);

    alert(JSON.stringify(error.response?.data, null, 2));
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* ================= Client Information ================= */}

      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Client Information
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Primary Contact Name *
          </label>

          <input
            value={form.primaryContactName}
            onChange={(e) =>
              setForm({
                ...form,
                primaryContactName: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Primary Phone *
          </label>

          <input
            value={form.primaryPhone}
            onChange={(e) =>
              setForm({
                ...form,
                primaryPhone: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Primary WhatsApp
          </label>

          <input
            value={form.primaryWhatsApp}
            onChange={(e) =>
              setForm({
                ...form,
                primaryWhatsApp: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Primary Email
          </label>

          <input
            type="email"
            value={form.primaryEmail}
            onChange={(e) =>
              setForm({
                ...form,
                primaryEmail: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
          />
        </div>

      </div>

      <hr className="my-10 border-slate-200" />

      {/* ================= Partner Details ================= */}

      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Partner Details
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Partner Name
          </label>

          <input
            value={form.partnerName}
            onChange={(e) =>
              setForm({
                ...form,
                partnerName: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Partner Phone
          </label>

          <input
            value={form.partnerPhone}
            onChange={(e) =>
              setForm({
                ...form,
                partnerPhone: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Partner WhatsApp
          </label>

          <input
            value={form.partnerWhatsApp}
            onChange={(e) =>
              setForm({
                ...form,
                partnerWhatsApp: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Partner Email
          </label>

          <input
            type="email"
            value={form.partnerEmail}
            onChange={(e) =>
              setForm({
                ...form,
                partnerEmail: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
          />
        </div>

      </div>

      <hr className="my-10 border-slate-200" />

      {/* ================= Address ================= */}

      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Address
      </h2>

      <textarea
        value={form.address}
        onChange={(e) =>
          setForm({
            ...form,
            address: e.target.value,
          })
        }
        className="mb-6 h-28 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
      />

      <div className="grid grid-cols-3 gap-6">

        <input
          placeholder="City"
          value={form.city}
          onChange={(e) =>
            setForm({
              ...form,
              city: e.target.value,
            })
          }
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900"
        />

        <input
          placeholder="State"
          value={form.state}
          onChange={(e) =>
            setForm({
              ...form,
              state: e.target.value,
            })
          }
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900"
        />

        <input
          placeholder="Pincode"
          value={form.pincode}
          onChange={(e) =>
            setForm({
              ...form,
              pincode: e.target.value,
            })
          }
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900"
        />

      </div>

      <hr className="my-10 border-slate-200" />

      {/* ================= Notes ================= */}

      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Notes
      </h2>

      <textarea
        value={form.notes}
        onChange={(e) =>
          setForm({
            ...form,
            notes: e.target.value,
          })
        }
        className="mb-8 h-36 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900"
      />

      <div className="flex justify-end gap-4">

        <button
          type="button"
          onClick={() => router.push("/clients")}
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
  type="button"
  onClick={handleSubmit}
  disabled={loading}
  className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  {loading
    ? "Saving..."
    : initialData
      ? "Update Client"
      : "Save Client"}
</button>

      </div>

    </div>
  );
}