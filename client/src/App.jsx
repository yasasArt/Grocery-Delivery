import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './components/Login' // Make sure to import your Login component
import AllProducts from './pages/AllProducts' // Import your AllProducts page


const App = () => {
  const location = useLocation()
  const isSellerPath = location.pathname.includes('/seller')
  const [showLogin, setShowLogin] = useState(false) // State to manage login visibility

  return (
    <div>
      {!isSellerPath && <Navbar setShowLogin={setShowLogin} />} {/* Pass setShowLogin to Navbar */}
      
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            <button 
              onClick={() => setShowLogin(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <Login />
          </div>
        </div>
      )}

      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"} `}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes here */}
          <Route path="/products" element={<AllProducts />} />

        </Routes>
      </div>

      {!isSellerPath && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App