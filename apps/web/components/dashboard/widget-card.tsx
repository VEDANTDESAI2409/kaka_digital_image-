import { ReactNode } from 'react';

interface WidgetCardProps {
  title: string;
  children: ReactNode;
}

export default function WidgetCard({
  title,
  children,
}: WidgetCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-slate-900">
        {title}
      </h2>

      {children}
    </div>
  );
}