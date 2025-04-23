const QueryEx = require("../Config/QueryEx");
const db = require("../Config/db");

class ReportsModel {
  /*----------------------------Get All Reports----------------------------------*/
  static async getAllReports() {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = `SELECT report_id, report_name FROM reports`;
      const result = await QueryEx.executeQuery(dbconfig, query);
      return result.recordset;
    } catch (err) {
      console.error("Error fetching all Reports:", err);
      throw err;
    }
  }

  /*----------------------------Get All User Reports----------------------------------*/
  static async getUserReports(user_id) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = `SELECT 
R.report_id,
R.report_name
FROM reports AS R 
INNER JOIN users_reports AS UR
ON R.report_id = UR.report_id
WHERE UR.user_id = @user_id`;
      const params = { user_id: user_id };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset;
    } catch (err) {
      console.error("Error fetching User Reports:", err);
      throw err;
    }
  }

  /*----------------------------Add Report to user----------------------------------*/
  static async addReportToUser(report_id, user_id) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = `INSERT INTO users_reports (report_id, user_id) VALUES ( @report_id , @user_id)`;
      const params = {
        report_id: report_id,
        user_id: user_id,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset;
    } catch (err) {
      console.error("Error Fetching User Databases:", err);
      throw err;
    }
  }
}

module.exports = ReportsModel;
