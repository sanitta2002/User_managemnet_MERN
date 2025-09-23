import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store/Store"
import { Api } from "../../Api/UserApi"
import { login } from "../../store/admin/AdminSlice"
import { admintokenStore } from "../../store/admin/AdminToken"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


function Login() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const token=useSelector((state:RootState)=>state.adminToken.token)

    const handleSubmit =async(e:React.FormEvent)=>{
        e.preventDefault()
        try {
          const res=await Api.post('/admin/login', { email, password },{ withCredentials: true})
          dispatch(login(res.data.admin))
          dispatch(admintokenStore(res.data.token))
          navigate("/admin/dashboard")
        } catch (error:any) {
          console.log(error)
          if(error.response?.data?.message){
            toast.error(error.respones.data.message)
          }else{
            toast.error("Login failed")
          }
        }
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-900">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-green-900">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
          />
          <button type="submit" className="w-full bg-green-900 text-white p-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
           Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login