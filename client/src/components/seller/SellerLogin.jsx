import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const SellerLogin = ({ setIsSellerAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Hardcoded admin credentials (for demo/demo only)
    const ADMIN_CREDENTIALS = {
        email: 'admin@example.com',
        password: 'admin123'
    };

    // Persist seller authentication on refresh
    useEffect(() => {
        const token = localStorage.getItem('sellerToken');
        if (token) {
            setIsSellerAuthenticated(true);
            navigate("/seller");
        }
        // eslint-disable-next-line
    }, []);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            // Check if it's the admin login
            if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
                setIsSellerAuthenticated(true);
                localStorage.setItem('sellerToken', 'admin-auth-token'); // Store auth token
                navigate("/seller");
                toast.success("Admin login successful");
                return;
            }

            // Regular seller login
            const { data } = await axios.post("/api/seller/login", { email, password });
            
            if (data.success) {
                setIsSellerAuthenticated(true);
                localStorage.setItem('sellerToken', data.token); // Store the token from backend
                navigate("/seller");
                toast.success("Login successful");
            } else {
                toast.error(data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

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
    );
};

export default SellerLogin;