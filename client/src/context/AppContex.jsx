import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true; // Enable sending cookies with requests
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

export const AppContext = createContext({ getcartCount: () => 0 });

export const AppProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(true);

    const [cartItems, setCartItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});
    const [products, setProducts] = useState([]);

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
            // If cartItems is an array of objects with id and quantity
            let itemInfo = products.find(product => product._id === item.id);
            if (itemInfo && item.quantity > 0){
                totalAmount += itemInfo.price * item.quantity;
            }
        }
        return Math.floor(totalAmount * 100) / 100; 
    };

    useEffect(() => {
        // Replace this with your actual data fetching logic
        const sampleProducts = [
            { _id: 1, name: 'Apple', category: 'fruit', price: 1.99, image: 'apple.jpeg' },
            { _id: 2, name: 'Banana', category: 'fruit', price: 0.99, image: 'banana.jpeg' },
            { _id: 3, name: 'Carrot', category: 'vegetable', price: 0.49, image: 'carrot.jpeg' },
            // Add more sample products as needed
        ];
        setProducts(sampleProducts);
    }, []);

    return (
        <AppContext.Provider value={{
            navigate, user, setUser, setIsSeller, isSeller, cartItems, setCartItems,
            searchQuery, setSearchQuery, getcartCount, getCartAmount, products
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};