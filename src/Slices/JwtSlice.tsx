import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../Services/LocalStorageService";

const jwtSlice=createSlice({
    name:"jwt",
    initialState:localStorage.getItem("token")|| "",
    reducers:{
        setJwt:(state,action)=>{
            localStorage.setItem("token",action.payload);
            return action.payload;   // ✅ returns a string
        },
        removeJwt:(state)=>{
            localStorage.removeItem("token");
            return "";               // ✅ must return empty string, not undefined
        }
    }
});

export const{setJwt,removeJwt}=jwtSlice.actions;
export default jwtSlice.reducer;

