import React, { useState, useEffect, createContext } from "react";
import api from "../api/api";
// import api from "../../api/api";

export const PostContext = createContext();

export const PostProvider = props => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    api(`{
        posts {
          id
          imageUrl
          postText
          postedTime
          postedBy{
            id
            name
          }
        }
      }
      `)
      .then(res => {
        setPosts(res.data.data.posts);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <PostContext.Provider value={[posts, setPosts]}>
      {props.children}
    </PostContext.Provider>
  );
};
