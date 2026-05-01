import React, { useEffect } from "react";
import { RiBubbleChartFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { VscSettings } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../assets/CraftLink.svg";
import { performLogout } from "../../../redux/userActions";
import { toast } from "react-toastify";
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
import { useTranslation } from "react-i18next";
const SideBar = ({ sidebarHide }) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { userData: currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (currentUser?._id && location.pathname === "/profile") {
      navigate(`/profile/${currentUser._id}`, { replace: true });
    }
  }, [currentUser, navigate, location.pathname]);
  const menuItems = [
    { name: "TimeLine", icon: MdTimeline, path: "/timeline" },
    {
      name: "My Profile",
      icon: PiUserCircleDashed,
      path: currentUser?._id ? `/profile/${currentUser._id}` : "/profile",
    },
    { name: "Create Course", icon: RiVideoAiLine, path: "/createcourse" },
    { name: "Wallet", icon: IoMdWallet, path: "/instructor-withdraw" },
  ];
  const handleLogOut = () => {
    localStorage.setItem("logout", Date.now());
    dispatch(performLogout());
    navigate("/signin", { replace: true });
    toast.success("Log Out Successfully");
  };
  return (
    <section id="sidebar" className={sidebarHide ? "hide" : ""}>
      <div className="logo pointer brand" onClick={() => navigate("/timeline")}>
        <img src={logo} className="logo-CraftLink" alt="craftlink" />
        <h2>
          {t("craflink")}<span>.</span>
        </h2>
      </div>
      <ul className="side-menu top">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={location.pathname.startsWith(item.path) ? "active" : ""}
            onClick={() => navigate(item.path)}
          >
            <button>
              {item.icon && <item.icon className="bx" />}
              <span className="text">{t(item.name)}</span>
            </button>
          </li>
        ))}
      </ul>
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
