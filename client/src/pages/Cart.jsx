import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContex";

const dummyAddress = [
    {
        street: "123 Main St",
        city: "YourCity",
        state: "YourState",
        country: "YourCountry"
    }
];

const Cart = () => {
    const {
        products,
        cartItems,
        getcartCount,
        getCartAmount,
        navigate
    } = useAppContext();
    const [cartArry, setCartArray] = useState([]);
    const [addresses, setAddress] = useState(dummyAddress);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
    const [paymentOption, setPaymentOption] = useState('COD');
    const currency = "";

    const getCart = () => {
        if (!cartItems || cartItems.length === 0) {
            setCartArray([]);
            return;
        }

        const tempArry = cartItems.map(item => {
            // If item already has all product info (from Buy Now)
            if (item.name && item.offerPrice) {
                return item;
            }
            // Otherwise find in products array
            const product = products.find(p => p._id === item.id || p.id === item.id);
            return product ? { ...product, quantity: item.quantity } : null;
        }).filter(Boolean); // Remove any null entries

        setCartArray(tempArry);
    };

    const placeOrder = async () => {
        // Implement order placement logic here
    };

    useEffect(() => {
        getCart();
    }, [cartItems, products]);

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="mt-16 text-center">
                <h1 className="text-3xl font-medium mb-4">Your Cart is Empty</h1>
                <button 
                    onClick={() => navigate("/products")} 
                    className="px-6 py-3 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row mt-16">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-indigo-500">{getcartCount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArry.map((product, index) => {
                    if (!product) return null;
                    
                    const imageSrc = product.images?.[0] || '/images/default-product.jpg';
                    const productId = product._id || product.id;
                    
                    return (
                        <div 
                            key={`${productId}-${index}`} 
                            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
                        >
                            <div className="flex items-center md:gap-6 gap-3">
                                <div 
                                    onClick={() => {
                                        navigate(`/product/${product.category?.toLowerCase()}/${productId}`);
                                        scrollTo(0, 0);
                                    }} 
                                    className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
                                >
                                    <img 
                                        className="max-w-full h-full object-cover" 
                                        src={imageSrc} 
                                        alt={product.name} 
                                    />
                                </div>
                                <div>
                                    <p className="hidden md:block font-semibold">{product.name}</p>
                                    <div className="font-normal text-gray-500/70">
                                        <p>Price: <span>${product.offerPrice}</span></p>
                                        <div className='flex items-center'>
                                            <p>Qty:</p>
                                            <span className="ml-2">{product.quantity || 1}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center">{currency}{product.offerPrice * (product.quantity || 1)}</p>
                            <button className="cursor-pointer mx-auto">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    );
                })}

                <button 
                    onClick={() => { navigate("/products"); scrollTo(0, 0); }}
                    className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
                >
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#615fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Continue Shopping
                </button>
            </div>

            {/* Order Summary Section (same as before) */}
           
            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">{selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state},
                        ${selectedAddress.country}` :  "No address found"}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-indigo-500 hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                {addresses.map((address, index) => (<p key={index} onClick={() => { setSelectedAddress(address); setShowAddress(false) }}
                                 className="text-gray-500 p-2 hover:bg-gray-100">
                                    {address.street}, {address.city}, {address.state}, {address.country}
                                </p>
                                ))}
                                <p onClick={() => navigate("/add-address")}
                                 className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={e => setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{getCartAmount() * 2 / 100}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{currency}{getCartAmount() + getCartAmount() * 2 / 100}</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
                    {paymentOption === 'COD' ? 'Place Order' : 'proceed to checkout'}
                </button>
            </div>
        </div>
    ) 
}
export default Cart;