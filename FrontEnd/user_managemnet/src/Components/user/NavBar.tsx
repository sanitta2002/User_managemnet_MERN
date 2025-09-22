import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../../store/user/AuthSlice"
import { Api } from "../../Api/UserApi"
import { removeToken } from "../../store/user/TokenSlice"


function NavBar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = async() => {
        try {
            await Api.get('/user/logout')
            dispatch(logoutUser())
            dispatch(removeToken())
            navigate('/login')
        } catch (error) {
            console.error("Logout failed", error)
        }
    }
    return (
        <div>
            <nav className="bg-green-900 text-white p-4 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-bold">MyApp</h1>
                <div className="space-x-4">
                    <button className="hover:bg-green-800 px-3 py-1 rounded-lg" onClick={()=>navigate('/home')}>Home</button>
                    <button className="hover:bg-green-800 px-3 py-1 rounded-lg" onClick={()=>navigate('/profile')}>Profile</button>
                    <button onClick={logout}
                        className=" hover:bg-green-800 px-3 py-1 rounded-lg">
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default NavBar