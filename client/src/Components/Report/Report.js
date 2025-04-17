import { React, useEffect, useState } from "react";
import ReportAPI from "../../APIs/ReportAPI";
import { useUser } from "../../context/UserContext";
import "./Report.css";

const Report = ({ database_id }) => {
  console.log("database_id inside report >>> ", database_id);
  const { language, isDarkMode, user_Id } = useUser();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await ReportAPI.UsersReport(database_id, user_Id);
      console.log("Result >>> ", result);
      setData(result.data);
    };
    fetchData();
  }, [database_id]);

  const reportTable = () => {
    return (
      <table className={`Report_table ${isDarkMode ? "dark" : ""}`}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>User first Name</th>
            <th>User last Name</th>
            <th>User phone</th>
            <th>User Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.user_fname}</td>
              <td>{user.user_lname}</td>
              <td>{user.user_phone}</td>
              <td>{user.user_email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="Report_container">
      <h1>User Report</h1>
      {data.length > 0 ? (
        reportTable()
      ) : (
        <div className="no-data">
          {language === "en" ? "No Data Avilabel" : "لا توجد بيانات متوفرة"}
        </div>
      )}
    </div>
  );
};
export default Report;
