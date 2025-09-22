import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../store/user/AuthSlice'
import tokenReducer from '../store/user/TokenSlice'
import adminReducer from '../store/admin/AdminSlice'
import adminTokenReducer from '../store/admin/AdminToken'

export  const store=configureStore({
    reducer:{
       auth:userReducer,
       token:tokenReducer,
       admin:adminReducer,
       adminToken:adminTokenReducer
    }
})

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch