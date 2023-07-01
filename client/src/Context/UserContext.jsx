import React from "react";
import { createContext, useState } from "react";
import { API, token } from "../network";
import { useEffect } from "react";
import axios from "axios";
const ContextUser = createContext(null);

const GlobalContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo) {
      // Get User Detail
      const getUserDetails = () => {
        axios
          .get(`${API}/api/user/${userInfo && userInfo.data.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.data.success) {
              setUser(res.data.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getUserDetails();
    }
  }, []);

  return <ContextUser.Provider value={user}>{children}</ContextUser.Provider>;
};
export default GlobalContext;
export { ContextUser };
