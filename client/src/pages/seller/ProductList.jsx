import React from 'react';
import { useAppContext } from '../../context/AppContex';

// Category data with selling prices
const categories = [
  { id: 1, name: 'Apples', image: 'apple.jpeg', count: 24, price: 2.99 },
  { id: 2, name: 'Bananas', image: 'banana.jpeg', count: 18, price: 1.49 },
  { id: 3, name: 'Beets', image: 'beet.jpeg', count: 15, price: 3.25 },
  { id: 4, name: 'Cabbage', image: 'cabbage.jpeg', count: 9, price: 1.99 },
  { id: 5, name: 'Cherries', image: 'cherries.jpeg', count: 12, price: 4.75 },
  { id: 6, name: 'Chilli', image: 'chilli.jpeg', count: 7, price: 2.49 },
  { id: 7, name: 'Kiwi', image: 'kiwi.jpeg', count: 11, price: 0.99 },
  { id: 8, name: 'Oranges', image: 'orange.jpeg', count: 14, price: 3.49 },
  { id: 9, name: 'Strawberries', image: 'strawberry.jpeg', count: 8, price: 5.99 },
  { id: 10, name: 'Watermelons', image: 'watermelon.jpeg', count: 6, price: 7.99 },
];

const ProductList = () => {
  const { products, currency } = useAppContext();

  const getCategoryImage = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    // Assuming images are in the public/images directory
    return category ? `/images/${category.image}` : '/images/placeholder.jpeg';
  };

  const getCategoryPrice = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.price : 0;
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate">Price</th>
                <th className="px-4 py-3 font-semibold truncate">Selling Price</th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product) => (
                <tr key={product.id} className="border-t border-gray-500/20 hover:bg-gray-50">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded p-1">
                      <img
                        src={getCategoryImage(product.category)}
                        alt={product.category}
                        className="w-12 h-12 object-contain rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/placeholder.jpeg';
                        }}
                      />
                    </div>
                    <span className="truncate max-sm:hidden w-full">{product.name}</span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">
                    {currency}
                    {getCategoryPrice(product.category).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    {currency}
                    {product.offerPrice}
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;