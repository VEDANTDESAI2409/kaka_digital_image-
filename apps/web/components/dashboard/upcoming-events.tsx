import { CalendarDays, MapPin } from "lucide-react";
import { DashboardEvent } from "@/types/dashboard";

interface UpcomingEventsProps {
  events: DashboardEvent[];
}

export default function UpcomingEvents({
  events,
}: UpcomingEventsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-bold text-slate-900">
        Upcoming Events
      </h2>

      <div className="space-y-5">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between"
          >
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
                <CalendarDays
                  className="text-violet-600"
                  size={22}
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  {event.title}
                </h3>

                <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                  <MapPin size={14} />
                  {event.city ?? event.venue}
                </p>
              </div>
            </div>

            <span className="text-sm text-slate-500">
              {new Date(event.startDate).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}