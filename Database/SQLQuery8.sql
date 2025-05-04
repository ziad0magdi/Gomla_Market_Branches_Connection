 SELECT
 pos_cashier_cashflow_summary.cashier,
 Sum(pos_cashier_cashflow_summary.cashflow_value*pos_cashier_cashflow_summary.exchange_rate) as ccash
 FROM pos_cashier_cashflow_summary  
 WHERE  
 cashier = 8820 AND
 pos_cashier_cashflow_summary.working_date BETWEEN '2025/04/30' and '2025/04/30'
 GROUP BY
 pos_cashier_cashflow_summary.cashier







--UNION  
SELECT  pos_cashier_payment_summary.branch,	pos_cashier_payment_summary.cashier	,pos_cashier_payment_summary.working_date,2 as 
flag,  1,0,  Sum(pos_cashier_payment_summary.payment_value*pos_cashier_payment_summary.exchange_rate) as csales, Sum(pos_cashier_payment_summary.payment_count) as csalescount 
FROM  pos_cashier_payment_summary  
WHERE 
cashier = 8820 AND
pos_cashier_payment_summary.working_date BETWEEN '2025/04/30' and '2025/04/30' AND ( pos_cashier_payment_summary.payment_value <> 0)  AND  ( pos_cashier_payment_summary.payment  =1) 
GROUP BY  pos_cashier_payment_summary.branch,pos_cashier_payment_summary.cashier	,pos_cashier_payment_summary.working_date,pos_cashier_payment_summary.payment,   pos_cashier_payment_summary.currency   
--UNION  
SELECT pos_cashier_payment_summary.branch,	pos_cashier_payment_summary.cashier	,	pos_cashier_payment_summary.working_date,	2 as flag,           1,0,Sum(pos_cashier_payment_summary.payment_value*pos_cashier_payment_summary.exchange_rate)  * -1 as csales, Sum(pos_cashier_payment_summary.payment_count) as csalescount  
FROM  pos_cashier_payment_summary 
WHERE 
cashier = 8820 AND
pos_cashier_payment_summary.working_date BETWEEN '2025/04/30' and '2025/04/30' AND ( pos_cashier_payment_summary.payment_value <> 0)  AND  ( pos_cashier_payment_summary.payment  =0) 
GROUP BY pos_cashier_payment_summary.branch,pos_cashier_payment_summary.cashier	,pos_cashier_payment_summary.working_date,pos_cashier_payment_summary.payment, pos_cashier_payment_summary.currency 
--UNION 
SELECT  pos_cashier_payment_summary.branch,pos_cashier_payment_summary.cashier	,pos_cashier_payment_summary.working_date, 2 as flag, pos_cashier_payment_summary.payment,0,  Sum(pos_cashier_payment_summary.payment_value*pos_cashier_payment_summary.exchange_rate) as csales,    Sum(pos_cashier_payment_summary.payment_count) as csalescount 
FROM  pos_cashier_payment_summary 
WHERE 
cashier = 8820 AND
pos_cashier_payment_summary.working_date BETWEEN '2025/04/30' and '2025/04/30' AND ( pos_cashier_payment_summary.payment_value <> 0)  AND  ( pos_cashier_payment_summary.payment  Not In (0,1)) 
GROUP BY pos_cashier_payment_summary.branch,pos_cashier_payment_summary.cashier	,pos_cashier_payment_summary.working_date,pos_cashier_payment_summary.payment,pos_cashier_payment_summary.currency 
--------------------------------------------------------------------------------------------------------------------------------------

 SELECT 
 pos_cashier_cashflow_summary.branch,
 pos_cashier_cashflow_summary.cashier,
 pos_cashier_cashflow_summary.working_date,
 1 as flag,
 pos_cashier_cashflow_summary.payment,
 pos_cashier_cashflow_summary.cashflow_type,
 Sum(pos_cashier_cashflow_summary.cashflow_value*pos_cashier_cashflow_summary.exchange_rate) as ccash,
 Sum(pos_cashier_cashflow_summary.cashflow_count) as ccashcount  
 FROM pos_cashier_cashflow_summary  
 WHERE  
 cashier = 19070 AND
 pos_cashier_cashflow_summary.working_date BETWEEN '2025/04/30' AND '2025/04/30'
 GROUP BY 
 pos_cashier_cashflow_summary.branch,
 pos_cashier_cashflow_summary.cashier,
 pos_cashier_cashflow_summary.working_date,         
 pos_cashier_cashflow_summary.payment,
 pos_cashier_cashflow_summary.cashflow_type
 



 SELECT 
 pos_cashier_cashflow_summary.branch,
 pos_cashier_cashflow_summary.cashier,
 pos_cashier_cashflow_summary.working_date,
 1 as flag,
 pos_cashier_cashflow_summary.payment,
 pos_cashier_cashflow_summary.cashflow_type,
 Sum(pos_cashier_cashflow_summary.cashflow_value*pos_cashier_cashflow_summary.exchange_rate) as ccash,
 Sum(pos_cashier_cashflow_summary.cashflow_count) as ccashcount  
 FROM pos_cashier_cashflow_summary  
 WHERE  
 cashier = 25729 AND
 pos_cashier_cashflow_summary.working_date BETWEEN '2025/04/01' and '2025/04/01'
 GROUP BY 
 pos_cashier_cashflow_summary.branch,
 pos_cashier_cashflow_summary.cashier,
 pos_cashier_cashflow_summary.working_date,         
 pos_cashier_cashflow_summary.payment,
 pos_cashier_cashflow_summary.cashflow_type    