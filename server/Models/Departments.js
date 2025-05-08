const QueryEx = require("../Config/QueryEx");
const db = require("../Config/db");

class DepartmentsModel {
  /*------------------------GET ALL Departments----------------------------------------*/
  static async getAllDepartments() {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = "SELECT * FROM departments";
      const result = await QueryEx.executeQuery(dbconfig, query);
      return result.recordset;
    } catch (err) {
      console.error("Error fetching departments:", err);
      throw err;
    }
  }

  /*------------------------GET ALL Departments IDs----------------------------------------*/
  static async getDepartmentsIDs() {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query = "SELECT department_id FROM departments";
      const result = await QueryEx.executeQuery(dbconfig, query);
      return result.recordset;
    } catch (err) {
      console.error("Error fetching departments:", err);
      throw err;
    }
  }

  /*------------------------GET A SPACIFIC Department BY Department id-------------------------*/
  static async getDepartmentbyid(department_id) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query =
        "SELECT * FROM departments WHERE department_id = @department_id";
      const params = {
        department_id: department_id,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset;
    } catch (err) {
      console.error("Error fetching department:", err);
      throw err;
    }
  }
  /*------------------------GET A SPACIFIC Department BY Department name-------------------------*/
  static async getOneDepartment(departmentName) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query =
        "SELECT * FROM departments WHERE department_name = @department_name";
      const params = {
        department_name: departmentName,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset;
    } catch (err) {
      console.error("Error fetching department:", err);
      throw err;
    }
  }

  /*------------------------ADDING NEW Department---------------------------------------*/
  static async addDeparnment(department_name) {
    let dbconfig;
    dbconfig = db.primaryConfig;
    try {
      const query =
        "INSERT INTO departments (department_name) VALUES(@Department_name)";
      const params = {
        Department_name: department_name,
      };
      const result = await QueryEx.executeQuery(dbconfig, query, params);
      return result.recordset;
    } catch (err) {
      console.error("Error fetching department:", err);
      throw err;
    }
  }
}

module.exports = DepartmentsModel;
