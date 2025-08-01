import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./Slices/UserSlice";
import { profile } from "console";
import  profileReducer  from "./Slices/ProfileSlice";
export default configureStore({
    reducer:{
        user:useReducer,
        profile:profileReducer
    }
})