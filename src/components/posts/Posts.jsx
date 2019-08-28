import React, { useState, useEffect, useContext } from "react";
import SinglePost from "./SinglePost";
import api from "../../api/api";
import { PostContext } from "./../../context/PostContext";
import PostDetail from "./PostDetail";

const Posts = () => {
  const [posts, setPosts] = useContext(PostContext);
  return (
    <React.Fragment>
      {posts.map(post => {
        return <SinglePost key={post.id} data={post} />;
      })}
    </React.Fragment>
  );
};

export default Posts;
