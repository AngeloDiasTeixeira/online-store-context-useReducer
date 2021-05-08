import { useState, useEffect, useContext, useReducer, createContext } from "react";
import cartReducer from "./cartReducer";

const GlobalContext = createContext();
const cartInitialState = [];

const GlobalProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [cart, dispatch] = useReducer(cartReducer,cartInitialState);

    useEffect( () => {
        const fetchProducts = async () => {
            let response = await fetch("http://localhost:3001/api/products");
            let products = await response.json();
            setProducts(products);
        }
        fetchProducts();
    }, []);

    return (
        <GlobalContext.Provider value={
            {products: products,
            cart: cart,
            dispatch: dispatch}
        }>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;
export { GlobalContext };