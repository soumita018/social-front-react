import React from "react";
import { Link } from "react-router-dom";

const SinglePost = ({ data }) => {
  return (
    <React.Fragment>
      <div className="card">
        <Link to={`/post/${data.id}`}>
          {data.image ? (
            <img
              src={`http://127.0.0.1:8000/uploads/${data.image}`}
              alt="kaka"
              className="responsive-img"
            />
          ) : (
            ""
          )}

          <div className="container blockquote">
            <blockquote className="black-text about">
              {data.postText}
            </blockquote>
          </div>
          <div className="row">
            <Link to={`/user/${data.postedBy.id}`}>
              <div className="col s6 white-text teal fonty">
                {data.postedBy.name}
              </div>
            </Link>
            <div className="col s6 white-text pink fonty">
              <span className="right"> {data.postedTime.substring(0, 10)}</span>
            </div>
          </div>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default SinglePost;
