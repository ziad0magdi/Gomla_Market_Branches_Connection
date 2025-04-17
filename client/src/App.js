import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserProvider, useUser } from "./context/UserContext.js";
import Header from "./Components/Header/Header";
import NavBar from "./Components/NavBar/NavBar";
import DatabaseSelect from "./Pages/DatabaseSelect/DatabaseSelect.js";
import DatabasetoUser from "./Pages/DatabasetoUser/DatabasetoUser.js";
import SignIn from "./Pages/SignIn/SignIn";
function App() {
  return (
    <div>
      <UserProvider>
        <Router>
          <Header />
          <NavBar />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route
              path="DatabaseSelect"
              element={<ProtectedRoute Component={DatabaseSelect} />}
            />
            <Route
              path="DatabasetoUser"
              element={<ProtectedRoute Component={DatabasetoUser} />}
            />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}
const ProtectedRoute = ({ Component }) => {
  const { isLogin } = useUser();
  return isLogin ? <Component /> : <Navigate to="/" replace />;
};
export default App;
