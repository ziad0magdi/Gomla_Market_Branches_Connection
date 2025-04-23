const BeanchesModel = require("../models/Branches");
const DatabasesModel = require("../models/Database");
const selectedDB = require("../Config/SelectDatsbeas");

class BeanchesController {
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

  static async getCashirInfo(req, res) {
    const database_id = req.body.database_id;
    const user_id = Number(req.body.user_id);
    try {
      const result = await BeanchesController.createConfig(
        database_id,
        user_id
      );
      if (result) {
        const Cashirs = await BeanchesModel.getCashirInfo(result);
        res.json(Cashirs);
      } else {
        res.json({
          Status: "NoAccess",
          Message: "user have no Access to this database",
        });
      }
    } catch (error) {
      console.error("Error fetching Cashires Informations:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }
}

module.exports = BeanchesController;
