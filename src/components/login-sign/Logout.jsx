import React, { useEffect } from "react";

const Logout = props => {
  useEffect(() => {
    sessionStorage.removeItem("toothless");
    props.history.replace("/login");
  });
  return <h1>Logout</h1>;
};

export default Logout;
