select * from sal_invoice_payments where invoicedate = '20250401' and doctype in (2030,2080) and pos_id <> 9999 and cashierno = 7392


select  tender_type,sum(trans_total) trans_total from sal_invoice_payments where invoicedate = '20250401' and doctype in (2030,2080) and pos_id <> 9999 and cashierno = 7392 group by tender_type



select  payment,sum(payment_value) from pos_cashier_payment_summary where working_date = '20250401'and pos_id <> 9999 and cashier = 7392  and payment_value > 0.00 group by payment


select  payment,sum(payment_value) from pos_cashier_payment_summary where working_date = '20250401'and pos_id <> 9999 and cashier = 7392  and payment_value > 0.00 group by payment
