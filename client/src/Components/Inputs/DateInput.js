import React from "react";
import { useUser } from "../../context/UserContext";
import "./Inputs.css";

const DateInput = ({ value, setData, isDisabled }) => {
  const { isDarkMode } = useUser();
  return (
    <div className={`Input_container ${isDarkMode ? "dark" : ""}`}>
      <input
        type="date"
        value={value}
        onChange={(e) => setData(e.target.value)}
        className={`Input_container ${isDarkMode ? "dark" : ""}`}
        disabled={isDisabled}
      />
    </div>
  );
};

export default DateInput;
