import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-14">

      <div className="rounded-full bg-slate-100 p-5">

        <Inbox
          size={36}
          className="text-slate-400"
        />

      </div>

      <h3 className="mt-5 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-center text-slate-500">
        {description}
      </p>

    </div>
  );
}