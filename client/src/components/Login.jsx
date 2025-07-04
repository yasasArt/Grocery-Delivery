import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAppContext } from '../context/AppContex';

const LoginForm = () => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const { setUser, setShowUserLogin } = useAppContext();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      // Use window.axios or import axios directly if not provided by context
      const axios = window.axios || (await import('axios')).default;
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password
      });
      if (data.success) {
        toast.success(state === "register" ? "Account created successfully!" : "Login successful!");
        setUser(data.user);
        setShowUserLogin(false);
        navigate('/'); // Navigate after setting user
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.message === "Invalid email or password") {
          toast.error("Invalid email or password");
        } else if (error.response.data.message === "User already exists") {
          toast.error("Already exists");
        } else {
          toast.error(error.response.data.message || "An error occurred");
        }
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
        <p className="text-2xl font-medium m-auto">
          <span className="text-green-500">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500" type="text" required />
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500" type="email" required />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500" type="password" required />
        </div>
        {state === "register" ? (
          <p>
            Already have account? <span onClick={() => setState("login")} className="text-green-500 cursor-pointer">click here</span>
          </p>
        ) : (
          <p>
            Create an account? <span onClick={() => setState("register")} className="text-green-500 cursor-pointer">click here</span>
          </p>
        )}
        <button className="bg-green-500 hover:bg-green-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  )
}

export default LoginForm;