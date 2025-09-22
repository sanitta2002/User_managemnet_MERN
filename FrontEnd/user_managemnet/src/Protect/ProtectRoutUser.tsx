
import { useEffect,type ReactNode } from "react";
import type { RootState } from "../store/Store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute =({children}:ProtectedRouteProps)=>{
   const user=useSelector((state:RootState)=>state.auth)
   const navigate=useNavigate()

  useEffect(()=>{
    if(!user){
        navigate('/login',{replace:true})
    }
  },[user,navigate])
  return (
    <>{children}</>
  )
}

export default ProtectedRoute