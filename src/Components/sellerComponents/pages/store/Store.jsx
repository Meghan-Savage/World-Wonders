import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../../../firebase/provider";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import countryList from "country-list";
import PhotosCard from "./PhotosCard";
import DetailsCard from "./DetailsCard";
import PriceCard from "./PriceCard";

const Store = () => {
  const { storage, db } = useContext(FirebaseContext);
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handlePostProduct = async (
    db,
    mainImage,
    additionalImages,
    productDetails,
    productPrice
  ) => {
    try {
      const mainImageRef =
        mainImage && ref(storage, `images/${mainImage.name}`);
      mainImage && (await uploadBytes(mainImageRef, mainImage));
      const mainImageUrl = mainImage && (await getDownloadURL(mainImageRef));

      const additionalImageUrls = [];
      for (const image of additionalImages) {
        const additionalImageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(additionalImageRef, image);
        const additionalImageUrl = await getDownloadURL(additionalImageRef);
        additionalImageUrls.push(additionalImageUrl);
      }

      const productData = {
        mainImage: mainImageUrl || null,
        additionalImages: additionalImageUrls,
        ...productDetails,
        ...productPrice,
      };

      const productRef = await addDoc(collection(db, "products"), productData);
      console.log("Product added with ID: ", productRef.id);
    } catch (error) {
      console.error("Error posting product data:", error);
    }
  };

  return (
    <div>
      <PhotosCard
        mainImage={mainImage}
        setMainImage={setMainImage}
        additionalImages={additionalImages}
        setAdditionalImages={setAdditionalImages}
      />
      <DetailsCard
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        country={country}
        setCountry={setCountry}
      />
      <PriceCard
        price={price}
        setPrice={setPrice}
        quantity={quantity}
        setQuantity={setQuantity}
      />

      <button
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-orange-300 hover:text-black"
        onClick={() =>
          handlePostProduct(
            db,
            mainImage,
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
          )
        }
      >
        Post Product
      </button>
    </div>
  );
};

export default Store;
