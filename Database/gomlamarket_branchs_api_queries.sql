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
