const QueryEx = require("../Config/QueryEx");
const db = require("../Config/db");
class BranchesModel {
  /*------------------------GET All Branchs-------------------------*/
  static async getAllBranches() {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = "SELECT * FROM branches";
      const result = await QueryEx.executeQuery(dbconfig, query);
      return result.recordset;
    } catch (err) {
      console.error("Error fetching Branches:", err);
      throw err;
    }
  }
  /*----------------------------Get All Users----------------------------------*/
  static async getCashirInfo(selectedDBConfig, date) {
    let dbconfig;
    dbconfig = selectedDBConfig;
    try {
      const query = `      
      DECLARE @date_to DATETIME  =(SELECT GETDATE() 'dd.MM.YYYY')
      SELECT 
  pos_cashier_payment_summary.branch,
  pos_cashier_payment_summary.cashier 'Cashier',
  SUM((CASE  WHEN  payment = 1  THEN 1 ELSE 0 END) * payment_value) - SUM((CASE  WHEN payment = 0 THEN 1 ELSE 0 END) * payment_value ) AS 'monetary' ,
  SUM((CASE  WHEN  payment = 2  THEN 1 ELSE 0 END) * payment_value) + SUM((CASE  WHEN payment = 7 THEN 1 ELSE 0 END) * payment_value ) AS 'credit',
  SUM((CASE  WHEN  payment = 3  THEN 1 ELSE 0 END) * payment_value) + SUM((CASE  WHEN payment = 6 THEN 1 ELSE 0 END) * payment_value ) AS 'Checks',
  SUM((CASE  WHEN  payment = 4  THEN 1 ELSE 0 END) * payment_value) AS Coupons,
  SUM((CASE  WHEN  payment = 9  THEN 1 ELSE 0 END)* payment_value) AS  'prepaid_card',
  SUM((CASE  WHEN  payment = 10 THEN 1 ELSE 0 END) * payment_value) AS 'Redeem_points'      
  FROM pos_cashier_payment_summary
  WHERE ( 
  pos_cashier_payment_summary.pos_id <> 9999
  AND pos_cashier_payment_summary.working_date between @date AND @date_to
  )
  GROUP BY pos_cashier_payment_summary.branch,
  pos_cashier_payment_summary.cashier,
  pos_cashier_payment_summary.currency   
  order by cashier`;
      const params = {
        date: date,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset;
    } catch (err) {
      console.error("Error fetching all users:", err);
      throw err;
    }
  }
  /*----------------------------Report on the total deficits and increases of the money changers----------------------------------*/
  static async TotalCashierDeficitsAndIncreases(selectedDBConfig, date) {
    let dbconfig;
    dbconfig = selectedDBConfig;
    console.log(dbconfig);
    try {
      const query = `SELECT 
  p.cashier AS Cashier,
    (
    SUM(CASE 
          WHEN a_name = N'نقدى' THEN p.payment_value
          WHEN a_name = N'الباقى' THEN p.payment_value * -1
          ELSE 0
        END)
    + SUM(CASE WHEN a_name = N'كارت ائتمان' THEN p.payment_value ELSE 0 END)
    + SUM(CASE WHEN a_name = N'كوبون' THEN p.payment_value ELSE 0 END)
    + SUM(CASE WHEN a_name = N'Voucher' THEN p.payment_value ELSE 0 END)
	+ SUM(CASE WHEN a_name = N'إستبدال نقاط' THEN p.payment_value ELSE 0 END)
  ) AS Sold_Value,
  cf.Paid_Value,
  ABS(cf.Paid_value) - ABS(
    SUM(CASE 
          WHEN a_name = N'نقدى' THEN p.payment_value
          WHEN a_name = N'الباقى' THEN p.payment_value * -1
          ELSE 0
        END)
    + SUM(CASE WHEN a_name = N'كارت ائتمان' THEN p.payment_value ELSE 0 END)
    + SUM(CASE WHEN a_name = N'كوبون' THEN p.payment_value ELSE 0 END)
    + SUM(CASE WHEN a_name = N'Voucher' THEN p.payment_value ELSE 0 END)
	+ SUM(CASE WHEN a_name = N'إستبدال نقاط' THEN p.payment_value ELSE 0 END)
  ) AS Value_Difference,
  SUM(CASE WHEN a_name = N'الباقى' THEN p.payment_value * -1 ELSE 0 END) AS Remaining_Total,
  COUNT(CASE WHEN a_name = N'الباقى' THEN 1 END) AS Remaining_Count,
  SUM(CASE 
        WHEN a_name = N'نقدى' THEN p.payment_value
        WHEN a_name = N'الباقى' THEN p.payment_value * -1
        ELSE 0
      END) AS Cash_Total,
  COUNT(CASE WHEN a_name IN (N'نقدى', N'الباقى') THEN 1 END) AS Cash_Count,
  SUM(CASE WHEN a_name = N'كارت ائتمان' THEN p.payment_value ELSE 0 END) AS CreditCard_Total,
  COUNT(CASE WHEN a_name = N'كارت ائتمان' THEN 1 END) AS CreditCard_Count,
  SUM(CASE WHEN a_name = N'كوبون' THEN p.payment_value ELSE 0 END) AS Coupon_Total,
  COUNT(CASE WHEN a_name = N'كوبون' THEN 1 END) AS Coupon_Count,
  SUM(CASE WHEN a_name = N'Voucher' THEN p.payment_value ELSE 0 END) AS Voucher_Total,
  COUNT(CASE WHEN a_name = N'Voucher' THEN 1 END) AS Voucher_Count,
  SUM(CASE WHEN a_name = N'إستبدال نقاط' THEN p.payment_value ELSE 0 END) AS PointsRedeem_Total,
  COUNT(CASE WHEN a_name = N'إستبدال نقاط' THEN 1 END) AS PointsRedeem_Count
FROM 
  pos_cashier_payment_summary p
JOIN 
  sys_payment sp ON p.payment = sp.payment
LEFT JOIN (
  SELECT 
  cashier,
    SUM(
      CASE 
        WHEN cashflow_type = 2 THEN -1 * cashflow_value * exchange_rate
        ELSE cashflow_value * exchange_rate
      END
    ) AS Paid_value
FROM 
    pos_cashier_cashflow_summary
  WHERE 
    working_date BETWEEN @date AND @date
  GROUP BY 
    cashier
) cf ON p.cashier = cf.cashier
WHERE 
  p.working_date = @date AND 
  p.pos_id <> 9999 AND
  p.payment_value > 0
GROUP BY 
  p.cashier, cf.Paid_value
ORDER BY 
  p.cashier;
`;
      const params = {
        date: date,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset;
    } catch (err) {
      console.error("Error fetching all users:", err);
      throw err;
    }
  }
}

module.exports = BranchesModel;
