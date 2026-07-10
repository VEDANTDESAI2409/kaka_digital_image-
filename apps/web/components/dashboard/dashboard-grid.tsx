import { ReactNode } from "react";

interface DashboardGridProps {
  children: ReactNode;
}

export default function DashboardGrid({
  children,
}: DashboardGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-12">

      {children}

    </div>
  );
}