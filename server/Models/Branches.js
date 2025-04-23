const QueryEx = require("../Config/QueryEx");
const db = require("../Config/db");
const bcrypt = require("bcryptjs");
class BeanchesModel {
  /*----------------------------Get All Users----------------------------------*/
  static async getCashirInfo(selectedDBConfig) {
    let dbconfig;
    dbconfig = selectedDBConfig;
    console.log("Database config in Model >>> ", dbconfig);
    try {
      const query = `
      DECLARE @date_from DATE = (SELECT GETDATE() 'dd.MM.YYYY')        
      DECLARE @date_to DATETIME  =(SELECT GETDATE() 'dd.MM.YYYY')     
      SELECT 
  pos_cashier_payment_summary.branch,
  pos_cashier_payment_summary.cashier 'Cashir',
  SUM((CASE  WHEN  payment = 1  THEN 1 ELSE 0 END) * payment_value) - SUM((CASE  WHEN payment = 0 THEN 1 ELSE 0 END) * payment_value ) AS 'monetary' ,
  SUM((CASE  WHEN  payment = 2  THEN 1 ELSE 0 END) * payment_value) + SUM((CASE  WHEN payment = 7 THEN 1 ELSE 0 END) * payment_value ) AS 'credit',
  SUM((CASE  WHEN  payment = 3  THEN 1 ELSE 0 END) * payment_value) + SUM((CASE  WHEN payment = 6 THEN 1 ELSE 0 END) * payment_value ) AS 'Checks',
  SUM((CASE  WHEN  payment = 4  THEN 1 ELSE 0 END) * payment_value) AS Coupons,
  SUM((CASE  WHEN  payment = 9  THEN 1 ELSE 0 END)* payment_value) AS  'prepaid_card',
  SUM((CASE  WHEN  payment = 10 THEN 1 ELSE 0 END) * payment_value) AS 'Redeem_points'      
  FROM pos_cashier_payment_summary
  WHERE ( 
  pos_cashier_payment_summary.pos_id <> 9999
  AND pos_cashier_payment_summary.working_date between @date_from AND @date_to
  )
  GROUP BY pos_cashier_payment_summary.branch,
  pos_cashier_payment_summary.cashier,
  pos_cashier_payment_summary.currency   
  order by cashier`;
      const result = await QueryEx.executeQuery(dbconfig, query);
      return result.recordset;
    } catch (err) {
      console.error("Error fetching all users:", err);
      throw err;
    }
  }
}

module.exports = BeanchesModel;
