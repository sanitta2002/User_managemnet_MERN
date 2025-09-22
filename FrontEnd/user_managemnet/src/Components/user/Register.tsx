import { useState, type FormEvent } from "react"
import { Api } from "../../Api/UserApi"
import type { User } from "../../Interfase/User"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"



function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [Cpassword, setCpassword] = useState('')
   
  const navigate=useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !password.trim() || !Cpassword.trim()) {
      toast.error("Please fill in all fields")
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      toast.error("Invalid email format.")
    }
    if (password && password.length < 6) {
      toast.error("Password must be at least 6 characters long.")
    }

    if (password !== Cpassword) {
      toast.error("Passwords do not match.")
    }
    console.log(name, email, password)
    try {
      const response = await Api.post<User>('/user/signup', {
        name,
        email,
        password
      })
      console.log(response.data)
      toast.success("Registration successful!")
      setName("");
      setEmail("");
      SetPassword("");
      setCpassword("");
    } catch (error) {
        console.error(error)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100  ">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl shadow-green-200">
        <h1 className="text-3xl font-bold text-green-900 mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your Name"  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent transition duration-200" /><br/>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter your Email" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent transition duration-200" /><br/>
          <input value={password} onChange={(e) => SetPassword(e.target.value)} type="password" placeholder="Enter your Password" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent transition duration-200" /><br/>
          <input value={Cpassword} onChange={(e) => setCpassword(e.target.value)} type="password" placeholder="Confirm Possword" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent transition duration-200" /><br/>
          <button className="w-full p-3 bg-green-900 text-white font-semibold rounded-lg hover:bg-green-900 transition-all duration-300">Submit</button>
        </form>
        <p className="mt-6 text-center text-green-700 text-sm">Already have an account? {" "} <span onClick={()=>navigate('/login')} className="text-green-900 hover:underline cursor-pointer">Login</span></p>
      </div>
    </div>
  )
}

export default Register
