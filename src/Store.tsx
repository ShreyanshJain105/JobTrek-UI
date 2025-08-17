import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./Slices/UserSlice";
import { profile } from "console";
import  profileReducer  from "./Slices/ProfileSlice";
import filterReducer from "./Slices/FilterSlice";
export default configureStore({
    reducer:{
        user:useReducer,
        profile:profileReducer,
        filter:filterReducer
    }
})