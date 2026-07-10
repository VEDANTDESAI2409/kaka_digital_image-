import { HardDrive } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StorageCardProps {
  used: number;
  total: number;
}

export default function StorageCard({
  used,
  total,
}: StorageCardProps) {
  const usedGB = used / 1024 / 1024 / 1024;
  const totalGB = total / 1024 / 1024 / 1024;

  const percentage = (used / total) * 100;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">
          Storage Usage
        </h2>

        <HardDrive className="text-violet-600" size={22} />
      </div>

      <Progress value={percentage} />

      <div className="mt-4 flex justify-between text-sm text-slate-500">
        <span>{usedGB.toFixed(2)} GB</span>
        <span>{totalGB.toFixed(0)} GB</span>
      </div>

      <p className="mt-4 text-center text-2xl font-bold text-violet-700">
        {percentage.toFixed(2)}%
      </p>
    </div>
  );
}