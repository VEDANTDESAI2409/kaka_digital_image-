"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

import { Booking } from "@/types/booking";
import { bookingService } from "@/services/booking.service";

interface BookingTableProps {
  bookings: Booking[];
  onDeleted: () => void;
}

export default function BookingTable({
  bookings,
  onDeleted,
}: BookingTableProps) {
  async function handleDelete(id: string) {
    const ok = confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!ok) return;

    try {
      await bookingService.delete(id);

      alert("Booking deleted successfully!");

      onDeleted();
    } catch (error) {
      console.error(error);
      alert("Failed to delete booking");
    }
  }

  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800">
          No bookings found
        </h3>

        <p className="mt-2 text-slate-500">
          Create your first booking.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left font-semibold text-slate-800">Title</th>
            <th className="p-4 text-left font-semibold text-slate-800">Client</th>
            <th className="p-4 text-left font-semibold text-slate-800">Quotation</th>
            <th className="p-4 text-left font-semibold text-slate-800">Advance</th>
            <th className="p-4 text-left font-semibold text-slate-800">Created</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="p-4 text-slate-700">
                {booking.title}
              </td>

              <td className="p-4 text-slate-700">
                {booking.client?.primaryContactName ?? "-"}
              </td>

              <td className="p-4 text-slate-700">
                ₹ {Number(booking.quotationAmount).toLocaleString("en-IN")}
              </td>

              <td className="p-4 text-slate-700">
                ₹ {Number(booking.advanceAmount).toLocaleString("en-IN")}
              </td>

              <td className="p-4 text-slate-700">
                {new Date(
                  booking.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="p-4 text-slate-700">
                <div className="flex justify-center gap-3">
                  <Link
                    href={`/bookings/${booking.id}/edit`}
                    className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(booking.id)
                    }
                    className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
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