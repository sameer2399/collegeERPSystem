import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    totalSlots: {
      type: Number,
      required: true,
    },
    slots: {
      type: Number,
      required: true,
    },
    entryFee: {
      type: Number,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    timing: {
      type: String,
      required: true,
    },
    organisedBy: {
      type: String,
      required: true,
    },
    rules: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled", "completed"],
      default: "active",
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
        delete ret.__v;
        delete ret.updatedAt;
        return ret;
      },
    },
  }
);

const eventModel = mongoose.model("Event", eventSchema);

export default eventModel;
