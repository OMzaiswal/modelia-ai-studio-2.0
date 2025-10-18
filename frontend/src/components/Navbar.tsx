import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <div className="flex justify-between">
            <Link to='/home' className="text-green-600 text-2xl font-semibold">AI-Studio</Link>
            <div className="flex space-x-5 text-lg">
                <Link to='/login' className="bg-gray-200 px-4 py-2 hover:bg-gray-300 rounded-md">Login</Link>
                <Link to='/register' className="bg-gray-200 px-4 py-2 hover:bg-gray-300 rounded-md">Register</Link>
            </div>
        </div>
    )
}