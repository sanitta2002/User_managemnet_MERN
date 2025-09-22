import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./pages/user/Signup"
import LoginPage from "./pages/user/LoginPage"
import HomePage from "./pages/user/HomePage"
import { ToastContainer } from "react-toastify"
import ProfilePage from "./pages/user/ProfilePage"
import useRefreshUser from "./Protect/useRefreshUser "
import ProtectedRoute from "./Protect/ProtectRoutUser"



function App() {
  useRefreshUser()
  return (
    <>
     <BrowserRouter>
     
     <ToastContainer position="top-right" autoClose={3000}  hideProgressBar={false}  newestOnTop={false}/>
     <Routes>
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
     </Routes>
    
     </BrowserRouter>
    </>
  )
}

export default App
