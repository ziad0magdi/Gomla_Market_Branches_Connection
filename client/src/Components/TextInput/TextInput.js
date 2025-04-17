import { React } from "react";
import "./TextInput.css";
import { useUser } from "../../context/UserContext";

const TextInput = ({ placeholder, setData, isDisabled }) => {
  const { isDarkMode } = useUser();
  return (
    <input
      type="text"
      className={`TextInput_container ${isDarkMode ? "dark" : ""}`}
      onChange={(e) => setData(e.target.value)}
      disabled={isDisabled}
      placeholder={placeholder}
    />
  );
};
export default TextInput;
