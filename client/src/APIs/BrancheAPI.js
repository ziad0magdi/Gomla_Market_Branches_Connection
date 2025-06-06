import axios from "./axios";
const GetAllBranchs = () => axios.post("/Branches");

const Report1 = async (database_id, user_id, date) =>
  axios.post("/Report1", {
    database_id: database_id,
    user_id: user_id,
    date: date,
  });

const Report2 = async (database_id, user_id, date) =>
  axios.post("/Report2", {
    database_id: database_id,
    user_id: user_id,
    date: date,
  });

const BranchAPI = {
  GetAllBranchs,
  Report1,
  Report2,
};

export default BranchAPI;
