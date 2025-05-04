-- مبيعات الكاشير
SELECT 
sal_invoices_items.branch,
sal_invoices_items.transportation AS cashierno,
pos_id,
sal_invoices_items.doctype,
sal_invoices_items.invoicedate,              
SUM(sal_invoices_items.qty * sal_invoices_items.costprice) AS cost_value,
SUM(sal_invoices_items.qty * sal_invoices_items.unitprice )AS totalvalue,              
SUM(ISNULL(sal_invoices_items.discountvalue,0)) AS totaldiscount        
FROM sal_invoices_items     
WHERE (
sal_invoices_items.company = 1  AND
sal_invoices_items.pos_id  <> 9999 AND
sal_invoices_items.doctype IN (2080,2030) AND
sal_invoices_items.sector = 4 AND sal_invoices_items.region = 41 AND
sal_invoices_items.branch = 411 AND  sal_invoices_items.transtype = 201 AND
sal_invoices_items.pos_id  <> 9999  AND sal_invoices_items.invoicedate 
BETWEEN '2025/04/26' AND '2025/04/26'
) 
GROUP BY 
sal_invoices_items.branch,
sal_invoices_items.transportation,
pos_id,
sal_invoices_items.invoicedate,
sal_invoices_items.doctype
UNION
SELECT
branch,
cashierno,
pos_id,
99,
invoicedate ,
0 AS cost_value,
0 AS totalvalue,
SUM(ISNULL(discounts,0))  AS tot_discount
FROM sal_invoices  
WHERE discounts <> 0   
AND ( 
sal_invoices.company = 1  AND
sal_invoices.pos_id <> 9999 AND
sal_invoices.doctype IN (2080,2030) AND
sal_invoices.sector = 4 AND 
sal_invoices.region = 41 AND 
sal_invoices.branch = 411 AND  
sal_invoices.transtype =201  AND  
sal_invoices.pos_id <> 9999 AND  
sal_invoices.doctype IN (2080,2030) AND
sal_invoices.invoicedate BETWEEN '2025/04/26' AND '2025/04/26'
) 
GROUP BY 
branch,
cashierno,
pos_id,
invoicedate
------------------------------------------------------
--  التقفيلة
SELECT 
pos_cashier_payment_summary.cashier,
pos_cashier_payment_summary.payment,
sys_payment.a_name,
pos_cashier_payment_summary.pos_id,
CASE WHEN pos_cashier_payment_summary.payment = 0 THEN SUM(pos_cashier_payment_summary.payment_value * -1) 
WHEN pos_cashier_payment_summary.payment <> 0 THEN SUM(pos_cashier_payment_summary.payment_value)
END AS pp
FROM pos_cashier_payment_summary, sys_payment
WHERE 
pos_cashier_payment_summary.payment =  sys_payment.payment AND
working_date = '20250401'  AND pos_id <> 9999 AND
payment_value > 0.00  
GROUP BY
pos_cashier_payment_summary.cashier,
pos_cashier_payment_summary.payment,
sys_payment.a_name,
pos_cashier_payment_summary.pos_id
ORDER BY 
pos_cashier_payment_summary.payment,
pos_cashier_payment_summary.cashier,
sys_payment.a_name,
pos_cashier_payment_summary.pos_id
--  54020  -- 2   28535.60     --999.65

/*
النقدي في التقرير = النقدي في الكويري - الباقي في الكويري

*/
SELECT * FROM sys_payment