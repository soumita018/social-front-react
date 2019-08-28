import React from "react";
import Header from "./components/Header";
import Posts from "./components/posts/Posts";
import AddPost from "./components/posts/AddPost";
import { PostProvider } from "./context/PostContext";
import CreateProfile from "./components/profile/CreateProfile";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import PostDetail from "./components/posts/PostDetail";
import SearchProfile from "./components/profile/SearchProfile";
import UserProfile from "./components/profile/UserProfile";
import Login from "./components/login-sign/Login";
import SignUp from "./components/login-sign/SignUp";
import Logout from "./components/login-sign/Logout";

const App = () => {
  return (
    <BrowserRouter>
      <PostProvider>
        <div>
          <Route path="/" component={Header} />
          <div className="container">
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/" exact component={Home} />
            <Route path="/myprofile/:id" component={CreateProfile} />
            <Route path="/post/:id" component={PostDetail} />
            <Route path="/search/:search" component={SearchProfile} />
            <Route path="/user/:id" component={UserProfile} />
            <Route path="/logout" component={Logout} />
          </div>
        </div>
      </PostProvider>
    </BrowserRouter>
  );
};

export default App;
