import React, { useContext } from "react";
import { FirebaseContext } from "../firebase/provider";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const CreateProductForm = (props) => {
  const { storage, db } = useContext(FirebaseContext);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;

    const storeId = form.elements.storeId.value;
    const country = form.elements.country.value;
    const product = form.elements.product.value;
    const price = parseFloat(form.elements.price.value);
    const quantity = parseInt(form.elements.quantity.value);
    const description = form.elements.description.value;
    const imageFile = form.elements.image.files[0];
    const imageFile2 = form.elements.image2.files[0];
    const imageFile3 = form.elements.image3.files[0];
    const imageFile4 = form.elements.image4.files[0];
    const imageFile5 = form.elements.image5.files[0];
    const videoFile = form.elements.video.files[0];

    try {
      // Upload image file
      const imageRef = ref(storage, `images/${imageFile.name}`);
      const imageRef2 = ref(storage, `images/${imageFile2.name}`);
      const imageRef3 = ref(storage, `images/${imageFile3.name}`);
      const imageRef4 = ref(storage, `images/${imageFile4.name}`);
      const imageRef5 = ref(storage, `images/${imageFile5.name}`);
      await uploadBytes(imageRef, imageFile);
      await uploadBytes(imageRef2, imageFile2);
      await uploadBytes(imageRef3, imageFile3);
      await uploadBytes(imageRef4, imageFile4);
      await uploadBytes(imageRef5, imageFile5);

      // Get image download URL
      const imageUrl = await getDownloadURL(imageRef);
      const imageUrl2 = await getDownloadURL(imageRef2);
      const imageUrl3 = await getDownloadURL(imageRef3);
      const imageUrl4 = await getDownloadURL(imageRef4);
      const imageUrl5 = await getDownloadURL(imageRef5);

      // Upload video file
      const videoRef = ref(storage, `videos/${videoFile.name}`);
      await uploadBytes(videoRef, videoFile);

      // Get video download URL
      const videoUrl = await getDownloadURL(videoRef);

      // Create a new document in Firestore
      const productData = {
        storeId,
        country,
        product,
        price,
        quantity,
        description,
        image: imageUrl,
        image2: imageUrl2,
        image3: imageUrl3,
        image4: imageUrl4,
        image5: imageUrl5,
        video: videoUrl,
      };

      const productRef = await addDoc(collection(db, "products"), productData);
      console.log("Product added with ID: ", productRef.id);

      form.reset();
    } catch (error) {
      console.log("Error uploading files:", error);
    }
  };

  return (
    <form
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
      <div className="mb-4">
        <label className="text-gray-700" htmlFor="country">
          Product Country
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text"
          name="country"
          id="country"
        />
      </div>
      <div className="mb-4">
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
      <div className="mb-4">
        <label className="text-gray-700" htmlFor="price">
          Product Price
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="number"
          name="price"
          id="price"
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-700" htmlFor="quantity">
          Product Quantity
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="number"
          name="quantity"
          id="quantity"
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-700" htmlFor="description">
          Product Description
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          name="description"
          id="description"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="text-gray-700" htmlFor="image">
          Product Image
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="file"
          name="image"
          id="image"
        />
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="file"
          name="image2"
          id="image2"
        />
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="file"
          name="image3"
          id="image3"
        />
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="file"
          name="image4"
          id="image4"
        />
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="file"
          name="image5"
          id="image5"
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-700" htmlFor="video">
          Product Video
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="file"
          name="video"
          id="video"
        />
      </div>
      <button
        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        type="submit"
      >
        Add Product
      </button>
    </form>
  );
};

export default CreateProductForm;
