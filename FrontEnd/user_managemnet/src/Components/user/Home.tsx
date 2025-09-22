import {useSelector } from "react-redux"
import NavBar from "./NavBar"
import type { RootState } from "../../store/Store"





function Home() {
  const user=useSelector((state:RootState)=>state.auth.user)

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-green-100 text-center py-12 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-800">Welcome, {user?.name || 'Guest'}!</h2>
        <p className="text-gray-600 mt-2">We are happy to see you.</p>
      </div>
    </>
  )
}

export default Home