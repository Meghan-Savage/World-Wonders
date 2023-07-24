import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PhotosCard = ({
  mainImage,
  setMainImage,
  additionalImages,
  setAdditionalImages,
}) => {
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setMainImage({ file, name: file.name, url: reader.result });
      setMainImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAdditionalImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = [];

    const readFileAsync = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    };

    for (const file of files) {
      const preview = readFileAsync(file);
      imagePreviews.push(preview);
    }

    Promise.all(imagePreviews).then((imageUrls) => {
      const newImages = files.map((file, index) => ({
        file,
        name: file.name,
        url: imageUrls[index],
      }));
      setAdditionalImages((prevImages) => [...prevImages, ...newImages]);
      setAdditionalImagePreviews((prevPreviews) => [
        ...prevPreviews,
        ...imageUrls,
      ]);
    });
  };

  return (
    <div>
      <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Add a new listing</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Photos</h1>
            <p className="text-gray-600">
              Add as many as you can so buyers can see every detail.
            </p>
            <div className="mt-4">
              <label htmlFor="mainImageInput" className="cursor-pointer">
                <div className="w-full h-48 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center">
                  {mainImagePreview ? (
                    <img
                      src={mainImagePreview}
                      alt="Main Preview"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-400">
                      Click to add main photo
                    </span>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="mainImageInput"
                className="hidden"
                onChange={handleMainImageUpload}
              />
            </div>
          </div>

          <div>
            <div className="mb-4 py-2">
              <h3 className="text-md font-bold">Photos</h3>
              <p className="text-gray-500 text-sm">
                Use up to 4 photos to show your item's most important qualities.
              </p>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Tips:
              <ul className="list-disc list-inside">
                <li>Use natural light and no flash.</li>
                <li>Include a common object for scale.</li>
                <li>Show the item being held, worn, or used.</li>
                <li>Shoot against a clean, simple background.</li>
              </ul>
            </p>
            <div className="mt-4 grid gap-4 grid-cols-2">
              {additionalImagePreviews.slice(0, 3).map((imageUrl, index) => (
                <div
                  key={index}
                  className="w-full h-32 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center"
                >
                  <img
                    src={imageUrl}
                    alt={`Additional ${index + 1} Preview`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}

              <label htmlFor="additionalImagesInput" className="cursor-pointer">
                <div className="w-full h-32 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center">
                  <span className="text-gray-400">
                    Click to add more photos
                  </span>
                </div>
              </label>
              <input
                type="file"
                id="additionalImagesInput"
                className="hidden"
                multiple
                onChange={handleAdditionalImagesUpload}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosCard;
