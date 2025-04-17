CREATE DATABASE gomlamarket_branchs_api
COLLATE Arabic_CI_AS;

USE gomlamarket_branchs_api

-- Create the branches table
CREATE TABLE branches (
    branch_id INT PRIMARY KEY IDENTITY(1,1),
    branch_name NVARCHAR(255) NOT NULL,
	branch_ip varchar(15) NOT NULL, --ex -=> 192.168.110.115
	database_name VARChAR(255)
);
-- Create the users_groups table
CREATE TABLE users_groups (
    group_id INT PRIMARY KEY IDENTITY(1,1),
    group_role NVARCHAR(255) NOT NULL,
    group_privilege VARCHAR(255) NOT NULL
);

-- Create the departments table
CREATE TABLE departments (
    department_id INT PRIMARY KEY IDENTITY(1,1),
    department_name NVARCHAR(255) NOT NULL UNIQUE
);

-- Create the users table
CREATE TABLE users (
    user_id INT PRIMARY KEY IDENTITY(1,1),
    user_fname NVARCHAR(255) NOT NULL CHECK (user_fname NOT LIKE '%[^a-zA-Z\u0600-\u06FF ]%'),
    user_lname NVARCHAR(255) NOT NULL CHECK (user_lname NOT LIKE '%[^a-zA-Z\u0600-\u06FF ]%'),
    user_phone VARCHAR(15) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE CHECK (user_email LIKE '%@gomlamarket.com'),
    user_password NVARCHAR(255) NOT NULL,
    user_group_id INT NOT NULL REFERENCES users_groups(group_id) ON DELETE CASCADE ON UPDATE CASCADE,
	user_branch_id INT NOT NULL REFERENCES branches(branch_id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_department_id INT NOT NULL REFERENCES departments(department_id) ON DELETE CASCADE ON UPDATE CASCADE,
	isApproved VARCHAR(1)
);
-- Create the branches table
CREATE TABLE users_branches (
    branch_id INT REFERENCES users(user_id),
	user_id INT REFERENCES branches(branch_id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_database_username NVARCHAR(255) NOT NULL,
    user_database_password NVARCHAR(255) NOT NULL,
	PRIMARY KEY(branch_id, user_id)
);

