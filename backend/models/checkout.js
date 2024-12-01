import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CheckoutSchema = new Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },
    auid: {
      type: String,
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
    isProcessed: {
      type: Boolean,
      default: false,
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

// Generate a sequence number for the orderId
CheckoutSchema.pre("save", function (next) {
  const orderId = this.orderId;
  if (!orderId) {
    this.orderId = `${Date.now()}${Math.floor(Math.random() * 100)}`;
  }
  next();
});

const Checkout = mongoose.model("Checkout", CheckoutSchema);

export default Checkout;
