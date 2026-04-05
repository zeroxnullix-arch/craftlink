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

const Header = () => {
  const navigate = useNavigate();
  const { userData } = useSelector(state => state.user);
  const { darkMode, setDarkMode } = useTheme();
  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <header>
      <div className="section-layout">
        <div className="logo pointer" onClick={() => navigate("/")}>
          <img src={logo} className="logo-CraftLink" alt="craftlink" />
          <h2>CraftLink<span>.</span></h2>
        </div>
        <ul>
          <li>
            <span className="nav-link pointer" onClick={() => navigate("/")}>Home</span>
          </li>
          <li>
            {!userData ? (
              <span className="nav-link pointer" onClick={() => navigate("/signup")}>Join</span>
            ) : (
              <span className="nav-link pointer" onClick={() => navigate(`/profile/${userData._id}`)}>Profile</span>
            )}
          </li>
          <li>
            <span className="nav-link theme-toggle pointer" onClick={toggleTheme}>
              {darkMode ? <MdSunny /> : <RiMoonClearFill />}
            </span>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
