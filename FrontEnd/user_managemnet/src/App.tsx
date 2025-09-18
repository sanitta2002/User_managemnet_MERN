import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./pages/user/Signup"
import LoginPage from "./pages/user/LoginPage"
import HomePage from "./pages/user/HomePage"
import { ToastContainer } from "react-toastify"



function App() {
  return (
    <>
     <BrowserRouter>
     <ToastContainer position="top-right" autoClose={3000}  hideProgressBar={false}  newestOnTop={false}/>
     <Routes>
      <Route path="/signup"  element={<Signup/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/home" element={<HomePage/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
