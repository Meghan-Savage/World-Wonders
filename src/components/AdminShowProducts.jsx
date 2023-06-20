import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../firebase/provider";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const AdminShowProducts = () => {
  const { db } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const productsSnapshot = await getDocs(productsRef);
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [db]);

  const handleDelete = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform the update operation in Firebase
      const productRef = doc(db, "products", selectedProduct.id);
      await updateDoc(productRef, selectedProduct);

      // Update the products state with the updated product
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedProduct.id ? selectedProduct : product
        )
      );

      // Reset the selectedProduct state and clear the form fields
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-40 object-cover mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-700 font-semibold">${product.price}</p>
            <p className="text-gray-600">Quantity: {product.quantity}</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white font-bold px-4 py-2 mr-2"
                onClick={() => handleEdit(product)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white font-bold px-4 py-2"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="text-gray-700" htmlFor="productName">
                Product Name
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text"
                id="productName"
                value={selectedProduct.title}
                onChange={(e) =>
                  setSelectedProduct((prevProduct) => ({
                    ...prevProduct,
                    title: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-700" htmlFor="description">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                id="description"
                rows="4"
                value={selectedProduct.description}
                onChange={(e) =>
                  setSelectedProduct((prevProduct) => ({
                    ...prevProduct,
                    description: e.target.value,
                  }))
                }
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="text-gray-700" htmlFor="price">
                Price
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="number"
                id="price"
                step="0.01"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct((prevProduct) => ({
                    ...prevProduct,
                    price: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-700" htmlFor="quantity">
                Quantity
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="number"
                id="quantity"
                step="1"
                value={selectedProduct.quantity}
                onChange={(e) =>
                  setSelectedProduct((prevProduct) => ({
                    ...prevProduct,
                    quantity: e.target.value,
                  }))
                }
              />
            </div>
            {/* Add more input fields for other product details */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminShowProducts;
