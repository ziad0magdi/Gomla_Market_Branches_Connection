import axios from "./axios";

const GetAllDepartments = () => axios.post("/departments");

const DepartmentAPI = {
  GetAllDepartments,
};

export default DepartmentAPI;
