import React, { useState } from "react";
import api from "../../api/api";

const AddComment = ({ addComment, id }) => {
  const [comments, setComment] = useState("");
  const handleSubmit = event => {
    event.preventDefault();
    api(`mutation {
        createComment(input: {commentedBy: "${sessionStorage.toothless}", post: "${id}", comment: "${comments}"}) {
          comment {
            id
            post {
              id
            }
            commentedBy {
              id
              name
            }
            comment
          }
        }
      }
      `)
      .then(res => {
        setComment("");
        addComment(res.data.data.createComment.comment);
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          name="commentText"
          id=""
          cols="160"
          rows="10"
          value={comments}
          className="materialize-textarea "
          placeholder="Any comments?"
          onChange={e => {
            setComment(e.target.value);
          }}
        />

        <input type="submit" value="comment" className="btn pink right" />
      </form>
    </div>
  );
};

export default AddComment;
