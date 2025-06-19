import React from 'react';
import { useLocation } from 'react-router-dom';

const AllProducts = () => {
  // Product categories with images
  const categories = [
    { id: 1, name: 'Apples', image:"apple.jpeg", count: 24 },
    { id: 2, name: 'Bananas', image: 'banana.jpeg', count: 18 },
    { id: 3, name: 'Beets', image: 'beet.jpeg', count: 15 },
    { id: 4, name: 'Cabbage', image: 'cabbage.jpeg', count: 9 },
    { id: 5, name: 'Cherries', image: 'cherries.jpeg', count: 12 },
    { id: 6, name: 'Chilli', image: 'chilli.jpeg', count: 7 },
    { id: 7, name: 'Kiwi', image: 'kiwi.jpeg', count: 11 },
    { id: 8, name: 'Oranges', image: 'orange.jpeg', count: 14 },
    { id: 9, name: 'Strawberries', image: 'strawberry.jpeg', count: 8 },
    { id: 10, name: 'Watermelons', image: 'watermelon.jpeg', count: 6 },
  ];

  // Get the search query from URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

 // Filter categories based on search query
const filteredCategories = searchQuery
  ? categories.filter(category => 
      category.name.toLowerCase().includes(searchQuery))  // Added missing parenthesis
  : categories;
  
  return (
    <div className='mt-16 flex flex-col px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>
          {searchQuery ? 'Search Results' : 'All products'}
        </p>
        <div className='w-16 h-0.5 bg-green-500 rounded-full'></div>
      </div>

      {/* Show search query if exists */}
      {searchQuery && (
        <div className="mt-4 text-gray-600">
          Showing results for: "{searchQuery}"
        </div>
      )}

      {/* Categories Section */}
      <div className='mt-8'>
        <h3 className='text-lg font-semibold mb-4'>
          {searchQuery ? 'Matching Product' : 'Fresh Produce Categories'}
        </h3>
        
        {filteredCategories.length > 0 ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
            {filteredCategories.map(category => (
              <div 
                key={category.id}
                className='group border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer'
              >
                <div className='h-40 bg-gray-100 overflow-hidden'>
                  <img 
                    src={`/images/${category.image}`} 
                    alt={category.name}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform'
                  />
                </div>
                <div className='p-3'>
                  <h4 className='font-medium text-gray-800'>{category.name}</h4>
                  <p className='text-sm text-gray-500'>{category.count} varieties</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No products found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;