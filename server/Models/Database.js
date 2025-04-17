const QueryEx = require("../Config/QueryEx");
const db = require("../Config/db");
class DatabasesModel {
  /*----------------------------Get All Databases----------------------------------*/
  static async getAllDatabases() {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = `SELECT branch_id, branch_name FROM branches`;

      const result = await QueryEx.executeQuery(dbconfig, query);
      return result.recordset;
    } catch (err) {
      console.error("Error Fetching Databases:", err);
      throw err;
    }
  }
  /*----------------------------Get All User's Databases----------------------------------*/
  static async getAllUserDatabases(user_id) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = `SELECT
B.branch_id,
B.branch_name,
B.branch_ip,
U.user_fname + ' ' + U.user_lname AS 'User_Full_Name',
B.database_name
FROM branches AS B
INNER JOIN users_branches AS UB
ON B.branch_id = UB.branch_id
INNER JOIN users AS U
ON U.user_id = UB.user_id
WHERE U.user_id = @user_id`;
      const params = {
        user_id: user_id,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset;
    } catch (err) {
      console.error("Error Fetching User Databases:", err);
      throw err;
    }
  }

  /*----------------------------Get All User's Databases----------------------------------*/
  static async getSelectedUserDatabase(branch_id, user_id) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = `SELECT
B.branch_ip,
B.database_name,
UB.user_database_username,
UB.user_database_password
FROM branches AS B
INNER JOIN users_branches AS UB
ON B.branch_id = UB.branch_id
INNER JOIN users AS U
ON U.user_id = UB.user_id
WHERE B.branch_id = @branch_id AND U.user_id = @user_id`;
      const params = {
        branch_id: branch_id,
        user_id: user_id,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset;
    } catch (err) {
      console.error("Error Fetching User Databases:", err);
      throw err;
    }
  }
  /*----------------------------Add Database to user----------------------------------*/
  static async addDatabaseToUser(
    branch_id,
    user_database_username,
    user_database_password,
    user_id
  ) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = `INSERT INTO users_branches (branch_id, user_id, user_database_username, user_database_password)
VALUES (@branch_id, @user_id, @user_database_username, @user_database_password)`;
      const params = {
        branch_id: branch_id,
        user_id: user_id,
        user_database_username: user_database_username,
        user_database_password: user_database_password,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset;
    } catch (err) {
      console.error("Error Fetching User Databases:", err);
      throw err;
    }
  }
}
module.exports = DatabasesModel;
