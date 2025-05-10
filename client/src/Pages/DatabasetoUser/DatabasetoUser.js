import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import DatabaseAPI from "../../APIs/DatabaseAPI";
import UserAPI from "../../APIs/UserAPI";
import { useUser } from "../../context/UserContext";
import Selector from "../../Components/Selector/Selector";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Inputs/Input";
import "./DatabasetoUser.css";

const DatabasetoUser = () => {
  const { language, isDarkMode, user_Id, userGroup } = useUser();
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(user_Id);
  const [selectedUserBranches, setSelectedUserBranches] = useState();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  useEffect(() => {
    const fetchDatabases = async () => {
      if (!userGroup) return null;
      try {
        if (Number(userGroup) === 1) {
          const response1 = await UserAPI.getApprovedUsers();
          setUsers(response1.data);
          const response2 = await DatabaseAPI.getAvailableDatabases(
            Number(selectedUser)
          );
          setDatabases(response2.data);
        } else {
          const response1 = await UserAPI.GetApprovedEmployeeWithSpacificUser(
            user_Id
          );
          setUsers(response1.data);
          const response2 =
            await DatabaseAPI.getUserAvailableDatabasesForManager(
              Number(selectedUser),
              user_Id
            );
          setDatabases(response2.data);
        }
      } catch (error) {
        console.error("Error fetching databases:", error);
      }
    };
    fetchDatabases();
  }, [userGroup, selectedUser]);

  const handleSbmit = async () => {
    let response;
    if (!selectedUser) {
      response = await DatabaseAPI.AdduserDatabase(
        selectedDatabase,
        user_Id,
        userName,
        userPassword
      );
    } else {
      response = await DatabaseAPI.AdduserDatabase(
        selectedDatabase,
        selectedUser,
        userName,
        userPassword
      );
    }
    if (response.data.status === "success") {
      toast.success("Branch is added to the user successfully");
    } else if (response.data.status === "failed") {
      toast.error("Wrong username or password");
    }
  };

  const onSelectDatabase = (database) => {
    setSelectedDatabase(database);
  };

  const onSelectUser = (user) => {
    setSelectedUser(user);
  };
  console.log("databases", databases);
  return (
    <div className={`DatabasetoUser_container ${isDarkMode ? "dark" : ""}`}>
      <h1>
        {language === "en" ? "Assign Branch to User" : "تعيين فرع للمستخدم"}
      </h1>
      <div className="DatabasetoUser_Selector">
        <Selector
          selectorValues={users}
          onSelect={onSelectUser}
          selectedValue={selectedUser}
        />

        {selectedUser && (
          <Selector
            selectorValues={databases}
            onSelect={onSelectDatabase}
            selectedValue={selectedDatabase}
          />
        )}
      </div>

      {selectedDatabase && (
        <div className="DatabasetoUser_input">
          <Input
            type="text"
            placeholder={
              language === "en" ? "Branch userName" : "اسم المستخدم للفرع"
            }
            setData={setUserName}
          />
          <Input
            type="text"
            placeholder={
              language === "en" ? "Branch Password" : "كلمة مرور الفرع"
            }
            setData={setUserPassword}
          />
        </div>
      )}
      {selectedDatabase && (
        <div className="DatabasetoUser_button">
          <Button
            text={
              language === "en"
                ? "Add Branch to the user"
                : "إضافة فرع للمستخدم"
            }
            onClick={() => handleSbmit()}
            isDisabled={!selectedDatabase}
          />
        </div>
      )}
      <div className="DatabasetoUser_d3"></div>
    </div>
  );
};

export default DatabasetoUser;
