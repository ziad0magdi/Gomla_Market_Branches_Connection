import axios from "./axios";

const getUser = async () => axios.post("/Users");

const UserAPI = {
  getUser,
};

export default UserAPI;
