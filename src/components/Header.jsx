import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = props => {
  const [search, setSearch] = useState("");

  return (
    <React.Fragment>
      <div className="navbar-fixed ">
        <nav className="pink">
          <div className="nav-wrapper pink container">
            <Link to="/" className="brand-logo">
              TweetNicely
            </Link>
            {sessionStorage.toothless ? (
              <ul id="nav-mobile" className="right">
                <li>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      props.history.push(`/search/${search}`);
                    }}
                  >
                    <div className="input-field">
                      <input
                        id="search"
                        type="search"
                        value={search}
                        onChange={e => {
                          setSearch(e.target.value);
                        }}
                        required
                      />
                      <label className="label-icon" htmlFor="search">
                        <img src="https://img.icons8.com/material/20/000000/search--v1.png" />
                      </label>
                      <span className="material-icons">X</span>
                    </div>
                  </form>
                </li>
                <li>
                  <Link to={`/user/${sessionStorage.toothless}`}>
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to={`/logout`}>Logout</Link>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Header;
