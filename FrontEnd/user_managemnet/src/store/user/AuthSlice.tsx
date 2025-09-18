import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../Interfase/User";

interface AuthState{
    user:User|null
}

const initialState:AuthState={
    user:null
}

const AuthSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user=action.payload
        }
    }
})

export const {login}=AuthSlice.actions
export default AuthSlice.reducer