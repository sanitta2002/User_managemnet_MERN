import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./pages/user/Signup"
import LoginPage from "./pages/user/LoginPage"



function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/signup"  element={<Signup/>}/>
      <Route path="'/Login" element={<LoginPage/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
