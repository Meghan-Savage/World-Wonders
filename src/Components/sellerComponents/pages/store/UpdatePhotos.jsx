import React, { useState, useEffect } from "react";

const UpdatePhotos = ({ additionalImages, setAdditionalImages }) => {
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);

  useEffect(() => {
    if (additionalImages.length > 0) {
      setAdditionalImagePreviews(additionalImages.map((image) => image.url));
    }
  }, [additionalImages]);

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

    const filesToUpload = files.slice(0, 3);

    for (const file of filesToUpload) {
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

  const handleRemoveAdditionalImage = (index) => {
    const updatedImages = additionalImages.filter((_, i) => i !== index);
    const updatedPreviews = additionalImagePreviews.filter(
      (_, i) => i !== index
    );
    setAdditionalImages(updatedImages);
    setAdditionalImagePreviews(updatedPreviews);
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
            <div className="mt-4 grid gap-4 grid-cols-2">
              {additionalImagePreviews.slice(0, 4).map((imageUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={imageUrl}
                    alt={`Additional ${index + 1} Preview`}
                    className="object-cover w-full h-32"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={() => handleRemoveAdditionalImage(index)}
                  >
                    X
                  </button>
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

export default UpdatePhotos;
