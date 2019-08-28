import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

const Login = props => {
  useEffect(()=>{if(sessionStorage.toothless){
    props.history.push('/')
  }},[])
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const login = e => {
    e.preventDefault();
    api(`{
  login(phone: "${phone}", password: "${password}") {
    id
  
  }
}`)
      .then(res => {
        if (res.data.data.login !== null) {
          sessionStorage.setItem("toothless", res.data.data.login.id);
          props.history.push("/");
        } else {
          setError("Something went wrong");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div className="card fonty margin post">
      <h2 className="  grey-text center">Login</h2>

      <hr />
      <h6 className="red white-text">{error}</h6>
      <br />
      <div className="row">
        <form className="col s12" onSubmit={login}>
          <div className="row">
            <div className="input-field col s6">
              <input
                id="icon_prefix"
                type="tel"
                className="validate"
                pattern="[0-9]{10}"
                title="Enter 10 digit Phone Number. e.g. 8335875073"
                value={phone}
                onChange={e => {
                  setPhone(e.target.value);
                }}
              />

              <span className="helper-text">Phone Number</span>
            </div>
            <div className="input-field col s6">
              <input
                id="icon_telephone"
                type="password"
                className="validate"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />

              <span className="helper-text">Password</span>
            </div>
          </div>

          <br />
          <br />
          <input
            type="submit"
            className="btn pink darken-2 right"
            value="login"
          />
          <Link className=" cyan-text" to="/signup">
            Do not have Account? then Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
