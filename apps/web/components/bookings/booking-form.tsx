"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { bookingService } from "@/services/booking.service";
import { clientService } from "@/services/client.service";

interface BookingFormProps {
  initialData?: any;
}

export default function BookingForm({
  initialData,
}: BookingFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [clients, setClients] = useState<any[]>([]);

  const [form, setForm] = useState({
    clientId: initialData?.clientId ?? "",

    title: initialData?.title ?? "",

    description: initialData?.description ?? "",

    quotationAmount:
      initialData?.quotationAmount ?? 0,

    advanceAmount:
      initialData?.advanceAmount ?? 0,

    remainingAmount:
      initialData?.remainingAmount ?? 0,

    services:
      initialData?.services ?? [],

    events:
      initialData?.events ?? [
        {
          title: "",

          eventType: "WEDDING",

          startDate: "",

          endDate: "",

          venue: "",

          city: "",

          state: "",
        },
      ],
  });

  useEffect(() => {
    async function loadClients() {
      try {
        const res =
          await clientService.getAll({
            limit: 1000,
          });

        setClients(res.items);
      } catch (error) {
        console.error(error);
      }
    }

    loadClients();
  }, []);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,

      remainingAmount:
        Number(prev.quotationAmount) -
        Number(prev.advanceAmount),
    }));
  }, [
    form.quotationAmount,
    form.advanceAmount,
  ]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* ================= Booking Details ================= */}

      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Booking Details
      </h2>

      <div className="grid grid-cols-2 gap-6">

        {/* Client */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Client *
          </label>

          <select
            value={form.clientId}
            onChange={(e) =>
              setForm({
                ...form,
                clientId: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
          >
            <option value="">
              Select Client
            </option>

            {clients.map((client) => (
              <option
                key={client.id}
                value={client.id}
              >
                {client.primaryContactName}
              </option>
            ))}
          </select>
        </div>

        {/* Booking Title */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Booking Title *
          </label>

          <input
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
          />
        </div>

      </div>

      <div className="mt-6">

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Description
        </label>

        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          rows={4}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
        />

      </div>

      <hr className="my-10 border-slate-200" />

            {/* ================= Amount Details ================= */}

      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Payment Details
      </h2>

      <div className="grid grid-cols-3 gap-6">

        {/* Quotation */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Quotation Amount *
          </label>

          <input
            type="number"
            value={form.quotationAmount}
            onChange={(e) =>
              setForm({
                ...form,
                quotationAmount: Number(e.target.value),
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
          />
        </div>

        {/* Advance */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Advance Amount *
          </label>

          <input
            type="number"
            value={form.advanceAmount}
            onChange={(e) =>
              setForm({
                ...form,
                advanceAmount: Number(e.target.value),
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
          />
        </div>

        {/* Remaining */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Remaining Amount
          </label>

          <input
            value={form.remainingAmount}
            readOnly
            className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-900"
          />
        </div>

      </div>

      <hr className="my-10 border-slate-200" />

      {/* ================= Event Details ================= */}

      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Event Details
      </h2>

      <div className="grid grid-cols-2 gap-6">

        {/* Event Title */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Event Title
          </label>

          <input
            value={form.events[0].title}
            onChange={(e) => {
              const events = [...form.events];

              events[0].title = e.target.value;

              setForm({
                ...form,
                events,
              });
            }}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          />
        </div>

        {/* Event Type */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Event Type
          </label>

          <select
            value={form.events[0].eventType}
            onChange={(e) => {
              const events = [...form.events];

              events[0].eventType = e.target.value;

              setForm({
                ...form,
                events,
              });
            }}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            <option value="WEDDING">Wedding</option>
            <option value="ENGAGEMENT">Engagement</option>
            <option value="HALDI">Haldi</option>
            <option value="MEHENDI">Mehendi</option>
            <option value="RECEPTION">Reception</option>
            <option value="PRE_WEDDING">Pre Wedding</option>
            <option value="BIRTHDAY">Birthday</option>
            <option value="BABY_SHOWER">Baby Shower</option>
            <option value="MATERNITY">Maternity</option>
            <option value="CORPORATE">Corporate</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Start Date */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Start Date
          </label>

          <input
            type="date"
            value={form.events[0].startDate}
            onChange={(e) => {
              const events = [...form.events];

              events[0].startDate = e.target.value;

              setForm({
                ...form,
                events,
              });
            }}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          />
        </div>

        {/* End Date */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            End Date
          </label>

          <input
            type="date"
            value={form.events[0].endDate}
            onChange={(e) => {
              const events = [...form.events];

              events[0].endDate = e.target.value;

              setForm({
                ...form,
                events,
              });
            }}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          />
        </div>

      </div>

      <hr className="my-10 border-slate-200" />

            <div className="grid grid-cols-3 gap-6">

        {/* Venue */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Venue
          </label>

          <input
            value={form.events[0].venue}
            onChange={(e) => {
              const events = [...form.events];

              events[0].venue = e.target.value;

              setForm({
                ...form,
                events,
              });
            }}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          />
        </div>

        {/* City */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            City
          </label>

          <input
            value={form.events[0].city}
            onChange={(e) => {
              const events = [...form.events];

              events[0].city = e.target.value;

              setForm({
                ...form,
                events,
              });
            }}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          />
        </div>

        {/* State */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            State
          </label>

          <input
            value={form.events[0].state}
            onChange={(e) => {
              const events = [...form.events];

              events[0].state = e.target.value;

              setForm({
                ...form,
                events,
              });
            }}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          />
        </div>

      </div>

      <div className="mt-10 flex justify-end gap-4">

        <button
          type="button"
          onClick={() => router.push("/bookings")}
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
            ? "Update Booking"
            : "Save Booking"}
        </button>

      </div>

    </div>
  );

  async function handleSubmit() {
    try {
      setLoading(true);

      if (!form.clientId) {
        alert("Please select a client.");
        return;
      }

      if (!form.title) {
        alert("Please enter booking title.");
        return;
      }

      if (!form.events[0].title) {
        alert("Please enter event title.");
        return;
      }

      if (!form.events[0].startDate) {
        alert("Please select event start date.");
        return;
      }

      if (initialData) {
        await bookingService.update(
          initialData.id,
          form
        );

        alert("Booking updated successfully!");
      } else {
        await bookingService.create(form);

        alert("Booking created successfully!");
      }

      router.push("/bookings");

      router.refresh();

    } catch (error: any) {
      console.error(error);

      alert(
        JSON.stringify(
          error.response?.data ?? error.message,
          null,
          2
        )
      );
    } finally {
      setLoading(false);
    }
  }
}