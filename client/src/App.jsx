import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'

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
    </div>
  )
}

export default App