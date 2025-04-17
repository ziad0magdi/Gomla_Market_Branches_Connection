import { React } from "react";
import "./Button.css";
import { useUser } from "../../context/UserContext";

const Button = ({ onClick, text, isDisabled }) => {
  const { isDarkMode } = useUser();
  return (
    <button
      className={`Boutton_container ${isDarkMode ? "dark" : ""}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};
export default Button;
