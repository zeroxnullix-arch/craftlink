import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema(
  {
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    accountInfo: {
      name: String,
      email: String,
      phone: String,
      vodafonePhone: String,
      address: String,
    },
    provider: {
      type: String,
      enum: ["vodafone_cash", "bank_transfer"],
      default: "vodafone_cash",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed", "failed"],
      default: "pending",
    },
    reason: {
      type: String,
    }, // For rejection reason
    requestDate: {
      type: Date,
      default: Date.now,
    },
    approvalDate: Date,
    completionDate: Date,
    transactionId: String,
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Withdrawal", withdrawalSchema);
