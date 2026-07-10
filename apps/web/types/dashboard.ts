export interface DashboardEvent {
  id: string;
  title: string;
  venue: string;
  city: string | null;
  startDate: string;
}

export interface DashboardUpload {
  id: string;
  originalName: string;
  status: string;
  type: string;
  createdAt: string;
}

export interface DashboardBooking {
  id: string;
  bookingNumber: string;
  status: string;

  client: {
  primaryContactName: string;
};

  createdAt: string;
}