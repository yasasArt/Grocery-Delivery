import React from 'react';
import { Link } from 'react-router-dom';

const MainBanner = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Desktop Banner */}
      <img 
        src="Banner.png" 
        alt="Main Banner" 
        className="w-full hidden md:block rounded-lg"
        style={{
          aspectRatio: '15/8',
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'cover'
        }}
      />
      
      {/* Mobile Banner */}
      <img 
        src="Banner.png" 
        alt="Main Banner" 
        className="w-full md:hidden rounded-lg"
        style={{
          aspectRatio: '4/5',
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'cover'
        }}
      />
      
      {/* Banner Content - Placed below the image */}
      <div className="mt-8 text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-gray-800">
          Freshness You Can Trust, Savings You Will Love!
        </h1>
        
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link 
            to="/products" 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors text-sm md:text-base"
          >
            Shop Now
          </Link>
          <Link 
            to="/products" 
            className="border-2 border-green-600 hover:bg-green-50 text-green-600 px-6 py-3 rounded-md font-medium transition-colors text-sm md:text-base"
          >
            Explore Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;