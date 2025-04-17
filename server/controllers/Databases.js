const DatabasesModel = require("../models/Database");
const selectedDB = require("../Config/SelectDatsbeas");

class DatabasesController {
  static async getAllDatabases(req, res) {
    try {
      const databases = await DatabasesModel.getAllDatabases();
      res.json(databases);
    } catch (error) {
      console.error("Error fetching Databases:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }
  static async getAllUserDatabases(req, res) {
    const user_id = Number(req.body.user_id);
    try {
      const databases = await DatabasesModel.getAllUserDatabases(user_id);
      res.json(databases);
    } catch (error) {
      console.error("Error fetching User Databases:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }

  static async getSelectedUserDatabase(req, res) {
    const database_id = req.body.database_id;
    const user_id = req.body.user_id;
    try {
      const database = await DatabasesModel.getSelectedUserDatabase(
        database_id,
        user_id
      );
      res.json(database);
    } catch (error) {
      console.error("Error fetching User selected Database:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }

  static async connectUserDatabase(req, res) {
    const database_id = Number(req.body.database_id);
    try {
      const database = await DatabasesModel.getSelectedUserDatabase(
        database_id
      );
      const branch_ip = database[0].branch_ip;
      const database_name = database[0].database_name;
      const user_database_username = database[0].user_database_username;
      const user_database_password = database[0].user_database_password;
      const connection = await selectedDB.connectToDatabase(
        branch_ip,
        database_name,
        user_database_username,
        user_database_password
      );
      if (connection) {
        res.json(connection);
      } else {
        res.status(500).json({ message: "Failed to connect to database" });
      }
    } catch (error) {
      console.error("Error fetching User selected Database:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }

  static async addDatabaseToUser(req, res) {
    const branch_id = Number(req.body.branch_id);
    const user_id = Number(req.body.user_id);
    const user_database_username = req.body.user_database_username;
    const user_database_password = req.body.user_database_password;
    try {
      const result = await DatabasesModel.addDatabaseToUser(
        branch_id,
        user_database_username,
        user_database_password,
        user_id
      );
      res.json({
        status: "success",
        message: "Database added to user successfully",
      });
    } catch (error) {
      console.error("Error fetching User selected Database:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }
}
module.exports = DatabasesController;
