import { createSlice } from "@reduxjs/toolkit"


interface Token{
    token:string |null
}

const initialState:Token={
    token:null
}

const TokenSlice=createSlice({
    name:"token",
    initialState,
    reducers:{
        tokenStore:(state,action)=>{
            state.token=action.payload
        },
        removeToken:(state)=>{
            state.token=null
        }
    }
})

export const {tokenStore,removeToken}=TokenSlice.actions
export default TokenSlice.reducer