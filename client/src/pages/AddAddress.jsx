import React from 'react';
import { useState } from 'react';

// Input field component with improved styling
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className='w-full px-4 py-3 border border-gray-300 rounded-lg outline-none 
               text-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all'
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
);

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className='container mx-auto px-4 py-12 max-w-6xl'>
      <div className='text-center mb-12'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>
          Add <span className='text-green-600'>Shipping Address</span>
        </h1>
        <p className='mt-2 text-gray-600'>Fill in your details for smooth deliveries</p>
      </div>

      <div className='flex flex-col lg:flex-row gap-12 items-center'>
        <div className='w-full lg:w-1/2'>
          <form onSubmit={onSubmitHandler} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-gray-700 mb-2 font-medium'>First Name</label>
                <InputField 
                  handleChange={handleChange} 
                  address={address} 
                  name='firstname' 
                  type='text' 
                  placeholder='John' 
                />
              </div>
              <div>
                <label className='block text-gray-700 mb-2 font-medium'>Last Name</label>
                <InputField 
                  handleChange={handleChange} 
                  address={address} 
                  name='lastname' 
                  type='text' 
                  placeholder='Doe' 
                />
              </div>
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Email</label>
              <InputField 
                handleChange={handleChange} 
                address={address} 
                name='email' 
                type='email' 
                placeholder='john@example.com' 
              />
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Street Address</label>
              <InputField 
                handleChange={handleChange} 
                address={address} 
                name='street' 
                type='text' 
                placeholder='123 Main St' 
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-gray-700 mb-2 font-medium'>City</label>
                <InputField 
                  handleChange={handleChange} 
                  address={address} 
                  name='city' 
                  type='text' 
                  placeholder='New York' 
                />
              </div>
              <div>
                <label className='block text-gray-700 mb-2 font-medium'>State</label>
                <InputField 
                  handleChange={handleChange} 
                  address={address} 
                  name='state' 
                  type='text' 
                  placeholder='NY' 
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-gray-700 mb-2 font-medium'>Zip Code</label>
                <InputField 
                  handleChange={handleChange} 
                  address={address} 
                  name='zipcode' 
                  type='text' 
                  placeholder='10001' 
                />
              </div>
              <div>
                <label className='block text-gray-700 mb-2 font-medium'>Country</label>
                <InputField 
                  handleChange={handleChange} 
                  address={address} 
                  name='country' 
                  type='text' 
                  placeholder='United States' 
                />
              </div>
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Phone Number</label>
              <InputField 
                handleChange={handleChange} 
                address={address} 
                name='phone' 
                type='tel' 
                placeholder='+1 234 567 8900' 
              />
            </div>

            <button 
              type='submit' 
              className='w-full bg-green-600 hover:bg-green-700 text-white font-bold 
                         py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300'
            >
              Save Address
            </button>
          </form>
        </div>

        <div className='w-full lg:w-1/2 flex justify-center'>
          <img 
            className='max-w-md w-full h-auto object-contain' 
            src='Address.png' 
            alt='Illustration of address location' 
          />
        </div>
      </div>
    </div>
  );
};

export default AddAddress;