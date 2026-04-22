import Withdrawal from "../model/withdrawModel.js";
import User from "../model/userModel.js";
import Course from "../model/courseModel.js";
import Payment from "../model/paymentModel.js";

// Get instructor earnings
export const getInstructorEarnings = async (req, res) => {
  try {
    const instructorId = req.userId;

    // ================== GET WITHDRAWALS ==================
    const withdrawals = await Withdrawal.find({ instructor: instructorId })
      .select("amount status createdAt approvalDate")
      .sort({ createdAt: -1 });

    const totalWithdrawn = withdrawals
      .filter((w) => w.status === "completed")
      .reduce((sum, w) => sum + Number(w.amount), 0);

    const reservedAmount = withdrawals
      .filter((w) => ["pending", "approved"].includes(w.status))
      .reduce((sum, w) => sum + Number(w.amount), 0);

    const pendingAmount = withdrawals
      .filter((w) => w.status === "pending")
      .reduce((sum, w) => sum + Number(w.amount), 0);

    const approvedAmount = withdrawals
      .filter((w) => w.status === "approved")
      .reduce((sum, w) => sum + Number(w.amount), 0);

    // ================== GET COURSES ==================
    const courses = await Course.find({ creator: instructorId }).select("_id");
    const courseIds = courses.map((course) => course._id);

    // ================== GET PAYMENTS ==================
    const payments = await Payment.find({
      course: { $in: courseIds },
      status: { $in: ["paid", "success"] },
    }).select("amount");

    const totalEarnings = payments.reduce((sum, p) => sum + p.amount, 0);

    // ================== COMPUTE & SYNC BALANCE ==================
    const computedAvailable = totalEarnings - totalWithdrawn - reservedAmount;

    // 🔥 زامن الـ balance في DB مع الحساب الحقيقي
    await User.findByIdAndUpdate(instructorId, {
      $set: { balance: computedAvailable },
    });

    // ================== RESPONSE ==================
    res.json({
      success: true,
      totalEarnings,
      totalWithdrawn,
      pendingAmount,
      approvedAmount,
      reservedAmount,
      availableBalance: computedAvailable, // مصدر واحد للحقيقة
      withdrawals,
    });
  } catch (err) {
    console.error("Error getting earnings:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Request withdrawal
export const requestWithdrawal = async (req, res) => {
  try {
    const instructorId = req.userId;
    const userRole = req.user?.role;
    const { amount, accountInfo, provider = "vodafone_cash" } = req.body;

    if (userRole !== 2) {
      return res
        .status(403)
        .json({ message: "Only instructors can request withdrawals" });
    }

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ message: "Invalid withdrawal amount" });
    }

    if (!accountInfo || !accountInfo.name || !accountInfo.phone) {
      return res
        .status(400)
        .json({ message: "Account info is required (name and phone)" });
    }

    if (provider !== "vodafone_cash") {
      return res
        .status(400)
        .json({ message: "Only Vodafone Cash withdrawals are supported" });
    }

    // Get available balance from stored balance
    const instructor = await User.findById(instructorId).select("balance");
    const availableBalance = instructor?.balance || 0;

    if (Number(amount) > availableBalance) {
      return res.status(400).json({
        message: `Insufficient balance. Available: ${availableBalance} EGP`,
      });
    }

    // Deduct amount from balance (reserve it)
    // ✅ الصح
    const pendingRequest = await Withdrawal.findOne({
      instructor: instructorId,
      status: "pending",
    });
    if (pendingRequest) {
      return res
        .status(400)
        .json({ message: "You already have a pending withdrawal request" });
    }

    // بعدين الخصم
    await User.findByIdAndUpdate(instructorId, {
      $inc: { balance: -Number(amount) },
    });

    // Create withdrawal request
    const withdrawal = await Withdrawal.create({
      instructor: instructorId,
      amount: Number(amount),
      accountInfo,
      provider,
      status: "pending",
    });

    res.json({
      success: true,
      message: "Withdrawal request submitted successfully",
      withdrawal,
    });
  } catch (err) {
    console.error("Error requesting withdrawal:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get withdrawal history (for instructor)
export const getWithdrawalHistory = async (req, res) => {
  try {
    const instructorId = req.userId;

    const withdrawals = await Withdrawal.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    res.json({ success: true, withdrawals });
  } catch (err) {
    console.error("Error getting withdrawal history:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==================== ADMIN FUNCTIONS ====================

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // التأكد من صلاحية المستخدم
    if (req.user?.role !== 0) {
      return res.status(403).json({ message: "Access denied" });
    }

    // ================== Users ==================
    const instructors = await User.countDocuments({ role: 2 });
    const craftsmen = await User.countDocuments({ role: 1 });
    const clients = await User.countDocuments({ role: 3 });
    const admins = await User.countDocuments({ role: 0 });
    const totalUsers = instructors + craftsmen + clients + admins;

    // ================== Courses ==================
    const totalCourses = await Course.countDocuments();
    const totalEnrollmentsAgg = await Course.aggregate([
      { $group: { _id: null, total: { $sum: { $size: "$enrolledCraftsmen" } } } }
    ]);
    const totalEnrollments = totalEnrollmentsAgg[0]?.total || 0;

    // ================== Payments ==================
    const totalRevenueAgg = await Payment.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, total: { $sum: { $toDouble: "$amount" } } } }
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    // ================== Withdrawals ==================
    // نجمع كل الحالات مرة واحدة لتجنب مشاكل الـ aggregation الفارغ
    const withdrawalStats = await Withdrawal.aggregate([
      {
        $group: {
          _id: "$status",
          total: { $sum: { $toDouble: "$amount" } },
          count: { $sum: 1 }
        }
      }
    ]);

    let totalWithdrawn = 0;
    let totalReserved = 0;
    let pendingWithdrawals = 0;

    withdrawalStats.forEach((w) => {
      if (w._id === "completed") totalWithdrawn = w.total;
      if (["pending", "approved"].includes(w._id)) totalReserved += w.total;
      if (w._id === "pending") pendingWithdrawals = w.count;
    });

    const totalAvailableBalance = totalRevenue - totalWithdrawn - totalReserved;

    // ================== Response ==================
    res.json({
      success: true,
      users: {
        instructors,
        craftsmen,
        clients,
        admins,
        total: totalUsers,
      },
      courses: {
        total: totalCourses,
        enrollments: totalEnrollments,
      },
      revenue: {
        total: totalRevenue,
      },
      withdrawals: {
        pending: pendingWithdrawals,
        totalWithdrawn,
        totalReserved,
        totalAvailableBalance,
      },
    });

  } catch (err) {
    console.error("Error getting dashboard stats:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all withdrawal requests (for admin)
export const getAllWithdrawals = async (req, res) => {
  try {
    if (req.user?.role !== 0) {
      return res.status(403).json({ message: "Access denied" });
    }
    const { status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) query.status = status;

    const withdrawals = await Withdrawal.find(query)
      .populate("instructor", "name photoUrl email phone")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Withdrawal.countDocuments(query);

    res.json({
      success: true,
      withdrawals,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: withdrawals.length,
      },
    });
  } catch (err) {
    console.error("Error getting withdrawals:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Approve withdrawal request
export const approveWithdrawal = async (req, res) => {
  try {
    if (req.user?.role !== 0) {
      return res
        .status(403)
        .json({ message: "Only admin can approve withdrawals" });
    }
    const { withdrawalId } = req.params;
    const { notes } = req.body;

    const withdrawal = await Withdrawal.findById(withdrawalId);

    if (!withdrawal) {
      return res.status(404).json({ message: "Withdrawal request not found" });
    }

    if (withdrawal.status !== "pending") {
      return res.status(400).json({
        message: `Cannot approve withdrawal with status: ${withdrawal.status}`,
      });
    }

    // Update status
    withdrawal.status = "approved";
    withdrawal.approvalDate = new Date();
    if (notes) withdrawal.notes = notes;

    await withdrawal.save();

    res.json({
      success: true,
      message: "Withdrawal approved successfully",
      withdrawal,
    });
  } catch (err) {
    console.error("Error approving withdrawal:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Reject withdrawal request
export const rejectWithdrawal = async (req, res) => {
  try {
    if (req.user?.role !== 0) {
      return res
        .status(403)
        .json({ message: "Only admin can reject withdrawals" });
    }
    const { withdrawalId } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ message: "Rejection reason is required" });
    }

    const withdrawal = await Withdrawal.findById(withdrawalId);

    if (!withdrawal) {
      return res.status(404).json({ message: "Withdrawal request not found" });
    }

    if (withdrawal.status !== "pending") {
      return res.status(400).json({
        message: `Cannot reject withdrawal with status: ${withdrawal.status}`,
      });
    }

    withdrawal.status = "rejected";
    withdrawal.reason = reason;
    withdrawal.approvalDate = new Date();
    await withdrawal.save();

    // إرجاع المبلغ للمستخدم
    await User.findByIdAndUpdate(withdrawal.instructor, {
      $inc: { balance: withdrawal.amount },
    });

    res.json({
      success: true,
      message: "Withdrawal rejected successfully",
      withdrawal,
    });
  } catch (err) {
    console.error("Error rejecting withdrawal:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Complete withdrawal (mark as transferred)
export const completeWithdrawal = async (req, res) => {
  try {
    if (req.user?.role !== 0) {
      return res
        .status(403)
        .json({ message: "Only admin can complete withdrawals" });
    }
    const { withdrawalId } = req.params;
    const { transactionId } = req.body;

    const withdrawal = await Withdrawal.findById(withdrawalId);

    if (!withdrawal) {
      return res.status(404).json({ message: "Withdrawal request not found" });
    }

    if (withdrawal.status !== "approved") {
      return res.status(400).json({
        message: `Cannot complete withdrawal with status: ${withdrawal.status}`,
      });
    }

    withdrawal.status = "completed";
    withdrawal.completionDate = new Date();
    if (transactionId) withdrawal.transactionId = transactionId;

    await withdrawal.save();

    res.json({
      success: true,
      message: "Withdrawal completed successfully",
      withdrawal,
    });
  } catch (err) {
    console.error("Error completing withdrawal:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all users (for admin)
export const getAllUsers = async (req, res) => {
  try {
    const { role, search, page = 1, limit = 10 } = req.query;

    const query = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    const instructorIds = users
      .filter((user) => user.role === 2)
      .map((user) => user._id);

    let instructorStats = {};
    if (instructorIds.length > 0) {
      const courses = await Course.find({
        creator: { $in: instructorIds },
      }).select("_id creator");

      const courseCreatorMap = {};
      const courseIds = courses.map((course) => {
        courseCreatorMap[course._id.toString()] = course.creator.toString();
        return course._id;
      });

      const payments = await Payment.find({
        course: { $in: courseIds },
        status: "success",
      }).select("amount course");

      const earningsByInstructor = {};
      payments.forEach((payment) => {
        const creatorId = courseCreatorMap[payment.course.toString()];
        if (!creatorId) return;
        earningsByInstructor[creatorId] =
          (earningsByInstructor[creatorId] || 0) + payment.amount;
      });

      const withdrawals = await Withdrawal.find({
        instructor: { $in: instructorIds },
        status: { $in: ["pending", "approved", "completed"] },
      }).select("amount status instructor");

      const withdrawnByInstructor = {};
      const reservedByInstructor = {};

      withdrawals.forEach((withdrawal) => {
        const instructorId = withdrawal.instructor.toString();
        if (withdrawal.status === "completed") {
          withdrawnByInstructor[instructorId] =
            (withdrawnByInstructor[instructorId] || 0) + withdrawal.amount;
        }
        if (["pending", "approved"].includes(withdrawal.status)) {
          reservedByInstructor[instructorId] =
            (reservedByInstructor[instructorId] || 0) + withdrawal.amount;
        }
      });

      instructorIds.forEach((instructorId) => {
        const totalEarnings = earningsByInstructor[instructorId] || 0;
        const totalWithdrawn = withdrawnByInstructor[instructorId] || 0;
        const reservedAmount = reservedByInstructor[instructorId] || 0;
        instructorStats[instructorId.toString()] = {
          totalEarnings,
          totalWithdrawn,
          reservedAmount,
          availableBalance: totalEarnings - totalWithdrawn - reservedAmount,
        };
      });
    }

    const usersWithStats = users.map((user) => {
      const stats = instructorStats[user._id.toString()] || {
        totalEarnings: 0,
        totalWithdrawn: 0,
        reservedAmount: 0,
        availableBalance: 0,
      };
      return { ...user.toObject(), instructorStats: stats };
    });

    res.json({
      success: true,
      users: usersWithStats,
      totalItems: total,
      pagination: {
        current: page,
        totalPages: Math.ceil(total / limit),
        count: users.length,
      },
    });
  } catch (err) {
    console.error("Error getting users:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Block/Unblock user
export const toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      success: true,
      message: `User ${user.isActive ? "activated" : "deactivated"} successfully`,
      user,
    });
  } catch (err) {
    console.error("Error toggling user status:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
