import axios from "axios";

const api = query => {
  return axios({
    method: "POST",
    data: { query: query },
    url: "https://test-social-k.herokuapp.com/graphql/"
  });
};

export default api;
