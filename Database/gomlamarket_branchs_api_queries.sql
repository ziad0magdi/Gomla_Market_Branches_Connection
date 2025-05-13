SELECT * FROM reports
---- GET All databases For 1 User
SELECT
B.branch_name,
B.branch_id,
B.branch_ip,
U.user_fname + ' ' + U.user_lname AS 'User_Full_Name',
B.database_name
FROM branches AS B
INNER JOIN users_branches AS UB
ON B.branch_id = UB.branch_id
INNER JOIN users AS U
ON U.user_id = UB.user_id
WHERE U.user_id = 1

SELECT * FROM branches
SELECT * FROM users
SELECT * FROM users_branches

---- Get 1 Selected Database For 1 User
SELECT
B.branch_ip,
B.database_name,
UB.user_database_username,
UB.user_database_password
FROM branches AS B
INNER JOIN users_branches AS UB
ON B.branch_id = UB.branch_id
INNER JOIN users AS U
ON U.user_id = UB.user_id
WHERE B.branch_id = 1

---- Get user's Reports
SELECT 
R.report_id,
R.report_name
FROM reports AS R 
INNER JOIN users_reports AS UR
ON R.report_id = UR.report_id
WHERE UR.user_id = 1

SELECT * FROM users_reports

-------------------Get All Users With A Spasific user in the Department
UPDATE users SET user_password = '' WHERE user_id = 1


-----------Get all branches user dont have But Admin have---------------------------
SELECT 
branch_id,
branch_name 
FROM branches 
WHERE 
branch_id NOT IN (SELECT 
B.branch_id
FROM branches AS B
LEFT JOIN users_branches AS UB
ON UB.branch_id = B.branch_id
WHERE UB.user_id = 12) AND branch_id IN (SELECT 
B.branch_id
FROM branches AS B
LEFT JOIN users_branches AS UB
ON UB.branch_id = B.branch_id
WHERE UB.user_id = 2)

-----------Get all Reports user dont have---------------------------
SELECT report_id, report_name FROM reports WHERE report_id NOT IN (SELECT 
R.report_id
FROM reports AS R 
INNER JOIN users_reports AS UR
ON R.report_id = UR.report_id
WHERE UR.user_id = 2)

-----------Get all Reports user dont have but manager have---------------------------
SELECT report_id, report_name FROM reports WHERE report_id NOT IN (SELECT 
R.report_id
FROM reports AS R 
INNER JOIN users_reports AS UR
ON R.report_id = UR.report_id
WHERE UR.user_id = 4) AND report_id IN (SELECT 
R.report_id
FROM reports AS R 
INNER JOIN users_reports AS UR
ON R.report_id = UR.report_id
WHERE UR.user_id = 2
)



SELECT 
      U.user_id,
      U.user_fname + ' ' + user_lname AS 'Employee_Full_Name',
      U.user_phone,
      U.isApproved,
	  UG.group_role
FROM users AS U
INNER JOIN users_groups AS UG
ON U.user_group_id = UG.group_id
WHERE (user_department_id = (SELECT user_department_id FROM users WHERE user_id = 2)
 AND user_branch_id = (SELECT user_branch_id FROM users WHERE user_id = 2) AND isApproved = 'y')
  AND user_id <> 2


SELECT 
user_id, 
user_fname + ' ' + user_lname AS 'Employee_Full_Name',
user_phone,
user_email,
B.branch_name,
D.department_name, 
UG.group_role AS 'group_role'
FROM users AS U
INNER JOIN departments AS D 
ON U.user_department_id = D.department_id
INNER JOIN branches AS B
ON U.user_branch_id = B.branch_id
INNER JOIN users_groups AS UG
ON U.user_group_id = UG.group_id
WHERE isApproved = 'y'