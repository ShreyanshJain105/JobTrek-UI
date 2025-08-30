import axios from "axios";
import { removeUser } from "../Slices/UserSlice";
const base_url="https://jobtrek-backend.onrender.com/auth/"

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