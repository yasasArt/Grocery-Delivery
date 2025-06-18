import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer' // Make sure to import the Footer component
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const location = useLocation()
  const isSellerPath = location.pathname.includes('/seller')

  return (
    <div>
      {!isSellerPath && <Navbar />}
      
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"} `}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes here */}
        </Routes>
      </div>

      {!isSellerPath && <Footer />} {/* Added the same condition as Navbar */}

      {/* Toast Container - should be at root level */}
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