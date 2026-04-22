import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "@services/api";
import { toast } from "react-toastify";
import Nav from "../../../components/dashboard/components/Nav";
import SideBar from "../../../components/dashboard/components/SideBar";
import { useTheme } from "../../../context/ThemeContext";
import { PiUserCircleDashed, PiSubtitlesBold } from "@icons";
import { BsCurrencyPound } from "react-icons/bs";
import image from "../../../assets/img/image.png";
import userAvatar from "../../../assets/img/userAvatar.jpg";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();
  const [sidebarHide, setSidebarHide] = useState(false);
  const [searchShow, setSearchShow] = useState(false);

  const [stats, setStats] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersTotal, setUsersTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("stats"); // stats, withdrawals, users

  const { userData: currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    return () => document.body.classList.remove("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    // Check if user is admin
    // if (currentUser?.role !== 0) {
    //   navigate("/profile");
    //   return;
    // }

    loadDashboardData();
  }, [currentUser]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load stats
      const statsRes = await api.get("/api/withdrawal/admin/dashboard-stats", {
        withCredentials: true,
      });
      if (statsRes.data?.success) {
        setStats(statsRes.data);
      }

      // Load withdrawals
      const withdrawalsRes = await api.get("/api/withdrawal/admin/withdrawals", {
      // const withdrawalsRes = await api.get("/api/withdrawal/admin/withdrawals?status=pending", {
        withCredentials: true,
      });
      if (withdrawalsRes.data?.success) {
        setWithdrawals(withdrawalsRes.data.withdrawals);
      }

      // Load users
      const usersRes = await api.get("/api/withdrawal/admin/users?limit=100", {
        withCredentials: true,
      });
      if (usersRes.data?.success) {
        setUsers(usersRes.data.users);
        setUsersTotal(usersRes.data.totalItems || 0);
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
      toast.error("فشل تحميل بيانات لوحة التحكم");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveWithdrawal = async (withdrawalId) => {
    try {
      const res = await api.post(
        `/api/withdrawal/admin/approve/${withdrawalId}`,
        { notes: "Approved by admin" },
        { withCredentials: true }
      );

      if (res.data?.success) {
        toast.success("تم الموافقة على الطلب");
        loadDashboardData();
      }
    } catch (error) {
      console.error("Error approving withdrawal:", error);
      toast.error("فشل الموافقة على الطلب");
    }
  };

  const handleRejectWithdrawal = async (withdrawalId) => {
   const reason = prompt("أدخل سبب الرفض:");

if (!reason || !reason.trim()) {
  toast.error("لازم تكتب سبب الرفض");
  return;
}

    try {
const res = await api.post(
  `/api/withdrawal/admin/reject/${withdrawalId}`,
  { reason: reason.trim() },
  {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  }
);

      if (res.data?.success) {
        toast.success("تم رفض الطلب");
        loadDashboardData();
      }
    } catch (error) {
      console.error("Error rejecting withdrawal:", error);
      toast.error("فشل رفض الطلب");
    }
  };

  const handleCompleteWithdrawal = async (withdrawalId) => {
    const transactionId = prompt("أدخل رقم المعاملة (اختياري):");

    try {
      const res = await api.post(
        `/api/withdrawal/admin/complete/${withdrawalId}`,
        { transactionId: transactionId || "" },
        { withCredentials: true }
      );

      if (res.data?.success) {
        toast.success("تم إكمال التحويل");
        loadDashboardData();
      }
    } catch (error) {
      console.error("Error completing withdrawal:", error);
      toast.error("فشل إكمال التحويل");
    }
  };

  const handleToggleUserStatus = async (userId) => {
    try {
      const res = await api.post(
        `/api/withdrawal/admin/toggle-user/${userId}`,
        {},
        { withCredentials: true }
      );

      if (res.data?.success) {
        toast.success(res.data.message);
        loadDashboardData();
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
      toast.error("فشل تغيير حالة المستخدم");
    }
  };

  const getRoleName = (role) => {
    const roles = { 0: "مسئول", 1: "حرفي", 2: "مدرب", 3: "عميل" };
    return roles[role] || "غير محدد";
  };

  if (loading) {
    return <div>جاري التحميل...</div>;
  }










  
  return (
    <div>
      <SideBar sidebarHide={sidebarHide} activeMenu={0} setActiveMenu={() => {}} />
      <section id="content">
        <Nav
          sidebarHide={sidebarHide}
          setSidebarHide={setSidebarHide}
          searchShow={searchShow}
          setSearchShow={setSearchShow}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <main>
          <div className="admin-dashboard">
            {/* Header */}
            <div className="admin-header">
              <h1>لوحة تحكم النظام</h1>
              <p>أهلاً بك، {currentUser?.firstName || "المسئول"}</p>
            </div>

            {/* Tabs */}
            <div className="admin-tabs">
              <button
                className={`tab-btn ${activeTab === "stats" ? "active" : ""}`}
                onClick={() => setActiveTab("stats")}
              >
                <BsCurrencyPound/> الإحصائيات
              </button>
              <button
                className={`tab-btn ${activeTab === "withdrawals" ? "active" : ""}`}
                onClick={() => setActiveTab("withdrawals")}
              >
                <PiSubtitlesBold /> طلبات السحب ({withdrawals.length})
              </button>
              <button
                className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
                onClick={() => setActiveTab("users")}
              >
                <PiUserCircleDashed /> المستخدمون ({users.length} من {usersTotal})
              </button>
            </div>

            {/* Content */}
            {activeTab === "stats" && stats && (
              <div className="admin-stats">
                <div className="stats-grid">
                  <div className="stat-card instructors">
                    <div className="stat-icon">👨‍🏫</div>
                    <div className="stat-content">
                      <h3>المدرسون</h3>
                      <p className="stat-number">{stats.users.instructors}</p>
                    </div>
                  </div>

                  <div className="stat-card craftsmen">
                    <div className="stat-icon">🔧</div>
                    <div className="stat-content">
                      <h3>الحرفيون</h3>
                      <p className="stat-number">{stats.users.craftsmen}</p>
                    </div>
                  </div>

                  <div className="stat-card clients">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                      <h3>العملاء</h3>
                      <p className="stat-number">{stats.users.clients}</p>
                    </div>
                  </div>

                  <div className="stat-card total">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                      <h3>إجمالي المستخدمين</h3>
                      <p className="stat-number">{stats.users.total}</p>
                    </div>
                  </div>

                  <div className="stat-card courses">
                    <div className="stat-icon">📚</div>
                    <div className="stat-content">
                      <h3>الكورسات</h3>
                      <p className="stat-number">{stats.courses.total}</p>
                    </div>
                  </div>

                  <div className="stat-card enrollments">
                    <div className="stat-icon">📝</div>
                    <div className="stat-content">
                      <h3>عمليات الالتحاق</h3>
                      <p className="stat-number">{stats.courses.enrollments}</p>
                    </div>
                  </div>

                  <div className="stat-card revenue">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                      <h3>إجمالي الإيرادات</h3>
                      <p className="stat-number">{stats.revenue.total} EGP</p>
                    </div>
                  </div>

                  <div className="stat-card withdrawn">
                    <div className="stat-icon">💸</div>
                    <div className="stat-content">
                      <h3>المسحوب</h3>
                      <p className="stat-number">{stats.withdrawals?.totalWithdrawn} EGP</p>
                    </div>
                  </div>

                  <div className="stat-card available">
                    <div className="stat-icon">🟢</div>
                    <div className="stat-content">
                      <h3>إجمالي الرصيد المتاح</h3>
                      <p className="stat-number">{stats.withdrawals?.totalAvailableBalance} EGP</p>
                    </div>
                  </div>

                  <div className="stat-card pending">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-content">
                      <h3>طلبات معلقة</h3>
                      <p className="stat-number">{stats.withdrawals.pending}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "withdrawals" && (
              <div className="admin-withdrawals">
                <h2>طلبات السحب</h2>
                {stats && (
                  <div className="withdraw-summary-cards">
                    <div className="summary-card">
                      <span>إجمالي المبالغ المسحوبة</span>
                      <strong>{stats.withdrawals.totalWithdrawn} EGP</strong>
                    </div>
                    <div className="summary-card">
                      <span>الطلبات المعلقة</span>
                      <strong>{stats.withdrawals.pending}</strong>
                    </div>
                  </div>
                )}
                {withdrawals.length === 0 ? (
                  <p className="empty-state">لا توجد طلبات معلقة</p>
                ) : (
                  <div className="withdrawals-list">
                    {withdrawals.map((w) => (
                      <div key={w._id} className="withdrawal-card">
                        <div className="withdrawal-header">
                          <div>
                            <h4>{w.instructor.firstName} {w.instructor.lastName}</h4>
                            <p>{w.instructor.email}</p>
                          </div>
                          <div className={`status-badge ${w.status}`}>{w.status}</div>
                        </div>

                        <div className="withdrawal-body">
                          <div className="info-row">
                            <span className="label">المبلغ:</span>
                            <span className="value">{w.amount} EGP</span>
                          </div>
                          <div className="info-row">
                            <span className="label">الاسم:</span>
                            <span className="value">{w.accountInfo?.name}</span>
                          </div>
                          <div className="info-row">
                            <span className="label">طريقة السحب:</span>
                            <span className="value">{w.provider === "vodafone_cash" ? "Vodafone Cash" : w.provider}</span>
                          </div>
                          <div className="info-row">
                            <span className="label">الهاتف:</span>
                            <span className="value">{w.accountInfo?.phone}</span>
                          </div>
                          <div className="info-row">
                            <span className="label">رقم محفظة فودافون كاش:</span>
                            <span className="value">{w.accountInfo?.vodafonePhone || "---"}</span>
                          </div>
                          <div className="info-row">
                            <span className="label">البريد:</span>
                            <span className="value">{w.accountInfo?.email}</span>
                          </div>
                          <div className="info-row">
                            <span className="label">تاريخ الطلب:</span>
                            <span className="value">
                              {new Date(w.requestDate).toLocaleDateString("ar-EG")}
                            </span>
                          </div>
                        </div>

                        <div className="withdrawal-actions">
                          {w.status === "pending" && (
                            <>
                              <button
                                className="btn-approve"
                                onClick={() => handleApproveWithdrawal(w._id)}
                              >
                                ✓ الموافقة
                              </button>
                              <button
                                className="btn-reject"
                                onClick={() => handleRejectWithdrawal(w._id)}
                              >
                                ✗ الرفض
                              </button>
                            </>
                          )}
                          {w.status === "approved" && (
                            <button
                              className="btn-complete"
                              onClick={() => handleCompleteWithdrawal(w._id)}
                            >
                              ✓ تأكيد التحويل
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "users" && (
              <div className="admin-users">
                <h2>المستخدمون</h2>
                <div className="users-table">
                  <table>
                    <thead>
                      <tr>
                        <th>الاسم</th>
                        <th>البريد</th>
                        <th>الهاتف</th>
                        <th>النوع</th>
                        <th>المسحوب</th>
                        <th>الرصيد المتاح</th>
                        <th>الحالة</th>
                        <th>الإجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td>{user.firstName} {user.lastName}</td>
                          <td>{user.email}</td>
                          <td>{user.phone || "---"}</td>
                          <td>{getRoleName(user.role)}</td>
                          <td>
                            {user.role === 2
                              ? `${user.instructorStats?.totalWithdrawn || 0} EGP`
                              : "-"}
                          </td>
                          <td>
                            {user.role === 2
                              ? `${user.instructorStats?.availableBalance || 0} EGP`
                              : "-"}
                          </td>
                          <td>
                            <span className={`status ${user.isActive ? "active" : "inactive"}`}>
                              {user.isActive ? "نشط" : "معطل"}
                            </span>
                          </td>
                          <td>
                            <button
                              className={`btn-toggle ${user.isActive ? "deactivate" : "activate"}`}
                              onClick={() => handleToggleUserStatus(user._id)}
                            >
                              {user.isActive ? "تعطيل" : "تفعيل"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </section>
    </div>
  );
};

export default AdminDashboard;
