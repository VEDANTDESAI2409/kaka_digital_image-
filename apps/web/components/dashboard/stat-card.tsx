import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  change,
  positive = true,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            {value}
          </h2>

          <div
            className={`mt-5 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
              positive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {positive ? (
              <ArrowUpRight size={14} />
            ) : (
              <ArrowDownRight size={14} />
            )}

            {change}
          </div>

        </div>

        <div className="rounded-2xl bg-violet-50 p-4">

          <Icon
            size={24}
            className="text-violet-600"
          />

        </div>

      </div>

    </div>
  );
}