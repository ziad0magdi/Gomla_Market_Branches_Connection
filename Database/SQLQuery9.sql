--  ملخص حركات الكاشير
-- التقارير
-- 1 - تقرير المبيعات من نقاط البيع للحاسب
-- 2 - تقرير جرد الصراف
-- 3 - تقرير اجمالى عجوزات و زيادات الصراقين

-- طرق دفع العميل
select * from sys_payment order by payment
/*
0	الباقى
1	نقدى
2	كارت ائتمان
3	شيك
4	كوبون
*/
----   حركات بونات العملاء
-- البونات
select pos_id ,sum (totalvalue) s_invoice from sal_invoices where invoicedate = '20210421'    group by pos_id order by pos_id
-- أصناف البونات
select pos_id ,sum (totalvalue) s_invoice from sal_invoices_items  where invoicedate = '20210421'    group by pos_id order by pos_id
-- مدفوعات العميل
select pos_id ,sum (trans_total) s_invoice from sal_invoice_payments where invoicedate = '20210421'    group by pos_id order by pos_id

-------  تقفيلة الكاشير
-- الملخص
select pos_id ,sum (cashflow_value) cash_sum from pos_cashier_cashflow_summary where working_date = '20210421' group by pos_id order by pos_id
-- المدفوعات
select pos_id ,sum (payment_value) pay_sum from pos_cashier_payment_summary where working_date = '20210421'    group by pos_id order by pos_id
-- المبيعات
select pos_id ,sum (sales_category_value) sal_sum from pos_cashier_sales_summary where working_date = '20210421'    group by pos_id order by pos_id
select * from pos_cashier_summary where working_date = '20210421'  


select cashierno,pos_id ,sum (totalvalue) s_invoice from sal_invoices where invoicedate = '20210421'    group by cashierno,pos_id order by cashierno,pos_id
select cashierno,pos_id ,sum (trans_total)s_payment from sal_invoice_payments where invoicedate = '20210421'    group by cashierno,pos_id order by cashierno,pos_id

select cashier,pos_id ,sum (cashflow_value) cash_sum from pos_cashier_cashflow_summary where working_date = '20210421'  and cashflow_value > 0 group by cashier,pos_id order by cashier,pos_id
select cashier,pos_id ,sum (payment_value) pay_sum from pos_cashier_payment_summary where working_date = '20210421'    and payment_value > 0group by cashier,pos_id order by cashier,pos_id
select cashier,pos_id ,sum (sales_category_value) sal_sum from pos_cashier_sales_summary where working_date = '20210421'   and sales_category_value > 0  group by cashier,pos_id order by cashier,pos_id