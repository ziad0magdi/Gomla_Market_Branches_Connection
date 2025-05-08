const DepartmentsModel = require("../Models/Departments");

class DepartmentController {
  static async getAllDepartments(req, res) {
    try {
      const departments = await DepartmentsModel.getAllDepartments();
      res.json(departments);
    } catch (error) {
      console.error("Error fetching departments:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }

  static async getOneDepartments(req, res) {
    const { Department_name } = req.body;
    try {
      const department = await DepartmentsModel.getOneDepartment(
        Department_name
      );
      res.json(department);
    } catch (error) {
      console.error("Error fetching departments:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }

  static async addDepartment(req, res) {
    const { department_name } = req.body;
    try {
      if (!department_name)
        return res
          .status(404)
          .json({ Status: "Error", Message: "Department name is empty" });

      const isExist = await DepartmentsModel.getOneDepartment(department_name);
      if (isExist.length > 0)
        return res
          .status(404)
          .json({ Status: "Error", Message: "Department is exist" });

      await DepartmentsModel.addDeparnment(department_name);
      return res.json({ success: true });
    } catch (error) {
      console.error("Error adding department:", error);
      return res.status(500).json({ message: "Server Error", error });
    }
  }
}

module.exports = DepartmentController;
