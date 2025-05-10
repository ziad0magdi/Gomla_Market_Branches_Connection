import { useUser } from "../../context/UserContext";
import "./Selector.css";

function Selector({ headerText, selectorValues, onSelect, selectedValue }) {
  const { language, isDarkMode } = useUser();
  return (
    <div className={`Selector_container ${isDarkMode ? "dark" : ""}`}>
      <h3>{headerText}</h3>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="Selector_dropdown"
        value={selectedValue}
      >
        <option className="Selector_dropdown_item" value="">
          {language === "en" ? "-- Select--" : "-- اختر --"}
        </option>
        {selectorValues.map((selectorValue, index) => {
          const keys = Object.keys(selectorValue);
          const firstKeyValue = selectorValue[keys[0]];
          const secondKeyValue = selectorValue[keys[1]];
          return (
            <option key={index} value={firstKeyValue}>
              {secondKeyValue}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Selector;
