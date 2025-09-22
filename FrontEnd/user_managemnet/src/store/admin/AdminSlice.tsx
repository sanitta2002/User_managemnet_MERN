import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../Interfase/User";
import { startTransition } from "react";


interface AdminState{
    admin:User|null
}
const initialState:AdminState={
    admin:null
}

const adminSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.admin=action.payload
        },
        logoutUser:(state)=>{
            state.admin=null
        }
    }
})
export const {login,logoutUser}=adminSlice.actions
export default adminSlice.reducer