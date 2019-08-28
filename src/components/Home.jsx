import React from "react";
import AddPost from "./posts/AddPost";
import Posts from "./posts/Posts";

const Home = () => {
  return (
    <div>
      <AddPost />
      <Posts />
    </div>
  );
};

export default Home;
