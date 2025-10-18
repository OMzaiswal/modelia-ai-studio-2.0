import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL; 

export const Register = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResponse(null);

        try {
            const res = await axios.post(`${apiUrl}/auth/register`, { name, email, password });
            if(res) {
                console.log(res.data);
            }
        } catch (err: any) {
            console.log(err.response?.data?.message)
            setError(err.response?.data?.error[0].message ||  err.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full my-40 flex justify-center">
            <div className="flex flex-col justify-center items-center w-full max-w-md px-4 py-10 bg-white shadow-md rounded-lg">
                <div className="mb-2">
                    <p className="text-xl">Create Account</p>
                    <p className="text-md">Please enter your details to create your account.</p>
                </div>
                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-4 w-full px-8 mb-4"
                >
                    <input 
                        type="text" 
                        placeholder="Enter your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="p-2 border border-gray-200 rounded-md focus:outline-none" 
                        required
                    />
                    <input 
                        type="email"  
                        placeholder="Enter Email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="p-2 border border-gray-200 rounded-md focus:outline-none"
                        required
                    />
                    <input 
                        type="password"  
                        placeholder="Enter Password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="p-2 border border-gray-200 rounded-md focus:outline-none"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="border border-gray-200 rounded-md p-2 bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                    <div className="flex justify-center gap-2">
                        <p>Already have an account?</p>
                        <Link to='/login' className="text-green-700">Login</Link>
                    </div>
                </form>
                
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
        </div>
    )
}