import { React, useEffect, useState } from "react";
import BranchAPI from "../../APIs/BrancheAPI";
import { useUser } from "../../context/UserContext";
import Button from "../Button/Button";
import exportToExcel from "../ExcelImport/ExcelImport";
import Selector from "../Selector/Selector";
import BarChart from "../Chars/BarChart";
import "./Report.css";

const Report = ({ database_id, report_id, filters }) => {
  const { language, isDarkMode, user_Id } = useUser();
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [charts, setCharts] = useState([
    {
      Chart_id: 1,
      Chart_name: "Bar Chart",
    },
  ]);
  const [selectedChart, setSelectedChart] = useState(null);
  const [selectedFild, setSelectedFild] = useState(null);
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);

  useEffect(() => {
    if (Number(report_id) === 1) {
      const fetchData = async () => {
        const result = await BranchAPI.cashirInfo(database_id, user_Id);
        setData(result.data);
        setXData(result.data.map((item) => item.Cashir));
      };
      fetchData();
    }
  }, [report_id, database_id, user_Id]);

  const clickRow = (index) => {
    setSelectedRow(index);
  };

  const handleShowChart = () => {
    setShowChart((prev) => !prev);
  };

  const onSelectFild = (field) => {
    setSelectedFild(field);
    const selectorValue = Object.keys(data[0]).map((key, index) => ({
      index,
      key,
    }));

    let selectedKey;
    for (let i = 0; i < selectorValue.length; i++) {
      if (selectorValue[i].index === Number(field)) {
        selectedKey = selectorValue[i].key;
        break;
      }
    }
    if (selectedKey) {
      // Map the corresponding values from the data
      const yValues = data.map((item) => item[selectedKey]);
      setYData(yValues);
    }
  };

  console.log("showChart", showChart);

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

              .map((object, index) => {
                const keys = Object.keys(object);
                return (
                  <tr
                    onClick={() => clickRow(index)}
                    key={index}
                    className={selectedRow === index ? "selected-row" : ""}
                  >
                    {keys.map((key, i) => {
                      if (key === "branch") return null;
                      return <td key={i}>{object[key]}</td>;
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="Report_button">
          <Button
            text={language === "en" ? "Export to Excel" : "تصدير إلى Excel"}
            onClick={() => exportToExcel(data)}
          />
        </div>

        <Selector
          headerText={language === "en" ? "Select Chart" : "اختر الرسم البياني"}
          selectorValues={charts}
          onSelect={setSelectedChart}
          selectedValue={selectedChart}
        />

        {selectedChart && (
          <Selector
            headerText={
              language === "en"
                ? "Select Chart Y Axis"
                : "اختر محور Y للرسم البياني"
            }
            selectorValues={Object.keys(data[0]).map((key, index) => ({
              index,
              key,
            }))}
            onSelect={onSelectFild}
            selectedValue={selectedFild}
          />
        )}
        <div className="Report_button">
          {selectedFild && (
            <Button
              text={language === "en" ? "Show Chart" : "عرض الرسم البياني"}
              onClick={() => handleShowChart()}
            />
          )}
        </div>
        {showChart && (
          <div className="Report_chart">
            {selectedChart === "Bar Chart" && (
              <BarChart xData={xData} yData={yData} />
            )}
          </div>
        )}
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
