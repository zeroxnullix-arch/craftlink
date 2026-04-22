import User from "../model/userModel.js";
import Course from "../model/courseModel.js";
import Payment from "../model/paymentModel.js";
import bcrypt from "bcryptjs";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not Found" })
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: `GetCurrentUser error ${error}` })
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { description, name, photoUrl } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, description, photoUrl },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `updateProfile error ${error}` });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Change password failed" });
  }
};

export const getPurchasedCourses = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID" });
    }

    const payments = await Payment.find({ user: userId, status: { $in: ["success", "paid"] } }).populate(
      {
        path: "course",
        select: "title subTitle price thumbnail category level creator lecturesCount isPublished enrolledCraftsmen",
        populate: { path: "creator", select: "name photoUrl" },
      }
    );

    const courses = payments
      .filter((payment) => payment.course)
      .map((payment) => ({
        ...payment.course.toObject(),
        paidAmount: payment.amount,
        paymentId: payment._id,
        paymentAt: payment.createdAt,
      }))
      .sort((a, b) => new Date(b.paymentAt) - new Date(a.paymentAt));

    return res.status(200).json(courses || []);
  } catch (error) {
    console.error("getPurchasedCourses error:", error?.message || error);
    return res.status(500).json({ message: "Failed to load purchased courses" });
  }
};

// NEW: Get user balance endpoint for Profile display
export const getUserBalance = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("balance");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ success: true, balance: user.balance || 0 });
  } catch (error) {
    console.error("getUserBalance error:", error);
    res.status(500).json({ message: "Failed to get balance" });
  }
};

export const getProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId } = req.params;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "User ID and Course ID are required" });
    }

    const user = await User.findById(userId).select("progress");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const courseProgress = (user.progress && user.progress[courseId]) || {};
    return res.status(200).json(courseProgress);
  } catch (error) {
    console.error("getProgress error:", error?.message || error);
    return res.status(500).json({ message: "Failed to get progress" });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId, lectureId, secondsWatched } = req.body;

    if (!userId || !courseId || !lectureId || secondsWatched === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.progress) {
      user.progress = {};
    }

    if (!user.progress[courseId]) {
      user.progress[courseId] = {};
    }

    const currentWatched = user.progress[courseId][lectureId] || 0;

    // Only update if new time is greater (prevent seeking back)
    if (secondsWatched > currentWatched) {
      user.progress[courseId][lectureId] = secondsWatched;
      user.markModified("progress");
      await user.save();
    }

    return res.status(200).json({ message: "Progress updated successfully" });
  } catch (error) {
    console.error("updateProgress error:", error?.message || error);
    return res.status(500).json({ message: "Failed to update progress" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Get user by id error",
      error: error.message,
    });
  }
};

