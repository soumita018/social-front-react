import decode from "jwt-decode";
import graphic from "./connect";
import axios from "axios";

export default class AuthService {
  // constructor(domain) {
  //     this.domain = domain || 'http://localhost:8080'
  //     this.fetch = this.fetch.bind(this)
  //     this.login = this.login.bind(this)
  //     this.getProfile = this.getProfile.bind(this)
  // }

  domain = "http://api.foodmood.ml";

  login = (username, password) => {
    const query = `mutation{
        tokenAuth(phone:"${username}",password:"${password}"){
          token
        }
      }`;

    return axios({
      url: "http://api.foodmood.ml/",
      method: "post",
      data: { query: query }
    });

    // return graphic(query);
    // .then(result => {
    //   this.setToken(result.data.data.tokenAuth.token);
    //   return Promise.resolve(result.data.data.tokenAuth);
    // });
  };

  getDetail = (username, password) => {
    const query = `{
        userValid(phone:"${username}",password:"${password}"){
          id
          userType
          restaurant{
            id
            subscriptionEnd
          }
        }
      }`;

    return axios({
      url: "http://api.foodmood.ml/",
      method: "post",
      data: { query: query }
    });

    // return graphic(query);
    // .then(result => {
    //   this.setToken(result.data.data.tokenAuth.token);
    //   return Promise.resolve(result.data.data.tokenAuth);
    // });
  };

  loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handWaiving here
  };

  isTokenExpired = token => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  };

  setToken = idToken => {
    // Saves user token to sessionStorage
    sessionStorage.setItem("id_token", idToken);
  };

  // "godFather" is user_id
  // "strangerThings" is userType
  // "narcos" is restaurant_id
  // "sherlock" is expiry date

  setUser = (id, userType, restaurant, expiry) => {
    // Saves user token to sessionStorage
    sessionStorage.setItem("godFather", encr(id));
    sessionStorage.setItem("strangerThings", encr(userType));
    sessionStorage.setItem("narcos", encr(restaurant));
    sessionStorage.setItem("sherlock", encr(expiry));
  };

  getToken = () => {
    // Retrieves the user token from sessionStorage
    return sessionStorage.getItem("id_token");
  };

  logout = () => {
    // Clear user token and profile data from sessionStorage
    sessionStorage.removeItem("id_token");
    sessionStorage.removeItem("godFather");
    sessionStorage.removeItem("strangerThings");
    sessionStorage.removeItem("narcos");
    sessionStorage.removeItem("sherlock");
  };

  getProfile = () => {
    return decode(this.getToken());
  };

  fetch = (url, options) => {
    // performs api calls sending the required authentication headers
    let authentication = "";

    if (this.loggedIn()) {
      authentication = `mutation{
            verifyToken(token:"${this.getToken()}"){
              payload
            }
          }`;
    }

    graphic(authentication)
      .then(this._checkStatus)
      .then(response => response.json());
  };

  _checkStatus = response => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };
}
