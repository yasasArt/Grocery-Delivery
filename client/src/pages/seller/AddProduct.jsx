import React, { useState, useRef } from 'react';
import { categories } from '../../components/Categories';
import { useAppContext } from '../../context/AppContex';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRefs = useRef(Array(4).fill(null));
  const navigate = useNavigate();

  const { axios } = useAppContext();

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    const updatedFiles = [...files];
    updatedFiles[index] = file;
    setFiles(updatedFiles);
  };

  const removeImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index] = null;
    setFiles(updatedFiles);

    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].value = '';
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!name || !description || !category || !price) {
      toast.error('Please fill all required fields');
      return;
    }

    const validFiles = files.filter(file => file !== null && file !== undefined);
    if (validFiles.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setIsLoading(true);

    try {
      const productData = {
        name,
        description: description.split('\n').filter(line => line.trim() !== ''),
        category,
        price,
        offerPrice: offerPrice || null,
      };

      const formData = new FormData();
      formData.append('productData', JSON.stringify(productData));

      validFiles.forEach(file => {
        formData.append('images', file);
      });

      const { data } = await axios.post('/api/product/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (data.success) {
        toast.success('Product Added');
        setName('');
        setDescription('');
        setCategory('');
        setPrice('');
        setOfferPrice('');
        setFiles([]);
        fileInputRefs.current.forEach(ref => {
          if (ref) ref.value = '';
        });
        navigate('/seller/product-list'); // Navigate to product list page after success
      } else {
        toast.error(data.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error.response?.data?.message || error.message || "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  const getImagePreview = (file, index) => {
    if (file) {
      return (
        <div className="relative">
          <img
            src={URL.createObjectURL(file)}
            alt={`preview-${index}`}
            className="max-w-24 max-h-24 object-cover"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              removeImage(index);
            }}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
          >
            ×
          </button>
        </div>
      );
    }
    return (
      <img
        className="max-w-24 cursor-pointer"
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
        alt="uploadArea"
        width={100}
        height={100}
      />
    );
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4).fill('').map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  ref={el => fileInputRefs.current[index] = el}
                  onChange={(e) => handleFileChange(index, e)}
                  type="file"
                  id={`image${index}`}
                  className="hidden"
                  accept="image/*"
                />
                {getImagePreview(files[index], index)}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            required
          ></textarea>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            id="category"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.path}>{item.path}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              id="product-price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
            <input
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              id="offer-price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-8 py-2.5 bg-green-500 text-white font-medium rounded cursor-pointer disabled:opacity-50"
          disabled={isLoading ? true : false}
        >
          {isLoading ? 'Uploading...' : 'ADD'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;