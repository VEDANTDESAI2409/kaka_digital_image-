import PageHeader from "@/components/dashboard/page-header";
import BookingForm from "@/components/bookings/booking-form";

export default function NewBookingPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="New Booking"
        description="Create a new photography booking."
      />

      <BookingForm />
    </div>
  );
}