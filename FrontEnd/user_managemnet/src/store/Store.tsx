import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../store/user/AuthSlice'
import tokenReducer from '../store/user/TokenSlice'

export  const store=configureStore({
    reducer:{
       auth:userReducer,
       token:tokenReducer
    }
})

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch