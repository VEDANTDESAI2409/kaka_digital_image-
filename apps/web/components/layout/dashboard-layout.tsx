import Sidebar from "./sidebar";
import Navbar from "./navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">

      <Sidebar />

      <div className="flex flex-1 flex-col p-6">

        <Navbar />

        <main className="mt-6 flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}