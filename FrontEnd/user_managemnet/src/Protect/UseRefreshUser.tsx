import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Api } from "../Api/UserApi"
import { login } from "../store/user/AuthSlice"


function useRefreshUser () {
  const dispatch=useDispatch()

  useEffect(()=>{
    const refreshUser=async()=>{
        try {
            const res=await Api.get('/user/refresh',{ withCredentials: true })
            dispatch(login(res.data.user))
        } catch (error:any) {
            if(error.response?.status !==401)
            console.log("No active session", error)
        }
    }
    refreshUser()
  },[dispatch])
}

export default useRefreshUser 
