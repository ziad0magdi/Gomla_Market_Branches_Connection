import { React, useState, useEffect } from "react";
import ReportAPI from "../../APIs/ReportAPI";
import UserAPI from "../../APIs/UserAPI";
import "./ReportstoUser.css";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import Selector from "../../Components/Selector/Selector";
import Button from "../../Components/Button/Button";
const ReportstoUser = () => {
  const { language, isDarkMode, user_Id, userGroup } = useUser();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  useEffect(() => {
    const fetchDatabases = async () => {
      if (!userGroup || userGroup !== 1) return null;
      try {
        const response1 = await ReportAPI.AllReport();
        setReports(response1.data);
        const response2 = await UserAPI.getUser();
        setUsers(response2.data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };
    fetchDatabases();
  }, [userGroup]);

  const handleSbmit = async () => {
    let response;
    if (!selectedUser) {
      response = await ReportAPI.AddUserReport(selectedReport, user_Id);
    } else {
      response = await ReportAPI.AddUserReport(selectedReport, selectedUser);
    }
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

  const onSelectReport = (report) => {
    setSelectedReport(report);
  };

  const onSelectUser = (user) => {
    setSelectedUser(user);
  };
  return (
    <div className={`ReportstoUser_container ${isDarkMode ? "dark" : ""}`}>
      <h1>
        {language === "en" ? "Assign Report to User" : "إضافه تقرير للمستخدم"}
      </h1>
      <Selector
        headerText={
          language === "en"
            ? "Select Report to add to the user"
            : "اختر التقرير الذي تريد إضافته للمستخدم"
        }
        selectorValues={reports}
        onSelect={onSelectReport}
        selectedValue={selectedReport}
      />

      {selectedReport && userGroup === 1 && (
        <Selector
          headerText={language === "en" ? "Select User" : "اختر المستخدم"}
          selectorValues={users}
          onSelect={onSelectUser}
          selectedValue={selectedUser}
        />
      )}
      <div className="ReportstoUser_button">
        <Button
          text={
            language === "en"
              ? "Add Report to the user"
              : "إضافة تقرير للمستخدم"
          }
          onClick={() => handleSbmit()}
          isDisabled={!selectedReport}
        />
      </div>
    </div>
  );
};

export default ReportstoUser;
