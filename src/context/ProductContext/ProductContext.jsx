import React, {createContext, useEffect, useState} from 'react'
import { db } from "../../firebase/provider.jsx"
import { getDocs, collection } from "firebase/firestore";

export const ProductContext = createContext();

const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const productsCollectionRef = collection(db, "products");

    useEffect (()=> {
        const fetchProducts = async ()=> {
            try {
                const data = await getDocs(productsCollectionRef);
                console.log('data', data)
            } catch (err) {
                console.error(err);
            }
        }
        fetchProducts();
    }, [])
    return <ProductContext.Provider value={{ products }}>{children}</ProductContext.Provider>
};

export default ProductProvider;