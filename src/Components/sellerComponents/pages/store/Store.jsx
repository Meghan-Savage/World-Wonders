import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../../../firebase/provider";
import { AuthContext } from "../../../../firebase/authentication";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import countryList from "country-list";
import PhotosCard from "./PhotosCard";
import DetailsCard from "./DetailsCard";
import PriceCard from "./PriceCard";

const Store = () => {
  const { storage, db } = useContext(FirebaseContext);
  const [mainImage, setMainImage] = useState(null);
  console.log("mainImage", mainImage);
  const [additionalImages, setAdditionalImages] = useState([]);
  console.log("additionalImages", additionalImages);
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
    mainImage,
    additionalImages,
    productDetails,
    productPrice
  ) => {
    try {
      const sellerId = user.uid;
      const images = [];

      if (mainImage) {
        const mainImageUrls = await uploadImagesToStorage(storage, [mainImage]);
        images.push(...mainImageUrls);
      }

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
        selectedCountry={country}
        setSelectedCountry={setCountry}
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
