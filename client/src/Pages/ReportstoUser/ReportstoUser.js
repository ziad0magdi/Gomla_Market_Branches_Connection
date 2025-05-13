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
  const [selectedUser, setSelectedUser] = useState(user_Id);
  useEffect(() => {
    const fetchDatabases = async () => {
      if (!userGroup || userGroup === 3) return null;
      try {
        if (Number(userGroup) === 1) {
          const response1 = await UserAPI.getApprovedUsers();
          setUsers(response1.data);

          const response2 = await ReportAPI.UserAvailableReports(
            Number(selectedUser)
          );
          setReports(response2.data);
        } else {
          const response1 = await UserAPI.GetApprovedEmployeeWithSpacificUser(
            user_Id
          );
          setUsers(response1.data);

          const response2 = await ReportAPI.UserAvailableReportsManager(
            selectedUser,
            user_Id
          );
          setReports(response2.data);
        }
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };
    fetchDatabases();
  }, [userGroup, selectedUser]);

  const handleSbmit = async () => {
    let response;
    if (!selectedUser) {
      response = await ReportAPI.AddUserReport(selectedReport, user_Id);
    } else {
      response = await ReportAPI.AddUserReport(selectedReport, selectedUser);
    }
    console.log(response);
    if (response.status === 200) {
      toast.success(
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
      <div className="ReportstoUser_Selector">
        <Selector
          selectorValues={users}
          onSelect={onSelectUser}
          selectedValue={selectedUser}
        />
        {selectedUser && (
          <Selector
            selectorValues={reports}
            onSelect={onSelectReport}
            selectedValue={selectedReport}
          />
        )}
      </div>
      {selectedReport && (
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
      )}
    </div>
  );
};

export default ReportstoUser;
