
SELECT 
  cashier,
  ISNULL([الباقى], 0) AS [الباقى],
  ISNULL([نقدى] +  [الباقى], 0) AS [نقدى] ,
  ISNULL([كارت ائتمان], 0) AS [كارت ائتمان],
  ISNULL([كوبون], 0) AS [كوبون],
  ISNULL([Voucher], 0) AS [Voucher],
  ISNULL([إستبدال نقاط], 0) AS [إستبدال نقاط],
  [نقدى] + [كارت ائتمان] + [كوبون] + [Voucher] +  [إستبدال نقاط] + [Voucher] AS [القيمة المسددة]
FROM (
  SELECT 
    pos_cashier_payment_summary.cashier,
    sys_payment.a_name,
    CASE 
      WHEN pos_cashier_payment_summary.payment = 0 THEN pos_cashier_payment_summary.payment_value * -1
      ELSE pos_cashier_payment_summary.payment_value
    END AS payment_value
  FROM 
    pos_cashier_payment_summary
  JOIN 
    sys_payment ON pos_cashier_payment_summary.payment = sys_payment.payment
  WHERE 
    working_date = '2025-04-01' AND 
    pos_cashier_payment_summary.pos_id <> 9999 AND
    pos_cashier_payment_summary.payment_value > 0
) AS SourceTable
PIVOT (
  SUM(payment_value)
  FOR a_name IN ([الباقى], [نقدى], [كارت ائتمان], [كوبون], [Voucher], [إستبدال نقاط])
) AS PivotTable
ORDER BY cashier;

-------------------------------------------------------------------------------------------------


SELECT 
  pos_cashier_payment_summary.cashier,
  SUM(CASE WHEN a_name = N'الباقى' THEN payment_value * -1 ELSE 0 END) AS Remaining_Total,
  COUNT(CASE WHEN a_name = N'الباقى' THEN 1 END) AS Remaining_Count,
  SUM(CASE 
        WHEN a_name = N'نقدى' THEN payment_value
        WHEN a_name = N'الباقى' THEN payment_value * -1
        ELSE 0
      END) AS Cash_Total,
  COUNT(CASE WHEN a_name IN (N'نقدى', N'الباقى') THEN 1 END) AS Cash_Count,
  SUM(CASE WHEN a_name = N'كارت ائتمان' THEN payment_value ELSE 0 END) AS CreditCard_Total,
  COUNT(CASE WHEN a_name = N'كارت ائتمان' THEN 1 END) AS CreditCard_Count,
  SUM(CASE WHEN a_name = N'كوبون' THEN payment_value ELSE 0 END) AS Coupon_Total,
  COUNT(CASE WHEN a_name = N'كوبون' THEN 1 END) AS Coupon_Count,
  SUM(CASE WHEN a_name = N'Voucher' THEN payment_value ELSE 0 END) AS Voucher_Total,
  COUNT(CASE WHEN a_name = N'Voucher' THEN 1 END) AS Voucher_Count,
  SUM(CASE WHEN a_name = N'إستبدال نقاط' THEN payment_value ELSE 0 END) AS PointsRedeem_Total,
  COUNT(CASE WHEN a_name = N'إستبدال نقاط' THEN 1 END) AS PointsRedeem_Count,
  (
    SUM(CASE 
          WHEN a_name = N'نقدى' THEN payment_value
          WHEN a_name = N'الباقى' THEN payment_value * -1
          ELSE 0
        END)
	+ SUM(CASE WHEN a_name = N'كارت ائتمان' THEN payment_value ELSE 0 END)
    + SUM(CASE WHEN a_name = N'كوبون' THEN payment_value ELSE 0 END)
    + SUM(CASE WHEN a_name = N'Voucher' THEN payment_value ELSE 0 END)
  ) AS Sold_Value
FROM 
  pos_cashier_payment_summary
JOIN 
  sys_payment 
  ON pos_cashier_payment_summary.payment = sys_payment.payment

WHERE 
  pos_cashier_payment_summary.working_date = '20250401' AND 
  pos_cashier_payment_summary.pos_id <> 9999 AND
  pos_cashier_payment_summary.payment_value > 0
GROUP BY 
  pos_cashier_payment_summary.cashier
ORDER BY 
  pos_cashier_payment_summary.cashier;



   SELECT
 pos_cashier_cashflow_summary.cashier,
 Sum(pos_cashier_cashflow_summary.cashflow_value*pos_cashier_cashflow_summary.exchange_rate) as ccash
 FROM pos_cashier_cashflow_summary  
 WHERE  
 cashier = 23051 AND
 pos_cashier_cashflow_summary.working_date BETWEEN '2025/04/01' and '2025/04/01'
 GROUP BY
 pos_cashier_cashflow_summary.cashier




 SELECT TOP 5 * FROM pos_cashier_payment_summary  ORDER BY cashier DESC
	    
 SELECT TOP 5 * FROM pos_cashier_cashflow_summary ORDER BY cashier DESC

 -----------------------------------------------------------------------------
 SELECT 
  p.cashier,
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
  cf.Paid_value,
  cf.Paid_value - (
    SUM(CASE 
          WHEN a_name = N'نقدى' THEN p.payment_value
          WHEN a_name = N'الباقى' THEN p.payment_value * -1
          ELSE 0
        END)
    + SUM(CASE WHEN a_name = N'كارت ائتمان' THEN p.payment_value ELSE 0 END)
    + SUM(CASE WHEN a_name = N'كوبون' THEN p.payment_value ELSE 0 END)
    + SUM(CASE WHEN a_name = N'Voucher' THEN p.payment_value ELSE 0 END)
	+ SUM(CASE WHEN a_name = N'إستبدال نقاط' THEN p.payment_value ELSE 0 END)
  ) AS Value_difference,
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
    SUM(cashflow_value * exchange_rate) AS Paid_value
  FROM 
    pos_cashier_cashflow_summary
  WHERE 
    working_date BETWEEN '2025/04/30' AND '2025/04/30'
  GROUP BY 
    cashier
) cf ON p.cashier = cf.cashier
WHERE 
  p.working_date = '20250430' AND 
  p.pos_id <> 9999 AND
  p.payment_value > 0
GROUP BY 
  p.cashier, cf.Paid_value
ORDER BY 
  p.cashier;
-----------------------------------------------------------------------

   SELECT 
  p.cashier,
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
  cf.Paid_value,
  cf.Paid_value - (
    SUM(CASE 
          WHEN a_name = N'نقدى' THEN p.payment_value
          WHEN a_name = N'الباقى' THEN p.payment_value * -1
          ELSE 0
        END)
    + SUM(CASE WHEN a_name = N'كارت ائتمان' THEN p.payment_value ELSE 0 END)
    + SUM(CASE WHEN a_name = N'كوبون' THEN p.payment_value ELSE 0 END)
    + SUM(CASE WHEN a_name = N'Voucher' THEN p.payment_value ELSE 0 END)
	+ SUM(CASE WHEN a_name = N'إستبدال نقاط' THEN p.payment_value ELSE 0 END)
  ) AS Value_difference,
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
        WHEN pos_id = 100 THEN cashflow_value * -1 * exchange_rate 
        ELSE cashflow_value * exchange_rate 
      END
    ) AS Paid_value
  FROM 
    pos_cashier_cashflow_summary
  WHERE 
    working_date BETWEEN '2025/04/30' AND '2025/04/30'
  GROUP BY 
    cashier
) cf ON p.cashier = cf.cashier
WHERE 
  p.working_date = '20250401' AND 
  p.pos_id <> 9999 AND
  p.payment_value > 0
GROUP BY 
  p.cashier, cf.Paid_value
ORDER BY 
  p.cashier;