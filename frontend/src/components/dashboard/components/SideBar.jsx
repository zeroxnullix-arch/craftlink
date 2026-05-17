import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import logo from "../../../assets/CraftLink.svg";
import { performLogout } from "../../../redux/userActions";

import { IoMdWallet } from "react-icons/io";

import {
  MdTimeline,
  RiVideoAiLine,
  PiUserCircleDashed,
  TbHelpSquareRoundedFilled,
  BiSupport,
  MdPrivacyTip,
  GoCodeOfConduct,
} from "@icons";
import { LuLayoutDashboard } from "react-icons/lu";
const SideBar = ({ sidebarHide }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { userData: currentUser } = useSelector((state) => state.user);

  // ================= ROLE SAFE ================= //
  const role = currentUser?.role;

  // ================= DEBUG ================= //
  useEffect(() => {
    console.log("👤 USER DATA:", currentUser);
    console.log("🎭 ROLE:", role);
  }, [currentUser, role]);

  useEffect(() => {
    if (currentUser?._id && location.pathname === "/profile") {
      navigate(`/profile/${currentUser._id}`, { replace: true });
    }
  }, [currentUser, navigate, location.pathname]);

  // ================= MENU ITEMS ================= //
  const menuItems = [
    {
      name: "Dashboard",
      icon: LuLayoutDashboard,
      path: "/dashboard",
      roles: [0],
    },
    {
      name: "TimeLine",
      icon: MdTimeline,
      path: "/timeline",
      roles: [0, 1, 2, 3],
    },
    {
      name: "My Profile",
      icon: PiUserCircleDashed,
      path: currentUser?._id
        ? `/profile/${currentUser._id}`
        : "/profile",
      roles: [0, 1, 2, 3],
    },
    {
      name: "Create Course",
      icon: RiVideoAiLine,
      path: "/createcourse",
      roles: [2],
    },
    {
      name: "Wallet",
      icon: IoMdWallet,
      path: "/instructor-withdraw",
      roles: [2],
    },
  ];

  // ================= LOGOUT ================= //
  const handleLogOut = () => {
    localStorage.setItem("logout", Date.now());
    dispatch(performLogout());
    navigate("/signin", { replace: true });
    toast.success("Log Out Successfully");
  };

  return (
    <section id="sidebar" className={sidebarHide ? "hide" : ""}>
      {/* LOGO */}
      <div
        className="logo pointer brand"
        onClick={() => navigate("/timeline")}
      >
        <img
          src={logo}
          className="logo-CraftLink"
          alt="craftlink"
        />
        <h2>
          {t("craflink")}
          <span>.</span>
        </h2>
      </div>

      {/* ================= TOP MENU ================= */}
      <ul className="side-menu top">
        {menuItems
          .filter((item) => {
            if (role === undefined || role === null) return false;
            return item.roles.includes(role);
          })
          .map((item, index) => (
            <li
              key={index}
              className={
                location.pathname.startsWith(item.path)
                  ? "active"
                  : ""
              }
              onClick={() => navigate(item.path)}
            >
              <button>
                {item.icon && <item.icon className="bx" />}
                <span className="text">{t(item.name)}</span>
              </button>
            </li>
          ))}
      </ul>

      {/* ================= BOTTOM MENU ================= */}
      <ul className="side-menu">
        <li>
          <button onClick={() => navigate("/helpcenter")}>
            <TbHelpSquareRoundedFilled className="bx" />
            <span className="text">{t("Help Center")}</span>
          </button>
        </li>

        <li>
          <button onClick={() => navigate("/contactus")}>
            <BiSupport className="bx" />
            <span className="text">{t("Contact Us")}</span>
          </button>
        </li>

        <li>
          <button onClick={() => navigate("/privacy-policy")}>
            <MdPrivacyTip className="bx" />
            <span className="text">{t("Privacy Policy")}</span>
          </button>
        </li>

        <li>
          <button onClick={() => navigate("/terms")}>
            <GoCodeOfConduct className="bx" />
            <span className="text">{t("Terms & Conditions")}</span>
          </button>
        </li>

        <li>
          <button className="logout" onClick={handleLogOut}>
            <CiLogout className="bx" />
            <span className="text">{t("Logout")}</span>
          </button>
        </li>
      </ul>
    </section>
  );
};

export default SideBar;