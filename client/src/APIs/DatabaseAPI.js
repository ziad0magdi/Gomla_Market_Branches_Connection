import axios from "./axios";

const getAllDatabases = async () => axios.post("/Databases");

const getDatabases = async (user_id) =>
  axios.post("/UserDatabases", { user_id: user_id });

const AdduserDatabase = async (
  branch_id,
  user_id,
  user_database_username,
  user_database_password
) =>
  axios.post("/DatabaseToUser", {
    branch_id: branch_id,
    user_id: user_id,
    user_database_username: user_database_username,
    user_database_password: user_database_password,
  });
const DatabaseAPI = {
  getAllDatabases,
  getDatabases,
  AdduserDatabase,
};

export default DatabaseAPI;
