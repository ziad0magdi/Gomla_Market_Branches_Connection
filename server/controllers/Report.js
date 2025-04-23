const ReportsModel = require("../models/Report");

class ReportController {
  static async getAllReports(req, res) {
    try {
      const Reports = await ReportsModel.getAllReports();
      res.json(Reports);
    } catch (error) {
      console.error("Error fetching Reports:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }

  static async getUserReports(req, res) {
    const user_id = Number(req.body.user_id);
    try {
      const Reports = await ReportsModel.getUserReports(user_id);
      res.json(Reports);
    } catch (error) {
      console.error("Error fetching User Reports:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }

  static async addReportToUser(req, res) {
    const report_id = Number(req.body.report_id);
    const user_id = Number(req.body.user_id);
    try {
      const result = await ReportsModel.addReportToUser(report_id, user_id);
      res.json({
        status: "success",
        message: "Report added to user successfully",
      });
    } catch (error) {
      console.error("Error Adding Report to selected User:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }
}

module.exports = ReportController;
