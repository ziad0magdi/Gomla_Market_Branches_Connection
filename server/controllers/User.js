const UsersModel = require("../models/Users");
const DatabasesModel = require("../models/Database");
const DatabasesController = require("./Databases");
const selectedDB = require("../Config/SelectDatsbeas");

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
    const database_id = req.body.database_id;
    const user_id = Number(req.body.user_id);
    try {
      if (database_id) {
        const result = await UsersController.createConfig(database_id, user_id);
        console.log("the config >>> ", result);
        if (result) {
          try {
            const Users = await UsersModel.getAllUsers(result);
            res.json(Users);
          } catch (error) {
            return res.status(401).json({
              Status: "Access_Denied",
            });
          }
        } else {
          res.json({
            Status: "NoAccess",
            Message: "user have no Access to this database",
          });
        }
      } else {
        const Users = await UsersModel.getAllUsers();
        res.json(Users);
      }
    } catch (error) {
      console.error("Error fetching Users:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }
  // static async getOneUser(req, res) {
  //   const { User_id } = req.body;
  //   try {
  //     const User = await UsersModel.getOneUser(User_id);
  //     res.json(User);
  //   } catch (error) {
  //     console.error("Error fetching User:", error);
  //     res.status(500).json({ message: "Server Error", error });
  //   }
  // }
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
    const database_id = Number(req.body.database_id);
    console.log(database_id);
    // return;
    try {
      if (database_id) {
        const result = await UsersController.createConfig(database_id);
        if (result) {
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
          const isExist = await UsersModel.getUserByEmail(user_email, result);
          if (isExist)
            return res
              .status(404)
              .json({ Status: "Error", Message: "User is exist" });

          await UsersModel.addUser(
            user_fname,
            user_lname,
            user_phone,
            user_email,
            user_password,
            user_branch_id,
            user_department_id,
            result
          );
          return res.json({ success: true });
        } else {
          return res.status(404).json({
            Status: "Error",
            Message: "Error in featching Branch Config",
          });
        }
      } else {
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

        await UsersModel.addUser(
          user_fname,
          user_lname,
          user_phone,
          user_email,
          user_password,
          user_branch_id,
          user_department_id
        );
        return res.json({ success: true });
      }
    } catch (error) {
      console.error("Error adding User:", error);
      return res.status(500).json({ message: "Server Error", error });
    }
  }
  // static async GetAllEmployeeWithSpacificUser(req, res) {
  //   const { user_Id } = req.body;
  //   try {
  //     const User = await UsersModel.GetAllEmployeeWithSpacificUser(user_Id);
  //     return res.status(200).json({ Status: true, User });
  //   } catch (error) {
  //     console.error("Error fetching Users:", error);
  //     res.status(500).json({ message: "Server Error", error });
  //   }
  // }
  // static async ApproveAccounts(req, res) {
  //   try {
  //     const user_id = Number(req.body.user_id);
  //     const Approve = await UsersModel.ApproveAccounts(user_id);
  //     return res.status(200).json({ success: true });
  //   } catch (error) {
  //     console.error("Error Approveing User:", error);
  //     res.status(500).json({ message: "Server Error", error });
  //   }
  // }
  // static async DeclineAccounts(req, res) {
  //   const user_id = Number(req.body.user_id);
  //   try {
  //     const Decline = await UsersModel.DeclineAccounts(user_id);
  //     return res.status(200).json({ success: true });
  //   } catch (error) {
  //     console.error("Error Decline User:", error);
  //     res.status(500).json({ message: "Server Error", error });
  //   }
  // }
}

module.exports = UsersController;
