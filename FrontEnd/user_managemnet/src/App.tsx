import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./pages/user/Signup"
import LoginPage from "./pages/user/LoginPage"
import HomePage from "./pages/user/HomePage"
import { ToastContainer } from "react-toastify"
import ProfilePage from "./pages/user/ProfilePage"
import useRefreshUser from "./Protect/UseRefreshUser"
import ProtectedRoute from "./Protect/ProtectRoutUser"
import Login from "./Components/admin/Login"
import ProtectedAdmin from "./Protect/ProtectedAdmin"
import DashBoard from "./Components/admin/DashBoard"
import AddUser from "./Components/admin/AddUser"



function App() {
  useRefreshUser()
  return (
    <>
     <BrowserRouter>
     
     <ToastContainer position="top-right" autoClose={3000}  hideProgressBar={false}  newestOnTop={false}/>
     <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/signup"  element={<Signup/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/home" element={
        <ProtectedRoute>
        <HomePage/>
        </ProtectedRoute>
        }/>
      <Route path="/profile" element={
         <ProtectedRoute>
        <ProfilePage/>
        </ProtectedRoute>
        }/>

        <Route path="/admin/login" element={<Login/>}/>
        <Route path="/admin/dashboard" element={<ProtectedAdmin>
          <DashBoard/>
        </ProtectedAdmin>} />
        <Route path="/admin/addUser" element={<ProtectedAdmin><AddUser/></ProtectedAdmin>} />
        
     </Routes>
    
     </BrowserRouter>
    </>
  )
}

export default App
