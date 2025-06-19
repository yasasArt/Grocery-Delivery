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
    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
return useContext(AppContext);
}