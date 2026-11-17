import axios from "axios";
import { removeUser } from "../Slices/UserSlice";

const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8081";
const base_url = `${baseURL}/auth/`;

const loginUser=async (login:any)=>{
    return axios.post(`${base_url}login`,login)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const navigateToLogib=(navigate:any)=>{
    localStorage.removeItem('token');
    removeUser();
    navigate("/login");
}

export {loginUser};