import React from 'react'
import { useAppContext } from '../context/AppContext'

// Example categories array (replace with your actual data)
const categories = [
    { name: 'Fruit', path: 'fruit', bgcolor: '#f5f5dc', image: 'fruit.jpeg' },
    // ...add more categories as needed...
]

const Categories = () => {
    const { navigate } = useAppContext()
    return (
        <div className='mt-16'>
            <p className='text-2xl md:text-3xl font-medium'>Categories</p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className='group cursor-pointer py-5 px-3 flex flex-col items-center justify-center'
                        style={{ backgroundColor: category.bgcolor }}
                        onClick={() => {
                            navigate(`/products/${category.path.toLowerCase()}`);
                            window.scrollTo(0, 0);
                        }}
                    >
                        <img src={category.image} alt={category.name} className='group-hover:scale-110 transition max-w-50' />
                        <p className='text-sm font-medium'>{category.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories
