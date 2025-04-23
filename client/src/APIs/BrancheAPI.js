import axios from "./axios";

const cashirInfo = async (database_id, user_id) =>
  axios.post("/Cashirs", { database_id: database_id, user_id: user_id });

const BranchAPI = {
  cashirInfo,
};

export default BranchAPI;
