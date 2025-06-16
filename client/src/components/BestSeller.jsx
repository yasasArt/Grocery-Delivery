import React from 'react'
import ProductCard from './ProductCard'

const products = [
  {
    _id: "1",
    name: "Potato 500g",
    category: "vegetables",
    price: 100,
    offerPrice: 80,
    rating: 4,
    image: "potato.jpeg",
    inStock: true
  },
  {
    _id: "2",
    name: "Tomato 500g",
    category: "vegetables",
    price: 120,
    offerPrice: 90,
    rating: 4.5,
    image: "tomato.jpeg",
    inStock: true
  },
  {
    _id: "3",
    name: "Carrot 500g",
    category: "vegetables",
    price: 80,
    offerPrice: 65,
    rating: 4.2,
    image: "carrot.jpeg",
    inStock: true
  },
  {
    _id: "3",
    name: "onion 500g",
    category: "vegetables",
    price: 70,
    offerPrice: 55,
    rating: 4.1,
    image: "onion.jpeg",
    inStock: true
  }
]

const BestSeller = () => {
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Seller</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
        {products
          .filter((product) => product.inStock)
          .slice(0, 4)
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  )
}

export default BestSeller