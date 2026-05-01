import React from "react";
import logo from "../assets/CraftLink.svg";
import { MdSunny } from "react-icons/md";
import { RiMoonClearFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
const Header = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const { userData } = useSelector(state => state.user);
  const { darkMode, setDarkMode } = useTheme();
  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };
const toggleLanguage = () => {
  const newLang = i18n.language === "en" ? "ar" : "en";

  i18n.changeLanguage(newLang);

  localStorage.setItem("lang", newLang);

  document.documentElement.dir =
    newLang === "ar" ? "rtl" : "ltr";
};
  return (
    <header>
      <div className="section-layout">
        <div className="logo pointer" onClick={() => navigate("/")}>
          <img src={logo} className="logo-CraftLink" alt="craftlink" />
          <h2>{t("craflink")}<span>.</span></h2>
        </div>
  <ul>
  <li>
    <span
      className="nav-link pointer"
      onClick={() => navigate("/")}
    >
      {t("home")}
    </span>
  </li>

  <li>
    {!userData ? (
      <span
        className="nav-link pointer"
        onClick={() => navigate("/signup")}
      >
        {t("join")}
      </span>
    ) : (
      <span
        className="nav-link pointer"
        onClick={() => navigate(`/profile/${userData._id}`)}
      >
        {t("profile")}
      </span>
    )}
  </li>

  {/* Language Button */}
  <li>
    <span
      className="nav-link pointer"
      onClick={toggleLanguage}
    >
      {i18n.language === "en" ? "AR" : "EN"}
    </span>
  </li>

  {/* Theme Toggle */}
  <li>
    <span
      className="nav-link theme-toggle pointer"
      onClick={toggleTheme}
    >
      {darkMode ? <MdSunny /> : <RiMoonClearFill />}
    </span>
  </li>
</ul>
      </div>
    </header>
  );
};

export default Header;
