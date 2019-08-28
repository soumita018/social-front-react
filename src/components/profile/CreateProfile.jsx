import React, { useState, useEffect } from "react";
import api from "./../../api/api";
import { Link } from "react-router-dom";

const CreateProfile = props => {
  const [about, setAbout] = useState("");
  const [city, setCity] = useState("");
  const [id, setId] = useState("");
  const [proc, setProc] = useState(true);

  const handleSubmit = event => {
    event.preventDefault();
    let x = "";
    if (id === "") {
      x = `{user: "1", about: "${about}", city: "${city}"}`;
    } else {
      x = `{user: "${id}", about: "${about}", city: "${city}",id:"${id}"}`;
    }
    api(`mutation {
      createProfile(input:${x} ) {
        profile {
          id
        }
      }
    }`).then(res => {
      setId(res.data.data.createProfile.profile.id);
    });
  };

  useEffect(() => {
    api(`{
        profile(id: "${props.match.params.id}") {
          id
          user {
            name
            id
          }
          about
          city       
        }
      }`)
      .then(res => {
        if (res.data.data.profile.length === 0) {
          setProc(false);
        } else {
          setAbout(res.data.data.profile[0].about);
          setCity(res.data.data.profile[0].city);
          setId(res.data.data.profile[0].id);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className=" post card">
      <h3 className="center grey-text margin">Edit Your Profile</h3>
      <form onSubmit={handleSubmit} className="container margin">
        <textarea
          name="about"
          className="materialize-textarea "
          placeholder="Tell me something about you..."
          id=""
          cols="160"
          rows="10"
          value={about}
          onChange={e => {
            setAbout(e.target.value);
          }}
        />
        <span className="helper-text">About</span>
        <br />
        <input
          type="text"
          name="city"
          value={city}
          onChange={e => {
            setCity(e.target.value);
          }}
        />
        <span className="helper-text">City</span>
        <br />
        <br />
        <input
          type="submit"
          className="btn pink darken-2 right"
          value={proc ? "update" : "add new"}
        />
        <Link className="btn cyan" to={`/user/${id}`}>
          Back To My Profile
        </Link>
      </form>
    </div>
  );
};

export default CreateProfile;
