import axios from "axios";

const axiosMultipartInstance = axios.create({

  // baseURL: "http://hybrid.srishticampus.in:4027/rentfurnish_api",

  baseURL:  "http://localhost:4027/rentfurnish_api",

  headers: {
    "Content-Type": "multipart/form-data", 
  },
});

export default axiosMultipartInstance;