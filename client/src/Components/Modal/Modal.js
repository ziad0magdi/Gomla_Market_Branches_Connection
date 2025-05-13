// components/Modal.js
import { React, useState } from "react";
import { useUser } from "../../context/UserContext";
import Button from "../Button/Button";
import "./Modal.css"; // or Tailwind if you're using it

const Modal = ({ onClose, children }) => {
  const { language, isDarkMode } = useUser();
  const [isMaximized, setIsMaximized] = useState(false);

  const onMaximize = () => {
    setIsMaximized((prev) => !prev);
  };

  return (
    <div
      className={
        isMaximized
          ? `Max_Modal_content ${isDarkMode ? "dark" : ""}`
          : `Modal_overlay ${isDarkMode ? "dark" : ""}`
      }
    >
      <div className={`Modal_content ${isDarkMode ? "dark" : ""}`}>
        <div className="Modal_header">
          <Button
            text={language === "en" ? "Close" : "إقفال"}
            onClick={onClose}
            className="Modal_close"
            isDisabled={false}
          />
          <Button
            text={language === "en" ? "Maximize " : "تكبير"}
            onClick={onMaximize}
            className="Modal_close"
            isDisabled={false}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
