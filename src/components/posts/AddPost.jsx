import React, { useState, useContext } from "react";
import api from "./../../api/api";
import { PostContext } from "./../../context/PostContext";

const AddPost = () => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useContext(PostContext);
  const handleSubmit = event => {
    event.preventDefault();
    api(`mutation {
      createPost(input: {postText: "${post}", postedBy: "${sessionStorage.toothless}"}) {
        post {
          id
          image
          postText
          postedTime
          postedBy {
            id
            name
          }
        }
      }
    }`)
      .then(res => {
        console.log(res);
        setPost("");
        setPosts(oldposts => {
          // console.log([...oldposts, res.data.data.post]);
          return [res.data.data.createPost.post, ...oldposts];
        });
      })

      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div className="post">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <textarea
              placeholder="Post your thoughts nicely..."
              name="postText"
              id=""
              cols="160"
              rows="10"
              value={post}
              className="materialize-textarea "
              onChange={e => {
                setPost(e.target.value);
              }}
            />
          </div>
        </div>
        <input type="submit" value="post" className="btn pink right" />
      </form>
    </div>
  );
};

export default AddPost;
