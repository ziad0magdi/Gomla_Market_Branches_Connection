  
  SELECT 
  pos_cashier_payment_summary.branch,
  pos_cashier_payment_summary.cashier الكاشير,
  SUM((CASE  WHEN  payment = 1  THEN 1 ELSE 0 END) * payment_value) - SUM((CASE  WHEN payment = 0 THEN 1 ELSE 0 END) * payment_value ) AS 'نقدي' ,
  SUM((CASE  WHEN  payment = 2  THEN 1 ELSE 0 END) * payment_value) + SUM((CASE  WHEN payment = 7 THEN 1 ELSE 0 END) * payment_value ) AS 'إئتمان',
  SUM((CASE  WHEN  payment = 3  THEN 1 ELSE 0 END) * payment_value) + SUM((CASE  WHEN payment = 6 THEN 1 ELSE 0 END) * payment_value ) AS 'الشيكات',
  SUM((CASE  WHEN  payment = 4  THEN 1 ELSE 0 END) * payment_value) AS الكوبونات,
  SUM((CASE  WHEN  payment = 9  THEN 1 ELSE 0 END)* payment_value) AS  'كارت مدفوع مقدماً',
  SUM((CASE  WHEN  payment = 10 THEN 1 ELSE 0 END) * payment_value) AS 'إستبدال نقاط'      
  FROM pos_cashier_payment_summary
  WHERE ( 
  pos_cashier_payment_summary.pos_id <> 9999
  and pos_cashier_payment_summary.branch = 411 and
  pos_cashier_payment_summary.working_date between '2025/04/17' and '2025/04/17'
  )
  GROUP BY pos_cashier_payment_summary.branch,
  pos_cashier_payment_summary.cashier,
  pos_cashier_payment_summary.currency   
  order by cashier
