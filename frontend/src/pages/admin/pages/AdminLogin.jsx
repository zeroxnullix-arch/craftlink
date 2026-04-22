import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header, AuthInput, AuthButton, SideImg } from "@components";
import bg from "../../../assets/img/BgSignIn.jpg";
import { api } from "@services/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return toast.error("من فضلك أدخل اسم المستخدم وكلمة المرور");
    }

    if (username !== "admin") {
      return toast.error("اسم المستخدم غير صحيح");
    }
    if (password !== "123") {
      return toast.error("كلمة المرور غير صحيحة");
    }

    try {
      setLoading(true);
      const res = await api.post(
        "/api/auth/admin-login",
        { username, password },
        { withCredentials: true }
      );

      if (res.data?.email) {
        toast.success("تم تسجيل دخول المسئول بنجاح");
        navigate("/admin-dashboard");
      } else {
        toast.error(res.data?.message || "فشل تسجيل الدخول");
      }
    } catch (error) {
      console.error("admin login error:", error);
      toast.error(error.response?.data?.message || "فشل تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="background" />
      <Header />
      <main>
        <section className="section-main">
          <div className="container">
            <div className="left section-layout">
              <div className="form-wrapper">
                <div className="section-main-heading">
                  <h2>
                    Admin Login<span>,</span>
                  </h2>
                  <p className="text">
                    تسجيل دخول مسئول النظام باستخدام المستخدم admin وكلمة المرور 123.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="section-main-form">
                  <AuthInput
                    label="Username"
                    value={username}
                    onChange={setUsername}
                    type="text"
                    className="w-100"
                  />
                  <AuthInput
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    type="password"
                    className="w-100"
                  />

                  <AuthButton type="submit" loading={loading} disabled={loading}>
                    تسجيل الدخول
                  </AuthButton>
                </form>

                <div className="other-auth">
                  <p>للعودة إلى صفحة المستخدمين</p>
                  <button type="button" onClick={() => navigate("/signin")}>Sign In</button>
                </div>
              </div>
            </div>

            <SideImg src={bg} />
          </div>
        </section>
      </main>
    </>
  );
}
