import React from "react";
import Header from "./components/Header";
import { PostProvider } from "./context/PostContext";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/login-sign/Login";
import SignUp from "./components/login-sign/SignUp";
import Body from "./components/Body";

const App = () => {
  return (
    <BrowserRouter>
      <PostProvider>
        <div>
          <Route path="/" component={Header} />
          <div className="container">
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/" component={Body} />
          </div>
        </div>
      </PostProvider>
    </BrowserRouter>
  );
};

export default App;
