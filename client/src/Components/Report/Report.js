import { React, useEffect, useState, useCallback, useRef } from "react";
import BranchAPI from "../../APIs/BrancheAPI";
import { useUser } from "../../context/UserContext";
import Button from "../Button/Button";
import exportToExcel from "../ExcelImport/ExcelImport";
import Selector from "../Selector/Selector";
import BarChart from "../Charts/BarChart";
// import PieChart from "../Charts/PieChart";
import "./Report.css";

const Report = ({ database_id, report_id, reportHeder, filters, date }) => {
  const { language, isDarkMode, user_Id } = useUser();
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [charts] = useState([
    {
      Chart_id: 1,
      Chart_name: "Bar Chart",
    },
    // {
    //   Chart_id: 2,
    //   Chart_name: "Pie Chart",
    // },
  ]);

  const [selectedChart, setSelectedChart] = useState(null);
  const [selectedFild, setSelectedFild] = useState(null);
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const chartRef = useRef(null);

  useEffect(() => {
    if (showChart && chartRef.current) {
      chartRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showChart]);

  const fetchData = useCallback(async () => {
    setError(false);
    setLoading(true);

    try {
      let result;
      if (Number(report_id) === 1) {
        result = await BranchAPI.Report1(database_id, user_Id, date);
      } else if (Number(report_id) === 2) {
        result = await BranchAPI.Report2(database_id, user_Id, date);
      }

      setData(result.data);
      setXData(result.data.map((item) => item.Cashier));
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [report_id, database_id, user_Id, date]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      const yValues = data.map((item) => item[selectedKey]);
      setYData(yValues);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <Button
        text={
          language === "en"
            ? "Error occurred please try again"
            : "حدث خطأ يرجى المحاولة مرة أخرى"
        }
        onClick={fetchData}
      />
    );

  const reportTable = () => {
    return (
      <div className="Report_tableWrapper">
        <div className="Date_title">
          <h1>
            {language === "en"
              ? "Date From  " + date
              : "بداية التاريخ  " + date}
          </h1>
        </div>
        <table className={`Report_table ${isDarkMode ? "dark" : ""}`}>
          {Number(report_id) === 1 ? (
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
          ) : Number(report_id) === 2 ? (
            <thead>
              <tr>
                <th>{language === "en" ? "Cashir" : "الكاشير"}</th>
                <th>{language === "en" ? "Sold Value" : "قيمة المبيعات"}</th>
                <th>{language === "en" ? "Paid Value" : "القيمة المسددة"}</th>
                <th>
                  {language === "en"
                    ? "The difference between the sales value and the paid value"
                    : "الفرف بين قيمة المبيعات و القيمة المسددة"}
                </th>
                <th>{language === "en" ? "Monetary" : "نقدي"}</th>
                <th>
                  {language === "en" ? "Monetary Count" : "عدد مرات النقدي"}
                </th>
                <th>{language === "en" ? "Credit" : "إئتمان"}</th>
                <th>
                  {language === "en" ? "Credit Count" : "عدد مرات إئتمان"}
                </th>
                <th>{language === "en" ? "Coupons" : "الكوبونات"}</th>
                <th>
                  {language === "en" ? "Coupons Count" : "عدد مرات الكوبونات"}
                </th>
                <th>{language === "en" ? "Voucher" : "كارت مدفوع مقدماً"}</th>
                <th>
                  {language === "en"
                    ? "Voucher Count"
                    : "عدد مرات كارت مدفوع مقدماً"}
                </th>
                <th>
                  {language === "en" ? "Points Redeem Count" : "إستبدال النقاط"}
                </th>
                <th>
                  {language === "en"
                    ? "Points Redeem Count"
                    : "عدد مرات إستبدال النقاط"}
                </th>
              </tr>
            </thead>
          ) : (
            ""
          )}
          <tbody>
            {data
              .filter((object) =>
                String(object.Cashier)
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
                      if (
                        key === "branch" ||
                        key === "Remaining_Total" ||
                        key === "Remaining_Count"
                      )
                        return null;
                      if (
                        key === "Value_difference" &&
                        object.Value_difference < 0
                      ) {
                        return (
                          <td className="negative" key={i}>
                            {object[key]}
                          </td>
                        );
                      } else {
                        return <td key={i}>{object[key]}</td>;
                      }
                    })}
                  </tr>
                );
              })}

            {/* Summation Row */}
            <tr
              className="summary-row"
              style={{ fontWeight: "bold", background: "#f0f0f0" }}
            >
              <td>{language === "en" ? "Total" : "الإجمالي"}</td>
              <td>
                {data
                  .filter((object) =>
                    String(object.Cashier)
                      .toLowerCase()
                      .includes(filters.toLowerCase())
                  )
                  .reduce((acc, obj) => acc + Number(obj.Sold_Value || 0), 0)}
              </td>
              <td>
                {data
                  .filter((object) =>
                    String(object.Cashier)
                      .toLowerCase()
                      .includes(filters.toLowerCase())
                  )
                  .reduce((acc, obj) => acc + Number(obj.Paid_Value || 0), 0)}
              </td>
              <td>
                {data
                  .filter((object) =>
                    String(object.Cashier)
                      .toLowerCase()
                      .includes(filters.toLowerCase())
                  )
                  .reduce(
                    (acc, obj) => acc + Number(obj.Value_Difference || 0),
                    0
                  )}
              </td>
              <td>
                {data
                  .filter((object) =>
                    String(object.Cashier)
                      .toLowerCase()
                      .includes(filters.toLowerCase())
                  )
                  .reduce((acc, obj) => acc + Number(obj.Cash_Total || 0), 0)}
              </td>
              <td>
                {data
                  .filter((object) =>
                    String(object.Cashier)
                      .toLowerCase()
                      .includes(filters.toLowerCase())
                  )
                  .reduce((acc, obj) => acc + Number(obj.Cash_Count || 0), 0)}
              </td>
              <td>
                {data
                  .filter((object) =>
                    String(object.Cashier)
                      .toLowerCase()
                      .includes(filters.toLowerCase())
                  )
                  .reduce(
                    (acc, obj) => acc + Number(obj.CreditCard_Total || 0),
                    0
                  )}
              </td>
              <td>
                {data
                  .filter((object) =>
                    String(object.Cashier)
                      .toLowerCase()
                      .includes(filters.toLowerCase())
                  )
                  .reduce(
                    (acc, obj) => acc + Number(obj.CreditCard_Count || 0),
                    0
                  )}
              </td>
              <td>
                {data
                  .filter((object) =>
                    String(object.Cashier)
                      .toLowerCase()
                      .includes(filters.toLowerCase())
                  )
                  .reduce((acc, obj) => acc + Number(obj.Coupon_Total || 0), 0)}
              </td>
              <td>
                {data
                  .filter((object) =>
                    String(object.Cashier)
                      .toLowerCase()
                      .includes(filters.toLowerCase())
                  )
                  .reduce((acc, obj) => acc + Number(obj.Coupon_Count || 0), 0)}
              </td>
              <td>
                {data
                  .filter((object) =>
                    String(object.Cashier)
                      .toLowerCase()
                      .includes(filters.toLowerCase())
                  )
                  .reduce(
                    (acc, obj) => acc + Number(obj.Voucher_Total || 0),
                    0
                  )}
              </td>
              <td>
                {data
                  .filter((object) =>
                    String(object.Cashier)
                      .toLowerCase()
                      .includes(filters.toLowerCase())
                  )
                  .reduce(
                    (acc, obj) => acc + Number(obj.Voucher_Count || 0),
                    0
                  )}
              </td>
              <td>
                {data
                  .filter((object) =>
                    String(object.Cashier)
                      .toLowerCase()
                      .includes(filters.toLowerCase())
                  )
                  .reduce(
                    (acc, obj) => acc + Number(obj.PointsRedeem_Total || 0),
                    0
                  )}
              </td>
              <td>
                {data
                  .filter((object) =>
                    String(object.Cashier)
                      .toLowerCase()
                      .includes(filters.toLowerCase())
                  )
                  .reduce(
                    (acc, obj) => acc + Number(obj.PointsRedeem_Count || 0),
                    0
                  )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="Report_button">
          <Button
            text={language === "en" ? "Export to Excel" : "تصدير إلى Excel"}
            onClick={() => exportToExcel(data, reportHeder, date)}
          />
        </div>
        <div className="Report_Selector">
          <Selector
            headerText={
              language === "en" ? "Select Chart" : "اختر الرسم البياني"
            }
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
        </div>
        <div className="Report_button">
          {selectedFild && (
            <Button
              text={language === "en" ? "Show Chart" : "عرض الرسم البياني"}
              onClick={() => handleShowChart()}
            />
          )}
        </div>
        {showChart && (
          <div className="Report_chart" ref={chartRef}>
            {selectedChart === "1" && <BarChart xData={xData} yData={yData} />}
            {/* {selectedChart === "2" && <PieChart labels={xData} data={yData} />} */}
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
