import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./NavBar.css";

const NavBar = () => {
  const { isDarkMode, language, isLogin, userGroup } = useUser();

  if (!isLogin) {
    return null;
  }
  return (
    <nav
      className={`NavBar_container ${
        isDarkMode ? "NavBar_dark" : "NavBar_light"
      }`}
    >
      <ul className="NavBar_menu">
        <Link className="NavBar_link_item" to="/DatabaseSelect">
          <li className="NavBar_item">
            {language === "en" ? "Branch Select" : "تحديد الفرع"}
          </li>
        </Link>

        {userGroup !== 3 && (
          <Link className="NavBar_link_item" to="/DatabasetoUser">
            <li className="NavBar_item">
              {language === "en"
                ? "Add Branches to users"
                : "إضافة فروع للمستخدمين"}
            </li>
          </Link>
        )}

        {Number(userGroup) !== 3 && (
          <Link className="NavBar_link_item" to="/ApproveAccounts">
            <li className="NavBar_item">
              {language === "en"
                ? "Approve Accounts"
                : "الموافقة علي  الحسابات"}
            </li>
          </Link>
        )}
        {Number(userGroup) === 1 && (
          <Link className="NavBar_link_item" to="/ReportToUser">
            <li className="NavBar_item">
              {language === "en"
                ? "Add Reports to User"
                : "إضافة تقارير للمستخدمين"}
            </li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
