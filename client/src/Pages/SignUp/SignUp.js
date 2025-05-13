import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import DepartmentAPI from "../../APIs/DepartmentAPI";
import BranchAPI from "../../APIs/BrancheAPI";
import UserAPI from "../../APIs/UserAPI";
import Input from "../../Components/Inputs/Input";
import Button from "../../Components/Button/Button";
import Selector from "../../Components/Selector/Selector";
import "./SignUp.css";
const SignUp = () => {
  const { isDarkMode, language } = useUser();
  const navigate = useNavigate();
  const [branchs, setBranchs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [user_fname, setUser_fname] = useState("");
  const [user_lname, setUser_lname] = useState("");
  const [user_phone, setUser_phone] = useState("");
  const [user_email, setUser_email] = useState("");
  const [user_password, setUser_password] = useState("");
  const [user_confirm_password, setUser_confirm_password] = useState("");
  const [selectedBranch, setSelectedBranch] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result1 = await DepartmentAPI.GetAllDepartments();
        const result2 = await BranchAPI.GetAllBranchs();
        setDepartments(result1.data);
        setBranchs(result2.data);
      } catch (error) {
        console.log("Error fetching departments", error);
      }
    };
    fetchData();
  }, []);

  const handleFinshSignUp = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ⬅️ prevent browser reload

    if (
      !user_fname ||
      !user_lname ||
      !user_phone ||
      !user_email ||
      !user_password ||
      !selectedBranch ||
      !selectedDepartment
    )
      return null;

    try {
      const response = await UserAPI.AddUser(
        user_fname,
        user_lname,
        user_phone,
        user_email,
        user_password,
        Number(selectedBranch),
        Number(selectedDepartment)
      );

      if (response.data.status === "success") {
        toast.success(
          language === "en"
            ? "User Adding successfully!"
            : "تم إضافة المستخدم بنجاح"
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Error Adding User:", error);
    }
  };

  return (
    <div className={`signUp ${isDarkMode ? "signUp_dark" : "signUp_light"}`}>
      <div className="signUp_formContainer">
        <h2>{language === "ar" ? "التسجيل" : "Sign Up"}</h2>
        <form className="signUp_form">
          <div className="SignUp_inputContainer">
            <Input
              type="text"
              placeholder={language === "ar" ? "الاسم الأول" : "First Name"}
              setData={setUser_fname}
              required
            />
            <Input
              type="text"
              placeholder={language === "ar" ? "اسم العائلة" : "Last Name"}
              setData={setUser_lname}
              required
            />
          </div>
          <div className="SignUp_inputContainer">
            <Input
              type="text"
              placeholder={language === "ar" ? "رقم الهاتف" : "Phone Number"}
              setData={setUser_phone}
              required
            />
          </div>
          <div className="SignUp_inputContainer">
            <Input
              type="email"
              placeholder={language === "ar" ? "البريد الإلكتروني" : "Email"}
              setData={setUser_email}
              required
            />
          </div>

          <div className="SignUp_inputContainer">
            <Input
              type="password"
              placeholder={language === "ar" ? "كلمة المرور" : "Password"}
              setData={setUser_password}
              required
            />
            <Input
              type="password"
              placeholder={
                language === "ar" ? "تأكيد كلمة المرور" : "Password confirm"
              }
              setData={setUser_confirm_password}
              required
            />
          </div>
          <div className="SignUp_select">
            <Selector
              selectorValues={branchs}
              onSelect={setSelectedBranch}
              selectedValue={selectedBranch}
              placeholder={
                language === "ar" ? "اختر القسم" : "Select Department"
              }
            />
            <Selector
              selectorValues={departments}
              onSelect={setSelectedDepartment}
              selectedValue={selectedDepartment}
              placeholder={language === "en" ? "Select Branch" : "اختر الفرع"}
            />
          </div>
          <div className="SignUp_buttons">
            <Button
              text={language === "ar" ? "تسجيل" : "Sign Up"}
              onClick={handleSubmit}
              disabled={
                user_password !== user_confirm_password ||
                user_phone.length !== 11
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
