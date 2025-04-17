import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import DatabaseAPI from "../../APIs/DatabaseAPI";
import "./DatabaseSelect.css";
import { useUser } from "../../context/UserContext";
import Selector from "../../Components/Selector/Selector";
import Button from "../../Components/Button/Button";
import Report from "../../Components/Report/Report";
import TextInput from "../../Components/TextInput/TextInput";
const DatabaseSelect = () => {
  const { language, isDarkMode, user_Id } = useUser();
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showReport, setShowReport] = useState(false);
  useEffect(() => {
    const fetchDatabases = async () => {
      if (!user_Id) return null;
      try {
        const response = await DatabaseAPI.getDatabases(user_Id);
        setDatabases(response.data);
      } catch (error) {
        console.error("Error fetching databases:", error);
      }
    };

    fetchDatabases();
  }, [user_Id]);

  useEffect(() => {
    setShowReport(false);
  }, [selectedDatabase]);

  const handleReport = () => {
    setShowReport((prev) => !prev);
  };

  const onSelect = (database) => {
    setSelectedDatabase(database);
  };

  const handleSbmit = async () => {
    let response;

    response = await DatabaseAPI.AdduserDatabase(
      selectedDatabase,
      user_Id,
      userName,
      userPassword
    );

    if (response.status === "success") {
      toast.success(
        language === "en"
          ? "Branch added to the user successfully"
          : "تمت إضافة الفرع للمستخدم بنجاح"
      );
      alert(
        language === "en"
          ? "Branch added to the user successfully"
          : "تمت إضافة الفرع للمستخدم بنجاح"
      );
    }
  };

  console.log("databases >>>>>>>>>>>>>>>>>>> ", databases);
  console.log("selected >>>>>>>>>>>>>>>>>>> ", selectedDatabase);
  return (
    <div className={`DatabaseSelect_container ${isDarkMode ? "dark" : ""}`}>
      <h1>
        {language === "en"
          ? "Select Your Database"
          : "اختر قاعدة البيانات الخاصة بك"}
      </h1>
      <Selector
        selectorValues={databases}
        onSelect={onSelect}
        selectedValue={selectedDatabase}
      />
      {selectedDatabase && (
        <div className="DatabaseSelect_input">
          <TextInput
            placeholder={
              language === "en" ? "Branch userName" : "اسم المستخدم للفرع"
            }
            setData={setUserName}
          />
          <TextInput
            placeholder={
              language === "en" ? "Branch Password" : "كلمة مرور الفرع"
            }
            setData={setUserPassword}
          />
        </div>
      )}
      <div className="DatabaseSelect_button">
        <Button
          text={
            showReport
              ? language === "en"
                ? "Hide Report"
                : "إخفاء التقرير"
              : language === "en"
              ? "Show Report"
              : "إظهار التقرير"
          }
          onClick={() => handleReport()}
          isDisabled={!selectedDatabase}
        />
      </div>

      {showReport && <Report database_id={selectedDatabase} />}
    </div>
  );
};
export default DatabaseSelect;
