import { createSlice } from "@reduxjs/toolkit"




interface Token{
    token:string |null
}

const initialState:Token={
    token:null
}

const AdminTokenSlice=createSlice({
    name:"token",
    initialState,
    reducers:{
        admintokenStore:(state,action)=>{
            state.token=action.payload
        },
        asminremoveToken:(state)=>{
          state.token=null
        }
    }
})
export const {admintokenStore,asminremoveToken}=AdminTokenSlice.actions
export default AdminTokenSlice.reducer