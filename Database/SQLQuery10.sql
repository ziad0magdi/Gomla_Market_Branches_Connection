-- SERVER >>  ROSEHA       DABATABSE  >> RETAIL_T   
DECLARE @date_from DATE = (SELECT GETDATE()-2 'dd.MM.YYYY')
DECLARE @date_to DATETIME=(SELECT GETDATE()-2 'dd.MM.YYYY')
SELECT
pos_cashier_cashflow_summary.branch,
pos_cashier_cashflow_summary.cashier,
pos_cashier_cashflow_summary.working_date,
1 AS flag,
pos_cashier_cashflow_summary.payment,
pos_cashier_cashflow_summary.cashflow_type,
Sum(pos_cashier_cashflow_summary.cashflow_value * pos_cashier_cashflow_summary.exchange_rate) AS ccash,
Sum(pos_cashier_cashflow_summary.cashflow_count) AS ccashcount
FROM pos_cashier_cashflow_summary
WHERE
pos_cashier_cashflow_summary.working_date BETWEEN  @date_from AND  @date_to
GROUP BY
pos_cashier_cashflow_summary.branch,
pos_cashier_cashflow_summary.cashier,
pos_cashier_cashflow_summary.working_date,  
pos_cashier_cashflow_summary.payment,
pos_cashier_cashflow_summary.cashflow_type
UNION
SELECT
pos_cashier_payment_summary.branch,
pos_cashier_payment_summary.cashier,
pos_cashier_payment_summary.working_date,
2 AS flag,
1,
0,
Sum(pos_cashier_payment_summary.payment_value * pos_cashier_payment_summary.exchange_rate) AS csales,
Sum(pos_cashier_payment_summary.payment_count) AS csalescount
FROM  pos_cashier_payment_summary
WHERE
pos_cashier_payment_summary.working_date BETWEEN @date_from AND  @date_to
AND (pos_cashier_payment_summary.payment_value <> 0)
AND (pos_cashier_payment_summary.payment = 1)
GROUP BY  pos_cashier_payment_summary.branch,
pos_cashier_payment_summary.cashier,
pos_cashier_payment_summary.working_date,
pos_cashier_payment_summary.payment,
pos_cashier_payment_summary.currency
UNION
SELECT
pos_cashier_payment_summary.branch,
pos_cashier_payment_summary.cashier,
pos_cashier_payment_summary.working_date,
2 AS flag,
1,
0,
Sum(pos_cashier_payment_summary.payment_value * pos_cashier_payment_summary.exchange_rate)  * -1 AS csales,
Sum(pos_cashier_payment_summary.payment_count) AS csalescount
FROM  pos_cashier_payment_summary
WHERE
pos_cashier_payment_summary.working_date BETWEEN @date_from AND  @date_to
AND (pos_cashier_payment_summary.payment_value <> 0)
AND (pos_cashier_payment_summary.payment = 0)
GROUP BY pos_cashier_payment_summary.branch,
pos_cashier_payment_summary.cashier,
pos_cashier_payment_summary.working_date,
pos_cashier_payment_summary.payment,
pos_cashier_payment_summary.currency
UNION
SELECT
pos_cashier_payment_summary.branch,
pos_cashier_payment_summary.cashier,
pos_cashier_payment_summary.working_date,
2 AS flag,
pos_cashier_payment_summary.payment,
0,
Sum(pos_cashier_payment_summary.payment_value * pos_cashier_payment_summary.exchange_rate) AS csales,
Sum(pos_cashier_payment_summary.payment_count) AS csalescount
FROM  pos_cashier_payment_summary
WHERE
pos_cashier_payment_summary.working_date BETWEEN @date_from AND  @date_to
AND (pos_cashier_payment_summary.payment_value <> 0)
AND (pos_cashier_payment_summary.payment  Not In (0,1))
GROUP BY pos_cashier_payment_summary.branch,
pos_cashier_payment_summary.cashier,
pos_cashier_payment_summary.working_date,
pos_cashier_payment_summary.payment,
pos_cashier_payment_summary.currency