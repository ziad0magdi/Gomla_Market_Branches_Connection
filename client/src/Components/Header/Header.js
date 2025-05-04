import React from "react";
import { useNavigate } from "react-router-dom";
import gommlaimage from "./images/GommlaMarket.ico";
import { useUser } from "../../context/UserContext";
import Button from "../Button/Button";
import "./Header.css";

const Header = () => {
  const { isDarkMode, language, toggleTheme, toggleLanguage, isLogin } =
    useUser();

  const navigate = useNavigate();

  const handleSingOutClick = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user_group_id");
    localStorage.removeItem("user_id");
    navigate(`/`);
    window.location.reload();
  };
  return (
    <header
      className={`Header_container ${
        isDarkMode ? "Header_dark" : "Header_light"
      }`}
    >
      <div className="Header_left">
        <img
          className="Header_GommlaIcon"
          src={gommlaimage}
          alt="Gommla Market Icon"
        />
      </div>

      <div className="Header_right">
        <Button
          text={language === "en" ? "عربي" : "English"}
          onClick={() => toggleLanguage()}
        />
        <Button
          text={
            isDarkMode
              ? language === "en"
                ? "Light Mode"
                : "الوضع النهاري"
              : language === "en"
              ? "Dark Mode"
              : "الوضع الليلي"
          }
          onClick={() => toggleTheme()}
        />
        {isLogin ? (
          <Button
            text={language === "en" ? "Signout" : "تسجيل الخروج"}
            onClick={() => handleSingOutClick()}
          />
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Header;
