import React from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'fruit', image: 'fruit.jpeg', path: 'fruit' },
    { name: 'vegetable', image: 'vegitable.jpeg', path: 'vegetable' },
    { name: 'milk', image: 'milk.jpeg', path: 'milk' },
    { name: 'cold', image: 'cold.jpeg', path: 'cold' },
    { name: 'seeds', image: 'seeds.jpeg', path: 'seeds' },
  ];

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