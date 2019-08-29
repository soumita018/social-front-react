import axios from "axios";

const api = query => {
  return axios({
    method: "POST",
    data: { query: query },
    url: "https://test-social-k.herokuapp.com/graphql/"
  });
};

export const apiImg = (query, image) => {
  return axios({
    url: "https://test-social-k.herokuapp.com/graphql/",
    method: "post",
    data: image,
    params: {
      query: query
    }
  });
};

export default api;
