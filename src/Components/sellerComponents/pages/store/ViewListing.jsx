import React, { useEffect, useState, useContext } from "react";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { FirebaseContext } from "../../../../firebase/provider";
import { auth } from "../../../../firebase/provider";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const ViewListing = () => {
  const { db } = useContext(FirebaseContext);
  const productsCollectionRef = collection(db, "products");
  const [products, setProducts] = useState([]);
  console.log("products", products);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const navigate = useNavigate();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextClick = () => {
    if (currentPage < Math.ceil(products.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDeleteProduct = async (db, productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      console.log("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!auth.currentUser) {
          return;
        }

        const sellerId = auth.currentUser.uid;

        const q = query(
          productsCollectionRef,
          where("sellerId", "==", sellerId)
        );
        const querySnapshot = await getDocs(q);

        const productsData = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [auth.currentUser]);

  const handleEditProduct = (productId) => {
    navigate(`/seller/dashboard/edit-listing/${productId}`);
  };

  return (
    <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">All Listings</h1>
        <p className="text-gray-600 mb-4">
          These are details about your product listings.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {currentItems.map((product) => (
            <div key={product.id} className="p-4 border rounded-lg">
              <div className="mb-4">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="font-extrabold mb-2">Title</h3>
                <p className="text-sm leading-6 font-medium text-gray-400">
                  {product.title}
                </p>
              </div>
              <div>
                <h3 className="font-extrabold mb-2">In Stock</h3>
                <p className="text-sm leading-6 font-medium text-gray-400">
                  {product.quantity}
                </p>
              </div>
              <div>
                <h3 className="font-extrabold mb-2">Actions</h3>
                <div className="flex space-x-2">
                  <AiOutlineDelete
                    className="text-orange-200 cursor-pointer"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this product?"
                        )
                      ) {
                        handleDeleteProduct(db, product.id);
                      }
                    }}
                  />
                  <AiOutlineEdit
                    className="text-gray-900 cursor-pointer"
                    onClick={() => handleEditProduct(product.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-between items-end mt-4">
          <p className="text-gray-600">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, products.length)} of {products.length}{" "}
            entries
          </p>
          <nav className="flex space-x-2">
            <button
              onClick={handlePreviousClick}
              className="px-2 py-2 bg-gray-900 text-orange-200 font-semibold rounded-lg hover:bg-gray-700 focus:outline-none"
            >
              Previous
            </button>
            <button
              onClick={handleNextClick}
              className="px-2 py-2 bg-gray-900 text-orange-200 font-semibold rounded-lg hover:bg-gray-700 focus:outline-none"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ViewListing;
