import axios from "axios";

const API_URL = "https://api.aiknotsit.com/api/create";

export const createProductApi = (formData) => {
  return axios.post(API_URL, formData);
};
