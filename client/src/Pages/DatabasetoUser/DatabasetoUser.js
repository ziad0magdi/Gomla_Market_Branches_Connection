import { React, useState, useEffect } from "react";
import DatabaseAPI from "../../APIs/DatabaseAPI";
import UserAPI from "../../APIs/UserAPI";
import "./DatabasetoUser.css";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import Selector from "../../Components/Selector/Selector";
import Button from "../../Components/Button/Button";
import TextInput from "../../Components/TextInput/TextInput";
// import CircleGrid from "../../Components/D3/D3";
const DatabasetoUser = () => {
  const { language, isDarkMode, user_Id, userGroup } = useUser();
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  useEffect(() => {
    const fetchDatabases = async () => {
      if (!user_Id) return null;
      try {
        const response = await DatabaseAPI.getAllDatabases();
        setDatabases(response.data);
      } catch (error) {
        console.error("Error fetching databases:", error);
      }
    };
    fetchDatabases();
  }, [user_Id]);

  useEffect(() => {
    const fetchDatabases = async () => {
      if (!user_Id) return null;
      try {
        const response = await UserAPI.getUser();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching databases:", error);
      }
    };

    fetchDatabases();
  }, [user_Id]);

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
    if (response.status === "success") {
      toast.success(
        language === "en"
          ? "Branch added to the user successfully"
          : "تمت إضافة الفرع للمستخدم بنجاح"
      );
      alert(
        language === "en"
          ? "Branch added to the user successfully"
          : "تمت إضافة الفرع للمستخدم بنجاح"
      );
    }
  };

  const onSelectDatabase = (database) => {
    setSelectedDatabase(database);
  };

  const onSelectUser = (user) => {
    setSelectedUser(user);
  };

  console.log("ueser", users);
  return (
    <div className={`DatabasetoUser_container ${isDarkMode ? "dark" : ""}`}>
      <h1>
        {language === "en"
          ? "Assign Database to User"
          : "تعيين قاعدة البيانات للمستخدم"}
      </h1>
      <Selector
        headerText={
          language === "en"
            ? "Select Your Database"
            : "اختر قاعدة البيانات الخاصة بك"
        }
        selectorValues={databases}
        onSelect={onSelectDatabase}
        selectedValue={selectedDatabase}
      />

      {selectedDatabase && userGroup === 1 && (
        <Selector
          headerText={language === "en" ? "Select User" : "اختر المستخدم"}
          selectorValues={users}
          onSelect={onSelectUser}
          selectedValue={selectedUser}
        />
      )}

      {selectedDatabase && (
        <div className="DatabasetoUser_input">
          <TextInput
            placeholder={
              language === "en" ? "Branch userName" : "اسم المستخدم للفرع"
            }
            setData={setUserName}
          />
          <TextInput
            placeholder={
              language === "en" ? "Branch Password" : "كلمة مرور الفرع"
            }
            setData={setUserPassword}
          />
        </div>
      )}
      <div className="DatabasetoUser_button">
        <Button
          text={
            language === "en" ? "Add Branch to the user" : "إضافة فرع للمستخدم"
          }
          onClick={() => handleSbmit()}
          isDisabled={!selectedDatabase}
        />
      </div>
      <div className="DatabasetoUser_d3"></div>
    </div>
  );
};

export default DatabasetoUser;

/* 
note: - the d3 code is commented out because it is not used in the current implementation.
if the user didnt have access retuen "this user didnt have access" to database then make him enter the username and password and when make the connection 
add the user to the database and then add the database to the user.
*/
