import React, { createContext, useEffect, useState, useContext } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { FirebaseContext } from '../../firebase/provider.jsx';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { db } = useContext(FirebaseContext);
  const productsCollectionRef = collection(db, 'products');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollectionRef = collection(db, 'products');
        const querySnapshot = await getDocs(productsCollectionRef);

        const productsData = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });

        setProducts(productsData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;