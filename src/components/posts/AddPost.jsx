import React, { useState, useContext } from "react";
import { apiImg } from "./../../api/api";
import { PostContext } from "./../../context/PostContext";
import M from "materialize-css";

const AddPost = () => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useContext(PostContext);
  const [image, setImage] = useState("");
  let formData = new FormData();
  const handleSubmit = event => {
    event.preventDefault();
    apiImg(
      `mutation {
      createPost(input: {postText: "${post}", postedBy: "${sessionStorage.toothless}"}) {
        post {
          id
          imageUrl
          postText
          postedTime
          postedBy {
            id
            name
          }
        }
      }
    }`,
      image
    )
      .then(res => {
        console.log(res);
        setPost("");
        setPosts(oldposts => {
          // console.log([...oldposts, res.data.data.post]);
          M.toast({ html: "Your Post Has Been Added!" });
          return [res.data.data.createPost.post, ...oldposts];
        });
      })

      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div className="post card margin" style={{ paddingsBottom: "60px" }}>
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
        <div className="file-field input-field">
          <div className="btn">
            <span>Upload Image</span>
            <input
              type="file"
              onChange={event => {
                formData.append("file", event.target.files[0]);
                setImage(formData);
              }}
              accept=".jpg,.jpeg,.png"
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <input type="submit" value="post" className="btn pink right" />
      </form>
    </div>
  );
};

export default AddPost;
