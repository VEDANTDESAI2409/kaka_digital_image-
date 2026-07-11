import { CalendarCheck } from "lucide-react";
import { DashboardBooking } from "@/types/dashboard";

interface RecentBookingsProps {
  bookings: DashboardBooking[];
}

export default function RecentBookings({
  bookings,
}: RecentBookingsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-bold text-slate-900">
        Recent Bookings
      </h2>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center justify-between border-b pb-3 last:border-0"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-violet-100 p-3">
                <CalendarCheck
                  size={18}
                  className="text-violet-600"
                />
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  {booking.bookingNumber}
                </p>

                <p className="text-sm text-slate-500">
                  {booking.client.primaryContactName}
                </p>
              </div>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              {booking.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}