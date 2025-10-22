import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "axios";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL;

export const Navbar = () => {
    const { isLoggedIn, setIsLoggedIn }= useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axios.post(`${apiUrl}/auth/logout`, { withCredential: true });
            toast.success(res.data.message);
            setIsLoggedIn(false);
            navigate('/login');
        } catch (err: any) {
            console.log(err.message);
        }
    }

    return (
        <div className="flex justify-between">
            <Link to='/home' className="text-green-600 text-2xl font-semibold">AI-Studio</Link>
            { isLoggedIn ? (
                <button
                    className="bg-gray-200 px-4 py-2 hover:bg-gray-300 rounded-md"
                    onClick={ handleLogout }
                >
                    Logout
            </button>
                
            ) : (
                <div className="flex space-x-5 text-lg">
                    <Link to='/login' className="bg-gray-200 px-4 py-2 hover:bg-gray-300 rounded-md">Login</Link>
                    <Link to='/register' className="bg-gray-200 px-4 py-2 hover:bg-gray-300 rounded-md">Register</Link>
                </div>
            )}
        </div>
    )
}