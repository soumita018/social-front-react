import React, { useState, useEffect } from "react";
import api, { apiImg } from "./../../api/api";
import { Link } from "react-router-dom";
import M from "materialize-css";

const CreateProfile = props => {
  const [about, setAbout] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [image, setImage] = useState("");
  let formData = new FormData();
  const handleSubmit = event => {
    event.preventDefault();
    apiImg(
      `mutation {
      createProfile(about: "${about}", city: "${city}", name: "${name}", phone: "${phone}", id: "${sessionStorage.toothless}",email:"${email}") {
        profile {
          id
          city
          about
          user {
            name
            id
            image
            phone
            email
          }
        }
      }
    }
    
    `,
      image
    ).then(res => {
      M.toast({ html: "Your Profile Has Been updated!" });
    });
  };

  useEffect(() => {
    api(`{
        profile(id: "${sessionStorage.toothless}") {
          id
          user {
            name
            id
            phone
            email
            imageUrl
          }
          about
          city       
        }
      }`)
      .then(res => {
        setAbout(res.data.data.profile[0].about);
        setCity(res.data.data.profile[0].city);
        setName(res.data.data.profile[0].user.name);
        setEmail(res.data.data.profile[0].user.email);
        setPhone(res.data.data.profile[0].user.phone);
        setImageurl(res.data.data.profile[0].user.image);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className=" post card">
      <h3 className="center grey-text margin">Edit Your Profile</h3>
      <form onSubmit={handleSubmit} className="container margin">
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <span className="helper-text right">Name</span>

        <input
          type="email"
          name="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <span className="helper-text right">Email</span>
        <input
          type="tel"
          name="phone"
          pattern="[0-9]{10}"
          title="Enter 10 digit Phone Number. e.g. 8335875073"
          value={phone}
          onChange={e => {
            setPhone(e.target.value);
          }}
        />
        <span className="helper-text right">Phone</span>

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
        <span className="helper-text right">About</span>
        <br />
        <input
          type="text"
          name="city"
          value={city}
          onChange={e => {
            setCity(e.target.value);
          }}
        />
        <span className="helper-text right ">City</span>

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

        <br />
        <br />
        <input
          type="submit"
          className="btn pink darken-2 right"
          value="Update"
        />

        <Link className="btn cyan" to={`/user/${sessionStorage.toothless}`}>
          Back To My Profile
        </Link>
      </form>
    </div>
  );
};

export default CreateProfile;
