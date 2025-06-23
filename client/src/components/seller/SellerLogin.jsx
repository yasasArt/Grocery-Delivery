import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContex'

const SellerLogin = () => {
    const { isSeller, setSeller, navigate } = useAppContext()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            // Here you should add actual authentication logic
            // For now, we'll just set the seller status directly
            setSeller(true); // Make sure this is properly updating the context state
            navigate("/seller"); // Navigate directly after setting seller status
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    // This useEffect might not be necessary if you navigate directly in onSubmitHandler
    useEffect(() => {
        if (isSeller) {
            navigate("/seller");
        }
    }, [isSeller, navigate])

    return !isSeller && (
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
                    className='w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-200'
                >
                    Login
                </button>
            </div>
        </form>
    )
}

export default SellerLogin