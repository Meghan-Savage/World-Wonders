import React, { useContext, useRef, useState } from "react";
import { FirebaseContext } from "../firebase/provider";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import countryList from "country-list";

const CreateProductForm = (props) => {
  const { storage, db } = useContext(FirebaseContext);
  const formRef = useRef(null);
  const [showAdditionalImages, setShowAdditionalImages] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [additionalImageFields, setAdditionalImageFields] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = formRef.current;

    const storeId = form.elements.storeId.value;
    const country = form.elements.country.value;
    const product = form.elements.product.value;
    const price = parseFloat(form.elements.price.value);
    const quantity = parseInt(form.elements.quantity.value);
    const description = form.elements.description.value;
    const imageFile = form.elements.image.files[0];
    const imageFile2 = form.elements?.image2?.files[0];
    const imageFile3 = form.elements?.image3?.files[0];
    const imageFile4 = form.elements?.image4?.files[0];
    const imageFile5 = form.elements?.image5?.files[0];
    const videoFile = form.elements?.video.files[0];

    try {
      setUploading(true);

      const imageRef = imageFile && ref(storage, `images/${imageFile.name}`);
      const imageRef2 = imageFile2 && ref(storage, `images/${imageFile2.name}`);
      const imageRef3 = imageFile3 && ref(storage, `images/${imageFile3.name}`);
      const imageRef4 = imageFile4 && ref(storage, `images/${imageFile4.name}`);
      const imageRef5 = imageFile5 && ref(storage, `images/${imageFile5.name}`);
      imageFile && (await uploadBytes(imageRef, imageFile));
      imageFile2 && (await uploadBytes(imageRef2, imageFile2));
      imageFile3 && (await uploadBytes(imageRef3, imageFile3));
      imageFile4 && (await uploadBytes(imageRef4, imageFile4));
      imageFile5 && (await uploadBytes(imageRef5, imageFile5));

      const imageUrl = imageFile && (await getDownloadURL(imageRef));
      const imageUrl2 = imageFile2 && (await getDownloadURL(imageRef2));
      const imageUrl3 = imageFile3 && (await getDownloadURL(imageRef3));
      const imageUrl4 = imageFile4 && (await getDownloadURL(imageRef4));
      const imageUrl5 = imageFile5 && (await getDownloadURL(imageRef5));

      const videoRef = videoFile && ref(storage, `videos/${videoFile.name}`);
      videoFile && (await uploadBytes(videoRef, videoFile));
      const videoUrl = videoFile && (await getDownloadURL(videoRef));

      const productData = {
        storeId,
        country,
        title: product,
        price,
        quantity,
        description,
        images: [imageUrl, imageUrl2, imageUrl3, imageUrl4, imageUrl5].filter(
          Boolean
        ),
        video: videoUrl,
      };

      const productRef = await addDoc(collection(db, "products"), productData);
      console.log("Product added with ID: ", productRef.id);

      form.reset();
      setShowAdditionalImages(false);
      setAdditionalImageFields([]);
      setUploading(false);
    } catch (error) {
      console.log("Error uploading files:", error);
      setUploading(false);
    }
  };

  const handleAddImage = () => {
    setShowAdditionalImages(true);
    setAdditionalImageFields(["image2", "image3", "image4", "image5"]);
  };

  const countries = countryList.getNames();

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <form
      ref={formRef}
      className="max-w-md mx-auto p-4 bg-white rounded shadow"
      onSubmit={handleFormSubmit}
    >
      <div className="mb-4">
        <label className="text-gray-700" htmlFor="storeId">
          Store ID
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text"
          name="storeId"
          id="storeId"
        />
      </div>
      <div className="mb-4 flex">
        <div className="w-1/2 mr-2">
          <label className="text-gray-700" htmlFor="country">
            Product Country
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            name="country"
            id="country"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/2 ml-2">
          <label className="text-gray-700" htmlFor="product">
            Product Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            name="product"
            id="product"
          />
        </div>
      </div>
      <div className="mb-4 flex">
        <div className="w-1/2 mr-2">
          <label className="text-gray-700" htmlFor="price">
            Price
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="number"
            name="price"
            step="0.01"
            id="price"
          />
        </div>
        <div className="w-1/2 ml-2">
          <label className="text-gray-700" htmlFor="quantity">
            Quantity
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="number"
            name="quantity"
            step="1"
            id="quantity"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="text-gray-700" htmlFor="description">
          Description
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          name="description"
          id="description"
          rows="4"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="text-gray-700" htmlFor="image">
          Main Image
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="file"
          name="image"
          id="image"
          accept="image/*"
        />
      </div>
      {showAdditionalImages && (
        <>
          {additionalImageFields.map((field, index) => (
            <div className="mb-4" key={field}>
              <label className="text-gray-700" htmlFor={field}>
                Additional Image {index + 2}
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="file"
                name={"image" + (index + 2)}
                id={"image" + (index + 2)}
                accept="image/*"
              />
            </div>
          ))}
        </>
      )}
      {!showAdditionalImages && (
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={handleAddImage}
        >
          Add Additional Images
        </button>
      )}
      <div className="mb-4">
        <label className="text-gray-700" htmlFor="video">
          Video
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="file"
          name="video"
          id="video"
          accept="video/*"
        />
      </div>
      <button
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700"
        type="submit"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Create Product"}{" "}
      </button>
    </form>
  );
};

export default CreateProductForm;
