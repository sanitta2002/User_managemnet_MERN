import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Api } from "../../Api/UserApi"
import { logoutUser } from "../../store/admin/AdminSlice"
import { toast } from "react-toastify"


function NavBar() {
    const dispatch =useDispatch()
    const navigate=useNavigate()

  const logout=async()=>{
     await Api.get('/admin/logout',{ withCredentials: true })
     dispatch(logoutUser())
     navigate('/admin/login')
     toast.success("Logged out successfully")
  }
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-green-900">DashBoard</h1>
      <button onClick={logout} className=" bg-green-800 px-3 py-1 rounded-lg text-green-50">
         Logout
      </button>
    </div>
  )
}

export default NavBar