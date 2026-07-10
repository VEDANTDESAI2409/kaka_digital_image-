export class DashboardResponse {
  stats: DashboardStatsResponse;

  upcomingEvents: any[];

  recentUploads: any[];

  recentBookings: DashboardBooking[];

  storage: StorageResponse;
}

export class DashboardStatsResponse {
  todayEvents: number;

  pendingUploads: number;

  activeClients: number;

  editingQueue: number;
}

export class StorageResponse {
  used: number;

  total: number;
}