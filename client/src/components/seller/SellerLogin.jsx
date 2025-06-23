import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SellerLogin = ({ setIsSellerAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            // Here you should add actual authentication logic
            // For now, we'll just set the seller status directly
            setIsSellerAuthenticated(true); // This updates the state in App component
            navigate("/seller"); // Navigate to seller dashboard
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>
            <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
                <p className='text-2xl font-medium m-auto'><span className='text-primary'>seller</span>Login</p>

                <div className='w-full'>
                    <p>Email</p>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        type='email' 
                        placeholder='enter your email'
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
                        required
                    />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        type='password' 
                        placeholder='enter your password'
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
                        required
                    />
                </div>
                <button 
                    type='submit' 
                    className="bg-green-500 hover:bg-green-600 transition-all text-white w-full py-2 rounded-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? "Processing..." : "Login"}
                </button>
            </div>
        </form>
    )
}

export default SellerLogin