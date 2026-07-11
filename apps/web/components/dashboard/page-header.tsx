import { CalendarDays } from "lucide-react";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-8 flex items-start justify-between">

      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        <p className="mt-3 text-lg text-slate-700">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-4">

        {action}

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">

          <CalendarDays
            size={20}
            className="text-violet-600"
          />

          <span className="font-medium text-slate-600">
            {today}
          </span>

        </div>

      </div>

    </div>
  );
}