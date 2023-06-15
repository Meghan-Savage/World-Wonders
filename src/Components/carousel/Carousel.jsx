import React, { useState } from "react";

function Carousel({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [allImages, setAllImages] = useState(images);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    const newIndex =
      currentIndex === 0 ? allImages.length - 1 : currentIndex - 1;
    setSelectedImage(allImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      currentIndex === allImages.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(allImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleMainImageClick = () => {
    handleNext();
  };

  return (
    <div className="flex flex-col lg:flex-column items-center">
      <div className="relative group">
        <img
          src={selectedImage}
          alt="Selected"
          width={410}
          height={200}
          className="main-image cursor-pointer transform transition duration-300 hover:scale-150"
          onClick={handleMainImageClick}
        />
        <div
          className="absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer z-10"
          onClick={handlePrevious}
        >
          <svg
            className="w-8 h-8 text-gray-500 hover:text-gray-900 transition duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div
          className="absolute top-1/2 transform -translate-y-1/2 right-0 cursor-pointer z-10"
          onClick={handleNext}
        >
          <svg
            className="w-8 h-8 text-gray-500 hover:text-gray-900 transition duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
      <div className="flex gap-10 mt-4">
        {allImages.map((img, index) => (
          <img
            key={index}
            width={100}
            height={75}
            src={img}
            alt={`Image ${index + 1}`}
            onClick={() => {
              setSelectedImage(img);
              setCurrentIndex(index);
            }}
            className={`preview-image cursor-pointer transform transition duration-300 hover:scale-150 ${
              index === currentIndex ? "border-4 border-orange-300" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
