import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../../../firebase/provider";
import { AuthContext } from "../../../../firebase/authentication";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import PhotosCard from "./PhotosCard";
import DetailsCard from "./DetailsCard";
import PriceCard from "./PriceCard";

const PostListing = () => {
  const { storage, db } = useContext(FirebaseContext);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const { user } = useContext(AuthContext);

  const uploadImagesToStorage = async (storage, images) => {
    const imageDownloadUrls = [];

    for (const image of images) {
      const imageName = image.name;
      const imageRef = ref(storage, `images/${imageName}`);
      const metadata = {
        contentType: image.type,
      };

      await uploadBytes(imageRef, image, metadata);
      const imageUrl = await getDownloadURL(imageRef);
      imageDownloadUrls.push(imageUrl);
    }

    return imageDownloadUrls;
  };

  const handlePostProduct = async (
    db,
    additionalImages,
    productDetails,
    productPrice
  ) => {
    try {
      const sellerId = user.uid;
      const images = [];

      if (additionalImages.length > 0) {
        const additionalImageFiles = additionalImages.map((image) => {
          return fetch(image.url)
            .then((response) => response.blob())
            .then((blob) => {
              const fileType = blob.type;
              return new File([blob], image.name, { type: fileType });
            });
        });
        const resolvedAdditionalImageFiles = await Promise.all(
          additionalImageFiles
        );
        const additionalImageUrls = await uploadImagesToStorage(
          storage,
          resolvedAdditionalImageFiles
        );
        images.push(...additionalImageUrls);
      }
      const productData = {
        images,
        sellerId,
        ...productDetails,
        ...productPrice,
      };
      console.log("images", images);

      const productRef = await addDoc(collection(db, "products"), productData);
      console.log("Product added with ID: ", productRef.id);
    } catch (error) {
      console.error("Error posting product data:", error);
    }
  };

  const isFormValid = () => {
    return (
      title.trim() !== "" &&
      description.trim() !== "" &&
      country.trim() !== "" &&
      price > 0 &&
      quantity > 0
    );
  };

  return (
    <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8 bg-gray-100">
      <PhotosCard
        additionalImages={additionalImages}
        setAdditionalImages={setAdditionalImages}
      />
      <DetailsCard
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        selectedCountry={country}
        setSelectedCountry={setCountry}
      />
      <PriceCard
        price={price}
        setPrice={setPrice}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <div className="mr-8 flex justify-end text-2xl">
        <button
          className="px-8 py-2 bg-gray-900 text-orange-200 font-semibold rounded-lg hover:bg-gray-700 focus:outline-none"
          onClick={() => {
            if (isFormValid()) {
              handlePostProduct(
                db,
                additionalImages,
                {
                  title,
                  description,
                  country,
                },
                {
                  price,
                  quantity,
                }
              );
            } else {
              alert("Please fill in all required fields.");
            }
          }}
        >
          Post Product
        </button>
      </div>
    </div>
  );
};

export default PostListing;
