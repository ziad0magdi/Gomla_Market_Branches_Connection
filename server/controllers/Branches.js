const BeanchesModel = require("../Models/Branches");
const DatabasesModel = require("../Models/Database");
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
    const date = req.body.date;

    let fullDate = date;

    if (!date) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1);
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      fullDate = `${year}-${month}-${day}`;
    }

    try {
      const result = await BeanchesController.createConfig(
        database_id,
        user_id
      );
      if (result) {
        const Cashirs = await BeanchesModel.getCashirInfo(result, fullDate);
        res.json(Cashirs);
      } else {
        res.json({
          Status: "NoAccess",
          Message: "user has no access to this database",
        });
      }
    } catch (error) {
      console.error("Error fetching Cashir information:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }

  static async TotalCashierDeficitsAndIncreases(req, res) {
    const database_id = req.body.database_id;
    const user_id = Number(req.body.user_id);
    const date = req.body.date;
    let fullDate = date;
    if (!date) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1);
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      fullDate = `${year}-${month}-${day}`;
    }

    try {
      const result = await BeanchesController.createConfig(
        database_id,
        user_id
      );
      if (result) {
        const Cashirs = await BeanchesModel.TotalCashierDeficitsAndIncreases(
          result,
          fullDate
        );
        res.json(Cashirs);
      } else {
        res.json({
          Status: "NoAccess",
          Message: "user have no Access to this database",
        });
      }
    } catch (error) {
      console.error("Error Fetching Report's Informations:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }
}

module.exports = BeanchesController;
