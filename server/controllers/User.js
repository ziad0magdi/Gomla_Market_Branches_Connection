const UsersModel = require("../Models/Users");
const DatabasesModel = require("../Models/Database");
const selectedDB = require("../Config/SelectDatsbeas");
const bcrypt = require("bcryptjs");
class UsersController {
  static async createConfig(database_id, user_id) {
    const database = await DatabasesModel.getSelectedUserDatabase(
      database_id,
      user_id
    );
    if (!database || database.length === 0) {
      return null;
    }
    const branch_ip = database[0].branch_ip;
    const database_name = database[0].database_name;
    const user_database_username = database[0].user_database_username;
    const user_database_password = database[0].user_database_password;
    const result = await selectedDB.createConnection(
      user_database_password,
      user_database_username,
      branch_ip,
      database_name
    );
    return result;
  }

  static async getAllUsers(req, res) {
    const user_Id = req.body.user_Id;
    try {
      const Users = await UsersModel.getAllUsers(user_Id);
      res.json(Users);
    } catch (error) {
      console.error("Error fetching Users:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }
  static async getApprovedUsers(req, res) {
    try {
      const Users = await UsersModel.getApprovedUsers();
      res.json(Users);
    } catch (error) {
      console.error("Error fetching Users:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }

  static async ChangePassword(req, res) {
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const user_id = Number(req.body.user_id);
    try {
      // Step 1: Get the stored password hash
      const result = await UsersModel.getUserPasswordByUserId(Number(user_id));

      if (!result || !result.user_password) {
        return res.status(404).json({
          status: "Error",
          message: "User not found or password missing",
        });
      }

      // Step 2: Compare entered old password with stored hash
      const isMatch = await bcrypt.compare(oldpassword, result.user_password);

      if (!isMatch) {
        return res.status(400).json({
          status: "Error",
          message: "Old password is not correct",
        });
      }

      // Step 3: Hash the new password
      const hashedNewPassword = await bcrypt.hash(newpassword, 10);

      // Step 4: Save the new hashed password
      await UsersModel.ChangePassword(hashedNewPassword, Number(user_id));

      return res
        .status(200)
        .json({ success: true, message: "Password changed successfully" });
    } catch (error) {
      console.error("Error in ChangePassword:", error);
      return res
        .status(500)
        .json({ status: "Error", message: "Server Error", error });
    }
  }

  static async addUser(req, res) {
    const {
      user_fname,
      user_lname,
      user_phone,
      user_email,
      user_password,
      user_branch_id,
      user_department_id,
    } = req.body;
    try {
      if (
        !user_fname ||
        !user_lname ||
        !user_phone ||
        !user_email ||
        !user_password ||
        !user_branch_id ||
        !user_department_id
      )
        return res
          .status(404)
          .json({ Status: "Error", Message: "Their is empty data" });
      const isExist = await UsersModel.getUserByEmail(user_email);
      if (isExist)
        return res
          .status(404)
          .json({ Status: "Error", Message: "User is exist" });
      const hashedNewPassword = await bcrypt.hash(user_password, 10);
      await UsersModel.addUser(
        user_fname,
        user_lname,
        user_phone,
        user_email,
        hashedNewPassword,
        user_branch_id,
        user_department_id
      );
      return res.json({ success: true });
    } catch (error) {
      console.error("Error adding User:", error);
      return res.status(500).json({ message: "Server Error", error });
    }
  }

  static async GetAllEmployeeWithSpacificUser(req, res) {
    const { user_Id } = req.body;
    try {
      const User = await UsersModel.GetAllEmployeeWithSpacificUser(user_Id);
      return res.status(200).json(User);
    } catch (error) {
      console.error("Error fetching Users:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }

  static async GetApprovedEmployeeWithSpacificUser(req, res) {
    const { user_Id } = req.body;
    try {
      const User = await UsersModel.GetApprovedEmployeeWithSpacificUser(
        user_Id
      );
      return res.status(200).json(User);
    } catch (error) {
      console.error("Error fetching Users:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }

  static async ApproveAccounts(req, res) {
    try {
      const user_id = Number(req.body.user_id);
      const Approve = await UsersModel.ApproveAccounts(user_id);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error Approveing User:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }
  static async DeclineAccounts(req, res) {
    const user_id = Number(req.body.user_id);
    console.log(user_id);
    try {
      const Decline = await UsersModel.DeclineAccounts(user_id);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error Decline User:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }
}

module.exports = UsersController;
