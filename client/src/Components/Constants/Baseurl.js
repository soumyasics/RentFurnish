import axios from "axios"

const axiosInstance = axios.create({

    //server api
    baseURL: 'http://hybrid.srishticampus.in:4027/rentfurnish_api', 

    // baseURL: '', 
  
  //local api 
  
    // baseURL: 'http://localhost:4027/rentfurnish_api', 
  
    headers: {
      'Content-Type': 'application/json',
    },

    //  url :"http://localhost:4027",
     url:  "http://hybrid.srishticampus.in:4027/"
    
  });
   
  export default axiosInstance