import React from 'react';
import { useNavigate } from 'react-router-dom';

export const categories = [
  { name: 'fruit', image: 'fruit.jpeg', path: 'fruit', text: 'Fruits' },
  { name: 'vegetable', image: 'vegitable.jpeg', path: 'vegetable', text: 'Vegetables' },
  { name: 'milk', image: 'milk.jpeg', path: 'milk', text: 'Dairy Products' },
  { name: 'cold', image: 'cold.jpeg', path: 'cold', text: 'Cold Items' },
  { name: 'seeds', image: 'seeds.jpeg', path: 'seeds', text: 'Seeds' },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (path) => {
    navigate(`/products/${path}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className='mt-16 px-4'>
      <p className='text-2xl md:text-3xl font-medium'>Categories</p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6'>
        {categories.map((category, index) => (
          <div 
            key={index}
            onClick={() => handleCategoryClick(category.path)}
            className='group cursor-pointer py-5 px-3 flex flex-col items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all'
          >
            <img 
              src={category.image} 
              alt={category.name} 
              className='group-hover:scale-105 transition-transform duration-300 max-w-[75px] h-[75px] object-contain'
            />
            <p className='text-sm font-medium mt-2 capitalize'>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;