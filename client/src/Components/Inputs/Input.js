import { React } from "react";
import "./Inputs.css";
import { useUser } from "../../context/UserContext";

const Input = ({ type, placeholder, setData, isDisabled }) => {
  const { isDarkMode } = useUser();
  return (
    <input
      type={type}
      className={`Input_container ${isDarkMode ? "dark" : ""}`}
      onChange={(e) => setData(e.target.value)}
      disabled={isDisabled}
      placeholder={placeholder}
    />
  );
};
export default Input;
