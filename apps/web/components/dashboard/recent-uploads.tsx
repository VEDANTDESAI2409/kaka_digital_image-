import { ImageIcon } from "lucide-react";
import { DashboardUpload } from "@/types/dashboard";

interface RecentUploadsProps {
  uploads: DashboardUpload[];
}

export default function RecentUploads({
  uploads,
}: RecentUploadsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-bold text-slate-900">
        Recent Uploads
      </h2>

      <div className="space-y-4">
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className="flex items-center gap-4"
          >
            <div className="rounded-xl bg-violet-100 p-3">
              <ImageIcon
                size={18}
                className="text-violet-600"
              />
            </div>

            <div className="flex-1">
              <p className="font-medium text-slate-900">
                {upload.originalName}
              </p>

              <p className="text-sm text-slate-500">
                {new Date(upload.createdAt).toLocaleString()}
              </p>
            </div>

            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
              {upload.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}