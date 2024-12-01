import Booking from "../models/bookings.js";

export const updateEventStatus = async (eventId, status) => {
  await Booking.updateMany(
    { eventId },
    { $set: { status: status } },
    { multi: true }
  );
};
