import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    auid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    role: {
      type: String,
      required: true,
      default: "STUDENT",
      enum: ["STUDENT", "ADMIN", "MODERATOR", "BANNED"],
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
        // delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
