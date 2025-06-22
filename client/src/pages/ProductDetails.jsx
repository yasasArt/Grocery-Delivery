import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "../context/AppContex";

const products = [
    {
        id: "1",
        name: "Apple",
        category: "fruit",
        price: 100,
        offerPrice: 80,
        rating: 4,
        images: [
            "/images/apple1.jpeg",
            "/images/apple2.jpeg",
            "/images/apple3.jpeg",
            "/images/apple4.jpeg"
        ],
        description: [
            "High-quality material",
            "Comfortable for everyday use",
            "Available in different sizes"
        ]
    },
    {
        id: "2",
        name: "Banana",
        category: "fruit",
        price: 50,
        offerPrice: 40,
        rating: 4.5,
        images: [
            "/images/banana1.jpeg",
            "/images/banana2.jpeg",
            "/images/banana3.jpeg",
            "/images/banana4.jpeg"
        ],
        description: [
            "Rich in potassium",
            "Great for smoothies",
            "Perfect for snacking"
        ]
    },
    {
        id: "7",
        name: "kivi",
        category: "fruit",
        price: 50,
        offerPrice: 40,
        rating: 4.5,
        images: [
            "/images/kivi1.jpeg",
            "/images/kivi2.jpeg",
            "/images/kivi3.jpeg",
            "/images/kivi4.jpeg"
        ],
        description: [
            "Rich in potassium",
            "Great for smoothies",
            "Perfect for snacking"
        ]
    }
];

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cartItems, setCartItems } = useAppContext();
    const product = products.find(p => p.id === id) || products[0];

    const [thumbnail, setThumbnail] = useState(product.images[0]);

    const addToCart = (productId) => {
        const productToAdd = products.find(p => p.id === productId);
        if (!productToAdd) return;

        const existing = cartItems.find(item => item.id === productId);
        let updatedCart;
        
        if (existing) {
            updatedCart = cartItems.map(item =>
                item.id === productId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
            );
        } else {
            updatedCart = [...cartItems, { 
                ...productToAdd,
                quantity: 1
            }];
        }
        setCartItems(updatedCart);

        toast.success(`${productToAdd.name} added to cart!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleBuyNow = (productId) => {
        addToCart(productId);
        navigate('/cart');
    };

    return product && (
        <div className="max-w-6xl w-full px-6">
            <p>
                <span>Home</span> /
                <span> Products</span> /
                <span> {product.category}</span> /
                <span className="text-green-500"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.images.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            product.rating > i ? (
                                <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 
                                    1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 
                                    13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 
                                    1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" fill="#008000" />
                                </svg>
                            ) : (
                                <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451
                                     4.90983C11.379 5.32185 
                                    11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 
                                    7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146
                                     14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 
                                     13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 
                                     15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 
                                     9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 
                                     5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" fill="#008000" fillOpacity="0.35" />
                                </svg>
                            )
                        ))}
                        <p className="text-base ml-2">({product.rating})</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: ${product.price}</p>
                        <p className="text-2xl font-medium">MRP: ${product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={() => addToCart(product.id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={() => handleBuyNow(product.id)} className="w-full py-3.5 cursor-pointer font-medium bg-green-500 text-white hover:bg-green-600 transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;