import React from 'react'

const LoginForm = () => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div >

      <form className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">

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