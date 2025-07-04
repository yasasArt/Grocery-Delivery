import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

export const AppContext = createContext({ getcartCount: () => 0 });

export const AppProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);

    const [cartItems, setCartItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);

    //fetch seller status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get("/api/seller/is-seller");
            if (data.success) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        } catch (error) {
            setIsSeller(false);
        }
    };

    // Fetch user Auth Status, User Data And Cart Items
    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/user/is-auth");
            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cartItems || []);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        }
    };

    // Fetch All products
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("/api/product/list");
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Get cart Item count
    const getcartCount = () => {
        let totalCount = 0;
        for (const item of cartItems) {
            totalCount += item.quantity || 1;
        }
        return totalCount;
    };

    // Get cart total Amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const item of cartItems) {
            // Find product by id or _id
            let itemInfo = products.find(product => product._id === item.id || product.id === item.id);
            if (itemInfo && item.quantity > 0){
                // Use offerPrice or price
                const price = itemInfo.offerPrice || itemInfo.price || 0;
                totalAmount += price * item.quantity;
            }
        }
        return Math.floor(totalAmount * 100) / 100; 
    };

    useEffect(() => {
        fetchSeller();
        fetchUser();
        fetchProducts();
        // Replace this with your actual data fetching logic
        const sampleProducts = [
            { _id: 1, name: 'Apple', category: 'fruit', price: 1.99, offerPrice: 1.49, image: 'apple.jpeg' },
            { _id: 2, name: 'Banana', category: 'fruit', price: 0.99, offerPrice: 0.79, image: 'banana.jpeg' },
            { _id: 3, name: 'Carrot', category: 'vegetable', price: 0.49, offerPrice: 0.39, image: 'carrot.jpeg' },
            // Add more sample products as needed
        ];
        setProducts(sampleProducts);
    }, []);

    return (
        <AppContext.Provider value={{
            navigate, user, setUser, setIsSeller, isSeller, cartItems, setCartItems,
            searchQuery, setSearchQuery, getcartCount, getCartAmount, products, fetchSeller,fetchProducts,fetchUser
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};