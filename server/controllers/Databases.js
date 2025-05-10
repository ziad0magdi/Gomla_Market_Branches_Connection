const DatabasesModel = require("../Models/Database");
const selectedDB = require("../Config/SelectDatsbeas");

class DatabasesController {
  static async createConfig(database_id) {
    const database = await DatabasesModel.getSelectedDatabase(database_id);
    if (!database || database.length === 0) {
      return null;
    }
    const branch_ip = database[0].branch_ip;
    const database_name = database[0].database_name;
    const user_database_username = user_database_username;
    const user_database_password = user_database_password;
    const result = await selectedDB.createConnection(
      user_database_password,
      user_database_username,
      branch_ip,
      database_name
    );
    return result;
  }

  static async validateUser(
    database_id,
    user_database_username,
    user_database_password
  ) {
    try {
      const database = await DatabasesModel.getDatabaseConfig(database_id);
      const branch_ip = database[0].branch_ip;
      const database_name = database[0].database_name;
      const connection = await selectedDB.validateUser(
        user_database_username,
        user_database_password,
        branch_ip,
        database_name
      );
      return connection;
    } catch (error) {
      console.error("Error fetching User selected Database:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }

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

  static async getUserAvailableDatabases(req, res) {
    const user_id = Number(req.body.user_id);
    try {
      const databases = await DatabasesModel.getUserAvailableDatabases(user_id);
      res.json(databases);
    } catch (error) {
      console.error("Error fetching User Available Databases:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }

  static async getUserAvailableDatabasesForManager(req, res) {
    const user_id = Number(req.body.user_id);
    const m_user_id = Number(req.body.m_user_id);
    try {
      const databases =
        await DatabasesModel.getUserAvailableDatabasesForManager(
          user_id,
          m_user_id
        );
      res.json(databases);
    } catch (error) {
      console.error("Error fetching User Available Databases:", error);
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

  static async addDatabaseToUser(req, res) {
    const branch_id = Number(req.body.branch_id);
    const user_id = Number(req.body.user_id);
    const user_database_username = req.body.user_database_username;
    const user_database_password = req.body.user_database_password;
    console.log("<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>");
    try {
      const connect = await DatabasesController.validateUser(
        branch_id,
        user_database_username,
        user_database_password
      );
      if (connect) {
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
      } else {
        res.json({
          status: "failed",
          message: "user has Wrong username or password",
        });
      }
    } catch (error) {
      console.error("Error fetching User selected Database:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }
}
module.exports = DatabasesController;
