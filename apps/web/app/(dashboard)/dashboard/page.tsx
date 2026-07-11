import PageHeader from "@/components/dashboard/page-header";
import StatsGrid from "@/components/dashboard/stats-grid";
import StatCard from "@/components/dashboard/stat-card";
import UpcomingEvents from "@/components/dashboard/upcoming-events";
import RecentUploads from "@/components/dashboard/recent-uploads";
import StorageCard from "@/components/dashboard/storage-card";
import QuickActions from "@/components/dashboard/quick-actions";
import RecentBookings from "@/components/dashboard/recent-bookings";
import { dashboardService } from "@/services/dashboard.service";

import {
  CalendarDays,
  Images,
  Users,
  Clock3,
} from "lucide-react";

export default async function DashboardPage() {
  const dashboard = await dashboardService.getDashboard();

  return (
    <div className="space-y-8">

      <PageHeader
        title="Good Morning, Vedant 👋"
        description="Here's what's happening with your business today."
      />

      <StatsGrid>
        <StatCard
          title="Today's Events"
          value={dashboard.stats.todayEvents.toString()}
          change="+2 Today"
          icon={CalendarDays}
        />

        <StatCard
          title="Pending Uploads"
          value={dashboard.stats.pendingUploads.toString()}
          change="+42 Files"
          icon={Images}
        />

        <StatCard
          title="Active Clients"
          value={dashboard.stats.activeClients.toString()}
          change="+6 Clients"
          icon={Users}
        />

        <StatCard
          title="Editing Queue"
          value={dashboard.stats.editingQueue.toString()}
          change="-3 Completed"
          positive={false}
          icon={Clock3}
        />
      </StatsGrid>

      {/* Upcoming Events + Recent Uploads */}
      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingEvents events={dashboard.upcomingEvents} />
        <RecentUploads uploads={dashboard.recentUploads} />
      </div>

      {/* Storage + Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <StorageCard
          used={dashboard.storage.used}
          total={dashboard.storage.total}
        />

        <QuickActions />
      </div>

      {/* Recent Bookings */}
      <div className="grid gap-6">
        <RecentBookings
          bookings={dashboard.recentBookings}
        />
      </div>

    </div>
  );
}