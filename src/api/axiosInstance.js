import axios from "axios";

const API = axios.create({
  baseURL: "https://edunexusbackend-v2-production.up.railway.app", 
  withCredentials: true,  
});

export default API;
