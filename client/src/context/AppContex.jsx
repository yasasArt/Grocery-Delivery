import { createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(true);

    const [cartItems, setCartItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const value = {navigate, user, setUser, setIsSeller, isSeller,cartItems,setCartItems,searchQuery,setSearchQuery}//data store

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
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
return useContext(AppContext);
}