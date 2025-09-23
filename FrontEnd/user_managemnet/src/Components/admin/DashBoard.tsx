import { useEffect, useState } from "react"
import NavBar from "./NavBar"
import Sidebar from "./Sidebar"
import { Api } from "../../Api/UserApi"
import type { User } from "../../Interfase/User"
import { toast } from "react-toastify"


function DashBoard() {
  const [user,setUser]=useState<User[]>([])
  const [serchUser,setSerchUser]=useState("")
  const [showConfirm,setShowConfirm]=useState(false)
  const [selectedUserId,setSelectedUserId]=useState<string |null>(null)
  const [showEditModal,setShowEditModal]=useState(false)
  const [editUser,setEditUser]=useState<Partial<User>>({})
 

 
  useEffect(()=>{
     const fetchUser = async()=>{
    try {
      const respones = await Api.get('/admin/getallUser')
      console.log(respones.data.userList)
      setUser(respones.data.userList || [])
    } catch (error) {
      console.log(error)
    }
  }
    fetchUser()
  },[])

  const confirmDelete =async(id:string | undefined)=>{
    if (!id) return
       setSelectedUserId(id)
       setShowConfirm(true)
  }

  const handleDelete=async()=>{
    if(!selectedUserId) return
    try {
      await Api.delete(`/admin/deleteUser?id=${selectedUserId}`)
      setUser(user.filter(u=>u._id!==selectedUserId))
      setShowConfirm(false)
      setSelectedUserId(null)
    } catch (error) {
      console.log(error)
    }
  }

 const handleEdit =(u:User)=>{
  setEditUser(u)
  setShowEditModal(true)
 }

 const saveEdit=async()=>{

  try {
    if(!editUser._id) return
    const updateData = {  
      name: editUser.name,
      email: editUser.email,
      password: editUser.password
    };
    const res=await Api.put(`/admin/upadateUser/${editUser._id}`,updateData)
    setUser(user.map((u)=>(u._id===editUser._id ? res.data.user :u)))
    toast.success("Profile updated successfully")
    setShowEditModal(false)
  } catch (error) {
    console.log(error)
  }
 }

 const filteredUsers = user.filter(u=>u.name.toLowerCase().includes(serchUser.toLowerCase()))

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <NavBar />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
              <input type="text" placeholder="Search users..." className="border p-2 rounded w-64 mb-4" value={serchUser} onChange={(e) => setSerchUser(e.target.value)}/>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full text-sm text-left">
              <thead className="bg-green-900 text-white">
                <tr>
                  <th className="py-3 px-4">Profile</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Actions</th>
                 </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u)=>(
                 <tr key={u._id} className=" hover:bg-gray-50">
                    <td className="py-2 px-4">
                    <img src={u.imageUrl || "No photo"} alt="Profile" className="w-10 h-10 rounded-full object-cover"/></td>
                    <td className="py-2 px-4">{u.name}</td>
                    <td className="py-2 px-4">{u.email}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <button onClick={()=>handleEdit(u)} className="bg-green-900 text-white px-3 py-1 rounded hover:bg-green-800">
                        Edit
                      </button>
                      <button onClick={()=>confirmDelete(u._id)} className="bg-green-900 text-white px-3 py-1 rounded hover:bg-green-800">
                        Delete
                      </button>
                      {showConfirm && (
                      <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-green-200 p-6 rounded-xl shadow-xl w-96 text-center">
                          <h2 className="text-lg font-semibold mb-4 text-green-950">Confirm Deletion</h2>
                          <p className="text-green-900 mb-6">
                               Are you sure you want to delete this user?
                          </p>
                          <div className="flex justify-center gap-4">
                            <button onClick={() => setShowConfirm(false)} className="px-4 py-2 rounded text-white bg-green-900 hover:bg-green-800 transition">
                                 Cancel
                            </button>
                            <button onClick={handleDelete} className="px-4 py-2 rounded bg-green-900 text-white hover:bg-green-800 transition">
                             Delete
                            </button>
                          </div>
                        </div>
                      </div>
                       )}

                    </td>
                  </tr>
                ))}
                {filteredUsers.length===0 && (
                  <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No users found
                </td>
              </tr>
                )}
              </tbody>
          </table>
              </div>
          </div>
        </div>
        {showEditModal && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-lg font-semibold mb-4 text-green-950">
              Edit User
            </h2>
            <input
              type="text"
              placeholder="Name"
              className="border p-2 w-full mb-3 rounded"
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 w-full mb-3 rounded"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password (optional)"
              className="border p-2 w-full mb-3 rounded"
              onChange={(e) =>
                setEditUser({ ...editUser, password: e.target.value })
              }
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-green-900 text-white rounded hover:bg-green-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

    </>
  )
}

export default DashBoard