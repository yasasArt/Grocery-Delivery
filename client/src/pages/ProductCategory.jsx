import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Mock data - using the same image path pattern as AllProducts
const productsByCategory = {
  fruit: [
    { id: 1, name: 'Apple', image: 'apple.jpeg', price: 1.99 },
    { id: 2, name: 'Banana', image: 'banana.jpeg', price: 0.99 },
    { id: 7, name: 'Kiwi', image: 'kiwi.jpeg', price: 1.49 },
    { id: 8, name: 'Orange', image: 'orange.jpeg', price: 0.79 },
    { id: 9, name: 'Strawberry', image: 'strawberry.jpeg', price: 2.99 },
    { id: 10, name: 'Watermelon', image: 'watermelon.jpeg', price: 4.99 },
  ],
  vegetable: [
    { id: 3, name: 'Carrot', image: 'carrot.jpeg', price: 0.79 },
    { id: 4, name: 'potato', image: 'potato.jpeg', price: 1.49 },
    { id: 5, name: 'Cabbage', image: 'cabbage.jpeg', price: 1.29 },
    { id: 6, name: 'Chilli', image: 'chilli.jpeg', price: 0.99 },
  ],
  // Add other categories as needed
};

const RelatedProducts = ({ currentProductId }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  
  // Filter out the current product from related products
  const relatedProducts = productsByCategory[category]?.filter(
    product => product.id !== currentProductId
  ) || [];

  if (relatedProducts.length === 0) return null;

  const handleProductClick = (productId) => {
    navigate(`/product/${category}/${productId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className='mt-12 px-4'>
      <h3 className='text-xl font-medium mb-4'>Related Products</h3>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {relatedProducts.slice(0, 4).map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className='group border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer'
            aria-label={`View ${product.name}`}
          >
            <div className='h-40 bg-gray-100 overflow-hidden'>
              <img
                src={`/images/${product.image}`}
                alt={product.name}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform'
                loading='lazy'
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/images/placeholder.jpeg';
                }}
              />
            </div>
            <div className='p-3'>
              <h4 className='font-medium text-gray-800'>{product.name}</h4>
              <p className='text-green-600 font-medium'>${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;