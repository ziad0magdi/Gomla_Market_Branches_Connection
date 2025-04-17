import axios from "./axios";

const UsersReport = async (database_id, user_id) =>
  axios.post("/Users", { database_id: database_id, user_id: user_id });

const ReportAPI = {
  UsersReport,
};

export default ReportAPI;
