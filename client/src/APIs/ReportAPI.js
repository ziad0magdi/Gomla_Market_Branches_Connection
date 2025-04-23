import axios from "./axios";

const AllReport = async () => axios.post("/Reports");

const UsersReport = async (user_id) =>
  axios.post("/UserReports", { user_id: user_id });

const AddUserReport = async (report_id, user_id) =>
  axios.post("/ReportToUser", { report_id: report_id, user_id: user_id });

const ReportAPI = {
  AllReport,
  UsersReport,
  AddUserReport,
};

export default ReportAPI;
