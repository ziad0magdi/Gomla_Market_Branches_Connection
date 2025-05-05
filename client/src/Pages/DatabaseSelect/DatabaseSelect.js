import { React, useState, useEffect } from "react";
import DatabaseAPI from "../../APIs/DatabaseAPI";
import ReportAPI from "../../APIs/ReportAPI";
import "./DatabaseSelect.css";
import { useUser } from "../../context/UserContext";
import Selector from "../../Components/Selector/Selector";
import DateInput from "../../Components/Inputs/DateInput";
import Button from "../../Components/Button/Button";
import Report from "../../Components/Report/Report";
import SearchBar from "../../Components/SearchBar/SearchBar";

const DatabaseSelect = () => {
  const { language, isDarkMode, user_Id } = useUser();
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState();

  let fullDate;
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  fullDate = `${year}-${month}-${day}`;

  const [dateFrom, setDateFrom] = useState(fullDate);
  // const [dateTo, setDateTo] = useState([]);
  const [userName, setUserName] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [Reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState();
  const [selectedReportName, setSelectedReportName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      if (!user_Id) return null;
      try {
        const response1 = await DatabaseAPI.getDatabases(user_Id);
        setDatabases(response1.data);
        const response2 = await ReportAPI.UsersReport(user_Id);
        setReports(response2.data);
      } catch (error) {
        console.error("Error fetching databases:", error);
      }
    };

    fetchData();
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
  const onSelect2 = (Report) => {
    setSelectedReport(Report);
    const report = Reports.find((item) => item.report_id === Number(Report));
    setSelectedReportName(report?.report_name);
  };

  return (
    <div className={`DatabaseSelect_container ${isDarkMode ? "dark" : ""}`}>
      <h1>{language === "en" ? "Select Branch" : "اختر الفرع"}</h1>
      <div className="DatabaseSelect_selector">
        <Selector
          selectorValues={databases}
          onSelect={onSelect}
          selectedValue={selectedDatabase}
        />
        {selectedDatabase && (
          <Selector
            selectorValues={Reports}
            onSelect={onSelect2}
            selectedValue={selectedReport}
          />
        )}
      </div>
      <div className="DatabaseSelect_button">
        {selectedReport && (
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
        )}
      </div>
      {selectedDatabase && (
        <div className="DateInput">
          <DateInput value={dateFrom} setData={setDateFrom} />
          {/* <DateInput value={dateTo} setData={setDateTo} /> */}
        </div>
      )}
      {showReport && (
        <div className="DatabaseSelect_input">
          <SearchBar
            setData={setUserName}
            searchText={
              language === "en"
                ? "Search by Cashier ID"
                : "ابحث بأستخدام رقم الكاشير"
            }
          />
        </div>
      )}
      {showReport && (
        <Report
          database_id={selectedDatabase}
          report_id={selectedReport}
          filters={userName}
          reportHeder={selectedReportName}
          date={dateFrom}
        />
      )}
    </div>
  );
};
export default DatabaseSelect;
