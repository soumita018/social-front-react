import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import api from "./../../api/api";

const SignUp = props => {
  useEffect(()=>{if(sessionStorage.toothless){
    props.history.push('/')
  }},[])
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const signup = e => {
    e.preventDefault();
    api(`mutation {
      createUser(input: {password: "${password}", name: "${name}", phone: "${phone}", email: "${email}"}) {
        user {
          id
          name
        }
      }
    }`).then(res => {
      if (res.data.data.createUser.user.id) {
        sessionStorage.setItem("toothless", res.data.data.createUser.user.id);
        props.history.push(`/myprofile/${res.data.data.createUser.user.id}`);
      }
    });
  };

  return (
    <div>
      <div className="card fonty margin post">
        <h2 className="  grey-text center"> Sign Up</h2>

        <hr />
        <br />
        <div className="row">
          <form className="col s12" onSubmit={signup}>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="icon_prefix"
                  type="text"
                  className="validate"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />

                <span className="helper-text">Name</span>
              </div>
              <div className="input-field col s6">
                <input
                  id="icon_telephone"
                  type="tel"
                  pattern="[0-9]{10}"
                  title="Enter 10 digit Phone Number. e.g. 8335875073"
                  value={phone}
                  onChange={e => {
                    setPhone(e.target.value);
                  }}
                  className="validate"
                />

                <span className="helper-text">Phone Number</span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="icon_prefix"
                  type="email"
                  value={email}
                  className="validate"
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />

                <span className="helper-text">Email</span>
              </div>
              <div className="input-field col s6">
                <input
                  id="icon_telephone"
                  type="password"
                  value={password}
                  className="validate"
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                />

                <span className="helper-text"> Password</span>
              </div>
            </div>

            <br />
            <br />
            <input
              type="submit"
              className="btn pink darken-2 right"
              value="SignUp"
            />
            <Link className=" cyan-text" to="/login">
              Have Account? Then Log In
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
