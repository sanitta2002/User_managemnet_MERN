import { useState, type FormEvent } from "react"
import { Api } from "../../Api/UserApi"
import { useDispatch } from "react-redux"
import { login } from "../../store/user/AuthSlice"
import { tokenStore } from "../../store/user/TokenSlice"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AxiosError } from "axios"


function Login() {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const navigate=useNavigate()
    const dispatch=useDispatch()


    const handleSubmit= async (e:FormEvent<HTMLFormElement>)=>{
       e.preventDefault()

       if(!email || !password){
        alert("please Fill in all fields")
        return
       }

       try {
         const response=await Api.post('/user/login',{email,password})
         console.log(response.data)
         dispatch(login(response.data.user))
         dispatch(tokenStore(response.data.token))
         toast.success("Login Successful")
         navigate('/home',{replace:true})
       } catch (error) {
        if(error instanceof AxiosError)toast.error(error.response?.data.message)
         console.error("Login failed. Please try again.",error)
       }

    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 ">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl shadow-green-200">
        <h1 className="text-3xl font-bold text-green-900 mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
            <input value={email} onChange={(e)=>setemail(e.target.value)} type="text" placeholder="Enter your Email"  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent transition duration-200"/><br/>
            <input value={password} onChange={(e)=>setpassword(e.target.value)} type="password" placeholder="Enter your Password"  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent transition duration-200"/><br/>
            <button className="w-full p-3 bg-green-900 text-white font-semibold rounded-lg hover:bg-green-900 transition-all duration-300">Submit</button>
        </form>
        <p className="mt-6 text-center text-green-700 text-sm">Don’t have an account?{" "} <span onClick={()=>navigate('/Signup')} className="text-green-900 hover:underline cursor-pointer">Sign up</span></p>
      </div>
    </div>
  )
}

export default Login
