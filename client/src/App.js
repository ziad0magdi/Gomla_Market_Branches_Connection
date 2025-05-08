import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider, useUser } from "./context/UserContext.js";
import Header from "./Components/Header/Header";
import NavBar from "./Components/NavBar/NavBar";
import DatabaseSelect from "./Pages/DatabaseSelect/DatabaseSelect.js";
import DatabasetoUser from "./Pages/DatabasetoUser/DatabasetoUser.js";
import ReportstoUser from "./Pages/ReportstoUser/ReportstoUser.js";
import ApproveAccounts from "./Pages/ApproveAccounts/ApproveAccounts.js";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp.js";
function App() {
  return (
    <div>
      <UserProvider>
        <Router>
          <Header />
          <NavBar />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route
              path="DatabaseSelect"
              element={<ProtectedRoute Component={DatabaseSelect} />}
            />
            <Route
              path="DatabasetoUser"
              element={<ProtectedRoute Component={DatabasetoUser} />}
            />
            <Route
              path="ReportToUser"
              element={<ProtectedRoute Component={ReportstoUser} />}
            />
            <Route
              path="ApproveAccounts"
              element={<ProtectedRoute Component={ApproveAccounts} />}
            />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      </UserProvider>
    </div>
  );
}
const ProtectedRoute = ({ Component }) => {
  const { isLogin, userGroup } = useUser();

  const restrictedRoutes = {
    "/DatabasetoUser": [1],
    "/ReportToUser": [1, 2],
    "/ApproveAccounts": [1, 2],
    "/DatabaseSelect": [1, 2, 3],
  };

  const currentPath = window.location.pathname;

  if (!isLogin) return <Navigate to="/" replace />;

  const allowedGroups = restrictedRoutes[currentPath];
  if (allowedGroups && !allowedGroups.includes(Number(userGroup))) {
    return <Navigate to="/DatabaseSelect" replace />;
  }

  return <Component />;
};

export default App;
