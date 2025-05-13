const QueryEx = require("../Config/QueryEx");
const db = require("../Config/db");

class UsersModel {
  /*----------------------------Get All Users----------------------------------*/
  static async getAllUsers(user_Id) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = `SELECT 
user_id, 
user_fname + ' ' + user_lname AS 'Employee_Full_Name',
user_phone,
user_email,
B.branch_name,
D.department_name, 
UG.group_role,
isApproved
FROM users AS U
INNER JOIN departments AS D 
ON U.user_department_id = D.department_id
INNER JOIN branches AS B
ON U.user_branch_id = B.branch_id
INNER JOIN users_groups AS UG
ON U.user_group_id = UG.group_id
WHERE user_Id <> @user_Id`;
      const params = {
        user_Id: user_Id,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset;
    } catch (err) {
      console.error("Error fetching all users:", err);
      throw err;
    }
  }

  /*----------------------------Get All Users Approved----------------------------------*/
  static async getApprovedUsers(selectedDBConfig) {
    let dbconfig;
    if (selectedDBConfig) {
      dbconfig = selectedDBConfig;
    } else {
      dbconfig = db.primaryConfig;
    }
    try {
      const query = `SELECT 
user_id, 
user_fname + ' ' + user_lname AS 'Employee_Full_Name',
user_phone,
user_email,
B.branch_name,
D.department_name, 
user_group_id
FROM users AS U
INNER JOIN departments AS D 
ON U.user_department_id = D.department_id
INNER JOIN branches AS B
ON U.user_branch_id = B.branch_id
WHERE isApproved = 'y'`;
      const result = await QueryEx.executeQuery(dbconfig, query);
      return result.recordset;
    } catch (err) {
      console.error("Error fetching all users:", err);
      throw err;
    }
  }
  /*----------------------------Get One User----------------------------------*/
  static async getOneUser(userId) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = `"SELECT * FROM users WHERE user_id = @user_id"`;
      const params = { user_id: userId };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset[0]; // Return a single user
    } catch (err) {
      console.error("Error fetching user:", err);
      throw err;
    }
  }
  /*----------------------------Get One User By Email And Password--------------*/
  static async getUserByEmail(user_email, selectedDBConfig) {
    let dbconfig;
    if (selectedDBConfig) {
      dbconfig = selectedDBConfig;
    } else {
      dbconfig = db.primaryConfig;
    }
    try {
      const query =
        "SELECT user_email FROM users WHERE user_email = @user_email";
      const params = {
        user_email: user_email,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset[0];
    } catch (err) {
      console.error("Error fetching user:", err);
      throw err;
    }
  }
  /*----------------------------Get One User By Email And Password--------------*/
  static async getUserPasswordByEmail(user_email) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query =
        "SELECT user_password FROM users WHERE user_email = @user_email";
      const params = {
        user_email: user_email,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset[0];
    } catch (err) {
      console.error("Error fetching user:", err);
      throw err;
    }
  }
  /*----------------------------Get One User By user_id And Password--------------*/
  static async getUserPasswordByUserId(user_id) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = "SELECT user_password FROM users WHERE user_id = @user_id";
      const params = {
        user_id: user_id,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset[0];
    } catch (err) {
      console.error("Error fetching user:", err);
      throw err;
    }
  }
  /*----------------------------Get One User information By Email And Password--------------*/
  static async getUserInfoByEmail(user_email) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = "SELECT * FROM users WHERE user_email = @user_email";
      const params = {
        user_email: user_email,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset[0];
    } catch (err) {
      console.error("Error fetching user:", err);
      throw err;
    }
  }
  /*----------------------------Get One User information By Email And Password--------------*/
  static async ChangePassword(newpassword, user_id) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query =
        "UPDATE users SET user_password = @newpassword WHERE user_id = @user_id";
      const params = {
        newpassword: newpassword,
        user_id: user_id,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset[0];
    } catch (err) {
      console.error("Error Updateing User Password:", err);
      throw err;
    }
  }
  /*----------------------------Add New User----------------------------------*/
  static async addUser(
    user_fname,
    user_lname,
    user_phone,
    user_email,
    user_password,
    user_branch_id,
    user_department_id
  ) {
    let dbconfig;
    dbconfig = db.primaryConfig;

    try {
      const query = `
          INSERT INTO users (user_fname, user_lname, user_phone, user_email, user_password, user_branch_id, user_department_id, user_group_id, isApproved)
          VALUES (@user_fname, @user_lname, @user_phone, @user_email, @user_password, @user_branch_id, @user_department_id, @user_group_id ,@isApproved)`;
      const params = {
        user_fname: user_fname,
        user_lname: user_lname,
        user_phone: user_phone,
        user_email: user_email,
        user_password: user_password,
        user_branch_id: user_branch_id,
        user_department_id: user_department_id,
        user_group_id: 3,
        isApproved: "n",
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.rowsAffected;
    } catch (err) {
      console.error("Error adding user:", err);
      throw err;
    }
  }

  /*----------------------------Get All Employee In the same Department as the Manager-----------------------------*/
  static async GetAllEmployeeWithSpacificUser(user_id) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = `SELECT 
      U.user_id,
      U.user_fname + ' ' + user_lname AS 'Employee_Full_Name',
      U.user_phone,
      U.isApproved,
	  UG.group_role
FROM users AS U
INNER JOIN users_groups AS UG
ON U.user_group_id = UG.group_id
WHERE (user_department_id = (SELECT user_department_id FROM users WHERE user_id = @user_id)
 AND user_branch_id = (SELECT user_branch_id FROM users WHERE user_id = @user_id))
  AND user_id <> @user_id `;
      const params = {
        user_id: user_id,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset;
    } catch (error) {
      console.error("Error fetching users:", err);
      throw err;
    }
  }
  /*----------------------------Get All Approve Employee In the same Department as the Manager-----------------------------*/
  static async GetApprovedEmployeeWithSpacificUser(user_id) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = `SELECT 
      U.user_id,
      U.user_fname + ' ' + user_lname AS 'Employee_Full_Name',
      U.user_phone,
      U.isApproved,
	  UG.group_role
FROM users AS U
INNER JOIN users_groups AS UG
ON U.user_group_id = UG.group_id
WHERE (user_department_id = (SELECT user_department_id FROM users WHERE user_id = @user_id)
 AND user_branch_id = (SELECT user_branch_id FROM users WHERE user_id = @user_id) AND isApproved = 'y')
  AND user_id <> @user_id `;
      const params = {
        user_id: user_id,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset;
    } catch (error) {
      console.error("Error fetching users:", err);
      throw err;
    }
  }

  /*----------------------------Approve New Employees Accounts By the Manger----------------------------------*/
  static async ApproveAccounts(user_id) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = `UPDATE users
        SET isApproved = 'y'
        WHERE user_id = @user_id`;
      const params = {
        user_id: user_id,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset;
    } catch (error) {
      console.error("Error Approving user:", err);
      throw err;
    }
  }
  /*----------------------------Decline (DELETE) New Employees Accounts By the Manger----------------------------------*/
  static async DeclineAccounts(user_id) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = `DELETE FROM users WHERE user_id = @user_id`;
      const params = {
        user_id: user_id,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset;
    } catch (error) {
      console.error("Error Declineing user:", err);
      throw err;
    }
  }
}

module.exports = UsersModel;
