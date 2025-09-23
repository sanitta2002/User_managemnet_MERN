
import { useSelector } from "react-redux";
import type { RootState } from "../store/Store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedAdmin=({children}:ProtectedRouteProps)=>{
  const admin=useSelector((state:RootState)=>state.admin.admin)
  const navigate=useNavigate()
  
  useEffect(()=>{
    if(!admin){
       navigate('/admin/login',{replace:true})
    }
  },[admin,navigate])
  return(
    <>{children}</>
  )
  
}
export default ProtectedAdmin