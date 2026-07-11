export type BookingStatus =
  | "INQUIRY"
  | "QUOTATION_SENT"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export type EventType =
  | "WEDDING"
  | "HALDI"
  | "MEHENDI"
  | "RECEPTION"
  | "ENGAGEMENT"
  | "PRE_WEDDING"
  | "BIRTHDAY"
  | "MATERNITY"
  | "BABY_SHOWER"
  | "CORPORATE"
  | "OTHER";

export interface BookingEvent {
  id?: string;

  title: string;

  eventType: EventType;

  startDate: string;

  endDate?: string;

  venue?: string;

  city?: string;

  state?: string;
}

export interface Booking {
  id: string;

  bookingNumber: string;

  clientId: string;

  client: {
    id: string;

    primaryContactName: string;

    primaryPhone: string;

    primaryEmail?: string;
  };

  title: string;

  description?: string;

  quotationAmount: number;

  advanceAmount: number;

  remainingAmount: number;

  services?: string[];

  status: BookingStatus;

  events: BookingEvent[];

  createdAt: string;

  updatedAt: string;
}

export interface CreateBookingDto {
  clientId: string;

  title: string;

  description?: string;

  quotationAmount: number;

  advanceAmount: number;

  services?: string[];

  events: BookingEvent[];
}

export interface UpdateBookingDto
  extends Partial<CreateBookingDto> {
  status?: BookingStatus;
}