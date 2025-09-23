import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate=useNavigate()
  return (
    <>
    <div className={`h-screen bg-green-900 text-white ${collapsed ? "w-20" : "w-64"} transition-all duration-300`}>
      <div className="flex justify-between items-center p-4">
        {!collapsed && <h1 className="text-xl font-bold">Admin</h1>}
        <button onClick={() => setCollapsed(!collapsed)} className="text-white-400">
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="mt-4">
        <ul>
          <li className="flex items-center gap-3 p-3 hover:bg-green-700 cursor-pointer" onClick={()=>navigate('/admin/dashboard')}>
            UserDetails
          </li>
          <li className="flex items-center gap-3 p-3 hover:bg-green-700 cursor-pointer" onClick={()=>navigate('/admin/addUser')}>
            Add User
          </li>
        </ul>
      </nav>
    </div>
    </>
  )
}

export default Sidebar