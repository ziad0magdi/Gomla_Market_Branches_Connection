INSERT INTO branches (branch_name, branch_ip, database_name) VALUES
('الإدارة العامة', '10.110.201.5', 'retail'),
('مخزن مرغم', '10.174.6.5', 'retail'),
('روز جاردن', '10.174.6.5', 'retail'),
('سان استفانو', '10.174.1.5', 'retail'),
('جناكليس', '10.174.2.5', 'retail'),
('الإبراهيمية', '10.174.3.5', 'retail'),
('بيانكى', '10.174.7.5', 'retail'),
('محرم بك', '10.174.4.5', 'retail'),
('المنتزة', '10.174.100.5', 'retail'),
('القاهرة العبور', '10.174.10.5', 'retail'),
('العصافرة', '10.174.12.5', 'retail'),
('الساحل', '10.174.11.5', 'retail'),
('المنصورة', '10.174.13.5', 'retail'),
('الزيتون', '10.174.14.5', 'retail'),
('الفراعنة', '10.174.15.5', 'retail'),
('سبورتنج', '10.174.16.5', 'retail'),
('منشا', '10.174.19.5', 'retail'),
('راغب', '10.174.23.5', 'retail'),
('مارينا', '10.174.25.5', 'retail'),
('برج العرب', '10.174.24.5', 'retail'),
('مخازن النهضة', '10.174.26.5', 'retail'),
('وابور المياة', '10.174.28.5', 'retail'),
('الجمرك', '10.174.30.5', 'retail'),
('ميدان العروسة', '10.174.32.5', 'retail'),
('مخزن الجملة', '10.174.6.5', 'retail'),
('الهرم (سهل حمزة)', '10.174.34.5', 'retail'),
('ميامى', '10.174.35.5', 'retail'),
('جرين تاورز', '10.174.36.5', 'retail'),
('بشاير الخير', '10.174.38.5', 'retail'),
('مستلزمات الادارة', '10.110.201.5', 'retail'),
('خالد بن الوليد', '10.174.37.5', 'retail'),
('محطة الرمل', '10.174.40.5', 'retail'),
('التجمع', '10.174.45.5', 'retail'),
('اكتوبر', '10.174.46.5', 'retail'),
('الكوثر-شارع المطار', '10.174.48.5', 'retail'),
('جسر السويس', '10.174.50.5', 'retail'),
('الهرم (مشعل)', '10.174.49.5', 'retail'),
('مخزن جملة النهضة', '10.174.26.5', 'retail'),
('روز جاردنTest', '10.174.6.5', 'retail');


INSERT INTO users_groups (group_role, group_privilege) VALUES 
('Admin', 'Full Access'), 
('Manager', 'Moderate Access'), 
('Employee', 'Limited Access');

INSERT INTO departments (department_name) 
VALUES 
('Accounting Department'), 
('IT Department'), 
('HR Department');

INSERT INTO users (
    user_fname,
	user_lname,
	user_phone,
	user_email,
	user_password,
    user_group_id,
	user_branch_id,
	user_department_id) 
VALUES
	('ziad', 'magdy', '01278653311', 'ali.khalid@gomlamarket.com', '$2a$10$UZuvcGYd91IQHJuEtnCvTOmVmgmW.e4fSQMl1OMWvJypaEjSEcGPy', 1, 1, 1), --password pass1
	('Mohammed', 'Ayman', '01145967377', 'mohammed.ayman@gomlamarket.com', '$2a$10$8sAj2VYG.OIGCp3yA9nkQexBW5G3FDuJgDz/N.cF1iAnPbb34VPRa', 2, 2, 2), --password pas2
	('Mohammed', 'tarke', '01047859411', 'mohammed.tarke@gomlamarket.com', '$2a$10$kPSU3VboNnnIgbaI7R6n6.wcisqTHUj41irY/A5u5Z99b5StRPgsi', 3, 3, 3); --password pass3

INSERT INTO users_branches (branch_id, user_id, user_database_username, user_database_password) VALUES
(1, 1, 'ziad', '123456'),
(2, 2, 'Mohammed', '123456'),
(3, 3, 'Mohammed', '123456');


