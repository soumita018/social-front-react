import React from "react";

const SingleComment = ({ data }) => {
  {
    return (
      <div className="card">
        <div className="margin fonty">{data.comment}</div>

        <div className="row">
          <div className="col s2 white-text teal offset-s10 fonty">
            {data.commentedBy.name}
          </div>
          {/* <div className="col s6 white-text pink ">
              <span className="right"> {post.postedTime}</span>
            </div> */}
        </div>
      </div>
    );
  }
};

export default SingleComment;
