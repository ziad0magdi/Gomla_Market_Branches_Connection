import axios from "./axios";

const getUser = async (user_Id) => axios.post("/Users", { user_Id: user_Id });

const getApprovedUsers = async () => axios.post("/ApprovedUsers");

const AddUser = (
  user_fname,
  user_lname,
  user_phone,
  user_email,
  user_password,
  user_branch_id,
  user_department_id
) =>
  axios.post("/User", {
    user_fname: user_fname,
    user_lname: user_lname,
    user_phone: user_phone,
    user_email: user_email,
    user_password: user_password,
    user_branch_id: user_branch_id,
    user_department_id: user_department_id,
  });

const GetAllEmployeeWithSpacificUser = (user_Id) =>
  axios.post("/Employee", { user_Id: user_Id });

const GetApprovedEmployeeWithSpacificUser = (user_Id) =>
  axios.post("/ApprovedEmployee", { user_Id: user_Id });

const ApproveAccounts = (user_id) =>
  axios.post("/ApproveAccounts", { user_id: user_id });

const DeclineAccounts = (user_id) =>
  axios.post("/DeclineAccounts", { user_id: user_id });

const UserAPI = {
  getUser,
  getApprovedUsers,
  AddUser,
  GetAllEmployeeWithSpacificUser,
  GetApprovedEmployeeWithSpacificUser,
  ApproveAccounts,
  DeclineAccounts,
};

export default UserAPI;
