"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/dashboard/page-header";
import BookingTable from "@/components/bookings/booking-table";
import PrimaryButton from "@/components/ui/primary-button";

import { bookingService } from "@/services/booking.service";
import { Booking } from "@/types/booking";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<any>(null);

  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("desc");

  async function loadBookings() {
    try {
      const params: Record<string, any> = {
        page,
        limit: 20,
        search,
      };

      if (sortBy) {
        params.sortBy = sortBy;
        params.order = order;
      }

      const res = await bookingService.getAll(params);

      console.log("Bookings Response:", res);

      setBookings(res.items);
      setMeta(res.meta);
    } catch (error) {
      console.error("Failed to load bookings:", error);
    }
  }

  useEffect(() => {
    loadBookings();
  }, [page, search, sortBy, order]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Bookings"
        description="Manage all your photography bookings."
        action={
          <PrimaryButton href="/bookings/new">
            + New Booking
          </PrimaryButton>
        }
      />

      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search by booking number, title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-96 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
        />

        <div className="flex gap-4">
         <select
  value={sortBy}
  onChange={(e) => {
    setSortBy(e.target.value);
    setPage(1);
  }}
  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 font-medium outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
>
            <option value="">No Sorting</option>
            <option value="createdAt">Created Date</option>
            <option value="title">Title</option>
            <option value="bookingNumber">Booking Number</option>
          </select>

          <select
  value={order}
  onChange={(e) => {
    setOrder(e.target.value);
    setPage(1);
  }}
  disabled={!sortBy}
  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 font-medium outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-200 disabled:bg-slate-100 disabled:text-slate-400"
>
  <option value="desc">Descending</option>
  <option value="asc">Ascending</option>
</select>
        
        </div>
</div>
     

      <BookingTable
        bookings={bookings}
        onDeleted={loadBookings}
      />

      {meta && (
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="font-medium text-slate-700">
            Showing {bookings.length} of {meta.total} bookings
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!meta.hasPreviousPage}
              className="rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-50"
            >
              Previous
            </button>

            <span className="flex items-center px-2">
              Page {meta.page} of {meta.totalPages}
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!meta.hasNextPage}
              className="rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}