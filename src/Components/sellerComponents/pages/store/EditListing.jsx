import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FirebaseContext } from "../../../../firebase/provider";
import { AuthContext } from "../../../../firebase/authentication";
import { auth } from "../../../../firebase/provider";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import DetailsCard from "./DetailsCard";
import PriceCard from "./PriceCard";
import UpdatePhotos from "./UpdatePhotos";

const EditListing = () => {
  const { id } = useParams();
  const { storage, db } = useContext(FirebaseContext);
  const [mainImage, setMainImage] = useState(null);
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id);
        const productSnapshot = await getDoc(productRef);
        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          setMainImage(productData.images[0] || null);
          setAdditionalImages(
            productData.images.slice(1).map((url, index) => ({
              id: index + 1,
              url,
              name: `Image ${index + 2}`,
            }))
          );
          setTitle(productData.title || "");
          setDescription(productData.description || "");
          setCountry(productData.country || "");
          setPrice(productData.price || "");
          setQuantity(productData.quantity || "");
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [db, id]);

  const handleUpdateProduct = async (
    db,
    productId,
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
        const additionalImageFilesPromises = additionalImages.map((image) => {
          if (image && image.file && image.file.type) {
            const fileType = image.file.type;
            console.log("image.file.type", image.file.type);
            return new File([image.file], image.name, { type: fileType });
          } else if (image && image.url) {
            return image.url;
          }
          return null;
        });

        const resolvedAdditionalImageFiles = await Promise.all(
          additionalImageFilesPromises
        );

        const validAdditionalImageFiles = resolvedAdditionalImageFiles.filter(
          (file) => file !== null
        );

        if (validAdditionalImageFiles.length > 0) {
          if (typeof validAdditionalImageFiles[0] === "string") {
            images.push(...validAdditionalImageFiles);
          } else {
            const additionalImageUrls = await uploadImagesToStorage(
              storage,
              validAdditionalImageFiles
            );
            images.push(...additionalImageUrls);
          }
        }
      }

      const imageUrlsOnly = images.filter((image) => typeof image === "string");

      const productData = {
        images: imageUrlsOnly,
        sellerId,
        ...productDetails,
        ...productPrice,
      };

      await updateDoc(doc(db, "products", productId), productData);
      console.log("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product data:", error);
    }
  };

  return (
    <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8 bg-gray-100">
      <UpdatePhotos
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
      <div className="mr-8 flex justify-end text-2xl">
        <button
          className="px-2 py-2 bg-gray-900 text-orange-200 font-semibold rounded-lg hover:bg-gray-700 focus:outline-none"
          onClick={() => {
            handleUpdateProduct(
              db,
              id,
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
            );
          }}
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default EditListing;
