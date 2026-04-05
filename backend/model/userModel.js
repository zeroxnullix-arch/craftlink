import mongoose from "mongoose";
import { ROLES, ROLE_DESCRIPTIONS } from "../constants/roles.js";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    photoUrl: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    role: {
      type: Number,
      enum: Object.values(ROLES), // Roles: craftsman(1), instructor(2), client(3)
      required: true,
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    resetOtp: {
      type: String,
      select: false,
    },
    otpExpires: {
      type: Date,
      select: false,
    },
    isOtpVerifed: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ===================== Model Export ===================== //
// Virtuals
// Adds a computed `roleDescription` field when user documents are converted
// to JSON / objects (useful when returning user to clients)
userSchema.virtual("roleDescription").get(function () {
  return ROLE_DESCRIPTIONS?.[this.role] || "";
});

export default mongoose.model("User", userSchema);
