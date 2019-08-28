import React, { useEffect, useState } from "react";
import api from "./../../api/api";

import { Link } from "react-router-dom";
import { findElement } from "./../utils/utils";
import FriendList from "./FriendList";

const UserProfile = props => {
  const [isFriend, setFriend] = useState(false);

  const addFriend = () => {
    api(`mutation {
    addFriend(friendId: "${props.match.params.id}", myId: "${sessionStorage.toothless}", unfriend: ${isFriend}) {
      okay
    }
  }`)
      .then(res => {
        if (res.data.data.addFriend.okay) {
          setFriend(!isFriend);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const [profile, setProfile] = useState({
    about: "",
    city: "",
    user: {
      id: "",
      name: "",
      Friends: []
    }
  });

  useEffect(() => {
    api(`{
    profile(id: ${props.match.params.id}) {
      about
      city
      user {
        id
        name
        image
        phone
        email
        Friends {
          user {
            name
            id
          }
        }
      }
      
    }
  }
  `).then(res => {
      console.log("yes");
      let index = findElement(
        res.data.data.profile[0].user.Friends,
        sessionStorage.toothless
      );
      setProfile(res.data.data.profile[0]);
      if (index !== -1) {
        setFriend(true);
      }
    });
  }, [props.match.params.id]);
  return (
    <React.Fragment>
      <div className="card profile-box fonty">
        {profile.user.image ? (
          <img
            src={`http://127.0.0.1:8000/uploads/${profile.user.image}`}
            alt="kaka"
            className="responsive-img z-depth-3"
          />
        ) : (
          <img src="https://img.icons8.com/flat_round/200/000000/orangutan.png"></img>
        )}
        <div className="container">
          {/* {props.match.params.id} */}
          <h3 className="pink-text pro">
            {profile.user.name}
            {sessionStorage.toothless === profile.user.id ? (
              ""
            ) : (
              <button
                className={`right btn ${isFriend ? "red" : "blue"}`}
                onClick={addFriend}
              >
                {isFriend ? "Disconnect" : "Connect"}
              </button>
            )}
          </h3>
          <hr />
          <br />
          <div className="row">
            <div className="col s12">
              <div className="col s3 pink-text">
                <b>Phone</b>
              </div>
              <div className="col s8">{profile.user.phone}</div>
              <div className="col s3 pink-text">
                <b>Email</b>
              </div>
              <div className="col s8">{profile.user.email}</div>
              <div className="col s3 pink-text">
                <b>City</b>
              </div>
              <div className="col s8">{profile.city}</div>
            </div>
          </div>
          <hr />
          <br />
          <div className="row">
            <div className="col s12">
              <div className="col s3 pink-text">
                <b>About Me:</b>
              </div>

              <p className="col s9 about">{profile.about}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h3 className="center grey-text ">Conneted With:</h3>
        {profile.user.Friends.map(pro => (
          <FriendList key={pro.user.id} pro={pro} />
        ))}
      </div>
      {sessionStorage.toothless === profile.user.id ? (
        <div className="fixed-action-btn">
          <Link
            className="btn-floating btn-large waves-effect waves-light white"
            to={`/myprofile/${props.match.params.id}`}
          >
            <img src="https://img.icons8.com/cotton/30/000000/edit--v2.png"></img>
          </Link>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default UserProfile;
