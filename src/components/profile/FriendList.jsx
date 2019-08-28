import React from "react";
import { Link } from "react-router-dom";
const FriendList = ({ pro }) => {
  return (
    <div className=" fonty col s4">
      <div className=" card fndy">
        <Link to={`/user/${pro.user.id}`} key={pro.user.id}>
          <h6>{pro.user.name}</h6>
        </Link>
      </div>
    </div>
  );
};

export default FriendList;
