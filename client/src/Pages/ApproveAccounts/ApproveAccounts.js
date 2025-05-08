import { React, useState, useEffect } from "react";
import "./ApproveAccounts.css";
import UserAPI from "../../APIs/UserAPI";
import { useUser } from "../../context/UserContext";
import Button from "../../Components/Button/Button";
const ApproveAccounts = () => {
  const { isDarkMode, language, user_Id } = useUser();
  const [selectedOption, setSelectedOption] = useState("All_Employees");
  const [allEmployees, setAllEmployees] = useState([]);
  const [waitingEmployees, setWaitingEmployees] = useState([]);
  const [approveEmployees, setApproveEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user_Id) return;
        const response = await UserAPI.GetAllEmployeeWithSpacificUser(user_Id);
        setAllEmployees(response.data.User);
        setApproveEmployees(
          response.data.User.filter((user) => user.isApproved === "y")
        );
        setWaitingEmployees(
          response.data.User.filter((user) => user.isApproved === "n")
        );
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user_Id]);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleApprove = async (user_id) => {
    if (!user_id) return;
    UserAPI.ApproveAccounts(user_id);
    window.location.reload();
  };
  const handleDecline = async (user_id) => {
    if (!user_id) return;
    UserAPI.DeclineAccounts(user_id);
    window.location.reload();
  };
  const renderEmployees = (Employees, sectionTitleEn, sectionTitleAr) => {
    return (
      <div className="ApproveAccounts_section">
        <h2>{language === "en" ? sectionTitleEn : sectionTitleAr}</h2>
        {Employees.length > 0 ? (
          <table className="ApproveAccounts_table">
            <tr>
              <th>
                {language === "en" ? "Employee Full Name" : "إسم الموظف الكامل"}
              </th>
              <th>{language === "en" ? "Employee Phone" : "رقم الموظف"}</th>
              <th>{language === "en" ? "Employee Role" : "دور الموظف"}</th>
              <th>{language === "en" ? "Employee State" : "حالة الموظف"}</th>
            </tr>
            {Employees.map((employee) => (
              <tr>
                <td>{employee.Employee_Full_Name}</td>
                <td>{employee.user_phone}</td>
                <td>{employee.group_role}</td>
                <td>
                  {employee.isApproved === "y" ? (
                    language === "en" ? (
                      "Approve"
                    ) : (
                      "تم الموافقة عليه"
                    )
                  ) : (
                    <div className="ApproveAccounts_Button">
                      <Button
                        text={language === "en" ? "Approve" : "موافق"}
                        onClick={() => handleApprove(employee.user_id)}
                      />
                      <Button
                        text={language === "en" ? "Decline" : "رفض"}
                        onClick={() => handleDecline(employee.user_id)}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </table>
        ) : language === "en" ? (
          "No Employees"
        ) : (
          "لا يوجد موظفين"
        )}
      </div>
    );
  };

  return (
    <div className={`ApproveAccounts_container ${isDarkMode ? "dark" : ""}`}>
      <h1>
        {language === "en" ? "Approve Accounts" : "الموافقة علي الحسابات"}
      </h1>
      <div className="ApproveAccounts_second_container">
        <div className="ApproveAccounts_section">
          <ul>
            <li
              className={
                selectedOption === "Wating_Approve"
                  ? "MyBooks_active"
                  : undefined
              }
              onClick={() => handleOptionClick("Wating_Approve")}
            >
              {language === "en"
                ? "Employees Waiting to be Approved"
                : "الموظفين في انتظار الموافقة"}
            </li>
            <li
              className={
                selectedOption === "Approved" ? "MyBooks_active" : undefined
              }
              onClick={() => handleOptionClick("Approved")}
            >
              {language === "en" ? "Approved Employees" : "الموظفين المعتمد"}
            </li>
            <li
              className={
                selectedOption === "All_Employees"
                  ? "MyBooks_active"
                  : undefined
              }
              onClick={() => handleOptionClick("All_Employees")}
            >
              {language === "en" ? "All Employees" : "كل الموظفين"}
            </li>
          </ul>
        </div>
        <main className="ApproveAccounts_main">
          {selectedOption === "Wating_Approve" &&
            renderEmployees(
              waitingEmployees,
              "Employees Waiting to be Approved",
              "الموظفين في انتظار الموافقة"
            )}
          {selectedOption === "Approved" &&
            renderEmployees(
              approveEmployees,
              "Approved Employees",
              "الموظفين المعتمد"
            )}
          {selectedOption === "All_Employees" &&
            renderEmployees(allEmployees, "All Employees", "كل الموظفين")}
        </main>
      </div>
    </div>
  );
};

export default ApproveAccounts;
