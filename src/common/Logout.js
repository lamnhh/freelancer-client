import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import AppContext from "../AppContext";

function Logout() {
  let { setUser } = useContext(AppContext);
  useEffect(
    function() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    },
    [setUser]
  );
  return <Redirect to="/"></Redirect>;
}

export default Logout;
