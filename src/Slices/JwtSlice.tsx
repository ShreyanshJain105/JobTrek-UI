import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../Services/LocalStorageService";

const jwtSlice=createSlice({
    name:"jwt",
    initialState:localStorage.getItem("token")|| "",
    reducers:{
        setJwt:(state,action)=>{
            localStorage.setItem("token",action.payload);
            return action.payload;
        },
        removeJwt:(state)=>{
            localStorage.removeItem("token");
            return "";
        }
    }
});

export const{setJwt,removeJwt}=jwtSlice.actions;
export default jwtSlice.reducer;

