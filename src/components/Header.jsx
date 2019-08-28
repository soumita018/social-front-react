import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = props => {
  const [search, setSearch] = useState("");

  return (
    <React.Fragment>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper pink">
            <Link to="/" className="brand-logo">
              TweetNicely
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
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
                      <i className="material-icons">search</i>
                    </label>
                    <i className="material-icons">close</i>
                  </div>
                </form>
              </li>
              <li>
                <Link to={`/user/${sessionStorage.toothless}`}>My Profile</Link>
              </li>
              <li>
                <Link to={`/logout`}>Logout</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Header;
