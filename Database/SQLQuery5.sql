-- مبيعات الكاشير
SELECT 
sal_invoices_items.branch,
sal_invoices_items.transportation AS cashierno,
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
pos_cashier_payment_summary.cashier = 7678 AND
pos_cashier_payment_summary.payment =  sys_payment.payment AND
working_date = '20250401'  AND pos_id <> 9999 AND
payment_value > 0.00  
GROUP BY
pos_cashier_payment_summary.cashier,
pos_cashier_payment_summary.payment,
sys_payment.a_name,
pos_cashier_payment_summary.pos_id
ORDER BY 
pos_cashier_payment_summary.cashier,
pos_cashier_payment_summary.payment,
sys_payment.a_name,
pos_cashier_payment_summary.pos_id
--  54020  -- 2   28535.60     --999.65


select sum(totalvalue) from sal_invoices where pos_id  =  100 and invoicedate  =  '20250401' and cashierno = 7678
--
 ---5033.140
select * from  pos_cashier_cashflow_summary	  where cashier = 7678 and working_date  = '20250401'
select pos_cashier_sales_summary.*, x.a_name from  pos_cashier_sales_summary	join sys_sales_category x on x.sales_category =pos_cashier_sales_summary.sales_category  where cashier = 7678 and working_date  = '20250401'
select * from  pos_cashier_payment_summary	  where cashier = 7678 and working_date  = '20250401'
--select * from  pos_cashier_summary			  where cashier = 7678 and working_date  = '20250401'
 --4834.050 
 select  * from sys_payment
 select * from sys_sales_category

 select * from pos_cashier_cashflow_summary
 SELECT * FROM pos_cashflow
select * from INFORMATION_SCHEMA.TABLES where TABLE_NAME like '%cashflow%'

-- Cashflow_type = 1 يسلم فلوس
-- Cashflow_type = 2 يستلم فلوس