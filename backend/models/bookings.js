import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    auid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    paymentMode: {
      type: String,
      required: true,
      enum: ["Cash", "Online", "Voucher"],
    },
    paymentDetails: {
      type: Object,
      required: false,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "cancelled",
        "failed",
        "completed",
        "not attended",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
