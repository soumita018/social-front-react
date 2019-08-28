import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/api";

import { Link } from "react-router-dom";

const SearchProfile = props => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    api(`{
        user(search: "${props.match.params.search}") {
          id
          name
        }
      }`)
      .then(res => {
        setProfile(res.data.data.user);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <h3 className="center grey-text">
        Search result for : {props.match.params.search}
      </h3>
      <br />
      <hr />
      <br />
      <div className="row">
        {profile.map(pro => {
          return (
            <div className="col s4">
              <div className="card margin pink ">
                <Link to={`/user/${pro.id}`} key={pro.id}>
                  <h6 className="fonty white-text">{pro.name} </h6>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchProfile;
