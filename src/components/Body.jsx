import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import CreateProfile from "./profile/CreateProfile";
import PostDetail from "./posts/PostDetail";
import SearchProfile from "./profile/SearchProfile";
import UserProfile from "./profile/UserProfile";
import Logout from "./login-sign/Logout";

const Body = props => {
  useEffect(() => {
    if (!sessionStorage.toothless) {
      props.history.push("/login");
    }
  }, []);
  return (
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/myprofile/" component={CreateProfile} />
      <Route path="/post/:id" component={PostDetail} />
      <Route path="/search/:search" component={SearchProfile} />
      <Route path="/user/:id" component={UserProfile} />
      <Route path="/logout" component={Logout} />
    </div>
  );
};

export default Body;
