import React, { useEffect, useState, useContext } from "react";
import SignIn from "./Components/Admin/Auth/SignIn";
import ProtectedRoute from "./Components/Admin/Routes/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./Components/Admin/Auth/ResetPassword";
import routes from "./Components/Admin/Routes/routes";
import Sidebar from "./Components/Admin/Sidebar";
import Forgotpassword from "./Components/Admin/Auth/Forgotpassword";
import { UserContext } from "./Components/context/AuthContext";
//  import UserProvider from "./Components/context/AuthContext";
import { useNavigate } from "react-router-dom";

const App = () => {
  const  {user} =  useContext(UserContext)
  const navigate = useNavigate()
  //const [login, setLogin] = useState(user);
  // console.log(user,"user");

  //  if(useraccess) {
  //   navigate("/dashboard")
  //  }    
   
  return (
    <>
      {user.auth &&  <Sidebar />}
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/forgotpassword" element={<Forgotpassword/>}/>
      </Routes>

      { routes?.length > 0 &&
        routes?.map((route) => (
          <ProtectedRoute
            exact={route?.exact}
            path={route?.path}
            component={route?.component}
          />
        ))}
    </>
  );
};

export default App;