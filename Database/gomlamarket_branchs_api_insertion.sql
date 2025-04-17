INSERT INTO branches (branch_name, branch_ip) VALUES
('Main Branch', '192.168.110.100'),
('Warehouse Branch', '192.168.110.101'),
('Sales Branch', '192.168.110.102');

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

