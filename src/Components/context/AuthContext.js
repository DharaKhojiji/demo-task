import { useState, createContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext({ auth: false });

const UserProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [user, setUser] = useState({ auth: false });
  const LoggedIn = JSON.parse(localStorage.getItem("user"));

  const login = () => {
    setUser({ auth: true });
  };

  const logout = () => {
    localStorage.clear();
    setUser({ auth: false });
  };
  useEffect(() => {
    if (LoggedIn) {
      setUser({ auth: true });
      localStorage.setItem("Token", LoggedIn.accessToken);
    }
  }, []);
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
  //     setUser({ auth: true });
    
  //   }
  // }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
