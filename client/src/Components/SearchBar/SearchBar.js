import { useUser } from "../../context/UserContext";
import "./SearchBar.css";

const SearchBar = ({ setData, searchText }) => {
  const { isDarkMode } = useUser(); // Get theme & language from context

  return (
    <div className={`SearchBar_container ${isDarkMode ? "dark" : "light"}`}>
      <input
        type="text"
        className={`SearchBar_input ${isDarkMode ? "dark" : "light"}`}
        placeholder={searchText}
        onChange={(e) => setData(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
