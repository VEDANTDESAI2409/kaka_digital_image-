import Link from "next/link";
import {
  CalendarPlus,
  UserPlus,
  Upload,
  Briefcase,
} from "lucide-react";

const actions = [
  {
    title: "New Booking",
    href: "/bookings/new",
    icon: Briefcase,
  },
  {
    title: "Create Event",
    href: "/events/new",
    icon: CalendarPlus,
  },
  {
    title: "Add Client",
    href: "/clients/new",
    icon: UserPlus,
  },
  {
    title: "Upload Media",
    href: "/media/upload",
    icon: Upload,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-bold text-slate-900">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition-all hover:border-violet-300 hover:bg-violet-50"
            >
              <div className="rounded-lg bg-violet-100 p-3">
                <Icon
                  size={20}
                  className="text-violet-600"
                />
              </div>

              <span className="font-medium text-slate-800">
                {action.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}