import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContex';
import toast from 'react-hot-toast';

const Navbar = ({ setShowLogin }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { getcartCount, user, axios } = useAppContext();

  const logout = async () => {
  try {
    const {data} =await axios.get('/api/user/logout');
    if (data.success) {
      toast.success("Logged out successfully");
      setUser(null);
      navigate('/');
    }else {
      toast.error(data.message);
    }
  } catch (error) {
     toast.error(error.message);
  }
  
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Default profile image path
  const defaultProfileImage = '/profilePicture.png'; // Make sure this path is correct

  return (
    <div>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
        <NavLink to='/' onClick={() => setOpen(false)}>
          <img className="h-9" src="profile.png" alt="dummyLogoColored" />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/products'>All Products</NavLink>
          <NavLink to='/'>Contact</NavLink>

          <form onSubmit={handleSearch} className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
            />
            <button type="submit">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path clipRule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>

          <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <button className="absolute -top-2 -right-3 text-xs text-white bg-green-500 w-[18px] h-[18px] rounded-full">{getcartCount()}</button>
          </div>

          {!user ? (
            <button
              onClick={() => {
                setShowLogin(true);
                setOpen(false);
              }}
              className="cursor-pointer px-6 py-2 bg-green-500 hover:bg-green-600 transition text-white rounded-full"
            >
              Login
            </button>
          ) : (
            <div className="relative group flex items-center gap-2">
              <div className="cursor-pointer" onClick={() => navigate('/profile')}>
                <img 
                  src={user.photoURL || defaultProfileImage} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = defaultProfileImage;
                  }}
                />
              </div>
              <div className="hidden group-hover:block absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/profile')}>My Profile</div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/orders')}>My Orders</div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden">
          <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
          </svg>
        </button>

        <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
          <NavLink to='/' onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to='/products' onClick={() => setOpen(false)}>All Products</NavLink>
          <NavLink to='/' onClick={() => setOpen(false)}>Contact</NavLink>

          <form onSubmit={handleSearch} className="w-full mt-2">
            <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                type="text"
                placeholder="Search products"
              />
              <button type="submit">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path clipRule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </form>

          {!user ? (
            <button
              onClick={() => {
                setShowLogin(true);
                setOpen(false);
              }}
              className="cursor-pointer px-6 py-2 bg-green-500 hover:bg-green-600 transition text-white rounded-full text-sm mt-2"
            >
              Login
            </button>
          ) : (
            <div className="w-full mt-2">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={user.photoURL || defaultProfileImage} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = defaultProfileImage;
                  }}
                />
                <span>{user.displayName || 'User'}</span>
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate('/profile'); setOpen(false); }}>My Profile</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate('/orders'); setOpen(false); }}>My Orders</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { handleLogout(); setOpen(false); }}>Logout</div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;