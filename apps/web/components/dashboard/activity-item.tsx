import { LucideIcon } from "lucide-react";

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
}

export default function ActivityItem({
  title,
  description,
  time,
  icon: Icon,
}: ActivityItemProps) {
  return (
    <div className="flex gap-4">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">

        <Icon
          className="text-violet-600"
          size={20}
        />

      </div>

      <div className="flex-1">

        <p className="font-medium">
          {title}
        </p>

        <p className="text-sm text-slate-500">
          {description}
        </p>

      </div>

      <span className="text-sm text-slate-400 whitespace-nowrap">
        {time}
      </span>

    </div>
  );
}