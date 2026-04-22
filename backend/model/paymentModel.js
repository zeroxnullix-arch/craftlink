import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "success", "failed"],
      default: "pending",
    },

    paymentResponse: {
      type: Object,
      default: {},
    },
    transactionId: {
      type: String,
      default: "",
    },
    isCredited: {
  type: Boolean,
  default: false,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", paymentSchema);
