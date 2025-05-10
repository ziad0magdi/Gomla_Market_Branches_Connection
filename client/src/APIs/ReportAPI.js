import axios from "./axios";

const AllReport = async () => axios.post("/Reports");

const UsersReport = async (user_id) =>
  axios.post("/UserReports", { user_id: user_id });

const UserAvailableReports = async (user_id) =>
  axios.post("/UserAvailableReports", { user_id: user_id });

const UserAvailableReportsManager = async (user_id, m_user_id) =>
  axios.post("/UserAvailableReportsManager", {
    user_id: user_id,
    m_user_id: m_user_id,
  });

const AddUserReport = async (report_id, user_id) =>
  axios.post("/ReportToUser", { report_id: report_id, user_id: user_id });

const ReportAPI = {
  AllReport,
  UsersReport,
  UserAvailableReports,
  UserAvailableReportsManager,
  AddUserReport,
};

export default ReportAPI;
