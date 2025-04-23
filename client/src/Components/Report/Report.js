import { React, useEffect, useState } from "react";
import BranchAPI from "../../APIs/BrancheAPI";
import { useUser } from "../../context/UserContext";
import Button from "../Button/Button";
import exportToExcel from "../ExcelImport/ExcelImport";
import "./Report.css";

const Report = ({ database_id, report_id, filters }) => {
  const { language, isDarkMode, user_Id } = useUser();
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  console.log("report_id", typeof report_id, report_id);
  useEffect(() => {
    if (Number(report_id) === 1) {
      const fetchData = async () => {
        const result = await BranchAPI.cashirInfo(database_id, user_Id);
        setData(result.data);
      };
      fetchData();
    }
  }, [report_id, database_id, user_Id]);

  const clickRow = (index) => {
    setSelectedRow(index);
  };

  const reportTable = () => {
    return (
      <div className="Report_tableWrapper">
        <table className={`Report_table ${isDarkMode ? "dark" : ""}`}>
          <thead>
            <tr>
              <th>{language === "en" ? "Cashir" : "الكاشير"}</th>
              <th>{language === "en" ? "monetary" : "نقدي"}</th>
              <th>{language === "en" ? "credit" : "إئتمان"}</th>
              <th>{language === "en" ? "Checks" : "الشيكات"}</th>
              <th>{language === "en" ? "Coupons" : "الكوبونات"}</th>
              <th>
                {language === "en" ? "prepaid card" : "كارت مدفوع مقدماً"}
              </th>
              <th>{language === "en" ? "Redeem points" : "إستبدال نقاط"}</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((object) =>
                String(object.Cashir)
                  .toLowerCase()
                  .includes(filters.toLowerCase())
              )

              .map((object, index) => (
                <tr
                  key={index}
                  className={selectedRow === index ? "selected-row" : ""}
                >
                  <td onClick={() => clickRow(index)}>{object.Cashir}</td>
                  <td>{object.monetary}</td>
                  <td>{object.credit}</td>
                  <td>{object.Checks}</td>
                  <td>{object.Coupons}</td>
                  <td>{object.prepaid_card}</td>
                  <td>{object.Redeem_points}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="Report_button">
          <Button
            text={language === "en" ? "Export to Excel" : "تصدير إلى Excel"}
            onClick={() => exportToExcel(data)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="Report_container">
      {data.length > 0 ? (
        reportTable()
      ) : (
        <div className="no-data">
          {language === "en" ? "No Data Available" : "لا توجد بيانات متوفرة"}
        </div>
      )}
    </div>
  );
};

export default Report;
