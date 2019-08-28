import React, { useState, useEffect } from "react";
import api from "./../../api/api";
import SingleComment from "./../comment/SingleComment";
import AddComment from "../comment/AddComment";

const PostDetail = props => {
  const [post, setPosts] = useState({
    id: "",
    postText: "",
    postedBy: {
      id: "",
      name: ""
    },
    postedTime: "",
    post: []
  });
  const [comments, setComment] = useState([]);

  const onPost = comment => {
    setComment([...comments, comment]);
  };

  useEffect(() => {
    api(`{
        post(id: "${props.match.params.id}") {
          id
          postText
          image
          postedBy {
            id
            name
          }
          postedTime
          post {
              id
            commentedBy {
              id
              name
            }
            comment
            postedTime
          }
        }
      }
        `)
      .then(res => {
        setPosts(res.data.data.post[0]);
        setComment(res.data.data.post[0].post);
        // console.log(res.data.data.post[0].post[0], "hihi");
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <React.Fragment>
      <div className="post">
        <div className="card">
          <div className="row fonty">
            <div className="col s6 white-text teal">{post.postedBy.name}</div>
            <div className="col s6 white-text pink ">
              <span className="right"> {post.postedTime.substring(0, 10)}</span>
            </div>
          </div>
          {post.image ? (
            <img
              src={`http://127.0.0.1:8000/uploads/${post.image}`}
              alt="kaka"
              className="responsive-img"
            />
          ) : (
            ""
          )}
          <p className="margin about">{post.postText}</p>
        </div>
        <h3 className="center margin">All Comments</h3>
        {/* <SingleComment /> */}
        {comments.map(comment => {
          return <SingleComment key={comment.id} data={comment} />;
        })}
        <AddComment addComment={onPost} id={post.id} />
      </div>
    </React.Fragment>
  );
};

export default PostDetail;
